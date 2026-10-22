import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, MessageSquare, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { PageHero, PageMain } from "../../../components/PageShell";
import { Section, GlassCard } from "../../../components/v3/PagePrimitives";
import StageShell from "../../components/ui/StageShell";
import { pageMeta } from "../../../lib/metadata";
import { CASE_STUDIES } from "../../../data/case-studies";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";

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
        image="/assets/images/graded/hq.webp"
      />

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Key Metrics Banner */}
          <GlassCard className="flex flex-col items-start justify-between gap-8 p-6 sm:p-8 md:flex-row md:items-center">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] block">Territory &amp; Sector</span>
              <p className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#FF7A00]" /> {cs.state} • {cs.clientType}
              </p>
            </div>
            <div className="md:text-right">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] block">Result Metric</span>
              <p className="mt-2 text-3xl text-[#FFB547]">{cs.metric}</p>
            </div>
          </GlassCard>

          {/* Breakdown Sections */}
          <div className="space-y-12 text-base leading-relaxed">
            <Section className="space-y-5 border-t border-white/15 pt-10">
              <h2 className="flex items-start gap-4 text-2xl font-normal leading-tight text-white md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                <ShieldCheck className="h-5 w-5 text-[#FF7A00]" /> 1. The Regulatory Challenge
              </h2>
              <p className="max-w-[68ch] text-base leading-relaxed text-[#B9C2D3]">{cs.challenge}</p>
            </Section>

            <Section className="space-y-5 border-t border-white/15 pt-10">
              <h2 className="flex items-start gap-4 text-2xl font-normal leading-tight text-white md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                <Sparkles className="h-5 w-5 text-[#FF7A00]" /> 2. PSARA Advisory Solution &amp; Filing
              </h2>
              <p className="max-w-[68ch] text-base leading-relaxed text-[#B9C2D3]">{cs.solution}</p>
            </Section>

            <Section className="space-y-5 border-t border-white/15 pt-10">
              <h2 className="flex items-start gap-4 text-2xl font-normal leading-tight text-white md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                <Building2 className="h-5 w-5 text-[#FF7A00]" /> 3. Final Statutory Outcome
              </h2>
              <p className="max-w-[68ch] text-base leading-relaxed text-[#B9C2D3]">{cs.outcome}</p>
            </Section>
          </div>

          {/* Navigation & Action */}
          <div className="flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs font-bold text-[#CBD5E1] hover:text-white uppercase tracking-wider">
              <ArrowLeft className="h-4 w-4" /> Back to Case Studies
            </Link>

            <a
              href={buildWhatsAppUrl(`Hi, I read the case study for ${cs.title}. I want to achieve similar PSARA licensing results.`)}
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
