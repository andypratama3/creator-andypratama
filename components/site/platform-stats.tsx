import { ArrowUpRight } from "lucide-react"
import { platformStats } from "@/lib/creator-data"
import { CountUp } from "./count-up"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function PlatformStats() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Social proof"
          title="Audience across every platform."
          description="A combined audience built on consistency — 225K followers and 8.3M monthly views across three platforms. Figures are placeholder values, easily swapped for live data."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((s, i) => (
            <li key={s.platform} className="h-full">
              <Reveal delay={i * 70} className="h-full">
                <a
                  href="#contact"
                  className="plate hover-lift group flex h-full flex-col rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">
                      {s.platform}
                    </p>
                    <ArrowUpRight className="size-4 -translate-x-1 text-ink-subtle opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>

                  <p
                    data-numeric
                    className="mt-8 text-[clamp(2.5rem,4.5vw,3.25rem)] leading-none font-semibold tracking-tighter"
                  >
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium">{s.label}</p>

                  <p className="mt-4 border-t border-hairline pt-4 text-sm text-ink-muted">{s.sub}</p>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
