import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { id, otp } = await req.json() as { id: string; otp: string }
    if (!id || !otp) return NextResponse.json({ ok: false, error: "Missing inputs" }, { status: 400 })

    const { data: s, error } = await supabase.from("statements").select("*").eq("id", id).single()
    if (error || !s) throw new Error("Statement not found")

    if (!s.otp_code || !s.otp_expires_at) return NextResponse.json({ ok: false, error: "No OTP set" }, { status: 400 })
    if (s.otp_code !== otp) return NextResponse.json({ ok: false, error: "Invalid OTP" }, { status: 400 })
    if (new Date(s.otp_expires_at).getTime() < Date.now()) {
      return NextResponse.json({ ok: false, error: "OTP expired" }, { status: 400 })
    }

    // Create signed URL (10 minutes)
    const { data: signed, error: urlErr } = await supabase.storage
      .from("statements")
      .createSignedUrl(s.pdf_path, 600) // 600s = 10min
    if (urlErr) throw urlErr

    // Invalidate OTP after success (optional)
    await supabase.from("statements").update({ otp_code: null, otp_expires_at: null, status: "downloaded" }).eq("id", id)

    return NextResponse.json({ ok: true, url: signed?.signedUrl })
  } catch (e: any) {
    console.error("Verify error:", e)
    return NextResponse.json({ ok: false, error: e.message || "Failed" }, { status: 500 })
  }
}