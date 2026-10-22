# Homepage redesign v3

Implemented the supplied rich cinematic reference in the production Next.js homepage. All changes are uncommitted. No push, deployment, IndexNow request, or submission script was run.

## Reference and assets

- Used `_design_v3/mockups-v3/index.html`, `app.js`, the supplied desktop/mobile screenshots, and source images. `_design_v3` remains in place and is ignored by Git, ESLint, and TypeScript. Production asset traces contain no reference-folder dependency.
- The supplied local folder does **not** contain `desktop-scroll.mp4` or `mobile-scroll.mp4`; motion was ported from the working reference JavaScript.
- Shipped pre-graded WebP posters in `public/assets/images/graded/`: `hero.webp`, `desk.webp`, `hq.webp`, `corridor.webp`, and `eagle-mark.webp`. The explicit authoring command `node scripts/grade-v3-images.mjs` regenerates them using Sharp. It is not a build/install hook.
- Reused `public/assets/images/props/shield-gold.webp` for the hero, manifesto, and CTA.

## Visual and interaction changes

- Newsreader 400, including its real italic face, and Hanken Grotesk are self-hosted through `next/font`.
- Ported the reference palette, section gradients, SVG grain, glass surfaces, warm/navy photography, diagonal light streaks, shield watermarks, eagle coin, and orbit rings. Styles are scoped to `.v3-home`.
- One homepage motion hook owns `gsap.matchMedia` timelines through `app/lib/motion`. It coordinates with the existing single Lenis provider and cleans up timelines, observers, listeners, and inline state on navigation or preference changes.
- First-session intro lasts approximately 2.6 seconds, stops Lenis, scales the mark, fills the saffron bar, wipes the navy panel, clips the overlay, and settles the hero image. Repeat visits skip it; disabled storage and reduced motion remain usable.
- Desktop hero pins for an additional 120% viewport distance, clips into the inset card, reframes the guard, fades the copy/header, and reveals its caption. Mobile uses light parallax without pinning and hides the video tag.
- Added masked heading reveals, word-by-word manifesto lighting, shield parallax, service-row entrances and hover treatment, and a cursor-following 240 × 160 preview. The preview reserves the entire title column, hover offset, and description margin so adjacent-row titles remain protected. Narrow layouts use an inline preview.
- Credentials open with a clipped image reveal and inner parallax. Floating cards use separate scroll-depth and drift wrappers; decorative pieces disappear and cards stack on mobile. Offscreen/background continuous animations pause.
- Desktop process pins for an additional 150% viewport distance. Its rail, sequential active steps, and counter follow scroll progress. Mobile uses the list as its scrub trigger without pinning.
- CTA buttons are magnetic on desktop. The CTA shield floats, and the body theme follows the section under 55% viewport height through Lenis/native scroll updates.
- `StickyCta` renders the reference circular WhatsApp button with pulse ring on the homepage. Its other-route contact bar remains available.
- Added a keyboard-accessible menu, focus containment/return, background scroll locking, and a skip link. Reduced motion renders final visible content, complete rail, and no pins or intro. The page is also readable with JavaScript disabled.

## SEO, copy, and contact preservation

- Existing metadata, canonical URLs, global organization/business/service graph, breadcrumb machinery, sitemap, robots, `llms.txt`, `ai.txt`, and route URLs remain intact.
- Added homepage FAQ JSON-LD using exactly the visible questions and answers from `data/faq.ts`. The homepage has one h1, followed by h2 section headings; service, fact, workflow, and process card titles are ordinary text.
- Kept crawlable links to all 36 state/UT guides, featured city guides, the full city/state directories, all featured services, calculator, FAQ, blog, and contact routes.
- Editorial content lives in `data/home-v3.ts`; factual values come from the existing config/state/service/FAQ datasets. Delhi's 30–45 day timing is qualified. The ₹25,000 example is the indicative Rajasthan **whole-state government fee**, with additional charges explained. It is not presented as a one-district total quote or a live customer file.
- Hero, floating chat card, CTA, and persistent WhatsApp action use `DEFAULT_WA` / `CONTACT.whatsapp`. Telephone links resolve to `tel:+919983169555`; email resolves to `mailto:info@psaraconsultantindia.com`.

## Video placeholders

`CinematicVideo` supports WebM and MP4 sources, a persistent accessible poster, `preload="none"`, muted inline looping, IntersectionObserver play/pause, background-tab pausing, reduced motion, and failure fallback.

The v3 page is intentionally complete using posters alone. Text marker files reserve future clip slots:

- `public/assets/videos/v3-hero.webm.placeholder`
- `public/assets/videos/v3-hero.mp4.placeholder`

