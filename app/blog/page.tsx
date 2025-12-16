import Link from "next/link"
import { fetchAllBlogLites } from "@/lib/blogRepo"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function BlogListPage() {
  const posts = await fetchAllBlogLites()

  return (
    <main>
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-start gap-6">
              <span aria-hidden className="h-24 w-px rounded-full bg-white/80" />
              <div>
                <h1 className="text-pretty text-3xl font-semibold md:text-5xl">Blog</h1>
                <p className="mt-4 max-w-2xl text-white/80">
                  Practical guidance on medication safety, long-term care, packaging, and preventive care —
                  directly from your trusted Cape Cod pharmacy team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-[#FBF9F2]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition hover:shadow-md"
              >
                <Link href={`/blog/${post.slug}`} className="block focus:outline-none">
                  <div className="aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-100" />
                    )}
                  </div>
                  <div className="p-5">
                    <time className="text-xs text-neutral-500">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      }) : "—"}
                    </time>
                    <h2 className="mt-2 text-balance text-lg font-semibold group-hover:text-emerald-700">
                      {post.title}
                    </h2>
                    {/* optional author */}
                    <p className="mt-1 text-xs text-neutral-500">
                      {post.author_name ?? ""}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-emerald-700">
                      <span className="text-sm font-medium">Read more</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition">
                        <path
                          d="M5 12h14M13 5l7 7-7 7"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="mt-4 text-sm text-neutral-500">No posts yet. Please check back soon.</p>
          )}
        </div>
      </section>
    </main>
  )
}