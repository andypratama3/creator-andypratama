import { describe, expect, it } from "vitest"
import { packages, siteUrl } from "@/lib/creator-data"
import { absoluteUrl, offerPrice, pageMetadata, profileUrl, sameAs, socialLinks } from "@/lib/seo"

describe("profileUrl", () => {
  it("composes a canonical URL from the platform base and the declared handle", () => {
    expect(profileUrl("github")).toBe("https://github.com/andypratama3")
    expect(profileUrl("linkedin")).toBe("https://www.linkedin.com/in/andypratama3")
    expect(profileUrl("instagram")).toBe("https://www.instagram.com/andypratama3")
    expect(profileUrl("twitter")).toBe("https://x.com/andypratama3")
  })
})

describe("sameAs", () => {
  it("never contains a bare platform root", () => {
    // A root like https://tiktok.com identifies the platform, not the creator, and
    // dilutes the entity signal Google reads from `sameAs`.
    const bareRoots = [
      "https://tiktok.com",
      "https://instagram.com",
      "https://youtube.com",
      "https://www.tiktok.com",
      "https://www.instagram.com",
      "https://www.youtube.com",
    ]
    for (const url of sameAs) {
      expect(bareRoots).not.toContain(url)
      expect(new URL(url).pathname).not.toBe("/")
    }
  })

  it("includes every social profile", () => {
    expect(sameAs).toEqual([
      socialLinks.github,
      socialLinks.linkedin,
      socialLinks.instagram,
      socialLinks.twitter,
    ])
  })
})

describe("socialLinks", () => {
  it("covers exactly the platforms the icon set renders", () => {
    expect(Object.keys(socialLinks).sort()).toEqual(["github", "instagram", "linkedin", "twitter"])
  })
})

describe("absoluteUrl", () => {
  it("resolves paths against the canonical site URL", () => {
    expect(absoluteUrl("/")).toBe(`${siteUrl}/`)
    expect(absoluteUrl("/media-kit")).toBe(`${siteUrl}/media-kit`)
  })
})

describe("offerPrice", () => {
  it("parses a plain currency amount", () => {
    expect(offerPrice("$79")).toEqual({ price: "79", priceCurrency: "USD" })
    expect(offerPrice("1200")).toEqual({ price: "1200", priceCurrency: "USD" })
  })

  it("drops separators from thousands groups", () => {
    expect(offerPrice("$1,200")).toEqual({ price: "1200", priceCurrency: "USD" })
  })

  it("omits price entirely for quotes and ranges", () => {
    // A range such as "$1,200–$2,500" is not a valid schema.org `price` value.
    expect(offerPrice("Custom")).toEqual({})
    expect(offerPrice("$1,200–$2,500")).toEqual({})
    expect(offerPrice("Let's discuss")).toEqual({})
  })

  it("stays valid for every package on the site", () => {
    for (const p of packages) {
      const { price } = offerPrice(p.price)
      if (p.price === "Custom") {
        expect(price).toBeUndefined()
      } else {
        expect(price).toMatch(/^\d+(\.\d+)?$/)
      }
    }
  })
})

describe("pageMetadata", () => {
  it("uses the bare page title for the document and appends the name for social cards", () => {
    const meta = pageMetadata({ title: "Media Kit", description: "Reach and packages.", path: "/media-kit" })

    // The root layout's title template appends the site name in the rendered <title>.
    expect(meta.title).toBe("Media Kit")
    expect(meta.openGraph?.title).toBe("Media Kit — Andy Pratama")
    expect(meta.twitter?.title).toBe("Media Kit — Andy Pratama")
  })

  it("gives the home page an absolute title instead of the literal page label", () => {
    // The template does not apply to the root segment, so a plain string would render
    // as <title>Home</title>.
    const meta = pageMetadata({ title: "Home", description: "Portfolio.", path: "/" })
    expect(meta.title).toEqual({ absolute: "Andy Pratama — Software Engineer & Creator" })
    expect(meta.openGraph?.title).toBe("Andy Pratama — Software Engineer & Creator")
  })

  it("sets a self-referencing canonical and absolute Open Graph URL", () => {
    const meta = pageMetadata({ title: "Privacy Policy", description: "Data handling.", path: "/privacy" })
    expect(meta.alternates?.canonical).toBe("/privacy")
    expect(meta.openGraph?.url).toBe(`${siteUrl}/privacy`)
  })

  it("ships a 1200x630 summary_large_image card on every page", () => {
    for (const path of ["/", "/media-kit", "/privacy", "/terms"]) {
      const meta = pageMetadata({ title: "T", description: "D", path })
      // `Metadata["twitter"]` is a union of the summary- and player-card shapes.
      const twitter = meta.twitter as {
        card?: string
        images?: { width?: number; height?: number }[]
      } | null

      expect(twitter?.card).toBe("summary_large_image")
      expect(meta.openGraph?.images).toEqual([
        expect.objectContaining({ width: 1200, height: 630 }),
      ])
      expect(twitter?.images).toEqual([expect.objectContaining({ width: 1200, height: 630 })])
    }
  })
})
