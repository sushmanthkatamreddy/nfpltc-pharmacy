import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'

type OcrFields = {
  account_number?: string | null
  first_name?: string | null
  dob_raw?: string | null
  raw?: string
  confidence?: number
}

function normalizeDob(input?: string | null): string | null {
  if (!input) return null
  const s = input.trim()
  // Allow mm/dd/yyyy or mm-dd-yyyy -> yyyy-mm-dd
  const m = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/)
  if (!m) return null
  let [ , mm, dd, yy ] = m
  if (yy.length === 2) yy = `20${yy}`
  return `${yy}-${mm.padStart(2,'0')}-${dd.padStart(2,'0')}`
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as Blob | null
    const fileName = (form.get('fileName') as string) || 'statement.pdf'
    const size = Number(form.get('size') ?? 0)

    if (!file) {
      return NextResponse.json({ ok: false, error: 'no_file' }, { status: 400 })
    }

    const base = (process.env.OCR_SERVICE_URL || '').replace(/\/+$/,'')
    if (!base) {
      return NextResponse.json({ ok: false, error: 'OCR_SERVICE_URL not set' }, { status: 500 })
    }

    // Forward the same Blob to OCR service — no ArrayBuffer conversion
    const fd = new FormData()
    fd.append('file', file, fileName)

    const r = await fetch(`${base}/ocr/extract-top`, { method: 'POST', body: fd })
    const bodyText = await r.text()
    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: 'ocr_failed', status: r.status, body: bodyText.slice(0,4000) },
        { status: 502 }
      )
    }

    let parsed: { fields: OcrFields } = { fields: {} }
    try {
      parsed = JSON.parse(bodyText)
    } catch {
      return NextResponse.json(
        { ok: false, error: 'ocr_invalid_json', body: bodyText.slice(0,4000) },
        { status: 502 }
      )
    }

    const fields = parsed.fields || {}
    const normalized = {
      account_number: fields.account_number ?? null,
      first_name: fields.first_name ?? null,
      dob: normalizeDob(fields.dob_raw),
      confidence: fields.confidence ?? null,
      raw: fields.raw ?? ''
    }

    // Optional match by account_number
    let match: 'matched' | 'not_found' = 'not_found'
    let profile_id: string | null = null

    if (normalized.account_number) {
      const sb = supabaseAdmin()
      const { data } = await sb
        .from('profiles')
        .select('id')
        .eq('account_number', normalized.account_number)
        .maybeSingle()

      if (data?.id) {
        match = 'matched'
        profile_id = data.id
      }
    }

    return NextResponse.json({
      ok: true,
      row: {
        fileName,
        size,
        account_number: normalized.account_number,
        first_name: normalized.first_name,
        dob: normalized.dob,
        match,
        profile_id,
        error: null
      }
    })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'server_error' }, { status: 500 })
  }
}