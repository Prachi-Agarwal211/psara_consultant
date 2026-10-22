# V3 inner pages and templates

Reviewed and completed the previous run's uncommitted conversion. Every existing inner page/template now uses the cinematic v3 system established by `CHANGES_v3.md` and the supplied `_design_v3` reference. No pages were deleted. No commit, push, deployment, or indexing submission was performed.

## Complete route inventory

The application contains the homepage plus **31 inner `page.tsx` templates**, and the shared 404. Calculator and quote metadata remain in their server wrappers; their layouts are implemented in the client components listed below.

| Route/template | Converted layout and retained functionality |
| --- | --- |
| `/services` | Editorial service directory, acquisition roadmap, calculator and advisory CTAs |
| `/services/[slug]` | Service reading column, deliverables, process, shared FAQ, enquiry sidebar |
| `/states` | Searchable state/UT directory via `StatePortalView` |
| `/states/[slug]` | State dossier, authority contacts, roadmap/checklist/calculator tabs, office information, FAQs |
| `/cities` | Search, state filtering and progressive city directory via `CityExplorerView` |
| `/city/[slug]` | City dossier, state rules, local sectors, process, office information, FAQs |
| `/[guide]` | Educational guide dossier via `GuideDossierView`, reading sections and advisory actions |
| `/about` | Cinematic hero, cream practice story, static facts, timeline, leadership, credentials, enquiry form |
| `/contact` | Contact cards, cream lead form, regional office directory and map |
| `/quote` | `QuoteTool`: state/coverage controls, editable fee heads, government-fee override, GST, quotation actions |
| `/calculator` | `CalculatorClient`: state/coverage estimate, armed-guard option, breakdown and WhatsApp handoff |
| `/blog` | Featured article, editorial article listing, category filters and empty category state |
| `/blog/[slug]` | Article cover, reading layout, author/date/tags, related articles and contextual CTAs |
| `/industries` | Industry directory |
| `/industries/[slug]` | Industry-specific requirements, deliverables and enquiry CTA |
| `/case-studies` | Case-study directory |
| `/case-studies/[slug]` | Case-study narrative, outcomes and contextual enquiry CTA |
| `/faq` | Shared native disclosure FAQ with matching existing structured data |
| `/certification` | Credential panels and certification enquiry CTA |
| `/csr` | Community/responsibility content and existing contact actions |
| `/emergency` | Urgent advisory services and hotline/WhatsApp actions |
| `/google` | Business profile, office and map content |
| `/gallery` | Responsive imagery and enquiry content |
| `/metrics` | Restricted login plus authenticated leads, click heatmap and traffic views |
| `/franchise` | Partnership content and enquiry form |
| `/privacy-policy` | Legal reading layout |
| `/terms` | Legal reading layout |
| `/disclaimer` | Legal reading layout |
| `/security-services` | Security-services location directory |
| `/security-services/[state]` | State-specific directory, related locations and contact CTA |
| `/security-services/city/[slug]` | City-specific directory, related locations and contact CTA |
| `app/not-found.tsx` | V3 404 hero, recovery links and shared contact/footer |

The root and metrics layouts, `app/template.tsx`, five HTTP route handlers, sitemap, robots, text discovery endpoints, icon routes and existing redirects were inventoried. They retain their existing responsibilities. There were no custom loading, error, global-error or parallel-route fallback templates to convert. The homepage composition remains intact.

## Shared design and motion

- `components/PageShell.tsx` provides the reusable `PageHero`, `PageMain` and `Prose`. Heroes use image grading, layered navy/saffron shading, grain, shield watermark, breadcrumbs, masked line reveals and direct contact actions.
- `components/v3/PagePrimitives.tsx` provides `Section`, `GlassCard`, `CTABand`, `Breadcrumbs`, `FAQ` and `ContactActions`.
- `styles/v3-system.css` owns inner-page typography, palette, spacing, glass/cream materials, forms, reading layouts, directories, header/footer treatment and responsive/reduced-motion rules. Shared floating WhatsApp styles were moved out of `styles/home-v3.css`.
- `StageShell` composes the shared CTA/footer and one scoped `useV3PageMotion` owner. It reuses the application's single Lenis provider. Desktop has subtle hero parallax and magnetic CTAs; inner pages have no pinning or count-up effects.
- Motion starts from readable server-rendered content, respects initial and live reduced-motion changes, and cleans up SplitText, GSAP, ScrollTrigger and pointer listeners. Long sections remain readable rather than disappearing behind a whole-section entrance.
- Shared navigation uses the eagle identity, consistent contact links, focus containment/return, Escape dismissal, scroll locking and a working keyboard skip link. On narrow screens the persistent WhatsApp action sits beside the menu so it does not cover reading content or form fields.

## Review fixes

