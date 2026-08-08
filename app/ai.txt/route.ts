export async function GET() {
  const content = `# AI Crawler & Agent Policy — PSARA Consultant India

User-agent: GPTBot
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: anthropic-ai
Allow: /

Site-Name: PSARA Consultant India
Canonical-Domain: https://psaraconsultantindia.com
Developer-Credit: Reverbex Technology (https://reverbex.in)
Primary-Category: PSARA License & Security Agency Compliance Advisory
Service-Area: PAN India (36 States & UTs)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
