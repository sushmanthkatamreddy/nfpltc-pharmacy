export default function AlertsPanel() {
  return (
    <section className="rounded-xl border border-emerald-900/10 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-emerald-900">Alerts & Notifications</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-3 text-rose-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-rose-100">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="M1 21h22L12 2L1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold">Medication Shortage Alert</p>
            <p className="text-xs opacity-80">Lisinopril 10mg running low - 3 days supply remaining</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-emerald-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.17l-3.59-3.58L4 14l5 5l12-12l-1.41-1.42L9 16.17Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold">Delivery Completed</p>
            <p className="text-xs opacity-80">Weekly medication delivery received and verified</p>
          </div>
        </div>
      </div>
    </section>
  )
}
