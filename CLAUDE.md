# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires **Node.js 18+**.

```bash
npm run dev       # Dev server at http://localhost:5000 (not 3000)
npm run build     # Production build
npm start         # Production server at port 5000
npm run lint      # ESLint
npm run indexnow  # Submit all public URLs to IndexNow (Bing) — run after each prod deploy
```

Content import scripts write to Sanity, so they need **`SANITY_API_TOKEN`** (a Sanity token with Editor permissions) in `.env.local` in addition to `NEXT_PUBLIC_SANITY_PROJECT_ID`. They load env via `dotenv`.
```bash
node scripts/import-all.mjs          # Bulk import guides, experiences, destinations
node scripts/import-tours.mjs        # Import tours
node scripts/import-images.mjs       # Upload and link images
```

Many scripts have both a `.mjs` and an older `.js` twin (`import-all.js`, `import-tours.js`, `import-content.js`, …) — the `.mjs` versions are current. Read-only scripts (e.g. `verify-prices.mjs`, `submit-indexnow.mjs`) need no token.

`scripts/` also contains many one-off migration/patch/cleanup scripts accumulated over time (e.g. `patch-tour-prices.mjs`, `remove-duplicate-tours.mjs`, `expand-itinerary.mjs`). These were written for a specific past fix — check what a script does before rerunning it, don't assume it's idempotent or still needed.

There is no test suite in this project.

The repo root also has several stale planning/fix notes from past sessions (`REMOVED_EMPTY_PAGES.md`, `DEPLOYMENT_FIX.md`, `NEXT_STEPS.md`, `SANITY_SETUP_INSTRUCTIONS.md`, `SANITY_COMPLETE_SETUP_GUIDE.md`, `replit.md`, `from_erachidia.md`, `tour_from_agadir.md`, `tour_from_cansablanca.md`, `sanity_txt.md`). They describe one-off past states (e.g. `REMOVED_EMPTY_PAGES.md` claims Gallery/Stories/Music are hidden from nav and that navigation is hardcoded in `Navbar.jsx` — both are no longer true; navigation is now CMS-driven via `siteSettings.navigation`). Treat these as historical, not current documentation — verify against the actual code instead of trusting them.

## Architecture

**Stack**: Next.js 14 App Router (JSX) + Sanity CMS + Tailwind CSS + Resend (email)

App Router pages and components are written in JSX. TypeScript is used only for the embedded Sanity Studio (`src/sanity/`, `sanity.config.ts`, `sanity.cli.ts`).

**Path alias**: `@/` resolves to `src/` (configured in both `tsconfig.json` and `jsconfig.json`). Use `@/lib/sanity`, `@/components/Navbar`, etc. throughout page and component code.

### Data Flow

Most page content comes from Sanity CMS. **Exception: `src/data/` holds hardcoded datasets that are NOT in Sanity** — edit these files directly:
- `blogPosts.js` — the entire blog (`/blog` and `/blog/[slug]`). Exports `blogPosts`, `categories`, `getBlogPost(slug)`, `getRelatedPosts(slug, category)`.
- `testimonials.js` — homepage `<TestimonialsSection>` reviews; also the source for the Review JSON-LD (see SEO Pattern). Exports `testimonials` and `TRIPADVISOR_URL`.

**`/stories` is a separate, older, Sanity-backed page** (schema `story`, `storiesListQuery`) that duplicates the blog concept — it predates `/blog` and was not removed. The two are unrelated: `/blog` is the static one to edit for new posts, `/stories` reads from Sanity's `story` documents via Studio. Don't assume a "blog post" request means editing both, or that they share data.

The pattern used for all Sanity-backed pages:

1. Page calls `client.fetch(query)` from `src/lib/sanity.js`
2. Queries live in `src/lib/queries.js` as named GROQ exports
3. Every query also filters drafts with `!(_id in path("drafts.**"))` as a belt-and-suspenders measure, but the primary draft filter is `perspective: 'published'` set on the client itself — content must be **published** in Sanity Studio to appear on the site

The Sanity client in `src/lib/sanity.js` degrades gracefully when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset (returns `null` instead of throwing). Project ID is hardcoded as fallback: `2nicu1vl`. `src/lib/client.js` is a thin legacy re-export of the same client — prefer importing directly from `src/lib/sanity.js`.

### Two Sanity Clients

There are two separate Sanity client files with different purposes:
- `src/lib/sanity.js` — used by all App Router pages for data fetching (`useCdn: false`, server-side)
- `src/sanity/lib/client.ts` — used exclusively by the embedded Sanity Studio (`useCdn: true`)

Do not import `src/sanity/lib/client.ts` from page components — it is for the Studio only.

