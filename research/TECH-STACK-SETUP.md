# PSARA Consultant India — Tech Stack & Setup Research

> **Goal:** Production-ready Next.js 16 + React 19 + Tailwind CSS v4 + GSAP setup matching Silbar Security architecture

---

## 1. Core Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 16.x (App Router) | SSG/ISR, dynamic routes, API routes |
| **UI Library** | React | 19.x | Component model, server components |
| **Language** | TypeScript | 5.x / 6.x | Type safety, strict mode |
| **Styling** | Tailwind CSS | v4 | Utility-first CSS, CSS-first config |
| **Animation** | GSAP | 3.15+ | ScrollTrigger, SplitText, timeline animations |
| **GSAP React** | @gsap/react | latest | useGSAP hook, Strict Mode safe |
| **Icons** | lucide-react | 1.x | Consistent SVG icons |
| **Fonts** | next/font | built-in | Self-hosted Google Fonts (Space Grotesk + Manrope) |
| **Hosting** | Vercel | — | Edge network, Mumbai region (bom1) |
| **Analytics** | Google Analytics + GTM | — | Consent-gated |

---

## 2. Why This Stack for PSARA

- **SSG + ISR:** All 320+ pages pre-rendered statically at build time. City/state pages use `generateStaticParams()`. Blog/updates use ISR with `revalidate`.
- **Programmatic SEO:** Dynamic routes for `/states/[state]`, `/city/[slug]`, `/services/[slug]` — one template, thousands of unique pages.
- **Silbar Compatibility:** Exact same stack the client already approved for Silbar Security. Reuses patterns, reduces risk.
- **GSAP Animations:** ScrollTrigger for state/city page reveals, SplitText for hero headings, Counter for stats, MagneticButton for CTAs.
- **Tailwind v4:** CSS-first configuration (`@theme`), no JS config file, 5x faster builds with Oxide engine.

---

## 3. Project Setup (Step by Step)

### 3.1 Initial Scaffold

```bash
npx create-next-app@latest psara-consultant --typescript --app --tailwind --eslint
cd psara-consultant
```

### 3.2 Install Dependencies

```bash
# Core
npm install gsap @gsap/react
npm install lucide-react

# Dev
npm install -D @tailwindcss/postcss postcss
```

### 3.3 Configure PostCSS (`postcss.config.mjs`)

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### 3.4 Configure Tailwind v4 (`src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Manrope", sans-serif;

  --color-brand-dark: #0a1628;
  --color-brand-navy: #0f1b3d;
  --color-brand-gold: #f5b041;
  --color-brand-light: #f8f9fa;
  --color-brand-accent: #1a3a5c;

  --color-surface-dark: #0d1b2a;
  --color-surface-card: #1b2838;
  --color-surface-elevated: #243447;

  --animate-reveal: reveal 0.7s ease-out;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 3.5 Fonts Setup (`src/app/layout.tsx`)

```tsx
import { Space_Grotesk, Manrope } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
```

### 3.6 GSAP Setup (`src/lib/gsap.ts`)

