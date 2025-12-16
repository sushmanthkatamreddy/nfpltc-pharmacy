export function QuoteBanner() {
  return (
    <section className="relative my-16 md:my-20">
      <div className="container mx-auto px-0">
        <div className="relative overflow-hidden rounded-none md:rounded-2xl">
          <div className="absolute inset-0 grid grid-cols-5 gap-2 opacity-40">
            <div className="bg-neutral-800" />
            <div className="bg-neutral-700" />
            <div className="bg-neutral-900" />
            <div className="bg-neutral-700" />
            <div className="bg-neutral-800" />
          </div>
          <div className="relative bg-neutral-900/80">
            <div className="container mx-auto px-4 py-12 md:py-16">
              <p className="text-white/80 text-5xl leading-none mb-6">“</p>
              <p className="text-white text-lg md:text-xl max-w-3xl">
                Good health starts with trust. At North Falmouth Pharmacy, we treat every patient like family — because
                your care is our calling.
              </p>
              <p className="text-white/80 text-5xl leading-none mt-6 text-right">”</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
