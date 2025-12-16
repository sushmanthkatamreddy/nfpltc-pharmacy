"use client"

import { Button } from "@/components/ui/button"

export function CommunityMosaic() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wide text-emerald-700/70">Team</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-pretty">
              Caring for Our Community — Meet the North Falmouth Pharmacy Team
            </h3>
            <p className="text-muted-foreground">
              We’re neighbors, caregivers, and partners in your health journey. Get to know the people behind the
              counter.
            </p>
            <Button variant="secondary" className="bg-orange-500 text-white hover:bg-orange-600">
              See more
            </Button>
          </div>
          {/* Mosaic images to mimic screenshot */}
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square rounded-xl bg-neutral-200" />
            <div className="aspect-[3/4] rounded-xl bg-neutral-200" />
            <div className="aspect-square rounded-xl bg-neutral-200" />
            <div className="col-span-2 aspect-[5/3] rounded-xl bg-neutral-200" />
            <div className="aspect-square rounded-xl bg-neutral-200" />
          </div>
        </div>
      </div>
    </section>
  )
}