Replace them with genuine `v3-hero.webm` / `v3-hero.mp4` clips and pass the URLs through the component's `sources` prop. The markers are never requested as video. See `public/assets/videos/README-v3.md`. Service preview rows also accept `data-webm` / `data-mp4` when approved clips exist. Pre-existing `hero-loop` videos remain unchanged.

## Verification

- `npm run lint` — passes without warnings. Narrow fixes to pre-existing lint failures are listed below.
- `npm run build` — passes, including TypeScript and 1,379 generated pages.
- `$env:NEXT_PUBLIC_SITE_URL='http://localhost:3100'; npm run validate:jsonld` — passes against the local production build: **738 sitemap URLs, 3,493 valid JSON-LD blocks**. The validator now respects a local server override when sitemap entries retain their production canonical origin.
- Chromium checks at **1440 × 900** and **390 × 844** confirm `document.documentElement.scrollWidth === innerWidth`, one h1, intact contact URLs, no browser runtime errors, working menu/escape behavior, repeat-session intro skipping, two desktop pins, and zero mobile pins. Reduced motion removes both pins and shows the final content/rail.
- Inspected section screenshots and preview bounds. Sampled the floating-card scene through its scroll range for card/title intersections. No content overlap was found in the tested desktop/mobile layouts.
- Captured Chrome DevTools Performance traces while scrolling. Final samples had approximately 16.7 ms median frame intervals, 16.8 ms desktop / 16.7 ms mobile p95, and no long tasks. There was one isolated desktop frame interval over 50 ms and none on mobile; no sustained stalls were observed. Maximum recorded layout/paint/style-update durations were 0.78/1.07/1.06 ms on desktop and 0.53/0.87/0.91 ms on mobile. These are local headless Chromium measurements, not a guarantee for every device. Continuous animation uses transforms/opacity/clip-path; the requested body color transition and short interaction color changes are deliberate exceptions.
- The Impeccable mechanical detector returned `[]` for the changed homepage surface.
- Ran `rg -i 'purple|violet|pink|fuchsia|magenta'` over app/components/styles/lib/data. No matches in new v3 source. Remaining matches are pre-existing comments, class names, and compatibility token names in `styles/tokens.css`, `styles/design-system.css`, `app/globals.css`, and `AmbientCanvas.tsx`; their relevant values map to navy/saffron rather than those colors.
- Local screenshots, the verification script/report, and importable Chrome Performance traces are in the ignored `artifacts/v3/` directory. Load `1440-performance.json` or `390-performance.json` into Chrome's Performance panel for inspection.

## Changed files

| Files | Purpose |
| --- | --- |
| `app/page.tsx` | Complete v3 homepage composition, FAQ/schema, locations, navigation, and contact actions |
| `data/home-v3.ts` | Centralized editorial/UI content with existing operational data |
| `styles/home-v3.css` | Reference composition, scoped visual system, responsive/fallback states |
| `app/components/v3/useV3Motion.ts` | Responsive, scoped homepage animation and teardown |
| `app/components/v3/CinematicVideo.tsx` | Poster-first video playback and accessibility |
| `app/components/providers/SmoothScroll.tsx` | Shared Lenis pause/subscription API and preference handling |
| `app/components/layout/PageTransition.tsx` | Avoid conflicting entrance transforms on the pinned homepage |
| `app/components/layout/StickyCta.tsx` | Homepage circular WhatsApp action and pulse ring |
| `app/layout.tsx`, `styles/fonts.css`, `styles/tokens.css`, `app/globals.css` | Font loading, font variables, canvas color, homepage CSS import |
| `public/assets/images/graded/{hero,desk,hq,corridor,eagle-mark}.webp` | Shipped graded/optimized media |
| `scripts/grade-v3-images.mjs` | Explicit offline poster preparation |
| `public/assets/videos/README-v3.md`, `v3-hero.webm.placeholder`, `v3-hero.mp4.placeholder` | Future video integration instructions and markers |
| `scripts/validate-jsonld.mjs` | Validate local pages despite production sitemap canonical origins |
| `.gitignore`, `eslint.config.mjs`, `tsconfig.json` | Keep the reference folder outside versioned app sources/tooling; ignore local QA artifacts |
| `app/components/sections/CaseyMenu.tsx` | Replace existing untyped font access with `document.fonts` |
| `app/components/sections/HeroStage.tsx`, `ServicesSection.tsx` | Replace existing internal anchors with Next links to clear baseline lint |
| `app/components/sections/HomeContact.tsx` | Remove existing unused import |
| `app/quote/QuoteTool.tsx` | Cancellable initialization frame to clear existing effect-state lint failure |
| `CHANGES_v3.md` | Implementation, placeholders, and validation record |
