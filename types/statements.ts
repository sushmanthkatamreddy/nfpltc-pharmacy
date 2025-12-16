// Shared, tiny, and intentionally permissive to avoid “Row” mismatches

export type OcrFields = {
  account_number: string | null
  first_name: string | null
  dob_raw: string | null
}

export type NormalizedFields = {
  account_number: string | null
  first_name: string | null
  dob: string | null // YYYY-MM-DD
}

export type MatchStatus = "matched" | "not_found"

export type ProcessResult = {
  ok: true
  file: {
    name: string
    size: number
  }
  ocr: {
    fields: OcrFields
    confidence: number | null
    raw?: string
  }
  normalized: NormalizedFields
  match: MatchStatus
  profile?: {
    id: string
    first_name: string | null
    account_number: string
    dob: string | null
  } | null
}

export type ProcessError = {
  ok: false
  error: string
}