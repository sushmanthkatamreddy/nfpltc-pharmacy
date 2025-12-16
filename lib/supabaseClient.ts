// lib/supabaseClient.ts
import { createBrowserClient } from "@supabase/ssr"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient(url, key)

let listenerAttached = false
export function attachSupabaseAuthListener() {
  if (listenerAttached) return
  listenerAttached = true
  supabase.auth.onAuthStateChange(async (event, session) => {
    await fetch("/auth/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, session }),
    })
  })
}