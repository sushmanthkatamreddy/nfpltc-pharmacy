"use client"

import { Download, FileText, Filter, SortAsc } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import OtpModal from "@/components/OtpModal"

// Statement type
type Statement = {
  id: number
  title: string
  date: string
  href?: string
}

// Toolbar
export function StatementsToolbar() {
  return (
    <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
      {/* left: filter + sort (just visual) */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <button className="inline-flex items-center gap-2">
          <Filter className="h-4 w-4 text-foreground/70" />
          <span>Filter</span>
        </button>
        <button className="inline-flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-foreground/70" />
          <span>Sort</span>
        </button>
      </div>

      {/* right: Download All */}
      <button
        onClick={() => alert("Demo: Download all not yet implemented")}
        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        aria-label="Download all statements"
      >
        <Download className="h-4 w-4" />
        Download All
      </button>
    </div>
  )
}

// Main List
export default function StatementsList() {
  const [statements, setStatements] = useState<Statement[]>([])
  const [otpModal, setOtpModal] = useState<{ open: boolean; id?: number }>({ open: false })
  const [otpValues, setOtpValues] = useState(Array(6).fill(""))
  const [userEmail] = useState("demo@example.com")

  // Load local statements
  useEffect(() => {
    setStatements([
      {
        id: 1,
        title: "Statement January 2025",
        date: "25-01-2025",
        href: "/statements/jan2025.pdf",
      },
      {
        id: 2,
        title: "Statement February 2025",
        date: "25-02-2025",
        href: "/statements/statement-feb-2025.pdf",
      },
    ])
  }, [])

  // Request OTP
  const handleRequestOtp = (id: number) => {
    setOtpModal({ open: true, id })
  }

  // Verify OTP
  const handleVerifyOtp = () => {
    if (!otpModal.id) return
    const otp = otpValues.join("")

    if (otp === "123456") {
      const statement = statements.find((s) => s.id === otpModal.id)
      if (statement?.href) {
        window.open(statement.href, "_blank")
      }
      setOtpModal({ open: false })
      setOtpValues(Array(6).fill(""))
    } else {
      alert("Invalid OTP. Use 123456 for demo.")
    }
  }

  return (
    <section
      aria-labelledby="statements-title"
      className="rounded-xl border border-black/10 bg-white/90 shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-4">
        <h2 id="statements-title" className="text-base font-semibold text-foreground">
          All Statements
        </h2>
      </div>

      <StatementsToolbar />

      <ul role="list" className="divide-y divide-black/10">
        {statements.map((s) => (
          <li key={s.id} className={cn("px-4 py-3")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.date}</p>
                </div>
              </div>

              <button
                onClick={() => handleRequestOtp(s.id)}
                className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-1.5 text-sm text-foreground hover:bg-emerald-50"
                aria-label={`Download ${s.id}`}
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="h-72 rounded-b-xl border-t border-black/10 bg-transparent" />

      {otpModal.open && (
        <OtpModal
          onClose={() => setOtpModal({ open: false })}
          onVerify={handleVerifyOtp}
          otpValues={otpValues}
          setOtpValues={setOtpValues}
          userEmail={userEmail}
        />
      )}
    </section>
  )
}