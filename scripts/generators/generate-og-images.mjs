/**
 * Generate OG (Open Graph) SVG images for all 22 blog posts + default OG.
 * Optimized for social media cards: bold brand mark, large title, high contrast.
 * Run: node scripts/generate-og-images.mjs
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

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function generateOGSVG(title, category) {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS["PSARA License"];
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");
  const fontSize = title.length > 30 ? 42 : title.length > 20 ? 48 : 52;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Background gradient with spotlight -->
    <radialGradient id="spot" cx="65%" cy="40%" r="80%">
      <stop offset="0%" stop-color="${colors.accent}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="${colors.accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f6fafd"/>
      <stop offset="100%" stop-color="#f6fafd" stop-opacity="0.85"/>
    </linearGradient>
    <!-- Gold shimmer for brand mark -->
    <linearGradient id="goldShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.accent}"/>
      <stop offset="50%" stop-color="#f3df9a"/>
      <stop offset="100%" stop-color="${colors.accent}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${colors.bg}"/>
  <rect width="1200" height="630" fill="url(#spot)"/>

  <!-- Brand Mark (top-left) -->
  <!-- PSARA letters stacked like a seal -->
  <g transform="translate(50, 45)">
    <text font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="${colors.accent}" letter-spacing="3">PSARA</text>
    <text font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="${colors.accent}" opacity="0.5" y="18" letter-spacing="1">CONSULTANT INDIA</text>
  </g>

  <!-- Brand URL (top-right) -->
  <text x="1150" y="58" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" fill="${colors.accent}" opacity="0.35" letter-spacing="1">psaraconsultantindia.com</text>

  <!-- Decorative top line -->
  <rect x="50" y="80" width="1100" height="1" fill="url(#line)"/>

  <!-- Left accent bar -->
  <rect x="50" y="120" width="3" height="340" fill="${colors.accent}" opacity="0.15" rx="1.5"/>

  <!-- Category Badge -->
  <rect x="75" y="130" width="${category.length * 8 + 30}" height="28" rx="4" fill="${colors.accent}" opacity="0.12"/>
  <text x="90" y="148" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="${colors.accent}" letter-spacing="1.5">${category.toUpperCase()}</text>

  <!-- Post Title — large, readable at small card sizes -->
  <text x="75" y="${line2 ? 240 : 255}" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="700" fill="url(#titleGrad)" letter-spacing="-0.3">
    <tspan x="75" dy="0">${escapeXml(line1)}</tspan>
    ${line2 ? `<tspan x="75" dy="${Math.round(fontSize * 1.25)}">${escapeXml(line2)}</tspan>` : ""}
  </text>

  <!-- Subtle decorative diamond markers -->
  <rect x="75" y="330" width="6" height="6" rx="0" transform="rotate(45 78 333)" fill="${colors.accent}" opacity="0.1"/>
  <rect x="91" y="330" width="6" height="6" rx="0" transform="rotate(45 94 333)" fill="${colors.accent}" opacity="0.06"/>

  <!-- Read indicator dots (decorative) -->
  ${Array.from({ length: 3 }, (_, i) => {
    const x = 75 + i * 20;
    return `<circle cx="${x}" cy="365" r="2.5" fill="${colors.accent}" opacity="${0.08 + (i + 1) * 0.04}"/>`;
  }).join("\n")}

  <!-- Bottom section with brand info -->
  <rect x="50" y="400" width="1100" height="1" fill="url(#line)"/>

  <!-- Pillar stat: 300+ Agencies | 28 States | 5.0 Rating -->
  <g transform="translate(75, 430)">
    <text font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="${colors.accent}">300+</text>
    <text font-family="system-ui, sans-serif" font-size="10" fill="#f6fafd" opacity="0.4" x="0" y="16" letter-spacing="1">AGENCIES SERVED</text>

    <text font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="${colors.accent}" x="140">28</text>
    <text font-family="system-ui, sans-serif" font-size="10" fill="#f6fafd" opacity="0.4" x="140" y="16" letter-spacing="1">STATES COVERED</text>

    <text font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="${colors.accent}" x="260">5.0</text>
    <text font-family="system-ui, sans-serif" font-size="10" fill="#f6fafd" opacity="0.4" x="260" y="16" letter-spacing="1">GOOGLE RATING</text>
  </g>

  <!-- Ghost watermark -->
  <text x="1150" y="580" text-anchor="end" font-family="system-ui, sans-serif" font-size="80" font-weight="900" fill="${colors.accent}" opacity="0.03" letter-spacing="-4">PSARA</text>

  <!-- Bottom corner ornament BL -->
  <path d="M50 560 L50 580 L70 580" stroke="${colors.accent}" stroke-width="1" fill="none" opacity="0.2"/>
  <!-- Bottom corner ornament BR -->
  <path d="M1150 580 L1130 580 L1130 560" stroke="${colors.accent}" stroke-width="1" fill="none" opacity="0.2"/>

  <!-- Footer URL -->
  <text x="600" y="595" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#f6fafd" opacity="0.12" letter-spacing="2">PSARACONSULTANTINDIA.COM</text>
</svg>`;
}

// Generate default OG image (no post-specific title)
function generateDefaultOG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="spot" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="#e0b84a" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#1a1510" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="#e0b84a" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#1a1510"/>
  <rect width="1200" height="630" fill="url(#spot)"/>

  <!-- Brand -->
  <text x="600" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="72" font-weight="800" fill="#e0b84a" letter-spacing="-2">PSARA</text>
  <text x="600" y="275" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#e0b84a" opacity="0.6" letter-spacing="4">CONSULTANT INDIA</text>

  <rect x="400" y="310" width="400" height="1" fill="url(#line)"/>

  <text x="600" y="355" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#f6fafd" opacity="0.85" letter-spacing="-0.3">PSARA License Clearance Across India</text>

  <text x="600" y="400" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#f6fafd" opacity="0.35" letter-spacing="3">STATUTE-FIRST · VERIFICATION-READY · POST-GRANT</text>

  <!-- Stats -->
  <g transform="translate(430, 450)">
    <text x="0" y="0" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#e0b84a">300+</text>
    <text x="0" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.4" letter-spacing="1">AGENCIES</text>
    <text x="100" y="0" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#e0b84a">28</text>
    <text x="100" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.4" letter-spacing="1">STATES</text>
    <text x="200" y="0" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#e0b84a">5.0</text>
    <text x="200" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#f6fafd" opacity="0.4" letter-spacing="1">RATING</text>
  </g>

  <!-- Ghost watermark -->
  <text x="600" y="540" text-anchor="middle" font-family="system-ui, sans-serif" font-size="180" font-weight="900" fill="#e0b84a" opacity="0.03" letter-spacing="-8">PSARA</text>

  <text x="600" y="595" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#f6fafd" opacity="0.12" letter-spacing="2">PSARACONSULTANTINDIA.COM</text>
</svg>`;
}

// Generate all SVGs
const blogDir = join(__dirname, "..", "..", "public", "assets", "images", "og");
if (!existsSync(blogDir)) {
  mkdirSync(blogDir, { recursive: true });
}

// Default OG
writeFileSync(join(blogDir, "default-og.svg"), generateDefaultOG(), "utf-8");
console.log("[0/23] Generated: default-og.svg");

// Per-post OGs
POSTS.forEach((post, i) => {
  const svg = generateOGSVG(post.title, post.category);
  const filename = `${post.slug}-og.svg`;
  writeFileSync(join(blogDir, filename), svg, "utf-8");
  console.log(`[${i + 1}/${POSTS.length}] Generated: ${filename}`);
});

console.log("\n✅ All 23 OG images generated in public/assets/images/og/");
