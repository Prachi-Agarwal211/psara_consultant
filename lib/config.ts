/** PSARA Consultant India — single source of truth (facts from live operations) */

/** Google social proof — single source of truth for GBP profiles and review links */
/**
 * cid = Google Customer ID (numeric, from GBP dashboard or Maps URL)
 * placeid = base64:hex pair (from Google Maps place URL data parameter)
 *
 * TO GET REAL VALUES: Open Google Business Profile dashboard → Info →
 * "Place ID" or open each office on Google Maps and copy from URL.
 * Placeholder values marked with ___UPDATE___ need real GBP data.
 */
export const GOOGLE_REVIEWS = {
  rating: 5.0,
  ratingLabel: '5.0 / 5',
  reviewCount: '128+',
  reviewCountNumber: 128,
  clientsServed: '300+',
  /** Primary write-a-review (Jaipur HQ) */
  writeUrl:
    'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
  /** Primary profile (Jaipur HQ) — kgmid from Google Knowledge Graph */
  profileUrl: 'https://www.google.com/maps?kgmid=/g/11nb5sch34',
  /** Optional third-party embed */
  embedScriptSrc: '',
  embedDivAttrs: '',
  offices: [
    {
      label: 'Jaipur HQ',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Gurugram',
      profileUrl: 'https://maps.google.com/?cid=15529635849800721819',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x390d18cbd61106ab:0xd78459869e8b259b',
    },
    {
      label: 'New Delhi',
      profileUrl: 'https://maps.google.com/?cid=8304854373543658973',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x390cfddc01af48eb:0x7340c50d3e6b45dd',
    },
    {
      label: 'Noida',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Ahmedabad',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Lucknow',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Bhopal',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Indore',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Raipur',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Chandigarh',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Ludhiana',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
    {
      label: 'Jodhpur',
      profileUrl: 'https://maps.google.com/?cid=10061939707983891749',
      writeUrl: 'https://search.google.com/local/writereview?placeid=0x396c4cb10968fe7b:0x8ba330da9dc70d25',
    },
  ],
} as const

/** City slug → PSARA Consultant office index */
const CITY_OFFICE_INDEX: Record<string, number> = {
  'new-delhi': 0,
  delhi: 0,
  gurugram: 1,
  gurgaon: 1,
  jaipur: 2,
  bhopal: 3,
  lucknow: 4,
  indore: 5,
  ahmedabad: 6,
  raipur: 7,
  noida: 8,
  'greater-noida': 8,
  jodhpur: 9,
  chandigarh: 10,
  ludhiana: 11,
}

/** State slug → preferred PSARA Consultant office index (nearest desk) */
const STATE_OFFICE_INDEX: Record<string, number> = {
  delhi: 0,
  haryana: 1,
  rajasthan: 2,
  'madhya-pradesh': 3,
  'uttar-pradesh': 4,
  gujarat: 6,
  chhattisgarh: 7,
  punjab: 10,
}

export function getOfficeForCitySlug(citySlug: string): OfficeLocation | undefined {
  const i = CITY_OFFICE_INDEX[citySlug.toLowerCase()]
  return i === undefined ? undefined : OFFICES[i]
}

/** Offices to show on a city page: local desk if we have one, else nearest state hub */
export function getOfficesForCityPage(citySlug: string, stateSlug: string): OfficeLocation[] {
  const local = getOfficeForCitySlug(citySlug)
  if (local) return [local]
  const i = STATE_OFFICE_INDEX[stateSlug.toLowerCase()]
  const fallback = OFFICES[0]!
  return [i !== undefined ? OFFICES[i]! : fallback]
}

/** Offices to show on a state page: state desk, or Jaipur HQ for others */
export function getOfficesForStatePage(stateSlug: string): OfficeLocation[] {
  const i = STATE_OFFICE_INDEX[stateSlug.toLowerCase()]
  return [i !== undefined ? OFFICES[i]! : OFFICES[0]!]
}

export const SITE = {
  name: "PSARA Consultant India",
  legalName: "PSARA Consultant India",
  url: "https://psaraconsultantindia.com",
  tagline: "Your Trusted Partner for PSARA Licensing Across India",
  description:
    "Pan-India PSARA License registration, security agency compliance, training MOU, police verification, and company setup. Offices in New Delhi, Gurugram, Jaipur.",
  /** Wikidata entity identifier — used for Knowledge Graph eligibility and AI citation */
  wikidata: {
    id: "Q131459731",
    url: "https://www.wikidata.org/wiki/Q131459731",
  },
} as const;

export const CONTACT = {
  phone: "+91-9983169555",
  phoneRaw: "919983169555",
  phoneDisplay: "+91 99831 69555",
  landline: "0141-4021078",
  landlineDisplay: "0141-4021078",
  landlineRaw: "01414021078",
  email: "info@psaraconsultantindia.com",
  whatsapp: {
    number: "919983169555",
    message:
      "Hello PSARA Consultant India — I need help with PSARA License registration.",
    url: "https://wa.me/919983169555?text=Hello%20PSARA%20Consultant%20India%20%E2%80%94%20I%20need%20help%20with%20PSARA%20License%20registration.",
  },
  hours: "Mon – Sat 9:30 AM – 6:30 PM",
  social: {
    facebook: "https://www.facebook.com/Psaraconsultant/",
    youtube: "https://www.youtube.com/@psaraconsultantindia",
    linkedin: "https://www.linkedin.com/company/psara-consultant-india/",
    instagram: "https://www.instagram.com/psaraconsultantindia/",
    google:
      "https://maps.google.com/?cid=10061939707983891749",
  },
  googleReviews: {
    rating: GOOGLE_REVIEWS.rating,
    count: GOOGLE_REVIEWS.reviewCountNumber,
    url: GOOGLE_REVIEWS.profileUrl,
  },
} as const;

/** Aggregate rating data for schema.org markup — synced with GBP */
export const AGGREGATE_RATING = {
  ratingValue: "5.0",
  bestRating: "5",
  worstRating: "1",
  reviewCount: String(GOOGLE_REVIEWS.reviewCountNumber),
} as const;

export type OfficeLocation = {
  city: string;
  badge: string;
  region: string;
  placeName: string;
  address: string;
  pin: string;
  phone: string;
  phoneRaw: string;
  hours: string;
  isHQ: boolean;
  lat: number;
  lng: number;
  mapUrl: string;
  mapEmbed: string;
  stateSlug: string;
};

export const OFFICES: OfficeLocation[] = [
  {
    city: "New Delhi",
    badge: "Registered Office",
    region: "Delhi",
    placeName: "PSARA Consultant India — New Delhi",
    address:
      "5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi",
    pin: "110001",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 28.6304,
    lng: 77.2177,
    mapUrl:
      "https://maps.google.com/?cid=8304854373543658973",
    mapEmbed:
      "https://www.google.com/maps?cid=8304854373543658973&output=embed&hl=en",
    stateSlug: "delhi",
  },
  {
    city: "Gurugram",
    badge: "Corporate Office",
    region: "Haryana",
    placeName: "PSARA Consultant India — Gurugram",
    address:
      "2nd Floor, MPD Tower, Golf Course Road, Sector 43, Gurugram, Haryana",
    pin: "122002",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 28.4575,
    lng: 77.0965,
    mapUrl:
      "https://maps.google.com/?cid=15529635849800721819",
    mapEmbed:
      "https://www.google.com/maps?cid=15529635849800721819&output=embed&hl=en",
    stateSlug: "haryana",
  },
  {
    city: "Jaipur",
    badge: "Headquarters",
    region: "Rajasthan",
    placeName: "PSARA Consultant India — Jaipur HQ",
    address:
      "C-36, Third Floor, Capital Galleria, Sirsi Road, Kanakpura, Jaipur",
    pin: "302034",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: true,
    lat: 26.8854,
    lng: 75.7365,
    mapUrl:
      "https://maps.google.com/?cid=10061939707983891749",
    mapEmbed:
      "https://www.google.com/maps?cid=10061939707983891749&output=embed&hl=en",
    stateSlug: "rajasthan",
  },
  {
    city: "Bhopal",
    badge: "MP Desk",
    region: "Madhya Pradesh",
    placeName: "PSARA Consultant India — Bhopal",
    address:
      "555, 5th Floor, Dynamic Centre, Zone-I, Maharana Pratap Nagar (MP Nagar), Opp. DB City Mall, Near Hotel Surendra Vilas, Bhopal",
    pin: "462011",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 23.233,
    lng: 77.434,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dynamic+Centre+MP+Nagar+Bhopal",
    mapEmbed:
      "https://www.google.com/maps?q=MP+Nagar+Bhopal+Dynamic+Centre&output=embed&hl=en",
    stateSlug: "madhya-pradesh",
  },
  {
    city: "Lucknow",
    badge: "UP Desk",
    region: "Uttar Pradesh",
    placeName: "PSARA Consultant India — Lucknow",
    address:
      "303, 3rd Floor, Mehra Business Complex, Main Vidhan Sabha Marg, Opposite Ratan Square, Hazratganj, Lucknow",
    pin: "226001",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 26.855,
    lng: 80.945,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Mehra+Business+Complex+Hazratganj+Lucknow",
    mapEmbed:
      "https://www.google.com/maps?q=Hazratganj+Lucknow+Mehra+Business+Complex&output=embed&hl=en",
    stateSlug: "uttar-pradesh",
  },
  {
    city: "Indore",
    badge: "MP Field",
    region: "Madhya Pradesh",
    placeName: "PSARA Consultant India — Indore",
    address:
      "600, 6th Floor, Apollo Premier, Vijay Nagar Square, AB Road, Vijay Nagar, Indore",
    pin: "452010",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 22.7533,
    lng: 75.8937,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Apollo+Premier+Vijay+Nagar+Indore",
    mapEmbed:
      "https://www.google.com/maps?q=Apollo+Premier+Vijay+Nagar+Indore&output=embed&hl=en",
    stateSlug: "madhya-pradesh",
  },
  {
    city: "Ahmedabad",
    badge: "West Desk",
    region: "Gujarat",
    placeName: "PSARA Consultant India — Ahmedabad",
    address:
      "6th Floor, Paarijat Eclat Tower A, Mondeal Heights, 605, SG Highway, Iskcon Cross Rd, Ahmedabad",
    pin: "380015",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 23.0276,
    lng: 72.5085,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Mondeal+Heights+SG+Highway+Ahmedabad",
    mapEmbed:
      "https://www.google.com/maps?q=Mondeal+Heights+SG+Highway+Ahmedabad&output=embed&hl=en",
    stateSlug: "gujarat",
  },
  {
    city: "Raipur",
    badge: "CG Desk",
    region: "Chhattisgarh",
    placeName: "PSARA Consultant India — Raipur",
    address: "303, 3rd Floor, Ravi Bhawan, GE Road, Raipur",
    pin: "492001",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 21.2514,
    lng: 81.6296,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ravi+Bhawan+GE+Road+Raipur",
    mapEmbed:
      "https://www.google.com/maps?q=Ravi+Bhawan+GE+Road+Raipur&output=embed&hl=en",
    stateSlug: "chhattisgarh",
  },
  {
    city: "Noida",
    badge: "NCR Desk",
    region: "Uttar Pradesh",
    placeName: "PSARA Consultant India — Noida",
    address:
      "C-20, Coast Guard Golf Ground Rd, C Block, Phase 2, Industrial Area, Sector 62, Noida",
    pin: "201309",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 28.627,
    lng: 77.3649,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sector+62+Noida+C-20+Industrial+Area",
    mapEmbed:
      "https://www.google.com/maps?q=Sector+62+Noida+Industrial+Area&output=embed&hl=en",
    stateSlug: "uttar-pradesh",
  },
  {
    city: "Jodhpur",
    badge: "Rajasthan Field",
    region: "Rajasthan",
    placeName: "PSARA Consultant India — Jodhpur",
    address:
      "105, 1st Floor, Khatri Bhawan, Residency Road / 5th B Road, Sardarpura, Jodhpur",
    pin: "342003",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 26.275,
    lng: 73.008,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Khatri+Bhawan+Sardarpura+Jodhpur",
    mapEmbed:
      "https://www.google.com/maps?q=Sardarpura+Jodhpur+Khatri+Bhawan&output=embed&hl=en",
    stateSlug: "rajasthan",
  },
  {
    city: "Chandigarh",
    badge: "North Desk",
    region: "Chandigarh / Punjab / Haryana",
    placeName: "PSARA Consultant India — Chandigarh",
    address: "215, 2nd Floor, SCO 208–209, Sector 34-A, Chandigarh",
    pin: "160022",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 30.724,
    lng: 76.765,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=SCO+208+Sector+34A+Chandigarh",
    mapEmbed:
      "https://www.google.com/maps?q=Sector+34A+Chandigarh+SCO+208&output=embed&hl=en",
    stateSlug: "punjab",
  },
  {
    city: "Ludhiana",
    badge: "Punjab Field",
    region: "Punjab",
    placeName: "PSARA Consultant India — Ludhiana",
    address: "213, 2nd Floor, Feroze Gandhi Market (FGM), Ludhiana",
    pin: "141001",
    phone: CONTACT.phoneDisplay,
    phoneRaw: CONTACT.phoneRaw,
    hours: CONTACT.hours,
    isHQ: false,
    lat: 30.901,
    lng: 75.857,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Feroze+Gandhi+Market+Ludhiana",
    mapEmbed:
      "https://www.google.com/maps?q=Feroze+Gandhi+Market+Ludhiana&output=embed&hl=en",
    stateSlug: "punjab",
  },
];

export function getOfficesForState(stateSlug: string) {
  return OFFICES.filter((o) => o.stateSlug === stateSlug);
}
