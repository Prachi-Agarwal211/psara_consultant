import type { StateInfo } from "../data/states";
import type { CityInfo } from "../data/cities";
import { CONTACT, SITE, AGGREGATE_RATING } from "./config";

function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(seed: number, index: number, options: T[]): T {
  return options[(seed + index * 9973) % options.length]!;
}

function pickN<T>(seed: number, options: T[], n: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  let i = 0;
  while (out.length < Math.min(n, options.length) && i < options.length * 4) {
    const idx = (seed + i * 7919) % options.length;
    if (!used.has(idx)) {
      used.add(idx);
      out.push(options[idx]!);
    }
    i++;
  }
  return out;
}

export type FaqPair = { q: string; a: string };

export type LocationSEOContent = {
  placeName: string;
  placeType: "state" | "city";
  metaDescription: string;
  intro: string[];
  authorityBlock: string[];
  processHeading: string;
  process: string[];
  documentsHeading: string;
  documents: string[];
  feesHeading: string;
  fees: string[];
  trainingHeading: string;
  training: string[];
  marketHeading: string;
  market: string[];
  rejectionHeading: string;
  rejections: string[];
  whyHeading: string;
  whyPoints: string[];
  faqs: FaqPair[];
  closingCta: string;
  keywordsLine: string;
};

const CORE_DOCS = [
  "PAN, Aadhaar / passport, and photographs of all directors / partners / proprietor",
  "Certificate of Incorporation / partnership deed / LLP agreement",
  "MOA & AOA (or equivalent) with private security agency objects clearly stated",
  "Registered office proof — rent/lease deed, ownership papers, and recent utility bill",
  "Cancelled cheque / bank account proof in the entity name",
  "Affidavits in the formats prescribed by the State Controlling Authority",
  "Training MOU with a State-recognized security guard training institute",
  "Police verification / character & antecedent forms for each key person",
  "Colour photographs of proposed uniform (must not resemble police/military)",
  "ITR / financial capacity papers where the State checklist demands them",
];

const REJECTION_POOL = [
  "Incomplete or inconsistent name spellings across PAN, Aadhaar, and incorporation papers",
  "MOA/AOA objects that do not clearly authorise private security agency activity",
  "Residential-only address used where the State insists on commercial principal place of business",
  "Missing or expired training institute MOU",
  "Adverse police verification or non-disclosure of pending cases",
  "Uniform / insignia designs that resemble police, paramilitary, or armed forces",
  "Failure to produce utility bills or landlord NOC for the registered office",
  "Wrong fee slab or incomplete district list for multi-district coverage",
  "Digital signature / portal upload mismatches on online applications",
  "Weak financial or ITR proofs where the State expects capacity evidence",
];

const WHY_POOL = [
  "Dossier-first preparation aligned to Controlling Authority checklists — not generic checklists copied from the internet",
  "State-aware training MOU coordination and inspection readiness support",
  "Police verification liaison with clear document hygiene for directors",
  "Multi-state sequencing advice when you plan to expand beyond one licence",
  "WhatsApp-first communication with Call backup during business hours",
  "Desks across Jaipur HQ, Delhi NCR, Gujarat, Madhya Pradesh, Uttar Pradesh, and more",
  "Post-grant guidance on registers, labour hygiene, and renewal calendars",
  "Honest timelines that account for police verification — not marketing fantasies",
];

function validityNote(years: number): string {
  if (years === 1) {
    return "This State commonly operates with **1-year licence validity** in practice notes — build your renewal calendar from the grant date and do not assume a 5-year default.";
  }
  return "Licence validity is typically **5 years** from grant under the Act, subject to State Rules and timely renewal.";
}

