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
  {
    slug: "website-design",
    title: "Website Design & Development",
    short: "Professional website design for security agencies and startups.",
    description:
      "Custom website design and development tailored for security agencies, PSARA consultants, and business startups — from brochure sites to full-featured business portals with enquiry forms, service pages, and compliance documentation.",
    bullets: [
      "Responsive website design (mobile-first)",
      "Business portal with enquiry & WhatsApp integration",
      "Service, state, and city landing pages",
      "SEO-optimised structure for local search",
      "Content management and updates support",
    ],
    keywords: ["website design for security agency", "security company website", "PSARA consultant website"],
    sections: [
      {
        h: "Purpose-built for security agencies",
        p: "A generic website template does not communicate the statutory seriousness of a PSARA-licensed agency. We design purpose-built digital presences that convey compliance, trust, and operational reach — from the homepage hero to the GDPR-aware contact flow.",
      },
      {
        h: "What we deliver",
        p: "A mobile-optimised, fast-loading website with clear service structuring, local SEO signals for state and city search, WhatsApp-enabled enquiry capture, and a backend that you or your team can update without technical dependencies.",
      },
      {
        h: "Beyond templates",
        p: "We do not drop you into a generic CMS theme. Each site is structured around your business model — multi-state presence, service catalogue, office network, and client onboarding flow — so the website works as a lead generation asset, not an online brochure.",
      },
    ],
    process: [
      "Discovery call — business model, services, target cities",
      "Sitemap and wireframe creation",
      "Design mockup and brand alignment",
      "Development and content population",
      "Testing, launch, and handover",
    ],
    whoFor: [
      "New security agencies launching their digital presence",
      "Existing agencies upgrading from basic or outdated websites",
      "PSARA consultants needing multi-state service portals",
      "Startups requiring professional investor-facing websites",
    ],
    faqs: [
      {
        q: "Do you build on WordPress or custom code?",
        a: "We recommend the right platform based on your scale and budget — from high-performance custom Next.js sites (like ours) to well-structured WordPress solutions for easier content management.",
      },
      {
        q: "How long does a website take?",
        a: "A standard multi-page website typically takes 2–4 weeks from discovery to launch, depending on content readiness and complexity.",
      },
    ],
  },
  {
    slug: "psara-license-renewal",
    title: "PSARA License Renewal",
    short: "On-time renewal filing before expiry — avoid operating a lapsed licence.",
    description:
      "Timely PSARA License renewal support for security agencies whose 1-year or 5-year validity is approaching. We track expiry, refresh the dossier, confirm unchanged directors/office/training, and file renewal with the State Controlling Authority before the window closes.",
    bullets: [
      "Expiry calendar and renewal-window alerts",
      "Dossier refresh — directors, office, training MOU re-validation",
      "Renewal fee slab confirmation by coverage",
      "Controlling Authority renewal filing",
      "Continuity documentation for client contracts",
    ],
    keywords: ["PSARA renewal", "security license renewal", "PSARA renewal fee"],
    sections: [
      {
        h: "Why renewal timing matters",
        p: "Operating with an expired PSARA Licence exposes you to penalties and voids client contracts that demand a valid licence. Most States expect renewal before expiry with complete continuity documentation — we run this like a mini fresh filing.",
      },
      {
        h: "What changes between filings",
        p: "Directors may have changed, the registered office may have moved, training MOUs may have lapsed, and fee notifications may have shifted. We audit each of these before refiling so renewal is not rejected for stale data.",
      },
      {
        h: "Post-renewal hygiene",
        p: "We hand over the renewed licence file, updated registers guidance, and the next renewal calendar so your compliance never lapses silently again.",
      },
    ],
    process: [
      "Expiry & validity audit",
      "Director / office / training change check",
      "Dossier refresh and affidavit preparation",
      "Renewal fee payment guidance",
      "Controlling Authority renewal filing",
      "Renewed licence handover + calendar",
    ],
    whoFor: [
      "Agencies within 6 months of expiry",
      "Agencies with changed directors or offices",
      "Multi-state operators with staggered validity",
    ],
    faqs: [
      {
        q: "Can I renew after the licence expires?",
        a: "Practices vary by State — some allow late renewal with penalties, others treat you as a fresh applicant. Do not assume; check the window with us immediately if you are already past expiry.",
      },
      {
        q: "Is renewal cheaper than fresh filing?",
        a: "Government renewal fees are typically lower than fresh application, but the compliance cost depends on how much of your dossier has changed. We scope it honestly.",
      },
    ],
  },
  {
    slug: "psara-license-amendment",
    title: "PSARA License Amendment & Expansion",
    short: "Add directors, change office, or expand district coverage mid-licence.",
    description:
      "Amendment and expansion support for existing PSARA licence holders — adding directors/partners, shifting the registered office, changing the legal name, or expanding from one-district to multi-district / whole-state coverage.",
    bullets: [
      "Director addition / removal filings",
      "Registered office change support",
      "Name / entity conversion amendments",
      "District coverage expansion applications",
      "Fresh police verification for new key persons",
    ],
    keywords: ["PSARA amendment", "add director PSARA", "PSARA district expansion"],
    sections: [
      {
        h: "Do not operate beyond your licence",
        p: "Deploying guards in districts outside your licensed coverage is non-compliance, even if the client is happy. Expansion amendments protect your contracts and your record before the Authority.",
      },
      {
        h: "Personnel changes",
        p: "New directors and partners face the same antecedent verification as founders. We sequence verification with the amendment so the file does not stall on the last new signature.",
      },
    ],
    process: [
      "Current licence coverage audit",
      "Amendment scope mapping (persons / office / area)",
      "Supporting documents and affidavits",
      "New key-person police verification",
      "Controlling Authority amendment filing",
      "Amended licence handover",
    ],
    whoFor: ["Growing agencies", "Agencies changing structure or address", "Multi-district expansion operators"],
    faqs: [
      {
        q: "How long does an amendment take?",
        a: "Typically faster than fresh licensing — 15–45 days depending on State and whether new police verification is triggered.",
      },
      {
        q: "Can I expand to a whole new State on my existing licence?",
        a: "No. PSARA is State-specific. A new State requires a fresh licence there — we advise on sequencing multi-state expansion carefully.",
      },
    ],
  },
  {
    slug: "armed-guard-license",
    title: "Armed Guard & Arms License Support",
    short: "Arms license eligibility and deployment compliance for armed guards.",
    description:
      "Guidance and coordination for armed guard deployment — arms licence eligibility under the Arms Act, 1959, category endorsement on the PSARA licence, ex-servicemen pathways, and the special compliance that cash-in-transit and high-risk sites demand.",
    bullets: [
      "Armed category endorsement on PSARA",
      "Arms licence eligibility and process guidance",
      "Ex-servicemen pathway support",
      "Weapon storage & record compliance",
      "CIT and high-risk deployment readiness",
    ],
    keywords: ["armed security guard license", "arms license PSARA", "cash in transit license"],
    sections: [
      {
        h: "Armed is a different licence",
        p: "Deploying armed guards without the armed category on your PSARA licence and proper arms licensing is a serious compliance breach. Banks, CIT operators, and jewellery units insist on the complete chain.",
      },
      {
        h: "Ex-servicemen advantage",
        p: "States commonly offer relaxed pathways and reduced training hours for ex-servicemen. We help you build a compliant armed vertical around verified personnel.",
      },
    ],
    process: [
      "Armed requirement assessment",
      "Personnel arms licence eligibility check",
      "Armed category endorsement filing",
      "Weapon storage & register setup",
      "CIT / high-risk protocol briefing",
    ],
    whoFor: ["Banks & CIT agencies", "Jewellery and high-value retail", "Agencies adding an armed vertical"],
    faqs: [
      {
        q: "Do all States allow armed guards?",
        a: "Armed deployment is regulated per State with specific categories and endorsements. We map your State's armed guard rules before you recruit.",
      },
      {
        q: "Can ex-servicemen deploy faster?",
        a: "Often yes — reduced training hours and faster verification pathways exist under several State Rules. We document the pathway for your file.",
      },
    ],
  },
  {
    slug: "psara-compliance-audit",
    title: "PSARA Post-Grant Compliance Audit",
    short: "Audit registers, uniforms, training, and labour hygiene against the licence.",
    description:
      "A structured compliance audit of your operating agency against PSARA obligations and client-contract expectations — staff registers, uniform code, training records, labour registrations, and renewal health — with a fix-it roadmap.",
    bullets: [
      "Register & record audit",
      "Uniform / insignia compliance check",
      "Training continuity review",
      "Labour (PF/ESIC) hygiene scan",
      "Fix-it roadmap with priority ordering",
    ],
    keywords: ["PSARA compliance audit", "security agency audit", "PSARA register maintenance"],
    sections: [
      {
        h: "Inspection-ready, always",
        p: "Controlling Authority inspections and enterprise client audits test the same things: registers, training, uniforms, labour challans. An annual self-audit keeps you grant-worthy instead of reactive.",
      },
      {
        h: "The deliverable is a roadmap",
        p: "We hand over a prioritised fix-it list — what to correct this week vs this quarter — so the audit pays for itself in avoided penalties and won contracts.",
      },
    ],
    process: [
      "Licence & coverage verification",
      "Register and record sampling",
      "Uniform / training / labour checks",
      "Risk scoring by severity",
      "Fix-it roadmap delivery",
    ],
    whoFor: ["Operating agencies pre-inspection", "Agencies failing client audits", "Agencies preparing for renewal"],
    faqs: [
      {
        q: "What registers does a PSARA agency need?",
        a: "Typical expectations include staff deployment registers, training records, attendance, and statutory labour registers. The exact set varies by State — the audit maps yours.",
      },
      {
        q: "Do you fix the gaps too?",
        a: "Yes — after the audit we can execute the roadmap: registers, renewals, training MOU refresh, and labour registrations.",
      },
    ],
  },
  {
    slug: "multi-state-psara",
    title: "Multi-State PSARA Expansion",
    short: "One strategy, many States — sequence licences across India correctly.",
    description:
      "Strategic multi-state PSARA expansion for agencies winning pan-India contracts — sequencing fresh licences, harmonising entity documents, aligning training institutes per State, and managing staggered renewal calendars.",
    bullets: [
      "Multi-state licence sequencing plan",
      "Entity document harmonisation",
      "Per-State training institute alignment",
      "Staggered renewal calendar design",
      "Contract-first coverage mapping",
    ],
    keywords: ["multi-state PSARA", "pan India security license", "PSARA expansion strategy"],
    sections: [
      {
        h: "Sequence wins contracts",
        p: "Filing all States at once wastes money and attention. We map your client geography, rank States by revenue potential and verification speed, and sequence filings so capital is spent where contracts land first.",
      },
      {
        h: "One entity, many desks",
        p: "Your single entity files separately in each State, but the dossier must stay consistent. We harmonise objects, director records, and training MOUs so nothing contradicts across desks.",
      },
    ],
    process: [
      "Contract & geography mapping",
      "State ranking by ROI and speed",
      "Sequencing plan and budget",
      "Per-State filing execution",
      "Unified renewal calendar",
    ],
    whoFor: ["Pan-India contractors", "Agencies in 2–10 States", "Franchise and network operators"],
    faqs: [
      {
        q: "How many States can I file in parallel?",
        a: "As many as your verification capacity allows — but we usually advise starting with 2–3 priority States and expanding on a rolling basis to protect cash flow.",
      },
      {
        q: "Do I need a local office in every State?",
        a: "Many States require a verifiable local registered office or authorized representative. We plan office proof per State before filing.",
      },
    ],
  },
  {
    slug: "security-training",
    title: "Security Guard Training & Certification",
    short: "State-recognised guard training, refresher modules, and certification records.",
    description:
      "Security guard training coordination under State-recognised curricula — entry-level unarmed and armed modules, ex-servicemen pathways, supervisor courses, and the certification records that inspections and client audits re-check.",
    bullets: [
      "Entry-level guard training placement",
      "Armed guard module coordination",
      "Supervisor & field officer courses",
      "Refresher training scheduling",
      "Certification record systems",
    ],
    keywords: ["security guard training", "PSARA training hours", "guard certification"],
    sections: [
      {
        h: "Training is statutory, not decorative",
        p: "Training hours and institute recognition are wired into State PSARA Rules. Clients and inspectors verify certificates — untrained deployment risks both licence and contract.",
      },
      {
        h: "Build a training culture",
        p: "Agencies with structured training win enterprise contracts, reduce attrition, and justify better billing. We help you build the pipeline, not just the MOU.",
      },
    ],
    process: [
      "State curriculum mapping",
      "Institute and batch planning",
      "Trainee enrolment coordination",
      "Exams and certification records",
      "Record system handover",
    ],
    whoFor: ["New agencies building guard pools", "Agencies facing training-record audits", "Enterprise-focused agencies"],
    faqs: [
      {
        q: "How many training hours are mandatory?",
        a: "Hours vary by State and module — commonly 150–240 hours for unarmed and more for armed. We map your State's exact requirement.",
      },
      {
        q: "Can existing guards get certified?",
        a: "Yes — refresher and certification pathways exist for deployed guards, including reduced-hour routes for ex-servicemen.",
      },
    ],
  },
  {
    slug: "background-verification",
    title: "Background & Police Verification Services",
    short: "Employee-level verification for guards, drivers, and key personnel.",
    description:
      "Pre-employment background verification for security guards, drivers, and supervisors — address, identity, education, employment history, and police record checks that keep your deployment pool clean and client audits green.",
    bullets: [
      "Identity & address verification",
      "Police record checks",
      "Employment & education history",
      "Reference checks",
      "Deployment-pool screening at scale",
    ],
    keywords: ["background verification", "guard police verification", "employee screening"],
    sections: [
      {
        h: "The pool is your product",
        p: "Enterprise and government clients verify your guards' antecedents. A screened pool is a competitive advantage; a breach is a contract-ending risk.",
      },
      {
        h: "Scale without shortcuts",
        p: "We design verification pipelines that scale to hundreds of hires without dropping to checkbox compliance.",
      },
    ],
    process: [
      "Screening scope design",
      "Document collection system",
      "Verification execution",
      "Report delivery & flags",
      "Ongoing pool screening",
    ],
    whoFor: ["Agencies hiring guard batches", "Facility managers with guard workforces", "Multi-location operators"],
    faqs: [
      {
        q: "Is this the same as the PSARA promoter verification?",
        a: "No — promoter verification is statutory for the licence; this is employee-level screening for your workforce. Agencies typically need both.",
      },
      {
        q: "How fast is verification?",
        a: "Identity and address checks complete in days; police record checks depend on the jurisdiction. We set honest SLAs per location.",
      },
    ],
  },
  {
    slug: "payroll-management",
    title: "Security Payroll & Wage Compliance",
    short: "Guard payroll, PF/ESIC, minimum wage, and attendance-linked billing.",
    description:
      "Payroll and wage compliance for security agencies — guard salary structuring, EPF/ESIC administration, minimum wage mapping, attendance-linked payroll runs, and the challan trail enterprise clients audit.",
    bullets: [
      "Guard payroll setup & runs",
      "EPF/ESIC registration & challans",
      "Minimum wage & overtime mapping",
      "Attendance integration",
      "Client-audit-ready reports",
    ],
    keywords: ["security guard payroll", "EPF ESIC compliance", "security agency wages"],
    sections: [
      {
        h: "Wage compliance wins tenders",
        p: "Underpaid or under-registered workforces fail principal employer audits and can trigger client penalties. Compliant payroll is a sales asset, not just a cost.",
      },
      {
        h: "Audit-ready by default",
        p: "We keep the challan trail, wage registers, and attendance records inspection-ready so client KYC and Authority checks pass without firefighting.",
      },
    ],
    process: [
      "Wage & threshold mapping",
      "Payroll structure design",
      "EPF/ESIC setup or repair",
      "Monthly payroll runs",
      "Report pack for client audits",
    ],
    whoFor: ["Agencies with 10+ guards", "Agencies failing client wage audits", "Multi-state payroll operators"],
    faqs: [
      {
        q: "Which States have minimum wage surprises?",
        a: "Minimum wages vary by State and schedule — security guards often fall under scheduled employments with specific rates. We map your deployment States.",
      },
      {
        q: "Can you fix past non-compliance?",
        a: "Yes — we help regularise arrears, registrations, and records with the appropriate authorities and structure going-forward compliance.",
      },
    ],
  },
  {
    slug: "tender-bid-support",
    title: "Security Tender & Bid Support",
    short: "Win contracts with compliant, winnable tender responses.",
    description:
      "Tender and bid preparation for security services contracts — eligibility mapping (PSARA, GST, labour registrations), technical bid structuring, rate computation, and document packs that clear evaluation criteria.",
    bullets: [
      "Tender eligibility mapping",
      "Technical bid structuring",
      "Compliant rate computation",
      "Document pack assembly",
      "Pre-bid query support",
    ],
    keywords: ["security tender support", "PSARA tender bid", "security contract bidding"],
    sections: [
      {
        h: "Licences open the door, bids close it",
        p: "Most security tenders require PSARA, GST, PF/ESIC registration, and training credentials as minimum criteria. We make sure your compliance portfolio is tender-ready, then help structure a winnable bid.",
      },
      {
        h: "Rates that don't lose money",
        p: "Underbidding on statutory costs (wages, PF/ESIC, training) loses money on every guard. We build rate models that stay competitive without breaking compliance.",
      },
    ],
    process: [
      "Tender document review",
      "Eligibility & compliance check",
      "Rate model construction",
      "Bid pack assembly",
      "Submission support",
    ],
    whoFor: ["Agencies targeting government contracts", "Enterprise RFP respondents", "New entrants to formal bidding"],
    faqs: [
      {
        q: "What licences do security tenders usually demand?",
        a: "PSARA licence (State-specific), GST, EPF/ESIC registration, and often ISO certification and training institute credentials.",
      },
      {
        q: "Do you write the full bid?",
        a: "We prepare the compliance and technical sections and rate model; we coordinate with your team for commercial strategy.",
      },
    ],
  },
  {
    slug: "security-insurance",
    title: "Security Agency Insurance Advisory",
    short: "Group accident, liability, and contract-required cover for agencies.",
    description:
      "Insurance advisory for security agencies — group accident and health cover for guards, employer's liability, third-party/public liability, and the cover certificates that client contracts and tenders increasingly mandate.",
    bullets: [
      "Group accident & health cover",
      "Employer's liability guidance",
      "Public liability policies",
      "Tender-mandated cover mapping",
      "Policy documentation for client KYC",
    ],
    keywords: ["security agency insurance", "guard group insurance", "security liability cover"],
    sections: [
      {
        h: "Contracts now demand cover",
        p: "Enterprise and government security contracts routinely require group accident and liability insurance certificates. Without them, bids are disqualified regardless of price.",
      },
      {
        h: "Advice, not selling",
        p: "We advise on the cover profile your contracts need and coordinate placement with insurers — we do not push commission-driven products.",
      },
    ],
    process: [
      "Contract & risk profile review",
      "Cover requirement mapping",
      "Insurer coordination",
      "Certificate collection for KYC",
      "Annual renewal tracking",
    ],
    whoFor: ["Tender-bound agencies", "Enterprise contractors", "Multi-state operators"],
    faqs: [
      {
        q: "Is insurance mandatory for PSARA?",
        a: "Not a universal PSARA condition, but increasingly required by client contracts and tenders. We map what your contracts actually need.",
      },
      {
        q: "What cover do most contracts require?",
        a: "Group accident for guards and public/third-party liability are the most common minimums, with limits set per tender.",
      },
    ],
  },
  {
    slug: "government-security-contracts",
    title: "Government Security Contracts",
    short: "GeM, tender, and state-level security contract readiness.",
    description:
      "Government security contract readiness — GeM (Government e-Marketplace) onboarding, eligibility documentation, manpower supply compliance under GGS (Government Guard Scheme) frameworks, and state-level security tender support.",
    bullets: [
      "GeM seller onboarding",
      "Manpower supply compliance setup",
      "State security scheme mapping",
      "Tender eligibility documentation",
      "Compliance certificate pack",
    ],
    keywords: ["government security contract", "GeM security services", "GGS manpower supply"],
    sections: [
      {
        h: "Government is the largest security buyer",
        p: "Government guard schemes and state security corporations buy enormous manpower volumes. Eligibility is documentation-driven — PSARA, GST, labour registrations, and verified training records.",
      },
      {
        h: "Readiness before the tender",
        p: "We prepare your compliance portfolio in advance so when the tender drops, you respond in days, not scramble for certificates.",
      },
    ],
    process: [
      "Scheme & market mapping",
      "GeM / portal onboarding",
      "Compliance certificate pack",
      "Tender response support",
      "Contract onboarding hygiene",
    ],
    whoFor: ["Agencies targeting government work", "Manpower suppliers", "State security scheme bidders"],
    faqs: [
      {
        q: "What is the Government Guard Scheme?",
        a: "GGS is a central framework under which empanelled agencies supply guards to government offices. Eligibility requires a valid PSARA licence, registration, and compliance credentials.",
      },
      {
        q: "Is GeM registration hard?",
        a: "GeM onboarding is document-heavy but mechanical. We assemble the seller pack and walk the registration through.",
      },
    ],
  },
  {
    slug: "bouncer-bodyguard-licensing",
    title: "Bouncer & Bodyguard Deployment Licensing",
    short: "Event security, bouncer, and personal protection officer compliance.",
    description:
      "Licensing and compliance for bouncer, event security, and personal protection officer (bodyguard) deployment — the distinct PSARA categories, training requirements, and verification that event companies and VIP clients expect.",
    bullets: [
      "Bouncer category licensing",
      "Event security compliance",
      "PPO / bodyguard training pathways",
      "Vendor verification for event companies",
      "Deployment record compliance",
    ],
    keywords: ["bouncer license PSARA", "event security license", "bodyguard training"],
    sections: [
      {
        h: "A separate compliance lane",
        p: "Bouncer and PPO deployment often sits in distinct categories with stricter physical and training norms. Event companies and hotels increasingly verify vendor licences before booking.",
      },
      {
        h: "Verified vendors win events",
        p: "Venues audit the agencies they hire. A clean bouncer/PPO category with trained personnel is the difference between being booked and being blocked.",
      },
    ],
    process: [
      "Category & State rules mapping",
      "Personnel screening",
      "Training pathway coordination",
      "Licence category filing",
      "Deployment compliance pack",
    ],
    whoFor: ["Event security companies", "Hotels & venues", "VIP protection agencies"],
    faqs: [
      {
        q: "Do bouncers need separate licences?",
        a: "Deployment categories and training expectations vary by State — some treat bouncers under the general guard licence, others expect specific compliance. We map your State.",
      },
      {
        q: "Can hotels hire bouncer agencies directly?",
        a: "They should hire licensed agencies; unlicensed bouncer deployment creates liability for both the venue and the agency.",
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding & Digital Identity",
    short: "Logo design, brand identity, and digital presence for agencies.",
    description:
      "Complete branding and identity solutions for security agencies and business startups — logo design, brand guidelines, stationery, social media assets, and digital presence strategy that communicates trust and professionalism.",
    bullets: [
      "Custom logo and brand mark design",
      "Brand colour palette and typography system",
      "Business stationery (letterhead, business card, invoice)",
      "Social media profile and cover assets",
      "Brand guideline document for consistent use",
    ],
    keywords: ["security agency branding", "PSARA brand identity", "security logo design"],
    sections: [
      {
        h: "First impressions matter",
        p: "When a principal employer or government client evaluates your agency, your brand identity signals operational seriousness before a single word of your dossier is read. We build identities that communicate statutory discipline and professional service.",
      },
      {
        h: "What we deliver",
        p: "A complete brand identity system — logo (primary, secondary, icon variants), colour system, typography selection, stationery templates, social media kit, and a brand usage guide so every touchpoint remains consistent.",
      },
      {
        h: "Brand strategy first, design second",
        p: "We start with positioning — your market, your differentiator, your client profile — before a single pixel is designed. The visual identity flows from strategy, ensuring your brand stands out in a competitive security services market.",
      },
    ],
    process: [
      "Brand discovery — market, audience, positioning",
      "Moodboard and concept exploration",
      "Logo and identity system design",
      "Stationery and asset production",
      "Brand guideline handover",
    ],
    whoFor: [
      "New security agencies launching their brand",
      "Existing agencies rebranding or modernising",
      "Startups seeking investor-ready brand identity",
      "PSARA consultants building multi-location brand systems",
    ],
    faqs: [
      {
        q: "Can I get just a logo without the full brand package?",
        a: "Yes. We offer modular packages — logo-only, basic identity, or full brand system. We recommend what fits your stage and budget.",
      },
      {
        q: "How long does the branding process take?",
        a: "A full brand identity project typically takes 2–3 weeks from discovery to final asset delivery. Logo-only projects can be completed in 5–7 working days.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
