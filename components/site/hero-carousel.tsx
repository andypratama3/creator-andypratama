"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const SLIDES = [
  { src: "/creator-portrait.jpg", alt: "Andy Pratama portrait" },
  { src: "/content-1.jpg", alt: "Andy creating content" },
  { src: "/content-2.jpg", alt: "Andy working on editing" },
  { src: "/content-3.jpg", alt: "Andy on set" },
] as const

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const reduced = usePrefersReducedMotion()
  const timer = useRef<NodeJS.Timeout>(null)

  const next = () => setIndex((i) => (i + 1) % SLIDES.length)
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const go = (i: number) => setIndex(i)

  useEffect(() => {
    if (reduced) return
    timer.current = setInterval(next, 5000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [reduced])

  return (
    <div className="relative h-full w-full">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
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
      <div aria-hidden="true" className="absolute inset-0 z-20 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 z-40 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur-sm px-3 py-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-5 bg-white/90" : "w-1.5 bg-white/40 hover:bg-white/60",
            )}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => { prev(); if (timer.current) { clearInterval(timer.current); timer.current = setInterval(next, 5000) } }}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-40 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all hover:scale-105"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        onClick={() => { next(); if (timer.current) { clearInterval(timer.current); timer.current = setInterval(next, 5000) } }}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-40 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all hover:scale-105"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
