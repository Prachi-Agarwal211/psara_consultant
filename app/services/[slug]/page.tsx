import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "../../../data/services";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
import CtaBar from "../../../components/CtaBar";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import { faqJsonLd } from "../../../lib/seo-content";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta(s.title, s.description, `/services/${slug}`, s.keywords);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      {s.faqs.length > 0 && <JsonLd data={faqJsonLd(s.faqs)} />}
      <PageHero
        eyebrow="Service"
        title={s.title}
        lead={s.short}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Prose>
              <p>{s.description}</p>
              {s.sections.map((sec) => (
                <div key={sec.h}>
                  <h2>{sec.h}</h2>
                  <p>{sec.p}</p>
                </div>
              ))}
              <h2>What is included</h2>
              <ul>
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <h2>Process</h2>
              <ul>
                {s.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <h2>Who this is for</h2>
              <ul>
                {s.whoFor.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              {s.faqs.length > 0 && (
                <>
                  <h2>Service FAQs</h2>
                  {s.faqs.map((f) => (
                    <div key={f.q}>
                      <p>
                        <strong>{f.q}</strong>
                      </p>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </>
              )}
            </Prose>
            <CtaBar title={`Enquire about ${s.title}`} />
          </div>
          <div className="folio p-6 lg:col-span-5">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]">
              Request this service
            </h3>
            <div className="mt-4">
              <WhatsAppForm formType="Service Enquiry" service={s.title} />
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
