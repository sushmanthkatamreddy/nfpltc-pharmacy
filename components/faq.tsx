import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      q: "What makes North Falmouth Pharmacy different from chain pharmacies?",
      a: "We’re a Independant, locally owned Cape Cod pharmacy that provides direct pharmacist access, personalized medication care, and 24/7 support for patients and facilities — not just prescriptions.",
    },
    {
      q: "Do you provide support for long-term care facilities?",
      a: "Yes. We specialize in serving assisted living, rest homes, group homes, and memory care communities with medication synchronization, eMAR integration, and dedicated delivery support.",
    },
    {
      q: "What is eMAR and how does it help my facility?",
      a: "eMAR (Electronic Medication Administration Record) simplifies med passes by providing real-time medication documentation and alerts. We integrate directly with major eMAR systems for seamless updates.",
    },
    {
      q: "Do you offer medication packaging for facilities?",
      a: "Yes. We offer multi-dose and unit-dose blister packaging with clear labeling and MAR sheets — reducing errors and improving medication adherence for residents and caregivers.",
    },
    {
      q: "Do you offer home delivery?",
      a: "Yes. We provide reliable, timely deliveries across Cape Cod and Southeastern Massachusetts, including same-day service for urgent prescriptions.",
    },
    {
      q: "Can I transfer my prescriptions to North Falmouth Pharmacy from my current pharmacy?",
      a: "Absolutely. Just share your current pharmacy information and we’ll handle the transfer, ensuring your medications continue without interruption.",
    },
    {
      q: "Do you offer vaccinations?",
      a: "Yes. Each year we work closely with facilities to provide flu, pneumonia, shingles, and COVID-19 vaccines through our on-site vaccinations clinics.",
    },
    {
      q: "What insurance plans do you accept?",
      a: "We accept most major insurance plans, including Medicare and Medicaid. Our billing team assists with claims and coordination to ensure smooth coverage.",
    },
    {
      q: "Do you offer after-hours pharmacist support?",
      a: "Yes. Our pharmacists are available 24/7 to assist in MAP consulations and medication emergencies.",
    },
    {
      q: "How do you help facilities stay compliant?",
      a: "We support compliance through regular audits, MAR documentation, staff in-service training, and pharmacist consultations — keeping your operations survey-ready year-round.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700/80">
            Everything You Need to Know
          </p>
          <h2 className="mt-3 text-4xl font-extrabold text-gray-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Find clear answers about our pharmacy services and patient support.
            Whether you’re a facility partner or an individual, we’re here to
            make medication management simple and safe.
          </p>
        </div>

        {/* Right Column - Accordion */}
        <div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-left text-gray-900 hover:text-emerald-700 text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}