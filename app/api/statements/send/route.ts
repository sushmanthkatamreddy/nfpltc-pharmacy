import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

export const runtime = "nodejs"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function POST(req: Request) {
  try {
    const { statementIds } = await req.json() as { statementIds: string[] }
    if (!Array.isArray(statementIds) || statementIds.length === 0) {
      return NextResponse.json({ ok: false, error: "No statement IDs" }, { status: 400 })
    }

    // Fetch statements with profile email by matching account_number + dob + first_name
    // If you already have patient_id, replace this lookup with direct join on profiles.
    const { data: stmts, error } = await supabase
      .from("statements")
      .select("*")
      .in("id", statementIds)

    if (error) throw error

    for (const s of stmts) {
      // Try to locate patient email
      // Adjust this to your profiles columns (email, account_number, dob, first_name)
      const { data: prof } = await supabase
        .from("profiles")
        .select("id,email,first_name,account_number,dob")
        .eq("account_number", s.account_number)
        .maybeSingle()

      const email = prof?.email
      if (!email) continue

      // create OTP + expiry (10 min)
      const otp = generateOTP()
      const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString()

      await supabase
        .from("statements")
        .update({
          patient_id: prof?.id ?? null,
          otp_code: otp,
          otp_expires_at: expires,
          status: "sent",
        })
        .eq("id", s.id)

      // Create a short-lived tokenized link (just a redirect to verification page)
      // The actual download happens after OTP verify.
      const link = `${process.env.NEXT_PUBLIC_SITE_URL}/statements/verify?id=${encodeURIComponent(s.id)}`

      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: email,
        subject: "Your Statement from North Falmouth Pharmacy",
        html: `
          <div style="font-family:Arial,sans-serif">
            <p>Hello ${prof?.first_name || "there"},</p>
            <p>Your statement is ready. Click the link and enter the One-Time Passcode (OTP) below:</p>
            <p><a href="${link}" style="color:#047857">View & Download Statement</a></p>
            <p><b>OTP:</b> ${otp}</p>
            <p>This OTP expires in 10 minutes.</p>
            <p>— North Falmouth Pharmacy</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("Send error:", e)
    return NextResponse.json({ ok: false, error: e.message || "Failed" }, { status: 500 })
  }
}