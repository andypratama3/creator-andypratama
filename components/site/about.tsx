import Image from "next/image"
import { MapPin, Sparkles } from "lucide-react"
import { creator } from "@/lib/creator-data"
import { Reveal } from "./reveal"

const facts = [
  { label: "Location", value: creator.location },
  { label: "Timezone", value: creator.timezone },
  { label: "Primary platforms", value: "GitHub, LinkedIn, Web" },
  { label: "Languages", value: creator.languages.join(" · ") },
]

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <div className="shell grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
            {/*
              The glow is inset negatively so it bleeds past the portrait, but on narrow
              viewports the portrait only has 16px of margin, so an unclipped -inset-6
              grew the document's scroll width. Clipping it in its own wrapper keeps the
              bleed inside the portrait box without touching the status badge below,
              which deliberately hangs outside it.
            */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-brand/25 via-brand-2/15 to-transparent blur-3xl" />
            </div>
            <div className="plate relative h-full w-full overflow-hidden rounded-[2rem]">
              <Image
                src="/creator-portrait.jpg"
                alt={`${creator.name} in studio`}
                fill
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover object-top"
              />
            </div>
            <div className="glass absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-hairline px-4 py-3 shadow-lift">
              <span className="size-2.5 rounded-full bg-ok animate-breathe" />
              <span className="text-xs font-medium text-ink-muted">{creator.availability}</span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
              <Sparkles className="size-3.5" /> About
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-tight">
              {creator.name}
            </h2>
            <p className="mt-2 text-xl text-ink-muted font-light">{creator.role}</p>
          </Reveal>

          <div className="mt-8 space-y-6">
            {creator.bio.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={120 + i * 60}>
                <p className="max-w-2xl text-pretty leading-relaxed text-ink-muted text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <dl className="mt-12 grid grid-cols-2 gap-4">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-hairline bg-surface/50 p-6 backdrop-blur">
                  <dt className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-ink-subtle uppercase">
                    {f.label === "Location" && <MapPin className="size-4" />}
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-pretty font-medium text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
