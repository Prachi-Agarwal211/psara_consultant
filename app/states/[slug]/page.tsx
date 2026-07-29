import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATES, getState } from "../../../data/states";
import { citiesInState } from "../../../data/cities";
import { SERVICES } from "../../../data/services";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
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
import { getOfficesForState, getOfficesForStatePage, SITE } from "../../../lib/config";
import GbpOfficeSection from "../../components/sections/GbpOfficeSection";
import StateDossierView from "../../components/sections/StateDossierView";

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
    `PSARA License in ${s.name}`,
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
  const offices = getOfficesForState(s.slug);
  const statePageOffices = getOfficesForStatePage(s.slug);

  return (
    <>
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
      />
      {/* Stats strip */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-[var(--gutter)] py-4 text-center text-xs font-bold uppercase tracking-wider md:gap-10">
          <div>
            <span className="block text-sm text-[var(--gold)]">{s.name}</span>
            <span className="block text-[var(--cream-dim)]">State</span>
          </div>
          <div className="h-8 w-px bg-[var(--line)]" aria-hidden />
          <div>
            <span className="block text-sm text-[var(--gold)]">{s.capital}</span>
            <span className="block text-[var(--cream-dim)]">Capital</span>
          </div>
          <div className="h-8 w-px bg-[var(--line)]" aria-hidden />
          <div>
            <span className="block text-sm text-[var(--gold)]">{s.cities.length}</span>
            <span className="block text-[var(--cream-dim)]">Cities covered</span>
          </div>
          <div className="h-8 w-px bg-[var(--line)]" aria-hidden />
          <div>
            <span className="block text-sm text-[var(--gold)]">{s.sectors.length}</span>
            <span className="block text-[var(--cream-dim)]">Key sectors</span>
          </div>
        </div>
      </section>

      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <StateDossierView
              state={s}
              content={content}
              cities={cities}
              offices={offices}
            />

            {cities.length > 0 && (
              <div className="mt-12">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream)]">
                  Cities we cover in {s.name}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/city/${c.slug}`}
                      className="border border-[var(--line)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--cream-dim)] hover:border-[var(--gold)] hover:text-[var(--gold-soft)]"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Service cross-links for internal linking */}
            <div className="mt-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream)]">
                PSARA Services in {s.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-[var(--cream-dim)]">
                Complete PSARA licensing services for agencies operating in {s.name}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICES.slice(0, 12).map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="border border-[var(--line)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--cream-dim)] hover:border-[var(--gold)] hover:text-[var(--gold-soft)]"
                  >
                    {svc.title}
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

            {statePageOffices.length > 0 && (
              <GbpOfficeSection
                placeLabel={s.name}
                offices={statePageOffices}
                isLocalOffice={['rajasthan', 'delhi', 'haryana', 'uttar-pradesh', 'gujarat', 'madhya-pradesh', 'chhattisgarh', 'punjab'].includes(s.slug)}
              />
            )}

            <CtaBar title={`Apply for PSARA in ${s.name}`} />
          </div>
          <div id="state-enquiry" className="folio p-6 lg:col-span-5">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]">
              {s.name} enquiry
            </h3>
            <p className="mt-2 text-sm font-medium text-[var(--cream-dim)]">
              WhatsApp form — pre-fills a message to our consultants.
            </p>
            <div className="mt-4">
              <WhatsAppForm formType="State Page Enquiry" state={s.name} />
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
