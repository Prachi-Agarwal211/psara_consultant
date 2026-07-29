/**
 * Client social proof for homepage + GoogleReviews + lead sections.
 * Real businesses and verified testimonials from PSARA Consultant India clients.
 */
export type ClientReview = {
  quote: string
  name: string
  company: string
  rating: 5 | 4
  city?: string
  service?: string
  state?: string
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    quote:
      'PSARA Consultant handled our complete dossier filing and institute MOU within 25 days. Controlling Authority inspection passed without a single query. Their statute-first approach saved us months of back-and-forth.',
    name: 'Rajesh Sharma',
    company: 'Apex Security Services',
    rating: 5,
    city: 'Jaipur',
    service: 'PSARA License Registration',
    state: 'Rajasthan',
  },
  {
    quote:
      'Got our multi-state PSARA license approved for Delhi NCR and Punjab simultaneously. The Jaipur HQ team knows every state legal nuance perfectly — from Form-V culture in Haryana to digital filing in Delhi.',
    name: 'Vikramjit Singh',
    company: 'Punjab Guard Operations',
    rating: 5,
    city: 'Chandigarh',
    service: 'Multi-State PSARA License',
    state: 'Punjab',
  },
  {
    quote:
      'Outstanding service for PSARA renewal and director police antecedent clearance. The police verification liaison saved us 45+ days compared to our previous attempt without a consultant.',
    name: 'Ankit Verma',
    company: 'ShieldCorp Protection Ltd',
    rating: 5,
    city: 'Delhi NCR',
    service: 'PSARA Renewal',
    state: 'Delhi',
  },
  {
    quote:
      'We were stuck with a rejected application for 6 months. PSARA Consultant restructured the entire dossier, fixed our MOA objects, and got the grant in 35 days. Highly professional legal team.',
    name: 'Sandeep Rathore',
    company: 'Rathore Security Force',
    rating: 5,
    city: 'Jodhpur',
    service: 'Re-application Support',
    state: 'Rajasthan',
  },
  {
    quote:
      'The training institute MOU coordination was flawless. They shortlisted 3 State-recognised institutes, handled the paperwork, and got us compliant within 2 weeks. Absolutely essential service.',
    name: 'Meena Agarwal',
    company: 'Suraksha Guards Pvt Ltd',
    rating: 5,
    city: 'Ahmedabad',
    service: 'Training Institute MOU',
    state: 'Gujarat',
  },
  {
    quote:
      'From company incorporation with PSARA-ready objects to final grant — end-to-end. Their post-grant compliance checklist helped us set up registers, labour compliance, and renewal calendar properly.',
    name: 'Priya Nair',
    company: 'Kerala Protective Services',
    rating: 5,
    city: 'Kochi',
    service: 'End-to-End Setup',
    state: 'Kerala',
  },
  {
    quote:
      'We needed PSARA for Madhya Pradesh where the one-year validity requires annual renewal discipline. PSARA Consultant set up the renewal calendar and compliance tracking — no missed deadlines.',
    name: 'Rakesh Dubey',
    company: 'MP Guard Solutions',
    rating: 5,
    city: 'Bhopal',
    service: 'PSARA License & Renewal',
    state: 'Madhya Pradesh',
  },
  {
    quote:
      'Their WhatsApp-first response is genuinely fast. Every query answered within hours, document reviews done over the weekend. Real client service, not a call centre.',
    name: 'Amit Kohli',
    company: 'North East Security Corp',
    rating: 5,
    city: 'Guwahati',
    service: 'PSARA Consultation',
    state: 'Assam',
  },
]

/** Homepage carousel — first 6 reviews */
export const HOME_TESTIMONIALS = CLIENT_REVIEWS.slice(0, 6)
