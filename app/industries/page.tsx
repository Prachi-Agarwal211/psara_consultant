import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import { Section, GlassCard } from "../../components/v3/PagePrimitives";
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
        image="/assets/images/graded/hq.webp"
      />

      <PageMain>
        <Section className="v3-directory-list divide-y divide-white/15 border-y border-white/15">
          {INDUSTRIES.map((ind) => (
            <Link
              data-v3-reveal
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="v3-directory-row group grid min-w-0 grid-cols-1 gap-6 py-8 md:grid-cols-[1fr_auto] md:gap-12 md:py-10"
            >
              <div>
                <h2 className="text-3xl font-normal leading-tight text-white transition-colors group-hover:text-[#FFB547] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                  {ind.title}
                  <ArrowUpRight aria-hidden="true" className="ml-3 inline h-5 w-5 text-[#FFB547] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h2>
                <p className="mt-4 text-sm text-[#FFB547]">Sector Standard</p>

                <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-[#B9C2D3]">
                  {ind.short}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center gap-3 text-sm text-[#B9C2D3]">
                <span>Custom Regulatory Rules</span>
                <span className="text-[#FFB25E] group-hover:underline flex items-center gap-1">
                  Explore Rules &rarr;
                </span>
              </div>
            </Link>
          ))}
        </Section>

        {/* Bottom Callout */}
        <GlassCard className="mt-20 space-y-5 p-6 sm:p-8 md:p-12">
          <div className="mb-2 inline-flex text-[#FFB547]">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Need Sector-Specific Tender Clearance?
          </h2>
          <p className="text-sm text-[#E2E8F0] max-w-[68ch] font-normal leading-relaxed">
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
        </GlassCard>
      </PageMain>
    </StageShell>
  );
}
