"use client"

import { useMemo, useState, useEffect } from "react"
import pills from "@/lib/pills_600.json" assert { type: "json" }
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type Pill = {
  id: number
  name: string
  image: string
}

export default function PillFinderPage() {
  const [q, setQ] = useState("")
  const [showDisclaimer, setShowDisclaimer] = useState(true) // ✅ always true on load

  // Always show disclaimer on every visit/refresh
  useEffect(() => {
    setShowDisclaimer(true)
  }, [])

  const handleAccept = () => {
    setShowDisclaimer(false)
  }

  const handleDecline = () => {
    window.location.href = "/" // redirect home if declined
  }

  const filteredPills = useMemo(() => {
    return q.trim().length === 0
      ? []
      : pills.filter((pill) =>
          pill.name.toLowerCase().includes(q.toLowerCase())
        )
  }, [q])

  return (
    <>
      {/* ---- Medical Disclaimer Modal ---- */}
      <Dialog open={showDisclaimer}>
        <DialogContent className="max-w-xl rounded-lg border bg-white/95 shadow-lg backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Medical Disclaimer
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              This Pill Finder is provided for educational purposes only and is
              intended for use in the United States. The information furnished
              on this site is not intended to replace consultation with a
              qualified physician, pharmacist, or other healthcare professional.
            </p>
            <p>
              Always seek the advice of your physician or other qualified
              healthcare provider regarding a medical condition. Never disregard
              medical advice or delay seeking medical care because of something
              you have read here.
            </p>
            <p>
              We do not guarantee that the information or images are accurate,
              complete, or current. The North Falmouth Pharmacy Pill Finder is
              an informational tool only and does not provide diagnostic or
              medical services.
            </p>
            <p>
              If you are experiencing a medical emergency, please call{" "}
              <strong>911</strong>.
            </p>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Back to Home
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Accept Disclaimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Main Pill Finder Page ---- */}
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Pill Finder</h1>
            <p className="text-gray-500">
              Search for a pill by name to see its image and details.
            </p>
          </div>

          <div className="flex flex-col items-center mb-8 gap-2">
            <Input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter pill name..."
              className="w-full max-w-xl"
              disabled={showDisclaimer} // disable while disclaimer is open
            />

            {/* ✅ Reference-only note below search bar */}
            <p className="text-xs text-gray-500 text-center max-w-xl">
              <strong>Note:</strong> This tool is for reference purposes only and does not
              replace professional medical advice. Always consult your doctor or
              pharmacist before taking any medication.
            </p>
          </div>

          {q.trim() && !showDisclaimer && (
            <div>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Showing results for <strong>"{q}"</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPills.length > 0 ? (
                  filteredPills.map((pill) => (
                    <Card
                      key={pill.id}
                      className="p-4 shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={
                          pill.image.startsWith("/")
                            ? pill.image
                            : `/images/pills/600/${pill.image}`
                        }
                        alt={pill.name}
                        className="h-32 w-full object-contain rounded mb-3 border bg-white p-1"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "/placeholder-pill.png")
                        }
                      />
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 text-center">
                        {pill.name}
                      </h3>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No pills found for "{q}"
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}