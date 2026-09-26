import type { Metadata } from "next"
import { About } from "@/components/site/about"
import { Audience } from "@/components/site/audience"
import { Brands } from "@/components/site/brands"
import { Contact } from "@/components/site/contact"
import { ContentCategories } from "@/components/site/content-categories"
import { Faq } from "@/components/site/faq"
import { FeaturedContent } from "@/components/site/featured-content"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/site/hero"
import { JsonLd } from "@/components/site/json-ld"
import { Navbar } from "@/components/site/navbar"
import { Performance } from "@/components/site/performance"
import { PlatformStats } from "@/components/site/platform-stats"
import { Process } from "@/components/site/process"
import { ProductShelf } from "@/components/site/product-shelf"
import { Services } from "@/components/site/services"
import { Testimonials } from "@/components/site/testimonials"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Home",
  description:
    "Andy Pratama is a short-form tech and lifestyle creator in Jakarta. 225K followers across TikTok, Instagram and YouTube, plus 3,200+ affiliate conversions for brands.",
  path: "/",
})

export default function Page() {
  return (
    <div className="grain min-h-dvh">
      <JsonLd />
      <Navbar />
      <main id="main">
        <Hero />
        <PlatformStats />
        <About />
        <Performance />
        <FeaturedContent />
        <ContentCategories />
        <ProductShelf />
        <Audience />
        <Brands />
        <Services />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
