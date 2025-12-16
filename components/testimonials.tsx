import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Testimonials() {
  const items = [
    {
      title: "Healing Words from patients & partners",
      body: "“They always pick up the phone and solve issues fast. Our clinic relies on them daily.”",
      meta: "Family Medicine Partner",
    },
    {
      title: "Local care, real impact",
      body: "“Knowledgeable and kind. They explained options clearly and followed up the next day.”",
      meta: "Patient, North Falmouth",
    },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold md:text-3xl">Healing Words from patients & partners</h3>
        </div>
        <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
          {items.map((t, idx) => (
            <Card key={idx}>
              <CardHeader>
                <Badge variant="secondary">Testimonial</Badge>
                <CardTitle className="text-lg">{t.title}</CardTitle>
                <CardDescription>{t.meta}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
