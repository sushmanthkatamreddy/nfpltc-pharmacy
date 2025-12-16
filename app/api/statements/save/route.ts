import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'

function ymParts(d = new Date()) {
  return { y: d.getFullYear(), m: String(d.getMonth() + 1).padStart(2, '0') }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as Blob | null
    const fileName = (form.get('fileName') as string) || 'statement.pdf'
    const account_number = (form.get('account_number') as string) || null
    const first_name = (form.get('first_name') as string) || null
    const dob = (form.get('dob') as string) || null
    const profile_id = (form.get('profile_id') as string) || null

    if (!file) {
      return NextResponse.json({ ok: false, error: 'no_file' }, { status: 400 })
    }

    const sb = supabaseAdmin()
    const { y, m } = ymParts()
    const path = `statements/${y}/${m}/${crypto.randomUUID()}-${fileName}`

    // Upload PDF to storage
    const { error: upErr } = await sb
      .storage
      .from('statements')
      .upload(path, file, { contentType: 'application/pdf', upsert: true })
    if (upErr) {
      return NextResponse.json({ ok: false, error: upErr.message }, { status: 500 })
    }

    // Insert record
    const { error: insErr } = await sb
      .from('statements')
      .insert({
        profile_id,
        storage_path: path,
        original_filename: fileName,
        mapped_fields: { account_number, first_name, dob },
        map_confidence: 1,
        status: 'uploaded'
      })
      .single()

    if (insErr) {
      return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'server_error' }, { status: 500 })
  }
}