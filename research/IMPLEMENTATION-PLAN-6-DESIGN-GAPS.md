# PSARA · 6 Remaining Design Gaps — Priority Implementation Plan

> **Date:** July 26, 2026  
> **Scope:** Priority-ordered plan with effort estimates, file-by-file steps, and prerequisites  
> **Sources:** Luke Baffait `styles_index.css`, Jasmine Gunarto `index.html`, Voyeur Verité patterns  
> **PSARA current:** Next.js 16.2 + GSAP 3.15 + Lenis 1.3 + Three.js (not yet installed)  

---

## Priority Matrix Overview

```
                    HIGH IMPACT
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       │  P0: Font      │  P1: Video     │
       │  (2-3 hrs)     │  Hero (4 hrs)  │
       │                │                │
       │  P0: Preloader │  P1: WebGL     │
       │  Counter (2hr) │  (8-12 hrs)    │
       │                │                │
       ├────────────────┼────────────────┤
       │                │                │
       │  P0: Fluid     │  P1: Contact   │
       │  Line (3 hrs)  │  Blob (4 hrs)  │
       │                │                │
       └────────────────┴────────────────┘
                    LOW EFFORT
```

---

## P0 — High Impact, Low-Medium Effort (Do First)

### 1️⃣ Third Accent Font — ⏱ 2-3 hrs · Effort: 🟡 Medium

**Why:** Luke has 3 fonts (Breton 300 + Zirena 800 + Machine.otf decorative). PSARA currently has 2 (Forma DJR Display + Maison Neue Ext). A third accent font unlocks: decorative footer "PSARA." typography, hero ghost text personality, numbered markers with character, quote pullouts.

#### What To Build

| File | Action | Details |
|------|--------|---------|
| `public/assets/fonts/accent/` | **Create dir** | Store the new .woff2 accent font |
| `styles/fonts.css` | **Add** `@font-face` block | Font name: e.g. "Trap", "Editorial New", or "Aktiv Grotesk Display" — a condensed/display weight only |
| `styles/fonts.css` | **Add** `--font-accent` CSS var | `--font-accent: "Trap", "Editorial New", sans-serif;` |
| `styles/tokens.css` | **Add** accent-only text styles | `.text-accent { font-family: var(--font-accent); }` |
| `app/components/sections/SiteFooter.tsx` | **Apply** to large footer "PSARA." | Replace `font-[family-name:var(--font-display)]` with `font-[family-name:var(--font-accent)]` on the ghost footer typography |
| `app/components/sections/HeroDossier.tsx` | **Apply** to ghost text | Replace display font on `.hero-ghost` decorative text with accent font |

#### Implementation Steps

1. Find a suitable open-source accent font (e.g., **Trap** by Gluk, **Editorial New** by Pangram Pangram, or **Aktiv Grotesk Display**)
   - Needs only 1 weight (700/800/900)
   - Should have personality — condensed, wide, or italic
   - Must be free for commercial use (SIL OFL or similar)
2. Download and convert to .woff2 → place in `public/assets/fonts/accent/`
3. Add `@font-face` with `font-weight: 700` and `font-display: swap`
4. Add `--font-accent` CSS variable to `:root` in `fonts.css`
5. Apply to footer ghost text (`.text-accent` class)
6. Apply to hero ghost text for extra personality

#### Effort Breakdown

| Step | Time |
|------|------|
| Font selection & download | 30 min |
| Convert to woff2 + add to project | 20 min |
| `@font-face` + CSS var | 10 min |
| Apply to footer | 15 min |
| Apply to hero ghost | 15 min |
| QA / build check | 20 min |
| **Total** | **~2 hrs** |

---

### 2️⃣ Preloader Counter Upgrade — ⏱ 2 hrs · Effort: 🟡 Medium

**Why:** Current preloader has a functional percentage counter (direct DOM, no re-renders) and PSARA letter animation. Jasmine's style features on `break/index.html` — a number counter (000→100) with per-digit flip animation. Voyeur has scroll-lock + percentage + progress bar. We should upgrade to a **digit-flip counter** + **smoother bezier-driven progress** instead of the current 33ms interval.

#### What To Change

