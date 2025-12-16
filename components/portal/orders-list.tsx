type OrderRow = { id: string; status: "Delivered" | "Processing" | "pending"; when: string }

const ROWS: OrderRow[] = [
  { id: "NFPTLC0346", status: "Delivered", when: "Today, 2:30 PM" },
  { id: "NFPTLC3454", status: "pending", when: "Today, 1:30 PM" },
  { id: "NFPTLC6784", status: "Processing", when: "Yesterday, 5:30 PM" },
  { id: "NFPTLC3456", status: "Delivered", when: "Today, 2:30 PM" },
  { id: "NFPTLC9873", status: "pending", when: "Today, 1:30 PM" },
  { id: "NFPTLC2893", status: "Processing", when: "Yesterday, 5:30 PM" },
  { id: "NFPTLC4367", status: "Delivered", when: "Today, 2:30 PM" },
]

export default function OrdersList() {
  return (
    <section className="rounded-xl border border-emerald-900/10 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-900/10 bg-white px-3 py-2 text-sm text-emerald-900">
          <span className="font-semibold">All Orders</span>
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path fill="currentColor" d="M7 10l5 5l5-5z" />
          </svg>
        </div>
        <button className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">
          + New Order
        </button>
      </div>

      <ul className="space-y-3">
        {ROWS.map((o) => (
          <li
            key={o.id}
            className="flex items-center justify-between rounded-lg border border-emerald-900/10 bg-white px-3 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600/10 text-emerald-700">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm-7 8a7 7 0 0 1 14 0v1H5v-1Z" />
                </svg>
              </span>
              <span className="font-medium text-emerald-900">{o.id}</span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                  o.status === "Delivered"
                    ? "bg-emerald-600 text-white"
                    : o.status === "Processing"
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-amber-400 text-amber-950"
                }`}
              >
                {o.status}
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M7 10l5 5l5-5z" />
                </svg>
              </span>
              <span className="text-xs text-muted-foreground">{o.when}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>10 of 47</span>
        <div className="inline-flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`h-6 w-6 rounded-md border border-emerald-900/10 ${
                n === 1 ? "bg-emerald-600 text-white" : "bg-white hover:bg-emerald-50"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
