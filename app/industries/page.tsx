import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { INDUSTRIES } from "../../data/industries";
import { DEFAULT_WA } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "Industry-Specific PSARA Licensing Standards & Advisory",
  "PSARA License advisory tailored for Manufacturing Plants, IT Tech Parks, Banking & CIT, Healthcare, and Logistics security setups.",
  "/industries",
  ["psara for manufacturing", "it park security license", "banking security psara", "hospital guard compliance"]
);

export default function IndustriesPage() {
  return (
    <StageShell>
      <PageHero
        title="Industry-Specific PSARA Compliance Frameworks"
        lead="Different sectors demand unique security guard qualifications, armed licenses, and operational procedures. Explore sector-tailored PSARA licensing rules for your industry."
        crumbs={[{ label: "Industries" }]}
      />

      <PageMain>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group border border-white/10 bg-[var(--void-2)] p-8 transition-colors duration-200 hover:border-[var(--gold)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                    Sector Standard
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--white-40)] transition-transform group-hover:text-[var(--gold-bright)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white group-hover:text-[var(--gold-bright)] transition-colors">
                  {ind.title}
                </h2>

                <p className="mt-3 text-xs md:text-sm text-[var(--white-70)] leading-relaxed">
                  {ind.short}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[var(--white-55)]">Custom Regulatory Requirements</span>
                <span className="font-bold text-[var(--gold-bright)] group-hover:underline">Explore Industry Rules &rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 border border-[var(--gold)]/30 bg-[var(--void-2)] p-8 text-center">
          <ShieldCheck className="h-8 w-8 text-[var(--gold-bright)] mx-auto mb-3" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Need Sector-Specific Tender Clearance?</h2>
          <p className="mt-2 text-xs text-[var(--white-70)] max-w-xl mx-auto">
            We review client tender conditions (armed vs unarmed, guard height/education criteria, supervisor ratios) and align your PSARA dossier accordingly.
          </p>
          <div className="mt-6">
            <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Consult Industry Legal Specialist
            </a>
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
