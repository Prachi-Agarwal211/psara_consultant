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
  {
    slug: "startup-india-registration",
    title: "Startup India Registration (DPIIT)",
    short: "DPIIT registration for security agencies seeking startup benefits.",
    description:
      "Registration under the Startup India initiative through the DPIIT (Department for Promotion of Industry and Internal Trade) recognition process — enabling tax benefits, funding access, and government scheme eligibility for eligible security agency startups.",
    bullets: [
      "DPIIT recognition application",
      "Incorporation certificate alignment",
      "Startup pitch deck guidance",
      "Scheme eligibility briefing",
      "Post-recognition compliance notes",
    ],
    keywords: ["Startup India registration", "DPIIT recognition", "startup security agency"],
    sections: [
      {
        h: "Why DPIIT recognition matters",
        p: "Recognised startups access tax exemptions under Section 80 IAC and 56 of the IT Act, priority in government tenders, self-certification under labour and environment laws, and eligibility for the Fund of Funds and other innovation schemes.",
      },
      {
        h: "Who qualifies",
        p: "Entities structured as Pvt Ltd or LLP, incorporated within the last 10 years, with turnover under INR 100 crore in any financial year since incorporation, and working towards innovation, development, or commercialisation of a product or process — scalable security technology or service models qualify.",
      },
      {
        h: "What we do",
        p: "We assess eligibility, align incorporation documents, draft the application narrative, file the DPIIT recognition application, and brief you on post-recognition compliance and annual reporting obligations.",
      },
    ],
    process: [
      "Eligibility assessment (entity age, turnover, innovation fit)",
      "Document readiness — incorporation, financials, pitch deck",
      "DPIIT portal application filing",
      "Recognition certificate handover",
      "Tax exemption eligibility briefing (80 IAC, 56)",
    ],
    whoFor: [
      "New security agencies eligible for startup benefits",
      "Tech-enabled security service startups",
      "Agencies seeking government tender advantages",
    ],
    faqs: [
      {
        q: "Is DPIIT registration the same as Startup India recognition?",
        a: "Yes. DPIIT recognition is the official Startup India registration that unlocks tax benefits, funding access, and government scheme eligibility.",
      },
      {
        q: "Can a security agency qualify as a startup?",
        a: "Yes, if the entity is within the incorporation age and turnover limits, and demonstrates innovation in security service delivery, training technology, or operational processes.",
      },
    ],
  },
  {
    slug: "startup-tax-exemption",
    title: "Startup Tax Exemption (80 IAC)",
    short: "Income Tax exemption under Section 80 IAC and Section 56 for DPIIT-recognised startups.",
    description:
      "Tax exemption application and compliance support for DPIIT-recognised startups under Section 80 IAC (3-year income tax holiday in a block of 10 years) and Section 56 (exemption on premium share capital) of the Income Tax Act.",
    bullets: [
      "Form 1DD and Form 2 filing support",
      "80 IAC eligibility assessment",
      "Section 56 exemption for angel investment",
      "Inter-Ministerial Board briefing notes",
      "Annual compliance and renewal guidance",
    ],
    keywords: ["80 IAC tax exemption", "startup tax benefit", "Section 56 exemption"],
    sections: [
      {
        h: "What 80 IAC offers",
        p: "A 3-year income tax holiday within a 10-year block, available to DPIIT-recognised startups incorporated between 2016 and 2031. Eligible startups pay nil tax on business income for 3 years out of 10, significantly reducing the effective tax rate during formative years.",
      },
      {
        h: "Section 56 benefit",
        p: "Startups recognised by DPIIT can issue shares at a premium to angel investors without the excess being taxed as income under Section 56, provided the investment falls within notified limits and conditions.",
      },
      {
        h: "What we do",
        p: "We assess your startup's eligibility, prepare Form 1DD (application for 80 IAC approval), coordinate with the Inter-Ministerial Board where required, and set up your annual compliance calendar to maintain the exemption.",
      },
    ],
    process: [
      "Eligibility review — DPIIT status, incorporation date, turnover",
      "Form 1DD preparation for 80 IAC approval",
      "IMB submission coordination (if applicable)",
      "Section 56 advisory for angel/VC rounds",
      "Annual compliance calendar setup",
    ],
    whoFor: [
      "DPIIT-recognised security startups",
      "Agencies raising angel or venture funding",
      "Founders seeking tax holiday on early revenue",
    ],
    faqs: [
      {
        q: "Is 80 IAC automatic after DPIIT recognition?",
        a: "No. DPIIT recognition is a prerequisite, but 80 IAC approval requires a separate application (Form 1DD) filed with the Inter-Ministerial Board. We handle this application process.",
      },
      {
        q: "How many years of tax exemption can I claim?",
        a: "3 years within a 10-year block. You choose which 3 financial years to claim the exemption, allowing flexibility to optimise for your revenue ramp.",
      },
    ],
  },
  {
    slug: "startup-funding",
    title: "Startup Funding & Grant Support",
    short: "Funding guidance, grant applications, and investor connect support for security startups.",
    description:
      "End-to-end funding and grant support for security agencies and security-tech startups — from government scheme navigation (Fund of Funds, SIDBI, MSME grants) to private investor pitch preparation and business plan structuring.",
    bullets: [
      "Grant and scheme eligibility mapping",
      "Project report and financial model preparation",
      "Pitch deck and investor summary creation",
      "Fund of Funds (FFS) application support",
      "Bank loan and MSME subsidy guidance",
    ],
    keywords: ["startup funding", "security agency funding", "business grant"],
    sections: [
      {
        h: "Government schemes",
        p: "We map available central and state schemes for security and service industry startups — Fund of Funds for Startups (FFS) by SIDBI, MSME subsidies, CGTMSE collateral-free loan schemes, and State-specific startup policies that offer grants and interest subvention.",
      },
      {
        h: "Private investment readiness",
        p: "Investors in the security space evaluate team, market size, and compliance maturity before writing cheques. We help structure your financial model, craft your pitch narrative, and prepare the data room that Angel and VC investors expect.",
      },
      {
        h: "What we deliver",
        p: "A funding readiness pack customised to your stage — scheme-eligible project reports for government grants, or investor-facing decks and financial projections for private capital raises. We do not guarantee funding but we ensure you walk in prepared.",
      },
    ],
    process: [
      "Capital needs assessment and stage mapping",
      "Scheme eligibility scan (govt / private)",
      "Project report or pitch deck creation",
      "Application filing or investor introduction",
      "Follow-up and documentation support",
    ],
    whoFor: [
      "Security agency startups seeking early capital",
      "Existing agencies expanding to new states or verticals",
      "Security-tech ventures raising institutional capital",
    ],
    faqs: [
      {
        q: "Do you guarantee funding?",
        a: "No. We prepare you for funding applications and investor conversations with professional documentation and scheme navigation. Final funding decisions rest with scheme authorities or investors.",
      },
      {
        q: "Can a small security agency apply for MSME grants?",
        a: "Yes. MSME schemes like CGTMSE, subsidy programmes, and State-specific grants are accessible to eligible micro and small security enterprises. We map which ones apply to your business.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
