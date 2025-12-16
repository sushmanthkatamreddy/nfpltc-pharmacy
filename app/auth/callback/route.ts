// app/auth/callback/route.ts
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { event, session } = body as {
    event?: "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED" | string
    session?: { access_token?: string; refresh_token?: string } | null
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // ✅ object adapter expected by your @supabase/ssr version
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        },
      },
    }
  )

  if (event === "SIGNED_OUT") {
    await supabase.auth.signOut()
  } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    await supabase.auth.setSession({
      access_token: session?.access_token ?? "",
      refresh_token: session?.refresh_token ?? "",
    })
  }

  return NextResponse.json({ ok: true })
}