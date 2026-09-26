"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { brands } from "@/lib/creator-data"
import { Reveal } from "./reveal"

export function BrandCarousel() {
  const [index, setIndex] = useState(0)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const cardsPerView = 3
  const maxIndex = Math.max(0, brands.length - cardsPerView)

  const safeIndex = Math.min(index, maxIndex)

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex))
  const prev = () => setIndex((i) => Math.max(i - 1, 0))

  useEffect(() => {
    timer.current = setInterval(next, 4000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [next])

  const pause = () => { if (timer.current) { clearInterval(timer.current); timer.current = null } }
  const resume = () => {
    if (timer.current) return
    timer.current = setInterval(next, 4000)
  }

  const trackStyle = { transform: `translateX(-${safeIndex * (100 / cardsPerView)}%)` }

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-hairline bg-hairline"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={trackStyle}>
        {brands.map((b, i) => (
          <div
            key={b.name}
            className="min-w-[calc(100%/3)] bg-surface p-6 transition-colors duration-500 hover:bg-surface-2 sm:p-7"
            style={{ minWidth: `calc(100% / ${cardsPerView})` }}
          >
            <Reveal delay={(i % 3) * 50} className="h-full">
              <div className="group flex h-full flex-col justify-between gap-6">
                <span className="text-lg font-semibold tracking-tight">{b.name}</span>
                <div>
                  <p className="text-xs text-ink-subtle">{b.campaign}</p>
                  <p data-numeric className="mt-1 text-sm font-medium text-brand">
                    {b.result}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/40 px-3 py-2 backdrop-blur-sm">
        <button onClick={() => { prev(); pause(); setTimeout(resume, 3000) }} aria-label="Previous" className="grid size-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} onClick={() => { setIndex(i); pause(); setTimeout(resume, 3000) }} aria-label={`Go to slide ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${i === safeIndex ? "w-5 bg-white/90" : "w-1.5 bg-white/30 hover:bg-white/50"}`} />
          ))}
        </div>
        <button onClick={() => { next(); pause(); setTimeout(resume, 3000) }} aria-label="Next" className="grid size-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
