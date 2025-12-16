// middleware.ts
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const config = {
  matcher: ["/admin/:path*"], // but we won't redirect here
}

export function middleware(_req: NextRequest) {
  // Let the (protected) layout do all auth
  return NextResponse.next()
}