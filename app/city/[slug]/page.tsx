import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity, citiesInState } from "../../../data/cities";
import { getState } from "../../../data/states";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
import CtaBar from "../../../components/CtaBar";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import {
  generateCityContent,
  localBusinessJsonLd,
  faqJsonLd,
} from "../../../lib/seo-content";
import { SITE } from "../../../lib/config";

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

  return (
    <>
      <JsonLd
        data={localBusinessJsonLd({
          name: `${SITE.name} — ${c.name}`,
          description: content.metaDescription,
          url: `${SITE.url}/city/${c.slug}`,
          city: c.name,
          state: c.stateName,
        })}
      />
      <JsonLd data={faqJsonLd(content.faqs)} />
      <PageHero
        eyebrow={c.stateName}
        title={`PSARA License in ${c.name}`}
        lead={content.metaDescription}
        crumbs={[
          { label: "Cities", href: "/cities" },
          { label: c.name },
        ]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Prose>
              {content.intro.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}

              <h2>State framework for {c.name}</h2>
              {content.authorityBlock.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
              {state && (
                <p>
                  Read the full State guide:{" "}
                  <Link
                    href={`/states/${state.slug}`}
                    className="text-[var(--gold-soft)] underline"
                  >
                    PSARA License in {state.name}
                  </Link>
                  .
                </p>
              )}

              <h2>{content.marketHeading}</h2>
              {content.market.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {c.economyTags.length > 0 && (
                <ul>
                  {c.economyTags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}

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

              <h2>{content.trainingHeading}</h2>
              {content.training.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}

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

              <h2>FAQs — PSARA in {c.name}</h2>
              {content.faqs.map((f) => (
                <div key={f.q}>
                  <p>
                    <strong>{f.q}</strong>
                  </p>
                  <p>{f.a}</p>
                </div>
              ))}

              <p>{content.closingCta}</p>
            </Prose>

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

            <CtaBar title={`Consult for ${c.name}`} />
          </div>
          <div className="folio p-6 lg:col-span-5">
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
        </div>
      </PageMain>
    </>
  );
}
