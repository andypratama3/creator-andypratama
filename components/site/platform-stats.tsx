import { ArrowUpRight } from "lucide-react"
import { creator, platformStats } from "@/lib/creator-data"
import { CountUp } from "./count-up"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function PlatformStats() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Technical presence"
          title="Digital footprint across platforms."
          description="A professional presence built on consistency — active contributions and engagement across multiple platforms. These figures represent real engagement and technical activity."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((s, i) => {
            // `profileKey` doubles as the schema.org counter source. Reusing it as the
            // link target keeps the card honest: cards with a real profile go there, and
            // "Projects" — which has none — stays a plain card instead of a dead link to
            // the contact form wearing an outbound-link icon.
            const href = s.profileKey ? creator.links[s.profileKey] : null

            return (
              <li key={s.platform} className="h-full">
                <Reveal delay={i * 70} className="h-full">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="plate hover-lift group flex h-full flex-col rounded-3xl p-6"
                    >
                      <StatBody stat={s} withArrow />
                    </a>
                  ) : (
                    <div className="plate flex h-full flex-col rounded-3xl p-6">
                      <StatBody stat={s} withArrow={false} />
                    </div>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function StatBody({
  stat: s,
  withArrow,
}: {
  stat: (typeof platformStats)[number]
  withArrow: boolean
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">{s.platform}</p>
        {withArrow && (
          <ArrowUpRight className="size-4 -translate-x-1 text-ink-subtle opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
        )}
      </div>

      <p
        data-numeric
        className="mt-8 text-[clamp(2.5rem,4.5vw,3.25rem)] leading-none font-semibold tracking-tighter"
      >
        <CountUp to={s.value} suffix={s.suffix} />
      </p>
      <p className="mt-2 text-sm font-medium">{s.label}</p>

      <p className="mt-4 border-t border-hairline pt-4 text-sm text-ink-muted">{s.sub}</p>
    </>
  )
}
