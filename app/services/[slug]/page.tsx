import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "../../../data/services";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
import CtaBar from "../../../components/CtaBar";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import { faqJsonLd } from "../../../lib/seo-content";
import { SITE } from "../../../lib/config";

import ServiceDossierView from "../../components/sections/ServiceDossierView";

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services/${s.slug}#service`,
    name: s.title,
    description: s.description,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    serviceType: s.title,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
      },
    },
    audience: {
      "@type": "Audience",
      audienceType: "Security Agencies",
    },
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      {s.faqs.length > 0 && <JsonLd data={faqJsonLd(s.faqs)} />}
      <PageHero
        title={s.title}
        lead={s.short}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <ServiceDossierView service={s} />
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
