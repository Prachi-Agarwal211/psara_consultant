# PSARA Design Workflow

## Direction

PSARA uses a flat editorial system: black and deep violet surfaces, white copy, and metallic gold for actions, rules, and verified information. **Metallic gradients are reserved for brand moments only** (logo, primary CTA, seal of authority, festive badges). All other surfaces, cards, dividers, and section backgrounds stay flat. Images provide depth; CSS provides hierarchy.

## Build Order

1. **Audit the route**: identify its page purpose, primary CTA, mobile failure points, image usage, and SEO metadata.
2. **Choose one surface**: `--void`, `--void-2`, `--space`, white, or a light violet surface. Do not stack cards inside cards.
3. **Choose one accent**: violet for active state and focus, gold for authority and conversion, white for primary contrast.
4. **Set the image crop**: desktop and mobile assets are separate when the subject or text-safe area changes. Never rely on a blind center crop for hero content.
5. **Build the information hierarchy**: eyebrow, heading, supporting copy, primary CTA, secondary action, proof or next step.
6. **Make the mobile state first-class**: 44px touch targets, one-column grids, readable body measure, sticky CTA clearance, and no horizontal overflow.
7. **Run the visual gate**: scan for gradients and legacy blue, check contrast, inspect 390px and 1440px, verify image requests, and test keyboard focus.

## Asset Rules

- Use the supplied PSARA logo files only. Do not redraw or recolor the mark without a brand decision.
- Generate photography and prop boards with no readable text or invented logos.
- Prefer a dedicated portrait asset when mobile changes the composition.
- Keep assets in `public/assets/images/generated/` with a semantic name.
- Imagegen output that is not truly alpha-transparent must be treated as a contained image, never as a transparent overlay.

## Component Rules

- Shared chrome owns header, footer, sticky CTA, focus states, and safe-area spacing.
- Page sections own content hierarchy, not global color overrides.
- Use solid fills, 1px borders, rule lines, and image crops for contrast.
- Use icons for actions and label unfamiliar icon buttons with tooltips or accessible names.
- Every page needs a clear CTA path to call, WhatsApp, or enquiry form.

## Verification Commands

```powershell
npm.cmd run lint -- --no-cache
npm.cmd run build
rg -n --glob '!**/node_modules/**' -- 'gradient|#0A233F|#0F3C65|#0066FF' app components styles
```

Then inspect `/`, `/services`, `/about`, `/contact`, one state page, and one city page at 390px and desktop width. Confirm no missing image requests, console errors, clipped text, or content hidden behind the sticky CTA.
