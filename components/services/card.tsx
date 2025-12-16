import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  description: string
  href?: string
  className?: string
  bg?: string          // e.g. "/s1.jpg" from /public
}

export function ServiceCard({ title, description, href = "#", className, bg }: Props) {
  // Strong dark overlay baked into the background itself
  const bgStyle = bg
    ? {
        backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.53), rgba(0, 0, 0, 0.47)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as React.CSSProperties
    : undefined

  return (
    <article
      aria-label={title}
      style={bgStyle}
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5",
        "text-white", // ensure text white on dark overlay
        className
      )}
    >
      <div className="flex h-full min-h-[240px] md:min-h-[280px] flex-col items-center justify-center gap-3 p-6 md:p-8">
        <h3 className="text-center text-xl font-semibold">{title}</h3>
        <p className="max-w-prose text-center text-sm text-white/95">{description}</p>
        <Link
          href={href}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          See detail
        </Link>
      </div>

      {/* optional subtle ring on top */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
    </article>
  )
}