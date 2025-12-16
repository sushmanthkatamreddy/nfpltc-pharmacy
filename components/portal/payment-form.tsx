"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Landmark } from "lucide-react"
import { cn } from "@/lib/utils"

type Method = "card" | "bank"

export default function PaymentForm() {
  const [method, setMethod] = useState<Method>("card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsSubmitting(false)
  }

  const segBase = "flex flex-1 items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors"
  const segActive = "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm"
  const segIdle = "border-gray-200 bg-white hover:bg-gray-50"

  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-emerald-300"

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="acc" className="text-sm font-medium">
            Account Number
          </label>
          <input
            id="acc"
            name="acc"
            placeholder="Found on your statement or prescription report"
            className={inputBase}
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="last" className="text-sm font-medium">
            Last Name
          </label>
          <input id="last" name="last" className={inputBase} required />
        </div>

        <div className="grid gap-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Payment Amount
          </label>
          <input id="amount" name="amount" type="number" step="0.01" className={inputBase} required />
        </div>

        <div className="grid gap-3">
          <span className="text-sm font-medium">Payment Method</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={cn(segBase, method === "card" ? segActive : segIdle)}
              aria-pressed={method === "card"}
            >
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <span>Credit/Debit Card</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod("bank")}
              className={cn(segBase, method === "bank" ? segActive : segIdle)}
              aria-pressed={method === "bank"}
            >
              <Landmark className="h-5 w-5 text-emerald-600" />
              <span>Bank Transfer</span>
            </button>
          </div>
        </div>

        {method === "card" ? (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="card" className="text-sm font-medium">
                Card Number
              </label>
              <input id="card" name="card" inputMode="numeric" className={inputBase} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="exp" className="text-sm font-medium">
                  Expiry Date
                </label>
                <input id="exp" name="exp" placeholder="MM/YY" className={inputBase} required />
              </div>
              <div className="grid gap-2">
                <label htmlFor="cvv" className="text-sm font-medium">
                  CVV
                </label>
                <input id="cvv" name="cvv" inputMode="numeric" className={inputBase} required />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="zip" className="text-sm font-medium">
                Zip Code
              </label>
              <input id="zip" name="zip" inputMode="numeric" className={inputBase} required />
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="routing" className="text-sm font-medium">
                Routing Number
              </label>
              <input id="routing" name="routing" inputMode="numeric" className={inputBase} required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="account" className="text-sm font-medium">
                Bank Account Number
              </label>
              <input id="account" name="bankAccount" inputMode="numeric" className={inputBase} required />
            </div>
          </div>
        )}

        <label className="mt-2 inline-flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          Save payment method for future use
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {isSubmitting ? "Processing..." : "Process Payment"}
        </button>
      </div>
    </form>
  )
}
