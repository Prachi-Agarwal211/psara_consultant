import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, MessageSquare, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { PageHero, PageMain } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
import { pageMeta } from "../../../lib/metadata";
import { CASE_STUDIES } from "../../../data/case-studies";
import { DEFAULT_WA } from "../../../lib/whatsapp";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);
  if (!cs) return {};
  return pageMeta(cs.title, cs.summary, `/case-studies/${cs.slug}`);
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);
  if (!cs) notFound();

  return (
    <StageShell>
      <PageHero
        title={cs.title}
        lead={cs.summary}
        crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: cs.clientType }]}
      />

      <PageMain className="bg-[#080714] text-white">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Key Metrics Banner */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-r from-[#332066] via-[#180D36] to-[#24104B] p-6 shadow-2xl sm:flex-row sm:p-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">Territory &amp; Sector</span>
              <p className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37]" /> {cs.state} • {cs.clientType}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">Result Metric</span>
              <p className="text-2xl font-bold gold-metallic-text font-mono mt-0.5">{cs.metric}</p>
            </div>
          </div>

          {/* Breakdown Sections */}
          <div className="space-y-6 text-sm text-[#E2E8F0] leading-relaxed">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 sm:p-8 shadow-md space-y-3">
              <h2 className="text-xl font-bold text-[#D4AF37] flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <ShieldCheck className="h-5 w-5 text-[#D4AF37]" /> 1. The Regulatory Challenge
              </h2>
              <p className="font-normal text-base text-[#E2E8F0] leading-relaxed">{cs.challenge}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 sm:p-8 shadow-md space-y-3">
              <h2 className="text-xl font-bold text-[#D4AF37] flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <Sparkles className="h-5 w-5 text-[#D4AF37]" /> 2. PSARA Advisory Solution &amp; Filing
              </h2>
              <p className="font-normal text-base text-[#E2E8F0] leading-relaxed">{cs.solution}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 sm:p-8 shadow-md space-y-3">
              <h2 className="text-xl font-bold text-[#D4AF37] flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <Building2 className="h-5 w-5 text-[#D4AF37]" /> 3. Final Statutory Outcome
              </h2>
              <p className="font-normal text-base text-[#E2E8F0] leading-relaxed">{cs.outcome}</p>
            </div>
          </div>

          {/* Navigation & Action */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs font-bold text-[#CBD5E1] hover:text-white uppercase tracking-wider">
              <ArrowLeft className="h-4 w-4" /> Back to Case Studies
            </Link>

            <a
              href={`${DEFAULT_WA}&text=Hi,%20I%20read%20the%20case%20study%20for%20${encodeURIComponent(cs.title)}.%20I%20want%20to%20achieve%20similar%20PSARA%20licensing%20results.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
              <span>Get Similar PSARA Results</span>
            </a>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
