"use client"

import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * Tracks the user's reduced-motion preference.
 *
 * Returns `false` during SSR and the first client render so markup stays
 * hydration-consistent, then settles to the real value in an effect. Every animated
 * component routes through this instead of calling `matchMedia` on its own, so the
 * behaviour and the listener cleanup are defined in one place.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    // Intentionally synchronous: resolve reduced motion before first animation frame.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReduced(media.matches)

    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return prefersReduced
}
