"use client"

import { useEffect } from "react"

// Must render its own <html>/<body> — replaces the whole document when the
// root layout itself fails, so no shared layout or provider is available here.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[global-error]", error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "oklch(0.985 0.003 265)",
          color: "oklch(0.16 0.012 275)",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
            This site failed to load.
          </h1>
          <p style={{ marginTop: "0.75rem", lineHeight: 1.6, opacity: 0.7 }}>
            A critical error broke the page. Reloading usually fixes it.
          </p>
          {error.digest && (
            <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", opacity: 0.5 }}>
              Reference: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.75rem",
              height: "2.75rem",
              padding: "0 1.5rem",
              borderRadius: 999,
              border: 0,
              background: "oklch(0.16 0.012 275)",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Reload the site
          </button>
        </div>
      </body>
    </html>
  )
}
