import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity, citiesInState } from "../../../data/cities";
import { getState } from "../../../data/states";
import { SERVICES } from "../../../data/services";
import { PageHero, PageMain } from "../../../components/PageShell";
import { GlassCard, Section } from "../../../components/v3/PagePrimitives";
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
      <section className="v3-location-strip border-b border-white/15 bg-[#0B1E3B]" style={accentStyle}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 px-[var(--gutter)] py-4 text-center text-xs font-bold uppercase tracking-wider md:gap-10">
          <div>
            <span className="block text-sm text-acc-bright">{c.name}</span>
            <span className="block text-[var(--white-55)]">City</span>
          </div>
          <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">{c.stateName}</span>
            <span className="block text-[var(--white-55)]">State</span>
          </div>
          <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">Tier {c.tier}</span>
            <span className="block text-[var(--white-55)]">Market tier</span>
          </div>
          <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">{c.economyTags.length}</span>
            <span className="block text-[var(--white-55)]">Key sectors</span>
          </div>
        </div>
      </section>

      <PageMain>
        <div style={accentStyle} className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8 space-y-12">
            <CityDossierView
              city={c}
              state={state}
              content={content}
              accent={accent}
            />

            {siblings.length > 0 && (
              <Section className="space-y-5">
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white">
                  Nearby cities in {c.stateName}
                </h2>
                <div data-stagger className="mt-4 flex flex-wrap gap-2">
                  {siblings.map((x) => (
                    <Link
                      key={x.slug}
                      href={`/city/${x.slug}`}
                      className="v3-directory-link inline-flex max-w-full items-center rounded-full border border-white/20 px-4 py-2.5 text-sm text-white transition-colors hover:border-[#FFB25E] hover:text-[#FFB25E]"
                    >
                      {x.name}
                    </Link>
                  ))}
                </div>
              </Section>
            )}

            {/* Service cross-links for internal linking */}
            <Section className="space-y-5">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white">
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
                    className="v3-directory-link inline-flex max-w-full items-center rounded-full border border-white/20 px-4 py-2.5 text-sm text-white transition-colors hover:border-[#FFB25E] hover:text-[#FFB25E]"
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
            </Section>

            <CtaBar title={`Consult for ${c.name}`} />
          </div>
          <aside id="city-contact" className="min-w-0 scroll-mt-28 space-y-8 lg:col-span-4">
            <GlassCard className="relative p-6 sm:p-8">
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
            </GlassCard>

            <GbpOfficeSection
              placeLabel={c.name}
              offices={getOfficesForCityPage(c.slug, c.stateSlug)}
              isLocalOffice={Boolean(localOffice)}
            />
          </aside>
        </div>
      </PageMain>
    </StageShell>
  );
}
