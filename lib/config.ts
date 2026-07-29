/** PSARA Consultant India — single source of truth (facts from live operations) */

export const SITE = {
  name: "PSARA Consultant India",
  legalName: "PSARA Consultant India",
  url: "https://psaraconsultantindia.com",
  tagline: "Your Trusted Partner for PSARA Licensing Across India",
  description:
    "Pan-India PSARA License registration, security agency compliance, training MOU, police verification, and company setup. Headquarters in Jaipur with desks across Delhi NCR, Gujarat, Madhya Pradesh, Uttar Pradesh, and more.",
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
  hours: "Mon–Sat 9:00 AM – 9:00 PM · Consultation by appointment",
  social: {
    facebook: "https://www.facebook.com/Psaraconsultant/",
    youtube: "https://www.youtube.com/@psaraconsultantindia",
    linkedin: "https://www.linkedin.com/search/results/all/?keywords=PSARA%20Consultant%20India",
    instagram: "https://www.instagram.com/",
    google:
      "https://www.google.com/maps/search/?api=1&query=C-36+Capital+Galleria+Sirsi+Road+Kanakpura+Jaipur+302034",
  },
  googleReviews: {
    rating: 5.0,
    count: 128,
    url: "https://www.google.com/maps/search/?api=1&query=C-36+Capital+Galleria+Sirsi+Road+Kanakpura+Jaipur+302034",
  },
} as const;

/** Aggregate rating data for schema.org markup — synced with GBP */
export const AGGREGATE_RATING = {
  ratingValue: "5.0",
  bestRating: "5",
  worstRating: "1",
  reviewCount: String(CONTACT.googleReviews.count),
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
      "https://www.google.com/maps/search/?api=1&query=C-36+Capital+Galleria+Sirsi+Road+Kanakpura+Jaipur",
    mapEmbed:
      "https://www.google.com/maps?q=C-36+Capital+Galleria+Sirsi+Road+Kanakpura+Jaipur&output=embed&hl=en",
    stateSlug: "rajasthan",
  },
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
      "https://www.google.com/maps/search/?api=1&query=Statesman+House+Barakhamba+Road+Connaught+Place+New+Delhi",
    mapEmbed:
      "https://www.google.com/maps?q=Statesman+House+Barakhamba+Road+New+Delhi&output=embed&hl=en",
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
      "https://www.google.com/maps/search/?api=1&query=MPD+Tower+Golf+Course+Road+Sector+43+Gurugram",
    mapEmbed:
      "https://www.google.com/maps?q=MPD+Tower+Sector+43+Gurugram&output=embed&hl=en",
    stateSlug: "haryana",
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
