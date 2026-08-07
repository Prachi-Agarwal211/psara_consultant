# PSARA Consultant India — Full AI Handoff Instructions

> **Purpose:** Single source of truth so another AI (or developer) can take over without re-discovering context.  
> **Project path:** `C:\Users\15anu\OneDrive\文档\code\psara-consultant`  
> **Today’s date context of this chat:** July 2026  
> **Live site to replace:** https://psaraconsultantindia.com/  
> **New build stack:** Next.js 16 + React 19 + Tailwind CSS 4 + GSAP + Lenis  

**Read this entire file before editing.** Then read the research folders listed below.

---

## 1. Project goal (non-negotiable)

1. **Replace** the existing WordPress site at `psaraconsultantindia.com` with this Next.js app — same business, better design, better SEO/AI visibility.
2. **All real content must survive:** services, offices, phone, WhatsApp, FAQs, states, cities, blog, franchise, legal pages.
3. **Design is not a SaaS template.** It must feel like the **design references** (cinematic, abstract, electric blue, metallic gold, document/license-centric) — not Elementor cards, not muddy navy boxes, not generic AI slop.
4. **Motion is part of the product:** parallax, scroll scrub, pin process, float props, ambient canvas (MAAC-style), word/clip reveals, ticker, magnetic CTAs, custom cursor.
5. **Minimal, abstract, non-conventional:** continuous transparent sections over one ambient field; no heavy card grids; no `01/02/03` chrome; no preloader.
6. **Mobile must work:** left rail collapses; touch-safe CTAs; reduced-motion fallbacks.
7. **SEO + AI citation** must stay strong (schema, llms.txt, state/city pages, GBP consistency).

---

## 2. Business identity (facts)

| Field | Value |
|--------|--------|
| Brand | **PSARA Consultant India** (never abbreviate branding casually) |
| Tagline direction | License expertise / compliance / pan-India |
| Phone / WhatsApp | +91 99831 69555 (`919983169555`) |
| Landline | 0141-4021078 |
| Email | info@psaraconsultantindia.com |
| HQ | Jaipur — C-36, Capital Galleria, Sirsi Road, Kanakpura 302034 |
| Registered office | New Delhi — Statesman House, Barakhamba Road |
| Corporate | Gurugram — MPD Tower, Golf Course Road |
| Other desks | Noida, Ahmedabad, Lucknow, Bhopal, Indore, Raipur, Jodhpur, Chandigarh, Ludhiana (+ config) |
| Source of truth | `lib/config.ts` — **do not invent offices/stats** |
| Google social proof | Use `GOOGLE_REVIEWS` / `AGGREGATE_RATING` in config only |
| ICP | Security agency founders / operators needing PSARA license |
| Primary conversion | **WhatsApp** + call; eligibility quiz secondary |
| Statute | Private Security Agencies (Regulation) Act, 2005 — **state-wise** licensing |

### Services (must exist / expand from data)

From live site + `data/services.ts` (examples):

- PSARA License Registration / Renewal  
- Security Agency Registration / full setup  
- Documentation & Compliance  
- Training Institute MOU  
- Police Verification  
- Company Registration (Pvt Ltd / LLP)  
- ROC Filing / Audit  
- GST Registration & Filing  
- MSME / Udyam  
- Startup India / funding support (as in data)  
- Office space / address support (as in data)  
- Branding / website (if in data)  

### Content architecture targets

- Home, About, Services hub + detail, Contact, FAQ (large), Blog  
- **28+ state pages** (`/states/[slug]`)  
- **200+ city pages** (`/city/[slug]`)  
- Guides (`/[guide]`), Franchise, Privacy, Terms, Disclaimer  
- Programmatic SEO from `data/*.ts` + `lib/seo-content*.ts`  

---

## 3. User requests from this chat (chronological intent)

### 3.1 Capability & scope

