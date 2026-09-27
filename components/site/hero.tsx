import { ArrowRight, Play, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { creator } from "@/lib/creator-data"
import { GitHubIcon, LinkedInIcon, InstagramIcon, WebIcon } from "./icons"
import { Reveal } from "./reveal"
import { StaggerWords } from "./stagger-words"
import { HeroCarousel } from "./hero-carousel"

const proof = [
  { key: "github" as const, Icon: GitHubIcon, label: "GitHub" },
  { key: "linkedin" as const, Icon: LinkedInIcon, label: "LinkedIn" },
  { key: "instagram" as const, Icon: InstagramIcon, label: "Instagram" },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      <div aria-hidden="true" className="mesh pointer-events-none absolute inset-0 -z-20 opacity-90" />
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/70 py-1.5 pr-4 pl-2 text-[11px] font-medium tracking-[0.18em] text-ink-muted uppercase backdrop-blur">
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute size-1.5 rounded-full bg-ok animate-ring" />
                <span className="size-1.5 rounded-full bg-ok" />
              </span>
              {creator.availability}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 max-w-[18ch] text-balance text-[clamp(2.8rem,8vw,6rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
              <StaggerWords
                segments={[
                  { text: "Building digital" },
                  { text: "experiences that matter.", className: "text-gradient" },
                ]}
              />
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-pretty text-xl leading-relaxed text-ink-muted font-light">
              {creator.intro}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="group h-12 rounded-full px-8 text-[16px] font-medium"
                nativeButton={false}
                render={<a href="#contact" />}
              >
                Work With Me
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full bg-surface/60 px-8 text-[16px] backdrop-blur"
                nativeButton={false}
                render={<a href="#picks" />}
              >
                <Play />
                View My Work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 overflow-hidden">
              {[
                { label: "Projects", value: "25+" },
                { label: "Technologies", value: "15+" },
                { label: "Experience", value: "3+" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-hairline bg-surface/50 p-5 backdrop-blur">
                  <dt className="text-[11px] tracking-[0.12em] text-ink-subtle uppercase">
                    {s.label}
                  </dt>
                  <dd data-numeric className="mt-2 text-3xl font-semibold tracking-tight">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {proof.map(({ key, Icon, label }) => (
                <li key={key}>
                  <a
                    href={creator.links[key as keyof typeof creator.links] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-6 items-center gap-2.5 text-sm font-medium text-ink-subtle transition-colors hover:text-ink"
                  >
                    <Icon className="size-5 transition-colors group-hover:text-brand" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-br from-brand/30 via-brand-2/15 to-transparent blur-3xl animate-drift"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rotate-6 rounded-[2.5rem] border border-hairline bg-brand-soft"
            />
            <div className="plate relative h-full w-full overflow-hidden rounded-[2.5rem]">
              <HeroCarousel />
            </div>

            <div className="glass absolute -left-4 top-8 flex items-center gap-3 rounded-2xl border border-hairline px-4 py-3 shadow-lift animate-float">
              <div className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
                <GitHubIcon className="size-5" />
              </div>
              <div className="leading-tight">
                <p data-numeric className="text-base font-semibold">
                  150+
                </p>
                <p className="text-[11px] text-ink-subtle">followers</p>
              </div>
            </div>

            <div
              className="glass absolute -right-4 top-1/2 flex items-center gap-3 rounded-2xl border border-hairline px-4 py-3 shadow-lift animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
                <TrendingUp className="size-5" />
              </div>
              <div className="leading-tight">
                <p data-numeric className="text-base font-semibold">
                  100%
                </p>
                <p className="text-[11px] text-ink-subtle">satisfaction</p>
              </div>
            </div>

            <div
              className="glass absolute -bottom-6 left-12 flex items-center gap-3 rounded-2xl border border-hairline px-4 py-3 shadow-lift animate-float"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
                <WebIcon className="size-5" />
              </div>
              <div className="leading-tight">
                <p data-numeric className="text-base font-semibold">
                  3+
                </p>
                <p className="text-[11px] text-ink-subtle">years</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
