// Structured, easily-replaceable content for the portfolio.
// All figures are clearly-marked PLACEHOLDER values — swap with real data.

export const siteUrl = "https://www.andypratama.studio"

export const creator = {
  name: "Andy Pratama",
  first: "Andy",
  role: "Software Engineer & Creator",
  tagline: "Building digital experiences that matter.",
  intro:
    "I create software solutions and digital content that help businesses and individuals achieve their goals through technology.",
  // One-line positioning used in the media kit header, OG tags and JSON-LD.
  positioning:
    "Software engineer and digital creator based in Samarinda — building web applications and creating content that bridges technology and everyday life.",
  bio: [
    "I'm Andy, a software engineer and digital creator passionate about building meaningful digital experiences. I combine technical expertise with creative storytelling to deliver solutions that make a real impact.",
    "With experience in web development, content creation, and digital strategy, I help brands and individuals navigate the digital landscape with practical solutions and authentic communication.",
    "I believe in the power of technology to solve real problems and create opportunities. Whether it's building a web application or creating content that resonates, I focus on delivering value and measurable results.",
  ],
  location: "Samarinda, Indonesia",
  timezone: "GMT+8 (WITA)",
  languages: ["Indonesian", "English"],
  availability: "Available for projects and collaborations",
  bookingLead: "1–2 weeks",
  responseTime: "24–48 hours",
  yearsCreating: 3,
  niche: ["Software Development", "Digital Content", "Technology"],
  email: "andypratama1211@gmail.com",
  socials: {
    github: "andypratama3",
    linkedin: "andypratama3",
    instagram: "andypratama3",
    twitter: "andypratama3",
  },
  links: {
    github: "https://github.com/andypratama3",
    linkedin: "https://www.linkedin.com/in/andypratama3",
    instagram: "https://www.instagram.com/andypratama3",
    twitter: "https://x.com/andypratama3",
    email: "mailto:andypratama1211@gmail.com",
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
    platform: "GitHub",
    profileKey: "github",
    interactionType: "FollowAction",
    audienceCount: 150,
    value: 150,
    suffix: "+",
    label: "Followers",
    sub: "Active contributor",
  },
  {
    platform: "LinkedIn",
    profileKey: "linkedin",
    interactionType: "FollowAction",
    audienceCount: 500,
    value: 500,
    suffix: "+",
    label: "Connections",
    sub: "Professional network",
  },
  {
    platform: "Projects",
    profileKey: null,
    interactionType: null,
    audienceCount: 0,
    value: 25,
    suffix: "+",
    label: "Projects",
    sub: "Open source & personal",
  },
  {
    platform: "Experience",
    profileKey: null,
    interactionType: null,
    audienceCount: 0,
    value: 3,
    suffix: "+",
    label: "Years",
    sub: "Software development",
  },
] as const

export type Metric = {
  label: string
  value: number | string
  suffix: string
  trend: string
}

// Annotated rather than `as const` so `value` stays `number | string`: with a const
// assertion TypeScript narrows every element's `value` to `number` and the
// string-rendering branch in `Performance` collapses to `never`.
export const metrics: readonly Metric[] = [
  { label: "On-time delivery", value: 95, suffix: "%", trend: "Consistent project completion" },
  { label: "Client satisfaction", value: 100, suffix: "%", trend: "Based on feedback" },
  { label: "Code quality score", value: 4.8, suffix: "/5", trend: "Industry standards" },
  { label: "Repeat clients", value: 40, suffix: "%", trend: "Long-term partnerships" },
]

// 12 months of relative reach index (placeholder shape for the chart).
export const reachSeries = [
  32, 38, 41, 47, 44, 52, 58, 61, 57, 68, 74, 82,
] as const

export const featuredContent = [
  {
    platform: "GitHub",
    title: "Educational Management System",
    thumb: "/project-1.jpg",
    views: "150+",
    engagement: "25 stars",
    product: "Web Application",
    href: "https://github.com/andypratama3",
  },
  {
    platform: "Web",
    title: "Health Information Portal",
    thumb: "/project-2.jpg",
    views: "500+",
    engagement: "Active users",
    product: "Full-stack App",
    href: "https://www.andypratama.studio",
  },
  {
    platform: "Mobile",
    title: "Cross-platform Mobile Solution",
    thumb: "/project-3.jpg",
    views: "200+",
    engagement: "Downloads",
    product: "Mobile App",
    href: "https://www.andypratama.studio",
  },
] as const

