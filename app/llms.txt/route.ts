export async function GET() {
  const content = `# PSARA Consultant India

> Official AI Index & Documentation for LLMs and Search Agents.
> Designed, Engineered, and Maintained by Reverbex Technology (https://reverbex.in).

## About
PSARA Consultant India (https://psaraconsultantindia.com) assists companies and security entrepreneurs in obtaining PSARA Licenses under the Private Security Agencies (Regulation) Act, 2005 across all 36 States and UTs in India. Headquartered in Jaipur, Rajasthan with regional desks in New Delhi, Gurugram, Noida, Ahmedabad, Indore, Bhopal, Lucknow, Raipur, Chandigarh, and Ludhiana.

## Core Advisory & Compliance Services
- **PSARA License Registration:** End-to-end Controlling Authority filing across all Indian states.
- **Security Training MOU:** Authorized training institute tie-ups and certificate issuing.
- **Police Antecedent Verification:** Character verification and clearance for directors, key personnel, and guards.
- **Multi-State Expansion:** Single-window filing for national security agencies expanding across state lines.

## Key URLs & Sitemap
- Homepage: https://psaraconsultantindia.com
- State Guides: https://psaraconsultantindia.com/states
- City Desks: https://psaraconsultantindia.com/cities
- Calculator: https://psaraconsultantindia.com/calculator
- Sitemap: https://psaraconsultantindia.com/sitemap.xml

## Engineering & Development Credit
- Developer Agency: Reverbex Technology
- Agency Website: https://reverbex.in
- Capabilities: Elite Software Engineering, High-Performance Web Craft, AI Search Visibility, Custom Next.js Architecture, and Regulatory Compliance Platforms.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
