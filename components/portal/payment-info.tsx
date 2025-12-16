import { CheckCircle2, Lock, CreditCard } from "lucide-react"

export default function PaymentInfo() {
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
      <h3 className="text-xl font-semibold">Payment Information</h3>
      <p className="mt-2 text-sm text-gray-600">
        Streamline your medication management with our comprehensive facility portal designed for healthcare
        administrators.
      </p>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <Lock className="mt-0.5 h-5 w-5 text-emerald-700" />
        <div>
          <p className="text-sm font-medium text-emerald-900">Safe & Encrypted</p>
          <p className="text-xs text-emerald-800">
            Your payment information is protected with industry‑standard SSL encryption.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium">Accepted Payments</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Visa", "MasterCard", "American Express"].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
            >
              <CreditCard className="mr-1 h-3 w-3 text-emerald-600" /> {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-medium">Payment Features</p>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          {[
            "Instant payment confirmation",
            "Email receipt automatically sent",
            "Payment history tracking",
            "Automatic payment options",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="font-medium">Payment Plans Available</p>
        <p className="mt-1">
          Need help managing pharmacy costs? We offer flexible payment plans for qualifying patients. Contact our
          billing team to discuss options.
        </p>
      </div>
    </aside>
  )
}
