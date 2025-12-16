export default function QuoteBanner() {
  return (
    <section className="relative w-full bg-emerald-900 text-white py-24 z-[10]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 mx-auto mb-6 opacity-70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3v10H4V8h7V2H4a2 2 0 00-2 2v16a2 2 0 002 2h8v-8H9v-2zm11 0h3v10h-8V8h7V2h-7a2 2 0 00-2 2v16a2 2 0 002 2h8v-8h-3v-2z"
          />
        </svg>

        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          Good health starts with trust. At North Falmouth Pharmacy, we treat
          every patient like family — because your care is our calling.
        </p>
      </div>
    </section>
  )
}