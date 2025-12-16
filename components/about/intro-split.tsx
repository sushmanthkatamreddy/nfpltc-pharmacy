"use client"

import { Button } from "@/components/ui/button"

export function IntroSplit() {
  return (
    <section className="bg-[#faf9f5]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Illustration tile */}
          <div>
            <figure className="aspect-[4/3] rounded-2xl p-4">
              {/* ... placeholder stands in for hero illustration block ... */}
              <img
                src="/ab.png"
                alt="Illustrative pharmacist and workspace"
                className="h-full w-full rounded-xl object-cover"
              />
            </figure>
          </div>

          {/* Copy + CTA */}
          <div>
            <h2 className="mt-2 text-2xl md:text-4xl font-semibold text-balance">
              Passionate professional Pharmacists
            </h2>
            <p className="mt-4 text-muted-foreground">
              We are an independent long-term care pharmacy with over 30 years of experience serving Assisted Living, Memory Care Facilities and Group Homes in Cape Cod, Plymouth and Pembroke. <br /> <br />We work closely with physicians, nursing staff and families to assure quality care to our customers.Our Multi-dose compliance packaging saves time and assures proper administration of medications.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
