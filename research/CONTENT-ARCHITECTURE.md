# PSARA Consultant India — Content Architecture & Data Design

> **Goal:** Complete content map for all 320+ pages, data structures, 800+ word pages plan
> **Reference:** Silbar Security's data-driven architecture

---

## 1. Complete URL Map

### 1.1 Core Pages (20)

| # | URL | Page Type | Target Words |
|---|-----|-----------|-------------|
| 1 | / | Home | 800+ |
| 2 | /about | About Us | 1,200+ |
| 3 | /contact | Contact | 600+ |
| 4 | /services | Services Hub | 1,000+ |
| 5 | /faq | FAQ (55-100 Qs) | 3,000+ |
| 6 | /blog | Blog Listing | 200+ |
| 7 | /privacy-policy | Privacy Policy | 1,500+ |
| 8 | /terms | Terms & Conditions | 2,000+ |
| 9 | /disclaimer | Disclaimer | 1,000+ |
| 10 | /sitemap | Sitemap | — |
| 11 | /psara-license | PSARA License Guide | 2,000+ |
| 12 | /psara-process | Step-by-Step Process | 2,000+ |
| 13 | /psara-eligibility | Eligibility Guide | 1,500+ |
| 14 | /psara-documents | Document Checklist | 1,500+ |
| 15 | /psara-fees | Fee Structure | 1,500+ |
| 16 | /psara-renewal | Renewal Process | 1,500+ |
| 17 | /psara-training | Training & MOU | 1,500+ |
| 18 | /multi-state-license | Multi-State Guide | 1,200+ |
| 19 | /rejection-reasons | Rejection Guide | 1,200+ |
| 20 | /police-verification | Police Verification | 1,200+ |

### 1.2 Additional Guide Pages (10)

| # | URL | Topic | Words |
|---|-----|-------|-------|
| 21 | /business-plan | Security Agency Business Plan | 2,000+ |
| 22 | /company-registration | Company Registration | 1,500+ |
| 23 | /business-structure | Business Structure Compare | 1,500+ |
| 24 | /start-security-agency | How to Start Security Agency | 2,500+ |
| 25 | /psara-cost-guide | Complete Cost Guide | 2,000+ |
| 26 | /psara-act-2005 | PSARA Act Section Summary | 3,000+ |
| 27 | /security-guard-training | Guard Training | 1,500+ |
| 28 | /location-office | Office Address Requirement | 1,200+ |
| 29 | /affidavits-forms | PSARA Affidavits & Forms | 1,500+ |
| 30 | /psara-vs-other-licenses | PSARA vs Other Licenses | 1,200+ |

### 1.3 Service Pages (10)

| # | URL | Service |
|---|-----|---------|
| 31 | /services/psara-license | PSARA License Registration |
| 32 | /services/company-registration | Company Registration |
| 33 | /services/gst-registration | GST Registration |
| 34 | /services/msme-registration | MSME/Udyam Registration |
| 35 | /services/training-mou | Security Training MOU |
| 36 | /services/police-verification | Police Verification Support |
| 37 | /services/labour-compliance | Labour Compliance |
| 38 | /services/roc-filing | ROC Filing & Compliance |
| 39 | /services/business-funding | Business Funding Support |
| 40 | /services/office-space | Office Space Provision |

### 1.4 State Pages (28)

| # | URL | State |
|---|-----|-------|
| 41-68 | /states/andhra-pradesh | Andhra Pradesh |
| | /states/arunachal-pradesh | Arunachal Pradesh |
| | /states/assam | Assam |
| | /states/bihar | Bihar |
| | /states/chhattisgarh | Chhattisgarh |
| | /states/delhi | Delhi |
| | /states/goa | Goa |
| | /states/gujarat | Gujarat |
| | /states/haryana | Haryana |
| | /states/himachal-pradesh | Himachal Pradesh |
| | /states/jharkhand | Jharkhand |
| | /states/karnataka | Karnataka |
| | /states/kerala | Kerala |
| | /states/madhya-pradesh | Madhya Pradesh |
| | /states/maharashtra | Maharashtra |
| | /states/manipur | Manipur |
| | /states/meghalaya | Meghalaya |
| | /states/mizoram | Mizoram |
| | /states/nagaland | Nagaland |
| | /states/odisha | Odisha |
| | /states/punjab | Punjab |
| | /states/rajasthan | Rajasthan |
| | /states/sikkim | Sikkim |
| | /states/tamil-nadu | Tamil Nadu |
| | /states/telangana | Telangana |
| | /states/tripura | Tripura |
| | /states/uttar-pradesh | Uttar Pradesh |
| | /states/uttarakhand | Uttarakhand |
| | /states/west-bengal | West Bengal |

**Each state page:** 1,000+ words including intro, process, fees, docs, CA info, FAQs

### 1.5 City Pages (200+)

