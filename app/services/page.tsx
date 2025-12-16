import type { Metadata } from "next"
import { ServicesHero } from "@/components/services/hero"
import { ServiceCard } from "@/components/services/card"
import { NewsletterCTA } from "@/components/services/newsletter-cta"
import { TestimonialsRow } from "@/components/services/testimonials-row"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Services — North Falmouth Pharmacy",
  description:
    "Providing personalized pharmacy care for Cape Cod — including LTC support, LTC at Home, eMAR integration, blister packaging, assisted living care, specialty schools, and immunizations.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <ServicesHero />

      {/* Services Grid */}
      <section className="bg-[#F7F4EF] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <p className="text-sm text-neutral-500">Our Services</p>
            <h2 className="text-pretty text-2xl font-semibold md:text-3xl">
              Comprehensive Pharmacy Care for Patients & Facilities
            </h2>
            <p className="mt-3 text-sm text-neutral-600 max-w-2xl mx-auto">
              From long-term care and eMAR integration to LTC at Home, blister packaging,
              and clinical immunizations — we combine technology, compassion, and
              precision for every patient and partner facility.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* ✅ Long-Term Care */}
            <ServiceCard
              title="Long-Term Care Pharmacy"
              description="Complete LTC solutions for assisted living, group homes, and rehabilitation centers — from medication synchronization to 24/7 on-call support."
              href="/services/ltc"
              bg="/services/ltc.jpg"
            />

            {/* ✅ LTC at Home */}
            <ServiceCard
              title="LTC at Home"
              description="Bringing professional pharmacy care into patients’ homes — with blister packaging, refill synchronization, and caregiver coordination for independent living."
              href="/services/ltc-at-home"
              bg="/services/ltc-home.jpg"
            />

            {/* ✅ eMAR Integration */}
            <ServiceCard
              title="eMAR Integration"
              description="Seamless integration with electronic MAR systems to simplify medication tracking, reduce errors, and streamline communication for caregivers."
              href="/services/emar"
              bg="/services/emar.jpg"
            />

            {/* ✅ Blister Packaging */}
            <ServiceCard
              title="Blister & Compliance Packaging"
              description="Accurate, easy-to-follow blister packaging that promotes adherence and improves safety for residents and care teams."
              href="/services/blister-packaging"
              bg="/services/blister.jpg"
            />

            {/* ✅ Assisted Living */}
            <ServiceCard
              title="Assisted Living & Memory Care"
              description="Pharmacy care designed for assisted living and memory care communities — focused on continuity, clarity, and compassionate delivery."
              href="/services/assisted-living"
              bg="/services/assisted.jpg"
            />

            {/* ✅ Group Home */}
            <ServiceCard
              title="Group Home & Rest Home Services"
              description="Dedicated medication management and refill coordination tailored to group and rest home facilities throughout Cape Cod."
              href="/services/group-home"
              bg="/services/group-home.jpg"
            />

            {/* ✅ Specialty Schools */}
            <ServiceCard
              title="Specialty Schools Medication Support"
              description="Secure, nurse-ready medication packaging and MAR sheets for special education and therapeutic schools — with staff training and documentation support."
              href="/services/specialty-schools-medication-support"
              bg="/services/schools.jpg"
            />

            {/* ✅ Free Prescription Delivery */}
            <ServiceCard
              title="Free Prescription Delivery"
              description="Fast, reliable prescription delivery across Cape Cod — ensuring patients and facilities receive medications on time, every time."
              href="/services/free-prescription-delivery"
              bg="/services/delivery.jpg"
            />

            {/* ✅ Immunizations */}
            <ServiceCard
              title="Immunizations & Clinical Services"
              description="Offering seasonal and preventive vaccinations — including flu, shingles, and pneumonia — administered by our certified pharmacists."
              href="/services/immunizations"
              bg="/services/immunizations.jpg"
            />

            {/* ✅ MAP Consulting */}
            <ServiceCard
              title="MAP Consulting"
              description="Guidance and training for Medication Administration Program (MAP) compliance — helping facilities meet state and clinical standards with confidence."
              href="/services/map-consulting"
              bg="/services/map.jpg"
            />

            {/* ✅ MPCHS Student Training */}
            <ServiceCard
              title="MPCHS Student Training"
              description="Clinical and practical training for MassPharmacy and healthcare students — supporting medication safety, packaging, and patient communication skills."
              href="/services/mpchs-student-training"
              bg="/services/training.jpg"
            />
          </div>
        </div>
      </section>

      <NewsletterCTA />
      <TestimonialsRow />
      <SiteFooter />
    </main>
  )
}