| File | Action | Details |
|------|--------|---------|
| `app/components/layout/Preloader.tsx` | **Rewrite** counter logic | Replace `setInterval` with GSAP `g.to()` animated object (like `counterStampAnimation` pattern) for silky 60fps counter |
| `app/components/layout/Preloader.tsx` | **Add** digit-flip animation | Each digit (hundreds, tens, units) animates independently with clip/flip effect |
| `app/components/layout/Preloader.tsx` | **Refine** timeline | Tighten total duration to ~2s, sync counter with PSARA char reveal |
| `styles/components.css` | **Add** `.digit-flip` CSS | Clip animation for digit transitions |

#### Current Preloader Analysis

```tsx
// Current (functional, 33ms interval):
let frame = 0;
const totalFrames = 55;
const counterInterval = setInterval(() => {
  frame++;
  const p = Math.min(Math.round((frame / totalFrames) * 100), 100);
  progressRef.current!.textContent = String(p).padStart(3, "0");
  barRef.current!.style.width = `${p}%`;
  if (p >= 100) clearInterval(counterInterval);
}, 33);
```

#### Target Implementation

```tsx
// Target (GSAP-driven, 60fps, composite-friendly):
const { gsap } = ensureGsap();
const counterObj = { val: 0 };

// Animate counter value
gsap.to(counterObj, {
  val: 100,
  duration: 1.8,
  ease: "power3.out",
  onUpdate: () => {
    const p = Math.round(counterObj.val);
    const digits = String(p).padStart(3, "0");
    // Per-digit DOM update via digit refs
    digitRefs.current.forEach((ref, i) => {
      if (ref) ref.textContent = digits[i];
    });
    barRef.current!.style.width = `${p}%`;
  },
});
```

#### Implementation Steps

1. Create `digitRefs` array (3 refs for huns/tens/units) instead of single `progressRef`
2. Replace `setInterval` with `gsap.to(counterObj, { val: 100, ease })`
3. Add subtle digit-flip color animation (`opacity: 0 → 1` per digit with stagger)
4. Sync the `PSARA` character reveal timeline to start at `counter >= 20%`
5. Remove the inline `transition-all` on progress bar (GSAP handles it)
6. Test and tweak timing

#### Effort Breakdown

| Step | Time |
|------|------|
| Refactor refs + DOM structure | 30 min |
| Replace interval with GSAP | 20 min |
| Add digit-flip animation | 25 min |
| Sync PSARA char timeline with counter | 15 min |
| QA mobile / reduced-motion | 15 min |
| Build check | 15 min |
| **Total** | **~2 hrs** |

---

### 3️⃣ Fluid Line SVG — ⏱ 3 hrs · Effort: 🟡 Medium

**Why:** Luke has an organic red stroke line that flows across his about section, reacting to scroll position. PSARA's Philosophy section has parallax imagery + line-by-line reveal but lacks any scroll-driven decorative line. This is a high-visibility, low-JS-cost visual signature.

#### What To Build

| File | Action | Details |
|------|--------|---------|
| `public/assets/images/fluid-line.svg` | **Create** | Organic curved SVG path (bezier curves, ~1500px wide) |
| `app/lib/gsap.ts` | **Add** `initFluidLine()` function | GSAP-driven `stroke-dashoffset` animation synced to scroll position via ScrollTrigger |
| `app/components/sections/Philosophy.tsx` | **Integrate** fluid line | Render SVG above the heading, call `initFluidLine()` in useEffect |
| `styles/components.css` | **Add** `.fluid-line` styles | SVG sizing, position, opacity, viewBox sizing |

#### SVG Line Design

```svg
<svg class="fluid-line" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Organic wave path — gold/amber stroke -->
  <path d="M0 60 C 200 20, 400 100, 600 60 C 800 20, 1000 100, 1200 60"
        stroke="var(--gold)"
        stroke-width="1.5"
        stroke-linecap="round"
        opacity="0.3"
        fill="none"
        stroke-dasharray="1400"
        stroke-dashoffset="1400" />
  <path d="M0 60 C 200 20, 400 100, 600 60 C 800 20, 1000 100, 1200 60"
        stroke="var(--gold)"
        stroke-width="0.5"
        stroke-linecap="round"
        opacity="0.15"
        fill="none"
        transform="translate(0, 8)"
        stroke-dasharray="1400"
        stroke-dashoffset="1400" />
</svg>
```

#### GSAP Implementation

```tsx
export function initFluidLine(
  svgEl: HTMLElement,
  pathSelector = ".fluid-line-path",
  trigger: HTMLElement
) {
  if (!svgEl || !trigger || prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  const paths = svgEl.querySelectorAll<SVGPathElement>(pathSelector);
  if (!paths.length) return;

  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
  });

  gsap.to(paths, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}
```

