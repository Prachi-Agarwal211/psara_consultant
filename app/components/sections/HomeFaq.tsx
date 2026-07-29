"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle } from "lucide-react";
import Chapter from "../layout/Chapter";
import { FAQS } from "../../../data/faq";
import { lineByLineReveal, ensureGsap, storyEnter } from "../../lib/gsap";

const HOME_FAQ_SLUGS = [
  "What is a PSARA License?",
  "Can one PSARA License cover multiple States?",
  "How long does PSARA approval take?",
  "Is training MOU mandatory?",
  "Do directors need police verification?",
  "What documents are required for PSARA?",
];

export default function HomeFaq() {
  const root = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const items = HOME_FAQ_SLUGS.map((q) => FAQS.find((f) => f.q === q)).filter(
    Boolean
  ) as typeof FAQS;

  useEffect(() => {
    if (!root.current) return;
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      storyEnter(root.current!);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Chapter id="faq" tone="warm-parchment">
      <div ref={root}>
        <div className="mb-10 max-w-2xl" data-story>
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-4 w-4 text-[var(--gold)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Founder FAQ Briefing
            </span>
          </div>
          <h2 ref={headingRef} className="display-xl text-[var(--ink)] font-bold">
            Questions Agency Owners <span className="text-[var(--gold)]">Ask First</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--ink-muted)] leading-relaxed font-medium">
            Straight answers based on the PSARA Act 2005 and State Home Department controlling authority rules.
          </p>
        </div>

        <div className="divide-y divide-[var(--ink)]/15 border-t border-b border-[var(--ink)]/15" data-story>
          {items.map((f, idx) => (
            <details key={f.q} className="group py-5 transition-colors relative">
              <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] hover:text-[var(--gold)] flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="num-marker num-marker-sm text-xs text-[var(--gold)] font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="text-[var(--gold)] font-bold mr-2">Q.</span>
                    {f.q}
                  </span>
                </span>
                <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[var(--ink)]/30 text-[var(--ink)] transition-transform duration-300 group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--ink-muted)] pl-12 font-medium">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between" data-story>
          <Link
            href="/faq"
            className="btn-ghost text-[var(--ink)] border-[var(--ink)]/30 hover:border-[var(--ink)] hover:text-[var(--ink)]"
          >
            Browse All 104 PSARA FAQs <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Chapter>
  );
}
