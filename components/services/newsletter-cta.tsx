"use client"

export function NewsletterCTA() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">Join To Our Newsletter</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-white/85">
          Get helpful health tips and updates in your inbox. No spam — unsubscribe anytime.
        </p>

        <form
          className="mx-auto mt-6 flex w-full max-w-xl items-center gap-3"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Newsletter signup form"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Your email
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email"
            required
            className="w-full flex-1 rounded-full border border-white/20 bg-white/95 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
          >
            Subscribe Us
          </button>
        </form>
      </div>
    </section>
  )
}
