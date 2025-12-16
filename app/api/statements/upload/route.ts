import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const files = form.getAll("files") as File[]

    // Robust interop: works whether pdf-parse exports default or not.
    const mod = await import("pdf-parse")
    const pdf: (input: Buffer) => Promise<{ text: string }> =
      // @ts-ignore – support both ESM/CJS builds
      (mod.default ?? mod) as any

    const results: any[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const parsed = await pdf(buffer)
      const text = parsed?.text ?? ""

      // --- very basic regex; tune for your statements header layout ---
      const accountNumber =
        text.match(/Account\s*Number[:\s]*([A-Z0-9\-]+)/i)?.[1] ?? null
      const dobRaw =
        text.match(
          /\b(?:DOB|Date of Birth)[:\s]*([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/i
        )?.[1] ?? null
      const firstName = text.match(/Name[:\s]*([A-Za-z]+)/i)?.[1] ?? null

      const dob = dobRaw
        ? new Date(dobRaw.replace(/-/g, "/")).toISOString().slice(0, 10)
        : null

      // Upload original PDF into Supabase Storage
      const objectName = `statement-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.pdf`
      const { data: uploaded, error: upErr } = await supabase.storage
        .from("statements")
        .upload(objectName, buffer, { contentType: "application/pdf" })
      if (upErr) throw upErr

      // Insert DB row
      const { data: row, error: dbErr } = await supabase
        .from("statements")
        .insert({
          account_number: accountNumber,
          dob,
          first_name: firstName,
          pdf_path: uploaded?.path,
          status: "uploaded",
        })
        .select("*")
        .single()
      if (dbErr) throw dbErr

      results.push(row)
    }

    return NextResponse.json({ ok: true, rows: results })
  } catch (e: any) {
    console.error("❌ Statement upload error:", e)
    return NextResponse.json(
      { ok: false, error: e.message || "Upload failed" },
      { status: 500 }
    )
  }
}