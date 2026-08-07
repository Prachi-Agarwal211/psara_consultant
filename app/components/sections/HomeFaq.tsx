"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    q: "What is a PSARA License and why is it mandatory?",
    a: "A PSARA License is the statutory registration issued by the State Controlling Authority under the Private Security Agencies (Regulation) Act, 2005. Operating a security agency without a valid licence is a punishable offence in India.",
  },
  {
    q: "Is a training MOU required before filing PSARA application?",
    a: "Yes. Almost all State Controlling Authorities mandate a live MOU with a State-recognised security training institute covering prescribed unarmed and armed guard curricula.",
  },
  {
    q: "How long does end-to-end PSARA licensing process take?",
    a: "Indicative processing timeline ranges between 45 to 70 days depending on State portal queues, promoter police antecedent verification, and inspection scheduling.",
  },
  {
    q: "Can I apply for multi-district or whole-State coverage?",
    a: "Yes. Coverage slabs are structured into single district, up to five districts, or whole State. Government fees vary based on the coverage slab chosen.",
  },
  {
    q: "What is the validity period of a PSARA License?",
    a: "Typically 5 years from the date of grant under the Act, subject to State Rules. Renewal applications must be submitted before expiry to maintain continuous compliance.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      data-section-transition
      data-transition="blur"
      className="relative overflow-hidden section-electric py-[var(--section-y)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden style={{ backgroundImage: "radial-gradient(circle, var(--gold) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative z-10 px-[var(--gutter)] max-w-[var(--page-max)] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <span className="meta-bracket mb-4 text-xs! text-[var(--gold)]! border-[var(--gold)]/30! inline-block" style={{ fontFamily: "var(--font-body)" }}>
              ( STATUTORY CLARITY )
            </span>
            <h2
              className="display-mega text-white font-bold mt-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequent <span className="text-metal">Questions</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: "var(--font-body)" }}>
            <span>PSARA Act 2005</span>
            <span className="w-1 h-1 rounded-full bg-[var(--gold)]/50" />
            <span>Direct Answers</span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto divide-y divide-white/10 border-t border-b border-white/10">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5 md:py-6">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  data-cursor="Toggle FAQ"
                  aria-expanded={isOpen}
                  className="group w-full flex items-center justify-between gap-6 text-left"
                >
                  <span className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-white transition-colors group-hover:text-[var(--gold-bright)]">
                      {item.q}
                    </span>
                  <span className={`shrink-0 flex h-8 w-8 items-center justify-center border transition-[color,border-color,background-color] duration-300 ${isOpen ? "rotate-180 border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold-bright)]" : "border-white/15 text-white/50 group-hover:border-[var(--gold)]/50 group-hover:text-[var(--gold-bright)]"}`}>
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-0 md:pl-12">
                    <p className="text-sm font-normal leading-relaxed text-[var(--white-70)] max-w-3xl" style={{ fontFamily: "var(--font-body)" }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--gold-bright)] hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Read all {">"} 100 statutory FAQs <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
