import type { Metadata } from "next";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { FAQS } from "../../data/faq";
import { DEFAULT_WA } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "FAQ",
  "PSARA License FAQs — eligibility, documents, timelines, fees, multi-state, renewal, and more.",
  "/faq"
);

export default function FaqPage() {
  const items = FAQS;

  return (
    <StageShell>
      <PageHero
        title="Questions we answer every week"
        lead="Eligibility, documents, State rules, timelines — practical answers for security agency founders."
        crumbs={[{ label: "FAQ" }]}
      />
      <PageMain>
        <div className="mx-auto max-w-3xl space-y-0" data-stagger>
          {items.map((item, i) => (
            <details
              key={i}
              className="group border-b border-white/10 py-5"
            >
              <summary
                className="cursor-pointer list-none text-[1.05rem] font-semibold leading-snug marker:content-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}
              >
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="text-metal shrink-0 text-sm transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed" style={{ color: "var(--white-55)", fontFamily: "var(--font-body)" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-14" data-clip>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full px-7 py-3.5 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
            style={{ background: "var(--grad-metal)", color: "var(--void)" }}
          >
            Ask on WhatsApp
          </a>
        </div>
      </PageMain>
    </StageShell>
  );
}
