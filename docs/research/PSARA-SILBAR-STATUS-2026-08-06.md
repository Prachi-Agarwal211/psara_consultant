# PSARA + Silbar — Live Status & Master Plan (2026-08-06)

Verified against **live codebases**, **camofox crawl**, **Hermes config**, and **OmniRoute on `172.28.128.1:20128`**.

---

## 0. Why Hermes dies (this is the blocker — fixed by config, not by waiting)

### What the error means
```
HTTP 503: Chat admission capacity is temporarily unavailable
model: oc/deepseek-v4-flash-free
endpoint: http://172.28.128.1:20128/v1
```

This is **not** your site code. It is OmniRoute refusing (or failing) the **single free model you pinned**.

### Live proof (this machine, same day)
| Call | Result |
|---|---|
| `GET /v1/models` | **200** — OmniRoute is UP, 434 models listed |
| `POST oc/deepseek-v4-flash-free` | **403** `insufficient_quota` / permission_error |
| `POST model: auto` | **200** — routed to `gpt-oss-120b-medium` |

So: gateway healthy · pinned free model **out of quota/capacity** · auto-routing works.

### Your Hermes config (root cause)
`~/.hermes/config.yaml`:
```yaml
model:
  default: oc/deepseek-v4-flash-free   # ← DEAD/OVER-SUBSCRIBED free OpenCode slot
  provider: custom:omniroute/opencode
  base_url: http://172.28.128.1:20128/v1
fallback_providers: []                 # ← NO FALLBACK → 5 retries → total fail
```

Also stacking failure factors:
- Session context was **~74k tokens / 54 msgs** — free flash models hate this
- `fallback_providers: []` means no escape hatch
- Hermes was mid “memory over-by-42-chars” compress when capacity died

### Fix (do this before more website work on Hermes)

**Option A — recommended (use OmniRoute auto combo)**
```yaml
model:
  default: auto/coding          # or: auto
  provider: custom:omniroute/opencode
  base_url: http://172.28.128.1:20128/v1
fallback_providers:
  - model: auto/fast
  - model: auto/cheap
```

**Option B — paid DeepSeek direct (stable agent coding)**
Point Hermes at `https://api.deepseek.com` with a real DeepSeek key (`deepseek-v4-pro` / flash paid).

**Option C — keep free but multi-path**
```yaml
model:
  default: auto
fallback_providers:
  - model: auto/coding
  - model: auto/cheap
  - model: auto/fast
```
Then in OmniRoute dashboard, add keys for OpenRouter/DeepSeek/Kimi so free exhaustion auto-falls to Tier 2.

**Session hygiene**
- Start a **new** Hermes session for site work (don’t resume the 74k-token one)
- One project per session: `psara-consultant` OR `silabar security`, not both + research dumps
- Prefer **Grok Build (this agent)** for the heavy multi-file implementation — it already has both trees open and does not depend on OpenCode free capacity

Dashboard: `http://localhost:20128` (or Windows host `http://172.28.128.1:20128`) → `/dashboard/free-tiers` to see which free pools are dead.

---

## 1. What you have right now

### Silbar Security (`silabar security/`) — reference / ~complete
| Asset | Count / status |
|---|---|
| Core pages | home, about, contact, faq, franchise, gallery, clients, csr, emergency, google, calculator, certification, privacy, terms, disclaimer |
| Services | **55** verticals (`/services/[slug]`) |
| Industries | **37** (`/industries/[slug]`) |
| Geo | **35 states** + **~336 cities** under `/security-services/` |
| Careers | **12** jobs |
| Case studies | present |
| Blog | present |
| Homepage | **Full** (`HomePageClient.tsx` ~626 lines): ScrollExperience, ServicesGrid, leadership (Sonu+Nakul photos), industries, stats, process, certs, reviews, QueryForm, FAQs |
| Motion | GSAP + ScrollTrigger + ScrollReveal across home |
| SEO | `llms.txt` pattern, stable `lastModified` (clampToToday), IndexNow-ready culture |
| Team photos | `public/images/team/sonu-singh-square.webp` + `nakul-singh-square.webp` ✅ |
| Hero video | `hero-1080p.mp4` / `hero-720p.mp4` culture |

**Silbar residual issues (S-fixes)**  
Gallery placeholders · cert “coming soon” · franchise “20+ years” vs Est. 2018 · GA env var name mismatch · clients dead download link · empty `src/providers/`.

