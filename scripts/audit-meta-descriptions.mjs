// Regression tool: verify every state/city meta description stays ≤160 chars (Google SERP limit).
// Run with: npx tsx scripts/audit-meta-descriptions.mjs   (requires tsx — not in package.json)
import { STATES } from "../data/states.ts";
import { CITIES } from "../data/cities.ts";
import {
  generateStateContent,
  generateCityContent,
} from "../lib/seo-content-generator.ts";
import { getState } from "../data/states.ts";

let over = 0;
const rows = [];

for (const s of STATES) {
  const md = generateStateContent(s).metaDescription;
  rows.push({ type: "state", name: s.name, len: md.length, md });
  if (md.length > 160) over++;
}
for (const c of CITIES) {
  const st = getState(c.stateSlug);
  const md = generateCityContent(c, st).metaDescription;
  rows.push({ type: "city", name: c.name, len: md.length, md });
  if (md.length > 160) over++;
}

rows.sort((a, b) => b.len - a.len);
console.log(`TOTAL location pages: ${rows.length} | OVER 160 chars: ${over}`);
console.log("--- TOP 12 LONGEST ---");
for (const r of rows.slice(0, 12)) {
  console.log(`[${r.type}] ${r.name} (${r.len}): ${r.md.slice(0, 200)}`);
}
console.log("--- BOTTOM 5 (shortest) ---");
for (const r of rows.slice(-5).reverse()) {
  console.log(`[${r.type}] ${r.name} (${r.len}): ${r.md.slice(0, 120)}`);
}

// Check for duplicate meta descriptions
const seen = new Map();
for (const r of rows) {
  const k = r.md;
  seen.set(k, (seen.get(k) || 0) + 1);
}
const dups = [...seen.entries()].filter(([, n]) => n > 1);
console.log(`DUPLICATE descriptions: ${dups.length} sets`);
