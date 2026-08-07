"use client";

import { Star, CheckCircle, Quote } from "lucide-react";
import { CLIENT_REVIEWS } from "../../../data/reviews";
import { GOOGLE_REVIEWS } from "../../../lib/config";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-[var(--gold-bright)] text-[var(--gold-bright)]" : "text-white/15"}`} />
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
      className="relative overflow-hidden section-void py-[var(--section-y)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40vh] w-[70vw] opacity-60" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,102,255,0.12) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 px-[var(--gutter)] max-w-[var(--page-max)] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-14 gap-6">
          <div>
            <span className="meta-bracket mb-4 text-xs! text-[var(--gold)]! border-[var(--gold)]/30! inline-block" style={{ fontFamily: "var(--font-body)" }}>
              ( CLIENT PROOF )
            </span>
            <h2
              className="display-mega text-white font-bold mt-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Proof in <span className="text-metal">the Field</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[var(--gold-bright)] text-[var(--gold-bright)]" />
              ))}
            </div>
            <div>
              <span className="block font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {GOOGLE_REVIEWS.ratingLabel}
              </span>
              <span className="block text-xs font-bold uppercase tracking-widest text-white/40">
                {GOOGLE_REVIEWS.reviewCount} Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Asymmetric review layout — featured + stacked (hover dims siblings) */}
        <div className="feature-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured review */}
          <figure className="feature-card relative lg:col-span-7 border border-[var(--gold)]/30 bg-white/[0.02] p-8 md:p-10 flex flex-col justify-between overflow-hidden">
            <span className="pointer-events-none absolute -top-6 right-4 font-mono text-[5rem] leading-none text-[var(--gold)]/10" aria-hidden>”</span>

            <div>
              <div className="flex items-center justify-between mb-6">
                <Stars count={featured.rating} />
                <span className="meta-bracket text-xs!" style={{ fontFamily: "var(--font-body)" }}>
                  {featured.state?.toUpperCase()}
                </span>
              </div>
              <blockquote className="quote-large text-[1.35rem]! md:text-[1.8rem]!">
                {featured.quote}
              </blockquote>
            </div>

            <figcaption className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm text-white" style={{ fontFamily: "var(--font-display)" }}>{featured.name}</p>
                <p className="text-xs text-white/50">{featured.company} · {featured.city}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-[var(--gold-bright)] shrink-0" />
            </figcaption>
          </figure>

          {/* Stacked reviews */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between feature-grid">
            {rest.map((r) => (
              <figure key={r.name} className="feature-card border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between transition-colors hover:border-[var(--gold)]/40">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Stars count={r.rating} />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/55">{r.service}</span>
                  </div>
                  <blockquote className="text-sm leading-relaxed text-[var(--white-85)] italic" style={{ color: "var(--white-70)" }}>
                    &ldquo;{r.quote.slice(0, 150)}{r.quote.length > 150 ? "…" : ""}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{r.name}</p>
                    <p className="text-xs text-white/45">{r.company} · {r.city}</p>
                  </div>
                  <Quote className="h-4 w-4 text-white/20" />
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
            data-cursor="Read Reviews"
            className="btn-magnetic"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>All Reviews on Google Business Profile</span>
            <Star className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
