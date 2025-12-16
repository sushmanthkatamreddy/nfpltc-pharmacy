export type ParsedFields = {
  account_number: string | null
  first_name: string | null
  dob: string | null // ISO yyyy-mm-dd
}

export type MatchResult = {
  id: string
  full_name: string
  account_number: string
} | null

export type ProcessResponse = {
  ok: true
  fields: ParsedFields
  match: MatchResult
  confidence?: number | null
  raw?: string
} | { ok: false; error: string }

export type SaveResponse = {
  ok: true
  id: string
  storage_path: string
} | { ok: false; error: string }