# PSARA DESIGN RESEARCH — STATE/CITY PAGES ARE TEMPLATE SLOP
Deep audit 2026-08-06 · PSARA vs Silbar · root causes + build plan

---

## 1. THE CORE DISEASE (one sentence)
Every one of PSARA's 38 state pages and 220 city pages renders the **same dark-card shell with the same 7 fixed sections in the same order**, and the content generator draws from **tiny pools** — so pages differ only in the state name, and nothing in the *design* changes between them.

Silbar, by contrast, gives every location its **own photo hero, shuffled section order, and ScrollReveal motion** — structural variety that reads as "hand-built" and is rewarded by Google.

---

## 2. VERIFIED EVIDENCE (code + live visual)

### 2.1 All 38 states share one identical shell
`app/states/[slug]/page.tsx` → `StateDossierView.tsx` → hard-coded order:
1. Dossier hero card (rgba(2,8,20,0.4) bg)
2. Controlling Authority card
3. Process/Documents tabs
4. Training + Rejection cards
5. Market + sectors
6. Why choose us
7. FAQ details
Same for cities (`CityDossierView` — grep shows same `border-white/10` cards).
**Every section** = `border border-white/10 bg-white/[0.02]` on a flat dark background. No gradient switching, no image, no accent variation.

### 2.2 The "content" is a seeded template with tiny pools
`lib/seo-content-generator.ts`:
- 3 intro variants, 8 WHY_POOL entries, 10 REJECTION_POOL entries
- FAQ list is 10 base items, rotated by `seed % 3`, sliced to 8
- `pick()` = `options[(seed + index*9973) % length]` — deterministic but visible repetition across states (same 6 rejection lines, same 7 why-points reordered)
- No per-state facts beyond what's in `data/states.ts` (authority name, timeline, fee note, sector list)
→ Users land on 3–4 state pages and see the same sentences. That is the "AI slop" feeling — not the writing quality, the *repetition*.

### 2.3 Zero design variety mechanisms (what Silbar has, PSARA lacks)
| Mechanism | Silbar | PSARA |
|---|---|---|
| Per-location hero photo | `locationHeroImage(stateIndex, offset)` cycles 3 real images | none — PageHero has no image variant |
| Section order shuffle | `LocationRichContent` Fisher-Yates by seed (7 movable sections) | fixed order, all states |
| ScrollReveal on every section | `<ScrollReveal>` wrapper everywhere | not used on dossier views |
| SplitText title animation | `SplitTextReveal` in PageHero | word-reveal only, hero only |
| Real photos in body | hero + image band | 20 real photos in `public/assets/images/` — **unused** on state/city pages |
| PageHero variants | `variant: 'image' | 'dark'` | text-only + blue radial glow |

### 2.4 Motion machinery exists but is never attached
`app/lib/motion.ts` has `initClipReveals`, `initParallaxLayers`, `initStaggerChildren`, `initWordReveal`, `initPinnedProcess`… and `StageShell` calls them — but they only fire on `[data-clip]` / `[data-parallax]` / `[data-speed]` elements. **StateDossierView / CityDossierView contain zero such hooks.** Homepage (`HomeStory.tsx`) uses them; every inner page is dead-still. CSS has `--grad-metal`, `--grad-electric`, gold spotlight/amber glow gradients in `tokens.css` — unused on inner pages.

### 2.5 Live visual bugs (PinchTab, confirmed)
- Hero artwork is AI-dialogue: "APPROVALE CERTIFICATE" typo, gibberish pseudo-text on the certificate, sci-fi neon portal clashing with "Built for Trust"
- "PSARALicense Registration" — merged text, missing space (services list)
- Low-contrast grey subtext on navy (WCAG fail) in about/stats areas
- Footer: hardcoded © 2026; low-contrast capital-city labels; column height imbalance; floating N-logo + CALL DESK + chat clutter bottom-right on mobile
- Header: 9-item nav + top utility bar + duplicate 7-anchor left sidebar = overload

### 2.6 Structural defects from earlier audit
- Double footer on every inner page (SiteChrome `!isHome` footer + StageShell SiteFooter)
- FAQ page shows 40 of 100 FAQs (`slice(0,40)`)
- 18 orphaned section components built but never wired (WhyChooseUs, StatsBar, GoogleReviews, HomeFaq, PsaraEstimator, EligibilityQuiz, ApprovalRoadmap…)
- Sitemap: `new Date()` churn + only first 100 of ~220 cities in /security-services/city

---

## 3. THE PLAN — make every location page visually + structurally unique

### Phase 1 — Location identity system (the big win)
**1a. Photo hero per state/city.** Add `locationHeroImage(stateIndex, offset)` clone to PSARA:
-1a. **Do NOT reuse existing JPGs as location heroes.** Verified 2026-08-06: `hero-security-guard.jpg` is an off-topic Chinese temple (Man Mo Temple, Lantau, Hong Kong) — no security-guard/India/PSARA content; the 12 root JPGs are unrelated generic stock, none is a per-location photo. So per-location heroes MUST be generated (ChatGPT image-gen asset set, then mapped to slug). `PageHero` extended with `variant: 'image'` takes the generated/curated path per state.
**1b. Accent variation.** Derive a hue/glow token per state from a slug hash (gold, amber, electric-blue, bronze) applied to section glows, stat numbers, chip borders — no two states share identical color feel.
**1c. Background switching.** Alternate `--grad-gold-spotlight` / `--grad-amber-glow` / `--grad-electric` radial glows per section index so the page has visual rhythm instead of one flat void.

