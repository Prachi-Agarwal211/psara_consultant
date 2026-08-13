# PSARA + Silbar — Deep Repair & Completion Plan

> **Date:** 2026-08-06 | Based on deep audit of both codebases + open-seo + ai-research-prompts doctrine
> **Projects:** `psara-consultant` (lags behind) · `silabar security` (reference, ~done)

---

## 1. Executive Summary

| Area | Silbar (reference) | PSARA (needs work) |
|---|---|---|
| Pages exposed | 566 sitemap URLs | ~320 sitemap URLs |
| Homepage sections | Full (hero video, services, geo, leadership, process, why-us, testimonials, certifications, reviews, form) | Only **2 components** (HeroStage + HomeStory); ~19 more sections are built but **unwired/orphaned** |
| Team photos | Sonu + Nakul (2 directors) present | **None** |
| Footer | 4-column + trust badges + social + offices + stats | **Double footer bug** + content-light |
| Mobile | Drawer menu, safe-area CTA, dvh | Decent hero, but missing sections/forms on mobile |
| CTA | WhatsApp everywhere (floating, header, sticky, exit-intent, per-page lead block) | Floating present, but homepage has **no form**; franchise page **misbranded as Silbar** |
| Animations | GSAP + ScrollTrigger across all pages, reduced-motion gated | GSAP+Lenis, but motion **only on homepage**; huge dead animation lib |
| Build health | Clean | Clean (`tsc` passes 0 errors) |
| SEO | 566 URLs, robots, ai.txt, llms.txt, IndexNow, OG per page | Strong schema/sitemap, but **sitemap only ~320**, no llms.txt/IndexNow, stale counts |

**Core finding:** PSARA's missing homepage and missing pages are already **built but orphaned** (`app/components/sections/`, `app/components/layout/`). Most of the "catch-up" is wiring + fixing, not writing from scratch.

---

## 2. CRITICAL FIXES (do first — everything else depends on these)

### 2.1 PSARA — branding bug
- `app/franchise/page.tsx` promotes **"Silbar Security Services"** (email `info@silbarsecurity.in`, www.silbarsecurity.in) on PSARA's own domain.
  **Fix:** rebrand title, metadata, CTAs to PSARA Consultant India (+91-9983169555, info@psaraconsultantindia.com). (Silbar franchise belongs on silbar site only.)

### 2.2 PSARA — double footer on every inner page
- `components/SiteChrome.tsx` renders a footer for `!isHome` **and** `StageShell` renders `SiteFooter`. Result: 2 stacked footers on all inner pages.
  **Fix:** render exactly one footer. Prefer the big `SiteChrome` footer; drop the thin `StageShell` one.

