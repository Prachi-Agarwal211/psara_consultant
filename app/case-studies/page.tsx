import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, Building2, MapPin, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import { Section, GlassCard } from "../../components/v3/PagePrimitives";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { CASE_STUDIES } from "../../data/case-studies";
import { DEFAULT_WA } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "PSARA Licensing Case Studies & Proven Approval Track Record",
  "Case studies of successful PSARA License grants for corporate security firms, multi-state logistics agencies, and industrial guarding setups.",
  "/case-studies",
  ["psara case studies", "psara license success stories", "security licensing track record"]
);

export default function CaseStudiesPage() {
  return (
    <StageShell>
      <PageHero
        title="Proven PSARA Licensing Approval Track Record"
        lead="Explore real case studies of how we helped security agencies, facility managers, and corporate groups secure PSARA Licenses across Rajasthan, Delhi NCR, Maharashtra, Karnataka, and 24 other states."
        crumbs={[{ label: "Case Studies" }]}
        image="/assets/images/graded/desk.webp"
      />

      <PageMain>
        <div className="space-y-20">
          {CASE_STUDIES.map((cs) => (
            <Section key={cs.slug} className="space-y-7 border-t border-white/15 pt-8">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF7A00] uppercase tracking-wider">
                  <Building2 className="h-4 w-4 text-[#FF7A00]" /> {cs.clientType}
                </div>
                <span className="text-base text-[#FFB547]">
                  {cs.metric}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h2 className="mb-5 max-w-[28ch] text-3xl font-normal leading-tight text-white md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                  {cs.title}
                </h2>
                <p className="max-w-[72ch] text-base leading-relaxed text-[#B9C2D3] md:text-lg">
                  {cs.summary}
                </p>
              </div>

              {/* 3-Column Challenge / Solution / Outcome */}
              <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3 md:gap-10">
                <div className="space-y-3">
                  <strong className="block text-[#FF7A00] uppercase tracking-wider text-[11px] font-bold">1. Challenge</strong>
                  <p className="text-base leading-relaxed text-[#B9C2D3]">{cs.challenge}</p>
                </div>
                <div className="space-y-3">
                  <strong className="block text-[#FF7A00] uppercase tracking-wider text-[11px] font-bold">2. Statutory Strategy</strong>
                  <p className="text-base leading-relaxed text-[#B9C2D3]">{cs.solution}</p>
                </div>
                <div className="space-y-3">
                  <strong className="block text-[#FF7A00] uppercase tracking-wider text-[11px] font-bold">3. Official Outcome</strong>
                  <p className="text-base leading-relaxed text-[#B9C2D3]">{cs.outcome}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-6 text-sm">
                <span className="text-[#94A3B8] flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <MapPin className="h-4 w-4 text-[#FF7A00]" /> {cs.state}
                </span>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="font-bold text-[#FFB25E] hover:underline flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Read Full Case Analysis</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Section>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <GlassCard className="mt-20 space-y-5 p-6 sm:p-8 md:p-12">
          <div className="mb-2 inline-flex text-[#FFB547]">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Have a Complex License Requirement?
          </h2>
          <p className="text-sm text-[#E2E8F0] max-w-[68ch] font-normal leading-relaxed">
            Discuss your state parameters, director eligibility, and training MOUs directly with our senior legal desk.
          </p>
          <div className="pt-4">
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
              <span>Discuss Your File on WhatsApp</span>
            </a>
          </div>
        </GlassCard>
      </PageMain>
    </StageShell>
  );
}