export const categories = [
  { n: "01", title: "Web Development", body: "Full-stack web applications with modern frameworks." },
  { n: "02", title: "Mobile Development", body: "Cross-platform mobile apps for iOS and Android." },
  { n: "03", title: "API Development", body: "RESTful APIs and backend integration services." },
  { n: "04", title: "Database Design", body: "Efficient database architecture and optimization." },
  { n: "05", title: "Cloud Services", body: "Cloud deployment and infrastructure management." },
  { n: "06", title: "Consulting", body: "Technical guidance and digital strategy consulting." },
] as const

export type Brand = {
  name: string
  campaign: string
  result: string
  /** Logo asset path. Optional so a brand without artwork falls back to its name. */
  logo?: string
}

// Annotated rather than `as const` so `logo` stays `string | undefined`. With a const
// assertion every element's `logo` narrows to a non-empty string literal, the
// `brand.logo ? … : …` fallback narrows to `never`, and reading `brand.name` off it
// stops type-checking.
export const brands: readonly Brand[] = [
  // {
  //   name: "Muhammadiyah",
  //   campaign: "Educational Partnership",
  //   result: "Long-term collaboration",
  //   logo: "/brands/muhammadiyah.png",
  // },
  // {
  //   name: "Majelis Pendidikan Muhammadiyah",
  //   campaign: "Educational Development",
  //   result: "Multiple projects",
  //   logo: "/brands/majelis-pendidikan-muhammadiyah.png",
  // },
  // {
  //   name: "Universitas Muhammadiyah Kalimantan Timur",
  //   campaign: "University Partnership",
  //   result: "Academic collaboration",
  //   logo: "/brands/umkt.png",
  // },
  // {
  //   name: "UKS",
  //   campaign: "Health Program",
  //   result: "School health initiative",
  //   logo: "/brands/uks.png",
  // },
  // {
  //   name: "Biro Psikologi",
  //   campaign: "Mental Health Support",
  //   result: "Counseling services",
  //   logo: "/brands/biro-psikologi.png",
  // },
  // {
  //   name: "Dinas Kesehatan",
  //   campaign: "Public Health",
  //   result: "Health department partnership",
  //   logo: "/brands/dinas-kesehatan.png",
  // },
  // {
  //   name: "Tilawati",
  //   campaign: "Educational Program",
  //   result: "Quranic education",
  //   logo: "/brands/tilawati.jpg",
  // },
  // {
  //   name: "KB Bank Syariah",
  //   campaign: "Financial Services",
  //   result: "Banking partnership",
  //   logo: "/brands/kb-bank-syariah.png",
  // },
]

export const caseStudy = {
  brand: "Muhammadiyah Educational Partnership",
  campaign: "Digital Transformation Initiative",
  objective: "Modernize educational systems and improve digital accessibility for students and staff.",
  strategy: [
    "Developed web-based management system",
    "Implemented digital communication tools",
    "Created training programs for staff",
  ],
  deliverables: ["Web application", "Mobile interface", "Training documentation", "Technical support"],
  results: [
    { value: "40%", label: "Efficiency increase" },
    { value: "500+", label: "Active users" },
    { value: "95%", label: "User satisfaction" },
  ],
} as const

export const services = [
  { n: "01", title: "Web Development", body: "Custom web applications built with modern technologies." },
  { n: "02", title: "Mobile Development", body: "Cross-platform mobile apps for iOS and Android." },
  { n: "03", title: "API Development", body: "RESTful APIs and backend integration services." },
  { n: "04", title: "UI/UX Design", body: "User-centered design for digital products." },
  { n: "05", title: "Consulting", body: "Technical guidance and digital strategy consulting." },
  { n: "06", title: "Maintenance", body: "Ongoing support and optimization for existing projects." },
] as const

export const packages = [
  {
    name: "Starter",
    price: "$500",
    note: "Simple web project",
    features: ["Basic website", "Responsive design", "Deployment", "1 month support"],
    featured: false,
  },
  {
    name: "Professional",
    price: "$1,500",
    note: "Full-stack application",
    features: ["Custom development", "Database integration", "API development", "3 months support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "Let's discuss",
    features: ["Complex architecture", "Team collaboration", "Scalable solutions", "Priority support"],
    featured: false,
  },
] as const

export const testimonials = [
  {
    quote:
      "Andy delivered a robust web application that transformed our educational management system. His technical expertise and attention to detail exceeded our expectations.",
    name: "Ahmad Fauzi",
    title: "IT Director",
    company: "Muhammadiyah Education",
  },
  {
    quote:
      "Exceptional problem-solving skills and clear communication throughout the project. The digital solution he built significantly improved our operational efficiency.",
    name: "Siti Rahayu",
    title: "Operations Manager",
    company: "UMKT",
  },
  {
    quote:
      "Professional, reliable, and technically proficient. Andy's work on our health information system has made a real difference in our service delivery.",
    name: "Budi Santoso",
    title: "Head of IT",
    company: "Dinas Kesehatan",
  },
] as const

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stats", href: "#analytics" },
  { label: "Projects", href: "#picks" },
  { label: "Audience", href: "#audience" },
  { label: "Brands", href: "#brands" },
  { label: "Services", href: "#services" },
] as const

