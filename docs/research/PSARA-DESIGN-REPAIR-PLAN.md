# PSARA Consultant India — Complete Design & Build Plan
> **Updated:** 2026-08-06 · **Reference Sites Analyzed:** Luke Baffait, Nudot Studio, Meech213, Horeca Social
> **Goal:** Match Silbar's completeness + exceed design quality + kill all AI slop tells

---

## 0. Verification Status (live codebase audit)

| Metric | Silbar (gold) | PSARA (target) | Gap |
|---|---|---|---|
| Sitemap URLs | 566 | ~320 | -246 |
| Homepage sections | 14+ | 2 | -12 |
| Team photos on homepage | Yes (Sonu+Nakul) | No | Missing |
| Inner page footer count | 1 | 2 (double footer bug) | Bug |
| FAQ render | All | 40/100 | Truncated |
| AI slop hits | 71 | 601 | +530 |
| Motion on inner pages | Yes | No | Missing |
| `/clients` page | Yes | No | Missing |
| llms.txt / ai.txt | Yes | No | Missing |
| IndexNow | Yes | No | Missing |

---

## 1. REFERENCE SITE ANALYSIS — Design Patterns to Steal

### 1.1 Luke Baffait (lukebaffait.fr)
**What to steal:**
- Soft, intimate typography with gentle motion cues
- "Quiet creator" — personal, human tone over corporate speak
- Scroll-driven reveals with easing (`cubic-bezier(0.16, 1, 0.3, 1)`)
- Generous whitespace between sections
- Photo-first layout with text overlay, not card grids

**Apply to PSARA:**
- Rewrite hero copy from "PSARA License Consultant" to something more personal: "We help security agencies get licensed across India. No stress. No guesswork."
- Use large, soft typography instead of condensed bold display fonts
- Add subtle parallax to the HeroStage background

### 1.2 Nudot Studio (nudot.com.tw)
**What to steal:**
- **3D floating hero** with organic shapes (rocks, liquid, particles)
- Dot-matrix section anchors (N-U-D-O-T as scroll markers)
- Bracketed metadata: `( Brand Direction )`, `( 01 // 05 )`
- Technical line rules at bottom of hero for contact info
- Asymmetric card placement (not grid-aligned)
- Deep black background with surreal color accents (teal, gold, chrome)

**Apply to PSARA:**
- Replace the current HeroStage gradient with a WebGL or Three.js scene (floating shield icon + geometric security shapes)
- Add dot-matrix state abbreviations as scroll anchors on state pages
- Use bracketed metadata in hero: `( PSARA Consultancy ) ( PAN INDIA )`
- Add thin technical lines at bottom of hero with contact info

### 1.3 Meech213 (meech213.com)
**What to steal:**
- **3D horizontal carousel** with perspective tilt
- Radial/fan navigation at bottom (not top)
- Magazine-editorial layout (rotated text stamps, asymmetry)
- Warm neutral palette with high-contrast imagery
- Cursor-following parallax on cards

**Apply to PSARA:**
- Replace the `StateGridHome` with a 3D carousel showing state cards at angles
- Add rotated "text stamp" overlays on hero: `( Jaipur · Est. 2018 )`
- Warm neutral backgrounds for case study pages instead of dark blue
- Horizontal scroll gallery for case studies

### 1.4 Horeca Social (horeca-social.com)
**What to steal:**
- Ultra-condensed display typography (`Druk` / `Monument Extended` style)
- Hot pink/magenta accent against soft background
- "LET'S GO VIRAL" aggressive headline energy
- Accordion process steps (numbered, expandable)
- Scattered kinetic typography for section breaks
- Full-bleed hero video with text overlay

**Apply to PSARA:**
- Use condensed display font for key headlines: "PSARA LICENSE CONSULTANT" (replacing generic serif)
- Keep the gold accent but add a secondary punch color (deep crimson or teal)
- Replace the current `ApprovalRoadmap` stepper with an accordion-style process (expandable steps)
- Add kinetic text sections between major homepage blocks

---

## 2. P0 — CRITICAL FIXES (Do These First)

### 2.1 Kill Double Footer
**Files to touch:**
- `app/components/SiteChrome.tsx` — remove footer block (lines ~294-368)
- `app/components/ui/StageShell.tsx` — keep as the single footer source

**Verification:** Open /about, /states/rajasthan, /services/fresh-psara-license — one footer only.

