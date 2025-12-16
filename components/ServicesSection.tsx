"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type Service = { title: string; image: string; slug: string }

const services: Service[] = [
  { title: "Long-Term Care Pharmacy", image: "/ltc1.jpg", slug: "ltc" },
  { title: "MAP Consulting", image: "/map1.jpg", slug: "map-consulting" },
  { title: "MCPHS Student Training", image: "/tr1.jpg", slug: "mpchs-student-training" },
  { title: "Specialty Schools medication support", image: "/sch.jpg", slug: "specialty-schools-medication-support" },
  { title: "Reliable Prescription Delivery", image: "/del1.jpg", slug: "free-prescription-delivery" },
  { title: "Blister & Compliance Packaging", image: "/bl.webp", slug: "blister-packaging" },
  { title: "Assisted Living & Memory Care", image: "/as1.jpg", slug: "assisted-living" },
  { title: "Group Home & Rest Home Services", image: "/gh1.jpg", slug: "group-home" },
  { title: "Immunizations & Clinical Services", image: "/vc1.jpg", slug: "immunizations" },
  { title: "eMAR Integration", image: "/emar1.jpg", slug: "emar" },
]

export default function ServicesSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 leading-tight">
            Our Services
          </h2>
        </div>

        {/* ✅ Fixed 5 columns on all desktops and larger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-7 lg:gap-8 justify-items-center">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative block w-full aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Background image */}
              <img
                src={s.image}
                alt={s.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const t = e.currentTarget
                  t.src =
                    "data:image/svg+xml;utf8," +
                    encodeURIComponent(
                      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>
                        <rect width='100%' height='100%' fill='#e8f5ee'/>
                        <text x='50%' y='50%' text-anchor='middle' font-size='20' fill='#256340' font-family='sans-serif'>
                          Image not found
                        </text>
                      </svg>`
                    )
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(6,78,59,0.55) 10%, rgba(6,95,70,0.25) 45%, rgba(6,95,70,0.04) 92%)",
                }}
              />

              {/* Content layer */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <span className="bg-white/25 backdrop-blur-sm rounded-full p-2 border border-white/30 transition group-hover:bg-white/40">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </span>
                </div>
                <h3 className="text-white text-base md:text-[17px] font-semibold leading-snug drop-shadow-md">
                  {s.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}