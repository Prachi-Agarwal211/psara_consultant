# Deep Research — New Changes Audit · 2026-08-25 evening

Scope: everything changed today in `psara-consultant` (live project), checked against
`HERO_ART_DIRECTION.md` + `SCROLL_AND_ASSETS_PLAN.md` written earlier today for psara-redesign.

---

## 1. What actually shipped today (verified)

| Change | File(s) | Verdict |
|---|---|---|
| Homepage recomposed: `StageShell > HeroStage + HomeStory` | app/page.tsx (328B) | Correct architecture — shell owns chrome, page owns stages |
| Cinematic hero: `hero-loop.webm` (2.5MB ✅ under 3MB budget), desktop-only via `useSyncExternalStore`, poster fallback mobile/reduced-motion | HeroStage.tsx | Matches asset plan §6 |
| Plum void stack: base #080714 → video → scrim → CSS aurora blobs (violet/gold radials) → vignette → SVG grain 4.5% | HeroStage.tsx | Exactly the grain-over-clean rule |
| Metallic arch portal frame + shimmer line, border-radius morphs on scroll | HeroStage.tsx | New signature element — strong, keep |
| **Preloader race FIXED**: `preloader:done` event + `pl-seen` sessionStorage + 2.2s fallback timeout | Preloader.tsx + HeroStage.tsx:124-138 | The #1 timing bug from the audit is gone |
| **Unified scrub grammar**: media `scrub:1`, center text `scrub:true`, arch `scrub:1` | HeroStage.tsx:69-101 | Matches SCROLL_AND_ASSETS_PLAN §1 table |
| **Refresh hooks**: rAF + window load + fonts.ready → ScrollTrigger.refresh() | StageShell.tsx:48-50, HomeStory.tsx:46-50 | Drift fix applied |
| Central motion lib: parallax layers, pinned process, float drift, mouse parallax | app/lib/motion.ts | Single source of truth ✅ |
| Continuous AmbientCanvas behind all routes (violet #5821C7 + gold #D4AF37 fields, mouse-reactive, desktop-only) | AmbientCanvas.tsx | On-brand colors verified — ignore stale "cherry red" comment |
| FloatProps prop system + generated props: wax-seal, shield-gold, laurel, gavel, document-scroll, ribbon, ink-pen, statutory-compass | ui/FloatProps.tsx + public/assets/images/props/ | Scroll-item imagery request fulfilled via generation |
| Brand refresh: BrandMark component, mark PNG transparent, logo SVG white variant, favicon/apple-icon regenerated | ui/BrandMark.tsx + assets | Logo treatment step done at v1 |
| Pinned horizontal services wired (`ServicesPinnedHorizontal` imported by ServicesSection.tsx) | sections | The Awwwards pinned move is live |

**Bottom line:** the scroll/timing foundation and hero rebuild from the morning plan are ~80% implemented in the live repo, correctly.

---

## 2. Gaps found (ranked)

1. **Custom cursor doesn't exist yet.** CTAs carry `data-cursor="Explore →"` / `"WhatsApp"` labels but nothing renders them — grep confirms zero `[data-cursor]` CSS and no cursor component. This was a headline requirement (cursor animation). Highest-value next build.
2. **Dead motion helpers** — `initClipReveals()` animates clipPath inset(0%)→inset(0%), y:0→0 (no-op); `initStaggerChildren()` animates opacity 1→1; `initWordReveal()` is an empty stub. Sections using these attributes appear animated-but-broken. Either implement real values or remove the calls.
3. **Direction conflict in docs** — `PSARA-DESIGN-WORKFLOW.md` states *"Gradients are not part of the system"* while the shipped hero is metallic-gradient-led (metal-text, --grad-gold-metallic buttons, gold shimmer). One direction must win; recommend amending the workflow doc to "metallic gradients reserved for brand moments (logo, primary CTA, seal); flat surfaces everywhere else" — codifies what's actually built.
4. **Stale comments** — AmbientCanvas header says "cherry red"; code is violet/gold. Cosmetic but will mislead future agents.
5. **Hero word-reveal runs before fonts settle** — timeline fires on preloader:done, but EB Garamond may swap mid-animation causing reflow jump. Cheap fix: await `document.fonts.ready` inside `runWords`.
6. **Left-rail nav vs global chrome** — homepage intentionally drops the standard header for the editorial rail; confirm this is deliberate on inner pages' entry points and that keyboard focus order still hits nav first.
7. **Video**: single webm source. Mobile/reduced-motion already get poster, and desktop Safari 14.1+/Edge/Chrome/Firefox all play webm — acceptable. Add `fetchpriority="high"` on the poster img since it paints first.

---

## 3. Next moves (priority order)

1. Build the cursor system (dot + trailing ring, lerped, blend-difference, consumes `data-cursor`, pointer:fine only, reduced-motion safe) — the last unshipped hero promise.
2. Fix or delete the three dead motion helpers.
3. `fonts.ready` guard in hero reveal.
4. Amend PSARA-DESIGN-WORKFLOW.md gradient clause + stale AmbientCanvas comment.
5. Then extend metallic language downward: StatementInterstitial + closing CTA sheen passes, section-transition camera-move polish per HERO_ART_DIRECTION §7.