```ts
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

---

## 4. Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, SEO, JSON-LD, nav, footer)
│   ├── page.tsx                # Home (server component)
│   ├── globals.css             # Tailwind v4 + custom CSS
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts              # Programmatic sitemap
│   ├── robots.ts
│   │
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── services/page.tsx       # Services hub
│   ├── services/[slug]/page.tsx # Dynamic service pages (9+)
│   ├── faq/page.tsx
│   │
│   ├── states/page.tsx          # All states hub
│   ├── states/[state]/page.tsx  # State-specific PSARA pages (28)
│   ├── cities/page.tsx          # All cities hub
│   ├── cities/[slug]/page.tsx   # City-specific pages (200+)
│   │
│   ├── blog/page.tsx            # Blog listing
│   ├── blog/[slug]/page.tsx     # Blog posts
│   │
│   ├── psara-license/page.tsx
│   ├── psara-process/page.tsx
│   ├── psara-eligibility/page.tsx
│   ├── psara-documents/page.tsx
│   ├── psara-fees/page.tsx
│   ├── psara-renewal/page.tsx
│   ├── psara-training/page.tsx
│   ├── multi-state-license/page.tsx
│   ├── rejection-reasons/page.tsx
│   ├── police-verification/page.tsx
│   ├── business-plan/page.tsx
│   ├── company-registration/page.tsx
│   ├── business-structure/page.tsx
│   ├── start-security-agency/page.tsx
│   ├── psara-cost-guide/page.tsx
│   ├── psara-act-2005/page.tsx
│   ├── security-guard-training/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   └── disclaimer/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── NavigationWrapper.tsx
│   │   ├── PageHero.tsx
│   │   ├── StickyCta.tsx
│   │   └── WhatsAppWidget.tsx
│   ├── sections/
│   │   ├── ServicesGrid.tsx
│   │   ├── StatesGrid.tsx
│   │   ├── ScrollExperience.tsx
│   │   ├── QueryForm.tsx
│   │   ├── PageLeadSection.tsx
│   │   └── LocationRichContent.tsx
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── GradientText.tsx
│   │   └── BlogCard.tsx
│   ├── animations/
│   │   ├── ScrollReveal.tsx
│   │   ├── SplitTextReveal.tsx
│   │   ├── Counter.tsx
│   │   └── ElasticCounter.tsx
│   └── seo/
│       └── DynamicBreadcrumbSchema.tsx
│
├── data/
│   ├── psara-states.ts         # 28 states with full data
│   ├── psara-cities.ts         # 200+ cities
│   ├── services.ts             # 9+ services
│   ├── faq.ts                  # 55-100 FAQs
│   ├── blog.ts                 # Blog posts data
│   └── reviews.ts             # Testimonials
│
├── lib/
│   ├── config.ts               # Contact info, offices, WhatsApp
│   ├── metadata.ts             # OG meta helpers
│   ├── gsap.ts                 # GSAP registration
│   ├── seo-content-generator.ts # Programmatic SEO content
│   ├── whatsapp.ts
│   └── site-stats.ts
│
└── styles/
    ├── tokens.css
    ├── animations.css
    └── components/
```

---

## 5. Key Implementation Patterns

### 5.1 Dynamic State Pages

```tsx
// app/states/[state]/page.tsx
export async function generateStaticParams() {
  return PSARA_STATES.map((s) => ({ state: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const state = PSARA_STATES.find((s) => s.id === params.state);
  return {
    title: `PSARA License in ${state.name} — ${state.capital}`,
    description: `...`,
  };
}
```

### 5.2 Programmatic SEO Content Generation

- Use deterministic hashing (`stringToHash`) for unique per-city/state content
- Each page gets unique: introduction, market overview, challenges, services, FAQs
- Min 800 words per page
- Inject `<p style="display:none">` GEO answer blocks for AI search engines

### 5.3 JSON-LD Schema

Every page needs:
- `Organization` (site-wide)
- `LocalBusiness` (city/state pages)
- `FAQPage` (FAQ page)
- `BreadcrumbList` (all pages)
- `Service` (service pages)

### 5.4 WhatsApp Integration

All forms submit via `wa.me` links — no backend needed:
```
https://wa.me/919983169555?text=Hi%20PSARA%20Consultant%20India...
```

---

## 6. Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| TTFB (CDN) | <100ms |
| LCP | <1.5s |
| CLS | <0.05 |
| INP | <100ms |
| Build time (320 pages) | <5 min |

---

## 7. Deployment (Vercel)

- **Region:** Mumbai (bom1) — closest to Indian audience
- **Framework preset:** Next.js
- **Environment variables:** Contact info, API keys, GA ID
- **Security headers:** HSTS, CSP, X-Frame-Options, Permissions-Policy
- **Custom domain:** New domain (TBD — not psaraconsultantindia.com)

---

## 8. Key Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [GSAP + React Guide](https://gsapify.com/gsap-react/)
- [@gsap/react Docs](https://www.npmjs.com/package/@gsap/react)
- [Programmatic SEO in Next.js](https://indxel.com/blog/programmatic-seo-nextjs)
- [Silbar Security Reference] (local: silabar security/)
