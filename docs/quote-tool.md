# PSARA Quotation Tool — Operating Notes

Internal pricing desk that turns the ops quotation format (WhatsApp, 13-10-2026)
into a client-ready PDF. Modeled on the Silbar Security quote tool.

**Route:** `/quote` — unlisted, `noindex`, and disallowed in `robots.ts` for both
normal and AI crawlers (it exposes the client price breakdown).

---

## 1. Fee structure (standard whole-state quote, ₹3,65,000)

| # | Particulars | Default (₹) |
|---|-------------|-------------|
| 1 | Professional Consultancy Fees | 30,000 |
| 2 | MOU Preparation & Execution | 20,000 |
| 3 | Training Certificate | 15,000 |
| 4 | Government Fees | auto — state + coverage |
| 5 | Office Rent / Office Arrangement | 30,000 |
| 6 | Rent Agreement | 10,000 |
| 7 | Affidavit Drafting, Company Profile, Forms 1, 2 & 3, and NOC | 20,000 |
| 8 | Police Verification & Departmental Coordination (Thana, ACP, DCP, CP/Licensing Branch, etc., as applicable) | 35,000 |
| 9 | Other Professional & Processing Expenses | 1,80,000 |

Every amount is editable per quotation. Item 4 auto-fills from the selected
state and coverage; editing it by hand switches to manual until
"Load standard defaults" or "re-sync from state data" is used.

Optional **GST @18%** toggle adds a GST line and a Total Payable (rounded to
whole rupees, consistent with the amount-in-words output).

## 2. Government fee auto-fill (all 36 states / UTs)

Source: `data/states.ts` → `feeOneDistrict` / `feeMultiDistrict` / `feeEntireState`,
parsed with `parseIndicativeFee()`. Coverage options: Single District / Up to 5
Districts / Whole State.

- Parseable state data is used as-is (e.g. Delhi ₹5k/₹10k/₹25k, UT whole-UT figures).
- Fallback when the string has no figure: standard slab ₹5,000 / ₹10,000 / ₹25,000.
- Known override: **Karnataka whole state = ₹50,000** (see
  `PSARA_COMPLETE_RESEARCH.md`; verify the ISD notification per quote).
- The raw state string is shown under the input with a "verify latest
  notification" note — always confirm before sending a quote.

## 3. Where to change things

| What | File |
|------|------|
| Defaults, labels, GST rate, slab, per-state overrides | `lib/quote-engine.ts` |
| PDF layout, branding, notes, footer, quote-number format | `lib/quote-pdf.ts` |
| Tool UI (fields, preview, buttons) | `app/quote/QuoteTool.tsx` |
| Public fee surfaces — calculator page, homepage estimator, state & city dossier cards | all read the same engine (`buildDefaultAmounts` + `getStateGovFee` + `computeQuote`); no separate fee table exists |

## 4. Test

```bash
npm run dev                      # in one shell
npx cypress run --spec cypress/e2e/quote-tool.cy.ts
```

Covers: default ₹3,65,000 total, Karnataka ₹50,000 auto-fill, coverage
re-derivation, manual-override stickiness, GST words, defaults reset.

Harness notes — keep these patterns when extending the spec:

- `beforeEach` waits for `[data-testid="quote-meta"]` to contain `PSARA/QT/`.
  That text is rendered in a mount effect, so it proves React has hydrated;
  without the wait, dev-mode hydration races make selects/clicks flake.
- Manual gov-fee edits go through the spec's `setInputValue()` helper (native
  setter + `input` event). Plain `.type()` is unreliable here: the amount input
  is right-aligned, so Cypress's pre-type click can land the caret before the
  digits and shift the value (12000 -> 120000).