function buildStateFaqs(s: StateInfo, seed: number): FaqPair[] {
  const place = s.name;
  const all: FaqPair[] = [
    {
      q: `Who issues the PSARA License in ${place}?`,
      a: `The Controlling Authority is ${s.authority}. Application mode is typically ${s.applicationMode}. Always confirm the latest desk and portal instructions before filing.`,
    },
    {
      q: `How long does PSARA approval take in ${place}?`,
      a: `Indicative timelines are ${s.timeline}, driven mainly by police verification speed, office inspection queues, and whether your dossier is complete on first filing.`,
    },
    {
      q: `What is the PSARA fee structure in ${place}?`,
      a: `${s.feeNote} Indicative Act-aligned slabs often cited: ${s.feeOneDistrict}; ${s.feeMultiDistrict}; ${s.feeEntireState}. Verify the latest State notification before payment.`,
    },
    {
      q: `Is training MOU mandatory in ${place}?`,
      a: `Yes in almost all practical filings. ${s.trainingNote}`,
    },
    {
      q: `What is the licence validity in ${place}?`,
      a: validityNote(s.validityYears).replace(/\*\*/g, ""),
    },
    {
      q: `Can I operate only in ${s.capital} under a ${place} PSARA?`,
      a: `Coverage is defined by the licence (one district, limited multi-district, or whole State). Operating outside licensed districts without expansion/amendment is non-compliant.`,
    },
    {
      q: `Do directors need police verification for ${place}?`,
      a: `Yes. Character and antecedent verification of promoters/directors is a core statutory step. Forms typically include tracks such as ${s.forms.slice(0, 2).join(" and ")}.`,
    },
    {
      q: `How does ${SITE.name} help with PSARA in ${place}?`,
      a: `We prepare documentation, coordinate training MOUs, support police verification, ready premises for inspection, and guide post-grant compliance. Call ${CONTACT.phoneDisplay} or WhatsApp for a State-specific checklist.`,
    },
    {
      q: `Is online application available in ${place}?`,
      a: `Application mode is ${s.applicationMode}. Some States are fully portal-driven; others remain hybrid or offline. We map the correct path for your entity type and office location.`,
    },
    {
      q: `What documents are extra in ${place}?`,
      a:
        s.documentsExtra.length > 0
          ? `Beyond the national core set, ${place} filings often emphasise: ${s.documentsExtra.join("; ")}.`
          : `Beyond the national core set, follow the Controlling Authority checklist for ${place} — office proof and training MOU are universal bottlenecks.`,
    },
  ];
  const rotate = seed % 3;
  return [...all.slice(rotate), ...all.slice(0, rotate)].slice(0, 8);
}