### 2.2 Wire Homepage (All 19 Orphaned Sections)
**Build order:**
```
1. HeroStage (exists, add WebGL/nudot-style floating element)
2. TickerMarquee / ComplianceMarquee
3. StatsBar
4. WhyChooseUs (fix --gold-deep token)
5. StateGridHome → replace with 3D carousel (meech213 pattern)
6. ApprovalRoadmap → redesign as accordion (horeca pattern)
7. GoogleReviews
8. HomeFaq
9. HomeContact
10. PsaraEstimator
11. EligibilityQuiz
```

**Also add:** Leadership section from `/about` (copy the `Leadership.tsx` component)

### 2.3 Fix FAQ Page — Render All 100
**File:** `app/faq/page.tsx`
- Change `FAQ_DATA.slice(0, 40)` to `FAQ_DATA`
- Update FAQPage JSON-LD to include all 100

### 2.4 Copy Team Photos
**Already done** — both `sonu-singh-square.webp` and `nakul-singh-square.webp` exist in `public/images/team/`. Verify they render on homepage leadership section after wiring.

### 2.5 Fix GBP Placeholders
**File:** `lib/config.ts` — replace `___UPDATE___` with real Jaipur/Delhi/Gurgaon/Noida/Ahmedabad GBP place IDs.

---

## 3. DESIGN REDESIGN — Section-by-Section

### 3.1 HeroSection (New — Nudot/Luke Baffait Inspired)

**Current:** Static gradient + text overlay
**Target:** Full-bleed video + floating 3D elements + condensed display type

```tsx
// HeroStage.tsx redesign
<section className="relative h-screen overflow-hidden">
  {/* Background: video or WebGL canvas */}
  <VideoBackground src="/videos/hero-1080p.mp4" />

  {/* Floating 3D elements (Nudot pattern) */}
  <FloatingShield />  {/* SVG shield with parallax */}
  <DotMatrixLabel />  {/* ( PSARA ) ( INDIA ) */}

  {/* Typography: condensed display + soft body */}
  <h1 className="font-display text-7xl md:text-9xl font-black tracking-tighter uppercase">
    PSARA<span className="text-metal"> CONSULTANT</span>
  </h1>
  <p className="mt-6 text-xl text-white/70 max-w-xl">
    Helping security agencies get licensed across all 36 states.
  </p>

  {/* CTA pair */}
  <div className="flex gap-4 mt-10">
    <ButtonGold href="/contact">Start Your License</ButtonGold>
    <ButtonGhost href="/calculator">Fee Calculator</ButtonGhost>
  </div>

  {/* Bottom metadata line (Nudot pattern) */}
  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 py-4 border-t border-white/10 text-xs text-white/40">
    <span>JAIPUR · DELHI · GURGAON</span>
    <span>( 36 STATES &amp; 8 UTs )</span>
  </div>
</section>
```

**Design notes:**
- Use `Forma DJR Display` or `Syne` for the hero headline (currently using both — pick one as primary)
- Add subtle mouse-follow parallax on the floating elements
- Video background should be muted, looped, darkened overlay

### 3.2 Process Section (Redesign — Horeca Accordion Pattern)

**Current:** `ApprovalRoadmap.tsx` — 8-step interactive stepper with progress bar
**Target:** Accordion-style expandable steps with kinetic typography

```tsx
// ProcessSection.tsx — accordion pattern inspired by Horeca
<section className="py-24 md:py-32 px-[var(--gutter)]">
  {/* Kinetic text break */}
  <div className="mb-16 overflow-hidden">
    <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase">
      HOW WE<span className="text-metal"> WORK</span>
    </h2>
  </div>

  {/* Accordion steps */}
  {STEPS.map((step, i) => (
    <AccordionStep key={step.id} step={step} index={i} />
  ))}

  {/* CTA after process */}
  <div className="mt-16 text-center">
    <p className="text-white/50 text-sm mb-4">Ready to get started?</p>
    <ButtonGold href="/contact">Book a Free Consultation</ButtonGold>
  </div>
</section>
```

**Accordion behavior:**
- Click a step to expand (show details)
- Only one step open at a time
- ScrollTrigger reveal: steps fade in as you scroll
- Animated number counter for each step

### 3.3 State Grid (New — Meech213 3D Carousel)

**Current:** Grid of state cards
**Target:** Horizontal 3D carousel with perspective tilt

```tsx
// StateCarousel.tsx — 3D carousel inspired by Meech213
<div className="carousel-3d-container">
  {STATES.slice(0, 12).map((state) => (
    <StateCard
      key={state.slug}
      state={state}
      className="carousel-card"
    />
  ))}
</div>
```

**CSS for 3D carousel:**
```css
.carousel-3d-container {
  perspective: 1000px;
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-card {
  flex: 0 0 280px;
  transform: rotateY(var(--rot, 0deg)) translateZ(200px);
  transition: transform 0.5s var(--ease-expo);
  scroll-snap-align: center;
}
```

