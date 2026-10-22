import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";
import { PageHero, PageMain } from "../../../../components/PageShell";
import { GlassCard, Section } from "../../../../components/v3/PagePrimitives";
import StageShell from "../../../components/ui/StageShell";
import { pageMeta } from "../../../../lib/metadata";
import { CITIES } from "../../../../data/cities";
import { STATES } from "../../../../data/states";
import { buildWhatsAppUrl } from "../../../../lib/whatsapp";
import { generateCityContent } from "../../../../lib/seo-content-generator";

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CITIES.find((item) => item.slug === slug);
  if (!c) return {};
  return {
    ...pageMeta(`PSARA Compliance Checklist: ${c.name}`, `Local PSARA filing checklist for ${c.name}, ${c.stateName}: office proof, police verification, training MOU, and district coverage.`, `/security-services/city/${c.slug}`),
    // Keep this checklist route accessible, but consolidate the city intent
    // into the richer canonical dossier rather than creating a second index
    // target for every city.
    alternates: { canonical: `/city/${c.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function SecurityServiceCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CITIES.find((item) => item.slug === slug);
  if (!c) notFound();
  const state = STATES.find((item) => item.slug === c.stateSlug);
  const content = generateCityContent(c, state);

  return (
    <StageShell>
      <PageHero
        title={`PSARA License in ${c.name}, ${c.stateName}`}
        lead={`Statutory security agency registration and police antecedent verification guidance for promoters in ${c.name}.`}
        crumbs={[{ label: "Security Services", href: "/security-services" }, { label: c.name }]}
      />

      <PageMain>
        <Section className="mx-auto max-w-5xl space-y-12">
          <GlassCard className="space-y-5 p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[var(--gold-bright)]" /> {c.name} Local Desk Guidelines
            </h2>
            <p className="text-base text-[var(--white-70)] leading-relaxed">
              Security agency promoters operating in {c.name} must file Form-I with the {c.stateName} Controlling Authority, obtain police antecedent verification from local SP/CP offices, and execute an MOU with a state-recognized security training institute.
            </p>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section className="space-y-5 border-t border-white/15 pt-8">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white mb-4">
                What the {c.name} filing needs
              </h2>
              <div className="space-y-3 text-xs text-[var(--white-70)]">
                {content.documents.slice(0, 6).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Section>
            <Section className="space-y-5 border-t border-white/15 pt-8">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white mb-4">
                Local filing sequence
              </h2>
              <ol className="space-y-3 text-xs text-[var(--white-70)] list-decimal list-inside">
                {content.process.slice(0, 6).map((step) => <li key={step}>{step}</li>)}
              </ol>
            </Section>
          </div>

          <GlassCard className="space-y-5 p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-4">
              Local Verification Checklist for {c.name}
            </h3>
            <div className="space-y-3 text-xs text-[var(--white-70)]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                <span>Registered office proof or commercial lease in {c.name}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                <span>Police antecedent clearance for all directors from local commissionerate</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                <span>State-recognized training institute MOU covering guard syllabus</span>
              </div>
            </div>
          </GlassCard>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href={`/city/${c.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold-bright)] hover:underline">
              View Detailed {c.name} City Page &rarr;
            </Link>

            <a data-v3-magnetic href={buildWhatsAppUrl(`Hi, I need PSARA license help in ${c.name}`)} target="_blank" rel="noopener noreferrer" className="btn-magnetic mag inline-flex max-w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-bold" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Apply for {c.name} PSARA
            </a>
          </div>
        </Section>
      </PageMain>
    </StageShell>
  );
}