export function generateStateContent(s: StateInfo): LocationSEOContent {
  const seed = stringToHash(s.slug);
  const place = s.name;
  const sectors = s.sectors.length ? s.sectors : ["commercial facilities", "industrial units", "hospitals", "residential projects"];
  const cityList = s.cities
    .slice(0, 6)
    .map((c) => c.replace(/-/g, " ").replace(/\b\w/g, (x) => x.toUpperCase()))
    .join(", ");

  const intro = [
    pick(seed, 1, [
      `${SITE.name} assists companies and entrepreneurs in obtaining a PSARA License in ${place} under the Private Security Agencies (Regulation) Act, 2005. Filings are coordinated with ${s.authority}, with indicative timelines of ${s.timeline}.`,
      `If you plan to run a private security agency in ${place}, a State PSARA Licence is mandatory before commercial guard deployment. ${SITE.name} builds inspection-ready dossiers for ${s.capital} and multi-district coverage across ${place}.`,
      `PSARA licensing in ${place} is not a one-page form exercise — it is a Controlling Authority process that tests your entity objects, office proof, training MOU, and promoter antecedents. We specialise in making that file grant-ready.`,
    ]),
    pick(seed, 2, [
      `Demand for licensed agencies in ${place} is driven by ${sectors.slice(0, 4).join(", ")}, and related commercial activity. Clients increasingly insist on PSARA-compliant vendors with labour hygiene — not informal manpower suppliers.`,
      `${place}'s security market spans ${sectors.slice(0, 5).join(", ")}. Each segment expects trained guards, verifiable agency credentials, and statutory registrations that start with a clean PSARA Licence.`,
      `From ${s.capital} outwards — including markets such as ${cityList || s.capital} — operators need lawful district coverage, training records, and police-cleared promoters before scaling posts.`,
    ]),
    `Application mode in ${place} is typically ${s.applicationMode}. ${s.rulesNote}. ${validityNote(s.validityYears).replace(/\*\*/g, "")}`,
    `We combine documentation discipline with practical liaison: training MOU coordination (${s.trainingNote}), police verification support, and premises readiness so your first submission does not bounce for avoidable defects.`,
  ];

  const authorityBlock = [
    `The Controlling Authority pathway for ${place} is handled via **${s.authority}**.`,
    `Indicative processing window: **${s.timeline}**. Actual duration depends on verification queues, inspection scheduling, and whether every checklist item is complete on day one.`,
    `Key forms commonly referenced in ${place}: ${s.forms.join("; ")}.`,
    ...s.specialRules.map((r) => r),
  ];

  const process = [
    `Confirm entity structure (Pvt Ltd / LLP / firm / proprietorship) and that main objects expressly permit private security agency business in ${place}.`,
    `Secure a verifiable registered office suitable for ${place} inspection norms — commercial proof is preferred in many States.`,
    `Execute training MOU — ${s.trainingNote}.`,
    `Prepare director KYC, affidavits, photographs, and bank proofs with consistent legal names.`,
    `Initiate character & antecedent / police verification for all key persons under ${place} practice.`,
    `Compile the Controlling Authority dossier for ${s.authority}, including fee proof for the chosen coverage slab.`,
    `Ready premises, proposed uniforms, and basic registers for inspection if called.`,
    `On grant, activate post-licence compliance: staff registers, labour registrations as thresholds apply, and renewal calendar (${s.validityYears}-year planning horizon).`,
  ];

  const documents = [
    ...CORE_DOCS.slice(0, 8),
    ...s.documentsExtra,
    `Any State-specific annexures listed by ${s.authority}`,
  ];

  const fees = [
    s.feeNote,
    `Indicative coverage slabs often discussed industry-wide: ${s.feeOneDistrict}; ${s.feeMultiDistrict}; ${s.feeEntireState}.`,
    `Government fees are separate from professional documentation and liaison fees.`,
    `Always reconfirm the latest notification and payee instructions before preparing demand drafts or portal payments for ${place}.`,
    validityNote(s.validityYears).replace(/\*\*/g, ""),
  ];

  const training = [
    s.trainingNote,
    `Most States expect a live MOU with a recognised institute covering unarmed (and, if applicable, armed) curricula before or during the licence process.`,
    `Entry-level guard training under Model Rules culture commonly references multi-day classroom + field modules; ex-servicemen often receive reduced hour pathways where Rules allow.`,
    `Retain training certificates and institute correspondence — inspection desks and renewal files frequently re-check training continuity.`,
  ];

  const market = [
    `Security demand across ${place} is shaped by ${sectors.join(", ")}.`,
    `Agencies that win institutional and industrial contracts typically present PSARA grant letters, GST, labour registrations, and trained manpower pipelines — not price-only bids.`,
    `Multi-district operators should map client geography first, then choose one-district vs multi-district vs whole-state coverage to avoid under-licensing.`,
    `Cities we commonly support in ${place} include ${cityList || s.capital}.`,
  ];

  const rejections = pickN(seed, REJECTION_POOL, 6).concat(
    s.specialRules.slice(0, 2).map((r) => `State-specific risk: ${r}`)
  );

  const whyPoints = pickN(seed, WHY_POOL, 7);

  return {
    placeName: place,
    placeType: "state",
    metaDescription: `PSARA License in ${place}. Authority: ${s.authority}. Timeline: ${s.timeline}. Process, documents, training MOU, fees & police verification guidance. ${SITE.name}, ${CONTACT.phoneDisplay}.`,
    intro,
    authorityBlock,
    processHeading: `PSARA process we follow in ${place}`,
    process,
    documentsHeading: `Documents for PSARA in ${place}`,
    documents,
    feesHeading: `Fees, coverage & validity in ${place}`,
    fees,
    trainingHeading: `Training & MOU requirements in ${place}`,
    training,
    marketHeading: `Why security agencies seek PSARA in ${place}`,
    market,
    rejectionHeading: `Common rejection risks in ${place}`,
    rejections,
    whyHeading: `Why agencies choose ${SITE.name} for ${place}`,
    whyPoints,
    faqs: buildStateFaqs(s, seed),
    closingCta: `Ready to file PSARA in ${place}? Call ${CONTACT.phoneDisplay}, WhatsApp ${CONTACT.phoneDisplay}, or use the form on this page. Share entity type, target districts, and office city for a precise checklist.`,
    keywordsLine: `PSARA License ${place}, security agency license ${s.capital}, PSARA consultant ${place}, private security agency registration ${place}`,
  };
}

