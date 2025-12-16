"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

type ServiceCardProps = {
  title: string
  description: string
  href?: string
  className?: string
}

export function ServiceCard({ title, description, href = "#", className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-sm ring-1 ring-black/5",
        "before:absolute before:inset-0 before:bg-[linear-gradient(#00000080,#00000080)]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:ring-1 after:ring-white/10",
        className,
      )}
      aria-label={title}
    >
      {/* Background placeholder blocks to mimic the checkerboard look */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-50">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={cn("bg-neutral-700", i % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700")} />
        ))}
      </div>

      <div className="relative flex h-full flex-col items-center justify-end gap-3 p-6 md:p-8">
        <h3 className="text-center text-xl font-semibold">{title}</h3>
        <p className="text-center text-sm text-neutral-200/90">{description}</p>
        <Link
          href={href}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
        >
          See detail
        </Link>
      </div>
    </div>
  )
}
