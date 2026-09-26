import type { Metadata } from "next"
import { creator, siteUrl } from "@/lib/creator-data"

export const siteName = `${creator.name} — ${creator.role}`

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 }

/** Platform roots used to compose canonical profile URLs from the declared handles. */
const SOCIAL_BASES = {
  tiktok: "https://www.tiktok.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
} as const

export type SocialPlatform = keyof typeof SOCIAL_BASES

/** Compose the canonical profile URL for a platform from its base + declared handle. */
export function profileUrl(key: SocialPlatform): string {
  return `${SOCIAL_BASES[key]}${creator.socials[key].replace(/^@/, "")}`
}

export const socialProfileUrls: string[] = (Object.keys(SOCIAL_BASES) as SocialPlatform[]).map(
  profileUrl,
)

/** Every outbound social link on the site, keyed the same way as `socialIcon`. */
export const socialLinks: Record<SocialPlatform, string> = {
  tiktok: socialProfileUrls[0],
  instagram: socialProfileUrls[1],
  youtube: socialProfileUrls[2],
}

/**
 * `sameAs` for the Person entity. Every entry must be a real, canonical profile URL —
 * a bare platform root ("https://tiktok.com") points at the platform, not the creator,
 * and dilutes the entity signal Google associates with `sameAs`.
 */
export const sameAs: string[] = [...socialProfileUrls, creator.links.whatsapp]

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString()
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
