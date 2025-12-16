"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import Link from "next/link"

export function ServicesCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" })

  const services = [
    { title: " Long-Term Care (LTC) Pharmacy Services", desc: "Reliable, compliant, and compassionate — serving Cape Cod’s LTC facilities since 2013." },
    { title: " eMAR Integration & Medication Records", desc: "Reduce errors, stay compliant, and simplify every medication pass." },
    { title: "Blister & Multi-Dose Compliance Packaging", desc: "Safe, clear, and efficient — making every dose easy to manage." },
    { title: "Assisted Living & Memory Care Support", desc: "Compassionate pharmacy care designed for assisted living and dementia care environments." },
    { title: " Group Home & Rest Home Partnership Services", desc: "Flexible pharmacy services built around your facility’s needs." },
    { title: "Immunizations", desc: "From vaccines to audits — we support your facility at every level." },
  ]


  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16">
      <h3 className="mb-6 text-2xl font-semibold md:text-3xl">Comprehensive Pharmacy & Care Services</h3>
      <div className="relative">
        <div className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <Button size="icon" variant="outline" className="rounded-full bg-transparent" onClick={() => scrollBy(-320)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <Button size="icon" variant="outline" className="rounded-full bg-transparent" onClick={() => scrollBy(320)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div ref={ref} className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2">
          {services.map((s) => {
            const slugMap: Record<string, string> = {
              "Long-Term Care Support": "long-term-care-support",
              "Prescription Fulfillment": "prescription-services",
            }
            const href = slugMap[s.title] ? `/services/${slugMap[s.title]}` : "/services"
            return (
              <Card key={s.title} className="min-w-[260px] snap-start">
                <CardHeader>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
