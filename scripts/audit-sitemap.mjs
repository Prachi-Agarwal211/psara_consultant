// Audit: crawl every URL in the built sitemap against the dev server; report non-200s.
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const sitemapPath = join(process.cwd(), ".next", "server", "app", "sitemap.xml.body");
let sitemap;
try {
  sitemap = readFileSync(sitemapPath, "utf8");
} catch {
  const { execSync } = await import("child_process");
  sitemap = execSync("find .next -name 'sitemap*' -exec cat {} \\;").toString();
}
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
writeFileSync(join(process.cwd(), "scripts", ".sitemap-urls.txt"), urls.join("\n"));
console.log(`SITEMAP URLS: ${urls.length}`);

const base = process.env.AUDIT_BASE || "http://localhost:3001";
const concurrency = 20;
const failures = [];
let done = 0;

async function worker(queue) {
  while (queue.length) {
    const url = queue.shift();
    try {
      const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) });
      if (res.status !== 200) failures.push(`${res.status} ${url}`);
    } catch (e) {
      failures.push(`ERR ${url} (${e.cause?.code || e.message.slice(0, 40)})`);
    }
    done++;
    if (done % 150 === 0) console.log(`  crawled ${done}/${urls.length}...`);
  }
}

// Rewrite absolute production URLs to the audit target (dev server by default)
const queue = urls.map((u) => u.replace(/^https:\/\/consult\.psaraconsultantindia\.com/, base));
await Promise.all(Array.from({ length: concurrency }, () => worker(queue)));
console.log(`\nDONE: ${done} crawled, ${failures.length} non-200`);
failures.slice(0, 40).forEach((f) => console.log("  ", f));
