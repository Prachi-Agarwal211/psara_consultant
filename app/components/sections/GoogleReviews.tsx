"use client";

import { Star, CheckCircle2 } from "lucide-react";
import Chapter from "../layout/Chapter";
import CornerOrnament from "../ui/CornerOrnament";
import { CONTACT } from "../../../lib/config";

const reviews = [
  {
    name: "Rajesh Sharma",
    role: "Managing Director, Apex Security Services",
    state: "Rajasthan (Jaipur HQ)",
    text: "PSARA Consultant handled our complete dossier filing and institute MOU within 25 days. Controlling Authority inspection passed without a single query.",
    rating: 5,
  },
  {
    name: "Vikramjit Singh",
    role: "Founder, Punjab Guard Operations",
    state: "Punjab & Haryana Desk",
    text: "Got our multi-state PSARA license approved for Delhi NCR and Punjab. The Jaipur HQ team knows every state legal nuance perfectly.",
    rating: 5,
  },
  {
    name: "Ankit Verma",
    role: "CEO, ShieldCorp Protection Ltd",
    state: "Delhi NCR Desk",
    text: "Outstanding service for PSARA renewal and director police antecedent clearance. Highly professional legal team.",
    rating: 5,
  },
];

export default function GoogleReviews() {
  return (
    <Chapter id="reviews" tone="paper">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-[var(--gold)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[var(--gold)]" />
              ))}
            </div>
            <span className="text-sm font-bold text-[var(--ink)]">{CONTACT.googleReviews.rating} / 5.0</span>
            <span className="text-xs text-[var(--ink-muted)]">({CONTACT.googleReviews.count} Verified Google Reviews)</span>
          </div>
          <h2 className="display-xl text-[var(--ink)]">
            Trusted by Security Agency Founders Across India
          </h2>
        </div>
        <a
          href={CONTACT.googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-[var(--ink)] border-[var(--ink)]/30 hover:border-[var(--ink)] hover:text-[var(--ink)] shrink-0"
        >
          <CheckCircle2 className="h-4 w-4 text-[var(--emerald-deep)]" />
          Google Business Reviews
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="relative flex flex-col justify-between border border-[var(--ink)]/20 bg-white p-6 rounded-[var(--radius)] card-glow-hover"
          >
            {/* Corner ornament — subtle */}
            <CornerOrnament position="tl" opacity={0.25} />

            {/* Number marker */}
            <span className="num-marker num-marker-sm absolute top-3 right-3">
              {String(idx + 1).padStart(2, '0')}
            </span>

            <div>
              <div className="flex text-[var(--gold)] mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[var(--gold)]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-muted)] font-medium">
                &quot;{rev.text}&quot;
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--ink)]/10">
              <h4 className="text-sm font-bold text-[var(--ink)]">{rev.name}</h4>
              <p className="text-xs font-semibold text-[var(--sapphire-deep)]">{rev.role}</p>
              <span className="text-[11px] font-medium text-[var(--ink-faint)]">{rev.state}</span>
            </div>
          </div>
        ))}
      </div>
    </Chapter>
  );
}
