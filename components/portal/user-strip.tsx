// components/UserStrip.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function UserStrip() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState<string>("")
  const [accountNumber, setAccountNumber] = useState<string>("")

  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      try {
        // 1) Who is logged in?
        const { data: userRes } = await supabase.auth.getUser()
        const user = userRes?.user
        if (!user) {
          // no session → back to login
          router.replace("/login")
          return
        }

        // 2) Fetch their profile (id matches auth user id)
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("full_name, account_number")
          .eq("id", user.id)
          .single()

        if (!mounted) return

        if (error || !profile) {
          // Fallbacks if missing
          setFullName(user.email ?? "User")
          setAccountNumber("—")
        } else {
          setFullName(profile.full_name || user.email || "User")
          setAccountNumber(profile.account_number || "—")
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProfile()
    return () => {
      mounted = false
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <section className="w-full bg-white">
      <div className="relative z-10 -mt-8 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-xl border border-emerald-900/10 bg-white px-4 py-4 shadow-sm md:rounded-2xl md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5Z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold">
              {loading ? "Loading…" : fullName}
            </p>
            <p className="text-xs text-muted-foreground">
              Account ID: {loading ? "—" : accountNumber}
            </p>
          </div>
        </div>

        {/* Right side: only Logout */}
        <div className="flex items-center gap-3">
          {/* If you prefer a route, keep <Link href="/logout">…</Link> instead */}
          <button
            onClick={handleLogout}
            className="ml-1 inline-flex items-center rounded-md border border-emerald-900/10 px-3 py-1.5 text-xs text-emerald-700 hover:bg-emerald-50"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  )
}