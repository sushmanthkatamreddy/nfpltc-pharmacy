import { Button } from "@/components/ui/button"

export function Gallery() {
  const items = Array.from({ length: 12 })

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Gallery</p>
          <h3 className="text-2xl font-semibold md:text-3xl">A Look Inside North Falmouth Pharmacy & Our Community</h3>
        </div>
        <Button variant="outline" className="hidden md:inline-flex bg-transparent">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((_, i) => (
          <img
            key={i}
            className="aspect-square rounded-lg border object-cover"
            src={`/community-photo-.jpg?height=400&width=400&query=community%20photo%20${i + 1}`}
            alt="Community or pharmacy"
          />
        ))}
      </div>
    </section>
  )
}
