import { Plus } from "lucide-react"
import { faqs } from "@/lib/creator-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function Faq() {
  return (
    <section id="faq" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions brands ask first."
              description="If your question isn't here, ask it in the contact form — I answer every one."
            />
            <Reveal delay={180}>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-brand hover:text-brand"
              >
                Ask a question
                <Plus aria-hidden="true" className="size-4 rotate-45" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Accordion className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-hairline">
                  <AccordionTrigger className="gap-4 py-5 text-base font-medium text-pretty hover:no-underline sm:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-pretty text-[15px] leading-relaxed text-ink-muted">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
