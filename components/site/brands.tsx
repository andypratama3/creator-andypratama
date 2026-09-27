import { ArrowUpRight, Check } from "lucide-react"
import { caseStudy } from "@/lib/creator-data"
import { BrandCarousel } from "./brand-carousel"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function Brands() {
  return (
    <section id="brands" className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Collaborations"
          title="Organizations I've worked with."
          description="Trusted by institutions and teams that care about authentic technical solutions and real results."
        />

        <BrandCarousel />

        <Reveal className="mt-8">
          <article className="ring-gradient glow-top relative overflow-hidden rounded-[2rem]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 sm:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-brand-soft px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
                    Case study
                  </span>
                  <span className="text-xs text-ink-subtle">{caseStudy.campaign}</span>
                </div>

                <h3 className="mt-6 text-balance text-[clamp(1.9rem,4vw,2.8rem)] leading-tight font-semibold tracking-tight">
                  {caseStudy.brand}
                </h3>

                <p className="mt-5 max-w-lg text-pretty leading-relaxed text-ink-muted">
                  <span className="font-medium text-ink">Objective — </span>
                  {caseStudy.objective}
                </p>

                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
                      Strategy
                    </p>
                    <ul className="mt-4 space-y-3">
                      {caseStudy.strategy.map((s) => (
                        <li key={s} className="flex gap-2.5 text-sm text-ink-muted">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
                      Deliverables
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {caseStudy.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-muted"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-10 inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-brand hover:text-brand"
                >
                  Request the full case study
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              <div className="grid gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-hairline">
                {caseStudy.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col justify-center bg-surface p-7 text-center lg:px-10 lg:py-10 lg:text-left"
                  >
                    <p
                      data-numeric
                      className="text-gradient text-[clamp(2.2rem,4vw,3rem)] leading-none font-semibold tracking-tighter"
                    >
                      {r.value}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