// Sections used for navbar scroll-spy on the home page.
// Must match the `id` of every <section> rendered by app/page.tsx, in order.
export const sectionIds = [
  "top",
  "about",
  "analytics",
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
  medianAge: 28,
  gender: [
    { label: "Male", value: 65 },
    { label: "Female", value: 30 },
    { label: "Other / not stated", value: 5 },
  ],  age: [
    { label: "18–24", value: 25 },
    { label: "25–34", value: 45 },
    { label: "35–44", value: 20 },
    { label: "45+", value: 10 },
  ],
  locations: [
    { label: "Indonesia", value: 85 },
    { label: "Singapore", value: 5 },
    { label: "Malaysia", value: 4 },
    { label: "United States", value: 3 },
    { label: "Australia", value: 2 },
    { label: "Other markets", value: 1 },
  ],
  interests: [
    "Web development",
    "Mobile apps",
    "Cloud computing",
    "Open source",
    "DevOps",
    "UI/UX design",
    "Database management",
    "API integration",
  ],
  // Performance averages (30-day), not best-ever outliers.
  averages: [
    { label: "Projects completed", value: "25+" },
    { label: "Client satisfaction", value: "100%" },
    { label: "On-time delivery", value: "95%" },
    { label: "Code quality score", value: "4.8/5" },
  ],
  updated: "Q3 2026",
} as const

/**
 * Fills for the gender split bar, in the same order as `audience.gender`.
 *
 * Kept deliberately away from `bg-surface-3`, which is also the bar's own track
 * background — the third segment was painted in the track colour and disappeared.
 * Defined once here so the home page and the media kit cannot drift apart.
 */
export const genderTones = ["bg-brand", "bg-brand-3", "bg-brand-2"] as const

/* ------------------------------------------------------------------ *
 * Products — the affiliate / recommendation shelf.
 * `affiliate: true` items are monetised through tracked links.
 * ------------------------------------------------------------------ */

export const projectCategories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "API Development",
  "Database",
  "Cloud Services",
] as const

export type ProjectCategory = (typeof projectCategories)[number]

export type Project = {
  name: string
  type: string
  category: Exclude<ProjectCategory, "All">
  description: string
  highlight: string
  rating: number
  tech: string
  year: string
  platform: "web" | "mobile" | "api"
  icon: string
  accent: string
  featured: boolean
}

export const projects: readonly Project[] = [
  {
    name: "Educational Management System",
    type: "Web Application",
    category: "Web Development",
    description:
      "Comprehensive school management system with student tracking, grading, and communication features.",
    highlight: "Full-stack educational platform",
    rating: 4.8,
    tech: "Next.js, TypeScript, PostgreSQL",
    year: "2024",
    platform: "web",
    icon: "graduation-cap",
    accent: "brand",
    featured: true,
  },
  {
    name: "Health Information Portal",
    type: "Full-stack Application",
    category: "Web Development",
    description:
      "Health department portal for patient management, appointment scheduling, and medical records.",
    highlight: "Healthcare management solution",
    rating: 4.6,
    tech: "React, Node.js, MongoDB",
    year: "2024",
    platform: "web",
    icon: "heart-pulse",
    accent: "brand-2",
    featured: true,
  },
  {
    name: "Mobile Learning App",
    type: "Cross-platform Mobile",
    category: "Mobile Apps",
    description:
      "Educational mobile application for Quranic learning with progress tracking and interactive content.",
    highlight: "Mobile-first learning experience",
    rating: 4.7,
    tech: "React Native, Firebase",
    year: "2023",
    platform: "mobile",
    icon: "smartphone",
    accent: "info",
    featured: true,
  },
  {
    name: "API Gateway Service",
    type: "Backend Service",
    category: "API Development",
    description:
      "Scalable API gateway with authentication, rate limiting, and monitoring for microservices architecture.",
    highlight: "Enterprise API infrastructure",
    rating: 4.5,
    tech: "Node.js, Express, Redis",
    year: "2024",
    platform: "api",
    icon: "server",
    accent: "brand-3",
    featured: false,
  },
  {
    name: "Database Optimization Tool",
    type: "Dev Tool",
    category: "Database",
    description:
      "Performance analysis and optimization tool for PostgreSQL databases with automated suggestions.",
    highlight: "Database performance solution",
    rating: 4.4,
    tech: "Python, PostgreSQL, Docker",
    year: "2023",
    platform: "web",
    icon: "database",
    accent: "warn",
    featured: false,
  },
  {
    name: "Cloud Deployment Dashboard",
    type: "DevOps Tool",
    category: "Cloud Services",
    description:
      "Dashboard for managing cloud deployments across multiple providers with CI/CD integration.",
    highlight: "Multi-cloud management",
    rating: 4.3,
    tech: "AWS, Terraform, Kubernetes",
    year: "2024",
    platform: "web",
    icon: "cloud",
    accent: "ok",
    featured: false,
  },
]

