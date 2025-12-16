import Link from "next/link"
import { createClient as createAdmin } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Plus, Pencil } from "lucide-react"
import DeleteButton from "./DeleteButton"
import { deleteBlog } from "./action"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type RowBase = {
  id: string
  title: string
  slug: string
  author_name: string | null
  thumbnail_url: string | null
  created_at: string | null
}
type Row = RowBase & { views: number }

export default async function BlogsAdminPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const srv = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!srv) {
    return (
      <main className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <Link href="/admin/blogs/new">
            <Button className="bg-emerald-700 hover:bg-emerald-800">
              <Plus className="h-4 w-4 mr-2" /> New Post
            </Button>
          </Link>
        </div>
        <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-900">
          Missing env: <code>SUPABASE_SERVICE_ROLE_KEY</code>. Add it and restart the dev server.
        </div>
      </main>
    )
  }

  const admin = createAdmin(url, srv, { auth: { persistSession: false, autoRefreshToken: false } })

  // Base rows (no 'views' column assumed on blogs)
  const { data: baseRows, error } = await admin
    .from("blogs")
    .select("id,title,slug,created_at,thumbnail_url,author_name")
    .order("created_at", { ascending: false })
    .returns<RowBase[]>()

  // Merge with blog_views table if it exists (fallback to 0)
  let rows: Row[] = (baseRows ?? []).map((r) => ({ ...r, views: 0 }))
  try {
    const { data: vrows } = await admin
      .from("blog_views")
      .select("blog_id,views")
      .returns<{ blog_id: string; views: number }[]>()
    if (vrows) {
      const vmap = new Map(vrows.map((v) => [v.blog_id, v.views ?? 0]))
      rows = rows.map((r) => ({ ...r, views: vmap.get(r.id) ?? 0 }))
    }
  } catch {
    // ignore if table missing/policy blocked
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Link href="/admin/blogs/new">
          <Button className="bg-emerald-700 hover:bg-emerald-800">
            <Plus className="h-4 w-4 mr-2" /> New Post
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-800">
          Fetch error: {error.message}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-emerald-900/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-emerald-50/60 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Views</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {r.thumbnail_url ? (
                      <img src={r.thumbnail_url} alt="" className="h-8 w-8 rounded object-cover" />
                    ) : (
                      <div className="h-8 w-8 rounded bg-gray-100" />
                    )}
                    <span className="font-medium text-gray-900">{r.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">/{r.slug}</td>
                <td className="px-4 py-3 text-gray-700">{r.author_name ?? "—"}</td>
                <td className="px-4 py-3 text-gray-700">{r.views ?? 0}</td>
                <td className="px-4 py-3 text-gray-600">
                  {r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/blogs/${r.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    {/* Client confirm + server action submit */}
                    <DeleteButton action={deleteBlog.bind(null, r.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                  No posts yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}