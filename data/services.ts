export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  keywords: string[];
  sections: { h: string; p: string }[];
  process: string[];
  whoFor: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "psara-license",
    title: "PSARA License Registration",
    short: "End-to-end Private Security Agency license filing across India.",
    description:
      "Complete PSARA License registration under the Private Security Agencies (Regulation) Act, 2005 — documentation, police antecedent, training MOU, inspection readiness, and license grant support across major States and UTs.",
    bullets: [
      "Form preparation and Controlling Authority filing",
      "Director character & antecedent coordination",
      "Uniform pattern and premises inspection prep",
      "Post-grant register and compliance handover",
      "Multi-district and multi-state sequencing advice",
    ],
    keywords: ["PSARA License", "security agency license India", "PSARA registration"],
    sections: [
      {
        h: "What we deliver",
        p: "A grant-ready dossier mapped to your State Controlling Authority checklist — not a generic folder of random PDFs. We align entity objects, office proof, training MOU, affidavits, and police verification so the first submission is complete.",
      },
      {
        h: "State-aware execution",
        p: "Delhi portals, Maharashtra inspection culture, Haryana commercial-office norms, one-year validity States, and Rajasthan Group-9 practice are not the same file. We adjust forms, fee slabs, and liaison paths per State.",
      },
      {
        h: "After the licence",
        p: "Grant is the midpoint. We brief you on registers, labour hygiene thresholds, renewal calendars, and how to avoid operating outside licensed districts.",
      },
    ],
    process: [
      "Discovery call — State, entity type, coverage, office city",
      "Gap audit of documents and object clauses",
      "Training MOU coordination",
      "Police verification pack filing",
      "Controlling Authority submission",
      "Inspection readiness & query handling",
      "Grant support and post-licence checklist",
    ],
    whoFor: [
      "First-time security agency founders",
      "Manpower firms adding a security vertical",
      "Agencies expanding multi-district or multi-state",
      "Operators regularising previously informal deployments",
    ],
    faqs: [
      {
        q: "How long does end-to-end PSARA support take?",
        a: "Indicative Authority timelines are 30–70+ days depending on State and verification. Our documentation sprint usually starts within days of receiving complete inputs.",
      },
      {
        q: "Do you file in all States?",
        a: "We support pan-India filings with deepest operational strength in Rajasthan, Delhi NCR, Gujarat, UP, MP, Maharashtra, Karnataka, and other major markets.",
      },
    ],
  },
  {
    slug: "company-registration",
    title: "Company Registration for PSARA",
    short: "Pvt Ltd / LLP incorporation with PSARA-ready object clauses.",
    description:
      "Incorporate a security agency entity with main objects aligned to PSARA requirements so your license application is not delayed by MOA/AOA defects.",
    bullets: [
      "Private Limited, LLP, or OPC structuring advice",
      "MOA/AOA object clause drafting for security services",
      "DIN, DSC, and ROC coordination",
      "Registered office documentation support",
    ],
    keywords: ["security company registration", "PSARA company incorporation"],
    sections: [
      {
        h: "Objects first, branding second",
        p: "Beautiful logos do not clear Controlling Authority desks. We draft objects that expressly permit private security agency activity before you spend on stationery.",
      },
      {
        h: "Director hygiene",
        p: "Every director will face police verification. We help you choose a board that can clear antecedents and remain contactable during field checks.",
      },
    ],
    process: [
      "Structure recommendation (Pvt Ltd vs LLP)",
      "Name and object drafting",
      "SPICe+/incorporation filing support",
      "PAN, bank, and office alignment",
      "Handover into PSARA dossier build",
    ],
    whoFor: ["Founders starting fresh", "Firms converting structure before licensing"],
    faqs: [
      {
        q: "Is Pvt Ltd mandatory?",
        a: "Not always legally mandatory, but preferred for scale, tenders, and investor comfort. We explain trade-offs for your case.",
      },
    ],
  },
  {
    slug: "gst-registration",
    title: "GST Registration",
    short: "GSTIN setup for security agencies and multi-state operations.",
    description:
      "GST registration and basic compliance alignment for private security businesses operating one or multiple states.",
    bullets: [
      "GSTIN application",
      "Business profile alignment for security services",
      "Invoice readiness guidance",
      "Multi-state registration notes where applicable",
    ],
    keywords: ["GST for security agency"],
    sections: [
      {
        h: "Why clients ask for GSTIN",
        p: "Principal employers and facility managers expect tax-compliant vendors. We align GST registration with your PSARA entity identity so invoices and licence names match.",
      },
    ],
    process: [
      "Document collection",
      "Portal filing",
      "ARN tracking",
      "GSTIN activation guidance",
    ],
    whoFor: ["New agencies", "Agencies expanding states of supply"],
    faqs: [
      {
        q: "Is GST required before PSARA?",
        a: "Not always a hard PSARA form prerequisite, but commercially essential early. We sequence both to avoid name mismatches.",
      },
    ],
  },
  {
    slug: "msme-registration",
    title: "MSME / Udyam Registration",
    short: "Udyam registration for eligible security enterprises.",
    description:
      "MSME/Udyam registration support to unlock schemes and credibility for growing security agencies.",
    bullets: ["Udyam filing", "Classification guidance", "Document checklist"],
    keywords: ["MSME security agency", "Udyam registration"],
    sections: [
      {
        h: "Where Udyam helps",
        p: "Tenders, banking conversations, and scheme eligibility often ask for Udyam. We register the correct activity classification for security services.",
      },
    ],
    process: ["Eligibility check", "Portal filing", "Certificate handover"],
    whoFor: ["Eligible micro and small security enterprises"],
    faqs: [
      {
        q: "Is MSME mandatory for PSARA?",
        a: "Not a statutory PSARA condition, but useful commercial hygiene for many agencies.",
      },
    ],
  },
  {
    slug: "training-mou",
    title: "Security Guard Training MOU",
    short: "Tie-ups with State-recognized training institutes.",
    description:
      "Mandatory training MOU facilitation with institutes recognized under State PSARA Rules for unarmed and armed guard curricula.",
    bullets: [
      "Institute shortlisting by State",
      "MOU drafting and execution support",
      "Training hour compliance (State-specific)",
      "Certificate and record-keeping guidance",
    ],
    keywords: ["security guard training MOU", "PSARA training institute"],
    sections: [
      {
        h: "MOU is not paperwork theatre",
        p: "Authorities and renewal desks re-check training continuity. We help you execute living MOUs with recognised institutes and keep certificates inspection-ready.",
      },
    ],
    process: [
      "State Rules hour mapping",
      "Institute shortlist",
      "MOU execution",
      "Pack insertion into PSARA file",
    ],
    whoFor: ["New applicants", "Agencies with expired MOUs"],
    faqs: [
      {
        q: "Can one MOU cover all States?",
        a: "Usually no. Each State expects recognition under its Rules. We plan multi-state training arrangements deliberately.",
      },
    ],
  },
  {
    slug: "police-verification",
    title: "Police Verification Support",
    short: "Director and staff antecedent verification liaison.",
    description:
      "Coordination for character certificates, Special Branch / CID field verification, and police commissioner reports that gate PSARA grant.",
    bullets: [
      "Director antecedent tracking",
      "Police station / SP office liaison",
      "Document rectification for red flags",
      "Address consistency audits before filing",
    ],
    keywords: ["police verification PSARA", "character certificate security agency"],
    sections: [
      {
        h: "Verification is the long pole",
        p: "Most calendars slip here. We prepare address-clean packs, track status, and fix document defects that stall reports instead of waiting silently.",
      },
    ],
    process: [
      "Promoter KYC consistency check",
      "Form pack preparation",
      "Filing and follow-up",
      "Query response support",
    ],
    whoFor: ["All PSARA applicants", "Agencies adding directors"],
    faqs: [
      {
        q: "What if a director has a pending case?",
        a: "Disclose early. We flag risk and recommend legal counsel pathways — we never coach concealment.",
      },
    ],
  },
  {
    slug: "labour-compliance",
    title: "Labour Compliance (PF / ESIC)",
    short: "EPFO, ESIC, and guard welfare compliance setup.",
    description:
      "Statutory labour registrations and ongoing compliance hygiene for security agencies employing guards.",
    bullets: [
      "EPFO employer code support",
      "ESIC registration support",
      "Minimum wage & register guidance",
      "Principal employer audit readiness notes",
    ],
    keywords: ["ESIC EPFO security agency"],
    sections: [
      {
        h: "Licence without labour hygiene fails commercially",
        p: "Enterprise clients audit PF/ESIC challans. We help you stand up registrations and understand register discipline after PSARA grant.",
      },
    ],
    process: [
      "Headcount and wage threshold review",
      "Registration filings",
      "Challan and register orientation",
    ],
    whoFor: ["Agencies hiring first guard batches", "Agencies failing client audits"],
    faqs: [
      {
        q: "When do PF and ESIC become mandatory?",
        a: "When statutory employee strength and wage thresholds apply. We map your planned roster before you bid unworkable rates.",
      },
    ],
  },
  {
    slug: "roc-filing",
    title: "ROC Filing & Corporate Compliance",
    short: "Annual ROC filings and corporate hygiene for agencies.",
    description:
      "ROC annual returns, director KYC, and corporate compliance so your license entity stays in good standing.",
    bullets: ["AOC-4 / MGT-7 support", "Director KYC", "Registered office updates"],
    keywords: ["ROC filing security company"],
    sections: [
      {
        h: "Lapsed companies look bad in Authority files",
        p: "We keep your corporate secretarial hygiene current so PSARA renewals and bank or client KYC do not stumble on ROC defaults.",
      },
    ],
    process: ["Calendar setup", "Data collection", "Filing", "Acknowledgement archive"],
    whoFor: ["Pvt Ltd / LLP security agencies"],
    faqs: [
      {
        q: "Is ROC linked to PSARA?",
        a: "Not as a single portal, but Authorities and clients notice inactive or non-compliant companies. Keep both clean.",
      },
    ],
  },
  {
    slug: "office-space",
    title: "Office Space / Address Support",
    short: "Registered office readiness for PSARA inspection.",
    description:
      "Guidance and facilitation for registered office proof, utility bills, and premises readiness for Controlling Authority inspection.",
    bullets: [
      "Address proof checklist",
      "Lease / utility alignment",
      "Inspection-ready office tips",
      "Commercial vs residential risk guidance",
    ],
    keywords: ["PSARA registered office"],
    sections: [
      {
        h: "Inspection-ready, not photo-ready",
        p: "We guide you toward premises and paper trails that survive field visits — not one-day rented backdrops that fail utility-name checks.",
      },
    ],
    process: [
      "State office norms briefing",
      "Document checklist",
      "Premises readiness review",
      "Pack insertion into PSARA file",
    ],
    whoFor: ["Applicants without commercial offices", "Agencies shifting principal place"],
    faqs: [
      {
        q: "Do you sell fake virtual offices?",
        a: "No. We help with readiness guidance. Final acceptability always depends on State inspection norms.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
