"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"

const HIDE_HEADER_PATHS = new Set<string>(["/", "/about", "/services"])

export function HeaderInLayout() {
  const pathname = usePathname()
  // Normalize trailing slash for safety
  const normalized = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

  const shouldHide = HIDE_HEADER_PATHS.has(normalized)
  if (shouldHide) return null

  return <SiteHeader />
}
