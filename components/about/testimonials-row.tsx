export function TestimonialsRow() {
  return (
    <section className="py-16 md:py-20 bg-[#faf9f5]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr_1fr]">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-emerald-700/70">Testimonials</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-pretty">Healing words from patients & partners</h3>
          </div>

          {/* Highlighted green card */}
          <article className="rounded-2xl p-6 bg-gradient-to-b from-emerald-500 to-teal-500 text-white border border-transparent">
            <p>
              “The team is so responsive and kind. They caught a potential interaction and called me right away. It’s
              rare to feel this cared for.”
            </p>
            <p className="mt-4 text-sm opacity-90">— Olivia, Client</p>
          </article>

          {/* Outline card */}
          <article className="rounded-2xl p-6 bg-white border">
            <p>
              “Reliable deliveries and clear communication. Our facility trusts them completely for our residents’
              needs.”
            </p>
            <p className="mt-4 text-sm text-muted-foreground">— George, Client</p>
          </article>
        </div>
      </div>
    </section>
  )
}
