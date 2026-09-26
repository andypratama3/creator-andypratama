import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Download, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  audience,
  brandNames,
  creator,
  faqPageUrl,
  packages,
  platformStats,
} from "@/lib/creator-data"
import { pageMetadata } from "@/lib/seo"
import { socialIcon, type SocialKey } from "@/components/site/icons"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { MediaKitJsonLd } from "@/components/site/json-ld"
import { ThemeToggleIsland } from "@/components/site/theme-toggle-island"

export const metadata: Metadata = pageMetadata({
  title: "Media Kit",
  description: `Media kit for ${creator.name}: audience, platform reach, past campaigns, collaboration packages and contact details.`,
  path: "/media-kit",
})

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border-t border-hairline pt-4">
      <p data-numeric className="text-[clamp(1.5rem,3vw,2rem)] leading-none font-semibold tracking-tighter">
        {value}
      </p>
      <p className="mt-1.5 text-xs text-ink-muted">{label}</p>
      {sub && <p className="mt-0.5 text-[11px] text-ink-subtle">{sub}</p>}
    </div>
  )
}

function BarRow({ label, value, tone }: { label: string; value: number; tone?: string }) {
  const tones: Record<string, string> = {
    brand: "bg-brand",
    "brand-2": "bg-brand-2",
    "brand-3": "bg-brand-3",
  }
  return (
    <li>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-muted">{label}</span>
        <span data-numeric className="font-medium">
          {value}%
        </span>
      </div>
      <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
        <span
          className={`block h-full rounded-full ${tones[tone ?? "brand"]}`}
          style={{ width: `${Math.max(3, value)}%` }}
        />
      </span>
    </li>
  )
}

