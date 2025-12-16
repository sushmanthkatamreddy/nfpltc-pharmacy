export function SuccessStory() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Copy side */}
          <div>
            <p className="text-sm uppercase tracking-wide text-emerald-700/70">Success Story</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-pretty">
              How North Falmouth Pharmacy Makes a Difference Every Day
            </h3>
            <p className="mt-3 text-muted-foreground">
              From medication synchronization to bedside counseling, we create small, meaningful wins for patients and
              facilities alike.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="mt-1 size-2 rounded-full bg-emerald-600" /> Personalized guidance with every fill
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 rounded-full bg-emerald-600" /> Proactive refills and reliable delivery
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 rounded-full bg-emerald-600" /> Clear answers 24/7 for facilities
              </li>
            </ul>
          </div>

          {/* Illustration side */}
          <figure className="aspect-[4/3] rounded-2xl bg-white shadow-sm p-4">
            <img
              src="/placeholder.svg?height=540&width=720"
              alt="Pharmacist with clipboard illustration"
              className="h-full w-full rounded-xl object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
