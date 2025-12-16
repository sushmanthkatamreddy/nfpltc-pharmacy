import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(_req: Request, { params }: { params: { slug: string } }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })

  // Find the blog row
  const { data: blog, error: be } = await sb
    .from("blogs")
    .select("id,views")
    .eq("slug", params.slug)
    .maybeSingle()

  if (be || !blog) return NextResponse.json({ ok: false }, { status: 204 })

  let newViews = 0

  // Prefer blog_views table if present
  try {
    const { data: viewRow, error: selErr } = await sb
      .from("blog_views")
      .select("id,views")
      .eq("blog_id", blog.id)
      .maybeSingle()

    if (selErr && selErr.code === "42P01") throw selErr // table doesn't exist

    if (viewRow) {
      newViews = (viewRow.views ?? 0) + 1
      await sb.from("blog_views").update({ views: newViews }).eq("id", viewRow.id)
    } else {
      newViews = 1
      await sb.from("blog_views").insert({ blog_id: blog.id, views: newViews })
    }
  } catch {
    // Fallback to blogs.views column
    newViews = (blog.views ?? 0) + 1
    await sb.from("blogs").update({ views: newViews }).eq("id", blog.id)
  }

  return NextResponse.json({ ok: true, views: newViews })
}