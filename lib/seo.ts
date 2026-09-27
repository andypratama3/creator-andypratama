import type { Metadata } from "next"
import { creator, siteUrl } from "@/lib/creator-data"

export const siteName = `${creator.name} — ${creator.role}`

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 }

/** Platform roots used to compose canonical profile URLs from the declared handles. */
const SOCIAL_BASES = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/in/",
  instagram: "https://www.instagram.com/",
  twitter: "https://x.com/",
} as const

export type SocialPlatform = keyof typeof SOCIAL_BASES

/** Compose the canonical profile URL for a platform from its base + declared handle. */
export function profileUrl(key: SocialPlatform): string {
  const handle = creator.socials[key as keyof typeof creator.socials]
  if (!handle) return SOCIAL_BASES[key]
  return `${SOCIAL_BASES[key]}${handle.replace(/^@/, "")}`
}

export const socialProfileUrls: string[] = (Object.keys(SOCIAL_BASES) as SocialPlatform[]).map(
  profileUrl,
).filter(url => url && !url.includes('undefined'))

/** Every outbound social link on the site, keyed the same way as `socialIcon`. */
export const socialLinks: Record<SocialPlatform, string> = {
  github: creator.links.github,
  linkedin: creator.links.linkedin,
  instagram: creator.links.instagram,
  twitter: creator.links.twitter,
}

/**
 * `sameAs` for the Person entity. Every entry must be a real, canonical profile URL —
 * a bare platform root ("https://github.com") points at the platform, not the creator,
 * and dilutes the entity signal Google associates with `sameAs`.
 */
export const sameAs: string[] = [
  creator.links.github,
  creator.links.linkedin,
  creator.links.instagram,
  creator.links.twitter,
].filter(url => url && !url.includes('undefined'))

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString()
}

/**
 * Content revision stamps, as plain calendar dates.
 *
 * The sitemap used `new Date()`, which stamps every URL with the build time on every
 * deploy — so the two legal pages, declared `changeFrequency: "yearly"`, looked freshly
 * edited daily. A `lastModified` that always moves is worse than none: it just trains
 * crawlers to stop trusting the field. Bump a stamp when its page copy actually changes.
 */
export const contentUpdated = {
  home: "2026-09-01",
  mediaKit: "2026-09-01",
  privacy: "2026-09-01",
  terms: "2026-09-01",
} as const

/**
 * Render a `YYYY-MM-DD` stamp as `1 September 2026` for on-page display.
 *
 * Deliberately avoids `new Date(iso)`: that parses as UTC midnight, so in any timezone
 * west of UTC the day shifts backwards and the page would claim a different date from
 * the one it publishes. Splitting the string sidesteps the timezone entirely.
 */
export function formatRevisionDate(iso: string): string {
  const [year, month, day] = iso.split("-")
  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-GB", {
    month: "long",
  })
  return `${Number(day)} ${monthName} ${year}`
}

/**
 * Normalise a display price into schema.org `price` fields.
 *
 * Only unambiguous single amounts are returned. Quotes like "Custom" or ranges such as
 * "$1,200–$2,500" yield `{}` — emitting a range as `price` produces an invalid value
 * that fails structured-data validation.
 */
export function offerPrice(price: string): { price?: string; priceCurrency?: string } {
  const match = price.replace(/[,\s]/g, "").match(/^\$?(\d+(?:\.\d+)?)$/)
  if (!match) return {}
  return { price: match[1], priceCurrency: "USD" }
}

export interface PageMetadataInput {
  /** Page title without the site name; the root layout template appends it. */
  title: string
  description: string
  /** Absolute path with a leading slash, also used as the canonical URL. */
  path: string
  image?: string
  type?: "website" | "article" | "profile"
}

/**
 * Single source of truth for per-page metadata so every route ships a consistent
 * title, description, canonical, Open Graph card and Twitter card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE.url,
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle = path === "/" ? siteName : `${title} — ${creator.name}`
  const images = [{ url: image, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: fullTitle }]

  return {
    // The root layout's title template only applies to child segments, so the home page
    // must opt out of it — otherwise its <title> renders as the literal "Home".
    title: path === "/" ? { absolute: siteName } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName,
      locale: "en_US",
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  }
}
