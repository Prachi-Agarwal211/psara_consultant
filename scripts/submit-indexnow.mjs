const siteUrl = (process.env.SITE_URL || "https://www.psaraconsultantindia.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY;
if (!key) throw new Error("INDEXNOW_KEY is required; refusing to submit with a fallback key.");
const sitemapUrl = `${siteUrl}/sitemap.xml`;
const indexNowEndpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

const sitemapResponse = await fetch(sitemapUrl, {
  headers: { "User-Agent": "PSARA-IndexNow-Submitter/1.0" },
});

if (!sitemapResponse.ok) {
  throw new Error(`Unable to fetch ${sitemapUrl}: HTTP ${sitemapResponse.status}`);
}

const sitemapXml = await sitemapResponse.text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (urls.length === 0) {
  throw new Error(`No URLs found in ${sitemapUrl}`);
}

const host = new URL(siteUrl).host;
const response = await fetch(indexNowEndpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList: [...new Set(urls)],
  }),
});

if (!(response.ok || response.status === 202)) {
  throw new Error(`IndexNow rejected submission: HTTP ${response.status} ${await response.text()}`);
}

console.log(`IndexNow accepted ${urls.length} sitemap URLs for ${host} (HTTP ${response.status}).`);
