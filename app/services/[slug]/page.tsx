import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import { services } from "@/lib/services"

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

// ✅ params is async in your Next setup, so await it
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const svc = services.find((s) => s.slug === slug)

  if (!svc) return {}

  return {
    title: `${svc.title} — North Falmouth Pharmacy`,
    description: svc.description,
    openGraph: {
      title: `${svc.title} — North Falmouth Pharmacy`,
      description: svc.description,
      images: svc.thumb ? [{ url: svc.thumb }] : [],
    },
  }
}

// ✅ make page async + await params
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const svc = services.find((s) => s.slug === slug)

  if (!svc) return notFound()

  return (
    <main className="min-h-dvh bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex items-start gap-6">
            <span aria-hidden className="h-24 w-px rounded-full bg-white/80" />
            <div>
              <h1 className="text-3xl font-semibold md:text-5xl">{svc.title}</h1>
              <p className="mt-4 max-w-2xl text-sm md:text-base text-white/85">
                {svc.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE + INTRO + FEATURES */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="rounded-xl bg-foreground/5 p-2">
          <Image
            src={svc.hero || svc.thumb || "/placeholder.svg?height=420&width=1140"}
            alt={`${svc.title} illustration`}
            width={1140}
            height={420}
            className="h-auto w-full rounded-lg object-cover"
            priority
          />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{svc.title}</h2>
            <p className="mt-3 text-muted-foreground">{svc.intro}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {(svc.features ?? []).map((f, i) => (
              <div
                key={i}
                className={
                  f.style === "solid"
                    ? "rounded-xl bg-[linear-gradient(135deg,#10b981_0%,#0f766e_100%)] p-5 text-white"
                    : "rounded-xl border border-black/10 p-5"
                }
              >
                <div
                  className={`text-sm font-medium ${
                    f.style === "solid" ? "opacity-90" : "text-foreground"
                  }`}
                >
                  {f.title}
                </div>
                <p
                  className={`mt-2 text-xs ${
                    f.style === "solid" ? "opacity-80" : "text-muted-foreground"
                  }`}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT SECTION */}
      <section className="relative isolate overflow-hidden bg-emerald-50/50 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <Image
            src={svc.hero2 || svc.hero || "/placeholder.svg?height=420&width=560"}
            alt={`${svc.title} workflow`}
            width={560}
            height={420}
            className="h-auto w-full rounded-xl object-cover"
          />
          <div>
            <p className="text-emerald-600 text-sm font-medium">
              Introducing Trusted Pharmacy Care
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Why Choose Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(svc.bullets ?? []).map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}