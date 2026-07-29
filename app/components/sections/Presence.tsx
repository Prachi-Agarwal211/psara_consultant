"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Chapter from "../layout/Chapter";
import { OFFICES } from "../../../lib/config";
import { lineByLineReveal, ensureGsap, storyEnter } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

const highlightStates = [
  { name: "Rajasthan", slug: "rajasthan", note: "HQ · Rules 2022 · Group-9 Home Dept" },
  { name: "Delhi", slug: "delhi", note: "Police portal · fast digital path" },
  { name: "Haryana", slug: "haryana", note: "Commercial office · Form-V culture" },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", note: "Extended verification corridors" },
  { name: "Gujarat", slug: "gujarat", note: "Industrial west · training proof" },
  { name: "Maharashtra", slug: "maharashtra", note: "Inspection-heavy · Rules 2022" },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", note: "Often 1-year validity — plan renewals" },
  { name: "Karnataka", slug: "karnataka", note: "ISD Bengaluru · digital filings" },
];

export default function Presence() {
  const root = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

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

  const desks = OFFICES.slice(0, 8);

  return (
    <Chapter id="presence" tone="warm-dark">
      <div ref={root} className="binding-rail pl-0 md:pl-6">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5" data-story>
            <h2 ref={headingRef} className="display-xl text-[var(--cream)]">
              Pan-India <span className="text-[var(--gold)]">Coverage</span>
            </h2>
            <p className="body-copy mt-4 text-[var(--cream-warm)]">
              Real desks with full addresses — not a franchise icon map. Pan-India filings are
              coordinated from Jaipur headquarters with field presence across Delhi NCR, Gujarat,
              Madhya Pradesh, Uttar Pradesh, Punjab, and Rajasthan corridors.
            </p>
            <p className="mt-4 text-sm font-semibold text-[var(--cream-warm)]">
              There is <strong className="text-[var(--gold)]">no all-India PSARA licence</strong>.
              Each State Controlling Authority issues its own grant. We sequence multi-state growth
              after home-State stability.
            </p>
            <Link
              href="/states"
              className="mt-6 inline-block text-sm font-bold text-[var(--gold)] underline"
            >
              Browse all State PSARA guides →
            </Link>
          </div>

          <div className="relative lg:col-span-7" data-story>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] border border-[var(--line-gold)] p-6 md:p-10"
                 style={{ backgroundColor: "var(--warm-dark-2, #241e16)" }}>
              {/* Jasmine-style corner ornaments */}
              <CornerOrnament position="tl" size="lg" opacity={0.3} />
              <CornerOrnament position="tr" size="lg" opacity={0.3} />
              <CornerOrnament position="bl" size="lg" opacity={0.3} />
              <CornerOrnament position="br" size="lg" opacity={0.3} />

              <div className="absolute inset-0 opacity-20 brightness-200 invert filter">
                <Image
                  src="/assets/images/india-map.svg"
                  alt="India coverage map for PSARA licensing"
                  fill
                  className="object-contain p-6"
                />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                    Pan-India filings
                  </span>
                  <span className="tag-chip">
                    28+ States & UTs
                  </span>
                </div>
                <div className="my-auto pt-6">
                  <p className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight text-[var(--cream)] md:text-6xl">
                    200+
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] mt-2">
                    City pages · State-wise Controlling Authority paths
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12" data-story>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-4">
            Priority State corridors
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlightStates.map((s) => (
              <Link
                key={s.slug}
                href={`/states/${s.slug}`}
                data-cursor={s.name}
                className="border border-[var(--line-gold)] rounded-[var(--radius)] p-4 hover:border-[var(--gold)] transition-colors"
                style={{ backgroundColor: "var(--warm-dark-2, #241e16)" }}
              >
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
                  {s.name}
                </p>
                <p className="mt-1 text-xs font-medium text-[var(--text-dim)]">{s.note}</p>
              </Link>
            ))}
          </div>
        </div>

        <div data-story>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-4">
            Operational desks
          </p>
          {desks.map((o) => (
            <div key={o.city} className="office-line">
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
                {o.city}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">{o.badge}</span>
              <span className="text-sm font-medium text-[var(--cream-warm)]">
                {o.address}, {o.pin}
              </span>
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-6 inline-block text-sm font-bold text-[var(--gold)] underline"
          >
            Full office list & maps →
          </Link>
        </div>
      </div>
    </Chapter>
  );
}
