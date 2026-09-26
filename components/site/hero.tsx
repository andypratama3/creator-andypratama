import { socialLinks } from "@/lib/seo"
import { ArrowRight, Play, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { creator } from "@/lib/creator-data"
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "./icons"
import { Reveal } from "./reveal"
import { StaggerWords } from "./stagger-words"
import { HeroCarousel } from "./hero-carousel"

const proof = [
  { key: "tiktok" as const, Icon: TikTokIcon },
  { key: "instagram" as const, Icon: InstagramIcon },
  { key: "youtube" as const, Icon: YouTubeIcon },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="mesh pointer-events-none absolute inset-0 -z-20 opacity-90" />
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/70 py-1.5 pr-4 pl-2 text-[11px] font-medium tracking-[0.18em] text-ink-muted uppercase backdrop-blur">
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute size-1.5 rounded-full bg-ok animate-ring" />
                <span className="size-1.5 rounded-full bg-ok" />
              </span>
              {creator.availability}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[16ch] text-balance text-[clamp(2.6rem,7.4vw,5.75rem)] leading-[0.94] font-semibold tracking-[-0.035em]">
              <StaggerWords
                segments={[
                  { text: "Content that connects." },
                  { text: "Products that convert.", className: "text-gradient" },
                ]}
              />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-ink-muted">
              {creator.intro}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="group h-11 rounded-full px-6 text-[15px]"
                nativeButton={false}
                render={<a href="#contact" />}
              >
                Work With Me
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-full bg-surface/60 px-6 text-[15px] backdrop-blur"
                nativeButton={false}
                render={<a href="#content" />}
              >
                <Play />
                View My Content
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
              {[
                { label: "Monthly reach", value: "4.8M" },
                { label: "Engagement", value: "7.4%" },
                { label: "Conversions", value: "3.2K" },
              ].map((s) => (
                <div key={s.label} className="bg-canvas px-4 py-4 sm:px-5">
                  <dt className="text-[11px] tracking-[0.12em] text-ink-subtle uppercase">
                    {s.label}
                  </dt>
                  <dd data-numeric className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={400}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {proof.map(({ key, Icon }) => (
                <li key={key}>
                  <a
                    href={socialLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-ink-subtle transition-colors hover:text-ink"
                  >
                    <Icon className="size-4 transition-colors group-hover:text-brand" />
                    {creator.socials[key]}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/25 via-brand-2/10 to-transparent blur-2xl animate-drift"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rotate-3 rounded-[2rem] border border-hairline bg-brand-soft"
            />
            <div className="plate relative h-full w-full overflow-hidden rounded-[2rem]">
              <HeroCarousel />
            </div>

            <div className="glass absolute -left-3 top-10 flex items-center gap-2.5 rounded-2xl border border-hairline px-3.5 py-2.5 shadow-lift animate-float">
              <TikTokIcon className="size-4" />
              <div className="leading-tight">
                <p data-numeric className="text-sm font-semibold">
                  2.4M
                </p>
                <p className="text-[10px] text-ink-subtle">views</p>
              </div>
            </div>

            <div
              className="glass absolute -right-3 top-1/2 flex items-center gap-2.5 rounded-2xl border border-hairline px-3.5 py-2.5 shadow-lift animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="grid size-7 place-items-center rounded-full bg-brand-soft text-brand">
                <TrendingUp className="size-4" />
              </span>
              <div className="leading-tight">
                <p data-numeric className="text-sm font-semibold">
                  +38%
                </p>
                <p className="text-[10px] text-ink-subtle">growth</p>
              </div>
            </div>

            <div
              className="glass absolute -bottom-4 left-8 flex items-center gap-2.5 rounded-2xl border border-hairline px-3.5 py-2.5 shadow-lift animate-float"
              style={{ animationDelay: "0.6s" }}
            >
              <InstagramIcon className="size-4" />
              <div className="leading-tight">
                <p data-numeric className="text-sm font-semibold">
                  6.9%
                </p>
                <p className="text-[10px] text-ink-subtle">engagement</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
