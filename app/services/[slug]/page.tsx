import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "../../../data/services";
import { PageHero, PageMain } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import { faqJsonLd } from "../../../lib/seo-content";
import { SITE } from "../../../lib/config";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";
import { hubHeroImage } from "../../lib/location-accent";
import Link from "next/link";
import { CheckCircle2, ArrowRight, MessageSquare, Calculator } from "lucide-react";
import { Section, GlassCard, FAQ } from "../../../components/v3/PagePrimitives";

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

  const heroImage = hubHeroImage(s.slug);

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
  };

  return (
    <StageShell>
      <JsonLd data={serviceSchema} />
      {s.faqs.length > 0 && <JsonLd data={faqJsonLd(s.faqs)} />}
      <PageHero
        title={s.title}
        lead={s.short}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]}
        locationSlug={s.slug}
        image={heroImage}
        meta={`( STATUTORY ADVISORY ) ( ${s.slug.toUpperCase()} )`}
      />
      <PageMain>
        <div className="grid min-w-0 grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 space-y-16 lg:col-span-7">
            <Section className="v3-reading-section">
              <h2 className="mb-5">Service Overview</h2>
              <p className="max-w-[68ch] text-lg leading-relaxed">{s.description}</p>
            </Section>

            <Section>
              <h2 className="mb-6">Core Deliverables &amp; Outcomes</h2>
              <ul className="divide-y divide-white/15 border-y border-white/15">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-4 py-5">
                    <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#FFB547]" />
                    <span className="text-base leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {s.sections.map((sec) => (
              <Section key={sec.h} className="v3-reading-section border-t border-white/15 pt-10">
                <h2 className="mb-5">{sec.h}</h2>
                <p className="max-w-[68ch] text-base leading-relaxed">{sec.p}</p>
              </Section>
            ))}

            <Section>
              <h2 className="mb-6">Engagement Roadmap</h2>
              <ol className="v3-steps divide-y divide-white/15 border-y border-white/15">
                {s.process.map((step, idx) => (
                  <li key={step} className="grid grid-cols-[4.5rem_1fr] gap-3 py-6 sm:gap-6">
                    <span className="text-sm text-[#FFB547]">Phase {idx + 1}</span>
                    <p className="text-base leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </Section>

            {s.faqs.length > 0 && <FAQ items={s.faqs} title="Frequently Asked Questions" />}

            <Section className="border-t border-white/15 pt-10">
              <h2 className="mb-6">Related Statutory Desks</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Link href="/calculator" className="group flex items-center justify-between gap-4 border-b border-white/15 py-4">
                  <div><span className="block font-medium">Statutory Fee Calculator</span><span className="mt-1 block text-sm text-[#B9C2D3]">Calculate state and district fees</span></div>
                  <Calculator aria-hidden="true" className="h-5 w-5 shrink-0 text-[#FFB547]" />
                </Link>
                <Link href="/states" className="group flex items-center justify-between gap-4 border-b border-white/15 py-4">
                  <div><span className="block font-medium">All 36 State &amp; UT Dossiers</span><span className="mt-1 block text-sm text-[#B9C2D3]">Controlling Authority portals &amp; rules</span></div>
                  <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[#FFB547]" />
                </Link>
              </div>
            </Section>
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <GlassCard className="space-y-7 p-6 sm:p-8 lg:sticky lg:top-28">
              <div>
                <h2>Enquire for {s.title}</h2>
                <p className="mt-4 text-sm text-[#FFB547]">Direct Statutory Desk</p>
                <p className="mt-4 text-base leading-relaxed text-[#B9C2D3]">Connect directly with our legal licensing officers for document auditing, training MOU alignment, and official filing.</p>
              </div>
              <WhatsAppForm formType={`Service: ${s.title}`} service={s.title} />
              <a
                href={buildWhatsAppUrl(`Hi, I am enquiring about ${s.title}. Please guide me with the process.`)}
                target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full"
              >
                <MessageSquare aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>Instant WhatsApp Consultation</span>
              </a>
              <p className="text-center text-xs leading-relaxed text-[#B9C2D3]">Confidential • Controlling Authority Compliant • Pan-India Desks</p>
            </GlassCard>
          </aside>
        </div>
      </PageMain>
    </StageShell>
  );
}