#### Implementation Steps

1. Create fluid-line.svg with 2-3 organic bezier paths (gold, varying opacities)
2. Add `initFluidLine()` to `gsap.ts` — accepts SVG container + path selector
3. In `Philosophy.tsx`, inline the SVG above the heading section
4. Call `initFluidLine(svgRef.current, ".fluid-path", root.current)`
5. Add responsive considerations: hide on mobile, ensure it's `pointer-events-none`
6. Test scroll scrub alignment with existing parallax

#### Effort Breakdown

| Step | Time |
|------|------|
| Design SVG path (organic bezier curves) | 40 min |
| `initFluidLine()` in gsap.ts | 30 min |
| Integrate into Philosophy.tsx | 25 min |
| Responsive + mobile handling | 20 min |
| QA / build check | 25 min |
| **Total** | **~3 hrs** |

---

## P1 — High Impact, Higher Effort (After P0)

### 4️⃣ Video Hero Background — ⏱ 4 hrs · Effort: 🔴 High

**Why:** Jasmine's hero features an auto-playing muted demo reel — the most visually engaging element on her site. PSARA currently uses a static `.jpg` with overlay gradients. A video hero would: dramatically improve first-visit impact, show real security personnel/operations, and match the cinematic quality of competitors with video content.

#### What To Build

| File | Action | Details |
|------|--------|---------|
| `public/assets/videos/hero-reel.mp4` | **Add video asset** | 10-15s muted loop, dark grade, 1920×1080 @ 30fps |
| `public/assets/videos/hero-poster.jpg` | **Add poster frame** | First frame as fallback image |
| `app/components/sections/HeroDossier.tsx` | **Replace** `<Image>` with `<video>` | Auto-playing, muted, playsinline, poster fallback |
| `app/lib/gsap.ts` | **Add** `initVideoParallax()` | Subtle scale + y-axis scroll scrub on video element |
| `styles/components.css` | **Add** `.hero-video` styles | Positioning, z-index, overlay gradient on top |

#### Hero Video Component

```tsx
{/* Replace current Image with video — Jasmine style */}
<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsinline
  preload="metadata"
  poster="/assets/videos/hero-poster.jpg"
  className="absolute inset-0 w-full h-full object-cover opacity-40 will-change-transform"
>
  <source src="/assets/videos/hero-reel.mp4" type="video/mp4" />
</video>
```

#### Implementation Steps

1. **Source video asset** — options:
   - Have client film 10-15s of security personnel/office operations
   - Purchase stock footage of Indian security guards (poster-frame match needed)
   - Create a montage with transitions + text overlays
2. Optimize video: 1920×1080 → 8Mbps H.264, add `moov atom` at start for fast seeking
3. Create poster frame (first frame saved as .jpg, ~50KB)
4. Replace `<Image>` in `HeroDossier.tsx` with `<video>` element
5. Keep the gradient overlays on top of video (same CSS)
6. Add `initVideoParallax()` for subtle 1.05→1.1 scale on scroll
7. Test: autoplay on mobile (must be muted + playsinline), reduced-motion fallback to poster
8. **SEO**: Add `poster` — this is the static fallback crawlers + reduced-motion users see

#### Video Requirements

| Property | Value |
|----------|-------|
| Duration | 10-15 seconds |
| Format | H.264 MP4 |
| Resolution | 1920×1080 |
| Bitrate | ~8 Mbps |
| File size | < 15 MB |
| Audio | None (muted) — don't include audio track |
| Loop | Seamless loop point |
| Poster | First frame (or hero shot) as 1920×1080 JPEG |

#### Effort Breakdown

| Step | Time |
|------|------|
| Source/create video asset | 1-2 hrs (client dependent) |
| Video optimization + poster | 30 min |
| Component change (Image → video) | 30 min |
| Video parallax function | 20 min |
| Reduced-motion + mobile testing | 20 min |
| Build check | 20 min |
| **Total** | **~4 hrs** (excluding video sourcing) |

---

### 5️⃣ Contact Blob Reveal — ⏱ 4 hrs · Effort: 🔴 High

**Why:** Luke has a white circle that scales up on scroll—entering the contact section is a cinematic moment. PSARA's `HomeContact` currently uses `lineByLineReveal` + `storyEnter` which are functional but not cinematic. The blob creates a frame-like transition into the contact section.

#### What To Build

