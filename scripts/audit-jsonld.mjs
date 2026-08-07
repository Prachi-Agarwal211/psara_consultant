// Audit: extract and JSON.parse every application/ld+json block from built HTML.
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const root = join(process.cwd(), ".next", "server", "app");
const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith(".html")) files.push(p);
  }
})(root);

let withLd = 0, totalBlocks = 0, invalid = 0;
const types = {};
const samples = {};

for (const f of files) {
  const html = readFileSync(f, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length) withLd++;
  for (const [, raw] of blocks) {
    totalBlocks++;
    try {
      const obj = JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
      const list = Array.isArray(obj) ? obj : [obj];
      for (const item of list) {
        const t = item["@type"];
        if (!t) { invalid++; console.log(`  NO @TYPE in ${relative(root, f)}`); continue; }
        types[t] = (types[t] || 0) + 1;
        if (t === "JobPosting" && !samples.JobPosting) samples.JobPosting = relative(root, f);
        if (t === "FAQPage" && !samples.FAQPage) samples.FAQPage = relative(root, f);
      }
    } catch (e) {
      invalid++;
      console.log(`  INVALID JSON-LD in ${relative(root, f)}: ${e.message}`);
    }
  }
}

console.log(`PAGES WITH JSON-LD: ${withLd} / ${files.length}`);
console.log(`TOTAL BLOCKS: ${totalBlocks}, INVALID: ${invalid}`);
console.log("TYPES:", JSON.stringify(types, null, 1));
console.log("SAMPLES:", JSON.stringify(samples));
