# creator-andypratama

Portfolio and website for **Andy Pratama** — a software engineer and digital creator.
Built with Next.js App Router, TypeScript and Tailwind CSS v4.

> **All figures in this repository are representative data.** Project counts, technical
> skills, client collaborations, and service pricing exist to demonstrate the
> layout. Replace them with your real data before using this site for
> commercial purposes — see [Content](#content) for where that data lives.

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server runs at <http://localhost:3000>.

### Scripts

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `pnpm dev`        | Start the dev server                      |
| `pnpm build`      | Production build                          |
| `pnpm start`      | Serve the production build                |
| `pnpm typecheck`  | `tsc --noEmit`                            |
| `pnpm lint`       | ESLint via `eslint-config-next`           |
| `pnpm test`       | Vitest unit tests                         |

## Content

Every piece of copy, figure and link is driven from **`lib/creator-data.ts`**. To make the
site your own, that one file plus a few image swaps in `public/` is the whole job.

- `creator` — name, role, bio, contact details, social handles
- `platformStats` — technical stats per platform. These values feed both the rendered
  cards and the `interactionStatistic` structured data, so the two can never disagree
- `brands`, `caseStudy`, `testimonials` — client collaborations and social proof
- `projects` — the project showcase. Featured items highlight key work
- `packages`, `services`, `faqs` — service offerings and FAQ content

Social URLs are **derived** in `lib/seo.ts` by combining the platform base with the handle
in `creator.socials`. Editing a handle there updates the visible links, the `sameAs`
structured data and `llms.txt` together.

## SEO

The SEO surface is centralised in `lib/seo.ts` and enforced by tests in `lib/seo.test.ts`.

- **Metadata** — `pageMetadata()` gives every route a title, description, self-referencing
  canonical, and Open Graph + Twitter cards at 1200×630. Per-page metadata is built with
  it rather than hand-written, so the cards cannot drift.
- **Structured data** — `components/site/json-ld.tsx` emits JSON-LD per route: `Person`,
  `ProfilePage`, `WebSite`, `ItemList`, `FAQPage`, `OfferCatalog`, `Audience`,
  `WebPage` and `BreadcrumbList`, joined by `@id` references.
- **Crawlability** — `app/robots.ts` (including explicit allow rules for AI crawlers),
  `app/sitemap.ts`, `app/manifest.ts`, and a `llms.txt` / `llms-full.txt` pair for
  LLM ingestion.
- **Images** — served as AVIF/WebP through `next/image`, with `sizes` and `priority` on the
  LCP image of each page.

Three deliberate constraints are worth knowing before you edit the schema:

1. The project showcase is **not** marked up with `offers` or `aggregateRating`. Andy
   showcases these projects; they represent technical work and experience. Asserting commercial
   terms the page does not provide is a structured-data quality violation.
2. `FAQPage` markup is kept even though Google retired FAQ rich results on 7 May 2026 —
   it is still the format AI answer engines lift question/answer pairs from.
3. `llms.txt` is shipped as low-cost optionality. Google states it ignores the file, and
   no AI provider has confirmed consuming it, so it is not a ranking lever.

## Before you launch

- [ ] Replace every placeholder figure in `lib/creator-data.ts` with real, substantiated data
- [ ] Confirm the social handles in `creator.socials` resolve to your real profiles
- [ ] Have `app/privacy/page.tsx` and `app/terms/page.tsx` reviewed by a lawyer — both are
      drafts, not legal advice
- [ ] Point `siteUrl` in `lib/creator-data.ts` at the real domain. Canonical URLs, the
      sitemap, `robots.txt` and `llms.txt` are all derived from it
- [ ] Add Search Console verification metadata once you have the token
- [ ] Wire the contact form to a real transport. `app/api/contact/route.ts` currently only
      logs submissions, and its rate limit is per-instance — move it to a shared store
      before launch

## Deploying to Vercel

The repo is Vercel-ready with no environment variables required.

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository. The framework is detected as
   Next.js; `vercel.json` pins the install and build commands.
3. Deploy. Vercel Analytics is already wired up and only renders in production.

Prefer the CLI?

```bash
npm i -g vercel
vercel link
vercel --prod
```

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Base UI ·
next-themes · Vercel Analytics · Vitest · ESLint
