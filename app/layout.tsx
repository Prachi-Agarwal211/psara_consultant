import type { Metadata, Viewport } from "next";
import SmoothScroll from "./components/providers/SmoothScroll";
import SiteChrome from "../components/SiteChrome";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/layout/Preloader";
import PageLoader from "./components/layout/PageLoader";
import { SITE, CONTACT, AGGREGATE_RATING, OFFICES } from "../lib/config";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#e0b84a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | PSARA License & Security Agency Compliance`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "PSARA License",
    "Security Agency Registration India",
    "PSARA Consultant India",
    "Private Security Agency License",
    "Security Guard Training MOU",
    "PSARA License Jaipur",
    "PSARA License Delhi",
    "Controlling Authority Filing",
    "Police Antecedent Verification",
    "PSARA Renewal",
  ],
  openGraph: {
    title: `${SITE.name} | PSARA License Clearance Across India`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PSARA Consultant India — PSARA License Clearance Across 28 States",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | PSARA License & Security Agency Compliance`,
    description: SITE.description,
    images: ["/og-image.jpg"],
    site: "@psaraconsultant",
    creator: "@psaraconsultant",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "theme-color": "#e0b84a",
    "msapplication-navbutton-color": "#e0b84a",
    "apple-mobile-web-app-status-bar-style": "#e0b84a",
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur, Rajasthan",
    "geo.position": "26.8854;75.7365",
    ICBM: "26.8854, 75.7365",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* JSON-LD Structured Data — Organization + WebPage + Service + FAQ schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE.url}/#organization`,
                  name: SITE.name,
                  url: SITE.url,
                  description: SITE.description,
                  slogan: "Statute-First · Verification-Ready · Post-Grant Discipline",
                  sameAs: [
                    CONTACT.social.facebook,
                    CONTACT.social.youtube,
                    CONTACT.social.linkedin,
                    CONTACT.social.instagram,
                    CONTACT.social.google,
                    `https://wa.me/${CONTACT.whatsapp.number}`,
                    SITE.wikidata.url,
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "PSARA Consultation",
                    telephone: CONTACT.phoneDisplay,
                    email: CONTACT.email,
                    availableLanguage: ["English", "Hindi"],
                  },
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE.url}/logo.png`,
                  },
                  knowsAbout: [
                    "PSARA License",
                    "Security Agency Registration",
                    "Controlling Authority Filing",
                    "Police Antecedent Verification",
                    "Training Institute MOU",
                    "PSARA Renewal",
                    "Multi-State PSARA License",
                  ],
                  areaServed: { "@type": "Country", name: "India" },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: AGGREGATE_RATING.ratingValue,
                    reviewCount: AGGREGATE_RATING.reviewCount,
                    bestRating: AGGREGATE_RATING.bestRating,
                    worstRating: AGGREGATE_RATING.worstRating,
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": `${SITE.url}/#webpage`,
                  url: SITE.url,
                  name: `${SITE.name} | PSARA License Clearance Across India`,
                  description: SITE.description,
                  isPartOf: { "@id": `${SITE.url}/#website` },
                  about: { "@id": `${SITE.url}/#organization` },
                  inLanguage: "en-IN",
                },
                {
                  "@type": "Service",
                  "@id": `${SITE.url}/#service`,
                  name: "PSARA License Registration & Compliance",
                  description: "Pan-India PSARA licensing advisory, training MOUs, police verification liaison, and multi-state compliance craft under the PSARA Act, 2005.",
                  provider: { "@id": `${SITE.url}/#organization` },
                  areaServed: { "@type": "Country", name: "India" },
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": `${SITE.url}/#breadcrumb`,
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: SITE.url,
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Services",
                      item: `${SITE.url}/services`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "Contact",
                      item: `${SITE.url}/contact`,
                    },
                  ],
                },
                ...OFFICES.filter((o) => o.isHQ).map((office) => ({
                  "@type": "LocalBusiness",
                  "@id": `${SITE.url}/#office-${office.city.toLowerCase().replace(/\s+/g, "-")}`,
                  name: `${SITE.name} — ${office.city} ${office.badge}`,
                  url: SITE.url,
                  telephone: office.phone,
                  email: CONTACT.email,
                  image: `${SITE.url}/logo.png`,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: office.address,
                    addressLocality: office.city,
                    addressRegion: office.region,
                    postalCode: office.pin,
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: office.lat,
                    longitude: office.lng,
                  },
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    opens: "09:00",
                    closes: "21:00",
                  },
                  priceRange: "₹₹",
                  areaServed: { "@type": "Country", name: "India" },
                  parentOrganization: { "@id": `${SITE.url}/#organization` },
                })),
                {
                  "@type": "FAQPage",
                  "@id": `${SITE.url}/faq#faqpage`,
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is a PSARA License?",
                      acceptedAnswer: { "@type": "Answer", text: "A PSARA License is the statutory licence under the Private Security Agencies (Regulation) Act, 2005 that authorises a person or company to run a private security agency in India." },
                    },
                    {
                      "@type": "Question",
                      name: "Who needs a PSARA License in India?",
                      acceptedAnswer: { "@type": "Answer", text: "Any individual or entity intending to start or operate a private security agency providing guards, supervisors, or related security services for hire must obtain a PSARA License from the State Controlling Authority." },
                    },
                    {
                      "@type": "Question",
                      name: "How long is a PSARA License valid?",
                      acceptedAnswer: { "@type": "Answer", text: "Typically five years from the date of grant in most States, subject to Rules and timely renewal. Some States operate with one-year validity regimes." },
                    },
                    {
                      "@type": "Question",
                      name: "What documents are required for PSARA?",
                      acceptedAnswer: { "@type": "Answer", text: "Identity and address proofs of promoters, company incorporation papers, MOA/AOA with suitable objects, registered office proof, photographs, affidavits, training MOU, and police verification forms." },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full overflow-x-hidden font-medium bg-[var(--obsidian)] text-[var(--cream)]">
        <PageLoader />
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <SiteChrome>{children}</SiteChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}
