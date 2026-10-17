import { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/**
 * AI Crawler allow-list — enables GEO (Generative Engine Optimisation) and
 * AEO (Answer Engine Optimisation). All known AI search / LLM crawlers are
 * explicitly permitted so every PSARA page can be cited in AI answers.
 *
 * Updated: 2026-08 — covers OpenAI, Anthropic, Google, Perplexity, Mistral,
 * Cohere, Apple, You.com, DuckDuckGo AI, Meta AI crawlers, and more.
 */

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Googlebot",
  "CCBot",
  "YouBot",
  "DuckAssistBot",
  "cohere-ai",
  "Applebot-Extended",
  "Applebot",
  "meta-externalagent",
  "Bytespider",
  "MistralBot",
  "Grokbot",
  "FacebookBot",
  "YandexBot",
  "Amazonbot",
];

// ponytail: never disallow /_next/ — Google needs JS/CSS to render.
// /quote/ is the internal quotation desk — keep it out of every index,
// including AI crawlers (it exposes the cost breakdown used for clients).
const PRIVATE_PATHS = ["/api/", "/admin/", "/metrics/", "/quote/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // Explicit AI rules repeat the private-path exclusions. A specific
      // user-agent rule can otherwise override the wildcard rule above.
      ...AI_CRAWLERS.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,

  };
}
