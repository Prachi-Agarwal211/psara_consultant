"use client";

import { Star, CheckCircle, Quote, Sparkles } from "lucide-react";
import { CLIENT_REVIEWS } from "../../../data/reviews";
import { GOOGLE_REVIEWS } from "../../../lib/config";
import Reveal from "../ui/Reveal";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-[#FF7A00] text-[#E76F00]" : "text-slate-300"}`} />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  const featured = CLIENT_REVIEWS[0]!;
  const rest = CLIENT_REVIEWS.slice(1, 4);

  return (
    <section
      id="reviews"
      className="on-light relative overflow-hidden text-[#0F172A] py-20 lg:py-28 border-b border-[var(--line-light)]"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8DFC8] pb-8 gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#B35400]" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#B35400]" />
              Client Proof &amp; Track Record
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Proof in <span className="text-[#B35400]">the Field</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#FF7A00] text-[#E76F00]" />
              ))}
            </div>
            <div>
              <span className="block font-bold text-xl text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>
                {GOOGLE_REVIEWS.ratingLabel}
              </span>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">
                {GOOGLE_REVIEWS.reviewCount} Google Reviews
              </span>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Review Layout */}
        <Reveal delay={110} variant="scale">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Review */}
          <figure className="card-lift relative lg:col-span-7 rounded-xl border border-[var(--line-light)] bg-white p-8 md:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Stars count={featured.rating} />
                <span className="rounded-lg border border-[#FF7A00] bg-[#FFE8D1]/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  {featured.state?.toUpperCase()}
                </span>
              </div>
              <blockquote className="text-xl md:text-2xl font-bold text-[#0F172A] leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            </div>

            <figcaption className="mt-8 pt-6 border-t border-[#E8DFC8] flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-[#B35400]" style={{ fontFamily: "var(--font-display)" }}>{featured.name}</p>
                <p className="text-xs font-medium text-[#64748B]">{featured.company} · {featured.city}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-[#E76F00] shrink-0" />
            </figcaption>
          </figure>

          {/* Stacked Reviews */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {rest.map((r) => (
              <figure key={r.name} className="card-lift card-glow rounded-xl border border-[var(--line-light)] bg-white p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Stars count={r.rating} />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B35400]">{r.service}</span>
                  </div>
                  <blockquote className="text-sm font-normal leading-relaxed text-[var(--ink-soft,#33465F)] italic">
                    &ldquo;{r.quote.slice(0, 150)}{r.quote.length > 150 ? "…" : ""}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-4 pt-3 border-t border-[#E8DFC8] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{r.name}</p>
                    <p className="text-xs font-medium text-[#64748B]">{r.company} · {r.city}</p>
                  </div>
                  <Quote className="h-4 w-4 text-[#E76F00]" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        </Reveal>

        {/* CTA */}
        <div className="text-center pt-4">
          <a
            href={GOOGLE_REVIEWS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 rounded-xl grad-navy px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Read All Reviews on Google Business Profile</span>
            <Star className="h-4 w-4 fill-[#FFB25E] text-[#E76F00]" />
          </a>
        </div>
      </div>
    </section>
  );
}
