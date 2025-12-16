'use client'

import { useRef, useState } from 'react'

type Row = {
  id?: string
  file?: File
  fileName: string
  size: number
  account_number: string | null
  first_name: string | null
  dob: string | null
  match: 'matched' | 'not_found'
  profile_id: string | null
  status: 'pending' | 'parsed' | 'matched' | 'saved' | 'error'
  error: string | null
}

type ProcessResp = {
  ok: boolean
  row?: Omit<Row, 'status' | 'file' | 'error'> & { error: null }
  error?: string
}

type SaveResp = { ok: boolean; error?: string }

export default function StatementsPage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [busy, setBusy] = useState(false)

  function pick() {
    inputRef.current?.click()
  }

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? [])
    setRows(list.map(f => ({
      file: f,
      fileName: f.name,
      size: f.size,
      account_number: null,
      first_name: null,
      dob: null,
      match: 'not_found',
      profile_id: null,
      status: 'pending',
      error: null
    })))
  }

  async function processAll() {
    setBusy(true)
    const next = [...rows]
    for (let i = 0; i < next.length; i++) {
      const r = next[i]
      if (!r.file) continue
      try {
        const fd = new FormData()
        fd.append('file', r.file, r.file.name)
        fd.append('fileName', r.file.name)
        fd.append('size', String(r.file.size))

        const res = await fetch('/api/statements/process', { method: 'POST', body: fd })
        const j = (await res.json()) as ProcessResp

        if (!res.ok || !j.ok || !j.row) {
          next[i] = { ...r, status: 'error', error: j.error || `HTTP ${res.status}` }
        } else {
          next[i] = { ...r, ...j.row, status: j.row.match === 'matched' ? 'matched' : 'parsed', error: null }
        }
      } catch (e: any) {
        next[i] = { ...r, status: 'error', error: e?.message ?? 'error' }
      }
      setRows([...next])
    }
    setBusy(false)
  }

  async function saveMatched() {
    setBusy(true)
    const next = [...rows]
    for (let i = 0; i < next.length; i++) {
      const r = next[i]
      if (r.status !== 'matched' || !r.file) continue
      try {
        const fd = new FormData()
        fd.append('file', r.file, r.file.name)
        fd.append('fileName', r.fileName)
        if (r.account_number) fd.append('account_number', r.account_number)
        if (r.first_name) fd.append('first_name', r.first_name)
        if (r.dob) fd.append('dob', r.dob)
        if (r.profile_id) fd.append('profile_id', r.profile_id)

        const res = await fetch('/api/statements/save', { method: 'POST', body: fd })
        const j = (await res.json()) as SaveResp
        next[i] = j.ok ? { ...r, status: 'saved', error: null } : { ...r, status: 'error', error: j.error || `HTTP ${res.status}` }
      } catch (e: any) {
        next[i] = { ...r, status: 'error', error: e?.message ?? 'error' }
      }
      setRows([...next])
    }
    setBusy(false)
  }

  return (
    <main className="p-6">
      <div className="rounded-xl border p-4">
        <div className="flex items-center gap-3">
          <button onClick={pick} className="rounded border px-3 py-2">Pick PDF(s)</button>
          <button onClick={processAll} disabled={busy || rows.length === 0} className="rounded border px-3 py-2">Process</button>
          <button onClick={saveMatched} disabled={busy || !rows.some(r => r.status === 'matched')} className="rounded bg-emerald-600 text-white px-3 py-2">
            Save All (matched)
          </button>
          <span className="text-sm text-gray-600">{rows.length} file(s) selected</span>
        </div>

        <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={onFiles} />

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">File</th>
                <th className="py-2">Acct</th>
                <th className="py-2">First</th>
                <th className="py-2">DOB</th>
                <th className="py-2">Status</th>
                <th className="py-2">Error</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2">{r.fileName}</td>
                  <td className="py-2">{r.account_number ?? '—'}</td>
                  <td className="py-2">{r.first_name ?? '—'}</td>
                  <td className="py-2">{r.dob ?? '—'}</td>
                  <td className="py-2">{r.status}</td>
                  <td className="py-2 text-red-600">{r.error ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}