- Confirmed AI can create **images and video**.
- User wanted **images/video assets** for backgrounds and floating content.
- Later: **leave video** if API fails — use **MAAC-style animated background** instead of video loops.
- Use **existing logo** only: `public/logo.png` (eagle shield, saffron/green/gold).

### 3.2 Design references (mandatory visual north star)

Folder: `public/design refernces/` (note spelling “refernces”)

- `ChatGPT Image Jul 30, 2026, 10_53_35 PM.png`  
- `ChatGPT Image Jul 30, 2026, 10_55_29 PM.png`  
- Also: `public/hero background.png` (product still — documents/license stage)  

**What the references demand:**

| Element | Requirement |
|---------|-------------|
| **Hero layout** | Logo top-left; **left vertical menu**; headline mid-left; **main showcase right** (PSARA license plaque + gov building + India energy ribbons); phone top-right; scroll cue bottom-right |
| **Background** | Deep **electric-lit** space — not muddy flat navy; soft **electric blue** glows; gold particle dust; saffron/green energy **only as motion trails**, not flag clipart spam |
| **Typography** | **White** body; **metallic gold** accents (champagne metal — **not yellow mustard**) |
| **Structure** | Continuous dark story canvas; sections transparent over ambient |
| **Services** | Vertical list + cinematic visual (stamp/docs swirl) — **not** 3-column card grids |
| **Process** | Journey/path/light — **no big 01/02/03 template chrome** (user explicitly hates numbers) |
| **Tone** | Consultancy + documents + trust — **minimal, not over-arty** |
| **Not allowed** | Traditional grids/boxes as main language; stock guard/handshake farms; pure white SaaS sections |

### 3.3 What user rejected about prior work

- “Current project is completely bullshit” for **design** (content/data exists).
- Generated product-table images = **AI slop**, not reference DNA.
- Wrong blue (too deep/muddy, not **electric**).
- Wrong gold (yellow, not **metallic**).
- No real motion/parallax/content flow.
- Components with their own solid backgrounds breaking the continuous stage.
- Over-engineering side quests (ffmpeg, workflows) instead of Imagine assets + design.
- **Did not fully use** `ai research prompts` library until called out.

### 3.4 Research libraries the user ordered to use

