import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, MessageSquare } from "lucide-react";
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

      <PageMain className="bg-[#080714] text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-[rgba(212,175,55,0.25)] bg-gradient-to-br from-[#2A1853] to-[#120C27] p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-[#D4AF37] hover:from-[#332066] hover:to-[#180D36] sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-metallic-gold text-[10px]">
                    Sector Standard
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-[#F5D061] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {ind.title}
                </h2>

                <p className="mt-3 text-sm text-[#E2E8F0] leading-relaxed font-normal">
                  {ind.short}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                <span>Custom Regulatory Rules</span>
                <span className="text-[#F5D061] group-hover:underline flex items-center gap-1">
                  Explore Rules &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Callout */}
        <section className="mt-16 space-y-4 rounded-3xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-r from-[#332066] via-[#180D36] to-[#24104B] p-8 text-center shadow-2xl md:p-12">
          <div className="mb-2 inline-flex rounded-2xl border border-[#D4AF37]/40 bg-[#120C27] p-3 text-[#D4AF37]">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Need Sector-Specific Tender Clearance?
          </h2>
          <p className="text-sm text-[#E2E8F0] max-w-xl mx-auto font-normal leading-relaxed">
            We review client tender conditions (armed vs unarmed, guard height/education criteria, supervisor ratios) and align your PSARA dossier accordingly.
          </p>
          <div className="pt-4">
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
              <span>Consult Industry Legal Specialist</span>
            </a>
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
