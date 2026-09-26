import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { creator, navLinks } from "@/lib/creator-data"
import { socialLinks } from "@/lib/seo"
import { socialIcon } from "./icons"

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Collaboration", href: "/terms" },
]

/**
 * Section anchors worth linking from every page. Crawlers follow these to reach the
 * content that the homepage's JSON-LD describes, and the subpages get a crawl path back.
 */
const exploreLinks = [
  ...navLinks,
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Media Kit", href: "/media-kit" },
]

export function Footer() {
  return (
    <footer className="border-t border-hairline px-4 pt-16 pb-10">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-[var(--primary-foreground)]">
                {creator.first[0]}
              </span>
              {creator.name}
            </Link>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-muted">
              {creator.positioning}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {(Object.keys(socialIcon) as (keyof typeof socialIcon)[]).map((k) => {
                const Icon = socialIcon[k]
                return (
                  <a
                    key={k}
                    href={socialLinks[k]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${creator.name} on ${k}`}
                    className="grid size-9 place-items-center rounded-full border border-hairline text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav aria-label="Footer — site">
            <p className="text-[11px] tracking-[0.18em] text-ink-subtle uppercase">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {exploreLinks.map((l) => {
                const isRoute = l.href.startsWith("/")
                return (
                  <li key={l.href}>
                    {isRoute ? (
                      <Link
                        href={l.href}
                        className="text-ink-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="text-ink-muted transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <nav aria-label="Footer — contact and legal">
            <p className="text-[11px] tracking-[0.18em] text-ink-subtle uppercase">Connect</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${creator.email}`}
                  className="text-ink-muted transition-colors hover:text-ink"
                >
                  {creator.email}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-ink-muted transition-colors hover:text-ink">
                  Work with me
                </a>
              </li>
            </ul>

            <p className="mt-10 text-[11px] tracking-[0.18em] text-ink-subtle uppercase">Legal</p>
            <ul className="mt-5 space-y-3 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-7 text-xs text-ink-subtle sm:flex-row">
          <p>
            © {new Date().getFullYear()} {creator.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Figures shown are placeholder values. Built with Next.js.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 transition-colors hover:border-brand hover:text-brand"
          >
            <ArrowUp className="size-3.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
