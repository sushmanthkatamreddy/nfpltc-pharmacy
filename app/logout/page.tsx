"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    try {
      localStorage.removeItem("nf_portal_session")
    } catch {}
    router.replace("/login")
  }, [router])
  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <p className="text-sm text-foreground/70">Signing you out…</p>
    </main>
  )
}
