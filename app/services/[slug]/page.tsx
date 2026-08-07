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
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main content column */}
          <div className="space-y-12 lg:col-span-7" data-stagger>
            <Prose>
              <p className="text-base md:text-lg leading-relaxed text-[var(--white-70)]">{s.description}</p>
            </Prose>

            {/* Bullets */}
            <div data-section-transition data-transition="clip-up" className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-acc-bright">Key Deliverables</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.bullets.map((b) => (
                  <div key={b} className="group flex items-start gap-3 rounded border border-white/10 bg-white/[0.02] p-3.5 transition-[color,border-color,background-color] duration-300 hover:border-acc hover:bg-acc-soft">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acc-bright" />
                    <span className="text-xs font-medium leading-normal text-white">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sections */}
            {s.sections.map((sec, i) => (
              <div key={sec.h} data-section-transition data-transition={i % 2 ? "clip-left" : "fade"} className="border-t border-white/10 pt-8">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{sec.h}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--white-55)]">{sec.p}</p>
              </div>
            ))}

            {/* Process Timeline */}
            <div data-section-transition data-transition="clip-right" className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Engagement Roadmap</h2>
              <div className="space-y-4">
                {s.process.map((step, idx) => (
                  <div key={step} className="group flex items-start gap-4 rounded border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:border-acc hover:bg-acc-soft">
                    <span className="shrink-0 rounded bg-acc-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-acc-bright">
                      Phase {idx + 1}
                    </span>
                    <p className="pt-0.5 text-sm text-[var(--white-70)]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {s.faqs.length > 0 && (
              <div data-section-transition data-transition="blur" className="border-t border-white/10 pt-8">
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {s.faqs.map((f) => (
                    <div key={f.q} className="rounded border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-acc">
                      <p className="text-sm font-bold text-white">{f.q}</p>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--white-55)]">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inner Page Interlinking Shortcuts */}
            <div data-section-transition data-transition="fade" className="space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Regulatory Advisory &amp; Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/calculator" className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 rounded transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc ">
                  <span className="block text-xs font-bold text-white">Fee &amp; Timeline Calculator</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">Estimate statutory government fees by state &amp; districts</span>
                </Link>
                <Link href="/emergency" className="group relative overflow-hidden border border-acc bg-acc-soft p-4 rounded transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:bg-acc-strong">
                  <span className="block text-xs font-bold text-acc-bright">24/7 Emergency Desk</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">Urgent renewal refiling &amp; inspection notice response</span>
                </Link>
                <Link href="/certification" className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 rounded transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc ">
                  <span className="block text-xs font-bold text-white">ISO &amp; MSME Credentials</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">ISO 9001/27001 and Startup India accreditation</span>
                </Link>
                <Link href="/states" className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 rounded transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc ">
                  <span className="block text-xs font-bold text-white">Pan-India State Desks</span>
                  <span className="mt-1 block text-[11px] text-[var(--white-55)]">Explore Controlling Authority rules for 36 States &amp; UTs</span>
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/services" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold-bright)]">
                ← Return to Services Directory
              </Link>
            </div>
          </div>

          {/* Sticky Consultation Sidebar */}
          <div className="lg:col-span-5" data-clip>
            <div className="sticky top-24 rounded border border-acc bg-acc-soft p-6 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)]">Instant Consultation</span>
              <h3 className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Request {s.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--white-55)]">
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
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] hover:underline"
                >
                  Direct WhatsApp Helpdesk →
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