### Two Parallel Schema Systems

There are two separate Sanity schema locations that must be kept in sync:
- `sanity-schemas/` — JavaScript schemas used by the import scripts in `scripts/`
- `src/sanity/schemaTypes/` — TypeScript schemas used by the embedded Sanity Studio at `/studio`

### Client/Server Component Split for Filtering

The tours listing (`/tours`) and blog listing (`/blog`) pages use a deliberate split:

- The **page component** (server) fetches all data from Sanity / `blogPosts.js`, then renders…
- A **`'use client'` child component** that owns interactive filter state:
  - `FilterableTours` — filters by `departureCity`, sorts by price
  - `FilterableBlog` — filters by category using the `categories` array exported from `src/data/blogPosts.js`

Never fetch Sanity data inside these client components — they must receive pre-fetched data as props.

### Blog Data Helpers

`src/data/blogPosts.js` exports: `blogPosts` (array), `categories` (unique category list), `getBlogPost(slug)`, `getRelatedPosts(slug, category)`. The blog detail page (`src/app/blog/[slug]/page.jsx`) also contains a hardcoded `resourcesByCategory` map of outbound authority links per category. **If you add a new category to `blogPosts.js`, also add a matching entry in `resourcesByCategory`** in the slug page.

### Auto-generated SEO Files

`src/app/sitemap.js` generates `/sitemap.xml` dynamically (fetches tours and stories from Sanity). `src/app/robots.js` generates `/robots.txt`. Neither are static files — they are Next.js route handlers.

### Embedded Sanity Studio

Sanity Studio is served at `/studio` via `src/app/studio/[[...tool]]/`. Configuration is in `sanity.config.ts`, which reads from `src/sanity/env.ts` and `src/sanity/schemaTypes/`. The **Vision** plugin is enabled — use it at `/studio/vision` to test GROQ queries against live data.

### Root Layout — Global Components

`src/app/layout.jsx` fetches `siteSettings` and `contact` from Sanity on every request and injects them into global components. The following are always mounted at the app level:
- `<Navbar navigation={settings?.navigation} />` — transparent over hero, white on scroll
- `<Footer contactInfo={contact} />`
- `<WhatsAppButton number={contact?.whatsapp} />` — floating, appears after 300px scroll; loaded with `dynamic(..., { ssr: false })`
- `<BackToTop />` — appears after 500px scroll; loaded with `dynamic(..., { ssr: false })`
- `<CookieConsent />` — slides up once, persisted in localStorage; loaded with `dynamic(..., { ssr: false })`
- `<Analytics />` from `@vercel/analytics/next` — Vercel Analytics, no configuration needed

`WhatsAppButton`, `BackToTop`, and `CookieConsent` are client-only (they use `window`/`localStorage`) and must keep `ssr: false` to avoid hydration mismatches. Follow the same pattern for any new component that reads browser APIs at mount.

### Tour Routes

Tours have two route patterns:
- `/tours/[slug]` — individual tour detail page (dynamic, from Sanity slug)
- `/tours/[city]` — static city pages (`/tours/agadir`, `/tours/marrakech`, `/tours/fes`, `/tours/casablanca`, `/tours/errachidia`) using `toursByCityQuery` with a hardcoded `city` param

**Tour pricing**: The `price` field is legacy — use the four room-type fields instead: `priceSingle`, `priceDouble`, `priceTriple`, `priceQuad` (all EUR, `€`, per person). Tour cards and `FilterableTours` sort by `priceDouble`. The detail page shows all four.

There is also a static `/privacy` page (`src/app/privacy/page.jsx`) and a custom 404 at `src/app/not-found.jsx`.

The tour detail page (`src/app/tours/[slug]/page.jsx`) uses a two-step fetch: first fetches the tour, then fetches related tours by `departureCity` using `relatedToursQuery`. The `getTour()` function returns `{ tour, relatedTours }`.

### SEO Pattern

Every page exports `generateMetadata()` that calls `generateMetadata` imported from `src/lib/seo.js` (pages often alias it as `generateSEOMetadata` at import). That utility builds full Open Graph, Twitter Card, and canonical URL metadata. Dynamic pages also inject JSON-LD structured data via a `<Script>` tag — available schema generators: `generateTourSchema`, `generateArticleSchema`, `generateBreadcrumbSchema`, `generateBlogPostSchema`, `generateFAQSchema`, `generateReviewSchema`, `generateLocalBusinessSchema` (contact page). The root layout injects `generateOrganizationSchema()` sitewide.