export function generateCityContent(c: CityInfo, s: StateInfo | undefined): LocationSEOContent {
  const seed = stringToHash(c.slug);
  const place = c.name;
  const region = c.stateName;
  const tags = c.economyTags.length
    ? c.economyTags
    : s?.sectors.slice(0, 5) || ["commercial offices", "industrial units", "residential societies"];
  const authority = s?.authority || `the State Controlling Authority of ${region}`;
  const timeline = s?.timeline || "45–70 days";
  const mode = s?.applicationMode || "as notified by the State";

  const intro = [
    pick(seed, 1, [
      `Looking for a PSARA License consultant in ${place}? ${SITE.name} supports security agency registration and compliance for businesses based in ${place}, ${region} — from entity hygiene to Controlling Authority filing and police verification.`,
      `${place} entrepreneurs and companies planning a private security agency need a State PSARA Licence before commercial deployment. ${SITE.name} prepares licence-ready dossiers for applicants headquartered in ${place}.`,
      `If your registered office or principal place of business is in ${place}, your PSARA path still runs through ${region}'s Controlling Authority — but local office proof, district mapping, and inspection readiness are city-practical issues we handle daily.`,
    ]),
    pick(seed, 2, [
      `${place} is a Tier-${c.tier} market where growth in ${tags.slice(0, 3).join(", ")} increases demand for licensed, trained security manpower rather than informal labour supply.`,
      `Local demand in ${place} spans ${tags.join(", ")}. Facility owners and principal employers increasingly verify PSARA credentials before awarding contracts.`,
      `Whether you target a single-district licence covering ${place} or multi-district expansion from a ${place} base, documentation quality decides speed more than slogans.`,
    ]),
    s
      ? `${place} falls under **${region}**. Filings are coordinated with **${authority}**. Indicative timeline: ${timeline}. Application mode: ${mode}.`
      : `${place} filings follow the ${region} State PSARA framework under the Private Security Agencies (Regulation) Act, 2005.`,
    `We help with object-clause readiness, training MOU facilitation for ${region}, promoter police verification liaison, inspection-ready office documentation, and post-grant compliance handover.`,
  ];

  const authorityBlock = s
    ? [
        `State framework: **${region}** — ${authority}.`,
        `Timeline guidance: ${timeline}.`,
        `Training note: ${s.trainingNote}.`,
        ...s.specialRules.slice(0, 4),
      ]
    : [
        `State framework: **${region}** Controlling Authority under PSARA Act, 2005.`,
        `Confirm district coverage and office proof requirements before filing.`,
      ];

  const process = [
    `Map whether ${place} sits in a single-district plan or needs multi-district coverage across ${region}.`,
    `Align incorporation objects for private security agency activity.`,
    `Assemble ${place} office proofs acceptable for State inspection (rent/lease + utility + photographs).`,
    `Execute training MOU recognised in ${region}.`,
    `File promoter police verification / Form tracks as prescribed.`,
    `Submit complete dossier to the Controlling Authority and track inspection/verification.`,
    `On grant, operationalise registers, labour compliance as thresholds apply, and client contracting hygiene.`,
  ];

  const documents = [
    ...CORE_DOCS.slice(0, 7),
    `Local ${place} office utility bill and landlord NOC (if rented)`,
    ...(s?.documentsExtra.slice(0, 3) || []),
  ];

  const fees = s
    ? [
        s.feeNote,
        `Coverage slabs (indicative): ${s.feeOneDistrict}; ${s.feeMultiDistrict}; ${s.feeEntireState}.`,
        `Applicants based in ${place} still pay according to licensed district scope — not city marketing labels.`,
        validityNote(s.validityYears).replace(/\*\*/g, ""),
      ]
    : [
        `Government fees follow ${region} notifications for one district, multi-district, and whole-state coverage.`,
        `Professional fees for documentation and liaison are separate.`,
      ];

  const training = [
    s?.trainingNote || `Training MOU with a State-recognised institute is expected for ${region} filings.`,
    `Guards deployed to ${place} sites should carry training records matching State curricula.`,
    `Ex-servicemen pathways with reduced hours may apply where Rules permit — retain discharge proofs.`,
  ];

  const market = [
    `Business activity in ${place} around ${tags.join(", ")} creates continuous demand for PSARA-licensed agencies.`,
    `Industrial and commercial clients in ${place} often require GST, PF/ESIC hygiene, and trained supervisors in addition to the licence grant letter.`,
    `Agencies starting in ${place} frequently expand to neighbouring districts once the home licence and labour systems stabilise.`,
  ];

  const rejections = pickN(seed, REJECTION_POOL, 6);

  const cityFaqs: FaqPair[] = [
    {
      q: `Can I get PSARA License help in ${place}?`,
      a: `Yes. ${SITE.name} supports applicants with offices in ${place}, ${region}, including documentation, training MOU, police verification liaison, and filing coordination. Call ${CONTACT.phoneDisplay}.`,
    },
    {
      q: `Is PSARA State-level or city-level for ${place}?`,
      a: `PSARA is granted by the State/UT Controlling Authority. ${place} is a service location — your licence coverage is defined in districts within ${region}, not as a separate city statute.`,
    },
    {
      q: `How long does PSARA take if my office is in ${place}?`,
      a: s
        ? `Indicative ${region} timelines are ${timeline}. ${place} applicants are gated by the same police verification and inspection queues as the rest of the State.`
        : `Most States take roughly 30–70+ days depending on verification and file quality.`,
    },
    {
      q: `Do I need a commercial office in ${place}?`,
      a: `Many States reject pure virtual offices. Prefer a real commercial premise in ${place} (or the district you claim) with utility proof that can survive inspection.`,
    },
    {
      q: `What sectors hire security agencies in ${place}?`,
      a: `Common demand drivers include ${tags.join(", ")}. Institutional clients typically prefer PSARA-licensed vendors with labour compliance.`,
    },
    {
      q: `How do I start the consultation for ${place}?`,
      a: `Use the WhatsApp form on this page or call ${CONTACT.phoneDisplay}. Share entity type, office address city, and target districts in ${region}.`,
    },
  ];

  return {
    placeName: place,
    placeType: "city",
    metaDescription: `PSARA License consultant in ${place}, ${region}. ${tags.slice(0, 2).join(', ')} sectors. ${authority === 'the State Controlling Authority' ? '' : 'Authority: ' + authority + '. '}Documentation, training MOU & filing support. Call ${CONTACT.phoneDisplay}.`,
    intro,
    authorityBlock,
    processHeading: `How we run PSARA for ${place} applicants`,
    process,
    documentsHeading: `Documents checklist for ${place} applicants`,
    documents,
    feesHeading: `Fees & coverage notes for ${place}`,
    fees,
    trainingHeading: `Training & MOU for agencies in ${place}`,
    training,
    marketHeading: `Security agency opportunity in ${place}`,
    market,
    rejectionHeading: `Avoid these filing mistakes from ${place}`,
    rejections,
    whyHeading: `Why choose ${SITE.name} in ${place}`,
    whyPoints: pickN(seed, WHY_POOL, 6),
    faqs: cityFaqs,
    closingCta: `Planning PSARA from ${place}? Call ${CONTACT.phoneDisplay} or send the WhatsApp form below with your entity type and target districts in ${region}.`,
    keywordsLine: `PSARA License ${place}, security agency license ${place}, PSARA consultant ${place}, private security agency ${place} ${region}`,
  };
}

