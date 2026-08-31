import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, Building2, MapPin, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
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
      />

      <PageMain className="bg-[#080714] text-white">
        <div className="grid grid-cols-1 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.slug}
              className="space-y-6 rounded-3xl border border-[rgba(212,175,55,0.3)] bg-gradient-to-br from-[#332066] via-[#1A1236] to-[#120C27] p-6 shadow-2xl transition-all duration-200 hover:border-[#D4AF37] md:p-8"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  <Building2 className="h-4 w-4 text-[#D4AF37]" /> {cs.clientType}
                </div>
                <span className="badge-metallic-gold font-mono text-xs">
                  {cs.metric}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  {cs.title}
                </h2>
                <p className="text-sm md:text-base text-[#E2E8F0] leading-relaxed font-normal">
                  {cs.summary}
                </p>
              </div>

              {/* 3-Column Challenge / Solution / Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div className="space-y-1 rounded-2xl border border-white/10 bg-[#120C27] p-4">
                  <strong className="block text-[#D4AF37] uppercase tracking-wider text-[11px] font-bold">1. Challenge</strong>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-normal">{cs.challenge}</p>
                </div>
                <div className="space-y-1 rounded-2xl border border-white/10 bg-[#120C27] p-4">
                  <strong className="block text-[#D4AF37] uppercase tracking-wider text-[11px] font-bold">2. Statutory Strategy</strong>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-normal">{cs.solution}</p>
                </div>
                <div className="space-y-1 rounded-2xl border border-white/10 bg-[#120C27] p-4">
                  <strong className="block text-[#D4AF37] uppercase tracking-wider text-[11px] font-bold">3. Official Outcome</strong>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-normal">{cs.outcome}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#94A3B8] flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <MapPin className="h-4 w-4 text-[#D4AF37]" /> {cs.state}
                </span>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="font-bold text-[#F5D061] hover:underline flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Read Full Case Analysis</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <section className="mt-16 space-y-4 rounded-3xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-r from-[#332066] via-[#180D36] to-[#24104B] p-8 text-center shadow-2xl md:p-12">
          <div className="mb-2 inline-flex rounded-2xl border border-[#D4AF37]/40 bg-[#120C27] p-3 text-[#D4AF37]">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Have a Complex License Requirement?
          </h2>
          <p className="text-sm text-[#E2E8F0] max-w-xl mx-auto font-normal leading-relaxed">
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
        </section>
      </PageMain>
    </StageShell>
  );
}