export default function MediaKitPage() {
  return (
    <div className="grain min-h-dvh">
      <MediaKitJsonLd />

      <header className="sticky top-0 z-40 px-4 pt-3">
        <div className="glass shell flex items-center justify-between rounded-full border border-hairline py-1.5 pr-2 pl-4 shadow-plate">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
          <div className="flex items-center gap-1.5">
            <ThemeToggleIsland />
            <Button
              size="lg"
              className="h-9 rounded-full px-4 text-sm"
              nativeButton={false}
              render={<a href={`mailto:${creator.email}?subject=Media%20kit%20request`} />}
            >
              <Mail className="size-4" />
              Request rates
            </Button>
          </div>
        </div>
      </header>

      <main id="main" className="px-4 py-10 sm:py-14">
        <div className="shell space-y-4">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Media Kit", path: "/media-kit" },
            ]}
          />
          {/* Section 1 — header, top 20% */}
          <section className="ring-gradient glow-top relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
            <div className="mesh pointer-events-none absolute inset-0 -z-10 opacity-70" />
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28">
                  <Image
                    src="/creator-portrait.jpg"
                    alt={`${creator.name}`}
                    fill
                    priority
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
                    Media Kit · {audience.updated}
                  </p>
                  <h1 className="mt-2 text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.05] font-semibold tracking-tight">
                    {creator.name}
                  </h1>
                  <p className="mt-1 text-ink-muted">{creator.role}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {creator.location}
                    </span>
                    <span>{creator.timezone}</span>
                    <span className="text-ok">{creator.availability}</span>
                  </p>
                </div>
              </div>

              <ul className="flex shrink-0 flex-col gap-2">
                {(["tiktok", "instagram", "youtube"] as SocialKey[]).map((k) => {
                  const Icon = socialIcon[k]
                  return (
                    <li key={k}>
                      <a
                        href={creator.links[k]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
                      >
                        <Icon className="size-4" />
                        {creator.socials[k]}
                        <ArrowUpRight className="size-3.5 text-ink-subtle" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-ink-muted">
              {creator.positioning}
            </p>
          </section>

          {/* Section 2 — numbers, middle 40% */}
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Platform performance
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-5">
                {platformStats.slice(0, 3).map((s) => (
                  <Stat
                    key={s.platform}
                    label={`${s.platform} ${s.label.toLowerCase()}`}
                    value={`${s.value}${s.suffix}`}
                    sub={s.sub}
                  />
                ))}
                <Stat label="Median audience age" value={String(audience.medianAge)} />
              </div>

              <h3 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Averages, not outliers
              </h3>
              <ul className="mt-4 space-y-3">
                {audience.averages.map((a) => (
                  <li key={a.label} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-ink-muted">{a.label}</span>
                    <span data-numeric className="font-semibold">
                      {a.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Audience
              </h2>
              <ul className="mt-6 space-y-4">
                {audience.age.map((a) => (
                  <BarRow key={a.label} label={a.label} value={a.value} />
                ))}
              </ul>

              <h3 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Gender split
              </h3>
              <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-surface-3">
                {audience.gender.map((g, i) => (
                  <span
                    key={g.label}
                    className={["bg-brand", "bg-brand-3", "bg-surface-3"][i]}
                    style={{ width: `${g.value}%` }}
                  />
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {audience.gender.map((g, i) => (
                  <li key={g.label} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span
                      className={`size-2 rounded-full ${["bg-brand", "bg-brand-3", "bg-surface-3"][i]}`}
                      aria-hidden="true"
                    />
                    <span data-numeric className="font-medium text-ink">
                      {g.value}%
                    </span>
                    {g.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Top locations
              </h2>
              <ul className="mt-6 space-y-4">
                {audience.locations.map((l) => (
                  <BarRow key={l.label} label={l.label} value={l.value} tone="brand-2" />
                ))}
              </ul>

              <h3 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Interests
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {audience.interests.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-hairline bg-surface-2 px-2.5 py-1 text-xs text-ink-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3 — proof, middle/bottom */}
          <section className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Past campaigns
              </h2>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
                {brandNames.map((b) => (
                  <li key={b.name} className="bg-surface p-4">
                    <p className="font-medium">{b.name}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle">{b.campaign}</p>
                    <p data-numeric className="mt-2 text-sm font-medium text-brand">
                      {b.result}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="plate flex flex-col rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Collaboration formats
              </h2>
              <ul className="mt-6 space-y-4">
                {packages.map((p) => (
                  <li key={p.name} className="border-t border-hairline pt-4 first:border-0 first:pt-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-medium">{p.name}</p>
                      <p data-numeric className="text-sm font-semibold text-brand">
                        {p.price === "Custom" ? "Custom" : `from ${p.price}`}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-muted">{p.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-ink-subtle">
                Full rate card, usage rights and exclusivity terms are quoted per campaign —{" "}
                <a href={faqPageUrl} className="font-medium text-brand underline underline-offset-2">
                  see the FAQ
                </a>
                .
              </p>
            </div>
          </section>

          {/* Section 4 — CTA footer */}
          <section className="ring-gradient glow-top relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
            <div className="mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-balance text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight font-semibold tracking-tight">
                  Want the deck with the campaign results?
                </h2>
                <p className="mt-2 max-w-lg text-pretty text-ink-muted">
                  Email me with your product, goal and deadline. I&apos;ll send the full deck plus a
                  scope and quote — usually within {creator.responseTime}.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 rounded-full px-6"
                  nativeButton={false}
                  render={
                    <a href={`mailto:${creator.email}?subject=Media%20kit%20request`} />
                  }
                >
                  <Mail className="size-4" />
                  {creator.email}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full bg-surface/70 px-6 backdrop-blur"
                  nativeButton={false}
                  render={<Link href="/#contact" />}
                >
                  <Download className="size-4" />
                  Send a brief
                </Button>
              </div>
            </div>

            <p className="mt-8 border-t border-hairline pt-5 text-xs text-ink-subtle">
              Figures in this media kit are placeholder values for demonstration. Analytics last
              updated {audience.updated}. Rates are indicative and confirmed per brief.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
