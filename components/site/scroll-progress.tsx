"use client"

import { useEffect, useRef } from "react"

/**
 * Reading-progress bar.
 *
 * Animates `scaleX` only, which the compositor handles without touching layout or paint.
 * Scroll work is coalesced into a single `requestAnimationFrame` so a fast scroll cannot
 * queue an update per event.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let frame = 0

    const update = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const ratio = scrollable > 0 ? Math.min(Math.max(doc.scrollTop / scrollable, 0), 1) : 0
      bar.style.transform = `scaleX(${ratio})`
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 ${className ?? ""}`}
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-linear-to-r from-brand via-brand to-brand-soft"
      />
    </div>
  )
}
