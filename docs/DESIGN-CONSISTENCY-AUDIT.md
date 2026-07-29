# Design Consistency Audit: PSARA Consultant vs Silbar Security

> **Date:** July 2026  
> **Scope:** Mobile responsiveness, spacing, typography, component behavior  
> **Method:** Head-to-head comparison of CSS tokens, component styles, and responsive patterns

---

## Table of Contents
1. [Design Tokens & Variables](#1-design-tokens--variables)
2. [Responsive Breakpoints & Mobile Approach](#2-responsive-breakpoints--mobile-approach)
3. [Typography System](#3-typography-system)
4. [Spacing & Layout Rhythm](#4-spacing--layout-rhythm)
5. [Button Systems](#5-button-systems)
6. [Card Component Patterns](#6-card-component-patterns)
7. [State/City SEO Page Patterns](#7-statecity-seo-page-patterns)
8. [Mobile-Specific Behavior](#8-mobile-specific-behavior)
9. [Animation & Motion Systems](#9-animation--motion-systems)
10. [Critical Gaps & Recommendations](#10-critical-gaps--recommendations)

---

## 1. Design Tokens & Variables

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Token method** | CSS custom properties (`:root`) | Tailwind `@theme` + CSS custom properties | ✅ Both |
| **Dark background** | `--obsidian: #0a1628` | `--color-midnight: #0B0E14` | ✅ Near-identical |
| **Light background** | `--warm-cream: #f2e8d5` | `--color-paper: #FAF8F4` | ⚠️ Different warmth |
| **Primary accent** | `--gold: #e0b84a` (sand gold) | `--color-gold: #BF953F` (more bronze) | ⚠️ Different gold tones |
| **Secondary accent** | — | `--color-cherry: #8C1F32` (unique to Silbar) | ❌ PSARA has no cherry |
| **Section backgrounds** | 15+ surface tokens (`warm-dark`, `obsidian-warm`, `gold-bg`) | 2 main (`--color-midnight`, `--color-paper`) | ✅ PSARA more flexible |
| **Border colors** | 5 line variants (`line`, `line-gold`, `line-amber`, etc.) | Minimal (rgba-based) | ✅ PSARA richer |
| **Easing tokens** | 8 GSAP easing variables | 7 CSS easing variables | ✅ Both |

### Key Finding
PSARA has a more complex token system (5 accent colors, 10+ surface colors, 5 border lines) vs Silbar's leaner 2-accent system (cherry + gold). PSARA's token oversupply creates consistency risk — many tokens may go unused.

---

## 2. Responsive Breakpoints & Mobile Approach

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Standard breakpoints** | 480 / 768 / 1024 / 1280 | 480 / 768 / 1024 / 1280 | ✅ Identical base |
| **Extended breakpoints** | — | 1440 / 1728 / 1920 (Mac-friendly) | ❌ PSARA lacks |
| **Layout max-width** | `--page-max: 74rem` (1184px) | `--shell-max: 1400px` → 1760px (ultrawide) | ❌ PSARA 15% narrower |
| **Gutter/padding** | `clamp(1.1rem, 4vw, 3rem)` | `clamp(1.25rem, 4vw, 4rem)` | ⚠️ PSARA tighter on mobile |
| **Mobile first** | ✅ Fluid clamp sizing | ✅ Fluid clamp sizing + media queries | ✅ Both |
| **GSAP compatibility** | Removed `content-visibility: auto` for ScrollTrigger | Uses `content-visibility: auto` on SEO sections | ⚠️ Different perf strategies |
| **Horizontal scroll guard** | `overflow-x: hidden` on body | `overflow-x: hidden` on html, body | ✅ Both |

### Key Finding
Silbar's Mac-friendly extended breakpoints (1440px/1728px/1920px) give it an edge on larger monitors. PSARA's `74rem` max-width (~1184px) feels cramped on displays >1280px wide.

---

## 3. Typography System

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Display font** | `var(--font-display)` | Space Grotesk (`var(--font-space-grotesk)`) | ✅ Both |
| **Body font** | `var(--font-body)` | Manrope (`var(--font-manrope)`) | ✅ Both |
| **Text-xs** | `clamp(0.65rem, 0.6+0.2vw, 0.75rem)` | `clamp(0.75rem, 0.7+0.2vw, 0.875rem)` | ⚠️ PSARA smaller |
| **Text-base** | `clamp(0.98rem, 0.9+0.5vw, 1.08rem)` | `clamp(1rem, 0.9+0.5vw, 1.125rem)` | ✅ Similar |
| **Text-hero/7xl** | `clamp(2.2rem, 3.5vw+1rem, 4.85rem)` | `clamp(3.5rem, 3+6vw, 7.5rem)` | ❌ Silbar hero 54% larger |
| **Heading levels** | xs / sm / base / lg / xl / 2xl / 3xl / hero | xs / sm / base / lg / xl / 2xl / 3xl / 4xl / 5xl / 6xl / 7xl | ❌ PSARA has fewer levels |
| **Display classes** | `display-hero`, `display-xl`, `display-lg`, `display-bold` | `section-heading`, `seo-page-title`, `.section-eyebrow` | ⚠️ Different naming |
| **Mobile font fix** | No explicit mobile font-size fix | `body { font-size: 16px }` on ≤768px + `-webkit-text-size-adjust: 100%` | ❌ PSARA missing |
| **Heading word-break** | Relies on `text-wrap: balance` | Explicit `word-break: break-word` on mobile | ⚠️ PSARA less robust |
| **Selection color** | Gold bg + obsidian text | Gold bg + cream text | ✅ Both accessible |

### Key Finding
Silbar's typography scale extends up to 7xl (vs PSARA's 3xl + hero), giving it more dramatic range for marketing headlines. PSARA's hero size (`max 4.85rem`) is significantly smaller than Silbar's 7xl (`max 7.5rem`).

---

## 4. Spacing & Layout Rhythm

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Section spacing** | `--section-y: clamp(4.5rem, 8vh, 8rem)` | `--section-y: clamp(3.5rem, 8vh, 7rem)` | ✅ Similar |
| **Section tight** | `--section-y-sm: clamp(2.5rem, 5vh, 4.5rem)` | `section-pad--tight: clamp(2.5rem, 5vh, 4rem)` | ✅ Nearly identical |
| **Hero padding** | 14+ pb, 28+ pt (Tailwind) | `section-pad--hero: clamp(5rem, 12vh, 9rem)` | ⚠️ Different approach |
| **Card padding** | `.p-5 md:p-6` (GoogleReviews cards) | `padding: clamp(1.25rem, 2vw, 1.75rem)` (brand-card) | ⚠️ Mixed approaches |
| **Grid gap** | `gap-3 sm:gap-2` varied | `gap: 0.85rem` consistent in CSS | ❌ PSARA uses Tailwind gaps (less consistent) |
| **Form field padding** | `0.75rem 0.85rem` | Varies per component | ✅ Similar baseline |
| **Button padding** | `0.85rem 1.65rem` (btn-gold) | `0.85em 2em` (btn-primary) | ⚠️ PSARA uses rem, Silbar uses em |

### Key Finding
Both systems use similar section spacing. PSARA relies more on Tailwind utility classes for spacing (inconsistent across pages), while Silbar centralizes spacing in CSS class definitions.

---

## 5. Button Systems

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Primary** | `btn-gold` (gold bg + obsidian text) | `btn-primary` (cherry bg + paper text) | ❌ Different accent |
| **Secondary/ghost** | `btn-ghost` (transparent + border) | `btn-secondary` (transparent + border) | ✅ Similar pattern |
| **Dark variant** | `btn-ghost` works on dark | `btn-primary--on-dark` + `btn-secondary--on-dark` | ⚠️ Silbar more explicit |
| **CTA variant** | `btn-gold-cta` (gradient gold with scale hover) | — | ✅ PSARA unique |
| **Legacy variants** | `btn-royal-blue`, `btn-lemon-green` (unused) | — | ❌ Dead code |
| **Hover effect** | translateY(-1px) | translateY(-2px) + box-shadow | ⚠️ Different intensity |
| **Tap target on mobile** | No explicit min-size | `min-height: 44px; min-width: 44px` | ❌ PSARA missing |
| **Font size** | `0.72rem` (small, uppercase) | `0.8rem` (larger, uppercase) | ⚠️ PSARA smaller |

### Key Finding
PSARA has 2 extra button variants that are more visually impactful (gold gradient CTA) but also has 2 legacy variants that should be removed. Silbar's button system is leaner and more consistent across dark/light contexts. PSARA lacks explicit mobile tap targets (44px minimum).

---

## 6. Card Component Patterns

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Brand card** | `.card-glow-hover` (gold shadow glow) | `.brand-card` (gold corner ticks) | ✅ Both decorative |
| **Hover effect** | translateY(-2px) + box-shadow glow | translateY(-4px) + enhanced border/shadow | ⚠️ Different intensity |
| **City tags** | `<Link>` with border + hover gold (inline) | `.seo-city-tag` (cherry bg on hover) | ⚠️ Different accent colors |
| **State cards** | Grid of bordered links | `.location-state-card` (rounded, center pin icon) | ❌ Visually different |
| **Image handling** | `<Image>` with `fill` + `sizes` | `<Image>` with `fill` + `sizes` | ✅ Both optimal |
| **Breadcrumb** | React component in PageHero | CSS class `.breadcrumb` in PageHero | ✅ Both present |

### Key Finding
Silbar's cards use more distinctive hover effects (translateY(-4px) + corner ticks), while PSARA favors gold glow shadows. The visual identity is different by design (PSARA = stately dossier, Silbar = modern security).

---

## 7. State/City SEO Page Patterns

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Route pattern** | `/states/[slug]` + `/city/[slug]` | `/security-services/[state]` + `/security-services/city/[slug]` | ✅ Both clear |
| **Hero** | `PageHero` with title + crumbs | `PageHero` with image + GSAP animation | ❌ PSARA no image hero |
| **Stats strip** | Inline Tailwind grid with `var(--gold)` accents | `.seo-stats-strip` with cherry-accented CSS grid | ⚠️ Different visual weight |
| **Content sections** | `Prose` with `GbpOfficeSection`, FAQ, city links | `LocationRichContent` with `GbpOfficeSection`, grids, FAQ | ✅ Both rich |
| **Schema.org** | Organization, LocalBusiness, FAQPage, BreadcrumbList | Organization, LocalBusiness, FAQPage, BreadcrumbList | ✅ Both complete |
| **CTA area** | `CtaBar` component (bottom of content column) | `.seo-local-cta-card` (full-width band after hero) | ❌ Different position |
| **City nearby** | `siblings` list + filter | `nearbyCities` from state majorCities | ⚠️ Different algorithm |
| **Services cross-link** | Link tags list (max 8) | Grid of `.seo-service-link` cards (all services) | ✅ Silbar more detailed |

### Key Finding
PSARA uses a prose-centric layout (left column: content, right column: sidebar with form/GBP). Silbar uses a full-width stacked layout (hero → stats → CTA band → GBP → rich content → services grid → cities grid → bottom CTA). Silbar's layout is more scannable for landing-page conversion.

---

## 8. Mobile-Specific Behavior

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Sticky CTA** | Floating bottom-right pill | Full-width two-column bottom bar | ❌ Different approach |
| **Bottom padding** | No explicit body padding | `padding-bottom: calc(5.5rem + safe-area)` | ❌ PSARA missing guard |
| **Mobile nav** | Hamburger at lg breakpoint | Hamburger at lg breakpoint | ✅ Both |
| **Safe areas** | Only `--header-offset` token | Full `env()` support for all sides | ❌ PSARA incomplete |
| **Tap targets** | No explicit minimum sizes | `min-height: 44px` on interactive elements | ❌ PSARA missing |
| **Touch feedback** | Gold border on hover (works for touch) | Cherry bg + gold on hover (works for touch) | ✅ Both functional |
| **Form CTA width** | `w-full sm:w-auto` | `w-full` + mobile-first | ✅ Both mobile-ready |

### Key Finding
Silbar has significantly better mobile UX guardrails: explicit safe area handling, minimum tap target sizes, fixed bottom CTA bar with `env(safe-area-inset-bottom)`, and a `-webkit-text-size-adjust` fix. PSARA is missing all of these.

---

## 9. Animation & Motion Systems

| Aspect | PSARA Consultant | Silbar Security | Score |
|--------|-----------------|-----------------|-------|
| **Library** | GSAP + ScrollTrigger | GSAP + ScrollTrigger | ✅ Both |
| **Easing tokens** | 8 CSS variables (expo, cinematic, spring, bounce, etc.) | 7 CSS variables (smooth, spring, bounce, snappy, etc.) | ✅ Similar philosophy |
| **Transition durations** | `--dur-fast: 0.28s`, `--dur-med: 0.55s`, `--dur-slow: 0.9s` | Implicit durations (0.25s, 0.3s, 0.35s) | ⚠️ PSARA more systematic |
| **Character hover** | `.chr-hover` with staggered character split | — | ✅ PSARA unique |
| **Scroll progress** | `ScrollProgress` component | — | ✅ PSARA unique |
| **Marquee** | `.animate-marquee` + ticker-band | `.brand-trust-track` (pausable on hover) | ⚠️ Different implementation |
| **Reduced motion** | `prefers-reduced-motion: reduce` → 0.01ms | Same approach | ✅ Both |
| **Lenis** | Used for smooth scrolling | Not used | ⚠️ Different scroll engine |

### Key Finding
PSARA has a richer animation vocabulary (character hover effects, scroll progress, Lenis smooth scrolling). Silbar focuses on hover micro-interactions and marquee scrolling. Both respect reduced motion.

---

## 10. Critical Gaps & Recommendations

### 🔴 Critical Issues

| # | Issue | Impact | Affects | Recommended Fix |
|---|-------|--------|---------|-----------------|
| 1 | **No mobile safe area handling** | Content hidden behind notches/home indicator | PSARA | Add `env(safe-area-inset-bottom)` to body padding and sticky elements |
| 2 | **No minimum tap targets on mobile** | Accessibility failure for interactive elements | PSARA | Add `min-height: 44px; min-width: 44px` to all buttons, links, CTAs |
| 3 | **No mobile font-size fix** | iOS may auto-scale text in landscape | PSARA | Add `body { font-size: 16px; -webkit-text-size-adjust: 100%; }` on mobile |
| 4 | **No bottom padding for sticky element** | Content at page bottom hidden | PSARA | Add `body { padding-bottom: calc(5rem + safe-area) }` |

### 🟡 Moderate Issues

| # | Issue | Impact | Affects | Recommended Fix |
|---|-------|--------|---------|-----------------|
| 5 | **Page max-width too narrow** | Whitespace feels empty on 1440px+ screens | PSARA | Consider increasing `--page-max` from 74rem (~1184px) to 85rem (1360px) |
| 6 | **No ultrawide/Mac breakpoints** | Large displays show excess padding | PSARA | Add `--bp-xl: 1440px` and `--bp-uw: 1920px` support |
| 7 | **Dead button variants** | `btn-royal-blue`, `btn-lemon-green` unused but present | PSARA | Remove or archive legacy button styles |
| 8 | **Inconsistent grid gaps** | Some use `gap-4`, others `gap-3 md:gap-5` — no token | PSARA | Create `--grid-gap` token and use consistently |

### 🟢 Minor Issues

| # | Issue | Impact | Affects | Recommended Fix |
|---|-------|--------|---------|-----------------|
| 9 | **Hero size disparity** | PSARA hero (max 4.85rem) smaller than Silbar (max 7.5rem) | PSARA | Optionally increase `--text-hero` to max 6rem |
| 10 | **Typography levels missing** | No 4xl/5xl/6xl/7xl in PSARA | PSARA | Add intermediate levels for consistency |
| 11 | **Different CTA position on SEO pages** | PSARA puts CTA in sidebar, Silbar uses full-width band | Both | Consider aligning CTA position for user behavior |
| 12 | **No CSS content-visibility on SEO sections** | PSARA removed it for GSAP compatibility | PSARA | Consider re-adding with `contain-intrinsic-size` for non-animated sections |

### ✅ Strengths (Things to Keep)

| Aspect | Notes |
|--------|-------|
| **Rich color tokens** | PSARA's warm cream/gold palette is distinctive and cohesive |
| **Systematic animation durations** | `--dur-fast/med/slow` is better than magic numbers |
| **Character hover effects** | `.chr-hover` differentiator from Silbar |
| **Schema.org coverage** | Both have excellent structured data |
| **Fluid typography** | Both use `clamp()` effectively |
| **Reduced motion support** | Both handle `prefers-reduced-motion` |

---

## Summary Scorecard

| Category | PSARA | Silbar | Notes |
|----------|-------|--------|-------|
| Design tokens | ⚠️ | ✅ | PSARA has oversupply + dead tokens |
| Responsive breakpoints | ❌ | ✅ | PSARA missing Mac/ultrawide |
| Typography scale | ⚠️ | ✅ | PSARA has fewer levels, smaller hero |
| Section spacing | ✅ | ✅ | Nearly identical |
| Button system | ⚠️ | ✅ | PSARA has dead variants, missing tap targets |
| Card patterns | ✅ | ✅ | Different but equally polished |
| Mobile safe areas | ❌ | ✅ | **Critical gap** |
| Mobile tap targets | ❌ | ✅ | **Critical gap** |
| Animations | ✅ | ✅ | Both excellent |
| Schema/SEO | ✅ | ✅ | Both gold standard |

**Overall: PSARA needs mobile UX improvements (safe areas, tap targets, font fix) while Silbar could benefit from PSARA's richer animation vocabulary.**
