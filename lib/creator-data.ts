// Structured, easily-replaceable content for the portfolio.
// All figures are clearly-marked PLACEHOLDER values — swap with real data.

export const siteUrl = "https://andypratama.co"

export const creator = {
  name: "Andy Pratama",
  first: "Andy",
  role: "Creator & Affiliate Marketer",
  tagline: "Content that connects. Products that convert.",
  intro:
    "I create authentic short-form content that helps brands reach the right audience and turn attention into measurable action.",
  // One-line positioning used in the media kit header, OG tags and JSON-LD.
  positioning:
    "Short-form tech & lifestyle creator in Jakarta — 4.8M monthly reach and 3,200+ affiliate conversions across 40+ campaigns.",
  bio: [
    "I'm Andy, a short-form content creator focused on technology and everyday lifestyle. I test products the way I actually use them, then show the result honestly — what worked, what didn't, and who should skip it.",
    "Over the last five years I've built a 225K-follower audience across TikTok, Instagram and YouTube, and turned that attention into measurable action for brands: product launches, always-on UGC, affiliate campaigns and long-term partnerships.",
    "I work like a marketer who happens to shoot. Every brief gets a hook strategy, a retention plan and tracked links, and every campaign closes with a plain-English performance report.",
  ],
  location: "Jakarta, Indonesia",
  timezone: "GMT+7 (WIB)",
  languages: ["Indonesian", "English"],
  availability: "Available for brand collaborations",
  bookingLead: "2–3 weeks",
  responseTime: "1–2 business days",
  yearsCreating: 5,
  niche: ["Technology", "Lifestyle"],
  email: "hello@andypratama.co",
  socials: {
    tiktok: "@andypratama",
    instagram: "@andy.pratama",
    youtube: "@andypratama",
  },
  links: {
    tiktok: "https://tiktok.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/6280000000000",
  },
} as const

/**
 * `profileKey` / `interactionType` / `audienceCount` feed the schema.org
 * `interactionStatistic` counters. Keeping them next to the rendered figures means the
 * structured data and the visible page can never drift apart — Google treats markup that
 * contradicts on-page content as a quality violation.
 */
export const platformStats = [
  {
    platform: "TikTok",
    profileKey: "tiktok",
    interactionType: "FollowAction",
    audienceCount: 125000,
    value: 125,
    suffix: "K+",
    label: "Followers",
    sub: "4.8M monthly views",
  },
  {
    platform: "Instagram",
    profileKey: "instagram",
    interactionType: "FollowAction",
    audienceCount: 62000,
    value: 62,
    suffix: "K+",
    label: "Followers",
    sub: "2.1M monthly reach",
  },
  {
    platform: "YouTube",
    profileKey: "youtube",
    interactionType: "SubscribeAction",
    audienceCount: 38000,
    value: 38,
    suffix: "K+",
    label: "Subscribers",
    sub: "1.4M monthly views",
  },
  {
    platform: "Affiliate",
    profileKey: null,
    interactionType: null,
    audienceCount: 0,
    value: 3200,
    suffix: "+",
    label: "Conversions",
    sub: "Across 40+ campaigns",
  },
] as const

export const metrics = [
  { label: "Avg. engagement rate", value: 7, suffix: ".4%", trend: "+1.8pt vs. niche avg." },
  { label: "Total monthly reach", value: 4, suffix: ".8M", trend: "+38% last 90 days" },
  { label: "Avg. link click-through", value: 5, suffix: ".2%", trend: "+0.9pt QoQ" },
  { label: "Affiliate conversion rate", value: 3, suffix: ".6%", trend: "Above category median" },
] as const

// 12 months of relative reach index (placeholder shape for the chart).
export const reachSeries = [
  32, 38, 41, 47, 44, 52, 58, 61, 57, 68, 74, 82,
] as const

export const featuredContent = [
  {
    platform: "TikTok",
    title: "3 things I wish I knew before buying this",
    thumb: "/content-1.jpg",
    views: "2.4M",
    engagement: "8.2%",
    product: "Wireless Earbuds",
    href: "https://tiktok.com",
  },
  {
    platform: "Instagram",
    title: "My honest 30-day skincare results",
    thumb: "/content-2.jpg",
    views: "980K",
    engagement: "6.9%",
    product: "Skincare Serum",
    href: "https://instagram.com",
  },
  {
    platform: "YouTube",
    title: "The desk setup that actually made me productive",
    thumb: "/content-3.jpg",
    views: "1.3M",
    engagement: "7.5%",
    product: "Desk Accessories",
    href: "https://youtube.com",
  },
] as const

