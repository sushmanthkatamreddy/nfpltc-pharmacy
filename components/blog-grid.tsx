import Link from "next/link"
import { fetchAllBlogLites } from "@/lib/blogRepo"

type Props = {
  /** how many posts to show */
  limit?: number
  /** show the heading row with title + “View all” */
  showHeading?: boolean
  /** custom heading text */
  heading?: string
}

export default async function BlogGrid({
  limit = 3,
  showHeading = true,
  heading = "Latest from our blog",
}: Props) {
  const posts = (await fetchAllBlogLites()).slice(0, limit)
  if (posts.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {showHeading && (
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">{heading}</h2>
          <Link href="/blog" className="text-emerald-700 hover:underline">
            View all
          </Link>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
          >
            <Link href={`/blog/${p.slug}`} className="block">
              <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
                {p.thumbnail_url ? (
                  <img
                    src={p.thumbnail_url}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-100" />
                )}
              </div>
              <div className="p-5">
                <time className="text-xs text-neutral-500">
                  {p.created_at
                    ? new Date(p.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </time>
                <h3 className="mt-2 text-balance text-lg font-semibold group-hover:text-emerald-700">
                  {p.title}
                </h3>
                {p.author_name && (
                  <p className="mt-1 text-xs text-neutral-500">{p.author_name}</p>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}