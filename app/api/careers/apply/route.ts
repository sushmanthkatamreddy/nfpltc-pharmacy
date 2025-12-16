import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const jobTitle = formData.get("jobTitle") as string
    const resumeFile = formData.get("resume") as File | null

    let resumeBase64 = ""
    if (resumeFile) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      resumeBase64 = buffer.toString("base64")
    }

    // --- Admin email ---
    const adminHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#047857;">New Job Application Received</h2>
        <p><b>Job Title:</b> ${jobTitle}</p>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
      </div>
    `

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: "admin@nfpltc.com",
      subject: `New Application — ${jobTitle}`,
      html: adminHtml,
      attachments: resumeFile
        ? [
            {
              filename: resumeFile.name,
              content: resumeBase64,
            },
          ]
        : [],
    })

    // --- Thank You email to applicant ---
    const thankHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#047857;">Thank you for applying!</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your application for the <strong>${jobTitle}</strong> position at North Falmouth Pharmacy.</p>
        <p>Our team will review your application and reach out if there’s a fit.</p>
        <p style="margin-top:16px;">Best regards,<br/>North Falmouth Pharmacy HR Team</p>
      </div>
    `

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: `Application Received — ${jobTitle}`,
      html: thankHtml,
    })

    return NextResponse.json({ ok: true, message: "Emails sent successfully" })
  } catch (err: any) {
    console.error("Career Apply Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}