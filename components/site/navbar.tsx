"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { creator, navLinks, sectionIds } from "@/lib/creator-data"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("")
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy: highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const ids = sectionIds as readonly string[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    // Move focus into the panel, trap Escape, and restore focus on close.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== "Tab" || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus()
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className={cn(
            "mt-3 flex w-full max-w-6xl items-center justify-between rounded-full border px-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "glass border-hairline py-1.5 shadow-plate" : "border-transparent py-2.5",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 text-sm font-semibold tracking-tight"
          >
            <span className="grid size-7 place-items-center rounded-full bg-brand text-[13px] font-bold text-[var(--primary-foreground)]">
              {creator.first[0]}
            </span>
            <span className="hidden sm:inline">{creator.first}</span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const id = l.href.replace("#", "")
              const isActive = active === id
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive ? "font-medium text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {l.label}
                    {isActive && (
                      <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-brand" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button
              size="lg"
              variant="outline"
              className="hidden h-9 rounded-full px-4 text-sm sm:inline-flex"
              nativeButton={false}
              render={<Link href="/media-kit" />}
            >
              Media Kit
            </Button>
            <Button
              size="lg"
              className="hidden h-9 rounded-full px-4 text-sm sm:inline-flex"
              nativeButton={false}
              aria-current={active === "contact" ? "true" : undefined}
              render={<a href="#contact" />}
            >
              Work With Me
            </Button>
            <Button
              ref={toggleRef}
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            className="fixed inset-0 top-0 z-40 lg:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false)
            }}
          >
            <div aria-hidden="true" className="absolute inset-0 glass-deep" />
            <div
              ref={panelRef}
              className="plate relative mx-4 mt-20 rounded-3xl p-4 shadow-lift"
            >
              <ul className="flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-surface-2"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/media-kit"
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 text-lg font-medium text-ink transition-colors hover:bg-surface-2"
                  >
                    Media Kit
                  </Link>
                </li>
              </ul>
              <Button
                size="lg"
                className="mt-2 h-11 w-full rounded-2xl"
                nativeButton={false}
                render={<a href="#contact" onClick={() => setOpen(false)} />}
              >
                Work With Me
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
