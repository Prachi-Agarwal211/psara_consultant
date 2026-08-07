import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
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

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Key Compliance Checklist */}
          <div className="border border-[var(--gold)]/40 bg-[var(--void-2)] p-8 space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[var(--gold-bright)]" /> Key Statutory Compliance Checkpoints
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {ind.keyCompliance.map((item) => (
                <div key={item} className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 text-xs text-[var(--white-90)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nav & Action */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/industries" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--white-70)] hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to Industries
            </Link>

            <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Get Industry-Specific Advice
            </a>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
