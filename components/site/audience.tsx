import { audience, genderTones, platformStats } from "@/lib/creator-data"
import { cn } from "@/lib/utils"
import { CountUp } from "./count-up"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

function Bar({ value, max = 100, tone = "brand" }: { value: number; max?: number; tone?: string }) {
  const pct = Math.max(4, Math.round((value / max) * 100))
  const tones: Record<string, string> = {
    brand: "bg-brand",
    "brand-2": "bg-brand-2",
    "brand-3": "bg-brand-3",
  }
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
      <span
        className={`block h-full rounded-full ${tones[tone] ?? tones.brand} transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]`}
        style={{ width: `${pct}%` }}
      />
    </span>
  )
}

export function Audience() {
  return (
    <section id="audience" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Audience"
          title="Who's actually watching."
          description={`Follower counts get you noticed — audience quality gets you hired. These are the numbers I send brands, updated ${audience.updated}.`}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Platform performance */}
          <Reveal className="h-full">
            <div className="plate flex h-full flex-col rounded-3xl p-6 sm:p-7">
              <h3 className="text-sm font-medium tracking-[0.16em] text-ink-subtle uppercase">
                Platform performance
              </h3>
              <ul className="mt-6 space-y-5">
                {platformStats.map((s) => (
                  <li key={s.platform} className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-sm text-ink-muted">{s.platform}</p>
                      <p className="mt-0.5 text-xs text-ink-subtle">{s.sub}</p>
                    </div>
                    <p data-numeric className="text-2xl font-semibold tracking-tight">
                      <CountUp to={s.value} suffix={s.suffix} />
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                {audience.averages.slice(0, 2).map((a) => (
                  <div key={a.label} className="plate-nested rounded-2xl p-3.5">
                    <p data-numeric className="text-xl font-semibold tracking-tight">
                      {a.value}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-tight text-ink-subtle">{a.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Demographics */}
          <Reveal delay={80} className="h-full">
            <div className="plate flex h-full flex-col rounded-3xl p-6 sm:p-7">
              <h3 className="text-sm font-medium tracking-[0.16em] text-ink-subtle uppercase">
                Demographics
              </h3>

              <div className="mt-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-ink-muted">Median age</p>
                  <p data-numeric className="text-2xl font-semibold tracking-tight">
                    {audience.medianAge}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3.5">
                {audience.age.map((a, i) => (
                  <li key={a.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-muted">{a.label}</span>
                      <span data-numeric className="font-medium">
                        {a.value}%
                      </span>
                    </div>
                    <span className="mt-1.5 block">
                      <Bar value={a.value} />
                    </span>
                    <span className="sr-only">Rank {i + 1} age bracket</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <p className="text-sm text-ink-muted">Gender split</p>
                <div className="mt-2.5 flex h-2.5 overflow-hidden rounded-full bg-surface-3">
                  {audience.gender.map((g, i) => (
                    <span
                      key={g.label}
                      className={genderTones[i % genderTones.length]}
                      style={{ width: `${g.value}%` }}
                    />
                  ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {audience.gender.map((g, i) => (
                    <li key={g.label} className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          genderTones[i % genderTones.length],
                        )}
                        aria-hidden="true"
                      />
                      <span data-numeric>{g.value}%</span> {g.label.toLowerCase()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Geography + interests */}
          <Reveal delay={160} className="h-full">
            <div className="plate flex h-full flex-col rounded-3xl p-6 sm:p-7">
              <h3 className="text-sm font-medium tracking-[0.16em] text-ink-subtle uppercase">
                Top locations
              </h3>
              <ul className="mt-6 space-y-3.5">
                {audience.locations.map((l) => (
                  <li key={l.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-muted">{l.label}</span>
                      <span data-numeric className="font-medium">
                        {l.value}%
                      </span>
                    </div>
                    <span className="mt-1.5 block">
                      <Bar value={l.value} tone="brand-2" />
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <h3 className="text-sm font-medium tracking-[0.16em] text-ink-subtle uppercase">
                  Audience interests
                </h3>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {audience.interests.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-xs text-ink-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {audience.averages.slice(2).map((a) => (
              <div key={a.label} className="plate-nested flex items-center justify-between gap-4 rounded-3xl p-6">
                <p className="text-sm text-ink-muted">{a.label}</p>
                <p data-numeric className="text-3xl font-semibold tracking-tight">
                  {a.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
