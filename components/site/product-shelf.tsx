"use client"

import { ArrowUpRight, Star } from "lucide-react"
import { useMemo, useState } from "react"
import { projectCategories, projects, type ProjectCategory } from "@/lib/creator-data"
import { cn } from "@/lib/utils"
import { productIcon, type ProductIconKey } from "./product-icons"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"
import { platformIcon, type PlatformKey } from "./icons"

const accentClass: Record<string, string> = {
  brand: "bg-brand-soft text-brand",
  "brand-2": "bg-brand-2/15 text-brand-2",
  "brand-3": "bg-brand-3/15 text-brand-3",
  ok: "bg-ok/15 text-ok",
  warn: "bg-warn/15 text-warn",
  info: "bg-info/15 text-info",
}

export function ProductShelf() {
  const [active, setActive] = useState<ProjectCategory>("All")

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section id="picks" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="My work"
          title="Projects I've built."
          description="A selection of web applications, mobile apps, and technical solutions I've developed for various clients and personal projects."
        />

        <Reveal delay={120}>
          <div
            className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((c) => {
              const count =
                c === "All" ? projects.length : projects.filter((p) => p.category === c).length
              const selected = active === c
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(c)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors",
                    selected
                      ? "border-brand bg-brand-soft font-medium text-brand"
                      : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink",
                  )}
                >
                  {c}
                  <span
                    data-numeric
                    className={cn("ml-1.5 text-xs", selected ? "text-brand" : "text-ink-subtle")}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const iconKey = (p.icon in productIcon ? p.icon : "box") as ProductIconKey
            const Icon = productIcon[iconKey]
            const PlatformIcon = platformIcon[p.platform as PlatformKey] || null
            return (
              <Reveal key={p.name} delay={(i % 3) * 60} className="h-full">
                <article className="plate group flex h-full flex-col rounded-3xl p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-2xl",
                        accentClass[p.accent] ?? accentClass.brand,
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="flex items-center gap-1 rounded-full border border-hairline px-2 py-1 text-[11px] text-ink-muted">
                      {PlatformIcon && <PlatformIcon className="size-3" />}
                      {p.highlight}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-medium tracking-[0.16em] text-ink-subtle uppercase">
                      {p.type} · {p.category}
                    </p>
                    <h3 className="mt-2 text-pretty font-semibold tracking-tight text-balance">
                      {p.name}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className="flex items-center gap-0.5"
                      role="img"
                      aria-label={`Rated ${p.rating.toFixed(1)} out of 5`}
                    >
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star
                          key={s}
                          aria-hidden="true"
                          className={cn(
                            "size-3.5",
                            s < Math.round(p.rating)
                              ? "fill-warn text-warn"
                              : "text-hairline-strong",
                          )}
                        />
                      ))}
                    </span>
                    <span data-numeric className="text-xs text-ink-muted">
                      {p.rating.toFixed(1)}
                    </span>
                    {p.featured && (
                      <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[11px] font-medium text-ink-muted">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">
                    {p.description}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-hairline pt-4">
                    <p className="flex items-baseline gap-2">
                      <span data-numeric className="text-xl font-semibold tracking-tight">
                        {p.tech}
                      </span>
                      <span
                        data-numeric
                        className="text-sm text-ink-subtle"
                      >
                        {p.year}
                      </span>
                    </p>
                    <a
                      href={`#contact`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition-colors hover:text-brand"
                    >
                      Learn more
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      <span className="sr-only"> {p.name}</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <p className="mt-8 text-xs leading-relaxed text-ink-subtle">
            <strong className="font-medium text-ink-muted">Project disclosure:</strong> These
            projects represent a selection of my work across web development, mobile applications, and technical solutions. Each project was built with modern technologies and best practices.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
