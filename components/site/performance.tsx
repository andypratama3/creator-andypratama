import { metrics, reachSeries } from "@/lib/creator-data"
import { CountUp } from "./count-up"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function buildPath(values: readonly number[], w: number, h: number, pad: number) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const stepX = (w - pad * 2) / (values.length - 1)
  const pts = values.map((v, i) => {
    const x = pad + i * stepX
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return [x, y] as const
  })
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const cx = (x0 + x1) / 2
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`
  }
  const area = `${d} L ${pts[pts.length - 1][0]} ${h - pad} L ${pts[0][0]} ${h - pad} Z`
  return { line: d, area, pts, last: pts[pts.length - 1] }
}

export function Performance() {
  const W = 720
  const H = 300
  const P = 16
  const { line, area, pts, last } = buildPath(reachSeries, W, H, P)

  return (
    <section id="analytics" className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Analytics"
          title="Performance, not just impressions."
          description="Results that map to what brands actually care about — reach, engagement, and conversions over time."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="h-full">
            <figure className="plate flex h-full flex-col rounded-3xl p-6 sm:p-8">
              <figcaption className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-ink-subtle uppercase">
                    Content reach index
                  </p>
                  <p className="mt-2.5 text-[clamp(2rem,4vw,2.75rem)] leading-none font-semibold tracking-tighter">
                    <CountUp to={4} suffix=".8M" />{" "}
                    <span className="text-ink-subtle">views / mo</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand">
                  +38% growth
                </span>
              </figcaption>

              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="mt-8 h-auto w-full"
                role="img"
                aria-label="Line chart showing monthly content reach trending upward over 12 months, from an index of 32 in January to 82 in December"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="reachFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line
                    key={g}
                    x1={P}
                    x2={W - P}
                    y1={H * g}
                    y2={H * g}
                    stroke="var(--hairline)"
                    strokeDasharray="4 6"
                  />
                ))}
                <path d={area} fill="url(#reachFill)" />
                <path
                  d={line}
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {pts.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2.5"
                    fill="var(--surface)"
                    stroke="var(--brand)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <circle cx={last[0]} cy={last[1]} r="4" fill="var(--brand)" />
                <circle cx={last[0]} cy={last[1]} r="5" fill="var(--brand)" opacity="0.4">
                  <animate attributeName="r" values="5;14;5" dur="2.4s" repeatCount="indefinite" />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              <div className="mt-3 flex justify-between text-[11px] text-ink-subtle">
                {months
                  .map((m, i) => ({ m, i }))
                  .filter(({ i }) => i % 3 === 0 || i === 11)
                  .map(({ m }) => (
                    <span key={m}>{m}</span>
                  ))}
              </div>
            </figure>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 60} className="h-full">
                <div className="plate-nested hover-lift flex h-full flex-col justify-between rounded-3xl p-5 sm:p-6">
                  <p className="text-sm text-ink-muted">{m.label}</p>
                  <p className="mt-5 text-[clamp(1.75rem,3.5vw,2.25rem)] leading-none font-semibold tracking-tighter">
                    <CountUp to={m.value} suffix={m.suffix} />
                  </p>
                  <p className="mt-2.5 text-xs font-medium text-ok">{m.trend}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
