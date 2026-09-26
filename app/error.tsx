"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RotateCcw, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the failure in whatever monitoring is wired up.
    console.error("[app-error]", error)
  }, [error])

  return (
    <div className="grain flex min-h-dvh items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-danger-soft text-danger">
          <TriangleAlert className="size-6" />
        </span>
        <h1 className="mt-6 text-balance text-2xl font-semibold tracking-tight">
          Something broke on this page.
        </h1>
        <p className="mt-3 text-pretty text-ink-muted">
          Not your fault — it&apos;s a bug on my side. Try again, and if it keeps happening email me
          and I&apos;ll fix it.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-ink-subtle">Reference: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="h-11 rounded-full px-6" onClick={reset}>
            <RotateCcw className="size-4" />
            Try again
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 rounded-full px-6"
            nativeButton={false}
            render={<Link href="/" />}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  )
}