| Path | Role |
|------|------|
| `C:\Users\15anu\OneDrive\文档\code\ai research prompts\` | Master design/SEO/motion/creativity bible |
| `...\ai research prompts\kill-ai-slop\` | Anti-AI-slop scan + taxonomy + fixes |
| `C:\Users\15anu\OneDrive\文档\code\website-downloader\` | Downloaded award/reference sites for section DNA |
| `C:\Users\15anu\OneDrive\文档\code\maac prachi\` | Ambient background animation reference (`DynamicBackground`) |
| Also mirrored under | `psara-consultant/ai research prompts/` |

### 3.5 Feature asks still in force

- Deep **GSAP** motion: parallax, pin, scrub, stagger, float, mouse parallax  
- **Lottie** optional (shield pulse exists under `public/assets/animations/`)  
- Floating **SVG/PNG without backgrounds** for props  
- Cool **fonts** — never Inter/Roboto/Poppins/Montserrat  
- Hover / **custom cursor** / micro-interactions  
- **Mobile design**  
- **All pages**, not just home  
- Full instructions MD for handoff (this file)

---

## 4. Design DNA (locked decisions)

### 4.1 Color system (current tokens: `styles/tokens.css`)

```
--void / --void-2 / --space     deep electric void (#020814 family)
--electric / --electric-2       #0066FF / #1A7BFF  (PRIMARY electric blue)
--gold / --gold-bright          metallic champagne (#D4B872 / #E8D5A3)
--metal-1..4                    metallic ramp for .text-metal gradient
--white / --white-70 / --white-40  pure white hierarchy
--saffron / --india-green       ambient energy only
```

**Rules:**

- Continuous ambient field; **sections stay `background: transparent`**.
- Headlines: white + **`.text-metal`** for key phrases.
- Body: white ~70% opacity.
- CTAs: metallic gold fill (dark text) or gold outline.
- Do **not** invent pastel cards, glassmorphism farms, or indigo→violet gradients.

### 4.2 Typography

Local fonts only (`public/assets/fonts/` + `styles/fonts.css`):

| Role | Face |
|------|------|
| Display | **Forma DJR Display** |
| Body | **Maison Neue Ext** |
| Accent | **Syne** (variable) |

**Banned:** Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, default system-as-brand.

### 4.3 Layout / UX patterns

- **Home:** no sticky top bar; left vertical rail + mobile hamburger only (`SiteChrome` home branch).
- **Inner pages:** thin translucent header + `PageHero` + `PageMain` inside `StageShell`.
- **StageShell** (`app/components/ui/StageShell.tsx`): AmbientCanvas + optional auto-motion + footer.
- **Home** uses `StageShell autoMotion={false}` — home owns GSAP via HeroStage/HomeStory.
- No preloader / no PageLoader (removed by request).

### 4.4 Motion system (`app/lib/motion.ts` + `app/lib/gsap.ts`)

Implement / extend these (research: technique-catalogs 02, 04, 06; cinematic-easings; Luke/Collab/MAAC):

| API | Purpose |
|-----|---------|
| `initParallaxLayers` | `[data-speed]` multi-layer parallax |
| `initClipReveals` | `[data-clip]` clip-path reveals (not fade-only) |
| `initWordReveal` | Manual word split rise |
| `initMarquee` | Horizontal ticker |
| `initPinnedProcess` | Desktop pin + scrub process |
| `initFloatDrift` | `[data-float]` ambient float |
| `initMouseParallax` | Mouse depth on prop layers |
| `initStaggerChildren` | `[data-stagger]` |
| `initVisualScrub` | `[data-scrub-visual]` scale/opacity scrub |

**Always** respect `prefers-reduced-motion`.

### 4.5 Ambient background

`app/components/ui/AmbientCanvas.tsx` — MAAC-style continuous canvas:

- Fixed full-viewport behind content  
- Electric blue fluid pockets + metal dust + soft saffron/green edge energy  
- Mouse-reactive  
- Desktop animated; mobile CSS fallback  

**Do not** put solid section backgrounds that kill the ambient field.

### 4.6 Assets

| Path | Use |
|------|-----|
| `public/logo.png` | Brand only |
| `public/assets/images/cinematic/*.jpg` | Stage stills (hero, about, services, process, presence, contact) |
| `public/assets/images/float/*.svg` | Transparent floating props (certificate, stamp, doc, shield) |
| `public/design refernces/*` | **Visual QA** — open and compare always |
| `public/assets/videos/` | Optional; video API may fail (ZDR / rate limits) — prefer ambient |

**Imagine / image tools:** when regenerating, edit **from design references**, not generic “luxury certificate on marble” product shots.

### 4.7 Anti-slop (mandatory)

Tool:  
`ai research prompts/kill-ai-slop/skill/scripts/scan.mjs`

```bash
node "…/kill-ai-slop/skill/scripts/scan.mjs" "…/psara-consultant" \
  --exclude="ai research prompts" --exclude="node_modules" --exclude=".next"
```

Kill or defend:

- Kickers restating every H2  
- Card grids as main language  
- `01/02/03` decorative markers  
- Gradient-clip rainbow headlines (metallic gold is a **brand choice** — keep restrained)  
- Glass + max radius farms  
- Invented stats (only config/GBP numbers)  
- AI copy voice (“seamless experience”, “not just X”)  

---

## 5. Research sources — what to read (order)

### 5.1 Always first (design/motion)

1. `ai research prompts/00-MASTER-AGENT-ONBOARDING.md`  
2. `07-PRE-CODING-RESEARCH-PROTOCOL.md`  
3. `01-DESIGN-REVOLUTION-BIBLE.md`  
4. `04-COLOR-GRADIENT-PSYCHOLOGY-DEVICES.md`  
5. `12-STRICT-RULES-AND-CONSTRAINTS.md`  
6. `13-ANTI-GENERIC-PRE-LAUNCH.md`  
7. `02-CREATIVE-CODING-ENGINEERING.md`  
8. `05-TECHNIQUE-INVENTORY-AND-RESEARCH-2026.md`  
9. `resources/technique-catalogs/02-scroll.md`  
10. `resources/technique-catalogs/04-text-animations.md`  
11. `resources/technique-catalogs/06-atmosphere.md`  
12. `resources/code-patterns/cinematic-easings.ts`  
13. `resources/anti-slop-system/*` + **kill-ai-slop**  
14. PSARA-specific: `34`–`40` (redesign comparison, Jasmine/Luke, color plan, gap analysis)  

### 5.2 Website-downloader (section inspiration)

Path: `C:\Users\15anu\OneDrive\文档\code\website-downloader\`

| Folder | Steal carefully |
|--------|-----------------|
| `lukebaffait/` | Scroll narrative, rail, cursor energy, GSAP scrub |
| `collabcapitolium_backup/` | Pin sections, luxury type, marble/atmosphere |
| `maac prachi` (separate repo) | `DynamicBackground` fluid ambient |
| `enerblock_backup/` | Bold industrial sections, brand mark motion |
| `depoluxe_backup/` | Editorial portfolio flow |
| `airfield_backup/` | Section color alternation / atmosphere |
| `ordernchaos_backup/` / `outfit_backup/` | Experimental layout |

**Adapt, don’t clone.** Industry is compliance consultancy, not fashion portfolio.

### 5.3 SEO / business research (content truth)

- `lib/config.ts`, `data/*.ts`  
- `research/CONTENT-ARCHITECTURE.md`, `MASTER-PLAN.md`  
- `ai research prompts/16-SEO-AND-CONTENT-STRATEGY.md`, `28-MASTER-SITE-BUILD-BLUEPRINT`, `29-FULL-AI-VISIBILITY`  
- Live site scrape facts already partially in `research/live-site-facts.json`  

---

## 6. Current codebase map (as of handoff)

### 6.1 Key entry points

| File | Role |
|------|------|
| `app/page.tsx` | Home → StageShell + HeroStage + HomeStory |
| `app/layout.tsx` | Root layout, schema JSON-LD, SmoothScroll, SiteChrome, CustomCursor, ScrollProgress — **no preloader** |
| `app/components/ui/AmbientCanvas.tsx` | Fixed electric ambient |
| `app/components/ui/StageShell.tsx` | Ambient + footer + optional auto-motion |
| `app/components/sections/HeroStage.tsx` | Reference hero |
| `app/components/sections/HomeStory.tsx` | About → services → pin process → proof → presence → contact |
| `app/lib/motion.ts` | Motion primitives |
| `app/lib/gsap.ts` | GSAP + ScrollTrigger helpers |
| `components/SiteChrome.tsx` | Home: mobile menu only; inner: sticky header |
| `components/PageShell.tsx` | PageHero / PageMain / Prose for inner routes |
| `styles/tokens.css` | Design tokens + legacy aliases |
| `styles/fonts.css` | Local font faces |
| `styles/components.css` | Buttons, forms, cursor, noise, sp-active |
| `lib/config.ts` | Business truth |
| `data/services.ts`, `states.ts`, `cities.ts`, `faq.ts`, `blog.ts`, `guides.ts` | Content |

### 6.2 Routes expected to use StageShell

Home, about, services, services/[slug], contact, faq, states, states/[slug], cities, city/[slug], blog, blog/[slug], [guide], franchise, privacy, terms, disclaimer, google, not-found.

**If a page still uses old white cards / warm-dark boxes:** restyle to transparent stage + metal CTAs.

### 6.3 Known technical hazards

| Hazard | Mitigation |
|--------|------------|
| **lightningcss.win32-x64-msvc.node missing** | Run `node scripts/fix-lightningcss.js` after `npm install` (postinstall). Windows needs win32 binary; WSL installs Linux only. |
| Dual OS (WSL + Windows PowerShell) | Prefer **one** environment for `npm install` (Windows for local preview). |
| Stuck `next dev` | Kill PID / free ports 3000–3010; delete `.next/dev/lock`. |
| StageShell open/close mismatch | Ensure every `<StageShell>` has `</StageShell>` (TS will catch broken JSX). |
| Double GSAP on home | Keep `autoMotion={false}` on home StageShell. |

### 6.4 Dev commands

```powershell
cd C:\Users\15anu\OneDrive\文档\code\psara-consultant
node scripts\fix-lightningcss.js
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
# → http://localhost:3000
```

---

## 7. Content replacement checklist (live site parity)

Pull from live site + config/data; never invent:

- [ ] All service pages with real process/FAQs  
- [ ] About narrative matching live “who we are / what we do”  
- [ ] Contact: all offices + hours + phones  
- [ ] FAQ volume (55–100+ questions in data)  
- [ ] State pages: authority, process notes, unique copy  
- [ ] City pages: local intent unique copy  
- [ ] Blog posts + covers  
- [ ] Franchise (Silbar partnership content as currently written)  
- [ ] Legal: privacy, terms, disclaimer  
- [ ] NAP consistency with GBP for SEO  

**Conversion blocks on every major page:** WhatsApp + call.

---

## 8. SEO / AI visibility requirements

Keep and improve:

- Titles ~≤60 chars; meta descriptions ~≤160  
- Organization + ProfessionalService + FAQ + Breadcrumb schemas  
- `public/llms.txt`, `robots.ts` AI crawlers allowed  
- Wikidata / sameAs where configured  
- Speakable where already present  
- State/city programmatic SEO without thin duplicate templates  
- Real `aggregateRating` only from config  

Do **not** break sitemap/robots/metadata generators in `app/sitemap.ts`, `lib/metadata.ts`.

---

## 9. Mobile design requirements

- Hero: stack type; hide left rail; keep logo + phone; floating props optional hide  
- Thumb CTAs: WhatsApp/call ≥44px hit area  
- Pin process: **disable pin on mobile** (already gated `< 900px` in motion)  
- Ambient: CSS fallback on small screens / reduced motion  
- SiteChrome home: hamburger menu only  
- Test: iPhone SE width + Android Chrome  

---

## 10. What still needs to be built / improved (backlog)

Prioritize in this order unless user redirects:

### P0 — Correctness & polish

1. Visual QA every breakpoint against **design references** (side-by-side).  
2. Kill remaining legacy dossier components if unused (HeroDossier, old grids) or restyle.  
3. Franchise / blog detail / state detail pages: remove leftover warm-dark card chrome.  
4. Forms: ensure WhatsAppForm + ContactForm fully match stage (labels, select arrows).  
5. Custom cursor: verify magnetic hover on CTAs/links (Luke-inspired).  
6. Accessibility: focus rings, contrast on metal text, reduced motion.  

### P1 — Motion & creativity

1. Stronger hero entrance (line/word mask, plaque float).  
2. Section-to-section transitions (clip-path / curtain — Luke).  
3. Process pin feel more “story” (step copy crossfade).  
4. Presence: animated city name drift / map glow without grid.  
5. Horizontal scroll story section optional (award-site technique).  
6. Hover previews / cursor label on service rows.  
7. Scroll progress rail labels update with active section (already partial).  

### P2 — Content depth

1. Unique state/city paragraphs (no template filler).  
2. More authentic metrics only if verified.  
3. Hindi/Hinglish content strategy (MASTER-PLAN) if still required.  
4. Video assets strategy (research VIDEO-ASSETS-STRATEGY) when Imagine/video pipeline available.  

### P3 — Components library to create/expand

Suggested stage components:

- `RevealWords`, `ParallaxFigure`, `ServiceIndexRow`, `OfficeFlow`, `ProcessPath`, `MetalButton`, `StageForm`, `StickyWhatsApp`, `ChapterDivider` (gold hairline only), `MarqueeBand`  
- Cursor modes: default / text / magnetic / “WhatsApp”  
- Page transition (View Transitions or soft opacity)  

### P4 — SEO ops

- Search Console / Bing submission  
- GBP NAP audit  
- llms.txt freshness  

---

## 11. How another AI should work (operating protocol)

1. **Read this file completely.**  
2. **Open design references** and compare to localhost.  
3. **Read** `12-STRICT-RULES` + kill-ai-slop scan (exclude research noise).  
4. **Do not** invent business facts — only `lib/config.ts` + `data/*`.  
5. **Prefer editing shared systems** (`tokens`, `motion`, `StageShell`, `PageShell`) over one-off page hacks.  
6. **Subtract before decorating** (kill-ai-slop principle).  
7. **One vertical at a time:** e.g. “home motion only” or “states hub restyle only”.  
8. **After install on Windows:** `node scripts/fix-lightningcss.js`.  
9. **Typecheck:** `npx tsc --noEmit`.  
10. **Never** reintroduce: preloader spam, 01/02 chrome, Inter, white card grids as home language, yellow mustard gold, muddy section stacks.

---

## 12. Prompt bank (user intent, condensed)

Use these as regression tests for “done”:

1. “Does the hero match the design references: left rail, metal gold headline, license showcase right, electric ambient?”  
2. “Is the background continuous animated electric blue — not solid gray/navy boxes?”  
3. “Is gold metallic champagne, not yellow?”  
4. “Are services a list + visual, not a card grid?”  
5. “Is process a path/pin without big numbers?”  
6. “Is WhatsApp one tap away on mobile?”  
7. “Does every page share StageShell ambient DNA?”  
8. “Did we scan kill-ai-slop excluding research folders?”  
9. “Is all content replaceable from live site + config?”  
10. “Did we use ai research prompts techniques (scroll, text, atmosphere) for real motion?”  

---

## 13. Chat history summary (this session)

| Phase | Outcome |
|-------|---------|
| Capabilities | Images/video yes |
| Deep research ask | Project + refs + live site + research prompts |
| Design plan | “License Stage” continuous narrative |
| Assets | Cinematic stills + float SVGs; video API limited → ambient canvas |
| Redesign iterations | Hero/HomeStory/StageShell/tokens rewrite for electric + metal |
| kill-ai-slop | Scanned; home + legacy hits reported |
| Motion deep pass | motion.ts, pin process, ticker, parallax, all pages StageShell |
| Fixes | StageShell JSX closes, token aliases, CtaBar, forms, blog list, scroll rail IDs |
| This file | Full handoff for next AI |

---

## 14. Success definition

The site is “done” for the user when:

- Side-by-side with `public/design refernces/*` feels like **same product family** (better, not different template).  
- Ambient **electric** motion is obvious; sections feel **floating** on one stage.  
- Type is **white + metallic gold**; logo correct.  
- Full content parity with live consultancy site + strong SEO.  
- Motion is deep but performant; mobile solid; anti-slop clean.  
- Conversion: WhatsApp/call dominate without clutter.

---

## 15. File to keep updating

**Update this document** when:

- Design tokens change  
- New components ship  
- Content sources change  
- User adds new non-negotiables  

Path: `psara-consultant/AI-HANDOFF-INSTRUCTIONS.md`

---

*End of handoff. Start by reading design references + `styles/tokens.css` + `app/page.tsx` + `app/lib/motion.ts`, then run the site and kill-ai-slop scan before any large redesign.*
