/**
 * Careers at PSARA Consultant India — powers /careers and /careers/[slug].
 * Each role carries structured fields for the JobPosting JSON-LD schema.
 */
export interface Career {
  slug: string;
  title: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  department: string;
  location: string;
  locations: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  salary?: string;
  postedAt: string;
  validThrough: string;
  remoteOk?: boolean;
}

export const CAREERS: Career[] = [
  {
    slug: "senior-psara-legal-researcher",
    title: "Senior PSARA Legal Researcher",
    type: "Full-Time",
    department: "Regulatory Affairs",
    location: "Jaipur HQ / Hybrid",
    locations: ["Jaipur", "New Delhi", "Gurugram"],
    description:
      "Draft state-specific Form-I application dossiers, examine Controlling Authority guidelines across all 38 States & UTs, and prepare Training MOUs for promoter filings. Own the research that keeps every state page on this site statute-accurate.",
    responsibilities: [
      "Research and maintain the State Controlling Authority rule matrix for all 38 States & UTs",
      "Draft Form-I dossiers, affidavits, and entity-object clauses aligned to each state checklist",
      "Prepare and renew Training MOU templates with state-recognised institutes",
      "Track PSARA fee notifications, bond requirements, and police verification timelines per state",
      "QA client documents against the researched state rules before submission",
      "Keep the site's state/city SEO content legally current as rules change",
    ],
    requirements: [
      "LL.B. or strong legal research background (Company Secretary / Compliance preferred)",
      "2+ years in regulatory or licensing work; PSARA experience a strong plus",
      "Meticulous document drafting and checklist discipline",
      "Comfort reading statutes, State Rules, and MHA notifications",
    ],
    benefits: [
      "Domain leadership on India's fastest-growing licensing framework",
      "Performance-linked bonuses and professional development budget",
      "Hybrid working with Jaipur HQ collaboration",
    ],
    salary: "₹5 – 8 LPA depending on experience",
    postedAt: "2026-07-15",
    validThrough: "2026-10-15",
    remoteOk: true,
  },
  {
    slug: "state-licensing-liaison-officer",
    title: "State Licensing Liaison Officer",
    type: "Full-Time",
    department: "Field Liaison",
    location: "Delhi NCR / Mumbai / Lucknow",
    locations: ["New Delhi", "Mumbai", "Lucknow", "Ahmedabad"],
    description:
      "Manage police antecedent verification procedures, SP/CP office coordination, and physical office inspection filings across assigned states. The on-ground face of our dossier-to-grant pipeline.",
    responsibilities: [
      "Coordinate police verification and antecedent clearance for promoters/directors",
      "Liaise with State Controlling Authority desks, SP offices, and inspection wings",
      "Schedule and prepare offices for physical inspection readiness",
      "Track application status across assigned states and escalate bottlenecks",
      "Report grant/renewal progress to the client-facing team",
    ],
    requirements: [
      "Strong government-liaison experience in licensing or regulatory work",
      "Clean communication and patience with multi-department verification queues",
      "Willingness to travel within the assigned state cluster",
      "Hindi + English fluency; local languages a plus",
    ],
    benefits: [
      "Travel allowance and field expense coverage",
      "Milestone bonuses on successful grants",
      "Career path to Regional Operations Lead",
    ],
    salary: "₹4 – 7 LPA + field allowances",
    postedAt: "2026-07-10",
    validThrough: "2026-10-10",
  },
  {
    slug: "security-agency-compliance-auditor",
    title: "Security Agency Compliance Auditor",
    type: "Full-Time",
    department: "Audit & Renewal",
    location: "Pan India / Remote",
    locations: ["Remote", "Jaipur", "New Delhi"],
    description:
      "Conduct post-grant PSARA compliance reviews, guard uniform code verification, register maintenance, and 5-year licence renewal audits for our client agencies.",
    responsibilities: [
      "Audit client registers, uniforms, training records, and labour hygiene post-grant",
      "Build renewal calendars and compliance reminders for multi-state clients",
      "Advise on statutory register formats and labour registrations (PF/ESIC thresholds)",
      "Deliver compliance reports that survive Controlling Authority inspections",
      "Maintain the renewal-tracking module on our internal platform",
    ],
    requirements: [
      "3+ years in statutory compliance, audit, or HR compliance",
      "Working knowledge of PSARA, labour codes, and PF/ESIC registration triggers",
      "Excellent report writing and client communication",
      "Remote-first with occasional travel for client inspections",
    ],
    benefits: [
      "Fully remote culture",
      "Annual compliance-education budget (certifications reimbursed)",
      "Project-based incentive structure",
    ],
    salary: "₹5 – 8 LPA",
    postedAt: "2026-07-05",
    validThrough: "2026-10-05",
    remoteOk: true,
  },
  {
    slug: "digital-marketing-seo-specialist",
    title: "Digital Marketing & SEO Specialist",
    type: "Full-Time",
    department: "Growth",
    location: "Jaipur HQ / Remote",
    locations: ["Jaipur", "Remote"],
    description:
      "Own technical SEO, Geo-SEO (AI answer-engine visibility), content operations, and local search for a site covering 38 states, 400+ cities, 20+ services, and a full blog corpus.",
    responsibilities: [
      "Maintain technical SEO hygiene: sitemap, IndexNow, Core Web Vitals, structured data",
      "Grow GEO visibility — citations in ChatGPT, Perplexity, Google AI Overviews",
      "Scale city/state content operations and internal linking",
      "Run GBP (Google Business Profile) local-SEO programmes for 12+ office locations",
      "Report rankings, indexed URLs, and AI-citation share weekly",
    ],
    requirements: [
      "2+ years hands-on technical SEO; schema and sitemap experience required",
      "Understanding of programmatic content at scale",
      "Data-driven with Search Console / Ahrefs / Screaming Frog fluency",
    ],
    benefits: [
      "Own the growth engine of a fast-scaling compliance brand",
      "Performance bonus on organic traffic milestones",
      "Flexible remote schedule",
    ],
    salary: "₹4 – 7 LPA",
    postedAt: "2026-07-01",
    validThrough: "2026-09-30",
    remoteOk: true,
  },
  {
    slug: "client-success-psara-advisor",
    title: "Client Success & PSARA Advisor",
    type: "Full-Time",
    department: "Client Success",
    location: "Jaipur HQ",
    locations: ["Jaipur"],
    description:
      "Be the first call for entrepreneurs applying for PSARA licences. Advise on entity structure, coverage slabs, timelines, and documentation; hand the technical work to our research and liaison teams.",
    responsibilities: [
      "Consult clients on PSARA eligibility, entity types, and district coverage",
      "Prepare precise checklists and fee breakdowns per state",
      "Coordinate between client, research, and liaison teams through the grant",
      "Maintain WhatsApp-first response SLAs and post-grant follow-ups",
      "Collect client success stories and Google reviews ethically",
    ],
    requirements: [
      "1+ years in client-facing advisory or B2B sales (consulting preferred)",
      "Excellent phone and WhatsApp communication",
      "Ability to translate legal requirements into plain client language",
    ],
    benefits: [
      "Direct revenue-share incentives",
      "Training on PSARA law funded by the company",
      "Growth path to Practice Lead",
    ],
    salary: "₹3 – 6 LPA + incentives",
    postedAt: "2026-06-20",
    validThrough: "2026-09-20",
  },
  {
    slug: "react-nextjs-frontend-developer",
    title: "React / Next.js Frontend Developer",
    type: "Full-Time",
    department: "Engineering",
    location: "Remote",
    locations: ["Remote"],
    description:
      "Build and maintain the Next.js platform behind psaraconsultantindia.com — animated dossier pages, city/state programmatic content, SEO infrastructure, and 100/100 Lighthouse scores.",
    responsibilities: [
      "Ship pixel-perfect, animated sections in React / Next.js / Tailwind",
      "Maintain GSAP scroll choreography, Lenis smooth-scroll, and custom cursor",
      "Keep Lighthouse, a11y (axe), and Core Web Vitals green",
      "Automate programmatic content pages and sitemap generation",
      "Code-review with the design team and keep the component library tidy",
    ],
    requirements: [
      "2+ years React; Next.js App Router experience",
      "Tailwind CSS and animation libraries (GSAP) experience",
      "Eye for design fidelity and attention to micro-interactions",
    ],
    benefits: [
      "Remote-first with async culture",
      "Latest hardware and dev tooling",
      "Ship work used by thousands of security entrepreneurs",
    ],
    salary: "₹6 – 12 LPA",
    postedAt: "2026-06-15",
    validThrough: "2026-09-15",
    remoteOk: true,
  },
  {
    slug: "training-mou-coordinator",
    title: "Training MOU & Institute Coordinator",
    type: "Contract",
    department: "Compliance Operations",
    location: "Pan India / Remote",
    locations: ["Remote", "New Delhi", "Mumbai", "Bengaluru"],
    description:
      "Maintain our national network of state-recognised security guard training institutes. Validate institute credentials, negotiate MOUs per state Rules, and keep the training pipeline inspection-ready.",
    responsibilities: [
      "Onboard and vet training institutes across all 38 states",
      "Negotiate and renew Training MOUs aligned to each state's recognised list",
      "Maintain a live institute registry for our research team",
      "Resolve client training-documentation queries before filing",
    ],
    requirements: [
      "Experience in partnerships, vendor management, or training operations",
      "Knowledge of the PSARA training MOU requirement across states",
      "Strong negotiation and documentation skills",
    ],
    benefits: [
      "Contract flexibility with volume-based compensation",
      "Build a national network in a niche compliance vertical",
    ],
    salary: "₹30,000 – 50,000/month retainer",
    postedAt: "2026-06-10",
    validThrough: "2026-09-10",
    remoteOk: true,
  },
  {
    slug: "content-writer-psara-guides",
    title: "Content Writer — PSARA & Security Guides",
    type: "Contract",
    department: "Content",
    location: "Remote",
    locations: ["Remote"],
    description:
      "Write deep, statute-accurate guides, state briefs, and city landing copy for our programmatic SEO engine. Fact-check against researched CA data and MHA rules before anything ships.",
    responsibilities: [
      "Draft long-form PSARA guides and blog posts with real research citations",
      "Refresh state/city content when rules, fees, or officers change",
      "Write FAQ and schema-ready answer blocks",
      "Collaborate with the legal research team on factual accuracy",
    ],
    requirements: [
      "2+ years B2B or legal-adjacent content writing",
      "Comfort translating regulatory text into clear prose",
      "SEO basics: headings, intent, internal linking",
    ],
    benefits: [
      "Per-article payment with bonus for ranking wins",
      "Byline and portfolio growth in a niche vertical",
    ],
    salary: "₹8,000 – 15,000/article",
    postedAt: "2026-06-01",
    validThrough: "2026-08-31",
    remoteOk: true,
  },
];

export const CAREER_SLUGS = CAREERS.map((c) => c.slug);
