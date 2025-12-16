"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

type Job = {
  id: number
  title: string
  location: string
  department: string
  summary: string
  slug: string
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Staff Pharmacist",
    location: "North Falmouth, MA 02556",
    department: "Pharmacy Operations",
    summary:
      "Dispense blister-packed medications, collaborate with doctors and facility nurses, and ensure compliance with state and Medicare requirements. Part-time role with weekend rotation.",
    slug: "staff-pharmacist",
  },
  {
    id: 2,
    title: "Certified Pharmacy Technician (CPhT)",
    location: "North Falmouth, MA 02556",
    department: "Pharmacy Support",
    summary:
      "Assist pharmacists in preparing sterile products and IV infusions, maintain inventory accuracy, and deliver outstanding patient care in a fast-paced clinical environment.",
    slug: "certified-pharmacy-technician",
  },
  {
    id: 3,
    title: "Pharmacy Technician",
    location: "111 County Road, North Falmouth, MA 02556",
    department: "Pharmacy Support",
    summary:
      "Prepare and label prescriptions, maintain medication logs and inventory, and support daily operations in a high-volume pharmacy. Full-time position with benefits.",
    slug: "pharmacy-technician",
  },
]

export default function CareersPage() {
  return (
    <main>
      {/* Hero Section */}
      <section aria-labelledby="careers-hero" className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <p className="text-sm/6 opacity-90">Careers</p>
            <h1
              id="careers-hero"
              className="text-3xl md:text-5xl font-semibold tracking-tight text-balance"
            >
              Join our team at North Falmouth Pharmacy
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base opacity-90">
              We’re looking for caring, motivated professionals who want to make a
              difference in community and long-term-care pharmacy.
            </p>
          </div>
        </div>
      </section>

      {/* Job Grid */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border rounded-xl shadow-sm p-6 flex flex-col justify-between transition hover:shadow-md"
            >
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {job.department} • {job.location}
                </p>
                <p className="text-sm mt-4 line-clamp-3">{job.summary}</p>
              </div>
              <div className="mt-6">
                <Link href={`/careers/${job.slug}`}>
                  <Button variant="outline" className="w-full">
                    View Job
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}