`generateOrganizationSchema()` (injected sitewide from the root layout) embeds an `AggregateRating` with **hardcoded** `ratingValue: '5.0'` / `reviewCount: '500'` (in `src/lib/seo.js`, ~line 108) plus a `review` array from `generateReviewSchema()`, which is built from `src/data/testimonials.js`. Those numbers are edited in code, not a CMS — keep them believable relative to the testimonials list, which `TestimonialsSection.jsx` also renders visibly.

### IndexNow (Bing)

`public/41b64e48b02d4819a18d8f97835bbf52.txt` is the IndexNow key file, served at `https://visitsaharadesert.com/41b64e48b02d4819a18d8f97835bbf52.txt` — do not rename or delete it. `scripts/submit-indexnow.mjs` (`npm run indexnow`) collects every public URL (static routes + `blogPosts` + Sanity tours/stories, mirroring `sitemap.js`) and POSTs them to `https://api.indexnow.org/indexnow`. Pass specific paths to submit just those (`node scripts/submit-indexnow.mjs /blog/new-post`), or `--dry-run` to preview. Run it after each production deploy since tour/blog pages are statically rendered.

### Image URLs

There are two `urlFor` implementations — use the correct one for the context:

- **Page components** → import from `src/lib/sanity.js`. This version handles a missing `projectId` gracefully (returns `{ url: () => '' }` instead of throwing).
- **Sanity Studio** → `src/sanity/lib/image.ts` is used internally by the Studio; do not import it from page components.

```js
import { urlFor } from '@/lib/sanity'

urlFor(image).width(800).height(600).url()
```

Always call `.url()` at the end — the intermediate methods return a builder, not a string.

### Logo

The logo is a static raster file, `public/logo.png`, referenced directly via `<img src="/logo.png">` in both `Navbar.jsx` and `Footer.jsx` (and mirrored as the default export of `src/components/Logo.jsx`). It replaced an older SVG wordmark+icon combo. `Logo.jsx` still exports `LogoIcon` and `LogoWordmark` (the old inline SVG dune/sun icon and text logotype, with a light/dark `variant` prop) but neither is imported anywhere anymore — they're dead code kept in case the SVG treatment is revived. Don't reintroduce variant-switching logic for the logo; there's nothing to switch anymore.

### Contact Form / Email

`src/app/api/contact/route.js` is the only API route. It uses the **Resend** SDK to send booking inquiries. Destination address defaults to `contact@visitsaharadesert.com` but is overridden by `CONTACT_TO_EMAIL`.

The newsletter signup components (`NewsletterStrip.jsx`, `NewsletterFooterRow.jsx`) are **not wired to anything** — they fake success with a `setTimeout` and discard the email. There is no newsletter API route or email-list integration; add one before relying on those forms.

### Styling

Custom Tailwind color palette — use `sand-*` and `desert-*` tokens (defined in `tailwind.config.js`) rather than generic gray/amber when working on UI. Font family: `font-serif` for headings (Georgia stack), `font-sans` for body (system-ui stack). Note: Google Fonts (Inter + Lora) are loaded in the root layout via `next/font/google` and exposed as CSS variables `--font-sans` / `--font-serif`, but the Tailwind `fontFamily` config uses static stacks rather than those CSS variables — use `var(--font-sans)` / `var(--font-serif)` in custom CSS if you need the Google Font.

Custom utilities in `src/styles/globals.css`: `.text-shadow`, `.smooth-transition`, `.animate-slide-up`.

## Deployment

Hosted on Vercel. The Vercel project name is **`sahara-desert`** — not `sahara-desert-main` (the local directory name). Use this when referencing the project via the Vercel CLI or dashboard. Production domain: `visitsaharadesert.com`. Build region: `iad1`.

## Environment Variables

Required for Sanity:
```
NEXT_PUBLIC_SANITY_PROJECT_ID       # fallback hardcoded to 2nicu1vl
NEXT_PUBLIC_SANITY_DATASET          # defaults to "production"
NEXT_PUBLIC_SANITY_API_VERSION      # defaults to "2024-11-21"
```

Required for contact form emails:
```
RESEND_API_KEY
CONTACT_TO_EMAIL                    # optional override, defaults to contact@visitsaharadesert.com
CONTACT_FROM_EMAIL                  # optional override
```

Optional features:
```
NEXT_PUBLIC_WHATSAPP_NUMBER         # WhatsApp number for floating button + tour sidebar (fallback: 212600000000)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY     # enables embedded map on /contact page
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GOOGLE_VERIFICATION
NEXT_PUBLIC_BING_VERIFICATION
NEXT_PUBLIC_YANDEX_VERIFICATION
NEXT_PUBLIC_FACEBOOK_URL
NEXT_PUBLIC_INSTAGRAM_URL
NEXT_PUBLIC_TWITTER_URL
```
