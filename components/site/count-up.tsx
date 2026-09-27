"use client"

import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

const format = (value: number, places: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  })

/** easeOutQuart — fast start, long settle. Reads as "counted up", not "sliding". */
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  decimals,
}: {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  /** Defaults to 0 for whole numbers, 1 otherwise. */
  decimals?: number
}) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const prefersReduced = usePrefersReducedMotion()
  const places = decimals ?? (Number.isInteger(to) ? 0 : 1)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return

    if (prefersReduced) {
      el.textContent = format(to, places)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        // Reset to zero only once the number is about to animate, so the server-rendered
        // value stays visible in the meantime.
        el.textContent = format(0, places)

        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const value = to * easeOutQuart(progress)
          // Written straight to the DOM. Driving this through state would re-render the
          // component on every frame and thrash layout as the digit width changes.
          el.textContent = format(progress === 1 ? to : value, places)
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [to, duration, places, prefersReduced])

  return (
    <span data-numeric>
      {prefix}
      {/* The real figure is what ships to the server, so crawlers and no-JS visitors
          never see a placeholder zero. */}
      <span ref={valueRef}>{format(to, places)}</span>
      {suffix}
    </span>
  )
}
