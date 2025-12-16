'use client'
import { useEffect, useState } from "react"

export default function BlogViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false
    async function bump() {
      try {
        const r = await fetch(`/api/blogs/${encodeURIComponent(slug)}/view`, { method: "POST" })
        const j = await r.json().catch(() => ({}))
        if (!ignore && typeof j?.views === "number") setViews(j.views)
      } catch { /* ignore */ }
    }
    bump()
    return () => { ignore = true }
  }, [slug])

  return <span>👁 {views ?? "—"}</span>
}