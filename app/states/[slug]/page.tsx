import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STATES, getState } from "../../../data/states";
import { citiesInState } from "../../../data/cities";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
import CtaBar from "../../../components/CtaBar";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import {
  generateStateContent,
  localBusinessJsonLd,
  faqJsonLd,
} from "../../../lib/seo-content";
import { getOfficesForState, SITE } from "../../../lib/config";

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

  return (
    <>
      <JsonLd
        data={localBusinessJsonLd({
          name: `${SITE.name} — ${s.name}`,
          description: content.metaDescription,
          url: `${SITE.url}/states/${s.slug}`,
          city: s.capital,
          state: s.name,
        })}
      />
      <JsonLd data={faqJsonLd(content.faqs)} />
      <PageHero
        eyebrow={s.name}
        title={`PSARA License in ${s.name}`}
        lead={content.metaDescription}
        crumbs={[{ label: "States", href: "/states" }, { label: s.name }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Prose>
              {content.intro.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}

              <h2>Controlling Authority & rules</h2>
              {content.authorityBlock.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
              <p>
                <strong>Rules framework:</strong> {s.rulesNote}
              </p>
              <p>
                <strong>Application mode:</strong> {s.applicationMode}
              </p>
              <p>
                <strong>Indicative validity:</strong> {s.validityYears} year
                {s.validityYears > 1 ? "s" : ""} (verify latest notification)
              </p>

              <h2>{content.processHeading}</h2>
              <ul>
                {content.process.map((st) => (
                  <li key={st}>{st}</li>
                ))}
              </ul>

              <h2>{content.documentsHeading}</h2>
              <ul>
                {content.documents.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <h2>{content.feesHeading}</h2>
              {content.fees.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <ul>
                <li>{s.feeOneDistrict}</li>
                <li>{s.feeMultiDistrict}</li>
                <li>{s.feeEntireState}</li>
              </ul>

              <h2>{content.trainingHeading}</h2>
              {content.training.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}

              <h2>{content.marketHeading}</h2>
              {content.market.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {s.sectors.length > 0 && (
                <ul>
                  {s.sectors.map((sec) => (
                    <li key={sec}>{sec}</li>
                  ))}
                </ul>
              )}

              <h2>{content.rejectionHeading}</h2>
              <ul>
                {content.rejections.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>

              <h2>{content.whyHeading}</h2>
              <ul>
                {content.whyPoints.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>

              <h2>FAQs — PSARA in {s.name}</h2>
              {content.faqs.map((f) => (
                <div key={f.q}>
                  <p>
                    <strong>{f.q}</strong>
                  </p>
                  <p>{f.a}</p>
                </div>
              ))}

              <p>{content.closingCta}</p>
              <p className="text-sm opacity-80">
                Disclaimer: Fees, timelines, and document lists are indicative and
                subject to State notifications. Confirm with the Controlling
                Authority before filing.
              </p>
            </Prose>

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

            {offices.length > 0 && (
              <div className="mt-10 border border-[var(--line-gold)] p-5">
                <p className="label-meta font-bold text-[var(--gold)]">
                  Our desk for this region
                </p>
                {offices.map((o) => (
                  <div key={o.city} className="mt-3">
                    <p className="font-bold text-[var(--cream)]">{o.placeName}</p>
                    <p className="text-sm font-semibold text-[var(--cream-dim)]">
                      {o.address}, {o.pin}
                    </p>
                    <a
                      href={o.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[var(--gold-soft)] underline"
                    >
                      Google Maps
                    </a>
                  </div>
                ))}
              </div>
            )}

            <CtaBar title={`Apply for PSARA in ${s.name}`} />
          </div>
          <div className="folio p-6 lg:col-span-5">
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
