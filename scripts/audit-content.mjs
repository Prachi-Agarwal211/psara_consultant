// Audit: detect template-slop — repeated opening paragraphs across state & city pages.
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const root = join(process.cwd(), ".next", "server", "app");
function listDir(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) listDir(p, out);
    else if (e.endsWith(".html")) out.push(p);
  }
  return out;
}

function bodyText(html) {
  // strip scripts/styles/tags
  const noScript = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ");
  const text = noScript.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&apos;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&#39;/g, "'");
  return text.replace(/\s+/g, " ").trim();
}

const stateFiles = listDir(join(root, "states"));
const cityFiles = listDir(join(root, "city"));
console.log(`STATE PAGES: ${stateFiles.length}, CITY PAGES: ${cityFiles.length}`);

// State pages: extract a 300-char window starting at the state-name intro paragraph.
function opener(text, needle) {
  const i = text.indexOf(needle);
  if (i < 0) return "";
  return text.slice(i, i + 300);
}

const seen = new Map();
console.log("\n--- STATE PAGE OPENERS (flag repeats) ---");
for (const f of stateFiles) {
  const html = readFileSync(f, "utf8");
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const name = t ? t[1].replace(/.*in |.*License |.*PSARA /, "").replace(/[|–—-].*/s, "").trim() : relative(root, f);
  const o = opener(bodyText(html), name);
  const key = o.slice(0, 120);
  if (!seen.has(key)) seen.set(key, []);
  seen.get(key).push(relative(root, f));
}
let repeatGroups = 0;
for (const [k, v] of seen) {
  if (v.length > 1) {
    repeatGroups++;
    console.log(`  REPEAT x${v.length}: ${k.slice(0, 110)}`);
    console.log(`     -> ${v.slice(0, 4).join(", ")}`);
  }
}
console.log(`STATE REPEAT GROUPS: ${repeatGroups} / ${stateFiles.length}`);

// City pages: sample 60 across states; compare openers.
const sample = [];
for (let i = 0; i < cityFiles.length && sample.length < 60; i += Math.max(1, Math.floor(cityFiles.length / 60))) sample.push(cityFiles[i]);
const citySeen = new Map();
for (const f of sample) {
  const html = readFileSync(f, "utf8");
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const name = t ? t[1].replace(/^PSARA License in /, "").replace(/[|–—-].*/s, "").trim() : "";
  const o = opener(bodyText(html), name);
  const key = o.slice(0, 140);
  if (!citySeen.has(key)) citySeen.set(key, []);
  citySeen.get(key).push(relative(root, f));
}
let cityRepeats = 0;
for (const [k, v] of citySeen) {
  if (v.length > 1) {
    cityRepeats++;
    console.log(`  CITY REPEAT x${v.length}: ${k.slice(0, 110)}`);
    console.log(`     -> ${v.slice(0, 4).join(", ")}`);
  }
}
console.log(`CITY REPEAT GROUPS (of ${sample.length} sampled): ${cityRepeats}`);
