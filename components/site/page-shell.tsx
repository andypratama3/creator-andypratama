import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { creator } from "@/lib/creator-data"
import { Breadcrumbs } from "./breadcrumbs"
import { LegalJsonLd } from "./json-ld"
import { ThemeToggleIsland } from "./theme-toggle-island"

export function PageShell({
  title,
  description,
  path,
  updated,
  children,
}: {
  title: string
  description: string
  /** Absolute path with a leading slash; used for the breadcrumb trail and canonical. */
  path: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <div className="grain min-h-dvh">
      <header className="px-4 pt-6">
        <div className="shell flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
          <ThemeToggleIsland />
        </div>
      </header>

      <main id="main" className="px-4 py-10 sm:py-14">
        <div className="shell max-w-3xl">
          <LegalJsonLd
            path={path}
            title={title}
            description={description}
            updated={updated}
          />
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: title, path },
            ]}
          />
          <p className="mt-6 text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
            {creator.name}
          </p>
          <h1 className="mt-3 text-balance text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-ink-subtle">Last updated: {updated}</p>

          <div className="hairline-x my-10" />

          <div className="space-y-9">{children}</div>
        </div>
      </main>
    </div>
  )
}

export function Clause({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight">{heading}</h2>
      <div className="mt-3 space-y-3 text-pretty leading-relaxed text-ink-muted [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </section>
  )
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  )
}
