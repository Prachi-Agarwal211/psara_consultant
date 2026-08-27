import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity, citiesInState } from "../../../data/cities";
import { getState } from "../../../data/states";
import { SERVICES } from "../../../data/services";
import { PageHero, PageMain } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
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
import { SITE, getOfficeForCitySlug, getOfficesForCityPage } from "../../../lib/config";
import { GEO_COORDINATES } from "../../../lib/geo-coordinates";
import GbpOfficeSection from "../../components/sections/GbpOfficeSection";
import CityDossierView from "../../components/sections/CityDossierView";
import { getLocationAccent, accentStyleVars, cityHeroImage } from "../../lib/location-accent";

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
  // Disambiguate titles: same-named cities in different states (Udaipur RJ vs TR)
  // and UT cities that share a name with their state (Chandigarh, Delhi, Puducherry)
  const cityLabel =
    c.stateName === c.name ? `${c.name} (UT)` : `${c.name}, ${c.stateName}`;
  return pageMeta(
    `PSARA License in ${cityLabel}`,
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

  const localOffice = getOfficeForCitySlug(c.slug);
  const geoCoords = localOffice?.lat && localOffice?.lng
    ? { lat: localOffice.lat, lng: localOffice.lng }
    : GEO_COORDINATES[c.slug];
  const accent = getLocationAccent(c.slug);
  const heroImage = cityHeroImage(c.slug);
  const accentStyle = accentStyleVars(accent) as CSSProperties;

  return (
    <StageShell>
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
          address: localOffice?.address,
          pin: localOffice?.pin,
          localOffice: Boolean(localOffice),
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
        locationSlug={c.slug}
        image={heroImage}
        meta={`( PSARA CONSULTANCY ) ( ${c.stateName.toUpperCase()} )`}
      />
      {/* Stats strip — accent-tinted */}
      <section className="border-b border-white/10" style={accentStyle}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-[var(--gutter)] py-4 text-center text-xs font-bold uppercase tracking-wider md:gap-10">
          <div>
            <span className="block text-sm text-acc-bright">{c.name}</span>
            <span className="block text-[var(--white-55)]">City</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">{c.stateName}</span>
            <span className="block text-[var(--white-55)]">State</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">Tier {c.tier}</span>
            <span className="block text-[var(--white-55)]">Market tier</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">{c.economyTags.length}</span>
            <span className="block text-[var(--white-55)]">Key sectors</span>
          </div>
        </div>
      </section>

      <PageMain>
        <div style={accentStyle} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <CityDossierView
              city={c}
              state={state}
              content={content}
              accent={accent}
            />

            {siblings.length > 0 && (
              <div data-section-transition data-transition="fade" className="mt-12">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                  Nearby cities in {c.stateName}
                </h2>
                <div data-stagger className="mt-4 flex flex-wrap gap-2">
                  {siblings.map((x) => (
                    <Link
                      key={x.slug}
                      href={`/city/${x.slug}`}
                      className="border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--white-55)] transition-colors hover:border-acc hover:text-acc-bright hover:bg-acc-soft"
                    >
                      {x.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Service cross-links for internal linking */}
            <div data-section-transition data-transition="clip-right" className="mt-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                PSARA Services in {c.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-[var(--white-55)]">
                End-to-end PSARA licensing services available for applicants in {c.name}.
              </p>
              <div data-stagger className="mt-4 flex flex-wrap gap-2">
                {SERVICES.slice(0, 12).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--white-55)] transition-colors hover:border-acc hover:text-acc-bright hover:bg-acc-soft"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
              <p className="mt-3 text-xs font-medium text-[var(--white-55)]">
                View all{" "}
                <Link href="/services" className="text-acc-bright underline">
                  PSARA services
                </Link>
                .
              </p>
            </div>

            <CtaBar title={`Consult for ${c.name}`} />
          </div>
          <div id="city-contact" data-clip className="relative overflow-hidden space-y-6 border border-acc bg-acc-soft p-6 lg:col-span-5">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
              style={{ background: `radial-gradient(circle, ${accent.base}1f 0%, transparent 70%)` }}
              aria-hidden
            />
            <div>
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-acc-bright">City Desk</span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white">
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
              isLocalOffice={Boolean(localOffice)}
            />
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
