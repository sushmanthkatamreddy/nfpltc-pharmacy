export function StatsStrip() {
  const stats = [
    { label: "Expert Staff", value: "10+" },
    { label: "Teams", value: "122+" },
    { label: "Services", value: "563+" },
    { label: "Projects Done", value: "232+" },
  ]
  return (
    <section
      aria-label="Key stats"
      className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white"
    >
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-semibold">{s.value}</div>
              <div className="text-sm opacity-90">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
