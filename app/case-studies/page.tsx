import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, Building2, MapPin } from "lucide-react";
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

      <PageMain>
        <div className="grid grid-cols-1 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.slug}
              className="border border-white/10 bg-[var(--void-2)] p-8 transition-colors duration-200 hover:border-[var(--gold)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-bright)] uppercase tracking-wider">
                  <Building2 className="h-4 w-4" /> {cs.clientType}
                </div>
                <span className="rounded bg-[var(--gold)]/20 px-3 py-1 text-xs font-bold text-[var(--gold-bright)] font-mono">
                  {cs.metric}
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-3">
                {cs.title}
              </h2>

              <p className="text-xs md:text-sm text-[var(--white-70)] leading-relaxed mb-6">
                {cs.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-4 text-xs">
                <div>
                  <strong className="block text-[var(--gold-bright)] uppercase tracking-wider text-[10px] mb-1">Challenge</strong>
                  <p className="text-[var(--white-70)] leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <strong className="block text-[var(--gold-bright)] uppercase tracking-wider text-[10px] mb-1">Solution</strong>
                  <p className="text-[var(--white-70)] leading-relaxed">{cs.solution}</p>
                </div>
                <div>
                  <strong className="block text-[var(--gold-bright)] uppercase tracking-wider text-[10px] mb-1">Outcome</strong>
                  <p className="text-[var(--white-70)] leading-relaxed">{cs.outcome}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[var(--white-55)] flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[var(--gold-bright)]" /> {cs.state}</span>
                <Link href={`/case-studies/${cs.slug}`} className="font-bold text-[var(--gold-bright)] hover:underline flex items-center gap-1">
                  Read Full Case Analysis <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 border border-[var(--gold)]/30 bg-[var(--void-2)] p-8 text-center">
          <Award className="h-8 w-8 text-[var(--gold-bright)] mx-auto mb-3" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Have a Complex License Requirement?</h2>
          <p className="mt-2 text-xs text-[var(--white-70)] max-w-xl mx-auto">
            Discuss your state parameters, director eligibility, and training MOUs directly with our legal desk.
          </p>
          <div className="mt-6">
            <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Discuss Your File on WhatsApp
            </a>
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
