"use client";

import { Star, CheckCircle } from "lucide-react";
import { GOOGLE_REVIEWS } from "../../../lib/config";

const sampleReviews = [
  {
    name: "Vikramaditya Singh",
    role: "Managing Director, Apex Security Services",
    text: "PSARA Consultant India handled our multi-district filing in Rajasthan with complete precision. Clear document checklist, training MOU facilitation, and zero delay in Controlling Authority submission.",
    rating: 5,
    city: "Jaipur",
  },
  {
    name: "Rajesh K. Verma",
    role: "Proprietor, Shield Force Security",
    text: "Got our Delhi PSARA License approved smoothly. Their team guided us through police antecedent verification and commercial office proof norms perfectly.",
    rating: 5,
    city: "New Delhi",
  },
  {
    name: "Harpreet Singh Johar",
    role: "Director, Fortress Protection LLP",
    text: "Extremely professional team. Helped us navigate the Haryana portal and training MOU requirements without any query rejections.",
    rating: 5,
    city: "Gurugram",
  },
];

export default function GoogleReviews({ variant = "full" }: { variant?: "full" | "compact" }) {
  return (
    <section
      id="reviews"
      className="py-20 md:py-32 px-[var(--gutter)] theme-paper-jasmine border-b border-[var(--line-light)]"
    >
      <div className="max-w-[var(--page-max)] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--line-light)] pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--amber)] mb-2">
              <span>VERIFIED CLIENT FEEDBACK</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[var(--text-dark)] uppercase">
              CLIENT REVIEWS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[var(--amber)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--text-dark)]">
              {GOOGLE_REVIEWS.ratingLabel} ({GOOGLE_REVIEWS.reviewCount})
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {sampleReviews.map((r, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg border border-[var(--line-light)] bg-white shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[var(--amber)]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--cream-bg)] border border-[var(--line-light)] text-[var(--text-dark-muted)]">
                    {r.city}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[var(--text-dark-muted)] leading-relaxed italic mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line-light)] flex items-center justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--text-dark)]">
                    {r.name}
                  </h3>
                  <span className="text-[0.6rem] font-medium text-[var(--text-dark-faint)] block">
                    {r.role}
                  </span>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Button */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS.writeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Write Review"
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-[var(--obsidian-bg)] text-white font-bold text-xs uppercase tracking-widest hover:bg-[var(--amber)] hover:text-black transition-colors duration-300"
          >
            Read All Reviews on Google Business Profile
          </a>
        </div>
      </div>
    </section>
  );
}