### PSARA Consultant (`psara-consultant/`) — behind, but not empty
| Asset | Count / status |
|---|---|
| Routes exist | about, services, states, cities, city, blog, faq, franchise, calculator, careers, case-studies, industries, certification, emergency, gallery, csr, security-services, google, legal, `[guide]` |
| States | **36** |
| Cities | **218** (built from state city lists + NAME_MAP) |
| Services | **14** (licensing/setup stack, not 55 guarding verticals) |
| Guides | **17** |
| FAQ data | **100** items |
| FAQ page | renders **only 40** (`FAQS.slice(0, 40)`) ❌ |
| Industries | **4** only (Silbar has 37) |
| Case studies | **3** |
| Blog | ~22 posts in data |
| Sitemap | static + dynamic; `lastModified: now` every build; security-services cities **sliced to 100** |
| Homepage | **ONLY** `HeroStage` + `HomeStory` — many sections exist but **orphaned** |
| Team photos | **Files already present** under `public/images/team/` + `data/team.ts` ✅ |
| Leadership on About | wired ✅ · not on Home ❌ |
| Franchise | already rebranded to PSARA (plan’s P0-1 is done) ✅ |
| Hero video | `public/hero-1080p.mp4` already in tree ✅ |
| `llms.txt` / `ai.txt` | routes + public files exist |
| Double footer | **still real**: `SiteChrome` footer when `!isHome` **+** `StageShell` default `SiteFooter` |
| themeColor | `#0066FF` in layout — classic AI-slop blue ❌ |

**Camofox crawl sample (local):** home thin (~7.7KB text / 28 links); city Jaipur thin (~10.5KB / 7 headings); FAQ only 1 heading; states hub denser.

### Research assets available (don’t re-research from zero)
- `ai research prompts/` — full doctrine (00–28), anti-slop, Impeccable 4.0 notes
- `open-seo/` — audit engine
- `PSARA-SILBAR-REPAIR-PLAN.md` — earlier same-day plan (still valid; status updates below)
- `psara-consultant/docs/DESIGN-CONSISTENCY-AUDIT.md` — PSARA vs Silbar token/type/mobile gaps
- `camofox-crawl/crawl-output/` — screenshots + snapshots
- Archive: `34-PSARA-REDESIGN…`, `36-PSARA-DEFINITIVE-GAP…`, etc.

---

## 2. PSARA vs Silbar gap (why PSARA “feels AI / incomplete”)

| Layer | Silbar | PSARA today | Gap type |
|---|---|---|---|
| Homepage density | 10+ live sections + form | Hero + HomeStory only | **Wiring** (components exist) |
| Leadership photos on home | Yes | Data+photos exist, not on home | **Wire** |
| Per-page lead form | QueryForm everywhere | Uneven; home form orphaned | Wire + pattern copy |
| Footer | One solid 4-col | Double footer on inner pages | **Bug** |
| Motion on inner pages | Consistent | Mostly home-only | Apply lib |
| Industries | 37 | 4 | **Content** |
| Services | 55 ops verticals | 14 compliance services | Intentional brand split + expand content |
| Geo uniqueness | Rich location data | Generator + state briefs; city pages thin | **Content depth** |
| Mobile CTA/safe-area | Strong | Weaker (audit doc) | Design pass |
| Visual identity | Cherry + gold, bold type | Gold dossier, but `#0066FF` theme + generic patterns | De-slop |

**Why it still looks “AI-only” after research prompts:**  
Doctrine was studied; execution never closed the loop. Orphaned sections + truncated FAQ + thin city pages + double footer + blue themeColor + incomplete industries = the classic “agent scaffold” look. Silbar closed that loop; PSARA did not.

---

## 3. Big sitemap (PSARA — expose everything)

Target every live URL in `sitemap.ts` + internal links (no orphans).

```
CORE
/  /about  /contact  /services  /faq  /blog  /franchise  /google
/calculator  /careers  /case-studies  /industries  /certification
/emergency  /gallery  /csr  /cities  /states  /security-services

GUIDES (17) — /psara-license, /psara-process, /psara-eligibility, ...

SERVICES (14) — /services/[slug]

STATES (36) — /states/[slug]
SECURITY STATES (36) — /security-services/[state]

CITIES (218) — /city/[slug]
SECURITY CITIES (all 218, not slice 100) — /security-services/city/[slug]

BLOG (~22) — /blog/[slug]
INDUSTRIES (grow 4 → 20–37) — /industries/[slug]
CASE STUDIES (grow 3 → 8+) — /case-studies/[slug]
CAREERS (add slugs if multi-job)

LEGAL (noindex): /privacy-policy /terms /disclaimer

EXPOSURE: /sitemap.xml  /robots.txt  /llms.txt  /ai.txt  + IndexNow
```

