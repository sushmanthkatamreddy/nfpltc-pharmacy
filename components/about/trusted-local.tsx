export function TrustedLocal() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Text Side */}
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wide text-emerald-700/70">
              Caring for Cape Cod for Over 30 Years
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-balance">
              30 Years of Trusted Pharmacy Care — Where Compassion Meets Clinical Precision
            </h3>
            <p className="text-muted-foreground">
              For over three decades, North Falmouth Pharmacy has been more than a pharmacy — we’ve been a healthcare partner to Cape Cod’s families, caregivers, and long-term-care communities.
              Locally owned and community-driven, our mission is simple: to make healthcare personal, accessible, and consistent.
              <br />
              <br />
              From everyday prescriptions and vaccinations to complex long-term-care medication management, our experienced pharmacists deliver care that’s guided by accuracy, empathy, and trust.
              We proudly blend modern pharmacy technology with the genuine, face-to-face service that only a local pharmacy can provide.
            </p>
          </div>

          {/* Image Tiles */}
          <div className="rounded-2xl bg-white shadow-sm p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src="/blister.jpg"
                  alt="Pharmacy interior view"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src="/pharmacist.jpg"
                  alt="Pharmacist team at work"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src="/2150359107.jpg"
                  alt="Blister pack and medication management"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="aspect-[4/5] rounded-xl overflow-hidden">
                <img
                  src="/delivery.jpg"
                  alt="North Falmouth Pharmacy delivery service"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}