import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, ArrowUpRight, Phone, MessageSquare, Sparkles } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { SERVICES } from "../../data/services";
import { DEFAULT_WA, TEL_HREF } from "../../lib/whatsapp";

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

      <PageMain className="bg-[#050714] text-white">
        {/* Service Pillars Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5D061] mb-2">
            <Sparkles className="h-4 w-4" /> Comprehensive Portfolio
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Complete PSARA Regulatory Portfolio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-[#0A1022] p-6 sm:p-8 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#0D162C]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5D061]">
                      Statutory Service
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F5D061]" />
                  </div>
                  <h3
                    className="text-xl font-bold text-white group-hover:text-[#F5D061] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm font-normal leading-relaxed text-[#E2E8F0] line-clamp-3">
                    {s.short}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="text-[#94A3B8] font-bold">Pan-India Support</span>
                  <span className="font-bold text-[#F5D061] group-hover:underline">View Details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Process Roadmap */}
        <section className="mb-20 border-t border-white/10 pt-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F5D061]">Statutory Workflow</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            5-Stage PSARA License Acquisition Process
          </h2>
          <p className="mt-2 text-sm text-[#E2E8F0] font-normal max-w-2xl">
            Our systematic approach eliminates common rejection triggers like flawed MOA objects, unverified training MOUs, or incomplete police clearance forms.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((ps) => (
              <div key={ps.step} className="rounded-2xl border border-white/10 bg-[#0A1022] p-5 shadow-md">
                <span className="mb-2 block font-mono text-2xl font-bold text-[#F5D061]">{ps.step}</span>
                <h3 className="mb-2 text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{ps.title}</h3>
                <p className="text-xs text-[#CBD5E1] font-normal leading-relaxed">{ps.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Calculator CTA Banner */}
        <section className="mb-20 rounded-3xl border border-white/15 bg-[#0A1022] text-white p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-[#F5D061] text-xs font-bold uppercase tracking-widest">
                <Calculator className="h-4 w-4" /> PSARA Cost Estimator
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Calculate Official State License Fees
              </h2>
              <p className="mt-2 text-xs md:text-sm text-[#E2E8F0] font-normal max-w-xl leading-relaxed">
                Consultancy &amp; Professional Fees: ₹30,000 | Training MOU Fee: ₹35,000 | Statutory Government fees: 1 District (₹5,000), 5 Districts (₹10,000), Entire State (₹25,000).
              </p>
            </div>
            <Link
              href="/calculator"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#5821C7] hover:bg-[#7638FA] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-purple-900/40"
            >
              Launch Cost Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Direct Advisory CTA Section Bar */}
        <section className="rounded-3xl border border-[#D4AF37]/40 p-8 md:p-12 text-white bg-[#0A1022] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5D061]">Direct Advisory</span>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Need Help Selecting the Right PSARA Category?
              </h2>
              <p className="mt-2 text-xs md:text-sm text-[#E2E8F0] max-w-2xl font-normal leading-relaxed">
                Our senior compliance officers assess your business model (guarding, cash-in-transit, bouncer deployment, armed escort) and craft your complete filing strategy.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5821C7] hover:bg-[#7638FA] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-purple-900/40"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all"
              >
                <Phone className="h-4 w-4" /> Call Advisor
              </a>
            </div>
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
