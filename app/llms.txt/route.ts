import { faqs, mediaKitUrl, packages, siteUrl, creator } from "@/lib/creator-data"
import { siteName } from "@/lib/seo"

/**
 * `/llms.txt` — a curated, plain-text map of the site for LLM crawlers.
 *
 * Note on value: Google states it ignores this file (Google AI optimization guidance,
 * 2026-06-29) and no major AI provider has confirmed consuming it, so it is shipped as
 * low-cost optionality for non-Google AI services — not as a ranking or citation lever.
 * See `/llms-full.txt` for the same content inlined as Markdown.
 */
export const dynamic = "force-static"

const body = `# ${siteName}

> ${creator.positioning}

${creator.name} is a ${creator.role.toLowerCase()} based in ${creator.location}. He develops
web applications and mobile solutions in ${creator.niche.join(" and ")} for ${creator.yearsCreating} years, builds
digital products for clients, and provides technical consulting services. Pages on this
site are in English; he also works in Indonesian.

Contact: ${creator.email}

## Primary

- [${creator.name} — portfolio and contact](${siteUrl}/): Who he is, technical skills per platform,
  project results, services, project showcase, and a contact form.
- [Media kit](${mediaKitUrl}): Technical skills, project experience, client collaborations,
  service pricing, and an on-page contact form for briefs and pricing questions.

## Reference

- [Privacy policy](${siteUrl}/privacy/): What data the contact form collects and how it is used.
- [Terms of service](${siteUrl}/terms/): Default scope, deliverables, code ownership,
  payment terms and cancellation for development work.

## Optional

${packages
  .map(
    (p) =>
      `- [${p.name} package](${siteUrl}/#services): ${p.note}. ${p.price === "Custom" ? "Priced per brief." : `From ${p.price}.`}`,
  )
  .join("\n")}

## Questions answered on the site

${faqs.map((f) => `- ${f.q}`).join("\n")}
`

export function GET() {
  return new Response(body.trimStart(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
