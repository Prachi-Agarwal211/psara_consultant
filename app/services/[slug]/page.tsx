import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "../../../data/services";
import { PageHero, PageMain, Prose } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
import WhatsAppForm from "../../../components/WhatsAppForm";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import { faqJsonLd } from "../../../lib/seo-content";
import { SITE } from "../../../lib/config";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { hubHeroImage } from "../../lib/location-accent";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, Sparkles, Clock, Calculator } from "lucide-react";

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
      <PageMain className="bg-[#050714] text-white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content Column */}
          <div className="space-y-12 lg:col-span-7">
            {/* Overview Card */}
            <div className="rounded-3xl border border-[rgba(200,155,60,0.3)] bg-gradient-to-b from-[#0E1B33] via-[#0A1428] to-[#050714] p-6 sm:p-8 shadow-2xl">
              <span className="badge-metallic-gold mb-4">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" /> Service Overview
              </span>
              <p className="text-base sm:text-lg font-normal leading-relaxed text-[#E2E8F0] mt-2">
                {s.description}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" /> Core Deliverables &amp; Outcomes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {s.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0E1B33] to-[#081020] p-4 shadow-md transition-all hover:border-[#D4AF37]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span className="text-xs sm:text-sm font-bold text-white leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Sections */}
            {s.sections.map((sec, i) => (
              <div key={sec.h} className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0E1B33] to-[#081020] p-6 shadow-md space-y-3">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{sec.h}</h3>
                <p className="text-sm font-normal leading-relaxed text-[#E2E8F0]">{sec.p}</p>
              </div>
            ))}

            {/* Engagement Roadmap */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <Clock className="h-5 w-5 text-[#D4AF37]" /> Engagement Roadmap
              </h2>
              <div className="space-y-3">
                {s.process.map((step, idx) => (
                  <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0E1B33] to-[#081020] p-4 shadow-md transition-all hover:border-[#D4AF37]">
                    <span className="badge-metallic-gold shrink-0 text-[10px]">
                      Phase {idx + 1}
                    </span>
                    <p className="pt-0.5 text-sm font-normal text-[#E2E8F0]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {s.faqs.length > 0 && (
              <div className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Frequently Asked Questions</h2>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {s.faqs.map((f, idx) => (
                    <details key={idx} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-white hover:text-[#F5D061] text-sm sm:text-base">
                        <span>{f.q}</span>
                        <span className="text-[#D4AF37] text-sm transition-transform group-open:rotate-180">↓</span>
                      </summary>
                      <p className="mt-2.5 text-xs sm:text-sm font-normal leading-relaxed text-[#E2E8F0]">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-Link Shortcuts */}
            <div className="space-y-4 border-t border-white/10 pt-8">
              <h3 className="text-lg font-bold text-white">Related Statutory Desks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/calculator" className="p-4 rounded-xl border border-white/10 bg-[#0A1224] hover:border-[#D4AF37] transition-all flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Statutory Fee Calculator</span>
                    <span className="text-[11px] text-[#94A3B8]">Calculate state and district fees</span>
                  </div>
                  <Calculator className="h-4 w-4 text-[#D4AF37]" />
                </Link>
                <Link href="/states" className="p-4 rounded-xl border border-white/10 bg-[#0A1224] hover:border-[#D4AF37] transition-all flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">All 28 State Dossiers</span>
                    <span className="text-[11px] text-[#94A3B8]">Controlling Authority portals &amp; rules</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#D4AF37]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Lead Capture Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 rounded-3xl border border-[rgba(200,155,60,0.35)] bg-gradient-to-b from-[#0E1B33] to-[#060B18] p-6 sm:p-8 shadow-2xl text-white space-y-6">
              <div>
                <span className="badge-metallic-gold mb-2">
                  Direct Statutory Desk
                </span>
                <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
                  Enquire for {s.title}
                </h3>
                <p className="mt-2 text-xs text-[#E2E8F0] font-normal leading-relaxed">
                  Connect directly with our legal licensing officers for document auditing, training MOU alignment, and official filing.
                </p>
              </div>

              {/* Sidebar Lead Form */}
              <div className="rounded-2xl bg-[#060B18] p-4 border border-white/10 shadow-inner">
                <WhatsAppForm formType={`Service: ${s.title}`} service={s.title} />
              </div>

              {/* Direct WhatsApp Action */}
              <a
                href={`${DEFAULT_WA}&text=Hi,%20I%20am%20enquiring%20about%20${encodeURIComponent(s.title)}.%20Please%20guide%20me%20with%20the%20process.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Instant WhatsApp Consultation</span>
              </a>

              <p className="text-[11px] text-center text-[#94A3B8]">
                Confidential • Controlling Authority Compliant • Pan-India Desks
              </p>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
