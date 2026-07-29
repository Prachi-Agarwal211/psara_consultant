"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Clock, ShieldCheck, Banknote } from "lucide-react";
import Chapter from "../layout/Chapter";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { lineByLineReveal, cardStaggerReveal } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

const states = [
  { name: "Rajasthan (HQ)", fee: "₹5,000–₹25,000", time: "25–40 Days", validity: "5 Years", code: "RJ" },
  { name: "Delhi NCR", fee: "₹5,000–₹25,000", time: "30–45 Days", validity: "5 Years", code: "DL" },
  { name: "Gujarat", fee: "₹5,000–₹25,000", time: "25–35 Days", validity: "5 Years", code: "GJ" },
  { name: "Madhya Pradesh", fee: "₹5,000–₹25,000", time: "30–40 Days", validity: "5 Years", code: "MP" },
  { name: "Uttar Pradesh", fee: "₹5,000–₹25,000", time: "35–50 Days", validity: "5 Years", code: "UP" },
  { name: "Maharashtra", fee: "₹5,000–₹25,000", time: "30–45 Days", validity: "5 Years", code: "MH" },
  { name: "Haryana", fee: "₹5,000–₹25,000", time: "25–35 Days", validity: "5 Years", code: "HR" },
  { name: "Punjab", fee: "₹5,000–₹25,000", time: "30–40 Days", validity: "5 Years", code: "PB" },
  { name: "Karnataka", fee: "₹5,000–₹25,000", time: "30–45 Days", validity: "5 Years", code: "KA" },
  { name: "Telangana", fee: "₹5,000–₹25,000", time: "25–35 Days", validity: "5 Years", code: "TS" },
  { name: "Tamil Nadu", fee: "₹5,000–₹25,000", time: "30–45 Days", validity: "5 Years", code: "TN" },
  { name: "West Bengal", fee: "₹5,000–₹25,000", time: "35–50 Days", validity: "5 Years", code: "WB" },
];

export default function StateGridHome() {
  const root = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
    cardStaggerReveal(root.current, ".state-card");
  }, []);

  return (
    <Chapter id="coverage" tone="warm-dark">
      <div ref={root}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 ref={headingRef} className="display-xl text-[var(--cream)] split-heading relative pl-4 md:pl-8">
              <span className="side-caption" aria-hidden>COVERAGE METRICS</span>
              State-Wise <span className="text-[var(--gold)]">PSARA Licensing Metrics</span>
            </h2>
          </div>
          <Link
            href="/states"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--gold)] hover:underline"
          >
            Explore All 28 States & UTs <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {states.map((st, idx) => (
            <div
              key={st.code}
              className="state-card flex flex-col justify-between rounded-[var(--radius)] border border-[var(--line-gold)] p-4 transition-all duration-300 hover:border-[var(--gold)] card-glow-hover relative"
              style={{ backgroundColor: "var(--warm-dark-2, #241e16)" }}
            >
              {/* Jasmine-style corner ornament */}
              <CornerOrnament position="tr" opacity={0.3} />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2">
                    <span className="num-marker num-marker-sm text-xs">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-xs font-bold text-[var(--gold)] px-2 py-0.5 rounded border border-[var(--line-gold)]"
                         style={{ backgroundColor: "var(--warm-dark, #1a1510)" }}>
                      {st.code}
                    </span>
                  </span>
                  <span className="text-[10px] text-[var(--text-dim)]">Controlling Authority</span>
                </div>
                <h3 className="text-base font-bold text-[var(--cream)]">
                  {st.name}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-[var(--cream)]/70">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-3.5 w-3.5 text-[var(--gold)] shrink-0" />
                    <span>Govt Fee: <strong>{st.fee}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[var(--sky)] shrink-0" />
                    <span>Processing: <strong>{st.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--emerald)] shrink-0" />
                    <span>Validity: <strong>{st.validity}</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between">
                <Link href="/states" className="text-[11px] font-bold text-[var(--text-dim)] hover:text-[var(--cream)]">
                  Details
                </Link>
                <a
                  href={`${DEFAULT_WA}&text=Hi,%20I%20need%20PSARA%20license%20support%20for%20${encodeURIComponent(st.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[var(--gold)] hover:underline flex items-center gap-1"
                >
                  Apply <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