/* ------------------------------------------------------------------ *
 * Process, FAQ, deliverables
 * ------------------------------------------------------------------ */

export const process = [
  {
    n: "01",
    title: "Discovery & planning",
    body: "We discuss your project requirements, goals, and timeline. I provide a technical proposal with architecture recommendations and project scope.",
    meta: "Day 1–2",
  },
  {
    n: "02",
    title: "Design & architecture",
    body: "I create detailed technical specifications, database schemas, and UI/UX mockups. You review and approve before development begins.",
    meta: "Day 3–5",
  },
  {
    n: "03",
    title: "Development",
    body: "Core development begins with regular updates and milestone reviews. I build features incrementally with continuous testing and integration.",
    meta: "Day 6–20",
  },
  {
    n: "04",
    title: "Testing & refinement",
    body: "Comprehensive testing including functionality, performance, and security. Revisions based on your feedback to ensure everything meets requirements.",
    meta: "Day 21–25",
  },
  {
    n: "05",
    title: "Deployment & support",
    body: "Final deployment to production with monitoring setup. Documentation delivery and post-launch support to ensure smooth operation.",
    meta: "Day 26+",
  },
] as const

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "Projects start at $500 for simple websites and scale based on complexity, features, and timeline. Every quote is custom-built based on your specific requirements — share your project details and you'll get a detailed estimate within 1–2 business days.",
  },
  {
    q: "What do you need from us to start?",
    a: "A clear project brief, your goals and requirements, any design assets or brand guidelines, and target timeline. If you have technical preferences or existing systems to integrate, share those too. That's it — I handle the technical planning and implementation.",
  },
  {
    q: "How long does a project take?",
    a: "Simple websites typically take 2–3 weeks from start to launch. Full-stack applications with custom features usually take 4–8 weeks depending on complexity. Planning 2–4 weeks ahead ensures your timeline is realistic and achievable.",
  },
  {
    q: "Do you offer ongoing maintenance and support?",
    a: "Yes. I offer maintenance packages that include updates, security patches, bug fixes, and feature enhancements. Support can be arranged on a monthly retainer or per-incident basis depending on your needs.",
  },
  {
    q: "Can you work with existing codebases?",
    a: "Absolutely. I regularly work with existing projects to add features, fix issues, or improve performance. I'll analyze your current setup and provide recommendations for the best approach.",
  },
  {
    q: "How do you ensure code quality and performance?",
    a: "I follow best practices for code organization, testing, and optimization. Every project includes performance testing, code reviews, and documentation to ensure maintainability and scalability.",
  },
  {
    q: "Do you offer mobile app development?",
    a: "Yes. I develop cross-platform mobile applications using modern frameworks that work on both iOS and Android. This approach reduces development time and cost while maintaining native-like performance.",
  },
  {
    q: "Who owns the code after project completion?",
    a: "You own all the code and deliverables upon project completion and final payment. I provide full source code, documentation, and deployment instructions. You have complete control over your project.",
  },
  {
    q: "What technologies do you work with?",
    a: "I specialize in modern web technologies including React, Next.js, Node.js, TypeScript, and various databases. I'm also experienced with cloud services like AWS, Vercel, and digital infrastructure management.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Frequently. I enjoy working with startups and small businesses that need digital solutions but may not have in-house technical teams. Clear requirements and realistic timelines lead to successful projects regardless of company size.",
  },
] as const

export const deliverables = [
  "Source code with documentation",
  "Deployment instructions",
  "API documentation",
  "Database schema documentation",
  "User manual and guides",
  "Testing and QA reports",
  "Performance optimization",
  "Post-launch support",
] as const

export const serviceTiers = [
  {
    name: "Development only",
    note: "Code deliverables",
    includes: "No deployment or maintenance",
  },
  {
    name: "Full service",
    note: "Development + deployment",
    includes: "End-to-end solution delivery",
  },
  {
    name: "Retainer",
    note: "Ongoing partnership",
    includes: "Continuous development and support",
  },
] as const

export const faqPageUrl = `${siteUrl}/#faq`
export const mediaKitUrl = `${siteUrl}/media-kit`

// Flat brand list reused by the media kit page.
export const brandNames = brands
