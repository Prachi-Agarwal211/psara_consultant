"use client";

import { Star, CheckCircle, Quote } from "lucide-react";
import { CLIENT_REVIEWS } from "../../../data/reviews";
import { GOOGLE_REVIEWS } from "../../../lib/config";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-[#C89B3C] text-[#C89B3C]" : "text-white/15"}`} />
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
      data-section-transition
      data-transition="clip-left"
      className="relative overflow-hidden bg-gradient-to-b from-[#0A233F] via-[#0F3C65] to-[#07192C] text-white py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40vh] w-[70vw] bg-[#C89B3C] blur-3xl" />
      </div>

      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-8 mb-14 gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FFF2BA] block mb-2" style={{ fontFamily: "var(--font-body)" }}>
              ( CLIENT PROOF )
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Proof in <span className="text-[#FFF2BA]">the Field</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#C89B3C] text-[#C89B3C]" />
              ))}
            </div>
            <div>
              <span className="block font-black text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                {GOOGLE_REVIEWS.ratingLabel}
              </span>
              <span className="block text-xs font-black uppercase tracking-widest text-slate-300">
                {GOOGLE_REVIEWS.reviewCount} Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Asymmetric review layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured review */}
          <figure className="relative lg:col-span-7 rounded-3xl border-2 border-[#C89B3C]/40 bg-[#07192C]/90 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl">
            <span className="pointer-events-none absolute -top-6 right-4 font-mono text-[6rem] leading-none text-[#C89B3C]/20" aria-hidden>”</span>

            <div>
              <div className="flex items-center justify-between mb-6">
                <Stars count={featured.rating} />
                <span className="rounded-lg border border-[#C89B3C] bg-[#FFF2BA] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0F3C65]">
                  {featured.state?.toUpperCase()}
                </span>
              </div>
              <blockquote className="text-xl md:text-2xl font-black text-white leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            </div>

            <figcaption className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
              <div>
                <p className="text-base font-black text-[#FFF2BA]" style={{ fontFamily: "var(--font-display)" }}>{featured.name}</p>
                <p className="text-xs font-bold text-slate-300">{featured.company} · {featured.city}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-[#C89B3C] shrink-0" />
            </figcaption>
          </figure>

          {/* Stacked reviews */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {rest.map((r) => (
              <figure key={r.name} className="rounded-2xl border border-white/15 bg-white/10 p-6 flex flex-col justify-between transition-all hover:border-[#FFF2BA] hover:bg-white/15 shadow-lg backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Stars count={r.rating} />
                    <span className="text-xs font-black uppercase tracking-widest text-[#FFF2BA]">{r.service}</span>
                  </div>
                  <blockquote className="text-sm font-medium leading-relaxed text-slate-100 italic">
                    &ldquo;{r.quote.slice(0, 150)}{r.quote.length > 150 ? "…" : ""}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-white">{r.name}</p>
                    <p className="text-xs font-bold text-slate-300">{r.company} · {r.city}</p>
                  </div>
                  <Quote className="h-4 w-4 text-[#C89B3C]" />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href={GOOGLE_REVIEWS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFF2BA] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F3C65] hover:bg-white transition-all shadow-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>All Reviews on Google Business Profile</span>
            <Star className="h-4 w-4 fill-[#0F3C65] text-[#0F3C65]" />
          </a>
        </div>
      </div>
    </section>
  );
}
