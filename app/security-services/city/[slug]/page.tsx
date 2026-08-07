import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";
import { PageHero, PageMain } from "../../../../components/PageShell";
import StageShell from "../../../components/ui/StageShell";
import { pageMeta } from "../../../../lib/metadata";
import { CITIES } from "../../../../data/cities";
import { DEFAULT_WA } from "../../../../lib/whatsapp";

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CITIES.find((item) => item.slug === slug);
  if (!c) return {};
  return {
    ...pageMeta(`PSARA Security Agency License in ${c.name}, ${c.stateName}`, `Get PSARA License clearance in ${c.name}, ${c.stateName}. Local police verification and training institute MOU.`, `/security-services/city/${c.slug}`),
    alternates: {
      canonical: `/city/${c.slug}`,
    },
    robots: {
      // Thin duplicate of /city/{slug} — never index, point crawlers at the canonical dossier.
      index: false,
      follow: true,
    },
  };
}

export default async function SecurityServiceCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CITIES.find((item) => item.slug === slug);
  if (!c) notFound();

  return (
    <StageShell>
      <PageHero
        title={`PSARA License in ${c.name}, ${c.stateName}`}
        lead={`Statutory security agency registration and police antecedent verification guidance for promoters in ${c.name}.`}
        crumbs={[{ label: "Security Services", href: "/security-services" }, { label: c.name }]}
      />

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="border border-[var(--gold)]/40 bg-[var(--void-2)] p-8 space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[var(--gold-bright)]" /> {c.name} Local Desk Guidelines
            </h2>
            <p className="text-xs text-[var(--white-70)] leading-relaxed">
              Security agency promoters operating in {c.name} must file Form-I with the {c.stateName} Controlling Authority, obtain police antecedent verification from local SP/CP offices, and execute an MOU with a state-recognized security training institute.
            </p>
          </div>

          <div className="border border-white/10 bg-[var(--void-2)] p-8">
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
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href={`/city/${c.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold-bright)] hover:underline">
              View Detailed {c.name} City Page &rarr;
            </Link>

            <a href={`${DEFAULT_WA}&text=Hi,%20I%20need%20PSARA%20license%20help%20in%20${c.name}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Apply for {c.name} PSARA
            </a>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
