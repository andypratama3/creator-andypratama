"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/** Entrance directions. A page that only ever fades up reads as templated. */
const OFFSETS = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6",
  scale: "scale-[0.96]",
  none: "",
} as const

export type RevealFrom = keyof typeof OFFSETS

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  from = "up",
  blur = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "li" | "article" | "span"
  /** Direction the element travels in. `none` fades in place. */
  from?: RevealFrom
  /** Small blur on entry. Adds depth, and costs a compositor layer. */
  blur?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    // Reduced motion means "no travel", not "no content": resolve to the final state
    // up front so nothing is left stranded mid-transition.
    if (prefersReduced) {
      // Intentionally synchronous — resolve reduced motion before painting.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(true)
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReduced])

  const Comp = Tag as "div"

  return (
    <Comp
      ref={ref as never}
      data-reveal={shown ? "shown" : "pending"}
      className={cn(
        "transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "motion-reduce:transition-none",
        shown ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0" : OFFSETS[from],
        shown ? "" : "opacity-0",
        blur && !shown ? "blur-[2px]" : "blur-0",
        // Promote only while the element is actually animating. A permanent will-change
        // keeps the layer alive for the whole page and costs memory.
        !shown ? "motion-safe:will-change-transform,opacity,filter" : "",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  )
}
