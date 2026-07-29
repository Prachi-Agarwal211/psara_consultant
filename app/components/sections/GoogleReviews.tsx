"use client";

import { Star, ExternalLink, Quote, MapPin } from "lucide-react";
import Chapter from "../layout/Chapter";
import CornerOrnament from "../ui/CornerOrnament";
import { GOOGLE_REVIEWS } from "../../../lib/config";
import { CLIENT_REVIEWS } from "../../../data/reviews";
import type { ClientReview } from "../../../data/reviews";

function Stars({ value = 5, size = 14 }: { value?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= value ? "var(--gold)" : "transparent"}
          stroke={i <= value ? "var(--gold)" : "color-mix(in srgb, var(--ink) 20%, transparent)"}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function ReviewCard({ review, index }: { review: ClientReview; index: number }) {
  return (
    <div
      className="relative flex flex-col justify-between rounded-[var(--radius)] border p-5 md:p-6 transition-all duration-300 card-glow-hover"
      style={{
        borderColor: "color-mix(in srgb, var(--ink) 20%, transparent)",
        backgroundColor: "var(--white)",
      }}
    >
      <CornerOrnament position="tl" opacity={0.2} size="sm" />

      <div>
        {/* Star rating */}
        <div className="mb-3">
          <Stars value={review.rating} size={14} />
        </div>

        {/* Quote icon */}
        <Quote
          className="mb-2"
          size={18}
          style={{ color: "color-mix(in srgb, var(--gold) 25%, transparent)" }}
          aria-hidden="true"
        />

        {/* Review text */}
        <p
          className="text-sm leading-relaxed font-medium"
          style={{ color: "var(--ink-muted)" }}
        >
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Author + meta */}
      <div
        className="mt-5 pt-4"
        style={{ borderTop: "1px solid color-mix(in srgb, var(--ink) 10%, transparent)" }}
      >
        <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
          {review.name}
        </p>
        <p className="text-xs font-semibold" style={{ color: "var(--sapphire-deep)" }}>
          {review.company}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {review.city && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-medium"
              style={{ color: "var(--ink-faint)" }}
            >
              <MapPin size={10} aria-hidden="true" /> {review.city}
            </span>
          )}
          {review.service && (
            <span
              className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "color-mix(in srgb, var(--gold) 12%, transparent)",
                color: "var(--gold-deep)",
              }}
            >
              {review.service}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: CLIENT_REVIEWS.map((rev, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: rev.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.rating,
        bestRating: "5",
      },
      reviewBody: rev.quote,
    },
  })),
};

type Props = {
  variant?: "full" | "compact";
  className?: string;
};

export default function GoogleReviews({ variant = "full", className = "" }: Props) {
  const reviews = variant === "compact" ? CLIENT_REVIEWS.slice(0, 3) : CLIENT_REVIEWS;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <Chapter id="reviews" tone="paper" className={className}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Stars value={5} size={18} />
              <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                {GOOGLE_REVIEWS.rating} / 5.0
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>
                ({GOOGLE_REVIEWS.reviewCount} Verified Google Reviews)
              </span>
            </div>
            <h2 className="display-xl" style={{ color: "var(--ink)" }}>
              What Our <span style={{ color: "var(--gold-deep)" }}>Clients Say</span>
            </h2>
            <p
              className="mt-2 text-sm max-w-lg font-medium"
              style={{ color: "var(--ink-muted)" }}
            >
              Trusted by security agency founders and operations heads across India.
              Real feedback from businesses we&apos;ve helped with PSARA licensing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={GOOGLE_REVIEWS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost shrink-0"
              style={{
                color: "var(--ink)",
                borderColor: "color-mix(in srgb, var(--ink) 30%, transparent)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--ink)";
                e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "color-mix(in srgb, var(--ink) 30%, transparent)";
                e.currentTarget.style.color = "var(--ink)";
              }}
            >
              View Google Profile <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={GOOGLE_REVIEWS.writeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold shrink-0"
            >
              Write a Review
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((rev, idx) => (
            <ReviewCard key={`${rev.name}-${rev.company}`} review={rev} index={idx} />
          ))}
        </div>

        {/* Compact CTA note */}
        {variant === "compact" && (
          <div className="mt-8 text-center">
            <a
              href={GOOGLE_REVIEWS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider underline"
              style={{ color: "var(--gold-deep)" }}
            >
              View all reviews on Google <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </Chapter>
    </>
  );
}
