#!/usr/bin/env node
/**
 * Fetch every sitemap page and check that its JSON-LD parses into non-empty objects.
 * Inaccessible pages, empty sitemaps, missing blocks and invalid JSON fail the run.
 * Usage: npm run validate:jsonld
 * Env: NEXT_PUBLIC_SITE_URL (defaults to production; supports a local server)
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.psaraconsultantindia.com").replace(/\/$/, "");
const sitemapUrl = `${SITE_URL}/sitemap.xml`;

// A local build still publishes production sitemap URLs. Validate their paths on
// the explicitly selected test server while leaving canonical URLs unchanged.
const validationUrl = (url) => process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(new URL(url, SITE_URL).pathname, SITE_URL).href
  : url;
const sitemapLocations = (xml) => [...xml.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gi)].map((m) => m[1].trim());

async function fetchSitemap(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`${url}: sitemap HTTP ${res.status}`);
  const xml = await res.text();
  const locations = sitemapLocations(xml);
  if (locations.length === 0) throw new Error(`${url}: no URLs in sitemap`);
  return { xml, locations };
}

async function getSitemapUrls() {
  const { xml, locations } = await fetchSitemap(sitemapUrl);
  if (!xml.includes("<sitemapindex")) return locations;
  const urls = [];
  for (const loc of locations) {
    const child = await fetchSitemap(validationUrl(loc));
    urls.push(...child.locations);
  }
  return urls;
}

function extractJsonLd(html) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
}

async function main() {
  const urls = await getSitemapUrls();
  console.log(`[validate:jsonld] ${urls.length} URLs from ${sitemapUrl}`);
  let blocksChecked = 0;
  let pagesChecked = 0;
  const failures = [];
  const CONCURRENCY = 8;
  let next = 0;
  async function worker() {
    while (next < urls.length) {
      const url = validationUrl(urls[next++]);
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "JSON-LD-Validator/1.0" },
          signal: AbortSignal.timeout(30000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blocks = extractJsonLd(await res.text());
        if (blocks.length === 0) throw new Error("no JSON-LD blocks found");
        pagesChecked++;
        blocksChecked += blocks.length;
        for (const [i, block] of blocks.entries()) {
          try {
            const parsed = JSON.parse(block.trim());
            if (!parsed || typeof parsed !== "object" || Object.keys(parsed).length === 0) {
              throw new Error("not a non-empty object or array");
            }
          } catch (err) {
            failures.push(`${url} block#${i + 1}: ${err instanceof Error ? err.message : err}`);
          }
        }
      } catch (err) {
        failures.push(`${url}: ${err instanceof Error ? err.message : err}`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));
  if (failures.length > 0) {
    console.error(`[validate:jsonld] FAILED - ${failures.length} errors; ${blocksChecked} blocks inspected on ${pagesChecked}/${urls.length} pages:`);
    failures.forEach((failure) => console.error("  - " + failure));
    process.exitCode = 1;
    return;
  }
  console.log(`[validate:jsonld] OK - ${blocksChecked} JSON-LD blocks valid on all ${pagesChecked} pages.`);
}

main().catch((err) => {
  console.error("[validate:jsonld] error:", err);
  process.exitCode = 1;
});
