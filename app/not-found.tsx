import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/lib/creator-data"

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 must stay out of the index, and it must not inherit the root layout's
  // canonical — pointing a missing URL at "/" misrepresents what the URL resolves to.
  robots: { index: false, follow: true },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <div className="grain flex min-h-dvh flex-col">
      <main id="main" className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20">
        <div aria-hidden="true" className="mesh pointer-events-none absolute inset-0 -z-20" />
        <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-10" />

        <div className="text-center">
          <p
            data-numeric
            className="text-gradient text-[clamp(5rem,18vw,11rem)] leading-none font-semibold tracking-tighter"
          >
            404
          </p>
          <h1 className="mt-4 text-balance text-[clamp(1.5rem,4vw,2.25rem)] leading-tight font-semibold tracking-tight">
            This page doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty text-ink-muted">
            The link is broken or the page moved. Here&apos;s where you probably wanted to go.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-11 rounded-full px-6"
              nativeButton={false}
              render={<Link href="/" />}
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-6"
              nativeButton={false}
              render={<Link href="/media-kit" />}
            >
              View media kit
            </Button>
          </div>

          <nav aria-label="Suggested pages" className="mt-12">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={`/${l.href}`} className="text-ink-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </div>
  )
}
