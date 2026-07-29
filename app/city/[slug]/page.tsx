import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity, citiesInState } from "../../../data/cities";
import { getState } from "../../../data/states";
import { SERVICES } from "../../../data/services";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
import CtaBar from "../../../components/CtaBar";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import {
  generateCityContent,
  localBusinessJsonLd,
  faqJsonLd,
  howToJsonLd,
} from "../../../lib/seo-content";
import { SITE, getOfficesForCityPage } from "../../../lib/config";
import { GEO_COORDINATES } from "../../../lib/geo-coordinates";
import GbpOfficeSection from "../../components/sections/GbpOfficeSection";
import CityDossierView from "../../components/sections/CityDossierView";

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCity(slug);
  if (!c) return {};
  const state = getState(c.stateSlug);
  const content = generateCityContent(c, state);
  return pageMeta(
    `PSARA License in ${c.name}`,
    content.metaDescription,
    `/city/${slug}`,
    [
      `PSARA License ${c.name}`,
      `security agency ${c.name}`,
      `PSARA consultant ${c.name}`,
    ]
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCity(slug);
  if (!c) notFound();
  const state = getState(c.stateSlug);
  const content = generateCityContent(c, state);
  const siblings = citiesInState(c.stateSlug)
    .filter((x) => x.slug !== c.slug)
    .slice(0, 12);

  const gbpOffice = getOfficesForCityPage(c.slug, c.stateSlug)[0]
  const geoCoords = gbpOffice?.lat && gbpOffice?.lng
    ? { lat: gbpOffice.lat, lng: gbpOffice.lng }
    : GEO_COORDINATES[c.slug]

  return (
    <>
      {/* BreadcrumbList handled by DynamicBreadcrumbSchema (client) */}
      <JsonLd
        data={localBusinessJsonLd({
          name: `${SITE.name} — ${c.name}`,
          description: content.metaDescription,
          url: `${SITE.url}/city/${c.slug}`,
          city: c.name,
          state: c.stateName,
          lat: geoCoords?.lat,
          lng: geoCoords?.lng,
          address: gbpOffice?.address,
          pin: gbpOffice?.pin,
          nearbyCities: siblings.map((s) => s.name),
          services: SERVICES,
        })}
      />
      <JsonLd data={faqJsonLd(content.faqs)} />
      <JsonLd data={howToJsonLd(`How to get PSARA License in ${c.name}`, content.metaDescription, content.process)} />
      <PageHero
        title={`PSARA License in ${c.name}`}
        lead={content.metaDescription}
        crumbs={[
          { label: "Cities", href: "/cities" },
          { label: c.name },
        ]}
      />
      {/* Stats strip */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-[var(--gutter)] py-4 text-center text-xs font-bold uppercase tracking-wider md:gap-10">
          <div>
            <span className="block text-sm text-[var(--gold)]">{c.name}</span>
            <span className="block text-[var(--cream-dim)]">City</span>
          </div>
          <div className="h-8 w-px bg-[var(--line)]" aria-hidden />
          <div>
            <span className="block text-sm text-[var(--gold)]">{c.stateName}</span>
            <span className="block text-[var(--cream-dim)]">State</span>
          </div>
          <div className="h-8 w-px bg-[var(--line)]" aria-hidden />
          <div>
            <span className="block text-sm text-[var(--gold)]">Tier {c.tier}</span>
            <span className="block text-[var(--cream-dim)]">Market tier</span>
          </div>
          <div className="h-8 w-px bg-[var(--line)]" aria-hidden />
          <div>
            <span className="block text-sm text-[var(--gold)]">{c.economyTags.length}</span>
            <span className="block text-[var(--cream-dim)]">Key sectors</span>
          </div>
        </div>
      </section>

      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <CityDossierView
              city={c}
              state={state}
              content={content}
              siblings={siblings}
            />

            {siblings.length > 0 && (
              <div className="mt-12">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream)]">
                  Nearby cities in {c.stateName}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siblings.map((x) => (
                    <Link
                      key={x.slug}
                      href={`/city/${x.slug}`}
                      className="border border-[var(--line)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--cream-dim)] hover:border-[var(--gold)] hover:text-[var(--gold-soft)]"
                    >
                      {x.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Service cross-links for internal linking */}
            <div className="mt-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream)]">
                PSARA Services in {c.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-[var(--cream-dim)]">
                End-to-end PSARA licensing services available for applicants in {c.name}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICES.slice(0, 12).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="border border-[var(--line)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--cream-dim)] hover:border-[var(--gold)] hover:text-[var(--gold-soft)]"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
              <p className="mt-3 text-xs font-medium text-[var(--cream-dim)]">
                View all{" "}
                <Link href="/services" className="text-[var(--gold-soft)] underline">
                  PSARA services
                </Link>
                .
              </p>
            </div>

            <CtaBar title={`Consult for ${c.name}`} />
          </div>
          <div className="folio p-6 lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]">
                {c.name} enquiry
              </h3>
              <div className="mt-4">
                <WhatsAppForm
                  formType="City Page Enquiry"
                  city={c.name}
                  state={c.stateName}
                />
              </div>
            </div>

            <GbpOfficeSection
              placeLabel={c.name}
              offices={getOfficesForCityPage(c.slug, c.stateSlug)}
              isLocalOffice={['jaipur','new-delhi','delhi','gurugram','noida','ahmedabad','lucknow','bhopal','indore','raipur','chandigarh','ludhiana'].includes(c.slug)}
            />
          </div>
        </div>
      </PageMain>
    </>
  );
}
