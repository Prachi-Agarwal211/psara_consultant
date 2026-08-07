// Audit: extract <title> + meta description from every built HTML page; report duplicates & missing.
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

const titles = new Map();
const descs = new Map();
const missingTitle = [];
const missingDesc = [];
const tooLong = [];

for (const f of files) {
  const html = readFileSync(f, "utf8");
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const d = html.match(/<meta name="description" content="([^"]*)"/);
  const rel = relative(root, f);
  if (!t || !t[1].trim()) missingTitle.push(rel);
  else {
    const key = t[1].trim();
    if (!titles.has(key)) titles.set(key, []);
    titles.get(key).push(rel);
  }
  if (!d || !d[1].trim()) missingDesc.push(rel);
  else {
    const key = d[1].trim();
    if (!descs.has(key)) descs.set(key, []);
    descs.get(key).push(rel);
    if (d[1].length > 165) tooLong.push(`${rel} (${d[1].length})`);
  }
}

const dupTitles = [...titles.entries()].filter(([, v]) => v.length > 1);
const dupDescs = [...descs.entries()].filter(([, v]) => v.length > 1);

console.log(`TOTAL HTML PAGES: ${files.length}`);
console.log(`\nMISSING TITLE: ${missingTitle.length}`);
missingTitle.slice(0, 8).forEach((x) => console.log("  -", x));
console.log(`\nMISSING META DESCRIPTION: ${missingDesc.length}`);
missingDesc.slice(0, 8).forEach((x) => console.log("  -", x));
console.log(`\nDESC > 165 CHARS: ${tooLong.length}`);
tooLong.slice(0, 6).forEach((x) => console.log("  -", x));
console.log(`\nDUPLICATE TITLES (${dupTitles.length} groups):`);
dupTitles.slice(0, 12).forEach(([k, v]) => console.log(`  x${v.length}: ${k.slice(0, 80)}  -> ${v.slice(0, 3).map((r) => relative(root, r)).join(", ")}`));
console.log(`\nDUPLICATE DESCRIPTIONS (${dupDescs.length} groups):`);
dupDescs.slice(0, 12).forEach(([k, v]) => console.log(`  x${v.length}: ${k.slice(0, 80)}  -> ${v.slice(0, 3).map((r) => relative(root, r)).join(", ")}`));
