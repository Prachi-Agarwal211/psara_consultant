import type { Metadata, Viewport } from "next";
import SmoothScroll from "./components/providers/SmoothScroll";
import SiteChrome from "../components/SiteChrome";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "../components/CustomCursor";
import { SITE, CONTACT, AGGREGATE_RATING, OFFICES } from "../lib/config";
import DynamicBreadcrumbSchema from "../components/DynamicBreadcrumbSchema";
import Analytics from "./components/Analytics";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0066FF",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "PSARA Consultant India | PSARA License",
    template: "%s | PSARA Consultant India",
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
    title: "PSARA Consultant India | PSARA License",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: "/assets/images/og/default-og.jpg",
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
    title: "PSARA Consultant India | PSARA License",
    description: SITE.description,
    images: ["/assets/images/og/default-og.jpg"],
    site: "@psaraconsultant",
    creator: "@psaraconsultant",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "theme-color": "#e0b84a",
    "msapplication-navbutton-color": "#e0b84a",
    "apple-mobile-web-app-status-bar-style": "#e0b84a",
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi, Delhi",
    "geo.position": "28.6304;77.2177",
    ICBM: "28.6304, 77.2177",
  },
  alternates: {
    canonical: SITE.url,
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/ai.txt", title: "ai.txt" },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import StickyCta from "./components/layout/StickyCta";
import ExitIntentPopup from "./components/ui/ExitIntentPopup";
import PageTransition from "./components/layout/PageTransition";

/**
 * Organization / LocalBusiness / FAQ JSON-LD graph.
 * Rendered in <body> (not <head>) — React 19 + Next head scripts are hoisted
 * by the browser which breaks hydration; JSON-LD is parsed identically anywhere.
 */
const organizationSchema = JSON.stringify({
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
      creator: {
        "@type": "Organization",
        name: "Reverbex Technology",
        url: "https://reverbex.in",
        description: "Elite Software Engineering, AI Automations, and Web Systems.",
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
    ...OFFICES.map((office) => ({
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
        opens: "09:30",
        closes: "18:30",
      },
      priceRange: "₹₹",
      areaServed: { "@type": "Country", name: "India" },
      parentOrganization: { "@id": `${SITE.url}/#organization` },
    })),
  ],
});

import CookieBanner from "./components/ui/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Analytics />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full overflow-x-hidden font-medium bg-[#FFFEF9] text-[#0F3C65]"
      >
        {/* JSON-LD Organization / LocalBusiness / FAQ graph — body render avoids React 19 head hydration mismatch */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchema }}
        />
        {/* Dynamic per-page breadcrumb — rendered in body to avoid head hydration mismatch */}
        <DynamicBreadcrumbSchema />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <PageTransition>
            <SiteChrome>{children}</SiteChrome>
          </PageTransition>
        </SmoothScroll>
        <StickyCta />
        <ExitIntentPopup />
        <CookieBanner />
      </body>
    </html>
  );
}
