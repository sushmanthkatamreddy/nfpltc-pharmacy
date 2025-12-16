type CardProps = { quote: string; author: string; highlight?: boolean }

function TestimonialCard({ quote, author, highlight }: CardProps) {
  return (
    <figure
      className={
        highlight
          ? "rounded-2xl bg-gradient-to-b from-emerald-500 to-teal-500 p-6 text-white shadow-sm"
          : "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      }
    >
      <blockquote className={highlight ? "text-white/90" : "text-neutral-700"}>{quote}</blockquote>
      <figcaption className={highlight ? "mt-4 font-medium text-white" : "mt-4 font-medium text-neutral-900"}>
        {author}
      </figcaption>
    </figure>
  )
}

export function TestimonialsRow() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-neutral-500">Testimonials</p>
          <h3 className="mt-2 text-pretty text-2xl font-semibold md:text-3xl">
            Healing Words from patients & partners
          </h3>
        </div>
        <div className="grid gap-6 md:col-span-2 md:grid-cols-3">
          <TestimonialCard
            highlight
            quote="The team is always available and caring. Their packaging made a huge difference."
            author="George J. — Client"
          />
          <TestimonialCard
            quote="Excellent coordination with our facility—timely and reliable every time."
            author="Care Partner"
          />
          <TestimonialCard quote="Compassionate pharmacists who truly listen and help." author="Local Patient" />
        </div>
      </div>
    </section>
  )
}
