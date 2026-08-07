import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { SERVICES } from "../../data/services";
import { DEFAULT_WA, TEL_HREF } from "../../lib/whatsapp";
import { getLocationAccent, accentStyleVars, hubHeroImage } from "../lib/location-accent";

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
        title="PSARA License & Regulatory Advisory Services"
        lead="From first-time security agency incorporation to multi-state PSARA grants — statute-first advisory built for speed, compliance, and zero verification delays."
        crumbs={[{ label: "Services" }]}
        locationSlug="services-hub"
        image={hubHeroImage("services-hub")}
        meta="( STATUTORY ADVISORY ) ( PAN INDIA )"
      />

      <PageMain>
        {/* Service Pillars Grid */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Our Core Services</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white mb-8">
            Complete PSARA Regulatory Portfolio
          </h2>

          <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => {
              const acc = getLocationAccent(s.slug);
              const accVars = accentStyleVars(acc) as CSSProperties;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  style={accVars}
                  className="group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-[color,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-acc "
                >
                  {/* Ghost number */}
                  <span aria-hidden className="pointer-events-none absolute -right-1 -top-3 font-mono text-5xl font-bold text-acc opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.16]">
                    {s.slug.slice(0, 2).toUpperCase()}
                  </span>
                  {/* Corner accent */}
                  <span className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 bg-acc transition-[color,border-color,background-color] duration-500 group-hover:w-full" aria-hidden />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-acc-bright">
                        Statutory Service
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[var(--white-40)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc-bright" />
                    </div>
                    <h3
                      className="mt-3 text-xl font-bold text-white transition-colors group-hover:text-acc-bright"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--white-70)] line-clamp-3">
                      {s.short}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[11px]">
                    <span className="text-[var(--white-55)]">Pan-India Support</span>
                    <span className="font-bold text-acc-bright group-hover:underline">View Service Details &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Process Roadmap */}
        <section className="mb-20 border-t border-white/10 pt-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Statutory Workflow</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
            5-Stage PSARA License Acquisition Process
          </h2>
          <p className="mt-2 text-sm text-[var(--white-70)] max-w-2xl">
            Our systematic approach eliminates common rejection triggers like flawed MOA objects, unverified training MOUs, or incomplete police clearance forms.
          </p>

          <div data-stagger className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((ps) => (
              <div key={ps.step} className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-acc ">
                <span aria-hidden className="pointer-events-none absolute -right-2 -top-4 font-mono text-6xl font-bold text-acc opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.18]">
                  {ps.step}
                </span>
                <span className="mb-2 block font-mono text-2xl font-bold text-acc-bright">{ps.step}</span>
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-sm font-bold text-white">{ps.title}</h3>
                <p className="text-[11px] text-[var(--white-70)] leading-relaxed">{ps.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Calculator CTA Banner */}
        <section className="mb-20 border border-[var(--gold)]/30 bg-gradient-to-r from-[var(--void)] to-[var(--space)] p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-[var(--gold-bright)] text-xs font-bold uppercase tracking-widest">
                <Calculator className="h-4 w-4" /> PSARA Cost Estimator
              </div>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white">
                Calculate Official State License Fees
              </h2>
              <p className="mt-2 text-xs md:text-sm text-[var(--white-70)] max-w-xl">
                Statutory fees vary based on territory scale: 1 District (₹5,000), 5 Districts (₹10,000), or Entire State (₹25,000). Estimate total costs including training MOUs.
              </p>
            </div>
            <Link
              href="/calculator"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider"
              style={{ background: "var(--grad-metal)", color: "var(--void)" }}
            >
              Launch Cost Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Full Gold CTA Section Bar */}
        <section className="rounded-sm border border-[var(--gold)] p-8 md:p-12 text-black" style={{ background: "var(--gold-bg)" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-black/80">Direct Advisory</span>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-black">
                Need Help Selecting the Right PSARA Category?
              </h2>
              <p className="mt-2 text-xs md:text-sm text-black/80 max-w-2xl font-medium">
                Our senior compliance officers assess your business model (guarding, cash-in-transit, bouncer deployment, armed escort) and craft your complete filing strategy.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-black/90 transition-transform active:scale-95"
              >
                WhatsApp Desk <ArrowRight className="h-3.5 w-3.5 text-[var(--gold-bright)]" />
              </a>
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-black/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-black/10"
              >
                <Phone className="h-3.5 w-3.5" /> Call Advisor
              </a>
            </div>
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
