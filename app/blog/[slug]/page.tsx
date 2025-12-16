import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

import { fetchAllSlugs, fetchBlogBySlug } from "@/lib/blogRepo"
import BlogViewCounter from "@/components/blog-view-counter"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function generateStaticParams() {
  try { return (await fetchAllSlugs()).map((slug) => ({ slug })) } catch { return [] }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchBlogBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — North Falmouth Pharmacy`,
    description: post.description ?? "",
    openGraph: {
      title: post.title,
      description: post.description ?? "",
      images: post.main_image_url ? [{ url: post.main_image_url }] : undefined,
      type: "article",
    },
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogBySlug(params.slug)
  if (!post) return <main className="mx-auto max-w-3xl p-6">Post not found.</main>

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mb-6 text-sm text-white/80">
              <Link href="/blog" className="hover:underline">Blog</Link>{" "}
              <span className="opacity-60">/</span>{" "}
              <span className="opacity-90">{post.title}</span>
            </div>

            <div className="flex items-start gap-6">
              <span aria-hidden className="h-24 w-px rounded-full bg-white/80" />
              <div>
                <h1 className="text-pretty text-3xl font-semibold md:text-5xl">{post.title}</h1>
                {post.description && <p className="mt-4 max-w-3xl text-white/85">{post.description}</p>}

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <span>
                    📅 {post.created_at ? new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    }) : "—"}
                  </span>
                  {/* 👁 View Counter */}
                  <BlogViewCounter slug={params.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.main_image_url && (
        <section className="mx-auto max-w-6xl px-6">
          <div className="-mt-10 rounded-2xl bg-foreground/[0.04] p-2 shadow-sm ring-1 ring-black/5 md:-mt-16">
            <Image
              src={post.main_image_url}
              alt={post.title}
              width={1280} height={720}
              className="h-auto w-full rounded-xl object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Article Body (markdown or html) */}
      <article className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <div className="prose prose-emerald prose-lg max-w-none leading-relaxed md:leading-loose">
          {post.content?.trim()?.startsWith("<") ? (
            <div dangerouslySetInnerHTML={{ __html: post.content! }} />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {post.content ?? ""}
            </ReactMarkdown>
          )}
        </div>

        {/* Author */}
        <div className="mt-12 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            {post.author_name ? `Written by ${post.author_name}` : "North Falmouth Pharmacy Team"}
          </p>
        </div>

        {/* Back */}
        <div className="mt-12 text-center">
          <Link href="/blog" className="text-emerald-700 font-semibold hover:underline">← Back to Blog</Link>
        </div>
      </article>
    </main>
  )
}