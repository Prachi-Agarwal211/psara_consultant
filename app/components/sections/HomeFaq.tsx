"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
      className="py-20 md:py-32 px-[var(--gutter)] theme-paper-jasmine border-b border-[var(--line-light)]"
    >
      <div className="max-w-[var(--page-max)] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--line-light)] pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--amber)] mb-2">
              <span>STATUTORY CLARITY</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[var(--text-dark)] uppercase">
              FREQUENT QUESTIONS
            </h2>
          </div>

          <div className="flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-dark-muted)]">
            <span>PSARA ACT 2005</span>
            <span>·</span>
            <span>DIRECT ANSWERS</span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-[var(--line-light)] border-t border-b border-[var(--line-light)]">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-6">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  data-cursor="Toggle FAQ"
                  className="w-full flex items-center justify-between gap-4 text-left font-[family-name:var(--font-display)] text-xl font-bold text-[var(--text-dark)] hover:text-[var(--amber)] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[var(--amber)] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <p className="mt-4 text-sm font-medium text-[var(--text-dark-muted)] leading-relaxed animate-fadeIn">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
