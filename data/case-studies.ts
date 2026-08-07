export interface CaseStudy {
  slug: string;
  title: string;
  clientType: string;
  state: string;
  metric: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "pan-india-logistics-security-clearance",
    title: "Multi-State PSARA Clearance for 10-State Supply Chain Security Network",
    clientType: "Pan-India Warehousing & Logistics Enterprise",
    state: "10 States (MH, KA, TN, HR, UP, RJ, MP, GJ, TS, WB)",
    metric: "10 PSARA Licenses Granted in 90 Days",
    summary: "A national logistics enterprise needed simultaneous PSARA licensing across 10 states to operationalize 14,000+ security personnel for warehouse hubs.",
    challenge: "Fragmented Controlling Authority requirements, inconsistent training MOU rules between states, and strict timelines for institutional tenders.",
    solution: "PSARA Consultant deployed a multi-state legal taskforce executing parallel Form-I filings, state-approved training institute MOUs, and physical office proofs.",
    outcome: "Clean grant of 10 state licenses without a single rejection, enabling full operational tender compliance.",
  },
  {
    slug: "rajasthan-industrial-park-psara-grant",
    title: "Fresh PSARA Grant for Industrial Security Agency in RIICO Hub",
    clientType: "Industrial Security & Guarding Firm",
    state: "Rajasthan (Entire State)",
    metric: "Approved in 45 Days",
    summary: "First-time security promoter in Jaipur required immediate PSARA clearance to secure industrial manufacturing plants in Neemrana & Bhiwadi.",
    challenge: "Lack of pre-existing training MOU and complex police verification queries regarding promoter antecedents.",
    solution: "Executed expedited MOU with state-recognized security training institute and conducted pre-filing document audit.",
    outcome: "State Controlling Authority granted 5-year PSARA license within 45 days, securing contracts worth ₹4.5 Crore.",
  },
  {
    slug: "delhi-ncr-corporate-security-renewal",
    title: "Complex PSARA License Renewal & Director Addition for Delhi Firm",
    clientType: "Corporate Facility & VIP Escort Firm",
    state: "Delhi NCR & Haryana",
    metric: "5-Year Renewal & Director Endorsement Completed",
    summary: "An established corporate security agency faced license expiry threats due to a change in board directors and delayed statutory filings.",
    challenge: "Police clearance delays for incoming directors and mandatory uniform code alignment updates.",
    solution: "Re-structured board resolutions, executed fresh police antecedent forms, and refiled with the Home Department under fast-track provisions.",
    outcome: "License renewed for another 5 years with new directors officially endorsed without operational downtime.",
  },
];
