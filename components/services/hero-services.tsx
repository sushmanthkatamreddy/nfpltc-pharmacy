export function HeroServices() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600"
      aria-labelledby="services-hero-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="mb-3 text-white/80">Services</p>
          <h1
            id="services-hero-heading"
            className="text-pretty text-4xl font-semibold leading-tight text-white md:text-5xl"
          >
            Services
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Discover our full range of trusted pharmacy services for patients, facilities, and caregivers.
          </p>
        </div>
      </div>
    </section>
  )
}
