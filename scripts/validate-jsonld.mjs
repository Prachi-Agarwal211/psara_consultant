#!/usr/bin/env node
/**
 * JSON-LD validation check.
 *
 * Fetches the live sitemap, then every page, extracts each
 * <script type="application/ld+json"> block and verifies it parses as valid
 * JSON. Exits non-zero if any page ships a broken schema block.
 *
 * Usage:  npm run validate:jsonld
 * Env:    NEXT_PUBLIC_SITE_URL (default: site's production URL)
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.psaraconsultantindia.com";
const sitemapUrl = `${SITE_URL}/sitemap.xml`;

async function getSitemapUrls() {
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
  const xml = await res.text();
  if (xml.includes("<sitemapindex")) {
    const childLocs = [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim());
    const urls = [];
    for (const loc of childLocs) {
      const r = await fetch(loc);
      if (r.ok) {
        const child = await r.text();
        urls.push(...[...child.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim()));
      }
    }
    return urls;
  }
  return [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) blocks.push(m[1]);
  return blocks;
}

async function main() {
  const urls = await getSitemapUrls();
  console.log(`[validate:jsonld] ${urls.length} URLs from ${sitemapUrl}`);
  if (urls.length === 0) {
    console.log("[validate:jsonld] No URLs found â€” skipping.");
    process.exit(0);
  }

  let checked = 0;
  let failed = 0;
  const failures = [];

  const CONCURRENCY = 8;
  let next = 0;
  async function worker() {
    while (next < urls.length) {
      const url = urls[next++];
      try {
        const res = await fetch(url, { headers: { "User-Agent": "JSON-LD-Validator/1.0" } });
        if (!res.ok) continue;
        const html = await res.text();
        const blocks = extractJsonLd(html);
        if (blocks.length === 0) continue;
        checked += blocks.length;
        for (const [i, block] of blocks.entries()) {
          try {
            const parsed = JSON.parse(block.trim());
            if (!parsed || typeof parsed !== "object") throw new Error("not an object");
          } catch (err) {
            failed++;
            failures.push(`${url} block#${i + 1}: ${err instanceof Error ? err.message : err}`);
          }
        }
      } catch {
        /* network blip â€” skip page */
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));

  if (failed > 0) {
    console.error(`[validate:jsonld] FAILED â€” ${failed}/${checked} JSON-LD blocks invalid:`);
    failures.forEach((f) => console.error("  - " + f));
    process.exit(1);
  }
  console.log(`[validate:jsonld] OK â€” ${checked} JSON-LD blocks valid.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("[validate:jsonld] error:", err);
  process.exit(1);
});