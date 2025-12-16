"use client"

import { Button } from "@/components/ui/button"

export function AboutHero() {
  return (
    <section aria-labelledby="about-hero" className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm/6 opacity-90">About Us</p>
          <h1 id="about-hero" className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Your Trusted Cape Cod Pharmacy for Over 30 Years
          </h1>
        </div>
      </div>
    </section>
  )
}
