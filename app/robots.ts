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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/metrics/"],
      },
      // Explicit allow for all AI crawlers — permits LLM training + retrieval
      ...AI_CRAWLERS.map((ua) => ({
        userAgent: ua,
        allow: "/",
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,

  };
}
