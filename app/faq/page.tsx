import type { Metadata } from "next";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { FAQS } from "../../data/faq";
import { DEFAULT_WA } from "../../lib/whatsapp";
import { faqJsonLd } from "../../lib/seo-content-generator";
import JsonLd from "../../components/JsonLd";
import { MessageSquare } from "lucide-react";
import { FAQ, GlassCard } from "../../components/v3/PagePrimitives";

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
        image="/assets/images/graded/desk.webp"
      />
      <PageMain>
        <div className="mx-auto max-w-4xl space-y-4">
          <FAQ items={items} title="Comprehensive Statutory Answers" />

          {/* Bottom WhatsApp CTA */}
          <GlassCard className="mt-16 space-y-5 p-6 sm:p-8 md:p-10">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Have a Specific State or Director Query?
            </h3>
            <p className="text-sm text-[#CBD5E1] max-w-[65ch]">
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
          </GlassCard>
        </div>
      </PageMain>
    </StageShell>
  );
}
