# Motion & Design Comparison: Luke Baffait vs Jasmine Gunarto vs PSARA

> **Date:** July 26, 2026  
> **Scope:** Deep code-level comparison of CSS, motion pipelines, animation philosophy, typography systems, and micro-interactions  
> **Source files analyzed:** Luke's `styles_index.css` + 3 JS bundles, Jasmine's `index.html` + block templates, PSARA's `gsap.ts` + `components.css` + `tokens.css`

---

## 1. TYPOGRAPHY SYSTEM COMPARISON

| Dimension | **Luke Baffait** | **Jasmine Gunarto** | **PSARA (us)** | **Gap** |
|-----------|-----------------|-------------------|----------------|---------|
| **Display Font** | Breton (300 weight, custom) + Zirena (800 weight) | MG (Mark Grafix?) — BiU9, BdR8, DCIQ variants | Forma DJR Display (400/500/700) | ✅ Close match — custom variable font |
| **Body Font** | Inter (600 weight, uppercase) | System/Google Fonts | Maison Neue Ext (400/700) | ✅ Better than Inter |
| **Accent Font** | "other" (Machine.otf) — unique decorative font | Same as display | N/A | ❌ PSARA lacks a third accent/decorative font |
| **Luke's approach**: 3 fonts: Breton (elegant display), Zirena (heavy display 800), "other" (decorative/ASCII art).  
**Jasmine's approach**: 1 font family with 3 weights (Book, Bold, ExtraBold).  
**PSARA**: 2 fonts (Forma DJR Display + Maison Neue Ext) — needs a third accent/display font for decorative moments like the footer "PSARA." typography.

---

## 2. HERO SECTION COMPARISON

| Feature | **Luke Baffait** | **Jasmine Gunarto** | **PSARA (us)** |
|---------|-----------------|-------------------|----------------|
| **Hero type** | Sticky 400vh canvas with WebGL shader/image sequence | Auto-playing video demo reel + split typography | Static image with GSAP parallax + ghost text |
| **Background** | 5-frame hero_seq_0001-0005.jpg sequential images → WebGL canvas | .mp4 video (full-screen auto-playing) | Single .jpg with overlay gradients |
| **Loading** | Preloader: "LUKE" → "BAFFAIT" character-by-character with dot transition | Preloader: number counter (000→100) + overlay | Brand seal preloader with scale animation |
| **Title animation** | Split-word from bottom, yPercent: 110, stagger | hg-1 class with heading-display wrapper, caption side text | Split-words from yPercent: 110, stagger 0.07, cinematic ease |
| **Scroll behavior** | `scroll-wrap` 400vh, hero sticky top 0 | Custom smooth scroll wrapper | Lenis smooth scroll + GSAP ScrollTrigger |
| **Index/nav** | No nav in hero | Header with location/time/coords | Left dossier nav with numbered index + character hover |

### Key PSARA advantage: Dossier navigation index is a feature neither Luke nor Jasmine have.  
### Key PSARA gap: No video background, no WebGL/canvas, no preloader number counter.

---

## 3. ANIMATION & MOTION PIPELINE COMPARISON

| Technique | **Luke Baffait** | **Jasmine Gunarto** | **PSARA (us)** | **PSARA Status** |
|-----------|-----------------|-------------------|----------------|-----------------|
| **Title reveal** | Word-split: `yPercent: 110` → 0, stagger 0.07, ease cinematic, delay 0.2 | Line-by-line: `t-line-mask` with clip-path/opacity reveal | Word-split: `yPercent: 110` → 0, stagger 0.07, ease cinematic, delay 0.2 | ✅ **Exact match** |
| **Character hover** | `.chr-hover` with `.ch-top`/`.ch-bot` transition 0.6s cubic-bezier(0.87,0,0.13,1), delay `var(--i) * 28ms` | Not used | `.chr-hover` with `.ch-top`/`.ch-bot` transition 0.45s cubic-bezier(0.87,0,0.13,1), delay `var(--i) * 22ms` | ✅ **Adapted**, slightly faster (0.45s vs 0.6s) |
| **Image hover reveal** | `.reveal-image-wrap` with scale 0→1 + corner brackets on project transitions | Video auto-play on hover (`t-card-hover-media`) + image switch | Image opacity reveal on hover (`state-brief-preview`) | ⚠️ Different approach; PSARA uses opacity, Luke uses scale |
| **Section transitions** | `.t-panel-red` + `.t-panel-dark` translating from bottom (page transitions) | Custom `wp-block-app-block-transition-*` with caption + title + media | clip-path wipe variants (left/right/up) + blur | ✅ Different but equally sophisticated |
| **Counter animation** | N/A | N/A | GSAP `counterStampAnimation` with scale punch | ✅ Unique to PSARA |
| **Parallax** | Full-site 400vh scroll + hero sticky | Data-parallax on card media (8px offset) | Scroll-driven image scale + blur-in via ScrollTrigger | ✅ Similar approach |
| **Lenis scroll** | `vendor_lenis.min.js` | Custom `data-scroll-wrapper` | Lenis + GSAP integration | ✅ Match |
| **Preloader number** | N/A | 000→100 number counter per digit | Brand seal scale reveal | ❌ Jasmine's counter effect is missing |
| **WebGL/Canvas** | Full hero canvas with image sequence rendering | N/A | N/A | ❌ **Major gap** — no WebGL |
| **Project detail transitions** | Flying text animation, work-flying-text class | Popup slider with embla carousel | N/A (no project pages) | ❌ Not applicable |
| **Scroll progress** | Right-rail `.scroll-timeline` segment bar + left scroll-pct | N/A | Right-rail `.sp-segment` dots | ✅ **Better** — PSARA has it, Jasmine doesn't |
| **Live clock** | N/A | Header: `<div class="time"></div>` | Footer: `initLiveClock()` with IST | ✅ **Better** — functional clock |