```
/cities/jaipur
/cities/jodhpur
/cities/udaipur
/cities/kota
/cities/ajmer
/cities/mumbai
/cities/pune
/cities/nagpur
/cities/thane
/cities/nashik
/cities/delhi
/cities/gurgaon
/cities/noida
/cities/faridabad
/cities/ghaziabad
/cities/bangalore
/cities/mysore
/cities/hyderabad
/cities/chennai
/cities/kolkata
/cities/ahmedabad
/cities/surat
/cities/vadodara
/cities/rajkot
/cities/bhopal
/cities/indore
/cities/lucknow
/cities/kanpur
/cities/patna
/cities/ranchi
/cities/bhubaneswar
/cities/guwahati
/cities/chandigarh
/cities/dehradun
/cities/shimla
/cities/jammu
/cities/srinagar
... + 160+ more
```

**Each city page:** 800+ words including intro, local process, consultant info, FAQs

### 1.6 Blog Posts (50+ initial)

Weekly posts on:
- PSARA process tips
- State-specific guides
- Security industry news
- Client success stories
- Compliance updates
- Hindi/Hinglish posts

---

## 2. Data Structures

### 2.1 State Data

```typescript
export interface StateData {
  id: string;
  name: string;
  capital: string;
  ca: string;  // Controlling Authority
  caAddress: string;
  caPhone: string;
  caWebsite: string;
  mode: "online" | "offline" | "both";
  applicationUrl?: string;
  timeline: string;
  fee: {
    oneDistrict: number;
    twoToFive: number;
    entireState: number;
    special?: { label: string; amount: number };  // e.g., Karnataka ₹50K
  };
  validity: string;
  rules: string;
  rulesYear: number;
  training: string;
  trainingHours: { classroom: number; field: number };
  majorCities: string[];
  process: string[];
  documents: string[];
  additionalInfo: string;
}
```

### 2.2 City Data

```typescript
export interface CityData {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  tier: 1 | 2 | 3;
  population: string;
  description: string;
  process: string[];
  documents: string[];
  localConsultants?: { name: string; phone?: string }[];
  nearbyCities: string[];
  economy: string;  // Major industries in the city
}
```

### 2.3 Service Data

```typescript
export interface ServiceData {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  description: string;  // Full 800+ word content
  process: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  price?: string;
  timeline?: string;
}
```

### 2.4 FAQ Data

```typescript
export interface FAQData {
  id: string;
  question: string;
  answer: string;
  category: string;  // e.g., "General", "Process", "Fees", "State-Specific"
  relatedStates?: string[];
  relatedServices?: string[];
}
```

---

## 3. Programmatic Content Generation System

### 3.1 Architecture Overview

```
src/data/
  ├── psara-states.ts    — 28 states with full metadata
  ├── psara-cities.ts    — 200+ cities
  ├── services.ts        — 10 services
  ├── faq.ts             — 55-100 FAQs
  └── blog.ts            — Blog posts

src/lib/
  └── seo-content-generator.ts
      ├── stringToHash()        — Deterministic seed
      ├── pickTemplate()        — Choose variation by seed
      ├── generateIntro()       — City/state intro
      ├── generateMarket()      — Local market context
      ├── generateProcess()     — Location-specific process
      ├── generateFAQs()        — 3-5 unique FAQs per page
      └── generateSchema()      — JSON-LD generator
```

### 3.2 Content Template Pool

Each section has 15-20 template variations. Example for state pages:

```typescript
const INTROS = [
  '{state} is one of India\'s fastest-growing states for private security services. With its {economy} economy...',
  'Are you looking to obtain a PSARA license in {state}? The {capital}-based Controlling Authority...',
  'The private security industry in {state} has seen remarkable growth, driven by...',
  // ... 15+ more
];

const MARKET_SECTION = [
  'The security market in {state} is valued at approximately {estimatedValue} with {growth}% growth...',
  // ... 10+ more
];
```

### 3.3 Uniqueness Guarantee

Every page is unique via:
1. **Location name** — always different
2. **Hash-seeded template** — different paragraph order/variations
3. **State-specific facts** — CA name, fee structure, validity period
4. **City-specific details** — local economy, population, nearby cities
5. **FAQ randomization** — pick 3-5 from a pool of 100+ by hash

### 3.4 800+ Word Page Structure

```
Page: /states/rajasthan (1,000+ words)

1. Hero Section (50 words)
   - "PSARA License in Rajasthan — Complete Guide 2026"
   - Subtitle with key info

2. Introduction (150 words)
   - Overview of PSARA in Rajasthan
   - Unique to Rajasthan (desert, tourism, industries)

3. About Rajasthan (100 words)
   - Capital, population, economy
   - Why security demand is growing

4. PSARA Process in Rajasthan (200 words)
   - Step-by-step with state-specific details
   - CA: Home Department, Jaipur

5. Fee Structure (100 words)
   - Table with state fees
   - Note: validity, renewal

6. Documents Required (100 words)
   - State-specific document list
   - Extra requirements unique to Rajasthan

7. Training Requirements (100 words)
   - MOU with approved institutes in Rajasthan
   - Training duration

8. FAQ (150 words)
   - 3-5 state-specific FAQs

9. CTA (50 words)
   - WhatsApp + Phone
```

