"use client";

import Image from "next/image";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { LEADERS } from "../../../data/team";

export default function Leadership() {
  return (
    <section className="relative py-20 px-4 md:px-8 border-t border-white/10 bg-[var(--void-2)] overflow-hidden">
      {/* Background ambient spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: "var(--grad-amber-glow)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--gold-bright)]">
            <ShieldCheck className="h-4 w-4" /> Board of Leadership
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white leading-[0.95]">
            Pioneering Compliance &amp; Regulatory Leadership
          </h2>
          <p className="mt-4 text-base text-[var(--white-70)] leading-relaxed max-w-xl">
            Led by veteran security domain architects with decades of executive leadership across SIS, SLV Security, Jaguar Security, ICICI Bank, Bajaj Group, and BSS Security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {LEADERS.map((leader) => (
            <div
              key={leader.id}
              className="relative flex flex-col md:flex-row gap-6 border border-white/10 bg-white/[0.02] p-6 md:p-8 transition-[color,border-color,background-color] duration-300 hover:border-[var(--gold)]/50 hover:bg-white/[0.04]"
            >
              {/* Leader Photo — sharp editorial, no rounding */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 overflow-hidden border border-[var(--gold)]/40 self-center md:self-start">
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  fill
                  sizes="176px"
                  className="object-cover grayscale hover:grayscale-0 transition-[filter,opacity] duration-700"
                />
              </div>

              {/* Bio & Credentials */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                      {leader.name}
                    </h3>
                    <span className="bg-[var(--gold)]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gold-bright)]">
                      {leader.role}
                    </span>
                  </div>

                  <p className="mt-3 text-xs md:text-sm font-normal leading-relaxed text-[var(--white-70)]">
                    {leader.bio}
                  </p>
                </div>

                {/* Key Track Record Tags */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)] mb-2 block">
                    Proven Experience
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {leader.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-[var(--white-90)]"
                      >
                        <CheckCircle2 className="h-3 w-3 text-[var(--gold-bright)]" />
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Person Schema JSON-LD */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    name: leader.name,
                    jobTitle: leader.role,
                    worksFor: {
                      "@type": "Organization",
                      name: "PSARA License Consultant India",
                    },
                    image: `https://www.psara-consultant.com${leader.photo}`,
                    description: leader.bio,
                  }),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
