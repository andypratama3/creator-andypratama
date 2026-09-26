import Image from "next/image"
import { MapPin, Sparkles } from "lucide-react"
import { creator } from "@/lib/creator-data"
import { Reveal } from "./reveal"

const facts = [
  { label: "Location", value: creator.location },
  { label: "Timezone", value: creator.timezone },
  { label: "Primary platforms", value: "TikTok, Instagram, YouTube" },
  { label: "Languages", value: creator.languages.join(" · ") },
]

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-brand/20 via-brand-2/10 to-transparent blur-2xl"
            />
            <div className="plate relative h-full w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src="/creator-portrait.jpg"
                alt={`${creator.name} in studio`}
                fill
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover object-top"
              />
            </div>
            <div className="glass absolute -bottom-4 -right-3 flex items-center gap-2 rounded-2xl border border-hairline px-3.5 py-2.5 shadow-lift">
              <span className="size-2 rounded-full bg-ok animate-breathe" />
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
            <h2 className="mt-3 text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-tight">
              {creator.name}
            </h2>
            <p className="mt-1 text-lg text-ink-muted">{creator.role}</p>
          </Reveal>

          <div className="mt-7 space-y-4">
            {creator.bio.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={120 + i * 60}>
                <p className="max-w-xl text-pretty leading-relaxed text-ink-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
              {facts.map((f) => (
                <div key={f.label} className="bg-surface p-5">
                  <dt className="flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-ink-subtle uppercase">
                    {f.label === "Location" && <MapPin className="size-3.5" />}
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-pretty font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
