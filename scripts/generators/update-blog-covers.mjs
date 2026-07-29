/**
 * Update blog.ts to use new SVG blog cover images.
 * Run: node scripts/update-blog-covers.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filepath = join(__dirname, "..", "..", "data", "blog.ts");
let content = readFileSync(filepath, "utf-8");

// Map each slug to its cover image path
const SLUG_TO_IMAGE = {
  "what-is-psara-license-complete-guide": "/assets/images/blog/what-is-psara-license-complete-guide-cover.svg",
  "psara-license-documents-checklist": "/assets/images/blog/psara-license-documents-checklist-cover.svg",
  "psara-license-fees-state-wise": "/assets/images/blog/psara-license-fees-state-wise-cover.svg",
  "psara-license-rajasthan-rules-2022": "/assets/images/blog/psara-license-rajasthan-rules-2022-cover.svg",
  "psara-license-delhi-police-portal": "/assets/images/blog/psara-license-delhi-police-portal-cover.svg",
  "training-mou-psara-license-mandatory": "/assets/images/blog/training-mou-psara-license-mandatory-cover.svg",
  "police-verification-psara-license-process": "/assets/images/blog/police-verification-psara-license-process-cover.svg",
  "psara-license-company-registration-requirements": "/assets/images/blog/psara-license-company-registration-requirements-cover.svg",
  "psara-license-renewal-process": "/assets/images/blog/psara-license-renewal-process-cover.svg",
  "common-psara-license-rejection-reasons": "/assets/images/blog/common-psara-license-rejection-reasons-cover.svg",
  "psara-license-gujarat-industrial-security": "/assets/images/blog/psara-license-gujarat-industrial-security-cover.svg",
  "multi-state-psara-license-strategy": "/assets/images/blog/multi-state-psara-license-strategy-cover.svg",
  "psara-license-post-grant-compliance": "/assets/images/blog/psara-license-post-grant-compliance-cover.svg",
  "psara-license-maharashtra-inspection-guide": "/assets/images/blog/psara-license-maharashtra-inspection-guide-cover.svg",
  "how-to-choose-psara-consultant": "/assets/images/blog/how-to-choose-psara-consultant-cover.svg",
  "psara-license-faqs-answered": "/assets/images/blog/psara-license-faqs-answered-cover.svg",
  "psara-license-haryana-commercial-office": "/assets/images/blog/psara-license-haryana-commercial-office-cover.svg",
  "psara-license-labour-compliance-security-agencies": "/assets/images/blog/psara-license-labour-compliance-security-agencies-cover.svg",
  "psara-license-uttar-pradesh-noida-industrial": "/assets/images/blog/psara-license-uttar-pradesh-noida-industrial-cover.svg",
  "gst-for-security-agencies-complete-guide": "/assets/images/blog/gst-for-security-agencies-complete-guide-cover.svg",
  "psara-license-punjab-chandigarh-industrial": "/assets/images/blog/psara-license-punjab-chandigarh-industrial-cover.svg",
  "psara-license-one-year-validity-states": "/assets/images/blog/psara-license-one-year-validity-states-cover.svg",
};

let count = 0;
for (const [slug, imagePath] of Object.entries(SLUG_TO_IMAGE)) {
  // Find this post's coverImage line by looking for slug + coverImage pattern
  const slugLineRegex = new RegExp(`slug: '${slug}',?\\n(?:.*\\n)*?\\s+coverImage: '/og-image.jpg'`);
  const match = content.match(slugLineRegex);
  if (match) {
    content = content.replace(match[0], match[0].replace("coverImage: '/og-image.jpg'", `coverImage: '${imagePath}'`));
    count++;
  } else {
    console.log(`⚠️ Could not find slug: ${slug}`);
  }
}

writeFileSync(filepath, content, "utf-8");
console.log(`✅ Updated ${count}/22 blog post cover images`);
