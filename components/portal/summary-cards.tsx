type Stat = { label: string; value: string; icon: "box" | "pending" | "calendar" }

export default function SummaryCards() {
  const stats: Stat[] = [
    { label: "Total Orders", value: "47", icon: "box" },
    { label: "Pending Orders", value: "12", icon: "pending" },
    { label: "Due Today", value: "8", icon: "calendar" },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center justify-between rounded-xl bg-emerald-600/10 px-5 py-5 ring-1 ring-emerald-700/20"
        >
          <div>
            <p className="text-sm text-emerald-900/80">{s.label}</p>
            <p className="mt-1 text-3xl font-semibold text-emerald-800">{s.value}</p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600 text-white">
            <svg width="22" height="22" viewBox="0 0 24 24">
              {s.icon === "box" && (
                <path fill="currentColor" d="M20 6l-8-4l-8 4v12l8 4l8-4V6Zm-8 3l-6-3l6-3l6 3l-6 3Z" />
              )}
              {s.icon === "pending" && (
                <path fill="currentColor" d="M12 22a10 10 0 1 1 10-10A10 10 0 0 1 12 22Zm1-11V7h-2v6h6v-2Z" />
              )}
              {s.icon === "calendar" && <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3v16H4V4h3V2Zm12 6H5v10h14V8Z" />}
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}
