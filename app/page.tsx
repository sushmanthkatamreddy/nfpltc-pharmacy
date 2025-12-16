import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { FAQ } from "@/components/faq"
import BlogGrid from "@/components/blog-grid"
import { SiteFooter } from "@/components/site-footer"
import ServicesSection from "@/components/ServicesSection"
import { VideoBox } from "@/components/VideoBox" // ✅ new import

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <AboutSection />
    
      <ServicesSection />
      <VideoBox
        src="/videos/nf.mp4"
        title="Inside North Falmouth Pharmacy"
      />
      <FAQ />
      <BlogGrid />
      <SiteFooter />
    </main>
  )
}