### Phase 2 — Section order shuffle (content uniqueness)
Port Silbar's `LocationRichContent` pattern into `StateDossierView`/`CityDossierView`:
- Fixed positions: intro, process, faqs, CTA
- Seed-shuffled: authority, documents, training, market, rejections, why, sectors
- Deterministic per state/city slug → every page structurally different, still stable per build

### Phase 3 — Widen content pools (kill the repetition)
- Expand WHY_POOL (8→16), REJECTION_POOL (10→20), intro variants (3→6 per slot)
- Add real per-state data fields: 2–3 unique facts per state (major districts, industrial belts, port/SEZ, notable rejection patterns), consumed by intro/market/authority blocks
- Add per-city: 1–2 economy-tag driven sentences using existing `economyTags`
- Keep FAQ 8-per-page but rotate from a 16-item base instead of 10

### Phase 4 — Motion + design pass on inner pages
- Wrap dossier sections in clip-reveal/parallax hooks (`data-clip`, `data-speed`) — machinery already exists, just attach it
- SplitText/word-reveal on section H2s
- Card hover: gradient border, arrow slide (pattern already in HomeStory)
- Mobile: stack order (form above directory on small screens), 44px touch targets, safe-area bottom for the 3 floating CTAs (merge into one action bar)

### Phase 5 — Kill the AI slop + fix structural defects
- Replace hero AI-art certificate with a clean real-photo + geometric gold overlay composition (keep logo)
- Fix "PSARALicense" merged word; raise grey text contrast to AA
- Single footer (remove SiteChrome duplicate), fix © year to dynamic
- Wire the 18 orphaned sections onto homepage/inner pages
- FAQ: render all 100 (paginated accordion)

### Phase 6 — SEO/exposure (site-seo-visibility skill)
- Sitemap: stable dates (SITE_LAUNCH_DATE pattern from Silbar), all ~220 cities, no `now()` churn
- robots.ts: add ChatGPT-User, OAI-SearchBot, Grokbot, Applebot-Extended (copy Silbar's allow-list)
- Keep llms.txt/ai.txt routes; add IndexNow postbuild
- State/city pages: unique H1 + meta per location (already templated), ensure each page has ≥150 words of *unique* intro (Phase 3 data)

---

## 4. BUILD ORDER
1. Phase 1 (location identity) — biggest perceived change, unblocks everything visual
2. Phase 2 + 3 (shuffle + pools) — content uniqueness, same build session
3. Phase 4 (motion attach) — cheap, machinery exists
4. Phase 5 (slop kills + structural) — correctness first for shipping
5. Phase 6 (SEO) — after pages exist, lock exposure

Verify after each phase: `npx impeccable detect` + kill-ai-slop scan + build + sitemap crawl + manual PinchTab check of 3 states (e.g. Rajasthan, Maharashtra, Meghalaya) to confirm they no longer look like clones.

---

## 5. WHAT I NEED FROM YOU (decisions)
- A. Hero imagery: OK to use the 20 existing real photos (guards, buildings, handshake) for per-location heroes, or do you want new shoots?
- B. Accent variation: OK with a 4-color gold/amber/bronze/blue accent system, or strictly gold-only branding?
- C. Priority: design-variety first (Phases 1–4) or SEO fixes first (Phase 6)?

---

## 6. DECISIONS — RESOLVED (2026-08-06, Anurag)
- A. Hero imagery: DO NOT reuse the 20 stock JPGs (verified junk — hero-security-guard.jpg is a HK temple). Per-state heroes = GENERATED via free keyless image-gen tooling (no login). ChatGPT/BrowserMCP path ABANDONED 2026-08-06: extension never connected to :12800 (verified connected:false), no chatgpt.com tab existed anywhere (PinchTab showed only ShipBridge + Logix), user could not log in to an invisible tab.
- B. Accent system: 4-color gold/amber/bronze/blue, gold as primary brand color. Hue also varies per-state via slug hash.
- C. Priority: design-variety first (Phases 1–4), SEO (Phase 6) after.

## 7. ASSET GENERATION RUNBOOK (free keyless tooling — no login, no ChatGPT)
Tool: free-ai-image-generation skill (Pollinations-style endpoint, keyless).
Download target: psara-consultant/public/assets/images/generated/
Rule for ALL prompts: append "no text, no words, no letters, no watermarks" — AI text renders as gibberish (the APPROVALE lesson).
Verify EVERY image with vision before wiring (anti-slop gate: no gibberish, no warped anatomy, consistent palette).

Batch 1 — Brand kit (transparent PNG):
1. Logo mark: modern shield + security keyhole, "PSARA" wordmark, gold, isolated on transparent background
2. Circular PSARA license seal/badge, gold
3. Monochrome white mark (dark bg variant) + black mark (light bg)

Batch 2 — Hero art replacement (kills the slop):
4. Professional PSARA license certificate mockup, Indian govt aesthetic, mint header bar, NO text
5. Cinematic hero background: dark navy + amber-gold abstract security motif

Batch 3 — Per-state identity (top 5 first: Maharashtra, Delhi NCR, UP, Karnataka, TN; then batch rest):
6-10. State hero: iconic skyline/landmark + security-industry theme, consistent dark-navy/gold grade, no text

Batch 4 — Thematic backgrounds (reusable across 220 city pages):
11. Industrial/warehouse night security
12. Govt office corridor
13. Guard patrol silhouette
14. Corporate towers dusk