### 2.3 PSARA — add both Silbar founders' photos
Copy from `silabar security\public\` into `psara-consultant\public\images\team\`:
- `sonu-singh-square.webp` / `.jpg` → Mr. Sonu Singh, Director & Founder
- `nakul-singh-square.webp` / `.jpg` → Mr. Nakul Singh Jadaun, Director

Use in: new **About** leadership section + **Homepage** leadership cards (matches Silbar pattern).
> Confirm with client whether PSARA should present the same two founders (likely yes — same owners, two brands).

### 2.4 PSARA — homepage is 2 components; wire in the finished sections
Build homepage order (all components already exist — wire + fix tokens):
1. `HeroStage` (exists)
2. `TickerMarquee` / `ComplianceMarquee` (exists)
3. `StatsBar` (exists)
4. `WhyChooseUs` (exists — **fix undefined `--gold-deep` token**)
5. Services grid (first 6 of 14) (exists in HomeStory)
6. `StateGridHome` 12-state tiles (exists)
7. `ApprovalRoadmap` / process (exists)
8. `GoogleReviews` testimonials (exists — orphaned)
9. `HomeFaq` (exists — orphaned; fix legacy `--text-dark`-style tokens)
10. `HomeContact` full form + map + socials (exists — orphaned)
11. `PsaraEstimator` fee estimator CTA (exists — orphaned)
12. `EligibilityQuiz` (exists — orphaned) — optional, high value

Also fix the **stale Cypress a11y suite** (`cypress/e2e/accessibility.cy.ts`) that tests the deleted 15-section homepage.

### 2.5 PSARA — FAQ page shows 40 of 100
`app/faq/page.tsx` renders only first 40 FAQs while `data/faq.ts` has **100**. Render all (accordion + FAQPage JSON-LD).

### 2.6 PSARA — sitemap + exposure
- Sitemap currently ~320 URLs and omits dynamic depth. Expand to expose **every** page (see §5 for the full map). Add `llms.txt` + `ai.txt` (Silbar has both). Add IndexNow postbuild (`scripts/submit-indexnow.mjs` pattern from Silbar). Set stable `lastModified` dates (not `now` every build).

---

## 3. ISSUES INVENTORY

### 3.1 PSARA — issues
| # | Severity | Issue | Location | Fix |
|---|---|---|---|---|
| P0-1 | High | Franchise page branded as Silbar | `app/franchise/page.tsx` | Rebrand to PSARA |
| P0-2 | High | Double footer on all inner pages | `SiteChrome` + `StageShell/SiteFooter` | Single footer |
| P0-3 | High | No team/founder photos | — | Copy 2 founders from Silbar |
| P1-1 | High | Homepage only Hero+HomeStory; 19 sections orphaned | `app/components/sections/` | Wire in (§2.4) |
| P1-2 | High | FAQ page truncates at 40 | `app/faq/page.tsx` | Render all 100 |
| P1-3 | Med | Orphaned components use undefined CSS tokens (`--gold-deep`, legacy) | `WhyChooseUs`, `HomeFaq`, `GoogleReviews`, `HomeContact` | Token cleanup in `tokens.css` |
| P1-4 | Med | GBP `cid`/`placeid` placeholders (`___UPDATE___`) reused across offices | `lib/config.ts` GOOGLE_REVIEWS | Fill real Jaipur/Delhi/Gurgaon/Noida/Ahmedabad GBP ids |
| P1-5 | Med | Stale Cypress a11y suite tests deleted homepage | `cypress/e2e/accessibility.cy.ts` | Rewrite for current sections |
| P2-1 | Med | No careers / case-studies / certification / industries / emergency / calculator pages | — | Build (Silbar has working reference) |
| P2-2 | Med | Motions only on homepage; big dead animation lib | `app/lib/gsap.ts`, `motion.ts` | Apply to inner pages (PageHero, section reveals) |
| P2-3 | Low | `README.md` is boilerplate | — | Write real README |
| P2-4 | Low | `sitemap.ts lastModified: now` churn | `app/sitemap.ts` | Stable dates |
| P2-5 | Low | Dead assets: `public/public/`, unused SplitText/CustomEase libs, `nul` file | — | Clean |
| P2-6 | Low | Claim mismatches (AGENTS.md "600+ cities/70+ FAQ" vs actual 218/100) | `AGENTS.md`, llms.txt | Correct counts |

### 3.2 Silbar — issues (fix as "gold standard" hardening)
| # | Issue | Location | Fix |
|---|---|---|---|
| S-1 | `/gallery` is 12 gradient placeholders, no photos | `src/app/gallery/page.tsx` | Real photos or delist from nav/sitemap |
| S-2 | Certification gallery "coming soon" | `src/app/certification/page.tsx` | Add cert images or remove |
| S-3 | Franchise claims "20+ years" but Est. 2018 | `src/app/franchise/page.tsx` | Fix to "8+ years" |
| S-4 | GA var mismatch: code reads `NEXT_PUBLIC_GA_MEASUREMENT_ID`, env documents `NEXT_PUBLIC_GA_ID` | `AnalyticsScripts.tsx` / `.env.example` | Align env var name |
| S-5 | `src/providers/` empty; `manifest` says "12 verticals" but 55 services | — | Clean / fix text |
| S-6 | `.env.example` mojibake (UTF-16) | — | Re-save UTF-8 |
| S-7 | `/clients` "Download documents" dead link | `src/app/clients/page.tsx` | Real link or remove |

---

## 4. LAYOUT / DESIGN DOCTRINE (from ai-research-prompts + Silbar pattern)

### 4.1 Design tokens (align PSARA to Silbar-grade system)
- **Never** pure black/white; use `#0a0a0a` / `#fafaf9` style.
- Max 5 colors, 60/30/10 rule (60% neutral, 30% surface, 10% CTA accent). PSARA already has gold-on-dark identity — keep, formalize in `tokens.css`.
- Max 2 fonts (variable), `clamp()` fluid type, line-length 45–75 chars.
- **Never** default easing — use custom cubic-bezier set (snappy `0.16,1,0.3,1`, elastic `0.68,-0.55,0.27,1.55`, smooth `0.77,0,0.175,1`, dramatic `0.2,0.8,0.2,1`, cinematic `0.125,0.425,0.270,1.000`).
- B2B/trust archetype stack: **GSAP + @gsap/react + Lenis + Tailwind v4 tokens.css** (both sites already on this). Signature: elastic counters + MaskReveal + MagneticButton. Technique budget 4–5 per section.

