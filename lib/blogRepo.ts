import { supabaseAdmin } from "./supabaseAdmin"

export type BlogLite = {
  id: string
  title: string
  slug: string
  thumbnail_url: string | null
  author_name: string | null
  created_at: string | null
}

export type BlogFull = {
  id: string
  title: string
  slug: string
  author_name: string | null
  description: string | null
  content: string | null
  thumbnail_url: string | null
  main_image_url: string | null
  created_at: string | null
}

export async function fetchAllBlogLites(): Promise<BlogLite[]> {
  const sb = supabaseAdmin()
  const { data } = await sb
    .from("blogs")
    .select("id,title,slug,thumbnail_url,author_name,created_at")
    .order("created_at", { ascending: false })
    .returns<BlogLite[]>()
  return data ?? []
}

export async function fetchBlogBySlug(slug: string): Promise<BlogFull | null> {
  const sb = supabaseAdmin()
  const { data } = await sb
    .from("blogs")
    .select("id,title,slug,author_name,description,content,thumbnail_url,main_image_url,created_at")
    .eq("slug", slug)
    .maybeSingle<BlogFull>()
  return data ?? null
}

export async function fetchAllSlugs(): Promise<string[]> {
  const sb = supabaseAdmin()
  const { data } = await sb.from("blogs").select("slug").order("created_at", { ascending: false })
  return (data ?? []).map((r: any) => r.slug)
}