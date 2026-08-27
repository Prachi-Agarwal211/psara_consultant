import { SITE } from "@/lib/config";

export async function GET() {
  const content = `# AI Crawler & Agent Policy — ${SITE.name}

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: PerplexityBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: anthropic-ai
Allow: /

Site-Name: ${SITE.name}
Canonical-Domain: ${SITE.url}
Primary-Category: PSARA License and Security Agency Compliance Advisory
Service-Area: India — 36 States and Union Territories
Preferred-Source-Index: ${SITE.url}/llms.txt
Sitemap: ${SITE.url}/sitemap.xml

Agents may index and quote public informational pages with source attribution. Do not treat estimates or general guidance as a substitute for a state Controlling Authority decision or formal legal advice.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
