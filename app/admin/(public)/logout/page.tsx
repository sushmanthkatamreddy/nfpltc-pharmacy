// app/logout/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function LogoutPage() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const doLogout = async () => {
      // 1) Client sign-out (clears localStorage session)
      await supabase.auth.signOut().catch(() => {})

      // 2) Tell the server to clear auth cookies (so SSR guard sees logged-out)
      try {
        await fetch("/auth/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "SIGNED_OUT" }),
        })
      } catch {}

      // 3) Go where we want next
      const next = params.get("redirect") || "/admin/login" // default to admin login
      router.replace(next)
    }

    void doLogout()
  }, [params, router])

  return (
    <main className="mx-auto max-w-lg p-8">
      <p className="text-sm text-gray-600">Signing out…</p>
    </main>
  )
}