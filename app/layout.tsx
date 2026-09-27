import { Analytics } from "@vercel/analytics/next"
import { ScrollProgress } from "@/components/site/scroll-progress"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { creator, siteUrl } from "@/lib/creator-data"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

const title = `${creator.name} — ${creator.role}`
const description = creator.positioning

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${creator.name}`,
  },
  description,
  applicationName: title,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: creator.name, url: siteUrl }],
  creator: creator.name,
  publisher: creator.name,
  category: "software engineering portfolio",
  keywords: [
    "software engineer",
    "web developer",
    "full-stack developer",
    "mobile developer",
    "API development",
    "technical consulting",
    "software architecture",
    "digital solutions",
    "portfolio",
    "Samarinda developer",
    creator.name,
    ...creator.niche,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: title,
    locale: "en_US",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.985 0.003 265)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.16 0.012 275)" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Scroll-reveal elements start at opacity 0 — force them visible without JS. */}
        <noscript>
          <style>{`[data-reveal="pending"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <a
            href="#main"
            className="sr-only z-[70] focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--primary-foreground)]"
          >
            Skip to content
          </a>
          {children}
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
