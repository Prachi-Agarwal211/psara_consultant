# PSARA Consultant — Agent Guidance

## Tech Stack
- **Framework:** Next.js 16.2.11 (App Router)
- **Styling:** Tailwind CSS v4 + Custom CSS tokens (`styles/tokens.css`)
- **Animation:** GSAP 3.15 (ScrollTrigger, SplitText) + Lenis (smooth scroll)
- **Testing:** Cypress 15 + cypress-axe (a11y)
- **Schema:** JSON-LD via `@graph` in layout.tsx + `JsonLd.tsx` component
- **SEO:** Template-based content generator (`lib/seo-content-generator.ts`)

## Key Architecture

### Routes
- `/` — Homepage (client component with GSAP animations)
- `/states/[slug]` — State-specific PSARA guide (server component)
- `/city/[slug]` — City-specific PSARA guide (server component)
- `/services/[slug]` — Service detail pages
- `/[guide]` — Educational guide pages

### Component Structure (Note: Mixed!)
- **`app/components/`** — Page-specific components (sections, UI, layout, providers, hooks)
- **`components/`** — Shared components (ContactForm, JsonLd, PageShell, SiteChrome, WhatsAppForm)

### State Data
- `data/states.ts` — 36 states/UTs with unique: authority, timeline, fee structure, training notes, forms, documents, special rules
- `data/cities.ts` — 600+ cities with: tier, economyTags, stateName
- `data/services.ts` — Service definitions
- `data/faq.ts` — 70+ FAQ entries with categories

## Common Tasks

### SEO Content
- `lib/seo-content-generator.ts` generates deterministic content from seeded random picks
- `generateStateContent(s)` and `generateCityContent(c, s)` produce full content objects
- Meta descriptions should include unique data per location (authority, timeline, sectors)

### Schema Updates
- Global schema in `app/layout.tsx` `@graph` array
- Page-specific schema via `components/JsonLd.tsx`
- Per-page breadcrumb via `@graph` BreadcrumbList

## Important Notes
- Homepage is `'use client'` — keep GSAP animations there, move new pages to server components
- Lenis + GSAP ScrollTrigger can conflict — test after any scroll-related changes
- Meta descriptions MUST be unique per location — never use pure templates