---

## 4. Internal Linking Map

### 4.1 Topic Clusters

```
PSARA License (Pillar)
├── /psara-process
├── /psara-eligibility
├── /psara-documents
├── /psara-fees
├── /psara-renewal
└── /psara-training

State Pages (Cluster)
├── /states/rajasthan → /cities/jaipur, /cities/jodhpur, ...
├── /states/delhi → /cities/delhi
├── /states/maharashtra → /cities/mumbai, /cities/pune, ...
└── ... each state links to its cities

Services (Cluster)
├── /services/psara-license → all psara-* pages
├── /services/company-registration → /psara-documents
└── ... every service links to relevant guides

FAQ (Hub)
├── All FAQ answers link to relevant pages
└── Each page links back to FAQ for related questions
```

### 4.2 Link Density

| Page Type | Internal Links | External Links |
|-----------|---------------|---------------|
| Home | 15+ | 2-3 |
| State Page | 10+ | 1-2 (govt sites) |
| City Page | 8+ | 1 |
| Service Page | 12+ | 1 |
| Guide Page | 20+ | 3-5 |
| FAQ | 50+ | 0 |

---

## 5. Schema Markup Plan

### 5.1 Site-Wide (in RootLayout)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PSARA Consultant India",
  "url": "https://[new-domain]",
  "logo": "https://[new-domain]/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9983169555",
    "contactType": "customer service"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "addressCountry": "IN"
  }
}
```

### 5.2 Per-Page Schema

| Page Type | Schema Type |
|-----------|-------------|
| Home | Organization + WebSite |
| State Page | LocalBusiness + FAQPage |
| City Page | LocalBusiness + FAQPage |
| Service Page | Service |
| FAQ | FAQPage |
| Blog | Article |
| About | Organization |
| Contact | LocalBusiness |

### 5.3 Breadcrumb Schema (All Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/" },
    { "@type": "ListItem", "position": 2, "name": "States", "item": "https://[domain]/states" },
    { "@type": "ListItem", "position": 3, "name": "Rajasthan", "item": "https://[domain]/states/rajasthan" }
  ]
}
```

---

## 6. WhatsApp Integration Points

| Page | WhatsApp CTA Type | Position |
|------|------------------|----------|
| All pages | Floating button | Bottom right |
| All pages | Sticky bar | Bottom (scroll) |
| Home | Hero CTA | Above fold |
| Service pages | "Get Started" button | After description |
| State/City pages | "Apply Now" button | After content |
| FAQ | "Have a different question?" | Bottom of section |
| Blog | "Need help?" | Sidebar |
| Contact | Primary CTA | Full width |
| About | "Talk to our team" | After credentials |

---

## 7. Page-Specific Content Notes

### 7.1 Home Page Sections
1. **Hero:** Video/cinematic background, two CTAs, stats overlay
2. **Trust Bar:** License count, states, years, offices
3. **Services Grid:** 6 core services with icons
4. **Why Us:** 4 differentiators with illustrations
5. **State Map:** Interactive India map with state links
6. **Process:** 3-step simplified process
7. **FAQ Preview:** 5 most common FAQs
8. **CTA:** Final call to action
9. **Footer:** Full link structure

### 7.2 State Page Sections
1. **Hero:** State name + stats (capital, cities, etc.)
2. **Breadcrumb:** Home > States > Rajasthan
3. **Quick Info Bar:** Timeline, fee range, validity
4. **Content:** 800+ words of unique content
5. **Cities Grid:** Links to all cities in state
6. **FAQ:** 3-5 location-specific FAQs
7. **CTA:** WhatsApp + phone

### 7.3 City Page Sections
1. **Hero:** City name + state context
2. **Breadcrumb:** Home > States > Rajasthan > Jaipur
3. **Quick Info:** Population, tier, economy
4. **Content:** 800+ words unique to city
5. **Nearby Cities:** Links to neighboring cities
6. **FAQ:** 3-5 city-specific FAQs
7. **CTA:** WhatsApp + phone

---

## 8. Blog Content Plan (First 12 Weeks)

| Week | Topic | Keywords |
|------|-------|----------|
| 1 | Complete PSARA License Guide 2026 | PSARA License |
| 2 | How to Start Security Agency in India | start security agency |
| 3 | PSARA License Fees State Wise 2026 | PSARA fees |
| 4 | Documents Required for PSARA License | PSARA documents |
| 5 | PSARA License in Rajasthan — Complete Guide | Rajasthan PSARA |
| 6 | PSARA License vs Other Licenses | security license comparison |
| 7 | Common PSARA Rejection Reasons | PSARA rejection |
| 8 | Security Agency Business Plan | business plan |
| 9 | PSARA License Renewal Process | PSARA renewal |
| 10 | Multi-State PSARA License Guide | multi-state PSARA |
| 11 | PSARA Training Requirements 2026 | PSARA training |
| 12 | Security Industry India 2026 — Market Analysis | security industry India |