### 4.2 Shared page skeleton (copy Silbar's)
```
NavigationWrapper
├─ Header (sticky, glass→solid, scroll progress, mobile drawer @<1100px, phone + WA CTA)
├─ PageHero (eyebrow + split-text title + breadcrumb, tall/short/compact variants)
├─ [page body: sections]
├─ PageLeadSection (social proof + QueryForm + Call/WhatsApp/Review buttons) ← every page
├─ GlobalGbpSection (all-offices block + LocalBusiness schema)
├─ BrandTrustBar (marquee of credentials)
└─ Footer (4-col + trust badges + social + offices + stats)
StickyCta (floating Call + WhatsApp, safe-area aware)
ExitIntentPopup (desktop, session-gated)
```

### 4.3 Animations to standardize on both sites
- **Hero:** video/masked hero (poster + 3-layer overlay, bottom-left content, floating trust badges), GSAP intro timeline.
- **Scroll-triggered:** ScrollReveal, SplitTextReveal (words/chars), MaskReveal (5 clip-path directions) — trigger at `top 85%`, `prefers-reduced-motion` gated.
- **Counters:** elastic spring overshoot (`elastic.out(1,0.3)`) for stats.
- **CTA:** MagneticButton (warp + glow + elastic spring-back); char-stagger on buttons.
- **Page transitions:** View Transitions API (`::view-transition-old/new(root)`).
- **Mobile:** `100dvh`, `env(safe-area-inset-*)`, 48px touch targets, `navigator.vibrate()` haptics on key actions, pixelRatio 1 WebGL, reduced-motion/contrast media queries.

### 4.4 Footer spec (rebuild PSARA's)
4 columns: **Brand+Contact** (logo, blurb, phone, email, WA, socials) · **Services** (6 + View All) · **Guides/Company** (process, fees, documents, eligibility, FAQ, About, Blog, Contact) · **Coverage** (top states/cities + Links). Trust-badge row (licenses served, 36 states, 12 offices, 10+ yrs). Bottom bar: copyright + live page counts + Privacy/Terms/Disclaimer/Sitemap. (Mirror Silbar `Footer.tsx` structure.)

---

## 5. BIG SITEMAP — PSARA (every page exposed, target ~700+ URLs)

