"use client"

export function VideoBox({
  src = "/videos/nf.mp4",
  title = "A Glimpse Into Our Pharmacy",
  subtitle = "See how we care for our community through personalized service and long-term care expertise.",
}: {
  src?: string
  title?: string
  subtitle?: string
}) {
  return (
    <section className="relative bg-[#f4f8f5] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-semibold text-emerald-900 md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-muted-foreground md:text-lg">
          {subtitle}
        </p>

        {/* ✅ Autoplay, loop, muted video */}
        <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-5xl">
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}