"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Sparkles, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is a PSARA License and why is it mandatory in India?",
    a: "A PSARA License is the statutory registration issued by the State Controlling Authority under the Private Security Agencies (Regulation) Act, 2005. Operating a private security agency without a valid license is a punishable statutory offense with fines and imprisonment.",
  },
  {
    q: "Is a security guard training MOU mandatory before filing the application?",
    a: "Yes. All State Controlling Authorities mandate a recognized MOU with a government-approved security training institute. This covers the statutory syllabus for unarmed guards, security supervisors, and armed guards.",
  },
  {
    q: "What is the total statutory fee and consultancy cost for PSARA?",
    a: "Our consultancy fee is ₹30,000, and the training institute MOU fee is ₹35,000. Statutory government fees range from ₹5,000 (1 District), ₹10,000 (up to 5 Districts), to ₹25,000 (Entire State).",
  },
  {
    q: "How long does the complete end-to-end PSARA approval process take?",
    a: "The standard statutory timeline ranges between 30 to 45 business days, depending on State portal processing queues, director police antecedent clearance, and controlling authority premises inspection.",
  },
  {
    q: "What is the validity period of a PSARA License and how does renewal work?",
    a: "A PSARA License is valid for 5 years across most Indian States. Renewal applications must be submitted at least 45 to 90 days before expiration to ensure uninterrupted business compliance.",
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
      className="relative overflow-hidden bg-[#080714] text-white py-20 lg:py-28 border-b border-white/10"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F5D061] mb-3" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#F5D061]" />
              Statutory Clarity &amp; FAQs
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequently Asked <span className="gold-text-gradient">Questions</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]" style={{ fontFamily: "var(--font-body)" }}>
            <HelpCircle className="h-4 w-4 text-[#D4AF37]" />
            <span>PSARA Act 2005 Direct Answers</span>
          </div>
        </div>

        {/* FAQ Accordion List (High Contrast) */}
        <div className="max-w-4xl mx-auto divide-y divide-white/10 border-t border-b border-white/10">
          {visibleFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center justify-between gap-6 text-left focus:outline-none"
                >
                  <span
                    className="text-lg md:text-xl font-bold text-white transition-colors group-hover:text-[#F5D061]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
                      isOpen
                        ? "rotate-180 border-[#D4AF37] bg-[#C89B3C] text-[#241703]"
                        : "border-white/20 bg-[#0A1022] text-[#F5D061] group-hover:border-[#D4AF37]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-6">
                    <p
                      className="text-base font-normal leading-[1.65] text-[#E2E8F0]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37] bg-[#D4AF37]/15 hover:bg-[#D4AF37] hover:text-[#080714] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F5D061] transition-all duration-200 shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>{showAll ? "Show Fewer Questions" : `See More Questions (+${faqs.length - 3} More)`}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
          </button>

          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#0A1022] hover:bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>All 100+ Statutory FAQs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
