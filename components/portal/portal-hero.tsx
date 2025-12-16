type PortalHeroProps = {
  title?: string
}

export default function PortalHero({ title = "Resident Portal" }: PortalHeroProps) {
  return (
    <section
      aria-label="Resident Portal hero"
      className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="border-l-4 border-white/70 pl-6">
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm md:text-base/7 opacity-90">
            Streamline your medication management with our comprehensive facility portal designed for healthcare
            administrators.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: "HIPAA Compliant", desc: "Your privacy and security are protected", icon: "shield" },
            { title: "Licensed & Certified", desc: "Fully licensed Massachusetts pharmacy", icon: "badge" },
            { title: "Community Focused", desc: "Serving Cape Cod since 2013", icon: "users" },
          ].map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur"
            >
              <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-white">
                  {b.icon === "shield" && <path fill="currentColor" d="M12 3l7 3v6c0 5-3.5 9-7 9s-7-4-7-9V6l7-3z" />}
                  {b.icon === "badge" && (
                    <path
                      fill="currentColor"
                      d="M12 2l2.39 4.84L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.61-.16L12 2z"
                    />
                  )}
                  {b.icon === "users" && (
                    <path
                      fill="currentColor"
                      d="M16 11c1.66 0 3-1.57 3-3.5S17.66 4 16 4s-3 1.57-3 3.5S14.34 11 16 11zm-8 0c1.66 0 3-1.57 3-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V20h10v-3.5C11 14.17 6.33 13 4 13zm12 0c-.29 0-.62.02-.97.06 1.16.84 1.97 1.97 1.97 3.44V20h5v-1.5c0-2.33-4.67-3.5-7-3.5z"
                    />
                  )}
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-xs opacity-90">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
