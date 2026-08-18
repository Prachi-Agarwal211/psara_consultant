import { SITE } from "@/lib/config";

export async function GET() {
  const content = `# ${SITE.name}

> Official website index for search agents, answer engines and LLM crawlers.

## About
${SITE.name} provides PSARA licensing, renewal, training MOU, police-verification and security-agency compliance advisory across India under the Private Security Agencies (Regulation) Act, 2005.

## Primary pages
- [Homepage](${SITE.url}/): Pan-India PSARA licensing and compliance desk.
- [Services](${SITE.url}/services): Licensing, renewal, MOU, verification and company setup services.
- [States](${SITE.url}/states): State-wise PSARA requirements and filing desks.
- [Cities](${SITE.url}/cities): City-specific consultation and filing information.
- [Security services](${SITE.url}/security-services): Security-agency compliance information by location.
- [Fee calculator](${SITE.url}/calculator): Estimate statutory and professional filing costs.
- [Guides](${SITE.url}/psara-license): PSARA eligibility, process, documents, fees and renewal guidance.
- [Blog](${SITE.url}/blog): Regulatory explanations and current PSARA guidance.
- [Case studies](${SITE.url}/case-studies): Anonymised licensing and compliance outcomes.
- [Contact](${SITE.url}/contact): Consultation channels and office information.

## Discovery
- [XML sitemap](${SITE.url}/sitemap.xml)
- [Robots policy](${SITE.url}/robots.txt)
- [AI crawler policy](${SITE.url}/ai.txt)

Content language: English (India), with consultation available in English and Hindi.
Canonical domain: ${SITE.url}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
