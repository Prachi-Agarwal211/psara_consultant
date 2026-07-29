import type { Metadata } from "next";
import { FAQS } from "../../data/faq";
import { PageHero, PageMain } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import JsonLd from "../../components/JsonLd";
import { pageMeta } from "../../lib/metadata";
import { faqJsonLd } from "../../lib/seo-content";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = pageMeta(
  "PSARA FAQ — 100 Questions Answered",
  "100 frequently asked questions on PSARA License, documents, training MOU, police verification, fees, renewal, multi-state strategy, and consultancy.",
  "/faq",
  ["PSARA FAQ", "PSARA license questions", "PSARA documents FAQ"]
);

export default function FaqPage() {
  const categories = Array.from(new Set(FAQS.map((f) => f.category)));

  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        roman="FAQ"
        title="PSARA questions, answered clearly"
        lead="A living knowledge base for promoters, CAs, and operators — from Form I to multi-state strategy."
        crumbs={[{ label: "FAQ" }]}
      />
      <PageMain>
        {categories.map((cat) => (
          <section key={cat} className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--gold)] mb-6">
              {cat}
            </h2>
            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
              {FAQS.filter((f) => f.category === cat).map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-base font-bold text-[var(--cream)] marker:content-none flex items-center justify-between gap-4">
                    <span>
                      <span className="text-[var(--gold)]">Q. </span>
                      {f.q}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-faint)] group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-[var(--text-dim)]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
        <CtaBar title="Still have a question?" subtitle="Call or WhatsApp — our team answers within 4 hours." />
      </PageMain>
    </>
  );
}