| File | Action | Details |
|------|--------|---------|
| `app/lib/gsap.ts` | **Add** `initBlobReveal()` function | Scroll-driven circle clip/scale from center, pins until reveal completes |
| `app/components/sections/HomeContact.tsx` | **Integrate** blob reveal | Add SVG blob element, wrap content in blob container, call `initBlobReveal()` |
| `styles/components.css` | **Add** `.blob-reveal` styles | Clip-path circle, overflow hidden, positioning |

#### Blob Reveal Mechanics

```tsx
export function initBlobReveal(
  blobEl: HTMLElement,
  trigger: HTMLElement
) {
  if (!blobEl || !trigger || prefersReducedMotion()) return;
  const { gsap } = ensureGsap();

  // Start: circle at center, 0 radius
  gsap.set(blobEl, {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 1,
  });

  // Expand: circle grows to cover entire section
  gsap.to(blobEl, {
    clipPath: "circle(100% at 50% 50%)",
    ease: "power3.inOut",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "center center",
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
    },
  });
}
```

Note: Luke's approach uses a `<div>` with `position: fixed` and `scale: 0 → 1` transform. The simpler approach for PSARA is to use `clip-path: circle()` which has better compositing and doesn't require position: fixed hacks.

#### Alternative: Scale Approach (Luke's exact pattern)

```tsx
// Luke-inspired: fixed white circle scaling from 0
export function initBlobReveal(
  blobEl: HTMLElement,
  trigger: HTMLElement
) {
  if (!blobEl || !trigger || prefersReducedMotion()) return;
  const { gsap } = ensureGsap();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "center center",
      scrub: 0.8,
    },
  });

  tl.fromTo(blobEl, { scale: 0, opacity: 1 }, { scale: 60, opacity: 0.6 });
  // scale: 60 ensures the circle fully covers the viewport
}
```

#### Implementation Steps

1. Add `initBlobReveal()` to `gsap.ts` (clipPath approach + pinning)
2. In `HomeContact.tsx`: add a `<div className="blob-reveal">` wrapper around the section content
3. Call `initBlobReveal(blobRef.current, root.current)` in useEffect
4. Style the blob: white/cream fill, `pointer-events-none`, z-index between background and content
5. Test: ensure content is readable on top of blob, reduced-motion skips entirely
6. Responsive: simpler effect on mobile (fade instead of circle)

#### Effort Breakdown

| Step | Time |
|------|------|
| `initBlobReveal()` in gsap.ts | 45 min |
| Integrate into HomeContact.tsx | 30 min |
| CSS styling + responsive | 30 min |
| Pin spacing + layout testing | 35 min |
| Reduced-motion guard | 10 min |
| QA + build check | 30 min |
| **Total** | **~4 hrs** |

---

### 6️⃣ WebGL Canvas Hero — ⏱ 8-12 hrs · Effort: 🔴🔴 Very High

**Why:** Luke's hero is a sticky 400vh canvas with WebGL shader rendering a 5-frame image sequence with mouse-reactive distortion. This is the single most technically impressive element on his site. For PSARA, this would mean: mouse-reactive hero image with displacement/distortion, image sequence transition, or Three.js particle system over the hero image.

#### What To Build

| File | Action | Details |
|------|--------|---------|
| `package.json` | **Add** dependency | `three` or custom WebGL wrapper |
| `app/lib/webgl-hero.ts` | **Create** | WebGL canvas manager: render loop, shader uniforms, image texture, mouse interaction |
| `app/components/sections/HeroDossier.tsx` | **Add** `<canvas>` element | Positioned behind content, replaces/aspect of current image |
| `app/lib/gsap.ts` | **Add** scroll-reactive uniform binding | Use GSAP ScrollTrigger to animate shader uniforms on scroll |
| `public/assets/shaders/` | **Create** | GLSL vertex + fragment shader files |
| `public/assets/images/hero-sequence/` | **Create** | Image sequence frames for transition effect |

#### Architecture

```
HeroDossier.tsx
└── <canvas ref={canvasRef} />  ← WebGL canvas (behind content)
    └── webgl-hero.ts
        ├── three.js Scene + Camera + Mesh
        ├── ShaderMaterial with uniforms:
        │   ├── uTexture: hero image
        │   ├── uDisplacement: displacement map
        │   ├── uMouse: vec2 (mouse position, normalized)
        │   ├── uTime: float (for subtle animation)
        │   └── uScroll: float (scroll progress, bound via GSAP)
        ├── Render loop (requestAnimationFrame)
        ├── Mouse handler (throttled)
        └── Scroll handler (via GSAP ScrollTrigger → uniform update)
```

