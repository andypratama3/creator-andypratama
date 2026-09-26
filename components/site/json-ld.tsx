import {
  audience,
  creator,
  faqs,
  mediaKitUrl,
  packages,
  platformStats,
  products,
  siteUrl,
} from "@/lib/creator-data"
import { offerPrice, sameAs } from "@/lib/seo"

/**
 * Follower/subscription counters for the Person entity.
 *
 * Counts are read from `platformStats`, the same array the page renders, so the markup
 * can never contradict the visible page. Entries without a profile (the Affiliate row)
 * are skipped because `InteractionCounter` only applies to follow/subscribe actions.
 */
const interactionCounters = platformStats
  .filter((s) => s.interactionType !== null && s.audienceCount > 0)
  .map((s) => ({
    "@type": "InteractionCounter",
    interactionType: { "@type": s.interactionType },
    userInteractionCount: s.audienceCount,
  }))

/**
 * Only numeric package prices reach `Offer.price`. Passing a range or a "Custom" quote
 * through would emit an invalid `price` value, so those offers carry a name and
 * description only. See `offerPrice` in `lib/seo.ts`.
 */

export function JsonLd() {
  const graph = [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: creator.name,
      alternateName: Object.values(creator.socials).map((handle) => handle.replace(/^@/, "")),
      identifier: { "@type": "PropertyValue", name: "SameAs", value: sameAs[0] },
      givenName: creator.first,
      jobTitle: creator.role,
      description: creator.positioning,
      url: siteUrl,
      email: creator.email,
      image: `${siteUrl}/creator-portrait.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
      knowsAbout: [...creator.niche],
      knowsLanguage: creator.languages,
      sameAs,
      interactionStatistic: interactionCounters,
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: `${creator.name} — ${creator.role}`,
      description: creator.positioning,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${creator.name} — ${creator.role}`,
      description: creator.positioning,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      // The shelf lists products Andy recommends, not products sold here. Emitting
      // `offers` or `aggregateRating` would assert a commercial relationship and a
      // review score that the page does not provide, which falls under Google's
      // structured-data quality guidelines. Descriptive fields only.
      "@type": "ItemList",
      "@id": `${siteUrl}/#picks`,
      name: "Recommended products",
      description: "Products reviewed by the creator, with the use case each one fits.",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          category: p.category,
        description: p.verdict,
          brand: { "@type": "Brand", name: p.brand },
        },
      })),
    },
    {
      // Kept despite the rich result being retired: Google stopped showing FAQ
      // expansions on 7 May 2026, but FAQPage is still valid schema.org and remains
      // the format AI answer engines lift question/answer pairs from.
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "OfferCatalog",
      "@id": `${siteUrl}/#services`,
      name: "Creator collaboration packages",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.note,
        ...offerPrice(p.price),
        availability: "https://schema.org/InStock",
        seller: { "@id": `${siteUrl}/#person` },
        url: `${siteUrl}/#services`,
      })),
    },
    breadcrumbNode(siteUrl, "Home", siteUrl),
  ]

  return <JsonLdScript graph={graph} />
}

export function MediaKitJsonLd() {
  const graph = [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: creator.name,
      jobTitle: creator.role,
      description: creator.positioning,
      url: mediaKitUrl,
      email: creator.email,
      image: `${siteUrl}/creator-portrait.jpg`,
      knowsAbout: [...creator.niche],
      sameAs,
      interactionStatistic: interactionCounters,
    },
    {
      "@type": "WebPage",
      "@id": `${mediaKitUrl}#webpage`,
      url: mediaKitUrl,
      name: `${creator.name} — Media Kit`,
      description: creator.positioning,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Audience",
      "@id": `${mediaKitUrl}#audience`,
      audienceType: "Followers and subscribers",
      numberOfInAudience: interactionCounters.reduce(
        (total, counter) => total + counter.userInteractionCount,
        0,
      ),
      geographicArea: audience.locations.map((l) => ({
        "@type": "Place",
        name: l.label,
      })),
      suggestedMinAge: 18,
    },
    breadcrumbNode(mediaKitUrl, "Home", siteUrl, { name: "Media Kit", path: "/media-kit" }),
  ]

  return <JsonLdScript graph={graph} />
}

export function LegalJsonLd({
  path,
  title,
  description,
  updated,
}: {
  path: string
  title: string
  description: string
  updated: string
}) {
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}#webpage`,
      url: `${siteUrl}${path}`,
      name: title,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
      dateModified: updated,
    },
    breadcrumbNode(`${siteUrl}${path}`, "Home", siteUrl, { name: title, path }),
  ]

  return <JsonLdScript graph={graph} />
}

type Crumb = { name: string; path: string }

/** Build a `BreadcrumbList` node that always starts from the home page. */
function breadcrumbNode(currentUrl: string, currentName: string, rootUrl: string, current?: Crumb) {
  const items: Crumb[] = current
    ? [
        { name: "Home", path: rootUrl },
        { name: current.name, path: currentUrl },
      ]
    : [{ name: currentName, path: currentUrl }]

  return {
    "@type": "BreadcrumbList",
    "@id": `${currentUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path,
    })),
  }
}

function JsonLdScript({ graph }: { graph: object[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is a build-time constant, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  )
}
