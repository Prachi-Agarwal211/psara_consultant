import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, ArrowUpRight, Phone, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import { Section, GlassCard } from "../../components/v3/PagePrimitives";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { SERVICES } from "../../data/services";
import { DEFAULT_WA, TEL_HREF } from "../../lib/whatsapp";
import { formatINR } from "../../lib/config";
import { buildDefaultAmounts, computeQuote } from "../../lib/quote-engine";

/** Standard whole-state package total — single source of truth: lib/quote-engine.ts */
const STANDARD_WHOLE_STATE_TOTAL = computeQuote(buildDefaultAmounts("rajasthan", "entire-state")).grandTotal;

export const metadata: Metadata = pageMeta(
  "PSARA Licensing Services & Regulatory Advisory",
  "Complete PSARA License services: Fresh PSARA Applications, License Renewals, Multi-State Expansion, Security Training MOUs, and Police Verification.",
  "/services",
  ["PSARA services", "security license application", "psara renewal", "training mou security"]
);

const PROCESS_STEPS = [
  { step: "01", title: "Entity & Object Clause Alignment", desc: "Verifying MOA/AOA, GST, EPF, ESIC, and Director antecedents for PSARA statutory eligibility." },
  { step: "02", title: "Training Institute MOU Tie-up", desc: "Executing mandatory MOU with a State-Recognized Security Guard Training Institute covering armed/unarmed syllabus." },
  { step: "03", title: "Controlling Authority Portal Filing", desc: "Form-I submission, statutory fee payment, and digital dossier upload with the State Home Department." },
  { step: "04", title: "Police Antecedent Verification", desc: "Direct liaisoning with SP/CP office for promoter and registered office physical verification." },
  { step: "05", title: "Grant of PSARA License", desc: "Issuance of official PSARA License certificate for 1 District, 5 Districts, or Entire State." },
];

export default function ServicesHubPage() {
  return (
    <StageShell>
      <PageHero
        title="PSARA License &amp; Regulatory Advisory Services"
        lead="From first-time security agency incorporation to multi-state PSARA grants — statute-first advisory built for speed, compliance, and zero verification delays."
        crumbs={[{ label: "Services" }]}
      />

      <PageMain>
        <Section className="mb-20">
          <h2 className="mb-5">Complete PSARA Regulatory Portfolio</h2>
          <p className="mb-10 text-sm text-[#B9C2D3]">Comprehensive Portfolio</p>
          <div className="v3-directory-list divide-y divide-white/15 border-y border-white/15">
            {SERVICES.map((s) => (
              <Link data-v3-reveal key={s.slug} href={`/services/${s.slug}`} className="v3-directory-row group grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 py-8 md:grid-cols-[1.1fr_1fr_auto] md:items-center md:gap-10 md:py-10">
                <div className="min-w-0">
                  <h3 className="text-2xl leading-tight transition-colors group-hover:text-[#FFB547] sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  <p className="mt-3 text-xs text-[#B9C2D3]">Statutory Service · Pan-India Support</p>
                </div>
                <p className="col-start-1 max-w-[60ch] text-base leading-relaxed text-[#B9C2D3] md:col-start-auto">{s.short}</p>
                <span className="col-start-2 row-start-1 flex items-center gap-3 text-sm text-[#FFB547] md:col-start-auto md:row-start-auto"><span className="hidden xl:inline">View Details</span><ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </Section>

        {/* Process Roadmap */}
        <Section className="mb-20 border-t border-white/15 pt-12">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            5-Stage PSARA License Acquisition Process
          </h2>
          <p className="mt-4 text-sm text-[#FFB547]">Statutory Workflow</p>
          <p className="mt-2 text-sm text-[#E2E8F0] font-normal max-w-2xl">
            Our systematic approach eliminates common rejection triggers like flawed MOA objects, unverified training MOUs, or incomplete police clearance forms.
          </p>

          <ol className="v3-steps mt-10 divide-y divide-white/15 border-y border-white/15">
            {PROCESS_STEPS.map((ps) => (
              <li key={ps.step} className="grid grid-cols-[2.5rem_1fr] gap-4 py-7 md:grid-cols-[3rem_1fr_1.2fr] md:gap-8">
                <span className="text-lg text-[#FFB547]">{ps.step}</span>
                <h3 className="text-xl font-normal leading-snug text-white" style={{ fontFamily: "var(--font-display)" }}>{ps.title}</h3>
                <p className="col-start-2 text-base leading-relaxed text-[#B9C2D3] md:col-start-auto">{ps.desc}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Fee Calculator CTA Banner — flat */}
        <GlassCard className="mb-20 p-6 sm:p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Calculate Official State License Fees
              </h2>
              <p className="mt-4 flex items-center gap-2 text-sm text-[#FFB547]"><Calculator aria-hidden="true" className="h-4 w-4" /> PSARA Cost Estimator</p>
              <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-[#B9C2D3]">
                Standard whole-state package {formatINR(STANDARD_WHOLE_STATE_TOTAL)} — consultancy, MOU &amp;
                training, government fee, office &amp; rent agreement, documentation, police verification and
                processing. Government fees vary by state and coverage (standard slab ₹5,000 / ₹10,000 /
                ₹25,000, with state exceptions).
              </p>
            </div>
            <Link
              href="/calculator"
              className="v3-button v3-button--saffron shrink-0" data-v3-magnetic
            >
              Launch Cost Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </GlassCard>

        {/* Direct Advisory CTA — flat */}
        <GlassCard className="p-6 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Need Help Selecting the Right PSARA Category?
              </h2>
              <p className="mt-4 text-sm text-[#FFB547]">Direct Advisory</p>
              <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-[#B9C2D3]">
                Our senior compliance officers assess your business model (guarding, cash-in-transit, bouncer deployment, armed escort) and craft your complete filing strategy.
              </p>
            </div>
            <div className="flex min-w-0 flex-wrap gap-3">
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="v3-button v3-button--wa" data-v3-magnetic
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href={TEL_HREF}
                className="v3-button v3-button--ghost" data-v3-magnetic
              >
                <Phone className="h-4 w-4" /> Call Advisor
              </a>
            </div>
          </div>
        </GlassCard>
      </PageMain>
    </StageShell>
  );
}
