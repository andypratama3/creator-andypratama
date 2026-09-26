import Image from "next/image"
import { ArrowUpRight, Play } from "lucide-react"
import { featuredContent } from "@/lib/creator-data"
import { socialIcon, type SocialKey } from "./icons"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function FeaturedContent() {
  return (
    <section id="content" className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured content."
          description="A selection of top-performing pieces across platforms. Every piece is built to hold attention and drive action."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredContent.map((c, i) => {
            const Icon = socialIcon[c.platform.toLowerCase() as SocialKey]
            return (
              <Reveal key={c.title} delay={i * 80} className="h-full">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-plate transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={c.thumb || "/placeholder.svg"}
                      alt={`${c.title} — ${c.product} content on ${c.platform}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                    />

                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                      {Icon && <Icon className="size-3.5" />}
                      {c.platform}
                    </div>

                    <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-500 group-hover:scale-110">
                      <Play className="size-4" />
                    </span>

                    <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-white">
                      <div>
                        <p data-numeric className="text-lg leading-none font-semibold">
                          {c.views}
                        </p>
                        <p className="mt-1 text-[11px] text-white/70">views</p>
                      </div>
                      <div className="text-right">
                        <p data-numeric className="text-lg leading-none font-semibold">
                          {c.engagement}
                        </p>
                        <p className="mt-1 text-[11px] text-white/70">engagement</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 items-start justify-between gap-3 p-5">
                    <div>
                      <p className="text-xs text-ink-subtle">{c.product}</p>
                      <p className="mt-1.5 text-pretty font-medium text-balance leading-snug">
                        {c.title}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-ink-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
