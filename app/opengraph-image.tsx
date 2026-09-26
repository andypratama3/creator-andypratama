import { ImageResponse } from "next/og"
import { creator } from "@/lib/creator-data"

export const alt = `${creator.name} — ${creator.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #14121f 0%, #1b1830 55%, #221c3a 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#14121f",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {creator.first[0]}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: 26, fontWeight: 600 }}>{creator.name}</span>
            <span style={{ color: "#9ca3af", fontSize: 20 }}>{creator.role}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Content that connects. Products that convert.
          </span>
          <span style={{ color: "#a78bfa", fontSize: 74, fontWeight: 700, letterSpacing: "-0.03em" }}>
            4.8M monthly reach.
          </span>
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {[
            { k: "Monthly reach", v: "4.8M" },
            { k: "Engagement", v: "7.4%" },
            { k: "Conversions", v: "3.2K" },
          ].map((s) => (
            <div key={s.k} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#ffffff", fontSize: 38, fontWeight: 700 }}>{s.v}</span>
              <span style={{ color: "#9ca3af", fontSize: 19 }}>{s.k}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
