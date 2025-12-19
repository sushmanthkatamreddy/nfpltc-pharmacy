import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
      {/* Text Section */}
      <div className="order-2 md:order-1">
        <h3 className="mb-3 text-3xl font-semibold md:text-4xl">About Us</h3>
        <p className="text-muted-foreground leading-relaxed">
          At North Falmouth Pharmacy, we deliver more than prescriptions — we deliver care.
          <br />
          For over 30 years, we’ve supported families, facilities, and caregivers with personalized long-term care (LTC) services,
          LTC at Home programs, and Specialty School medication support.
          <br /><br />
          Our pharmacy integrates eMAR technology and compliance packaging to make medication management
          simple, accurate, and reliable. Whether you’re at home, in a care facility, or managing health for a loved one — we bring the
          same level of attention, compassion, and coordination that defines our community roots.
        </p>
      </div>

      {/* Image Section */}
      <div className="order-1 md:order-2 flex justify-center">
        <img
          alt="Team illustration"
          src="/hbb.png"
          style={{
            width: "auto",
            maxWidth: "300px",
            height: "auto",
            borderRadius: "16px",
            objectFit: "contain",
            marginTop: "20px",
          }}
        />
      </div>
    </section>
  )
}