import Link from "next/link"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { createClient as createSbAdmin } from "@supabase/supabase-js"
import { ShieldCheck, BadgeCheck, Users, FileText, Newspaper, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

function HeroBadge({
  icon: Icon, title, desc,
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

function StatCard({
  icon: Icon, label, value, href,
}: { icon: React.ElementType; label: string; value: number | string | null; href?: string }) {
  const Content = (
    <div className="group block rounded-xl border border-emerald-900/10 bg-white p-5 shadow-sm ring-emerald-700/15 transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700/10 text-emerald-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-semibold text-gray-900">{value ?? "—"}</p>
        </div>
        {href && <span className="text-sm font-medium text-emerald-700 group-hover:underline">Open</span>}
      </div>
    </div>
  )
  return href ? <Link href={href}>{Content}</Link> : Content
}

export const dynamic = "force-dynamic"

export default async function AdminHomePage() {
  // normalize cookies() across versions
  const maybeStore = cookies() as any
  const cookieStore = typeof maybeStore?.then === "function" ? await maybeStore : maybeStore

  // RLS-aware client (read-only cookies here)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n: string) => cookieStore.get(n)?.value } }
  )

  const { data: userRes } = await supabase.auth.getUser()
  const user = userRes?.user

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user?.id)
    .single()

  const displayName =
    profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")?.[0] || "Admin"

  // Counts
  let residentsCount: number | null = null
  let blogsCount: number | null = null

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const admin = createSbAdmin(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false, autoRefreshToken: false } }
      )
      // Prefer 'residents' table; fallback to 'profiles'
      const r1 = await admin.from("residents").select("*", { count: "exact", head: true })
      residentsCount = r1.error ? (await admin.from("profiles").select("*", { count: "exact", head: true })).count ?? 0 : r1.count ?? 0
      blogsCount = (await admin.from("blogs").select("*", { count: "exact", head: true })).count ?? 0
    } catch { /* fallback below */ }
  }

  if (residentsCount === null || blogsCount === null) {
    try {
      const r1 = await supabase.from("residents").select("*", { count: "exact", head: true })
      residentsCount = residentsCount ?? (r1.error
        ? (await supabase.from("profiles").select("*", { count: "exact", head: true })).count ?? null
        : r1.count ?? null)
      blogsCount = blogsCount ?? (await supabase.from("blogs").select("*", { count: "exact", head: true })).count ?? null
    } catch { /* ignore */ }
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF]">
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#0EA171 0%, #0B8F79 50%, #0B7C79 100%)",
          paddingTop: "96px",
          paddingBottom: "104px",
          marginTop: "12px",
          marginBottom: 0,
        }}
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex items-start gap-6">
            <span className="hidden h-24 w-1 rounded bg-white/80 md:block" aria-hidden="true" />
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-white md:text-4xl">Admin Portal</h1>
              <p className="mt-3 max-w-2xl text-white/90">
                Manage residents, publish blogs, and upload monthly statements — all in one secure workspace.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <HeroBadge icon={ShieldCheck} title="HIPAA Compliant" desc="Data privacy & security" />
                <HeroBadge icon={BadgeCheck} title="Licensed & Certified" desc="Massachusetts pharmacy" />
                <HeroBadge icon={Users} title="Community Focused" desc="Serving Cape Cod since 2013" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDENTITY STRIP */}
      <section>
        <div
          className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-xl border border-emerald-900/10 bg-white px-4 py-4 shadow-md md:rounded-2xl md:px-6"
          style={{ marginTop: "-36px" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold">{displayName}</p>
              <p className="text-xs text-gray-500">Role: {profile?.role ?? "admin"}</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/admin/logout?redirect=/admin/login"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-emerald-900/10 px-3 text-sm text-emerald-700 hover:bg-emerald-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 pt-10 pb-16 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-3">
          <nav className="rounded-xl border border-emerald-900/10 bg-white p-2 shadow-sm">
            <ul className="space-y-1">
              <li>
                <Link href="/admin" className="block rounded-md px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/admin/residents" className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50">
                  Residents
                </Link>
              </li>
              <li>
                <Link href="/admin/blogs" className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/admin/statements" className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50">
                  Statements
                </Link>
              </li>
            </ul>
          </nav>

          <div className="rounded-xl border border-emerald-900/10 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">Quick Actions</p>
            <div className="mt-3 grid gap-2">
              <Link href="/admin/residents/new">
                <Button className="h-9 w-full bg-emerald-700 hover:bg-emerald-800">New Resident</Button>
              </Link>
              <Link href="/admin/blogs/new">
                <Button variant="outline" className="h-9 w-full">New Blog Post</Button>
              </Link>
              <Link href="/admin/statements">
                <Button variant="outline" className="h-9 w-full">Upload Statement</Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div>
          {/* Stats strip — Residents + Blog Posts */}
          <div className="grid gap-6 sm:grid-cols-2">
            <StatCard icon={Users} label="Total Residents" value={residentsCount} href="/admin/residents" />
            <StatCard icon={Newspaper} label="Blog Posts" value={blogsCount} href="/admin/blogs" />
          </div>

          <div className="mt-10 rounded-xl border border-emerald-900/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Get things done</h2>
            <p className="mt-1 text-sm text-gray-600">
              Common tasks for admins. Manage residents, publish blogs, and upload monthly statements.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/admin/blogs" className="group rounded-lg border border-emerald-900/10 p-4 hover:bg-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-700/10 text-emerald-700">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Manage Blogs</p>
                    <p className="text-sm text-gray-600">Publish news, updates, and resources</p>
                  </div>
                </div>
              </Link>

              <Link href="/admin/statements" className="group rounded-lg border border-emerald-900/10 p-4 hover:bg-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-700/10 text-emerald-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Manage Statements</p>
                    <p className="text-sm text-gray-600">Upload PDFs per account and date</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}