**Rough URL count today ~470 with slice; full city dual-path + industries/careers growth → ~550–700.**

### State/city uniqueness rules
- Unique H1 + title: `PSARA License in {State/City} | …`
- ≥150–300 words unique intro (fee, authority, timeline, top cities, rejection risks)
- Related: sibling cities, parent state, top services, CTA block
- No identical template paragraphs across 218 cities — seed with `seo-content-generator` + state-specific rules from `PSARA_Rules_All_States_UTs.md`
- Footer directory: top states + “View all states/cities”

---

## 4. Layout skeleton (standardize PSARA on Silbar pattern)

```
SiteChrome (header + mobile drawer + phone/WA)
├─ PageHero / HeroStage
├─ body sections (page-specific)
├─ PageLeadSection (form + Call/WA/Review)  ← EVERY page
├─ GbpOfficeSection
├─ BrandTrustBar (optional)
└─ ONE footer only (4-col)
StickyCta (safe-area)
ExitIntentPopup
```

### Homepage order to wire (components largely exist)
1. HeroStage (video already local)
2. ComplianceMarquee / Ticker
3. StatsBar
4. WhyChooseUs (fix `--gold-deep` tokens)
5. Services grid (HomeStory / PracticeIndex)
6. Leadership (Sonu + Nakul photos — already on disk)
7. StateGridHome
8. ApprovalRoadmap / process
9. GoogleReviews
10. HomeFaq
11. PsaraEstimator CTA
12. HomeContact (form + map)
13. EligibilityQuiz (optional high-value)

---

## 5. Execution plan (do in this order)

### Phase 0 — Unblock AI (15 min) — TODAY
1. Change Hermes model to `auto` / `auto/coding`
2. Add `fallback_providers`
3. New session, smaller context
4. Prefer Grok Build for multi-file PSARA repair while free OpenCode is dry

### Phase 1 — Correctness (1 session)
1. Kill double footer (`showFooter={false}` on StageShell **or** remove SiteChrome footer)
2. FAQ: render all 100
3. Wire homepage sections
4. Leadership cards on home
5. Fix undefined CSS tokens + themeColor off `#0066FF` → gold/navy brand
6. Remove `security-services/city` slice(0,100)

### Phase 2 — Content depth
7. Expand industries 4 → 20–37 (mirror Silbar structure, PSARA-consultant angle)
8. Expand case studies 3 → 8
9. Careers real listings
10. City/state unique intros (batch generator + human edit top 30 metros)
11. Footer rebuild to Silbar 4-col quality

### Phase 3 — Motion + mobile + de-slop
12. GSAP section reveals on inner pages
13. Magnetic CTA, sticky mobile CTA, 48px targets, `100dvh`, safe-area
14. Run kill-ai-slop + Impeccable detect against home + 5 templates
15. Drop pure AI clichés (indigo gradients, generic “Built for Trust” without proof, blue chrome)

### Phase 4 — SEO exposure
16. Stable lastmod dates (copy Silbar `clampToToday`)
17. IndexNow postbuild
18. GSC + Bing submit full sitemap
19. Real GBP placeids (replace `___UPDATE___`)
20. llms.txt accuracy (counts, founders, services)

### Phase 5 — Silbar harden
21. S-1…S-7 residual fixes

### Verification gates
- `npx tsc --noEmit` both
- `npm run build` both
- Crawl `/sitemap.xml` URL count
- Lighthouse mobile ≥ 90 a11y/SEO
- Visual pass (pinchtab/playwright) home + state + city + contact + FAQ

---

## 6. Answers to your open product questions

| Question | Recommendation |
|---|---|
| Reuse Silbar hero video on PSARA? | **Yes** — files already in PSARA `public/`; same owners, different brand overlay/copy |
| Directory under `/security-services/`? | **Keep both**: `/states`+`/city` for license intent · `/security-services/*` for commercial “security services in X” SEO — but make content distinct, not clones |
| Same founder photos on PSARA? | **Yes** — already copied; wire on Home + keep About |
| Who implements while Hermes is flaky? | **This Grok session** for code; Hermes only after model→`auto` |

---

## 7. Immediate next action (pick one)

**A.** Fix Hermes config (auto + fallbacks) — unblocks your other agent  
**B.** Start Phase 1 on PSARA in this session (double footer → FAQ 100 → homepage wire → leadership)  
**C.** Do A then B in sequence  

Recommended: **C**.