export function stateMetaDescription(s: StateInfo): string {
  return generateStateContent(s).metaDescription;
}

export function cityMetaDescription(c: CityInfo, s?: StateInfo): string {
  return generateCityContent(c, s).metaDescription;
}

export function localBusinessJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  city?: string;
  state?: string;
  lat?: number;
  lng?: number;
  address?: string;
  pin?: string;
  /** Nearby city names for areaServed on city pages */
  nearbyCities?: string[];
  /** Service names for hasOfferCatalog (use Service.title) */
  services?: { title: string }[];
}) {
  const areaServed: Record<string, string>[] = []
  if (opts.city) {
    areaServed.push({ '@type': 'City', name: opts.city })
  }
  if (opts.nearbyCities?.length) {
    for (const c of opts.nearbyCities) {
      areaServed.push({ '@type': 'City', name: c })
    }
  }
  if (opts.state) {
    areaServed.push({ '@type': 'State', name: opts.state })
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    '@id': opts.url,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: `${SITE.url}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: opts.address || 'C-36, Third Floor, Capital Galleria, Sirsi Road, Kanakpura',
      addressLocality: opts.city || 'Jaipur',
      addressRegion: opts.state || 'Rajasthan',
      postalCode: opts.pin || '302034',
      addressCountry: 'IN',
    },
    ...(opts.lat && opts.lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: opts.lat,
            longitude: opts.lng,
          },
        }
      : {}),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: AGGREGATE_RATING.ratingValue,
      reviewCount: AGGREGATE_RATING.reviewCount,
      bestRating: AGGREGATE_RATING.bestRating,
      worstRating: AGGREGATE_RATING.worstRating,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '18:30',
    },
    priceRange: '₹₹',
    areaServed: areaServed.length > 0 ? areaServed : { '@type': 'Country', name: 'India' },
    ...(opts.services?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `PSARA Services in ${opts.city || opts.state || 'India'}`,
            itemListElement: opts.services.slice(0, 10).map((s) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `${s.title} in ${opts.city || opts.state || 'India'}`,
              },
            })),
          },
        }
      : {}),
  };
}

/** Per-state Organization schema for state SEO pages */
export function stateOrganizationJsonLd(opts: {
  name: string
  description: string
  url: string
  state: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': opts.url,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    image: `${SITE.url}/logo.png`,
    areaServed: { '@type': 'State', name: opts.state },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: AGGREGATE_RATING.ratingValue,
      reviewCount: AGGREGATE_RATING.reviewCount,
      bestRating: AGGREGATE_RATING.bestRating,
      worstRating: AGGREGATE_RATING.worstRating,
    },
  }
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToJsonLd(title: string, description: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: description,
    step: steps.map((stepText, idx) => {
      const parts = stepText.split(":");
      const stepName = parts.length > 1 ? parts[0]! : `Step ${idx + 1}`;
      const stepDesc = parts.length > 1 ? parts.slice(1).join(":") : stepText;
      return {
        "@type": "HowToStep",
        position: idx + 1,
        name: stepName,
        text: stepDesc,
      };
    }),
  };
}

/** Legacy helpers kept for any remaining imports */
export function stateIntro(s: StateInfo): string {
  return generateStateContent(s).intro[0]!;
}

export function stateProcess(s: StateInfo): string[] {
  return generateStateContent(s).process;
}

export function cityIntro(c: CityInfo): string {
  return generateCityContent(c, undefined).intro[0]!;
}
