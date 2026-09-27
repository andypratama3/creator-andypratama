import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/creator-data"
import { contentUpdated } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  // Real revision dates, not the build clock — see `contentUpdated` in lib/seo.ts.
  return [
    {
      url: siteUrl,
      lastModified: new Date(contentUpdated.home),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/media-kit`,
      lastModified: new Date(contentUpdated.mediaKit),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(contentUpdated.privacy),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(contentUpdated.terms),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
