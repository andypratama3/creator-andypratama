"use client"

import { Fragment, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface StaggerSegment {
  text: string
  /** Applied to every word in the segment — use for gradient or colour runs. */
  className?: string
}

/**
 * Masked per-word entrance for headlines.
 *
 * Each word sits inside an `overflow-hidden` box and rises into it, so the letters are
 * revealed rather than faded. The whole run is `aria-hidden` with the full string on the
 * parent as `aria-label`, because a screen reader announcing word by word is worse than
 * useless — the animation is decoration, the headline is the content.
 *
 * Driven entirely by the `animate-rise` keyframe and inline delays, so it costs no
 * JavaScript, and the global reduced-motion rule collapses it to the final state.
 */
export function StaggerWords({
  segments,
  className,
  wordClassName,
  delay = 90,
  step = 60,
  children,
}: {
  segments: StaggerSegment[]
  className?: string
  wordClassName?: string
  /** Milliseconds before the first word starts. */
  delay?: number
  /** Milliseconds added per word. */
  step?: number
  children?: ReactNode
}) {
  const label = segments
    .map((segment) => segment.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

  let wordIndex = 0

  return (
    <span className={className} aria-label={label}>
      {segments.map((segment, segmentIndex) => {
        const words = segment.text.split(/\s+/).filter(Boolean)
        return (
          <Fragment key={segmentIndex}>
            {words.map((word, i) => {
              const animationDelay = delay + wordIndex++ * step
              return (
                <Fragment key={`${word}-${i}`}>
                  <span aria-hidden="true" className="inline-block overflow-hidden align-bottom">
                    <span
                      className={cn(
                        "inline-block animate-rise pb-[0.16em]",
                        wordClassName,
                        segment.className,
                      )}
                      style={{ animationDelay: `${animationDelay}ms` }}
                    >
                      {word}
                    </span>
                  </span>
                  {/* Always emit a real, breakable space. Skipping it after a segment's
                      final word welded the segments together, so "Building digital" +
                      "experiences that matter." rendered as "digitalexperiences". The
                      trailing space on the very last word is inert. */}
                  {" "}
                </Fragment>
              )
            })}
          </Fragment>
        )
      })}
      {children}
    </span>
  )
}
