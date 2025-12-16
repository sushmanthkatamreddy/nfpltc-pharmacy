"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShieldCheck, BadgeCheck, Users, FileText } from "lucide-react"
import { supabase, attachSupabaseAuthListener } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

function HeroBadge({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType
  title: string
  desc: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 text-white">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/15">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs opacity-90">{desc}</p>
      </div>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-emerald-700/15 bg-white p-4 shadow-sm">
      <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700/10 text-emerald-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ensure client ↔ server auth stays in sync
  useEffect(() => {
    attachSupabaseAuthListener()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = (formData.get("email") as string).toLowerCase()
    const password = formData.get("password") as string

    // 1) Authenticate
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError("Invalid email or password.")
      setSubmitting(false)
      return
    }

    // 2) Proactively sync cookies on the server (avoids any race)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      await fetch("/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "SIGNED_IN", session: sessionData?.session }),
      })
    } catch {
      // ignore; listener will also sync
    }

    // 3) Go to admin (or ?redirect=…)
    const next = params.get("redirect") || "/admin"
    router.replace(next)
    setSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] flex flex-col">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0EA171_0%,#0B8F79_50%,#0B7C79_100%)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-start gap-6">
            <span className="hidden h-24 w-1 rounded bg-white/80 md:block" aria-hidden="true"></span>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-white md:text-4xl">Admin Portal</h1>
              <p className="mt-3 max-w-2xl text-white/90">
                Secure HIPAA-compliant access for pharmacy administrators to manage users, statements, and content.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <HeroBadge icon={ShieldCheck} title="HIPAA Compliant" desc="Your privacy and security are protected" />
                <HeroBadge icon={BadgeCheck} title="Licensed & Certified" desc="Fully licensed Massachusetts pharmacy" />
                <HeroBadge icon={Users} title="Community Focused" desc="Serving Cape Cod since 2013" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 flex-1">
        {/* Left: Login Form */}
        <div>
          <form className="space-y-5 max-w-md" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" className="h-12 rounded-full bg-white" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" className="h-12 rounded-full bg-white" required />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="text-right">
              <Link href="#" className="text-sm font-medium text-[#E86E3A] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={submitting} className="h-12 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-60 md:w-[360px]">
              {submitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>

        {/* Right: Features */}
        <aside className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Admin Capabilities</h2>
          <p className="max-w-md text-gray-600">Manage everything from one secure portal — users, statements, and blogs.</p>
          <div className="space-y-4">
            <Feature icon={FileText} title="Statement Management" desc="Upload and manage facility billing statements" />
            <Feature icon={Users} title="User Management" desc="Add and update portal users" />
            <Feature icon={BadgeCheck} title="Content Management" desc="Publish and manage blogs" />
          </div>
        </aside>
      </section>
    </main>
  )
}