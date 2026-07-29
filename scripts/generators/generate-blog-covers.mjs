/**
 * Generate branded SVG blog cover images for all 22 PSARA blog posts.
 * Each cover has: warm dark bg, post title, category badge, decorative gold elements.
 * Run: node scripts/generate-blog-covers.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const POSTS = [
  { slug: "what-is-psara-license-complete-guide", title: "What is a PSARA License?", category: "PSARA License" },
  { slug: "psara-license-documents-checklist", title: "PSARA Documents Checklist", category: "PSARA License" },
  { slug: "psara-license-fees-state-wise", title: "PSARA License Fees 2026", category: "PSARA License" },
  { slug: "psara-license-rajasthan-rules-2022", title: "PSARA License in Rajasthan", category: "State Guides" },
  { slug: "psara-license-delhi-police-portal", title: "PSARA License in Delhi", category: "State Guides" },
  { slug: "training-mou-psara-license-mandatory", title: "Training MOU for PSARA", category: "PSARA License" },
  { slug: "police-verification-psara-license-process", title: "Police Verification Guide", category: "PSARA License" },
  { slug: "psara-license-company-registration-requirements", title: "Company Registration for PSARA", category: "PSARA License" },
  { slug: "psara-license-renewal-process", title: "PSARA Renewal Process", category: "Compliance" },
  { slug: "common-psara-license-rejection-reasons", title: "10 Common Rejection Reasons", category: "PSARA License" },
  { slug: "psara-license-gujarat-industrial-security", title: "PSARA License in Gujarat", category: "State Guides" },
  { slug: "multi-state-psara-license-strategy", title: "Multi-State License Strategy", category: "Industry Insights" },
  { slug: "psara-license-post-grant-compliance", title: "Post-Grant Compliance", category: "Compliance" },
  { slug: "psara-license-maharashtra-inspection-guide", title: "PSARA License in Maharashtra", category: "State Guides" },
  { slug: "how-to-choose-psara-consultant", title: "Choose the Right Consultant", category: "Industry Insights" },
  { slug: "psara-license-faqs-answered", title: "PSARA License FAQs", category: "PSARA License" },
  { slug: "psara-license-haryana-commercial-office", title: "PSARA License in Haryana", category: "State Guides" },
  { slug: "psara-license-labour-compliance-security-agencies", title: "Labour Compliance Guide", category: "Compliance" },
  { slug: "psara-license-uttar-pradesh-noida-industrial", title: "PSARA License in UP", category: "State Guides" },
  { slug: "gst-for-security-agencies-complete-guide", title: "GST for Security Agencies", category: "Compliance" },
  { slug: "psara-license-punjab-chandigarh-industrial", title: "PSARA License in Punjab", category: "State Guides" },
  { slug: "psara-license-one-year-validity-states", title: "One-Year Validity States", category: "Compliance" },
];

const CATEGORY_COLORS = {
  "PSARA License": { accent: "#e0b84a", bg: "#1a1510" },
  "State Guides": { accent: "#c9945b", bg: "#241e16" },
  "Compliance": { accent: "#1fb87a", bg: "#1a1a1a" },
  "Industry Insights": { accent: "#5eb8ff", bg: "#1b3558" },
};

function generateSVG(slug, title, category) {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS["PSARA License"];
  const shortened = title.length > 28 ? title.slice(0, 26) + "…" : title;
  const words = shortened.split(" ");
  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="spot" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${colors.accent}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="${colors.accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f6fafd"/>
      <stop offset="100%" stop-color="#f6fafd" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feBlend in="SourceGraphic" mode="overlay"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${colors.bg}"/>
  <rect width="1200" height="630" fill="url(#spot)"/>

  <!-- Noise texture overlay -->
  <rect width="1200" height="630" fill="${colors.bg}" opacity="0.03" filter="url(#noise)"/>

  <!-- Top decorative border -->
  <rect x="40" y="30" width="1120" height="1" fill="url(#line)"/>
  <rect x="40" y="599" width="1120" height="1" fill="url(#line)"/>

  <!-- Corner ornament TL -->
  <path d="M40 70 L40 40 L70 40" stroke="${colors.accent}" stroke-width="1.5" fill="none" opacity="0.4"/>
  <!-- Corner ornament TR -->
  <path d="M1160 40 L1130 40 L1130 70" stroke="${colors.accent}" stroke-width="1.5" fill="none" opacity="0.4"/>
  <!-- Corner ornament BL -->
  <path d="M40 560 L40 590 L70 590" stroke="${colors.accent}" stroke-width="1.5" fill="none" opacity="0.4"/>
  <!-- Corner ornament BR -->
  <path d="M1160 590 L1130 590 L1130 560" stroke="${colors.accent}" stroke-width="1.5" fill="none" opacity="0.4"/>

  <!-- Small gold diamond markers -->
  <rect x="596" y="50" width="8" height="8" rx="0" transform="rotate(45 600 54)" fill="${colors.accent}" opacity="0.15"/>

  <!-- Category badge -->
  <rect x="525" y="100" width="150" height="30" rx="4" fill="${colors.accent}" opacity="0.15"/>
  <text x="600" y="119" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="${colors.accent}" letter-spacing="2" text-transform="uppercase">${category.toUpperCase()}</text>

  <!-- Ghost display text (decorative background) -->
  <text x="40" y="540" font-family="system-ui, sans-serif" font-size="120" font-weight="900" fill="${colors.accent}" opacity="0.04" letter-spacing="-4">PSARA</text>

  <!-- Publish date line -->
  <text x="600" y="500" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="${colors.accent}" opacity="0.4" letter-spacing="3">www.psaraconsultantindia.com</text>

  <!-- Gold line separator -->
  <rect x="400" y="520" width="400" height="1" fill="url(#line)"/>

  <!-- Title -->
  <text x="80" y="300" font-family="system-ui, sans-serif" font-size="${line2 ? 38 : 44}" font-weight="700" fill="url(#titleGrad)" letter-spacing="-0.5">
    <tspan x="100" dy="0">${escapeXml(line1)}</tspan>
    ${line2 ? `<tspan x="100" dy="55">${escapeXml(line2)}</tspan>` : ""}
  </text>

  <!-- Reading indicator dots -->
  ${Array.from({ length: 4 }, (_, i) => {
    const x = 100 + i * 16;
    return `<circle cx="${x}" cy="420" r="2.5" fill="${colors.accent}" opacity="${0.1 + (i + 1) * 0.05}"/>`;
  }).join("\n")}

  <!-- Bottom decorative line -->
  <rect x="100" y="445" width="300" height="1" fill="${colors.accent}" opacity="0.08"/>
</svg>`;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Generate all SVGs
const outDir = join(__dirname, "..", "..", "public", "assets", "images", "blog");
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

POSTS.forEach((post, i) => {
  const svg = generateSVG(post.slug, post.title, post.category);
  const filename = `${post.slug}-cover.svg`;
  const filepath = join(outDir, filename);
  writeFileSync(filepath, svg, "utf-8");
  console.log(`[${i + 1}/${POSTS.length}] Generated: ${filename}`);
});

console.log("\n✅ All 22 blog cover images generated in public/assets/images/blog/");
