// app/api/admin/login/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  // TODO: validate with Supabase (or your auth) and issue token/session
  const token = "signed.jwt.or.session-id"

  const res = NextResponse.json({ ok: true })
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1h
  })
  return res
}