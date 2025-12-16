"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeartPulse } from "lucide-react"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-8 pt-10 md:grid-cols-2 md:gap-12 lg:pb-16">
      {/* Left column */}
      <div className="flex flex-col gap-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          Your Trusted Cape Cod for Over 30 Years
        </div>

        <h1 className="text-pretty text-4xl font-semibold leading-tight md:text-5xl">
          Real Pharmacists. Real Support. 24/7 for your Residents.
        </h1>

        <p className="max-w-prose text-muted-foreground">
          Helpful, accurate guidance from licensed pharmacists whenever you need it. 
          We collaborate with providers and support patients with clarity and care.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* "Get Started" → Enrollment Form */}
          <Link href="/forms/enrollment" passHref>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Get Started
            </Button>
          </Link>

          {/* "Learn More" → Services Page */}
          <Link href="/services" passHref>
            <Button variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Right column → Full responsive iframe */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <iframe
          src="https://my.spline.design/pillanddnaanimation-4ZBRcKlnjem5rcSWxYkgTqOp/"
          frameBorder="0"
          className="absolute inset-0 w-full h-full object-contain"
          allow="autoplay; fullscreen"
        />
      </div>
    </section>
  )
}