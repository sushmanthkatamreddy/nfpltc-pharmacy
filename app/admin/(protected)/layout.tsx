import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  // In some Next versions/types, cookies() is Promise-like. Normalize it:
  const maybeStore = cookies() as any
  const cookieStore = typeof maybeStore?.then === "function" ? await maybeStore : maybeStore

  // Read-only cookie adapter (NO cookie writes in a layout)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // ❗No-ops to avoid “Cookies can only be modified …” in layouts
        set(_name: string, _value: string, _options: CookieOptions) {},
        remove(_name: string, _options: CookieOptions) {},
      },
    }
  )

  const { data: { user } = { user: null } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  return <>{children}</>
}