- Prevented `PageTransition` from applying a second ancestor entrance to v3 pages, which also displaced fixed navigation while animating.
- Reinitialize scoped page motion when the pathname changes, including navigation between instances of a dynamic template.
- Replaced About's legacy reveal/parallax wrappers with shared v3 reveals so live reduced-motion preferences have one animation owner.
- Keyed the analytics login/dashboard shells separately. Reusing a SplitText-mutated heading across authentication could leave the new dashboard heading hidden.
- Added a focusable content destination and Lenis completion focus for the skip link.
- Connected the contact form's visible field errors to their controls with `aria-invalid` and `aria-describedby`, matching the existing WhatsApp form's accessible validation behavior.
- Hardened long heading/breadcrumb wrapping, mobile form sizing, cream-card specificity, saffron button contrast and selected-state semantics in the calculator. Matched the certification CTA to shared button/magnetic styling.
- Corrected seven WhatsApp links that appended a second `text` parameter. `buildWhatsAppUrl` preserves the same recipient and intended enquiry, and correctly encodes location names containing `&` and quote amounts containing `₹`.
- Kept the existing SVG blog covers fully visible instead of cropping their embedded lettering; photographic covers retain their responsive crops. Removed the duplicate All category control and retained `/blog?cat=All` as a working alias for the complete article listing.
- Excluded ignored QA artifacts from ESLint; application source remains linted. Normalized the guide view's line endings to pass `git diff --check`.
- Hardened both `verify-v3` scripts to fail on actual defects and write reusable reports. Added long location/service variants, same-template navigation, quote/calculator behavior, keyboard focus and synthetic dashboard coverage. Local clipping excludes intentional image/decoration crops without treating document-level overflow hiding as a fix.
- Hardened JSON-LD validation: an empty sitemap, unavailable child sitemap/page, network failure, missing blocks, or invalid JSON now fails instead of silently skipping pages.

## Preservation

Source comparison against `HEAD` checked metadata/static params, schema declarations/invocations, text and links. Existing location/service/article datasets, quote calculations, canonical metadata, phone/email recipients, internal routes, sitemap, robots and redirects are retained. Breadcrumb links moved to the shared primitive. The only deliberate contact-URL change is the corrected encoding of the seven WhatsApp messages described above.

## Verification

| Check | Result |
| --- | --- |
| `npm run lint` | Pass; no application lint errors or warnings |
| `npm run build` | Pass, including TypeScript and 1,379 generated pages |
| Local `npm run validate:jsonld` | Pass: all 738 sitemap URLs fetched; 3,493 valid JSON-LD blocks |
| `python scripts/verify-v3-pages.py` | Pass: 35 representative routes at 1440 × 900 and 390 × 844, 70 page/viewport checks, plus reduced motion |
| Contact layout confirmation after the ARIA-only change | Pass: both requested widths on the rebuilt application, plus reduced motion |
| `python scripts/verify-v3-interactions.py` | Pass at both widths, plus no-JavaScript fallback: navigation/focus, filters, state tabs, same-template navigation, quote/GST/calculator behavior, blog filters/covers, contact error associations, synthetic dashboard tabs, desktop magnetism/parallax, and live reduced motion |
| Homepage regression smoke check | Pass at both widths: one h1, no horizontal overflow/runtime exceptions, working WhatsApp action, two desktop pins and zero mobile pins; live reduced motion removes pins |
| Source preservation audit | 48 changed TSX files checked; metadata and schema retained. Breadcrumb Home text/links live in the extracted primitive; seven WhatsApp encodings intentionally corrected |
| `git diff --check` | Pass |

Layout checks confirm one h1, loaded hero media, Newsreader/Hanken fonts, intact phone/email/WhatsApp actions, valid schema blocks, expected HTTP status (including 404), zero inner-page pins, and no detected text overlap, content overflow or runtime exceptions. Reviewed desktop/mobile screenshot sheets and representative full-page images across all template families. Long-name samples include Thiruvananthapuram, Andaman and Nicobar, and the government security contracts service.

- The Impeccable detector was run once across changed UI sources. It reported three pre-existing global utility warnings: two `.text-grad-saffron` rules and the unused `--ease-elastic` token in `app/globals.css`. The converted templates do not use those utilities; v3 motion uses exponential easing and its heading accents are solid colors. The warnings are retained as scoped legacy exceptions, not described as a clean global scan.
- JSON-LD validator failure behavior was exercised with an in-memory local fixture server: valid schema passes; empty sitemap, child sitemap HTTP failure, page HTTP failure, missing schema, malformed JSON and network failure all fail. No fixture files or dependencies were added.

QA screenshots, logs and machine-readable reports live under the existing ignored `artifacts/v3/` directory. The persistent verification entry points are:

```powershell
npm run lint
npm run build
npm run start -- --port 3100
$env:NEXT_PUBLIC_SITE_URL = 'http://localhost:3100'
npm run validate:jsonld
python scripts/verify-v3-pages.py
python scripts/verify-v3-interactions.py
git diff --check
```

Browser scripts default to the local production server; `V3_BASE_URL` can override its origin. Dashboard checks use an intercepted synthetic response; contact validation does not submit a live lead or send a WhatsApp message. JSON-LD validation checks presence and JSON syntax, not search-engine rich-result eligibility. Browser geometry checks and screenshots sample every template at the requested viewport sizes; they do not claim screenshots of every generated location URL or physical-device coverage.
