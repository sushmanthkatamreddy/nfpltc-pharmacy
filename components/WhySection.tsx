"use client"

import { ShieldCheck, HeartHandshake, Truck, GraduationCap } from "lucide-react"

const features = [
  {
    title: "MAP Consulting & Staff Training",
    desc: "Expert guidance for Medication Administration Program (MAP) compliance, audits, and ongoing staff upskilling.",
    icon: <Truck className="w-6 h-6 text-white" />,
  },
  {
    title: "Reliable Prescription Delivery",
    desc: "Fast delivery across Cape Cod and south eastern Massachusetts so meds reach patients and facilities on time, every time.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "Specialty School Medication Support",
    desc: "Nurse-ready packaging, MAR sheets, and on-site training for safe medication administration in diverse educational settings.",
    icon: <HeartHandshake className="w-6 h-6 text-white" />,
  },
  {
    title: "LTC at Home Program",
    desc: "Blister-packed meds, refill sync, and caregiver check-ins—bringing long-term care standards to the home.",
    icon: <GraduationCap className="w-6 h-6 text-white" />,
  },
]

export default function WhySection({
  backgroundImage = "/features-bg.png",
}: {
  backgroundImage?: string
}) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(247, 250, 248, 0.94), rgba(247, 250, 248, 0.94)), url(${backgroundImage})`
          : "linear-gradient(to right, #f4faf5, #f9fcfa)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-white/70 backdrop-blur-sm p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-green-700 font-semibold uppercase tracking-wider text-sm">
                Why Choose Us
              </p>

              <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Compassion. Accuracy.<br />Care.
              </h2>

              <p className="text-gray-700 text-base leading-relaxed max-w-md">
                We blend local pharmacy expertise with modern workflows to make care simple, personal, and dependable. From long-term care facilities to LTC at Home and specialty schools, our team coordinates medications, training, and delivery so every dose is on time—and every patient is supported.
              </p>
            </div>

            {/* Right Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-7 hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {/* Optional faint icon watermark */}
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}