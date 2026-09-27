"use client"

import Image from "next/image"
import { useState } from "react"
import { Pause, Play } from "lucide-react"
import { brands } from "@/lib/creator-data"
import { cn } from "@/lib/utils"

/**
 * One half of the marquee.
 *
 * Inter-card spacing lives in each card's `pr-8` padding instead of a `gap` on the
 * track. The `marquee` keyframe translates the track by exactly `-50%`, so both halves
 * must be pixel-identical in width. A track-level `gap` would also insert one extra gap
 * at the seam between the halves, making one half wider than 50% of the track, and the
 * loop would visibly jump on every wrap. With the spacing inside the cards, `-50%` lands
 * exactly on the seam and the scroll is continuous.
 * The second copy is `aria-hidden` so assistive tech hears eight logos, not sixteen.
 */
function BrandRow({ decorative = false }: { decorative?: boolean }) {
  return (
    <div className="flex items-center" aria-hidden={decorative || undefined}>
      {brands.map((brand, i) => (
        <div
          key={brand.name}
          className="group flex h-28 w-72 flex-shrink-0 items-center justify-center rounded-2xl border border-hairline bg-white p-6 pr-8 shadow-plate backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 animate-rise hover:border-brand hover:shadow-lift hover:-translate-y-2 dark:bg-white/10 m-3"
          style={{ animationDelay: decorative ? undefined : `${i * 70}ms` }}
        >
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={brand.name}
              width={150}
              height={80}
              className="max-h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-sm font-medium text-ink-muted">{brand.name}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export function BrandCarousel() {
  const [paused, setPaused] = useState(false)

  return (
    <div>
      {/* `group/carousel` is scoped to the track area, not this wrapper, so hovering the
          pause button below does not also trigger the CSS hover-pause and make the
          button's own state look broken. */}
      <div className="group/carousel relative mx-auto w-full max-w-6xl select-none xl:max-w-7xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-linear-to-r from-canvas to-transparent sm:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-linear-to-l from-canvas to-transparent sm:w-32"
        />

        {/*
          `overflow-hidden` is what keeps the 5120px track inside the section. Without it
          the track overflows the viewport and grows the document's scroll width, which
          gave the whole page a horizontal scrollbar.
        */}
        <div className="overflow-hidden">
          <div
            className={cn(
              "marquee-track",
              // Pausing on hover covers pointer users; the button below covers touch and
              // keyboard users, satisfying WCAG 2.2.2. `globals.css` disables the
              // animation outright under `prefers-reduced-motion`.
              paused
                ? "[animation-play-state:paused]"
                : "group-hover/carousel:[animation-play-state:paused]"
            )}
          >
            <BrandRow />
            <BrandRow decorative />
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        {/*
          A plain action button whose name states the next action, rather than a toggle
          with a static name plus `aria-pressed`. Both are valid, but flipping the label
          stays unambiguous once the icon also flips — a "Pause" button reading as
          "pressed" is a puzzle, whereas "Resume logos" explains itself.

          `min-h-11` is 44px, the touch target WCAG 2.5.5 asks for. The old control had no
          children at all, so it collapsed to the 26x14 box its own padding made.
        */}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-5 text-sm font-medium text-ink-muted transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        > 
        </button>
      </div>
    </div>
  )
}
