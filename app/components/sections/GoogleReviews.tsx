"use client";

import { Star, CheckCircle, Quote, Sparkles } from "lucide-react";
import { CLIENT_REVIEWS } from "../../../data/reviews";
import { GOOGLE_REVIEWS } from "../../../lib/config";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-[#D4AF37] text-[#8F681B]" : "text-slate-300"}`} />
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
      className="on-light relative overflow-hidden text-[#0F172A] py-20 lg:py-28 border-b border-[#E5DDF3]"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5DDF3] pb-8 gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8F681B]" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#8F681B]" />
              Client Proof &amp; Track Record
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Proof in <span className="text-[#8F681B]">the Field</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#D4AF37] text-[#8F681B]" />
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

        {/* Review Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Review */}
          <figure className="relative lg:col-span-7 rounded-3xl border border-[#E5DDF3] bg-[#F4F0FA] p-8 md:p-10 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Stars count={featured.rating} />
                <span className="rounded-lg border border-[#D4AF37] bg-[#FFF0B8]/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  {featured.state?.toUpperCase()}
                </span>
              </div>
              <blockquote className="text-xl md:text-2xl font-bold text-[#0F172A] leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            </div>

            <figcaption className="mt-8 pt-6 border-t border-[#E5DDF3] flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-[#8F681B]" style={{ fontFamily: "var(--font-display)" }}>{featured.name}</p>
                <p className="text-xs font-medium text-[#64748B]">{featured.company} · {featured.city}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-[#8F681B] shrink-0" />
            </figcaption>
          </figure>

          {/* Stacked Reviews */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {rest.map((r) => (
              <figure key={r.name} className="rounded-2xl border border-[#E5DDF3] bg-[#F4F0FA] p-6 flex flex-col justify-between shadow-sm transition-[border-color,box-shadow,transform] hover:border-[#C89B3C]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Stars count={r.rating} />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8F681B]">{r.service}</span>
                  </div>
                  <blockquote className="text-sm font-normal leading-relaxed text-[var(--ink-soft,#443A61)] italic">
                    &ldquo;{r.quote.slice(0, 150)}{r.quote.length > 150 ? "…" : ""}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-4 pt-3 border-t border-[#E5DDF3] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{r.name}</p>
                    <p className="text-xs font-medium text-[#64748B]">{r.company} · {r.city}</p>
                  </div>
                  <Quote className="h-4 w-4 text-[#8F681B]" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <a
            href={GOOGLE_REVIEWS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--canvas-void,#080611)] hover:bg-[#180D36] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-[border-color,box-shadow,transform] shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Read All Reviews on Google Business Profile</span>
            <Star className="h-4 w-4 fill-[#F5D061] text-[#8F681B]" />
          </a>
        </div>
      </div>
    </section>
  );
}
