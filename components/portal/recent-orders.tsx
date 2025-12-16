type Order = { id: string; status: "Delivered" | "Processing" | "pending"; when: string }
const ORDERS: Order[] = [
  { id: "NFPTLC0945", status: "Delivered", when: "Today, 2:30 PM" },
  { id: "NFPTLC2348", status: "pending", when: "Today, 1:30 PM" },
  { id: "NFPTLC9834", status: "Processing", when: "Yesterday, 5:30 PM" },
]

export default function RecentOrders() {
  return (
    <section className="rounded-xl border border-emerald-900/10 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-emerald-900">Recent Orders</h3>
        <button className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">
          + New Order
        </button>
      </div>
      <ul className="space-y-3">
        {ORDERS.map((o) => (
          <li
            key={o.id}
            className="flex items-center justify-between rounded-lg border border-emerald-900/10 bg-emerald-50/50 px-3 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600/10 text-emerald-700">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm-7 8a7 7 0 0 1 14 0v1H5v-1Z" />
                </svg>
              </span>
              <span className="font-medium text-emerald-900">{o.id}</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  o.status === "Delivered"
                    ? "bg-emerald-600 text-white"
                    : o.status === "Processing"
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-amber-400 text-amber-950"
                }`}
              >
                {o.status}
              </span>
              <span className="text-xs text-muted-foreground">{o.when}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
