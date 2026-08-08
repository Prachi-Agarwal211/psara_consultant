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
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      data-section-transition
      data-transition="blur"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFEF9] via-[#FBF7F0] to-[#FFFDF5] text-[#0F3C65] py-16 lg:py-24"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#0F3C65]/15 pb-8 mb-10 gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C89B3C] block mb-2" style={{ fontFamily: "var(--font-body)" }}>
              ( STATUTORY CLARITY )
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0F3C65]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequent <span className="text-[#C89B3C]">Questions</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#334E68]" style={{ fontFamily: "var(--font-body)" }}>
            <span>PSARA Act 2005</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
            <span>Direct Answers</span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto divide-y divide-[#0F3C65]/15 border-t border-b border-[#0F3C65]/15">
          {visibleFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5 md:py-6">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center justify-between gap-6 text-left"
                >
                  <span className="text-lg md:text-xl font-black text-[#0F3C65] transition-colors group-hover:text-[#C89B3C]" style={{ fontFamily: "var(--font-display)" }}>
                    {item.q}
                  </span>
                  <span className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${isOpen ? "rotate-180 border-[#C89B3C] bg-[#FFF2BA] text-[#0F3C65]" : "border-[#0F3C65]/20 bg-[#FBF7F0] text-[#0F3C65] group-hover:border-[#C89B3C]"}`}>
                    <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-0 md:pl-2">
                    <p className="text-sm font-medium leading-relaxed text-[#334E68] max-w-3xl" style={{ fontFamily: "var(--font-body)" }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C89B3C] bg-[#FFF2BA] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F3C65] hover:bg-white transition-all shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>{showAll ? "Show Fewer Questions" : `See More Questions (+${faqs.length - 3} More)`}</span>
            <ArrowUpRight className={`h-4 w-4 stroke-[2.5] transition-transform duration-300 ${showAll ? "-rotate-90" : "rotate-90"}`} />
          </button>

          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F3C65] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#0A233F] transition-all shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>All 100+ statutory FAQs</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
