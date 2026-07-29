"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { STATES } from "../../../data/states";

export default function StateGridHome() {
  const featuredStates = STATES.slice(0, 12);

  return (
    <section
      id="states"
      className="py-24 md:py-36 px-[var(--gutter)]"
      style={{
        backgroundColor: "var(--obsidian)",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle blue top glow */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[50vh] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(0,71,255,0.06) 0%, transparent 60%)" }}
        aria-hidden
      />

      <div className="max-w-[var(--page-max)] mx-auto relative">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between pb-10 mb-14 gap-6"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-px" style={{ backgroundColor: "var(--blue)" }} />
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--blue-bright)" }}>
                STATUTORY JURISDICTIONS
              </span>
            </div>
            <h2
              className="font-extrabold tracking-tighter uppercase leading-[0.90]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", fontFamily: "var(--font-display)", color: "var(--white)" }}
            >
              28 STATES & UTs
            </h2>
          </div>
          <span className="text-[0.58rem] font-bold uppercase tracking-widest" style={{ color: "var(--white-30)" }}>
            CONTROLLING AUTHORITIES · DIRECT DOSSIER FILING
          </span>
        </div>

        {/* State Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featuredStates.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              className="group flex flex-col justify-between h-[130px] p-4 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: "var(--obsidian-card)",
                border: "1px solid var(--line)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "var(--obsidian-lift)";
                el.style.borderColor = "var(--blue-border)";
                el.style.boxShadow = "0 0 20px var(--blue-glow-soft)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "var(--obsidian-card)";
                el.style.borderColor = "var(--line)";
                el.style.boxShadow = "none";
              }}
            >
              <span
                className="text-[0.48rem] font-bold uppercase tracking-widest"
                style={{ color: "var(--white-30)" }}
              >
                {s.slug.toUpperCase()} · STATE
              </span>
              <div>
                <h3
                  className="font-bold line-clamp-1 mb-1"
                  style={{ fontSize: "0.90rem", fontFamily: "var(--font-display)", color: "var(--white)" }}
                >
                  {s.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[0.52rem] font-semibold uppercase" style={{ color: "var(--white-30)" }}>
                    {s.validityYears}-Yr
                  </span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--blue-bright)" }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/states"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300"
            style={{
              backgroundColor: "var(--blue)",
              color: "var(--white)",
              boxShadow: "0 0 24px var(--blue-glow)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px var(--blue-glow)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px var(--blue-glow)"; }}
          >
            Explore All 28 State Licensing Dossiers
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
