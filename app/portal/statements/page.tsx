import PortalHero from "@/components/portal/portal-hero"
import UserStrip from "@/components/portal/user-strip"
import StatementsList from "@/components/portal/statements-list"

export const metadata = {
  title: "Facility Portal • Statements",
}

export default function PortalStatementsPage() {
  return (
    <main>
      {/* Hero matches the portal look/theme */}
      <PortalHero />
      {/* Facility/user identity strip */}
      <UserStrip />
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-8">
        <div className="space-y-6 md:col-start-2">
          <StatementsList />
        </div>
      </section>
    </main>
  )
}
