import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterCTA() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h3 className="text-2xl font-semibold md:text-3xl">Join To Our Newsletter</h3>
        <p className="mx-auto mt-2 max-w-prose text-white/80">
          Be the first to receive pharmacy updates, vaccine clinics, and tips from our local team.
        </p>
        <form className="mx-auto mt-6 flex max-w-md gap-2">
          <Input className="bg-white text-foreground" placeholder="Your email address" type="email" />
          <Button className="bg-orange-500 text-white hover:bg-orange-600">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}
