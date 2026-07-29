import type { MetadataRoute } from "next";
import { SITE } from "../lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Applebot-Extended",
          "Bytespider",
          "Grokbot",
          "cohere-ai",
          "Google-InspectionTool",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
