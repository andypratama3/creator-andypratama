import { Quote, Star } from "lucide-react"
import { testimonials } from "@/lib/creator-data"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")

export function Testimonials() {
  return (
    <section id="testimonials" className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="What partners say."
          description="Long-term partners, not one-off campaigns."
          align="center"
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="h-full">
              <figure className="plate hover-lift flex h-full flex-col rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <Quote className="size-6 text-brand" />
                  <span className="flex items-center gap-0.5" aria-label="5 out of 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-warn text-warn" />
                    ))}
                  </span>
                </div>

                <blockquote className="mt-6 flex-1 text-pretty leading-relaxed">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-hairline pt-6">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-brand"
                  >
                    {initials(t.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{t.name}</p>
                    <p className="truncate text-sm text-ink-muted">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
