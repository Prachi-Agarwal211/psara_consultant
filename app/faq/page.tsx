import type { Metadata } from "next";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { FAQS } from "../../data/faq";
import { DEFAULT_WA } from "../../lib/whatsapp";
import { faqJsonLd } from "../../lib/seo-content-generator";
import JsonLd from "../../components/JsonLd";
import { MessageSquare, HelpCircle, ChevronDown } from "lucide-react";

export const metadata: Metadata = pageMeta(
  "FAQ — PSARA License Legal & Compliance Questions",
  "PSARA License FAQs — eligibility, documents, timelines, fees, multi-state, renewal, and training MOUs answered by senior statutory consultants.",
  "/faq"
);

export default function FaqPage() {
  const items = FAQS;

  return (
    <StageShell>
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        title="Frequently Asked Questions on PSARA Licensing"
        lead="Eligibility criteria, director qualifications, training institute MOUs, police verification, and state fee slabs — clear answers for private security agency promoters."
        crumbs={[{ label: "FAQ" }]}
      />
      <PageMain className="bg-[#080714] text-white">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5D061] mb-6">
            <HelpCircle className="h-4 w-4 text-[#D4AF37]" />
            <span>Comprehensive Statutory Answers</span>
          </div>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {items.map((item, i) => (
              <details
                key={i}
                className="group py-6 transition-colors"
              >
                <summary
                  className="cursor-pointer list-none text-lg font-bold text-white leading-snug marker:content-none flex items-center justify-between gap-4 group-hover:text-[#F5D061]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>{item.q}</span>
                  <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-[#0A1022] text-[#F5D061] group-open:rotate-180 group-open:bg-[#C89B3C] group-open:text-[#241703] transition-all">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <p
                  className="mt-4 text-base font-normal leading-[1.65] text-[#E2E8F0] pr-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          {/* Bottom WhatsApp CTA */}
          <div className="mt-12 rounded-2xl border border-white/15 bg-[#0A1022] p-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Have a Specific State or Director Query?
            </h3>
            <p className="text-sm text-[#CBD5E1] max-w-lg mx-auto">
              Our statutory licensing officers are available to review your director qualifications, registered office lease, and training MOU requirements directly.
            </p>
            <div className="pt-2">
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Ask a PSARA Specialist on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
