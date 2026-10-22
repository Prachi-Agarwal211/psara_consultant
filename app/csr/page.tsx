import type { Metadata } from "next";
import { GlassCard, Section } from "../../components/v3/PagePrimitives";
import { Heart, ShieldCheck, Users, BookOpen } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { DEFAULT_WA } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "Corporate Social Responsibility & Guard Welfare — PSARA Advisory",
  "PSARA Consultant's commitment to security guard welfare, statutory wage compliance, ex-defense resettlement, and continuous training education.",
  "/csr",
  ["security guard welfare", "psara csr", "statutory labour compliance security"]
);

export default function CsrPage() {
  return (
    <StageShell showCta={false}>
      <PageHero
        title="Corporate Responsibility & Security Guard Welfare"
        lead="A compliant security industry begins with dignity, statutory wages, EPF/ESIC protection, and career growth for security personnel across India."
        crumbs={[{ label: "CSR & Welfare" }]}
      />

      <PageMain>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassCard className="p-6">
            <Users className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-2">Statutory Wage &amp; Benefit Audit</h2>
            <p className="text-base text-[var(--white-70)] leading-relaxed">Promoting 100% adherence to minimum wages, EPF, ESIC, and gratuity for all deployed security personnel.</p>
          </GlassCard>

          <GlassCard className="p-6">
            <BookOpen className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-2">Skill Enhancement Programs</h2>
            <p className="text-base text-[var(--white-70)] leading-relaxed">Supporting training institutes with updated curricula covering digital access systems, fire safety, and emergency response.</p>
          </GlassCard>

          <GlassCard className="p-6">
            <Heart className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-2">Ex-Defense Resettlement</h2>
            <p className="text-base text-[var(--white-70)] leading-relaxed">Assisting retired armed forces personnel in transitioning to senior security supervisor and licensing officer roles.</p>
          </GlassCard>
        </div>

        <Section className="bg-[var(--void-2)] p-8 text-center">
          <ShieldCheck className="h-8 w-8 text-[var(--gold-bright)] mx-auto mb-3" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Promoting Statutory Compliance Nationwide</h2>
          <p className="mt-2 text-base text-[var(--white-70)] max-w-xl mx-auto">
            Learn more about our initiatives or partner with us for guard welfare audits.
          </p>
          <div className="mt-6">
            <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Contact CSR Desk
            </a>
          </div>
        </Section>
      </PageMain>
    </StageShell>
  );
}
