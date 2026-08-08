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
  }

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
      <PageMain className="bg-[#FFFEF9] text-[#0F3C65]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main content column */}
          <div className="space-y-12 lg:col-span-7" data-stagger>
            <Prose>
              <p className="text-base md:text-lg font-medium leading-relaxed text-[#334E68]">{s.description}</p>
            </Prose>

            {/* Bullets */}
            <div data-section-transition data-transition="clip-up" className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.24em] text-[#C89B3C]">Key Deliverables</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.bullets.map((b) => (
                  <div key={b} className="group flex items-start gap-3 rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-4 shadow-sm transition-all hover:border-[#C89B3C] hover:bg-white">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#C89B3C]" />
                    <span className="text-xs font-black leading-normal text-[#0F3C65]">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sections */}
            {s.sections.map((sec, i) => (
              <div key={sec.h} data-section-transition data-transition={i % 2 ? "clip-left" : "fade"} className="border-t border-[#0F3C65]/15 pt-8">
                <h2 className="text-xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>{sec.h}</h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[#334E68]">{sec.p}</p>
              </div>
            ))}

            {/* Process Timeline */}
            <div data-section-transition data-transition="clip-right" className="border-t border-[#0F3C65]/15 pt-8">
              <h2 className="text-xl font-black text-[#0F3C65] mb-6" style={{ fontFamily: "var(--font-display)" }}>Engagement Roadmap</h2>
              <div className="space-y-4">
                {s.process.map((step, idx) => (
                  <div key={step} className="group flex items-start gap-4 rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-4 shadow-sm transition-all hover:border-[#C89B3C] hover:bg-white">
                    <span className="shrink-0 rounded-xl bg-[#FFF2BA] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#0F3C65]">
                      Phase {idx + 1}
                    </span>
                    <p className="pt-0.5 text-sm font-medium text-[#334E68]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {s.faqs.length > 0 && (
              <div data-section-transition data-transition="blur" className="border-t border-[#0F3C65]/15 pt-8">
                <h2 className="text-xl font-black text-[#0F3C65] mb-6" style={{ fontFamily: "var(--font-display)" }}>Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {s.faqs.map((f) => (
                    <div key={f.q} className="rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-5 shadow-sm transition-all hover:border-[#C89B3C]">
                      <p className="text-sm font-black text-[#0F3C65]">{f.q}</p>
                      <p className="mt-2 text-xs font-medium leading-relaxed text-[#334E68]">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inner Page Interlinking Shortcuts */}
            <div data-section-transition data-transition="fade" className="space-y-4 border-t border-[#0F3C65]/15 pt-8">
              <h2 className="text-xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
                Regulatory Advisory &amp; Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/calculator" className="group rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-4 shadow-sm transition-all hover:border-[#C89B3C] hover:bg-white">
                  <span className="block text-xs font-black text-[#0F3C65]">Fee &amp; Timeline Calculator</span>
                  <span className="mt-1 block text-[11px] font-medium text-[#486581]">Estimate statutory government fees by state &amp; districts</span>
                </Link>
                <Link href="/emergency" className="group rounded-2xl border-2 border-[#C89B3C] bg-[#FFF2BA] p-4 shadow-sm transition-all hover:bg-[#C89B3C]">
                  <span className="block text-xs font-black text-[#0F3C65] group-hover:text-white">24/7 Emergency Desk</span>
                  <span className="mt-1 block text-[11px] font-bold text-[#0F3C65]/80 group-hover:text-white/90">Urgent renewal refiling &amp; inspection notice response</span>
                </Link>
                <Link href="/certification" className="group rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-4 shadow-sm transition-all hover:border-[#C89B3C] hover:bg-white">
                  <span className="block text-xs font-black text-[#0F3C65]">ISO &amp; MSME Credentials</span>
                  <span className="mt-1 block text-[11px] font-medium text-[#486581]">ISO 9001/27001 and Startup India accreditation</span>
                </Link>
                <Link href="/states" className="group rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-4 shadow-sm transition-all hover:border-[#C89B3C] hover:bg-white">
                  <span className="block text-xs font-black text-[#0F3C65]">Pan-India State Desks</span>
                  <span className="mt-1 block text-[11px] font-medium text-[#486581]">Explore Controlling Authority rules for 36 States &amp; UTs</span>
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/services" className="inline-flex items-center gap-2 text-xs font-black text-[#0F3C65] hover:text-[#C89B3C]">
                &larr; Return to Services Directory
              </Link>
            </div>
          </div>

          {/* Sticky Consultation Sidebar */}
          <div className="lg:col-span-5" data-clip>
            <div className="sticky top-24 rounded-3xl border-2 border-[#C89B3C]/40 bg-[#0A233F] text-white p-6 md:p-8 shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C]">Instant Consultation</span>
              <h3 className="mt-2 text-xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                Request {s.title}
              </h3>
              <p className="mt-2 text-xs text-slate-300 font-medium">
                Fill details below for a statutory compliance evaluation and fast dossier filing.
              </p>
              <div className="mt-6">
                <WhatsAppForm formType="Service Enquiry" service={s.title} />
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <a
                  href={DEFAULT_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FFF2BA] hover:text-[#C89B3C]"
                >
                  Direct WhatsApp Helpdesk &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
