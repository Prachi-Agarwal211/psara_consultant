# Design application from `ai research prompts/`

Applied to PSARA Consultant India (landing + global system).

## Source files used

| File | What we took |
|------|----------------|
| `resources/anti-slop-system/03-palette-anchors.md` | **Coastal** anchor: navy / teal / sand gold |
| `04-COLOR-GRADIENT-PSYCHOLOGY-DEVICES.md` | 60-30-10, warm CTA / cool BG, Albers (lighter blue on dark) |
| `resources/anti-slop-system/02-banned-patterns.md` | No pure mono + 1 accent; no generic pink mesh; noise instead |
| `12-STRICT-RULES-AND-CONSTRAINTS.md` | No pure #000/#fff; cinematic easings; contrast discipline |
| `resources/technique-catalogs/06-atmosphere.md` | Multi-orb ambient, mesh, noise grain |
| `resources/code-patterns/noise-texture.css` | Fixed SVG feTurbulence noise overlay |
| `resources/code-patterns/glass-card.tsx` | Dark glass folio / glass-chip surfaces |

## Palette (60-30-10)

- **60%** Deep navy surfaces (`#0a1628` / `#1b3a4b`) + ice paper on light chapters  
- **30%** Sky blue + Coastal teal (`#5eb8ff`, `#2a9d8f`) for panels, links, atmosphere  
- **10%** Sand gold (`#e0b84a`) for CTAs, seals, spectrum rail ends  

## Setting / context labels

Each major chapter carries a `setting-badge` so the page reads as rooms in a licensing practice:

1. Controlling Authority File (Hero)  
2. Licensing Practice Room (Philosophy)  
3. Pan-India Authority Map (Presence)  
4. Grant Timeline Folio (Process)  
5. Engagement Index (Services)  
6. Proof ledger (Trust — paper sky)  
7. Consultation Desk (Contact)  

## Atmosphere layers

1. Brand mesh gradients (sky/teal/gold orbs — not AI pink mesh)  
2. Animated ambient orbs (respects `prefers-reduced-motion`)  
3. Guilloche dual-dot texture  
4. Spectrum binding rail + section edge  
5. Global noise grain overlay  
6. Glass folios + glass state chips  

## Anti-slop compliance notes

- Avoided white/black/gray + single accent  
- Avoided pure #000 / #fff  
- Spectrum used as **rails**, not full-page rainbow  
- Fonts remain project display/serif/body (not Inter/Poppins)  
- Hero stays asymmetric (left rail / void / right text) — not centered template hero  
