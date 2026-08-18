import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, MessageSquare, Sparkles } from "lucide-react";
import { PageHero, PageMain } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
import { pageMeta } from "../../../lib/metadata";
import { INDUSTRIES } from "../../../data/industries";
import { DEFAULT_WA } from "../../../lib/whatsapp";

export function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = INDUSTRIES.find((item) => item.slug === slug);
  if (!ind) return {};
  return pageMeta(ind.title, ind.short, `/industries/${ind.slug}`);
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = INDUSTRIES.find((item) => item.slug === slug);
  if (!ind) notFound();

  return (
    <StageShell>
      <PageHero
        title={`PSARA License Rules: ${ind.title}`}
        lead={ind.desc}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.title }]}
      />

      <PageMain className="bg-[#050714] text-white">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Key Compliance Checklist */}
          <div className="rounded-3xl border border-[rgba(200,155,60,0.35)] bg-gradient-to-b from-[#0E1B33] via-[#0A1428] to-[#050714] p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="badge-metallic-gold mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" /> Statutory Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
                Key Statutory Compliance Checkpoints
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {ind.keyCompliance.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#060B18] p-4 text-xs sm:text-sm text-[#E2E8F0] shadow-inner font-medium">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation & Action */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/industries" className="inline-flex items-center gap-2 text-xs font-bold text-[#CBD5E1] hover:text-white uppercase tracking-wider">
              <ArrowLeft className="h-4 w-4" /> Back to Industries
            </Link>

            <a
              href={`${DEFAULT_WA}&text=Hi,%20I%20am%20enquiring%20about%20PSARA%20compliance%20for%20${encodeURIComponent(ind.title)}.%20Please%20guide%20me%20with%20the%20requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
              <span>Get Industry-Specific Advice</span>
            </a>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