#### Simplified WebGL Manager

```typescript
// app/lib/webgl-hero.ts
export class WebGLHero {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;
  private mouse = { x: 0, y: 0 };
  private scroll = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // init Three.js renderer, scene, ortho camera
    // load texture + displacement map
    // create ShaderMaterial with vertex/fragment shaders
    // start render loop
  }

  setMouse(x: number, y: number) {
    this.mouse.x = x;
    this.mouse.y = y;
  }

  setScroll(progress: number) {
    this.scroll = progress;
  }

  dispose() {
    // cleanup: dispose renderer, geometry, material, texture
    cancelAnimationFrame(this.frameId);
  }
}
```

#### Implementation Steps (Phased)

| Phase | Step | Time |
|-------|------|------|
| **Phase 1: Skeleton** | Install `three`, create `webgl-hero.ts` with mesh + texture | 2 hrs |
| **Phase 2: Shader** | Write vertex/fragment shaders with displacement + mouse uniforms | 2 hrs |
| **Phase 3: Interaction** | Add mouse handler (throttled raf), bind uniforms | 1 hr |
| **Phase 4: Scroll** | Add GSAP ScrollTrigger integration to update `uScroll` uniform | 1 hr |
| **Phase 5: Integration** | Wire into HeroDossier.tsx alongside existing content | 1.5 hrs |
| **Phase 6: Polish** | Fallback for no-WebGL, reduced-motion, mobile (battery), touch | 1.5 hrs |
| **Phase 7: QA** | Test across Chrome, Firefox, Safari, mobile. Build check | 1 hr |
| **Total** | | **~10 hrs** |

#### Considerations

| Concern | Mitigation |
|---------|-----------|
| **Bundle size** | `three` is ~600KB min+gzip. Use tree-shaking: import only `WebGLRenderer`, `Scene`, `OrthographicCamera`, `ShaderMaterial`, `Mesh`, `PlaneGeometry` — target ~150KB |
| **Mobile battery** | Use `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable entirely. Also check `navigator.getBattery()` or use a timeout to disable rendering when not in viewport |
| **WebGL support** | Use `WebGLHero.supported()` static check that tests `document.createElement('canvas').getContext('webgl')` |
| **Fallback** | If WebGL unsupported, fall back to static `<Image>` (current implementation) |
| **Safari** | iOS Safari has WebGL 2.0 + OES_texture_float_linear issues. Use only WebGL 1.0 features, RGBA textures |
| **GSAP vs three** | GSAP animates the `uniforms.uScroll.value` directly, which Three.js reads in the render loop. No animation loop conflicts |
| **Content overlap** | Canvas is `absolute inset-0 pointer-events-none` behind all content overlay gradients |

---

## Dependency Graph

```
P0: Third Font ◄──── (no blockers)
      │
      ▼
P0: Fluid Line ◄──── (no blockers, uses gsap.ts)
      │
      ▼
P0: Preloader ◄────── (no blockers, uses gsap.ts)
      │
      ▼
P1: Video Hero ◄──── (needs video asset + poster)
      │
      ▼
P1: Contact Blob ◄── (uses gsap.ts ScrollTrigger)
      │
      ▼
