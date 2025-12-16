"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Menu, ChevronDown } from "lucide-react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [formsOpen, setFormsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  const handleNavigate = () => {
    setOpen(false)
    setFormsOpen(false)
    setServicesOpen(false)
  }

  // Reordered primary nav
  const nav = [
    { href: "/about", label: "About Us" },
    { href: "/pill-finder", label: "Pill Finder" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header
      className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* ✅ Logo with drop shadow */}
        <Link href="/" className="flex items-center" onClick={handleNavigate}>
          <Image
            src="/logo.svg"
            alt="North Falmouth Pharmacy"
            width={1000}
            height={300}
            priority
            style={{
              height: "clamp(80px, 5.5vw, 56px)",
              width: "auto",
              display: "block",
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))",
            }}
          />
        </Link>

        {/* ✅ Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex relative">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavigate}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* ✅ Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services <ChevronDown className="h-4 w-4" />
            </button>

            <div
              className={`absolute left-0 top-full z-30 mt-1 w-64 rounded-md border bg-white p-1 shadow-lg transition-all duration-150 ${
                servicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {[
                ["Assisted Living & Memory Care", "/services/assisted-living"],
                ["Group Home & Rest Home Services", "/services/group-home"],
                ["Long-Term Care Pharmacy", "/services/ltc"],
                ["eMAR Integration", "/services/emar"],
                // ✅ Two inserted services here:
                ["Blister & Compliance Packaging", "/services/blister-packaging"],
                ["Free Prescription Delivery", "/services/free-prescription-delivery"],
                // Then continue the remaining ones:
                ["Speciality Schools Medication Support", "/services/specialty-schools-medication-support"],
                ["MAP Consulting", "/services/map-consulting"],
                ["MPCHS Student Training", "/services/mpchs-student-training"],
                ["Immunizations & Clinical Services", "/services/immunizations"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleNavigate}
                  className="block rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* ✅ Forms Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setFormsOpen(true)}
            onMouseLeave={() => setFormsOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={formsOpen}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setFormsOpen((v) => !v)}
            >
              Forms <ChevronDown className="h-4 w-4" />
            </button>

            <div
              className={`absolute left-0 top-full z-30 mt-1 w-64 rounded-md border bg-white p-1 shadow-lg transition-all duration-150 ${
                formsOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              onMouseEnter={() => setFormsOpen(true)}
              onMouseLeave={() => setFormsOpen(false)}
            >
              {[
                ["Enrollment Form", "/forms/enrollment"],
                ["Credit Card Update Form", "/forms/credit-card-update"],
                ["Vaccine Consent Form", "/forms/vaccine-consent"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleNavigate}
                  className="block rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* ✅ Call Now — visible number */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="tel:+15085644459"
            onClick={handleNavigate}
            className="flex items-center gap-2 text-emerald-700 font-medium"
          >
            <Button
              variant="outline"
              className="gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "8px",
              }}
            >
              <Phone className="h-4 w-4" /> (508) 564-4459
            </Button>
          </a>
        </div>

        {/* ✅ Mobile Toggle */}
        <button
          aria-label="Open menu"
          className="md:hidden"
          onClick={() => setOpen((p) => !p)}
          style={{ padding: "4px" }}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {open && (
        <div className="md:hidden animate-fade-in">
          <div className="mx-auto grid max-w-6xl gap-2 px-4 pb-4">
            {/* Reordered */}
            <Link href="/about" onClick={handleNavigate} className="rounded-md px-3 py-2 text-sm hover:bg-muted">
              About Us
            </Link>

            {/* ✅ Services */}
            <div className="rounded-md border p-2">
              <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">Services</div>
              {[
                ["Assisted Living & Memory Care", "/services/assisted-living"],
                ["Group Home & Rest Home Services", "/services/group-home"],
                ["Long-Term Care Pharmacy", "/services/ltc"],
                ["eMAR Integration", "/services/emar"],
                ["Blister & Compliance Packaging", "/services/blister-packaging"],
                ["Free Prescription Delivery", "/services/free-prescription-delivery"],
                ["MAP Consulting", "/services/map-consulting"],
                ["Speciality Schools Medication Support", "/services/specialty-schools-medication-support"],
                ["MPCHS Student Training", "/services/mpchs-student-training"],
                ["Immunizations & Clinical Services", "/services/immunizations"],
                ["LTC at Home", "/services/ltc-at-home"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleNavigate}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link href="/pill-finder" onClick={handleNavigate} className="rounded-md px-3 py-2 text-sm hover:bg-muted">
              Pill Finder
            </Link>

            {/* ✅ Forms */}
            <div className="rounded-md border p-2">
              <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">Forms</div>
              {[
                ["Vaccine Consent Form", "/forms/vaccine-consent"],
                ["Enrollment Form", "/forms/enrollment"],
                ["Credit Card Update Form", "/forms/credit-card-update"],
              ].map(([label, href]) => (
                <Link key={href} href={href} onClick={handleNavigate} className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {label}
                </Link>
              ))}
            </div>

            <Link href="/careers" onClick={handleNavigate} className="rounded-md px-3 py-2 text-sm hover:bg-muted">
              Careers
            </Link>
            <Link href="/blog" onClick={handleNavigate} className="rounded-md px-3 py-2 text-sm hover:bg-muted">
              Blog
            </Link>
            <Link href="/contact" onClick={handleNavigate} className="rounded-md px-3 py-2 text-sm hover:bg-muted">
              Contact
            </Link>

            {/* Call Now */}
            <a href="tel:+15085644459" className="mt-2" onClick={handleNavigate}>
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "8px 14px",
                  borderRadius: "8px",
                }}
              >
                <Phone className="h-4 w-4" /> (508) 564-4459
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}