---

## 4. CSS ARCHITECTURE COMPARISON

| Pattern | **Luke Baffait** | **Jasmine Gunarto** | **PSARA (us)** |
|---------|-----------------|-------------------|----------------|
| **CSS custom properties** | Minimal (none visible in CSS) | Extensive (`--cl-page-*`, `--cl-*` brand colors) | **Extensive** (tokens.css: 60+ CSS vars for colors, typography, motion, layout) |
| **Animation easings** | `cubic-bezier(0.87, 0, 0.13, 1)` — the signature Luke ease | Not visible in CSS (JS-driven) | `cubic-bezier(0.16, 1, 0.3, 1)` expo, `(0.25, 1, 0.3, 1)` smooth, `(0.125, 0.425, 0.27, 1)` cinematic |
| **clamp() usage** | Extensively used for responsive font sizes | Minimal | **Extensively used** — every text token uses clamp() |
| **Mix-blend-mode** | `difference` on hero content (critical for light-on-dark) | N/A | N/A |
| **Will-change** | `will-change: transform` on animated elements | N/A | `will-change: transform` on parallax and tilt elements |
| **Container queries** | N/A | N/A | N/A |
| **Layer system** | z-index: 10000–30050 (extensive stacking) | N/A | z-index: 5–9999 (moderate stacking) |
| **CSS cubic-bezier** | `(0.87, 0, 0.13, 1)` — Luke's signature bounce-less ease | N/A | Three distinct easings in tokens.css |

### Key difference: Luke uses **CSS transitions** for character hover (0.6s with per-character delay) while PSARA uses the same pattern but faster (0.45s).  

### Key gap: Luke uses `mix-blend-mode: difference` on hero text, which PSARA does not — this creates the iconic "text reads through dark gradients" effect.

---

## 5. MICRO-INTERACTION COMPARISON

| Interaction | **Luke Baffait** | **Jasmine Gunarto** | **PSARA (us)** | **PSARA Status** |
|------------|-----------------|-------------------|----------------|-----------------|
| **Navigation hover** | Character-split animation (top slides up, bottom slides in from below) | Basic color/text change | Character-split animation based on Luke's pattern | ✅ **Adapted** |
| **Card hover** | Project preview image appears in fixed position with 3D tilt | Video auto-plays on card hover + image swap | Image opacity reveal + vignette dimming on sibling cards | ✅ **Unique approach** |
| **Button hover** | N/A | N/A | Magnetic button (cursor pull effect) | ✅ **Unique** |
| **Custom cursor** | `.proj-cursor` — fixed pill with text label on project items | N/A | Gold dot + ring with per-element cursor labels | ✅ **More comprehensive** |
| **Award item hover** | Background fill with clip-path reveal (0→100%) | N/A | N/A | ❌ Clip-path fill reveal would be cool on state list items |
| **3D tilt** | Perspective 800px on project card | N/A | Perspective 1000px on feature cards | ✅ **Adapted** |
| **Scroll indicator** | segment bar on right rail + percentage left | Scroll-down text in hero | Scroll progress rail (right side dots) | ✅ **Similar** |
| **Back to top** | N/A | N/A | Footer button with smooth scroll | ✅ **Unique** |

---

## 6. DECORATIVE SYSTEM COMPARISON

