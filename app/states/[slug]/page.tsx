import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATES, getState } from "../../../data/states";
import { citiesInState } from "../../../data/cities";
import { SERVICES } from "../../../data/services";
import { PageHero, PageMain } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
import CtaBar from "../../../components/CtaBar";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import {
  generateStateContent,
  stateOrganizationJsonLd,
  faqJsonLd,
  howToJsonLd,
} from "../../../lib/seo-content";
import { getOfficesForStatePage, SITE } from "../../../lib/config";
import GbpOfficeSection from "../../components/sections/GbpOfficeSection";
import StateDossierView from "../../components/sections/StateDossierView";
import { getLocationAccent, accentStyleVars, stateHeroImage } from "../../lib/location-accent";

export function generateStaticParams() {
  return STATES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getState(slug);
  if (!s) return {};
  const content = generateStateContent(s);
  return pageMeta(
    `PSARA License in ${s.titleShort ?? s.name}`,
    content.metaDescription,
    `/states/${slug}`,
    [
      `PSARA License ${s.name}`,
      `security agency license ${s.capital}`,
      `PSARA consultant ${s.name}`,
    ]
  );
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getState(slug);
  if (!s) notFound();

  const content = generateStateContent(s);
  const cities = citiesInState(s.slug);
  const statePageOffices = getOfficesForStatePage(s.slug);
  const accent = getLocationAccent(s.slug);
  const heroImage = stateHeroImage(s.slug);
  const accentStyle = accentStyleVars(accent) as CSSProperties;

  return (
    <StageShell>
      {/* BreadcrumbList handled by DynamicBreadcrumbSchema (client) */}
      <JsonLd
        data={stateOrganizationJsonLd({
          name: `${SITE.name} — ${s.name}`,
          description: content.metaDescription,
          url: `${SITE.url}/states/${s.slug}`,
          state: s.name,
        })}
      />
      <JsonLd data={faqJsonLd(content.faqs)} />
      <JsonLd data={howToJsonLd(`How to get PSARA License in ${s.name}`, content.metaDescription, content.process)} />
      <PageHero
        title={`PSARA License in ${s.name}`}
        lead={content.metaDescription}
        crumbs={[{ label: "States", href: "/states" }, { label: s.name }]}
        locationSlug={s.slug}
        image={heroImage}
        meta={`( PSARA CONSULTANCY ) ( ${s.capital} )`}
      />
      {/* Stats strip — accent-tinted */}
      <section className="border-b border-white/10" style={accentStyle}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-[var(--gutter)] py-4 text-center text-xs font-bold uppercase tracking-wider md:gap-10">
          <div>
            <span className="block text-sm text-acc-bright">{s.name}</span>
            <span className="block text-[var(--white-55)]">State</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">{s.capital}</span>
            <span className="block text-[var(--white-55)]">Capital</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">{s.cities.length}</span>
            <span className="block text-[var(--white-55)]">Cities covered</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-acc-bright">{s.sectors.length}</span>
            <span className="block text-[var(--white-55)]">Key sectors</span>
          </div>
        </div>
      </section>

      <PageMain>
        <div style={accentStyle} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <StateDossierView
              state={s}
              content={content}
              accent={accent}
            />

            {cities.length > 0 && (
              <div data-section-transition data-transition="fade" className="mt-12">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                  Cities we cover in {s.name}
                </h2>
                <div data-stagger className="mt-4 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/city/${c.slug}`}
                      className="border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--white-55)] transition-colors hover:border-acc hover:text-acc-bright hover:bg-acc-soft"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regulatory Tools & Interlinking — dossier cards */}
            <div data-section-transition data-transition="clip-right" className="mt-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                Statutory Tools for {s.name}
              </h2>
              <div data-stagger className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/calculator" className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc ">
                  <span className="absolute right-3 top-2 font-mono text-2xl font-bold text-acc opacity-[0.14]">₹</span>
                  <span className="block text-xs font-bold text-white">{s.name} Fee Calculator</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">Estimate 1 district, 5 districts or state fees</span>
                </Link>
                <Link href="/emergency" className="group relative overflow-hidden border border-acc bg-acc-soft p-4 transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:bg-acc-strong">
                  <span className="absolute right-3 top-2 font-mono text-2xl font-bold text-acc opacity-[0.2]">24/7</span>
                  <span className="block text-xs font-bold text-acc-bright">Notice &amp; Expiry Emergency Desk</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">Urgent Controlling Authority notice response</span>
                </Link>
                <Link href="/case-studies" className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc ">
                  <span className="absolute right-3 top-2 font-mono text-2xl font-bold text-acc opacity-[0.14]">OK</span>
                  <span className="block text-xs font-bold text-white">Licensing Case Studies</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">Proven security clearance success stories</span>
                </Link>
                <Link href="/industries" className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc ">
                  <span className="absolute right-3 top-2 font-mono text-2xl font-bold text-acc opacity-[0.14]">II</span>
                  <span className="block text-xs font-bold text-white">Industry PSARA Compliance</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">Manufacturing, Tech Parks &amp; Hospital rules</span>
                </Link>
              </div>
            </div>

            {/* Service cross-links for internal linking */}
            <div data-section-transition data-transition="fade" className="mt-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                PSARA Services in {s.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-[var(--white-55)]">
                Complete PSARA licensing services for agencies operating in {s.name}.
              </p>
              <div data-stagger className="mt-4 flex flex-wrap gap-2">
                {SERVICES.slice(0, 12).map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--white-55)] transition-colors hover:border-acc hover:text-acc-bright hover:bg-acc-soft"
                  >
                    {svc.title}
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

            {statePageOffices.length > 0 && (
              <GbpOfficeSection
                placeLabel={s.name}
                offices={statePageOffices}
                isLocalOffice={['rajasthan', 'delhi', 'haryana', 'uttar-pradesh', 'gujarat', 'madhya-pradesh', 'chhattisgarh', 'punjab'].includes(s.slug)}
              />
            )}

            <CtaBar title={`Apply for PSARA in ${s.name}`} />
          </div>
          <div id="state-enquiry" data-clip className="relative overflow-hidden border border-acc bg-acc-soft p-6 lg:col-span-5">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
              style={{ background: `radial-gradient(circle, ${accent.base}1f 0%, transparent 70%)` }}
              aria-hidden
            />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-acc-bright">State Desk</span>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white">
              {s.name} enquiry
            </h3>
            <p className="mt-2 text-sm font-medium text-[var(--white-55)]">
              WhatsApp form — pre-fills a message to our consultants.
            </p>
            <div className="mt-4">
              <WhatsAppForm formType="State Page Enquiry" state={s.name} />
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