export const categories = [
  { n: "01", title: "Product Reviews", body: "Authentic product experiences designed to build trust." },
  { n: "02", title: "Lifestyle Content", body: "Natural product integration into everyday life." },
  { n: "03", title: "Tutorials", body: "Useful educational content that demonstrates products." },
  { n: "04", title: "UGC", body: "Authentic user-generated content for brand campaigns." },
  { n: "05", title: "Affiliate Content", body: "Content optimized for product discovery and conversion." },
  { n: "06", title: "Unboxing", body: "High-quality product introduction and first impressions." },
] as const

export const brands = [
  { name: "Northwind", campaign: "Product launch", result: "1.2M views" },
  { name: "Lumen", campaign: "Always-on UGC", result: "6.8% eng." },
  { name: "Verre", campaign: "Affiliate drop", result: "3.2K clicks" },
  { name: "Kai Studio", campaign: "Seasonal", result: "890K reach" },
  { name: "Monogram", campaign: "Review series", result: "4.1% CTR" },
  { name: "Atlas", campaign: "Long-term", result: "12 videos" },
] as const

export const caseStudy = {
  brand: "Northwind Audio",
  campaign: "Flagship earbuds launch",
  objective: "Increase launch-week awareness among Gen Z audiences.",
  strategy: [
    "Short-form educational content on real-world usage",
    "Authentic storytelling around sound quality",
    "Clear CTA to affiliate landing page",
  ],
  deliverables: ["3 TikTok videos", "2 Instagram Reels", "5 Story frames"],
  results: [
    { value: "1.2M+", label: "Total views" },
    { value: "8.4%", label: "Engagement" },
    { value: "3,200+", label: "Link clicks" },
  ],
} as const

export const services = [
  { n: "01", title: "Sponsored Content", body: "Custom content that features your product naturally." },
  { n: "02", title: "UGC Content", body: "Creator-style content for your brand's own channels." },
  { n: "03", title: "Affiliate Campaign", body: "Performance-driven content using affiliate links." },
  { n: "04", title: "Product Review", body: "Honest, informative, product-focused content." },
  { n: "05", title: "Product Launch", body: "Launch campaigns designed to generate awareness." },
  { n: "06", title: "Long-Term Partnership", body: "Ongoing content partnerships with your brand." },
] as const

export const packages = [
  {
    name: "Starter",
    price: "$450",
    note: "1 short-form video",
    features: ["Concept & script", "Production", "Editing", "1 revision"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    note: "3 short-form videos",
    features: ["Creative direction", "Production", "Editing", "Cross-platform adaptation"],
    featured: true,
  },
  {
    name: "Campaign",
    price: "Custom",
    note: "Let's discuss",
    features: ["Strategy", "Multiple deliverables", "Multi-platform", "Reporting"],
    featured: false,
  },
] as const

export const testimonials = [
  {
    quote:
      "Working with Andy made our product launch feel authentic while still delivering measurable results. The content overperformed our targets.",
    name: "Sarah Lim",
    title: "Marketing Manager",
    company: "Northwind Audio",
  },
  {
    quote:
      "Clear communication, sharp creative instincts, and content that actually converts. One of the few creators who thinks like a marketer.",
    name: "Devon Rae",
    title: "Brand Partnerships",
    company: "Lumen",
  },
  {
    quote:
      "The reporting after the campaign was genuinely useful. We knew exactly what worked and reinvested into a long-term partnership.",
    name: "Priya Nair",
    title: "Growth Lead",
    company: "Verre",
  },
] as const

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Analytics", href: "#analytics" },
  { label: "Content", href: "#content" },
  { label: "Picks", href: "#picks" },
  { label: "Brands", href: "#brands" },
  { label: "Services", href: "#services" },
] as const

// Sections used for navbar scroll-spy on the home page.
// Must match the `id` of every <section> rendered by app/page.tsx, in order.
export const sectionIds = [
  "top",
  "about",
  "analytics",
  "content",
  "picks",
  "audience",
  "brands",
  "services",
  "process",
  "testimonials",
  "faq",
  "contact",
] as const

/* ------------------------------------------------------------------ *
 * Audience — placeholder analytics pulled from platform dashboards.
 * ------------------------------------------------------------------ */

export const audience = {
  medianAge: 27,
  gender: [
    { label: "Male", value: 54 },
    { label: "Female", value: 44 },
    { label: "Other / not stated", value: 2 },
  ],
  age: [
    { label: "18–24", value: 31 },
    { label: "25–34", value: 42 },
    { label: "35–44", value: 18 },
    { label: "45+", value: 9 },
  ],
  locations: [
    { label: "Indonesia", value: 71 },
    { label: "Singapore", value: 6 },
    { label: "United States", value: 5 },
    { label: "Australia", value: 4 },
    { label: "Malaysia", value: 3 },
    { label: "Other markets", value: 11 },
  ],
  interests: [
    "Consumer tech",
    "Audio & wearables",
    "Productivity",
    "Desk setup",
    "Deals & value",
    "Gaming gear",
    "Fitness tech",
    "Travel tech",
  ],
  // Performance averages (30-day), not best-ever outliers.
  averages: [
    { label: "30-day avg. views / post", value: "184K" },
    { label: "Avg. engagement rate", value: "7.4%" },
    { label: "Hook retention (3s)", value: "72%" },
    { label: "Avg. completion rate", value: "41%" },
  ],
  updated: "Q3 2026",
} as const