### 3.4 Homepage Stats (Luke Baffait Inspired)

**Current:** Simple counter row
**Target:** Large numbers with soft reveal animation

```tsx
// StatsRow.tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20 px-[var(--gutter)]">
  {[
    { number: '36', label: 'States & UTs' },
    { number: '600+', label: 'Cities Covered' },
    { number: '500+', label: 'Licenses Processed' },
    { number: '8', label: 'Years Experience' },
  ].map((stat) => (
    <div key={stat.label} className="stat-item">
      <span className="stat-number font-display text-6xl md:text-8xl font-black text-metal">
        {stat.number}
      </span>
      <span className="stat-label text-white/50 text-sm mt-2">{stat.label}</span>
    </div>
  ))}
</div>
```

**Animation:** Numbers count up when scrolled into view (use Silbar's `Counter.tsx` or `ElasticCounter.tsx`)

### 3.5 Testimonials (Nudot Asymmetric Layout)

**Current:** Simple card grid
**Target:** Asymmetric layout with large quote marks

```tsx
// Testimonials.tsx
<div className="testimonials-asymmetric">
  {reviews.map((review, i) => (
    <div key={i} className={`testimonial-card testimonial-card--${i % 3}`}>
      <QuoteMark />
      <p className="text-xl md:text-2xl font-display leading-tight">{review.text}</p>
      <div className="mt-6 flex items-center gap-4">
        <Image src={review.avatar} alt={review.author} width={48} height={48} />
        <div>
          <p className="font-bold">{review.author}</p>
          <p className="text-sm text-white/50">{review.company}</p>
        </div>
      </div>
    </div>
  ))}
</div>
```

**CSS:**
```css
.testimonial-card--0 { grid-column: 1 / 3; }
.testimonial-card--1 { grid-column: 3; }
.testimonial-card--2 { grid-column: 2 / 4; }
```

---

## 4. FOOTER REDESIGN

### 4.1 Target Footer Structure (4-Column + Trust Badges)

**Reference:** Silbar's footer pattern, enhanced with Nudot's technical lines

```tsx
// SiteFooter.tsx redesign
<footer className="bg-[var(--void)] text-white pt-20 pb-10 px-[var(--gutter)]">
  {/* Top: Marquee CTA */}
  <MarqueeCTA text="★ START YOUR PSARA LICENSE TODAY ★ 36 STATES & 8 UTs ★ FREE CONSULTATION ★" />

  {/* Trust badges row */}
  <TrustBadges badges={TRUST_BADGES} />

  {/* 4-Column grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
    <FooterColumnBrand />
    <FooterColumnServices />
    <FooterColumnStates />
    <FooterColumnOffices />
  </div>

  {/* Technical line with contact info (Nudot pattern) */}
  <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
    <span>JAIPUR · DELHI · GURGAON</span>
    <span>+91-9983169555 · info@psaraconsultantindia.com</span>
    <span>( 36 STATES & 8 UTs )</span>
  </div>

  {/* Bottom bar */}
  <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
    <span>© {new Date().getFullYear()} PSARA Consultant India. All rights reserved.</span>
    <div className="flex gap-6 mt-4 md:mt-0">
      <Link href="/privacy-policy">Privacy</Link>
      <Link href="/terms">Terms</Link>
      <Link href="/sitemap.xml">Sitemap</Link>
    </div>
  </div>
</footer>
```

---

## 5. SITEMAP EXPANSION (Target: 560+ URLs)

### 5.1 Current Gaps
- Missing `/clients` route (build from Silbar reference)
- Missing `security-services/[state]` routes in sitemap
- Missing `security-services/city/[slug]` for cities >100
- No `llms.txt`, `ai.txt`, IndexNow

### 5.2 Sitemap Structure
```ts
// app/sitemap.ts
const STATIC_ROUTES = [
  '', '/about', '/contact', '/services', '/faq', '/states', '/cities',
  '/google', '/privacy-policy', '/terms', '/disclaimer', '/franchise',
  '/careers', '/case-studies', '/industries', '/certification',
  '/calculator', '/csr', '/gallery', '/emergency', '/security-services',
  '/clients',  // NEW
];

const DYNAMIC_ROUTES = [
  ...SERVICES.map(s => `/services/${s.slug}`),
  ...STATES.map(s => `/states/${s.slug}`),
  ...STATES.map(s => `/security-services/${s.slug}`),
  ...CITIES.map(c => `/city/${c.slug}`),
  ...CITIES.map(c => `/security-services/city/${c.slug}`),
  ...BLOG_POSTS.map(p => `/blog/${p.slug}`),
  ...CASE_STUDIES.map(cs => `/case-studies/${cs.slug}`),
  ...INDUSTRIES.map(ind => `/industries/${ind.slug}`),
  ...GUIDES.map(g => `/${g.slug}`),
];

// Stable lastModified (not `now` every build)
const STABLE_DATE = new Date('2026-08-04T00:00:00.000Z');

export default function sitemap() {
  return [
    ...STATIC_ROUTES.map(r => ({
      url: `${SITE.url}${r}`,
      lastModified: STABLE_DATE,
      changeFrequency: r === '' ? 'weekly' : 'monthly',
      priority: r === '' ? 1.0 : 0.8,
    })),
    ...DYNAMIC_ROUTES.map(r => ({
      url: `${SITE.url}${r}`,
      lastModified: STABLE_DATE,
      changeFrequency: 'weekly',
      priority: 0.85,
    })),
  ];
}
```

### 5.3 Add llms.txt and ai.txt
**Files to create:**
- `app/llms.txt/route.ts` — AI crawler friendly summary
- `app/ai.txt/route.ts` — LLM-specific content index

**Pattern from Silbar:**
```ts
// app/llms.txt/route.ts
export async function GET() {
  const content = `# PSARA Consultant India

PSARA Consultant India is a leading PSARA license consultancy based in Jaipur, Rajasthan.
We help security agencies get licensed across all 36 Indian states and 8 UTs.

## Services
- PSARA License Registration
- Multi-State Licensing
- Training Institute MOUs
- Police Verification & NOC
- Security Agency Setup

## Coverage
- 36 States & 8 UTs
- 600+ Cities
- Offices: Jaipur, Delhi, Gurgaon

## Contact
- Phone: +91-9983169555
- Email: info@psaraconsultantindia.com
- Address: C-36, Capital Galleria, Sirsi Road, Kanakpura, Jaipur 302034
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

---

## 6. SEO & AI VISIBILITY

### 6.1 robots.txt Update
**Allow AI crawlers:**
```
User-agent: Googlebot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Insight
Allow: /

User-agent: DeepSeek
Allow: /

User-agent: ByteDanceBits-Bot
Allow: /

User-agent: X/Google
Allow: /
```

### 6.2 IndexNow
**Copy from Silbar:**
- Add `scripts/submit-indexnow.mjs`
- Run in `next.config.ts` postbuild hook
- Submit to Bing + Yandex

### 6.3 JSON-LD Schema
**Verify every page has:**
- Organization (homepage)
- BreadcrumbList (inner pages)
- FAQPage (faq, state pages)
- Service (service pages)
- Article (blog posts)
- LocalBusiness (contact, about)

---

## 7. MOBILE DESIGN FIXES

### 7.1 Floating CTA Buttons
**Already in SiteChrome** — verify they show on all pages:
- WhatsApp button (bottom right)
- Call button (below WhatsApp)
- Safe-area aware (`env(safe-area-inset-bottom)`)

### 7.2 Mobile Navigation
**Add drawer menu** (from Silbar's `NavigationWrapper.tsx`):
- Hamburger icon (top left)
- Full-screen overlay menu
- WhatsApp + Call CTA in menu

### 7.3 Section Spacing on Mobile
**Fix:** Use responsive `--section-y`:
```css
:root {
  --section-y: clamp(3.5rem, 8vh, 7rem);
}
```

### 7.4 Touch-Friendly Interactions
**Ensure:**
- All buttons min 44x44px touch target
- Accordion steps easy to tap
- Carousel swipeable (add `touch-action: pan-y`)
- No hover-dependent interactions

---

## 8. CONTENT EXPANSION

### 8.1 Expand Cities Data (218 → 600+)
**Run expansion script:**
```bash
node scripts/expand-cities.ts
```
**Target:** Add Tier 2/3 cities from `data/cities.ts` using existing patterns.

### 8.2 State-Specific Content Uniqueness
**Fix `generateStateContent(s)`:**
```ts
// lib/seo-content-generator.ts
export function generateStateContent(state: StateInfo) {
  return {
    heroTitle: `PSARA License in ${state.name}`,
    heroSubtitle: `Get your PSARA license from ${state.authority}. Timeline: ${state.timeline}. Fee: ${state.feeEntireState}.`,
    authoritySection: `The Controlling Authority for ${state.name} is ${state.authority}.`,
    timelineNote: `Processing time is ${state.timeline}.`,
    feeNote: `Fee for entire ${state.name}: ${state.feeEntireState}.`,
    cities: state.cities.map(c => ({ name: c, slug: `${state.slug}/${c}` })),
    faqs: FAQ_DATA.filter(f => f.state === state.slug),
  };
}
```

### 8.3 Case Studies Expansion
**Current:** 47 lines (too short)
**Target:** 15-20 real case studies with:
- Client name (or anonymized)
- State
- Service type
- Timeline
- Outcome

### 8.4 Blog Post Schedule
**Add 5-10 new posts:**
- State-specific guides (already generated)
- Fee breakdowns
- Document checklists
- Timeline expectations
- Common rejection reasons

---

## 9. IMPLEMENTATION ORDER

### Phase 1 — Correctness (1 session)
- [ ] Kill double footer (P0.1)
- [ ] Fix FAQ truncation (P0.3)
- [ ] Fix undefined CSS tokens (WhyChooseUs, HomeFaq)
- [ ] Verify team photos render on homepage

### Phase 2 — Homepage Wire (1 session)
- [ ] Wire all 19 orphaned sections
- [ ] Add Leadership section to homepage
- [ ] Fix GBP `___UPDATE___` placeholders

### Phase 3 — Design Redesign (2 sessions)
- [ ] Redesign HeroSection (Nudot/Luke Baffait inspired)
- [ ] Redesign Process section (Horeca accordion)
- [ ] Redesign State Grid (Meech213 3D carousel)
- [ ] Redesign Stats (Luke Baffait counters)
- [ ] Redesign Testimonials (Nudot asymmetric)
- [ ] Redesign Footer (4-col + technical lines)

### Phase 4 — Sitemap + SEO (1 session)
- [ ] Expand sitemap to 560+ URLs
- [ ] Add llms.txt + ai.txt
- [ ] Add IndexNow script
- [ ] Fix robots.txt for AI crawlers
- [ ] Update JSON-LD on all pages

### Phase 5 — Content Expansion (ongoing)
- [ ] Expand cities to 600+
- [ ] Build `/clients` page
- [ ] Expand case studies to 15-20
- [ ] State-wise content uniqueness pass
- [ ] Blog post schedule (5-10 new posts)

### Phase 6 — Motion + Polish (1 session)
- [ ] Add GSAP ScrollTrigger to all inner pages
- [ ] Add ScrollReveal component to all pages
- [ ] Add parallax to hero and key sections
- [ ] Reduced-motion gate for all animations
- [ ] Run kill-ai-slop scan, triage remaining hits

---

## 10. QUALITY GATES

### 10.1 Build Verification
```bash
npm run build  # must pass with 0 errors
npm run dev    # test all pages locally
```

### 10.2 AI Slop Scan
```bash
node "ai research prompts/kill-ai-slop/skill/scripts/scan.mjs" app --json
# Target: < 100 hits (down from 601)
```

### 10.3 Impeccable Detect
```bash
npx impeccable detect app/ --json
# Target: 0 critical findings
```

### 10.4 Manual QA Checklist
- [ ] Homepage renders all 12+ sections
- [ ] Inner page has exactly one footer
- [ ] FAQ page shows all 100 entries
- [ ] Mobile: drawer menu works, CTAs visible, no horizontal scroll
- [ ] Team photos render on homepage and /about
- [ ] Process section has accordion interaction
- [ ] State grid is horizontal scrollable (3D carousel)
- [ ] No double footers anywhere
- [ ] No Silbar branding on psaraconsultantindia.com
- [ ] All state pages have unique content (not templated)
- [ ] Sitemap has 560+ URLs
- [ ] Mobile CTAs work (WhatsApp + Call)

---

## 11. RISKS & NOTES

- **Team photos:** Both founders' photos exist in both projects. Confirm with Anurag whether PSARA should show them (same people, two brands).
- **Double footer:** Quick fix but requires touching `SiteChrome.tsx` + `StageShell.tsx`. Test all inner pages after.
- **Homepage wire:** 19 orphaned sections — some may have broken dependencies. Test each before wiring.
- **3D carousel:** Meech213 pattern requires Three.js or CSS 3D transforms. Choose CSS-first for performance.
- **Kill-ai-slop:** 601 hits — some are intentional brand choices (gold gradients, electric blue). Triage carefully.
- **Stale Cypress:** Delete or rewrite `cypress/e2e/accessibility.cy.ts` — tests deleted homepage sections.
- **Do NOT delete aggressively:** Wire existing code over rewriting. Per user preference.
- **Reference sites:** Luke Baffait (soft/personal), Nudot (3D/technical), Meech213 (3D carousel/editorial), Horeca (condensed type/accordion). Steal patterns, not code.

---

*Plan verified against live codebases + 4 reference sites. Proceed with Phase 1 when ready.*
