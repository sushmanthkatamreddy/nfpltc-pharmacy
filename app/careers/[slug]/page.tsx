"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { jobs } from "@/lib/jobs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = jobs.find((j) => j.slug === params.slug)
  if (!job) return notFound()

  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMsg(null)
    try {
      const body = new FormData()
      body.append("firstName", form.firstName)
      body.append("lastName", form.lastName)
      body.append("email", form.email)
      body.append("phone", form.phone)
      body.append("jobTitle", job.title)
      if (form.resume) body.append("resume", form.resume)

      const res = await fetch("/api/careers/apply", { method: "POST", body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send")
      setMsg("✅ Application submitted successfully! Check your email.")
      setForm({ firstName: "", lastName: "", email: "", phone: "", resume: null })
      setOpen(false)
    } catch (err: any) {
      setMsg(`❌ ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <p className="text-sm opacity-90">{job.company}</p>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {job.type}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-10 lg:pr-12">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Job Description</h2>
            {job.description?.map((p, i) => (
              <p key={i} className="text-muted-foreground mb-3">
                {p}
              </p>
            ))}
          </section>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {job.qualifications && job.qualifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-3">Qualifications</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {job.qualifications.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="border rounded-xl p-6 shadow-sm bg-white space-y-4 lg:sticky top-24">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {job.location}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Job Type</p>
              <p className="font-medium">{job.type}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Posted</p>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {job.posted}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Work Location</p>
              <p className="font-medium">{job.workLocation}</p>
            </div>

            <Button
              onClick={() => setOpen(true)}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
            >
              Apply for this job
            </Button>

            {msg && (
              <p className="text-sm text-center text-gray-600 pt-2">{msg}</p>
            )}
          </div>
        </aside>
      </section>

      {/* ✅ Application Form Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-white rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume (PDF/DOC)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
              />
            </div>

            <DialogFooter className="pt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}