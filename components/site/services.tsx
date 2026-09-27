import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deliverables, packages, services, serviceTiers } from "@/lib/creator-data"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function Services() {
  return (
    <section id="services" className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Services"
          title="Technical solutions for your business."
          description="Comprehensive software development services designed around your requirements and goals."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 60} className="h-full">
              <div className="plate hover-lift group flex h-full flex-col rounded-3xl p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span
                    data-numeric
                    className="grid size-10 place-items-center rounded-xl bg-brand-soft text-sm font-semibold text-brand"
                  >
                    {s.n}
                  </span>
                  <ArrowRight className="size-4 -translate-x-1 text-ink-subtle transition-all duration-500 group-hover:translate-x-0 group-hover:text-brand" />
                </div>
                <h3 className="mt-7 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Engagement models */}
        <Reveal className="mt-16">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="plate flex flex-col justify-center rounded-3xl p-7 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight">Engagement models</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">
                Three flexible ways to work together. Most clients start with a single project and move to ongoing support once the initial delivery is successful.
              </p>
              <ul className="mt-6 space-y-4">
                {serviceTiers.map((t) => (
                  <li key={t.name} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-sm text-ink-muted">{t.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="plate rounded-3xl p-7 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight">Every project includes</h3>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-sm text-ink-muted">
                    <Check className="size-4 shrink-0 text-brand" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Packages */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-center text-balance text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight">
              Transparent pricing
            </h3>
            <p className="mx-auto mt-3 max-w-md text-pretty text-center text-sm text-ink-muted">
              Starting rates — every real quote is built from your specific requirements,
              scope, and timeline.
            </p>
          </Reveal>

          <div className="mt-9 grid items-stretch gap-4 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 80} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
                    p.featured
                      ? "ring-gradient shadow-lift"
                      : "plate shadow-plate",
                  )}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--primary-foreground)] uppercase">
                      Most popular
                    </span>
                  )}
                  <p className="text-sm font-medium text-ink-muted">{p.name}</p>
                  <p className="mt-4 flex items-baseline gap-1">
                    <span
                      data-numeric
                      className="text-[clamp(2.25rem,4vw,3rem)] leading-none font-semibold tracking-tighter"
                    >
                      {p.price}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-ink-subtle">{p.note}</p>

                  <ul className="mt-7 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <Check className="size-4 shrink-0 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-8 h-11 w-full rounded-full"
                    size="lg"
                    variant={p.featured ? "default" : "outline"}
                    nativeButton={false}
                    render={<a href="#contact" />}
                  >
                    Get started
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