| Decoration | **Luke Baffait** | **Jasmine Gunarto** | **PSARA (us)** | **PSARA Status** |
|-----------|-----------------|-------------------|----------------|-----------------|
| **Corner brackets** | `reveal-corner` / `frame-corner` — CSS-only (::before + ::after pseudo-elements) | SVG corner-ornament brackets | `CornerOrnament` React component with SVG | ✅ **Better** — DRY component vs inline |
| **Ornament chain** | N/A | Line-ornament container (three stacked lines) | `.ornament-chain` with `.t-line__1`/`__2`/`__3` | ✅ **Adapted** |
| **Section heading frame** | N/A | i-line + caption + tag | `.section-heading-frame` with `.i-line` + caption | ✅ **Adapted** |
| **Side caption** | N/A | caption-1/caption-2 on heading-display | `.side-caption` with vertical-rl writing mode | ✅ **Adapted** |
| **Numbered markers** | N/A | Card numbers (01, 02) | `.num-marker` (01–12) throughout | ✅ **Adapted** |
| **Ghost/watermark text** | N/A | Hero has overlay typography | Ghost display text in hero + footer | ✅ **Adapted** |
| **Tag chips** | N/A | t-tag | `.tag-chip` | ✅ **Adapted** |
| **ASCII art** | `.footer-ascii pre` with large ASCII art block | N/A | N/A | ❌ Unique to Luke |
| **Marquee text** | N/A | `t-marquee-item` (LET'S TALK) | `.footer-marquee`, `.state-briefs-marquee` | ✅ **Adapted** |
| **Fluid line SVG** | Red organic stroke line across about section | N/A | N/A | ❌ Unique visual signature |
| **Contact blob** | White circle scaling up on scroll | N/A | N/A | ❌ Unique scroll-driven reveal |

---

## 7. WHAT PSARA HAS THAT NEITHER LUKE NOR JASMINE HAS

| Feature | Description | Source |
|---------|-------------|--------|
| **Dossier navigation index** | Left sidebar with numbered links and corner ornaments | Unique |
| **Magnetic buttons** | Buttons that subtly follow cursor position | Unique |
| **Counter stamp animation** | Numbers animate with bounce scale on scroll | Unique |
| **Live IST clock** | Footer shows current Indian time | Unique |
| **Section clip-path transitions** | 5 variants of clip-path wipes between sections | Unique |
| **Custom cursor with labels** | Gold cursor ring + dot + per-element text labels | Unique |
| **Noise texture overlay** | SVG fractal noise at 3.8% opacity over entire page | Unique |
| **12 real office addresses** | Verifiable physical desks across India | Unique content |
| **300+ unique pages** | States, cities, services, guides with specific content | Unique scale |
| **prefers-reduced-motion guard** | Every animation function checks this | ✅ Best practice |
| **Security headers + CSP** | HSTS, X-Frame-Options, Permissions-Policy | ✅ Production-ready |
| **FAQPage schema** | JSON-LD structured FAQ in homepage head | ✅ SEO advantage |

---

## 8. REMAINING GAPS (What to Steal Next)

### Priority 1 — High Impact, Low Effort

| Pattern | Source | Implementation | Effort |
|---------|--------|---------------|--------|
| **mix-blend-mode: difference on hero text** | Luke | Add to hero heading for text readability over dark gradient backgrounds | 🟢 10 min |
| **Accent/decorative third font** | Luke (Machine.otf) | Add a display-weight-only font for footer "PSARA." and hero ghost text | 🟡 2 hrs |
| **Preloader number counter** | Jasmine | Replace/upgrade current preloader with digit-by-digit counter | 🟡 1 hr |

### Priority 2 — Medium Impact, Medium Effort

| Pattern | Source | Implementation | Effort |
|---------|--------|---------------|--------|
| **Hover video preview on cards** | Jasmine | Add muted auto-playing mp4 on state card hover instead of static image | 🟡 2 hrs |
| **Award-list clip-path fill** | Luke | Add clip-path background fill on hover for state list items or FAQ items | 🟡 1 hr |
| **Fluid line SVG** | Luke | Add a decorative SVG path following scroll position in the about/philosophy section | 🟡 3 hrs |

### Priority 3 — High Impact, High Effort

| Pattern | Source | Implementation | Effort |
|---------|--------|---------------|--------|
| **Video hero background** | Jasmine | Replace static hero image with auto-playing muted demo reel + poster fallback | 🔴 4 hrs |
| **WebGL canvas hero** | Luke | Implement Three.js or custom WebGL for hero image with mouse-reactive distortion | 🔴 8+ hrs |
| **Contact blob / circle reveal** | Luke | Add scroll-driven white circle scale-up transition entering contact section | 🔴 3 hrs |
| **Flying text transitions** | Luke | Add flying text animation between page/section transitions | 🔴 4 hrs |

---

## 9. SUMMARY

### PSARA vs Luke Baffait
- **Where PSARA wins**: Custom cursor, magnetic buttons, dossier nav index, section clip transitions, live clock, 300+ pages, SEO/schema
- **Where Luke wins**: WebGL hero, ASCII art, fluid line, mix-blend hero text, page transition panel animations (red+dark), flying text, contact blob, award clip-path fill
- **Key gap**: No `mix-blend-mode: difference` on hero text, no WebGL, no ASCII art, no fluid SVG line

### PSARA vs Jasmine Gunarto
- **Where PSARA wins**: Custom cursor, scroll progress, section transitions, numbered markers throughout, live clock, GSAP orchestration
- **Where Jasmine wins**: Video hero, preloader counter, hover video cards, heading-display with dual caption + title per line, popup slider gallery
- **Key gap**: No video hero, no number counter preloader, no hover video on cards, no dual-caption heading pattern

### Verdict
PSARA has **borrowed the best** from both sites:
- **From Luke**: Character hover nav, split-word title reveal, cubic-bezier signature ease, 3D card tilt, scroll progress
- **From Jasmine**: Corner ornaments, ornament chain, section heading frames, side captions, numbered markers, tag chips, marquee text, card glow hover

**What's still missing**: video hero, WebGL, mix-blend hero text, third accent font, preloader counter, fluid line SVG, hover video cards, contact blob reveal