P1: WebGL Hero ◄──── (needs three package + image assets)
```

**Items in P0 are independent** — can be built in parallel or any order.  
**Items in P1 depend on P0 completion** only for testing/QA ordering, not code level.

---

## Effort Summary Table

| # | Gap | Priority | Effort | Complexity | Dependencies | Risks |
|---|-----|----------|--------|-----------|-------------|-------|
| 1 | Third Accent Font | P0 🟡 | 2-3 hrs | Low | None | Font licensing |
| 2 | Preloader Counter | P0 🟡 | 2 hrs | Low | None | None |
| 3 | Fluid Line SVG | P0 🟡 | 3 hrs | Medium | None | None |
| 4 | Video Hero | P1 🔴 | 4 hrs | Medium | Video asset | Video sourcing |
| 5 | Contact Blob | P1 🔴 | 4 hrs | Medium | None | Pin spacing |
| 6 | WebGL Hero | P1 🔴🔴 | 8-12 hrs | High | Three.js bundle | Safari/WebGL1 |

**Total P0: ~7-8 hrs**  
**Total P1: ~16-20 hrs**  
**Grand Total: ~23-28 hrs** (roughly 3-4 full days)

---

## Recommended Sprint Plan

### Sprint A: "Typography & Atmosphere" (P0 — 8 hrs / 1 day)

| Order | Gap | Time | Outcome |
|-------|-----|------|---------|
| Morning 1 | Third Accent Font | 2 hrs | Footer ghost text uses decorative font, hero ghost text has personality |
| Morning 2 | Fluid Line SVG | 3 hrs | Philosophy section gets organic gold line that draws on scroll |
| Afternoon | Preloader Counter | 2 hrs | Digit-flip counter replaces interval-based counter |
| Buffer | QA + build | 1 hr | All P0 deployed |

### Sprint B: "Cinematic & Interactive" (P1 — 16-20 hrs / 2-3 days)

| Day | Order | Gap | Time | Outcome |
|-----|-------|-----|------|---------|
| **Day 1** | Morning | Video Hero | 4 hrs | Auto-playing muted reel replaces static hero image |
| **Day 1** | Afternoon | Contact Blob | 4 hrs | Circle reveal transition entering contact section |
| **Day 2** | Morning | WebGL Phase 1-2 | 4 hrs | Three.js skeleton + shader with displacement |
| **Day 2** | Afternoon | WebGL Phase 3-4 | 3 hrs | Mouse interaction + scroll binding |
| **Day 3** | Morning | WebGL Phase 5-6 | 3 hrs | Integration + fallbacks + polish |
| **Day 3** | Afternoon | Full QA + build | 2 hrs | Cross-browser, mobile, reduced-motion, bundle size |

---

## Quick File Reference

```
psara-consultant/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Preloader.tsx    ← Preloader counter rewrite (#2)
│   │   └── sections/
│   │       ├── HeroDossier.tsx  ← Video hero + WebGL canvas (#4, #6)
│   │       ├── Philosophy.tsx   ← Fluid line SVG (#3)
│   │       └── HomeContact.tsx  ← Contact blob reveal (#5)
│   ├── lib/
│   │   ├── gsap.ts             ← initFluidLine(), initBlobReveal(), initVideoParallax()
│   │   └── webgl-hero.ts       ← WebGL manager class (NEW) (#6)
│   └── globals.css             ← .mix-difference (already done)
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   │   └── accent/         ← Third font woff2 files (NEW) (#1)
│   │   ├── videos/
│   │   │   ├── hero-reel.mp4   ← Video hero asset (NEW) (#4)
│   │   │   └── hero-poster.jpg ← Video poster fallback (NEW) (#4)
│   │   ├── shaders/            ← GLSL files (NEW) (#6)
│   │   └── images/
│   │       ├── fluid-line.svg  ← SVG path (NEW) (#3)
│   │       └── hero-sequence/  ← WebGL sequence frames (NEW) (#6)
├── styles/
│   ├── fonts.css               ← @font-face for third accent font (#1)
│   ├── tokens.css              ← --font-accent variable (#1)
│   └── components.css          ← .fluid-line, .blob-reveal, .digit-flip styles
└── package.json                ← three dependency added (#6)
```

---

## Success Criteria

### Visual
- [ ] Footer "PSARA." typography has distinct personality from headline (font swap)
- [ ] Philosophy section has organic gold line that draws in as user scrolls
- [ ] Preloader shows smooth 60fps digit counter with flip effect
- [ ] Hero has auto-playing video with smooth gradient overlay
- [ ] Contact section enters with cinematic circle/blob reveal
- [ ] Hero image reacts to mouse movement with subtle displacement

### Technical
- [ ] Build passes with 0 errors (`npx next build`)
- [ ] No SEO regressions (sitemap, robots, meta, schema unchanged)
- [ ] Lighthouse performance: no regression >5 points on any metric
- [ ] Bundle size: three.js imported with tree-shaking < 200KB gzip
- [ ] Reduced-motion: all features degrade gracefully (poster image, static SVG, standard fade-in)
- [ ] Mobile: video autoplays (muted + playsinline), WebGL disabled on mid/low-tier devices

### Anti-AI Detection
- [ ] Code patterns are unique — no copy-paste from tutorials
- [ ] Animation timings use custom `cubic-bezier` values (PSARA's own from `tokens.css`)
- [ ] Font selection is distinctive (not Inter/Poppins — competitors' tell)
- [ ] Copy is specific and factual (already done — maintain this standard)

---

*End of implementation plan*
