import {
  audience,
  brands,
  creator,
  faqs,
  packages,
  platformStats,
  products,
  services,
  siteUrl,
} from "@/lib/creator-data"
import { siteName } from "@/lib/seo"

/**
 * `/llms-full.txt` — the substance of the portfolio as Markdown, so an assistant can
 * ingest the core claims in a single request instead of reconstructing them from the
 * rendered DOM. Generated from `creator-data` so it can never drift from the site.
 */
export const dynamic = "force-static"

const body = `# ${siteName}

> ${creator.positioning}

## Who ${creator.first} is

${creator.bio.join("\n\n")}

- Role: ${creator.role}
- Location: ${creator.location} (${creator.timezone})
- Languages: ${creator.languages.join(", ")}
- Niches: ${creator.niche.join(", ")}
- Years creating: ${creator.yearsCreating}
- Availability: ${creator.availability}
- Booking lead time: ${creator.bookingLead}
- Typical reply time: ${creator.responseTime}
- Contact: ${creator.email}

## Audience and reach

${platformStats.map((s) => `- ${s.platform}: ${s.value}${s.suffix} ${s.label} — ${s.sub}`).join("\n")}

Median age: ${audience.medianAge}
Gender split: ${audience.gender.map((g) => `${g.label} ${g.value}%`).join(", ")}
Age bands: ${audience.age.map((a) => `${a.label} ${a.value}%`).join(", ")}
Top markets: ${audience.locations.map((l) => `${l.label} ${l.value}%`).join(", ")}
Interests: ${audience.interests.join(", ")}
30-day averages: ${audience.averages.map((a) => `${a.label} ${a.value}`).join("; ")}
Audience data updated: ${audience.updated}

## Services

${services.map((s) => `- **${s.title}** — ${s.body}`).join("\n")}

## Collaboration packages

${packages
  .map(
    (p) =>
      `- **${p.name}** (${p.price === "Custom" ? "priced per brief" : `from ${p.price}`}): ${p.note}`,
  )
  .join("\n")}

## Past brand collaborations

${brands.map((b) => `- **${b.name}** — ${b.campaign}. Result: ${b.result}`).join("\n")}

Figures above are placeholder values for a portfolio template and are not audited results.

## Product recommendations

${products
  .map(
    (p) =>
      `- **${p.name}** (${p.brand}, ${p.category}) — ${p.best}. ${p.verdict} Listed at ${p.price}.${p.affiliate ? " Affiliate link." : ""}`,
  )
  .join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Legal

- Privacy policy: ${siteUrl}/privacy/
- Terms of collaboration: ${siteUrl}/terms/
`

export function GET() {
  return new Response(body.trimStart(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
