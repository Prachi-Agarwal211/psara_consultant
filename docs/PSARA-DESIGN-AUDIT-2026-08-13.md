# PSARA site audit — 13 August 2026

## Scope

Static audit of the Next.js App Router, shared shells, all first-class route hubs, dynamic SEO route families, section components, design tokens, and the mobile fixed-CTA experience.

## Route inventory

The application contains 22 first-class route hubs:

`about`, `blog`, `calculator`, `careers`, `case-studies`, `certification`, `cities`, `contact`, `csr`, `disclaimer`, `emergency`, `faq`, `franchise`, `gallery`, `google`, `industries`, `metrics`, `privacy-policy`, `security-services`, `services`, `states`, and `terms`.

These expand through four dynamic families: guides (`/[guide]`), state pages, city pages, service/industry/case-study detail pages, and security-service location pages. The production build currently prerenders 1,371 routes.

## Shared section map

The home and location experiences are assembled from 24 reusable sections, including `HeroStage`, `HomeStory`, `ServicesSection`, `WhyChooseUs`, `ApprovalRoadmap`, `PsaraEstimator`, `HomeFaq`, `HomeContact`, `Leadership`, `Presence`, `StateGridHome`, `StateDossierView`, `CityDossierView`, `GbpOfficeSection`, `GoogleReviews`, and `SiteFooter`.

## Findings

1. The previous violet token pass did not remove the source of per-location red accents. `location-accent.ts` still assigned `#8C1F32` to one quarter of state/city pages. This is now purple/lavender/deep-purple.
2. Root metadata and browser theme colors still used the old red palette. They now use `#581C87`.
3. Shared `PageHero` copy used a legacy slate text utility and form fields used navy RGB values. Both now resolve to the violet system.
4. `StickyCta` is fixed to the viewport; mobile pages lacked a shared bottom safe-area reserve. All mobile pages now reserve CTA + home-indicator space.
5. Shared mobile interaction targets did not have a minimum target guardrail. Buttons and form-submit controls now receive a 44px minimum height.
6. iOS text auto-scaling was not explicitly disabled. The root now uses `-webkit-text-size-adjust: 100%` and a 16px mobile body baseline.
7. The design system has enough section/animation primitives, but route components still contain legacy utilities. Global compatibility rules remain intentionally in place while route-by-route source migration continues.

## Direction

Use the supplied eagle emblem as the only logo source. Keep metallic gold for authority, certification, and emblem details; use purple gradients for navigation, active states, hero atmosphere, forms, location accents, and conversion CTAs. Do not introduce new blue, cherry-red, or unrelated green treatments outside the WhatsApp action.

## Verification

- `npm.cmd run lint`: passes with existing warnings only.
- `npm.cmd run build`: passes; 1,371 routes generated.
