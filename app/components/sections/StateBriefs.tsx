"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ensureGsap, ease, storyEnter } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

const briefs = [
  {
    number: "01",
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    note: "Often 1-year validity — plan renewals early",
    tag: "RENEWAL ALERT",
    image: "/assets/images/government-building.jpg",
    stat: "1-Year Validity",
  },
  {
    number: "02",
    name: "Delhi",
    slug: "delhi",
    note: "Police portal enables fast digital filing",
    tag: "FAST TRACK",
    image: "/assets/images/modern-office-building.jpg",
    stat: "30–45 Days",
  },
  {
    number: "03",
    name: "Haryana",
    slug: "haryana",
    note: "Commercial office required — Form-V culture",
    tag: "OFFICE CHECK",
    image: "/assets/images/office-team-working.jpg",
    stat: "Form-V Required",
  },
  {
    number: "04",
    name: "Gujarat",
    slug: "gujarat",
    note: "Industrial west — training MOU proof essential",
    tag: "TRAINING FOCUS",
    image: "/assets/images/security-guard-building.jpg",
    stat: "25–35 Days",
  },
  {
    number: "05",
    name: "Maharashtra",
    slug: "maharashtra",
    note: "Inspection-heavy — premises readiness key",
    tag: "INSPECTION",
    image: "/assets/images/business-meeting.jpg",
    stat: "Inspection Required",
  },
  {
    number: "06",
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    note: "Extended verification corridors across districts",
    tag: "VERIFICATION",
    image: "/assets/images/consultation-meeting.jpg",
    stat: "35–50 Days",
  },
];

export default function StateBriefs() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      storyEnter(root.current!);

      // Staggered card entrance
      const cards = root.current!.querySelectorAll("[data-brief-card]");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: ease.expo,
            scrollTrigger: {
              trigger: root.current!,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="briefs"
      ref={root}
      className="section theme-ink relative overflow-hidden bg-[var(--obsidian)]"
    >
      {/* Corner ornaments — Jasmine style on section frame */}
      <CornerOrnament position="tl" size="lg" opacity={0.3} className="absolute" style={{ top: '1rem', left: '1rem' }} />
      <CornerOrnament position="br" size="lg" opacity={0.3} className="absolute" style={{ bottom: '1rem', right: '1rem' }} />

      <div className="section-inner">
        {/* Jasmine-style: Marquee heading + tags with ornament chain */}
        <div className="mb-12" data-story>
          <div className="ornament-chain mb-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="orn-link">
                <div className="t-line">
                  <div className="t-line__1"></div>
                  <div className="t-line__2"></div>
                  <div className="t-line__3"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-2 overflow-hidden">
            <div className="state-briefs-marquee">
              <span className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,4.5rem)] font-bold uppercase tracking-tight text-[var(--cream)]/5">
                STATE BRIEFS&nbsp;&bull;&nbsp;STATE BRIEFS&nbsp;&bull;&nbsp;STATE BRIEFS&nbsp;&bull;&nbsp;
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--line-gold)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] shrink-0">
              SHORT, STATE-SPECIFIC INSIGHTS
            </span>
            <div className="h-px flex-1 bg-[var(--line-gold)]" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="tag-chip">
              <span>EXPERT BRIEFS</span>
            </div>
          </div>
        </div>

        {/* Numbered state cards — Jasmine Break style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line-gold)]/20" data-story>
          {briefs.map((b) => (
            <Link
              key={b.slug}
              data-brief-card
              data-cursor={`${b.name}`}
              href={`/states/${b.slug}`}
              className="state-brief-card group relative flex flex-col justify-between bg-[var(--obsidian)] p-6 md:p-8 transition-all duration-300 hover:bg-[var(--obsidian-2)]"
            >
              {/* Hover image preview (like Jasmine's data-img pattern) */}
              <div className="state-brief-preview pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-[0.06]">
                <Image
                  src={b.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Top section */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold font-[family-name:var(--font-display)] text-[var(--gold)]/30">
                    {b.number}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-[var(--gold)]/30 text-[var(--gold)] bg-[var(--obsidian-2)]">
                    {b.tag}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)] transition-colors duration-300 group-hover:text-[var(--gold)]">
                  {b.name}
                </h3>

                <p className="mt-2 text-xs font-medium text-[var(--text-dim)] leading-relaxed">
                  {b.note}
                </p>
              </div>

              {/* Bottom section */}
              <div className="relative z-10 mt-6 pt-4 border-t border-[var(--line-gold)]/20 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  {b.stat}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--cream)]/40 transition-colors duration-300 group-hover:text-[var(--gold)]">
                  Read brief
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center" data-story>
          <Link
            href="/states"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)] hover:underline"
          >
            Browse All 28 States & UTs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