```
/  /about  /contact  /services  /faq  /blog  /franchise  /google
/psara-license  (guide hub, 17 guides below)
   /psara-process  /psara-eligibility  /psara-documents  /psara-fees
   /psara-renewal  /psara-training  /multi-state-license  /rejection-reasons
   /police-verification  /business-plan  /company-registration
   /business-structure  /start-security-agency  /psara-cost-guide
   /psara-act-2005  /security-guard-training
/services/[14]                      → /services/psara-license, /company-registration, ...
/states/[36]                        → /states/rajasthan, /states/delhi, ... (ALL 36)
/cities + /city/[218]               → /city/jaipur, /city/delhi, ... (ALL 218)
/blog + /blog/[22]                  → current 22 posts
/industries + /industries/[N]       → NEW: security verticals (mirror Silbar 37)
/careers + /careers/[N]             → NEW: 8–12 jobs
/case-studies + /case-studies/[N]   → NEW: 6–8 client stories
/certification                      → NEW: PSARA license proof, MOU partners, ISO
/emergency                          → NEW: emergency 24/7 page
/privacy-policy  /terms  /disclaimer            (noindex)
/sitemap.xml  /robots.txt  /llms.txt  /ai.txt   (exposure)
```

**Count:** 12 core + 17 guides + 14 services + 36 states + 218 cities + 22 blog + ~40 new (industries/careers/case-studies) ≈ **~700 URLs**.

### Sitemap rules (from open-seo specs)
- Every `<loc>` must be absolute, live, non-404. Remove anything you delist.
- **No orphans:** every sitemap page must be linked from nav/hub/related (add city/state cross-links).
- **No duplicate titles/meta-descriptions:** put the distinguishing location/service in the title template (city pages already vary via generator — verify).
- **Thin-content guard:** state/city pages use `lib/seo-content-generator.ts` seeded content — ensure ≥150 words, unique intro per page.
- **Canonical in one place; robots allow AI crawlers** (GPTBot, ClaudeBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot); disallow `/api`, `/_next`, `/admin`.
- **IndexNow postbuild** + stable `lastModified` dates + GSC/Bing submission.

---

## 6. EXECUTION PLAN (phases)

### Phase 1 — Correctness & branding (quick, 1 session)
1. Rebrand franchise page → PSARA
2. Kill double footer (single footer)
3. FAQ render all 100
4. Copy 2 founder photos into psara `public/images/team/`
5. Fix undefined CSS tokens

### Phase 2 — Homepage completion (PSARA)
6. Wire all orphaned sections into homepage (§2.4 order)
7. Add leadership section (founder cards) to Home + About
8. Token cleanup + mobile pass (dvh, safe-areas, 48px targets, haptics)
9. Rewrite stale Cypress a11y test
10. Update README + fix claim counts

### Phase 3 — New pages (PSARA, mirroring Silbar)
11. `industries` + `/industries/[slug]` (37 verticals → security-industry data)
12. `careers` + `/careers/[slug]` (PSARA jobs)
13. `case-studies` + `/case-studies/[slug]`
14. `certification`, `emergency`
15. `calculator` (PsaraEstimator page) — optional

### Phase 4 — Motion & design pass (both sites)
16. Apply GSAP section reveals to PSARA inner pages (dead lib → live)
17. Magnetic CTAs, elastic counters, mask reveals, page transitions
18. Footer rebuild to 4-col spec (PSARA)
19. Silbar hardening fixes (S-1..S-7)

### Phase 5 — SEO exposure (both sites)
20. Expand sitemap to full URL map; stable dates
21. `llms.txt` + `ai.txt` (PSARA)
22. IndexNow postbuild script
23. GSC + Bing verification & sitemap submission
24. Real GBP `cid`/`placeid` values

### Verification
- `npx tsc --noEmit` clean (both)
- `npm run lint`
- `npm run build` then `npm start` → crawl `/sitemap.xml` with a checker (open-seo audit engine if wanted)
- Cypress a11y pass
- Lighthouse mobile ≥ 90 perf/accessibility/SEO

---

## 7. OPEN QUESTIONS FOR CLIENT
1. Same two founders (Sonu Singh, Nakul Singh Jadaun) for PSARA's About/Home? Photo usage OK on both brands?
2. PSARA domain (MASTER-PLAN says new domain TBD) — sitemap `SITE.url` in `lib/config.ts`?
3. Real GBP placeids/cids for the 5 PSARA offices?
4. New pages priority: industries/careers/case-studies/certification — which first?
5. Gallery: use real photos or drop the page?
