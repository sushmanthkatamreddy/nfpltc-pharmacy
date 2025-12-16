"use client"

import { Button } from "@/components/ui/button"

export function HeroAbout() {
  return (
    <section className="relative overflow-hidden">
      {/* gradient header band */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
        <div className="container mx-auto px-4 py-16 md:py-24 text-white">
          <p className="text-sm/6 opacity-90">About Us</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Discover Our Story and the People Behind North Falmouth Pharmacy
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            North Falmouth Pharmacy grew out of a simple promise: real pharmacists, real answers. Since 2013, we’ve been Cape Cod’s independent, community-first pharmacy—focused on clarity, compassion, and doing the little things right.
          </p>
          <div className="mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
