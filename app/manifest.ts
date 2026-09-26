import type { MetadataRoute } from "next"
import { creator } from "@/lib/creator-data"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${creator.name} — ${creator.role}`,
    short_name: creator.first,
    description: creator.positioning,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f9f9fb",
    theme_color: "#6d4aff",
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "business", "productivity"],
    icons: [
      { src: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      { name: "Media Kit", url: "/media-kit" },
      { name: "Work with me", url: "/#contact" },
    ],
  }
}
