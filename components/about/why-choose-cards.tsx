import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Banknote } from "lucide-react"

export function WhyChoose() {
  const cards = [
    {
      title: "Long-Term-Care Pharmacy",
      desc: "Providing complete LTC solutions for Assisted Living, Group Homes, and Rehabilitation Centers — from blister packaging and MAR sheets to 24-hour on-call emergency support.",
      icon: <Award className="h-6 w-6 text-emerald-700" />,
      variant: "default",
    },
    {
      title: "Blister & Compliance Packaging",
      desc: "Medications organized for accuracy and ease — reducing errors, improving adherence, and giving nurses and caregivers confidence during every med pass.",
      icon: <Users className="h-6 w-6 text-emerald-700" />,
      variant: "default",
    },
    {
      title: "Facility Delivery & 24/7 Support",
      desc: "Timely, scheduled deliveries across Cape Cod and Southeastern Massachusetts with a dedicated team available around the clock for urgent requests and after-hours needs.",
      icon: <Banknote className="h-6 w-6 text-emerald-700" />,
      variant: "default",
    },
    {
      title: "Immunizations & Clinical Services",
      desc: "Offering flu, shingles, pneumonia, and COVID-19 vaccines on-site or in-pharmacy, administered by licensed pharmacists with decades of clinical experience.",
      icon: <Award className="h-6 w-6 text-emerald-700" />,
      variant: "default",
    },
    {
      title: "Medication Therapy Management (MTM)",
      desc: "Personalized medication reviews, interaction checks, and compliance monitoring to ensure each patient receives the safest, most effective treatment plan.",
      icon: <Users className="h-6 w-6 text-emerald-700" />,
      variant: "default",
    },
    {
      title: "Seamless E-Prescribing & Billing",
      desc: "Integrated e-prescription workflow and Medicare/Medicaid billing support — ensuring accuracy, speed, and full compliance for facilities and individual patients.",
      icon: <Banknote className="h-6 w-6 text-emerald-700" />,
      variant: "default",
    },
  ] as const

  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Why?</p>
        <h2 className="text-balance text-3xl font-semibold md:text-4xl">
          Why North Falmouth Pharmacy is the Best Choice
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) =>
          c.variant === "highlight" ? (
            <Card key={c.title} className="bg-emerald-700 text-white">
              <CardHeader className="flex items-center gap-3">
                <span className="rounded-md bg-white/10 p-2">{c.icon}</span>
                <CardTitle className="text-lg">{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80">{c.desc}</CardDescription>
              </CardContent>
            </Card>
          ) : (
            <Card key={c.title}>
              <CardHeader className="flex items-center gap-3">
                <span className="rounded-md bg-emerald-50 p-2">{c.icon}</span>
                <CardTitle className="text-lg">{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{c.desc}</CardDescription>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </section>
  )
}
