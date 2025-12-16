"use client"

import { Button } from "@/components/ui/button"

export function NewsletterCta() {
  return (
    <section className="my-6">
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
        <div className="container mx-auto px-4 py-14 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">Join To Our Newsletter</h3>
          <p className="mt-2 max-w-2xl mx-auto text-white/85">
            Join our patient and partner community to receive monthly tips, seasonal insights, and updates from our
            pharmacists.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button variant="secondary" className="bg-white text-emerald-700 hover:bg-white/90">
              Get started
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Subscribe Us</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
