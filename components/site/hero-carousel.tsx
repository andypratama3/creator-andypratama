"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const SLIDES = [
  { src: "/creator-portrait.jpg", alt: "Andy Pratama portrait" },
  { src: "/content-1.jpg", alt: "Andy creating content" },
  { src: "/content-2.jpg", alt: "Andy working on editing" },
  { src: "/content-3.jpg", alt: "Andy on set" },
] as const

const INTERVAL = 5000

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reduced = usePrefersReducedMotion()

  // Hover and focus are tracked separately so leaving the pointer while a control is
  // still focused does not restart the slideshow underneath the user's cursor.
  const paused = hovered || focused

  const next = () => setIndex((i) => (i + 1) % SLIDES.length)
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    // Honour reduced motion *and* hover/focus: the previous version restarted the
    // interval straight from the arrow handlers, so a click could start autoplay even
    // when the user had asked for reduced motion.
    if (reduced || paused) return
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [reduced, paused])

  return (
    <div
      className="relative h-full w-full"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          // Inactive slides stay in the DOM for the crossfade, so hide them from
          // assistive tech to avoid announcing every slide's alt text at once.
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
            i === index ? "z-10 opacity-100 scale-100" : "z-0 opacity-0 scale-[1.02]",
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover"
          />
        </div>
      ))}
      {/* Gradient overlay stays fixed */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/25 via-transparent to-transparent"
      />

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            className="grid size-6 place-items-center rounded-full transition-colors hover:bg-white/20 motion-reduce:transition-none"
          >
            {/* The visible dot stays small; the 24x24 button is the hit area, which is
                what WCAG 2.2 SC 2.5.8 requires. */}
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none",
                i === index ? "w-5 bg-white/90" : "w-1.5 bg-white/40",
              )}
            />
          </button>
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-40 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-white motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-40 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-white motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
