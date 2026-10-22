import { GOOGLE_REVIEWS, OFFICES, SITE } from "@/lib/config";
import { STATES } from "@/data/states";

const delhi = STATES.find((state) => state.slug === "delhi")!;
const rajasthan = STATES.find((state) => state.slug === "rajasthan")!;

/** Homepage editorial copy; operational facts come from the existing source data. */
export const HOME_V3 = {
  nav: [
    { label: "Services", href: "#svc" },
    { label: "States", href: "/states" },
    { label: "Fee calculator", href: "/calculator" },
    { label: "About", href: "/about" },
  ],
  hero: {
    imageAlt: "Security guard reviewing a register outside an office in Jaipur",
    titleBefore: "PSARA license in",
    timeline: delhi.timeline,
    titleAfter: ", across",
    titleEnd: "India.",
    description:
      `Training MOU, police verification and Controlling Authority filing across India. ${delhi.timeline} is indicative for Delhi; timelines depend on state and police verification.`,
    proof: `${GOOGLE_REVIEWS.clientsServed} clients served. Rated ${GOOGLE_REVIEWS.rating.toFixed(1)} on Google from ${GOOGLE_REVIEWS.reviewCount} reviews.`,
    caption: "Company setup, MOU, verification and filing.",
    captionDetail: "One desk, from first document to grant letter.",
  },
  manifesto: {
    text: "Your agency deserves a file prepared for its state. We handle the paperwork, police verification and authority filing, so you can focus on guarding India's homes, offices and factories.",
    offices: `Offices in ${OFFICES.filter((office) => office.isHQ).map((office) => `${office.city} (HQ)`).join(", ")}, Gurugram, New Delhi, Noida, Ahmedabad, Lucknow and Bhopal.`,
  },
  services: {
    imageAlt: "PSARA consulting office and filing desk",
    titles: ["PSARA license registration", "Company registration", "Training MOU", "Police verification", "Labour compliance"],
    lines: ["What we file, so", "you don't have to."],
    allLabel: "All services",
  },
  credentials: {
    imageAlt: "Security agency filing dossier with the Indian emblem outside an illuminated government building",
    lines: [`${GOOGLE_REVIEWS.clientsServed} clients served,`, "from a single district", "in Rajasthan to", "entire states."],
    lead: "Your file follows your Controlling Authority's forms, document checklist and verification process, with one desk coordinating the next step.",
    facts: [
      {
        value: GOOGLE_REVIEWS.rating.toFixed(1),
        label: "Google",
        detail: `From ${GOOGLE_REVIEWS.reviewCount} client reviews`,
      },
      {
        value: String(STATES.length),
        label: "States and UTs",
        detail: "State-specific documentation and filing support",
      },
      {
        value: "After grant",
        label: "support",
        detail: "Statutory registers and your state-specific renewal calendar",
      },
    ],
  },
  floating: {
    lines: ["Fees seedha.", "Kaam pakka."],
    lead: "Send your state and district. We help you understand the fee, documents and indicative timeline.",
    chatTitle: "WhatsApp desk",
    chatIn: "PSARA license for Jaipur district?",
    chatOut: "Let's review the fee, training MOU and documents for your district.",
    statusTitle: "File status illustration",
    statuses: ["Company and MOU", "Police verification", "Authority filing"],
    feeTitle: "Fee calculator",
    feeLocation: `${rajasthan.name}, entire state`,
    feeValue: rajasthan.feeEntireState.replace(/\s+indicative.*$/, ""),
    feeNote: "Indicative government fee only. Professional and other charges are additional; confirm the current state schedule.",
  },
  process: {
    counter: "Step 1 of 5",
    lines: ["From first file", "to grant letter."],
    lead: "Five steps, with one point of contact throughout.",
    steps: [
      {
        title: "Company setup and scope",
        description: "PSARA-ready object clauses, office proof and district or whole-state coverage.",
      },
      {
        title: "Training MOU and file ready",
        description: "A State-recognised training institute, affidavits and the state's application dossier.",
      },
      {
        title: "Police verification",
        description: "Director antecedent verification documents and coordination with the relevant police office.",
      },
      {
        title: "Authority filing",
        description: "Controlling Authority submission, statutory fee challan and inspection readiness.",
      },
      {
        title: "License and compliance handover",
        description: "Grant support, statutory registers and a renewal calendar matched to your state.",
      },
    ],
  },
  cta: {
    lines: ["Start your PSARA", "license today."],
    lead: "Message us your state and district. A consultant can help with the fee, document list and indicative timeline.",
  },
  labels: {
    skip: "Skip to main content",
    manifesto: "Our approach to PSARA licensing",
    faqLines: ["Your PSARA questions,", "answered."],
    locationLines: ["Your state. Your city.", "Your PSARA desk."],
    whatsapp: "WhatsApp desk",
    call: "Call now",
    menu: "Menu",
    closeMenu: "Close menu",
    video: "Video: field desk loop",
    preview: "Service preview",
    credentialsVideo: "A closer look at your filing desk",
    faq: "Your PSARA questions, answered.",
    allFaqs: "All questions",
    states: "Find your state.",
    cities: "Find your city.",
    allStates: "All states and UTs",
    allCities: "All cities",
    privacy: "Privacy policy",
    terms: "Terms",
    illustration: "Illustrative workflow",
  },
  footer: {
    name: SITE.name,
    location: "Jaipur",
    links: [
      { label: "Services", href: "/services" },
      { label: "States", href: "/states" },
      { label: "Fee calculator", href: "/calculator" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  footerCopyright: `© 2026 ${SITE.name}, Jaipur`,
} as const;

export type HomeV3Content = typeof HOME_V3;
