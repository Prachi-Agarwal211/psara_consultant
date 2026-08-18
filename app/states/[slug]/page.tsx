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
      {/* Stats strip */}
      <section className="border-b border-white/10 bg-[#12161F]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-[var(--gutter)] py-4 text-center text-xs font-black uppercase tracking-wider md:gap-10">
          <div>
            <span className="block text-sm text-white font-black">{s.name}</span>
            <span className="block text-slate-400">State</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-white font-black">{s.capital}</span>
            <span className="block text-slate-400">Capital</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-white font-black">{s.cities.length}</span>
            <span className="block text-slate-400">Cities covered</span>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div>
            <span className="block text-sm text-white font-black">{s.sectors.length}</span>
            <span className="block text-slate-400">Key sectors</span>
          </div>
        </div>
      </section>

      <PageMain className="bg-[#0B0E14] text-white">
        <div style={accentStyle} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <StateDossierView
              state={s}
              content={content}
              accent={accent}
            />

            {cities.length > 0 && (
              <div data-section-transition data-transition="fade" className="mt-12">
                <h2 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Cities we cover in {s.name}
                </h2>
                <div data-stagger className="mt-4 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/city/${c.slug}`}
                      className="rounded-xl border border-white/10 bg-[#12161F] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white transition-all hover:border-[#BF953F] hover:bg-[#8C1F32]"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regulatory Tools & Interlinking — dossier cards */}
            <div data-section-transition data-transition="clip-right" className="mt-12">
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                Statutory Tools for {s.name}
              </h2>
              <div data-stagger className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/calculator" className="group rounded-2xl border border-white/10 bg-[#12161F] p-4 shadow-md transition-all hover:border-[#BF953F]">
                  <span className="block text-xs font-black text-white">{s.name} Fee Calculator</span>
                  <span className="mt-1 block text-[11px] font-medium text-slate-400">Estimate 1 district, 5 districts or state fees</span>
                </Link>
                <Link href="/emergency" className="group rounded-2xl border-2 border-[#BF953F] bg-[#12161F] p-4 shadow-md transition-all hover:border-[#8C1F32]">
                  <span className="block text-xs font-black text-[#BF953F] group-hover:text-white">Notice &amp; Expiry Emergency Desk</span>
                  <span className="mt-1 block text-[11px] font-bold text-slate-300">Urgent Controlling Authority notice response</span>
                </Link>
                <Link href="/case-studies" className="group rounded-2xl border border-white/10 bg-[#12161F] p-4 shadow-md transition-all hover:border-[#BF953F]">
                  <span className="block text-xs font-black text-white">Licensing Case Studies</span>
                  <span className="mt-1 block text-[11px] font-medium text-slate-400">Proven security clearance success stories</span>
                </Link>
                <Link href="/industries" className="group rounded-2xl border border-white/10 bg-[#12161F] p-4 shadow-md transition-all hover:border-[#BF953F]">
                  <span className="block text-xs font-black text-white">Industry PSARA Compliance</span>
                  <span className="mt-1 block text-[11px] font-medium text-slate-400">Manufacturing, Tech Parks &amp; Hospital rules</span>
                </Link>
              </div>
            </div>

            {/* Service cross-links */}
            <div data-section-transition data-transition="fade" className="mt-12">
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                PSARA Services in {s.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-300">
                Complete PSARA licensing services for agencies operating in {s.name}.
              </p>
              <div data-stagger className="mt-4 flex flex-wrap gap-2">
                {SERVICES.slice(0, 12).map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="rounded-xl border border-white/10 bg-[#12161F] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white transition-all hover:border-[#BF953F] hover:bg-[#8C1F32]"
                  >
                    {svc.title}
                  </Link>
                ))}
              </div>
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

          <div id="state-enquiry" data-clip className="relative overflow-hidden rounded-3xl border-2 border-[#C89B3C]/40 bg-[#0A233F] text-white p-6 md:p-8 lg:col-span-5 shadow-2xl">
            <span className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-[#C89B3C]">State Desk</span>
            <h3 className="mt-2 text-xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
              {s.name} enquiry
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-300">
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
