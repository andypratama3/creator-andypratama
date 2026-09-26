import { ArrowRight } from "lucide-react"
import { process } from "@/lib/creator-data"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function Process() {
  return (
    <section id="process" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="No black box. Five steps, start to report."
          description="You always know what's happening, what's needed from you, and what it costs before we start."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline lg:grid-cols-5">
          {process.map((s, i) => (
            <li key={s.n} className="bg-surface">
              <Reveal delay={i * 70} className="h-full">
                <div className="group relative flex h-full flex-col p-6 transition-colors duration-500 hover:bg-surface-2 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span
                      data-numeric
                      className="text-4xl font-semibold tracking-tighter text-ink-subtle/40 transition-colors duration-500 group-hover:text-brand"
                    >
                      {s.n}
                    </span>
                    <span className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-ink-subtle">
                      {s.meta}
                    </span>
                  </div>

                  <h3 className="mt-8 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">
                    {s.body}
                  </p>

                  {i < process.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute top-1/2 -right-3 z-10 hidden size-6 rounded-full bg-canvas p-1 text-ink-subtle lg:block"
                    />
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