/* ------------------------------------------------------------------ *
 * Products — the affiliate / recommendation shelf.
 * `affiliate: true` items are monetised through tracked links.
 * ------------------------------------------------------------------ */

export const productCategories = [
  "All",
  "Audio",
  "Tech",
  "Home",
  "Beauty",
  "Lifestyle",
] as const

export type ProductCategory = (typeof productCategories)[number]

export type Product = {
  name: string
  brand: string
  category: Exclude<ProductCategory, "All">
  verdict: string
  best: string
  rating: number
  price: string
  compareAt?: string
  platform: "tiktok" | "instagram" | "youtube"
  icon: string
  accent: string
  affiliate: boolean
}

export const products: readonly Product[] = [
  {
    name: "Aurora Pro Wireless Earbuds",
    brand: "Northwind Audio",
    category: "Audio",
    verdict:
      "The first pair I stopped rotating. Soundstage is wide for the price and the case survives a commute.",
    best: "Best overall everyday earbuds under $100",
    rating: 4.8,
    price: "$79",
    compareAt: "$99",
    platform: "tiktok",
    icon: "headphones",
    accent: "brand",
    affiliate: true,
  },
  {
    name: "Meridian 2 Smartwatch",
    brand: "Meridian",
    category: "Tech",
    verdict:
      "Seven-day battery is real, and the sleep data is genuinely useful. Heavy, but you notice that once.",
    best: "Best battery life for the price",
    rating: 4.6,
    price: "$149",
    compareAt: "$179",
    platform: "youtube",
    icon: "watch",
    accent: "brand-2",
    affiliate: true,
  },
  {
    name: "Halo Mechanical Keyboard 75%",
    brand: "Halo",
    category: "Tech",
    verdict:
      "Hot-swappable, gasket-mounted, and quiet enough for a shared studio. The sound is the selling point.",
    best: "Best typing feel for hybrid work",
    rating: 4.7,
    price: "$92",
    platform: "youtube",
    icon: "keyboard",
    accent: "info",
    affiliate: true,
  },
  {
    name: "Cloudrest Gel Pillow",
    brand: "Cloudrest",
    category: "Home",
    verdict:
      "Slightly firmer than memory foam. Took three nights, then I stopped waking up with a stiff neck.",
    best: "Best pillow for side sleepers",
    rating: 4.4,
    price: "$58",
    platform: "instagram",
    icon: "bed",
    accent: "brand-3",
    affiliate: true,
  },
  {
    name: "Lumen Task Lamp Pro",
    brand: "Lumen",
    category: "Home",
    verdict:
      "Tunable from warm to daylight with no flicker. I have filmed three videos under it with zero colour casts.",
    best: "Best light for filming and desk work",
    rating: 4.5,
    price: "$84",
    compareAt: "$110",
    platform: "instagram",
    icon: "lamp",
    accent: "warn",
    affiliate: true,
  },
  {
    name: "Verre Barrier Serum",
    brand: "Verre",
    category: "Beauty",
    verdict:
      "Thin texture, no pilling under makeup. 30 days in, my barrier is calmer — full write-up in my Reels.",
    best: "Best lightweight serum for daily use",
    rating: 4.3,
    price: "$32",
    platform: "instagram",
    icon: "sparkles",
    accent: "ok",
    affiliate: true,
  },
  {
    name: "Atlas Carry-On Case",
    brand: "Atlas",
    category: "Lifestyle",
    verdict:
      "Fits a 16-inch laptop and a week of clothes. The wheels are the weak point, the shell is not.",
    best: "Best personal-item-sized carry-on",
    rating: 4.2,
    price: "$139",
    platform: "tiktok",
    icon: "briefcase",
    accent: "brand-2",
    affiliate: true,
  },
  {
    name: "Kai Studio Mic Kit",
    brand: "Kai Studio",
    category: "Audio",
    verdict:
      "You will not get broadcast quality, but you will get a voiceover that beats every laptop mic at a third of the price.",
    best: "Best budget mic for creator voiceovers",
    rating: 4.5,
    price: "$46",
    platform: "tiktok",
    icon: "mic",
    accent: "ok",
    affiliate: false,
  },
  {
    name: "Monogram Daily Carry Pouch",
    brand: "Monogram",
    category: "Lifestyle",
    verdict:
      "Waxed canvas, survives a monsoon, and finally gives my cables somewhere organised to live.",
    best: "Best organiser for a tech-heavy EDC",
    rating: 4.1,
    price: "$38",
    platform: "youtube",
    icon: "bag",
    accent: "info",
    affiliate: true,
  },
]

