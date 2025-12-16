import PortalHero from "@/components/portal/portal-hero"
import UserStrip from "@/components/portal/user-strip"
import SummaryCards from "@/components/portal/summary-cards"
import RecentOrders from "@/components/portal/recent-orders"
import AlertsPanel from "@/components/portal/alerts-panel"

export const metadata = {
  title: "Resident Portal Dashboard",
}

export default function PortalDashboardPage() {
  return (
    <main>
      <PortalHero />
      <UserStrip />

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-[260px_1fr]">
        <div className="space-y-6">
          <SummaryCards />
          <RecentOrders />
          <AlertsPanel />
        </div>
      </section>
    </main>
  )
}
