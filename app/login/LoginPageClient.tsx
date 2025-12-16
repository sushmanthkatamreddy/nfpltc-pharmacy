// app/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShieldCheck, BadgeCheck, Users, FileText } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type LoginProfile = {
  email: string
  dob: string
  account_number: string
}

function HeroBadge({
  icon: Icon,
  title,
  desc,
}: { icon: React.ElementType; title: string; desc: string }) {
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

export default function UserLoginPage() {
  const router = useRouter()
  const [account, setAccount] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // letters, numbers, dash only
  const sanitizeAccount = (val: string) => val.replace(/[^A-Za-z0-9-]/g, "").trim()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const rawAccount = (formData.get("account") as string) ?? ""
    const dob = (formData.get("dob") as string) ?? ""
    const password = (formData.get("password") as string) ?? ""

    const acct = sanitizeAccount(rawAccount)
    if (!acct || acct.includes("@")) {
      setError("Please enter your Account Number (letters, numbers, and dashes only).")
      setSubmitting(false)
      return
    }

    // Normalize to YYYY-MM-DD to match DB date
    const normalizedDob = new Date(dob).toISOString().split("T")[0]

    // RPC returns an ARRAY (0 or 1 rows). No generics, no .single().
    const { data, error: lookupError } = await supabase.rpc("login_profile", {
      p_account: acct,
    })

    if (lookupError) {
      setError("There was a problem checking your account. Please try again.")
      setSubmitting(false)
      return
    }

    const profile = (data as LoginProfile[] | null)?.[0] ?? null
    if (!profile) {
      setError("No profile found with that account number.")
      setSubmitting(false)
      return
    }

    const dbDob = new Date(profile.dob).toISOString().split("T")[0]
    if (dbDob !== normalizedDob) {
      setError("DOB does not match our records.")
      setSubmitting(false)
      return
    }

    // Sign in with the email tied to this account
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password,
    })

    if (authError) {
      setError("Invalid password.")
      setSubmitting(false)
      return
    }

    router.push("/portal/statements")
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0EA171_0%,#0B8F79_50%,#0B7C79_100%)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-start gap-6">
            <span className="hidden h-24 w-1 rounded bg-white/80 md:block" aria-hidden="true" />
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-white md:text-4xl">Resident Portal</h1>
              <p className="mt-3 max-w-2xl text-white/90">
                Streamline your medication management with our secure portal.
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
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2">
        {/* Login form */}
        <div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="account"
                name="account"
                placeholder="e.g. 4310"
                value={account}
                onChange={(e) => setAccount(sanitizeAccount(e.target.value))}
                inputMode="text"
                pattern="^[A-Za-z0-9-]+$"
                title="Use your account number (letters, numbers, and dashes only)"
                className="h-12 rounded-full bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">DOB</Label>
              <Input id="dob" name="dob" type="date" className="h-12 rounded-full bg-white" required />
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

            <Button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="h-12 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-60 md:w-[360px]"
            >
              {submitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>

        {/* Right: Features */}
        <aside className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Complete facility management</h2>
          <p className="max-w-md text-gray-600">Secure access to statements and records for registered residents.</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-emerald-700/15 bg-white p-4 shadow-sm">
              <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700/10 text-emerald-700">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Statements</h3>
                <p className="text-sm text-gray-600">Securely download and view your statements</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}