/* ------------------------------------------------------------------ *
 * Process, FAQ, deliverables
 * ------------------------------------------------------------------ */

export const process = [
  {
    n: "01",
    title: "Brief & goal",
    body: "You share the product, the must-includes and the goal — awareness, clicks or conversions. I come back with angles, hooks and a scope.",
    meta: "Day 1",
  },
  {
    n: "02",
    title: "Concept & script",
    body: "You get a written outline, a hook, shot list and caption draft before anything is filmed. Approve it or redirect it here.",
    meta: "Day 2–3",
  },
  {
    n: "03",
    title: "Production",
    body: "Filmed on location in Jakarta — or your studio if you host. Product arrives, we shoot vertical-first, and I send you raw selects on request.",
    meta: "Day 4–7",
  },
  {
    n: "04",
    title: "Review & revisions",
    body: "One round of edits is included, two for campaign packages. Legal or product-accuracy changes are never counted against you.",
    meta: "Day 8–10",
  },
  {
    n: "05",
    title: "Publish & report",
    body: "Tracked links and UTMs go live, then you get a plain-English report: views, retention, clicks and conversions within 7 days.",
    meta: "Day 11+",
  },
] as const

export const faqs = [
  {
    q: "How much does a collaboration cost?",
    a: "Packages start at $450 for a single short-form video and scale with deliverables, usage rights and exclusivity. Every quote is built from your scope, not a fixed rate card — send the brief and you'll get a number within 1–2 business days.",
  },
  {
    q: "What do you need from us to start?",
    a: "The product, a one-line goal, any must-include talking points, and the deadline. If you have brand guidelines or a banned-claims list, send that too. That's it — I write the hooks, the script and the caption.",
  },
  {
    q: "How long does a project take?",
    a: "Most single-video projects run 10–14 days from brief to published. Campaign packages with multiple deliverables typically take 3–4 weeks. Booking two to three weeks ahead keeps your launch date safe.",
  },
  {
    q: "Do you offer paid usage rights and whitelisting?",
    a: "Yes. Organic posting on my channels is included in every package. Paid usage (running the video as an ad from my handle or yours) and Spark-style whitelisting are quoted as line items for 30 or 90 days, so you only pay for the window you need.",
  },
  {
    q: "Can you produce UGC without posting on your channels?",
    a: "Absolutely. A large share of my work is UGC delivered as clean, caption-free files for your team to run on your own pages. Same production standards, no distribution from my audience.",
  },
  {
    q: "How do you track campaign performance?",
    a: "Every link is shortened with a UTM, so clicks land in your analytics under a source you control. I also report views, 3-second hook retention, completion rate, link CTR and — for affiliate work — conversions and revenue per video.",
  },
  {
    q: "Do you offer category exclusivity?",
    a: "I do, for a limited number of partners per quarter. Exclusivity is always quoted as its own line item, and I'm happy to talk through a category definition that doesn't quietly block adjacent products you actually want to work with.",
  },
  {
    q: "Who owns the content after the campaign?",
    a: "I retain ownership of everything I make. You receive the agreed licence — organic posting on my channels, plus any paid usage window we've contracted. Full terms are in the terms page.",
  },
  {
    q: "Do you only work in tech and lifestyle?",
    a: "Those are my strongest categories, and where my audience converts best. I'm open to adjacent briefs — audio, wearables, home, beauty, fitness and travel tech all convert well. Send it through and I'll tell you honestly whether I'm the right fit.",
  },
  {
    q: "Do you work with smaller or newer brands?",
    a: "Frequently. A strong brief from a smaller brand usually gets a faster answer and more creative latitude than a vague brief from a large one. What matters is product quality and a clear goal — not your company size.",
  },
] as const

export const deliverables = [
  "Vertical-first 9:16 master",
  "Captioned + clean cut",
  "Hook & script document",
  "Shot list and B-roll selects",
  "Caption drafts with hashtags",
  "Tracked links and UTMs",
  "Performance report",
  "30-day paid usage option",
] as const

export const serviceTiers = [
  {
    name: "UGC only",
    note: "Content for your channels",
    includes: "No posting on my profiles",
  },
  {
    name: "Sponsored post",
    note: "Filmed + published on my channels",
    includes: "Organic distribution included",
  },
  {
    name: "Affiliate",
    note: "Performance-based commission",
    includes: "Tracked links, full reporting",
  },
] as const

export const faqPageUrl = `${siteUrl}/#faq`
export const mediaKitUrl = `${siteUrl}/media-kit`

// Flat brand list reused by the media kit page.
export const brandNames = brands
