import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
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

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Key Metrics Banner */}
          <div className="border border-[var(--gold)]/40 bg-[var(--void-2)] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)]">Territory &amp; Scale</span>
              <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-1">
                <MapPin className="h-4 w-4 text-[var(--gold-bright)]" /> {cs.state}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)]">Result Achieved</span>
              <p className="text-lg font-bold text-metal font-mono mt-1">{cs.metric}</p>
            </div>
          </div>

          {/* Breakdown Sections */}
          <div className="space-y-8 text-sm text-[var(--white-70)] leading-relaxed">
            <div className="border border-white/10 bg-white/[0.02] p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-3 text-[var(--gold-bright)]">
                The Regulatory Challenge
              </h2>
              <p>{cs.challenge}</p>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-3 text-[var(--gold-bright)]">
                PSARA Advisory Solution
              </h2>
              <p>{cs.solution}</p>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-3 text-[var(--gold-bright)]">
                Final Statutory Outcome
              </h2>
              <p>{cs.outcome}</p>
            </div>
          </div>

          {/* Navigation & Action */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--white-70)] hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to Case Studies
            </Link>

            <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Get Similar PSARA Results
            </a>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
