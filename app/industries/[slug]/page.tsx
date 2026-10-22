import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../../components/PageShell";
import { Section } from "../../../components/v3/PagePrimitives";
import StageShell from "../../components/ui/StageShell";
import { pageMeta } from "../../../lib/metadata";
import { INDUSTRIES } from "../../../data/industries";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";

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
        image="/assets/images/graded/corridor.webp"
      />

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Key Compliance Checklist */}
          <Section className="space-y-7">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
                Key Statutory Compliance Checkpoints
              </h2>
              <p className="mt-4 text-sm text-[#B9C2D3]">Statutory Blueprint</p>
            </div>

            <ul className="divide-y divide-white/15 border-y border-white/15">
              {ind.keyCompliance.map((item) => (
                <li key={item} className="flex items-start gap-5 py-6 text-base leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Navigation & Action */}
          <div className="flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center">
            <Link href="/industries" className="inline-flex items-center gap-2 text-xs font-bold text-[#CBD5E1] hover:text-white uppercase tracking-wider">
              <ArrowLeft className="h-4 w-4" /> Back to Industries
            </Link>

            <a
              href={buildWhatsAppUrl(`Hi, I am enquiring about PSARA compliance for ${ind.title}. Please guide me with the requirements.`)}
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
