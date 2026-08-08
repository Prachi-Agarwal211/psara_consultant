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

      <PageMain className="bg-[#FFFEF9] text-[#0F3C65]">
        {/* Service Pillars Grid */}
        <div className="mb-16">
          <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C]">Our Core Services</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0F3C65] mb-8" style={{ fontFamily: "var(--font-display)" }}>
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
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-6 shadow-sm transition-all duration-300 hover:border-[#C89B3C] hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C]">
                        Statutory Service
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#0F3C65] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C89B3C] stroke-[2.5]" />
                    </div>
                    <h3
                      className="mt-3 text-xl font-black text-[#0F3C65] group-hover:text-[#0A233F]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-3 text-xs font-medium leading-relaxed text-[#334E68] line-clamp-3">
                      {s.short}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#0F3C65]/10 pt-4 text-[11px]">
                    <span className="text-[#486581] font-bold">Pan-India Support</span>
                    <span className="font-black text-[#0F3C65] group-hover:text-[#C89B3C] group-hover:underline">View Details &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Process Roadmap */}
        <section className="mb-20 border-t border-[#0F3C65]/15 pt-16">
          <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C]">Statutory Workflow</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
            5-Stage PSARA License Acquisition Process
          </h2>
          <p className="mt-2 text-sm text-[#334E68] font-medium max-w-2xl">
            Our systematic approach eliminates common rejection triggers like flawed MOA objects, unverified training MOUs, or incomplete police clearance forms.
          </p>

          <div data-stagger className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((ps) => (
              <div key={ps.step} className="group relative overflow-hidden rounded-2xl border border-[#0F3C65]/15 bg-white p-5 shadow-sm transition-all hover:border-[#C89B3C]">
                <span className="mb-2 block font-mono text-2xl font-black text-[#C89B3C]">{ps.step}</span>
                <h3 className="mb-2 text-sm font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>{ps.title}</h3>
                <p className="text-[11px] text-[#486581] font-medium leading-relaxed">{ps.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Calculator CTA Banner */}
        <section className="mb-20 rounded-3xl border border-[#C89B3C]/40 bg-[#0A233F] text-white p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-[#FFF2BA] text-xs font-black uppercase tracking-widest">
                <Calculator className="h-4 w-4 text-[#C89B3C]" /> PSARA Cost Estimator
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                Calculate Official State License Fees
              </h2>
              <p className="mt-2 text-xs md:text-sm text-slate-300 font-medium max-w-xl">
                Statutory fees vary based on territory scale: 1 District (₹5,000), 5 Districts (₹10,000), or Entire State (₹25,000). Estimate total costs including training MOUs.
              </p>
            </div>
            <Link
              href="/calculator"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#FFF2BA] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F3C65] hover:bg-[#C89B3C] hover:text-white transition-all shadow-lg"
            >
              Launch Cost Calculator <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>
        </section>

        {/* Full Gold CTA Section Bar */}
        <section className="rounded-3xl border-2 border-[#C89B3C] p-8 md:p-12 text-[#0F3C65] bg-[#FFF2BA] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0F3C65]/80">Direct Advisory</span>
              <h2 className="mt-1 text-2xl md:text-3xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
                Need Help Selecting the Right PSARA Category?
              </h2>
              <p className="mt-2 text-xs md:text-sm text-[#0F3C65]/90 max-w-2xl font-bold">
                Our senior compliance officers assess your business model (guarding, cash-in-transit, bouncer deployment, armed escort) and craft your complete filing strategy.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F3C65] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#0A233F] transition-all shadow-md"
              >
                WhatsApp Desk <ArrowRight className="h-4 w-4 text-[#FFF2BA] stroke-[2.5]" />
              </a>
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F3C65] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F3C65] hover:bg-[#0F3C65] hover:text-white transition-all"
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
