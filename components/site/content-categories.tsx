import { categories } from "@/lib/creator-data"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function ContentCategories() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What I make"
          title="Content built for every objective."
          description="From awareness to conversion, each format is designed with a clear purpose."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.n} delay={(i % 3) * 60} className="h-full">
              <div className="group relative h-full overflow-hidden bg-surface p-7 transition-colors duration-500 hover:bg-surface-2 sm:p-8">
                <span
                  data-numeric
                  className="text-sm font-medium text-ink-subtle transition-colors duration-500 group-hover:text-brand"
                >
                  {c.n}
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-ink-muted">{c.body}</p>
                <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-brand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
