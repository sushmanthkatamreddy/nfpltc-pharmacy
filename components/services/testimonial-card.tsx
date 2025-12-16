type TestimonialCardProps = {
  quote: string
  author: string
  highlight?: boolean
}

export function TestimonialCard({ quote, author, highlight }: TestimonialCardProps) {
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
