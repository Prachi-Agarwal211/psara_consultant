import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { PageHero, PageMain } from "../../../components/PageShell";
import { GlassCard, Section } from "../../../components/v3/PagePrimitives";
import StageShell from "../../components/ui/StageShell";
import { pageMeta } from "../../../lib/metadata";
import { STATES } from "../../../data/states";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";

export function generateStaticParams() {
  return STATES.map((st) => ({ state: st.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const st = STATES.find((item) => item.slug === state);
  if (!st) return {};
  return {
    ...pageMeta(`PSARA License in ${st.name} — Controlling Authority & Rules`, `Complete PSARA License guide for ${st.name}: ${st.authority}, fees, training MOU, and police verification.`, `/security-services/${st.slug}`),
    // Keep this useful supporting route live, but make the long-form dossier
    // the only index target for this state intent.
    robots: { index: false, follow: true },
    alternates: { canonical: `/states/${st.slug}` },
  };
}

export default async function SecurityServiceStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const st = STATES.find((item) => item.slug === state);
  if (!st) notFound();

  return (
    <StageShell>
      <PageHero
        title={`PSARA Security License in ${st.name}`}
        lead={`Statutory filing framework under ${st.authority}. Full rules, training institute requirements, and fee schedules.`}
        crumbs={[{ label: "Security Services", href: "/security-services" }, { label: st.name }]}
      />

      <PageMain>
        <Section className="mx-auto max-w-5xl space-y-12">
          {/* Key Facts Card */}
          <GlassCard className="space-y-5 p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[var(--gold-bright)]" /> {st.name} Controlling Authority Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--white-70)] pt-2">
              <div className="min-w-0 border-t border-white/15 pt-4">
                <strong className="block text-white mb-1">Controlling Body</strong>
                <span>{st.authority}</span>
              </div>
              <div className="min-w-0 border-t border-white/15 pt-4">
                <strong className="block text-white mb-1">Expected Timeline</strong>
                <span>{st.timeline}</span>
              </div>
              <div className="min-w-0 border-t border-white/15 pt-4">
                <strong className="block text-white mb-1">Application Mode</strong>
                <span>{st.applicationMode}</span>
              </div>
              <div className="min-w-0 border-t border-white/15 pt-4">
                <strong className="block text-white mb-1">License Validity</strong>
                <span>{st.validityYears} Years</span>
              </div>
            </div>
          </GlassCard>

          {/* Fee Schedule */}
          <GlassCard className="space-y-5 p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white mb-4">
              Statutory Government Fees in {st.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-center">
              <div className="min-w-0 border-t border-white/15 pt-4">
                <span className="block text-[var(--white-55)] mb-1">1 District</span>
                <span className="font-bold text-white text-base">{st.feeOneDistrict}</span>
              </div>
              <div className="min-w-0 border-t border-white/15 pt-4">
                <span className="block text-[var(--white-55)] mb-1">Up to 5 Districts</span>
                <span className="font-bold text-white text-base">{st.feeMultiDistrict}</span>
              </div>
              <div className="min-w-0 border-t border-white/15 pt-4">
                <span className="block text-[var(--white-55)] mb-1">Entire State</span>
                <span className="font-bold text-white text-base">{st.feeEntireState}</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-[var(--white-55)]">{st.feeNote}</p>
          </GlassCard>

          {/* Special Rules */}
          <GlassCard className="space-y-5 p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-white mb-4">
              Special State Rules &amp; Local Verification
            </h2>
            <div className="space-y-3">
              {st.specialRules.map((rule) => (
                <div key={rule} className="flex items-start gap-3 text-xs text-[var(--white-70)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Actions */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href={`/states/${st.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold-bright)] hover:underline">
              View Detailed State Dossier &rarr;
            </Link>

            <a data-v3-magnetic href={buildWhatsAppUrl(`Hi, I need PSARA license help for ${st.name}`)} target="_blank" rel="noopener noreferrer" className="btn-magnetic mag inline-flex max-w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-bold" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Apply for {st.name} License
            </a>
          </div>
        </Section>
      </PageMain>
    </StageShell>
  );
}
