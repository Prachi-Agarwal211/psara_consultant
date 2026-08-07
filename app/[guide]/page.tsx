import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "../../data/guides";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import CtaBar from "../../components/CtaBar";
import WhatsAppForm from "../../components/WhatsAppForm";
import { pageMeta } from "../../lib/metadata";
import { SITE } from "../../lib/config";
import JsonLd from "../../components/JsonLd";

/** Reserved top-level routes that must not be captured as guides */
const RESERVED = new Set([
  "about", "contact", "services", "faq", "states", "cities", "city",
  "google", "privacy-policy", "terms", "disclaimer", "franchise", "api", "_next",
]);

export function generateStaticParams() {
  return GUIDES.map((g) => ({ guide: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string }>;
}): Promise<Metadata> {
  const { guide } = await params;
  if (RESERVED.has(guide)) return {};
  const g = getGuide(guide);
  if (!g) return {};
  // Suffix keeps guide <title>s unique vs. same-named service pages
  // (e.g. /psara-renewal guide vs /services/psara-license-renewal).
  // Skip when the guide title already contains the phrase.
  const suffix = g.title.toLowerCase().includes("complete guide") ? "" : " — Complete Guide";
  return pageMeta(`${g.title}${suffix}`, g.description, `/${guide}`);
}

import GuideDossierView from "../components/sections/GuideDossierView";

export default async function GuidePage({
  params,
}: {
  params: Promise<{ guide: string }>;
}) {
  const { guide } = await params;
  if (RESERVED.has(guide)) notFound();
  const g = getGuide(guide);
  if (!g) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}/${g.slug}#article`,
    headline: g.title,
    description: g.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", "url": `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/${g.slug}`,
    },
  }

  return (
    <StageShell>
      <JsonLd data={articleSchema} />
      <PageHero
        title={g.title}
        lead={g.description}
        crumbs={[{ label: "Guides", href: "/psara-license" }, { label: g.title }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-8">
            <GuideDossierView guide={g} />

            {/* More guides sidebar */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">More guides</p>
              <ul className="space-y-2.5 text-sm font-bold text-[var(--white-55)]">
                {GUIDES.filter((x) => x.slug !== g.slug)
                  .slice(0, 8)
                  .map((x) => (
                    <li key={x.slug}>
                      <a href={`/${x.slug}`}
                        className="hover:text-[var(--gold-bright)] transition-colors inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-bright)] opacity-40" />
                        {x.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <CtaBar title="Need more clarity?" subtitle="Our team answers PSARA questions within 4 hours — call or WhatsApp." />
          </div>

          {/* Sidebar enquiry form */}
          <div className="lg:col-span-5">
            <div className="relative border border-white/10 p-6 md:p-8"
              style={{ backgroundColor: "rgba(2,8,20,0.4)" }}
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white">
                Ask about this topic
              </h3>
              <p className="mt-2 text-sm font-medium text-[var(--white-55)]">
                Have a specific question about {g.title}? Send us a message.
              </p>
              <div className="mt-6">
                <WhatsAppForm formType="Guide Enquiry" service={g.title} />
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
