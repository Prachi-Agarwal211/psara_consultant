import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import { pageMeta } from "../../lib/metadata";
import { OFFICES, CONTACT, SITE } from "../../lib/config";
import JsonLd from "../../components/JsonLd";

export const metadata: Metadata = pageMeta(
  "Google Business Profiles & Offices",
  `Find ${SITE.name} on Google Maps — Jaipur HQ, Delhi, Gurugram, Noida, Ahmedabad. Call ${CONTACT.phoneDisplay}.`,
  "/google",
  ["PSARA consultant Google", "PSARA office Jaipur", "PSARA Delhi"]
);

export default function GooglePage() {
  const graph = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    sameAs: [CONTACT.social.google, CONTACT.social.linkedin].filter(Boolean),
    department: OFFICES.map((o) => ({
      "@type": "LocalBusiness",
      name: o.placeName,
      telephone: o.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: o.city,
        addressRegion: o.region,
        postalCode: o.pin,
        addressCountry: "IN",
        streetAddress: o.address,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: o.lat,
        longitude: o.lng,
      },
      url: o.mapUrl,
    })),
  };

  return (
    <>
      <JsonLd data={graph} />
      <PageHero
        eyebrow="Google Business"
        title="Our offices on Google Maps"
        lead="Visit or call the desk nearest you. Each location supports PSARA documentation and consultation."
        crumbs={[{ label: "Google Business Profiles" }]}
      />
      <PageMain>
        <Prose>
          <p>
            Clients discover us through <strong>Google Business Profiles</strong> and local search.
            Use the maps links below for directions, or call / WhatsApp for a same-day consultation
            slot.
          </p>
        </Prose>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {OFFICES.map((o) => (
            <article key={o.city} className="border border-[var(--line)] p-6">
              <p className="label-meta font-bold text-[var(--gold)]">{o.badge}</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]">
                {o.placeName}
              </h2>
              <p className="mt-2 text-sm font-semibold text-[var(--cream-dim)]">{o.address}</p>
              <p className="mt-1 text-sm font-bold text-[var(--cream)]">{o.phone}</p>
              <p className="mt-1 text-xs font-medium text-[var(--cream-dim)]">{o.hours}</p>
              <div className="mt-4 aspect-video w-full overflow-hidden border border-[var(--line)]">
                <iframe
                  title={o.placeName}
                  src={o.mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={o.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-bold text-[var(--gold-soft)] underline"
              >
                Open in Google Maps
              </a>
            </article>
          ))}
        </div>
        <CtaBar title="Book a visit or video consult" />
      </PageMain>
    </>
  );
}
