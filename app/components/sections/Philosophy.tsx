"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { lineByLineReveal, initParallaxImage, initFluidLine } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

export default function Philosophy() {
  const root = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const fluidRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;

    if (imgRef.current) {
      initParallaxImage(imgRef.current, root.current);
    }
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
    if (fluidRef.current) {
      initFluidLine(fluidRef.current, { trigger: root.current });
    }
  }, []);

  return (
    <section
      id="philosophy"
      ref={root}
      className="relative h-[75vh] md:h-[85vh] overflow-hidden text-[var(--cream)]"
      style={{ backgroundColor: "var(--warm-dark, #1a1510)" }}
    >
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/assets/images/government-building.jpg"
          alt="Government Controlling Authority"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--warm-dark, #1a1510) 0%, rgba(26, 21, 16, 0.65) 50%, var(--warm-dark, #1a1510) 100%)",
          }}
        />
      </div>

      {/* Fluid line SVG — organic gold bezier that draws on scroll */}
      <div
        ref={fluidRef}
        className="fluid-line"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fluid-path"
            d="M0 45 C 200 10, 400 55, 600 30 S 800 10, 1000 40 S 1100 15, 1200 35"
            stroke="var(--gold)"
            strokeWidth="1.5"
            opacity="0.35"
          />
          <path
            className="fluid-path"
            d="M0 45 C 200 10, 400 55, 600 30 S 800 10, 1000 40 S 1100 15, 1200 35"
            stroke="var(--gold)"
            strokeWidth="0.5"
            opacity="0.15"
            transform="translate(0, 6)"
          />
          <path
            className="fluid-path"
            d="M0 50 C 200 25, 400 40, 600 35 S 800 25, 1000 45 S 1100 30, 1200 42"
            stroke="var(--gold)"
            strokeWidth="0.5"
            opacity="0.1"
            transform="translate(0, -4)"
          />
        </svg>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">          <div className="text-center px-[var(--gutter)] max-w-4xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)] mb-4">
            Statute-First · Verification-Ready · Post-Grant Discipline
          </span>
          <h2 ref={headingRef} className="display-xl text-[var(--cream)] split-heading relative pl-4 md:pl-8">
            <span className="side-caption" aria-hidden>STATUTE-FIRST</span>
            Every dossier maps directly to the
            <br />
            <span className="text-[var(--gold)] font-bold">PSARA Act, 2005</span>
          </h2>
          <p className="mt-6 text-sm md:text-base max-w-xl mx-auto leading-relaxed text-[var(--cream-warm)]">
            We compose the application the Authority expects — objects, office proof,
            training MOU, and antecedent clearance. Not a recycled internet checklist.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            {[
              { num: '01', title: 'Statute-First Filing', desc: 'Objects · Office · MOA' },
              { num: '02', title: 'Antecedent Verification', desc: 'Police · SP · Liasion' },
              { num: '03', title: 'Post-Grant Compliance', desc: 'Renewal · Expansion · Labour' },
            ].map((item) => (
              <div key={item.num}
                   className="relative border border-[var(--line-gold)] p-5 rounded-[var(--radius)] frame-double card-glow-hover"
                   style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2, #241e16) 90%, transparent)" }}>
                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="br" />

                <span className="num-marker block mb-2">{item.num}</span>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  {item.title}
                </div>
                <p className="mt-1 text-[10px] font-medium text-[var(--cream-warm)]/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
