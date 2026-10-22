"use client";

import Image from "next/image";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { LEADERS } from "../../../data/team";
import { SITE } from "../../../lib/config";
import { GlassCard, Section } from "../../../components/v3/PagePrimitives";

export default function Leadership() {
  return (
    <Section className="relative my-12 border-t border-white/15 py-16 text-white">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#FFB547]">
            <ShieldCheck className="h-4 w-4 text-[#FF7A00]" /> Board of Leadership
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-white leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
            Pioneering Compliance &amp; Regulatory Leadership
          </h2>
          <p className="mt-4 text-base text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
            Led by veteran security domain architects with decades of executive leadership across SIS, SLV Security, Jaguar Security, ICICI Bank, Bajaj Group, and BSS Security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {LEADERS.map((leader) => (
            <GlassCard
              key={leader.id}
              className="relative flex flex-col gap-6 text-white p-6 md:p-8 xl:flex-row"
            >
              {/* Leader Photo */}
              <div className="relative w-36 h-36 shrink-0 overflow-hidden rounded-xl self-start">
                <Image
                  src={leader.photo}
                  alt={`${leader.name} — ${leader.role}`}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>

              {/* Bio & Credentials */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {leader.name}
                    </h3>
                    <span className="border border-[#FFB547]/30 px-3 py-1 text-xs font-semibold text-[#FFCC8C] rounded-full">
                      {leader.role}
                    </span>
                  </div>

                  <p className="mt-3 text-base font-normal leading-relaxed text-[#C7D2E4]">
                    {leader.bio}
                  </p>
                </div>

                {/* Key Track Record Tags */}
                <div className="mt-6 border-t border-white/15 pt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFE8D1] mb-2 block">
                    Proven Experience
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {leader.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm"
                      >
                        <CheckCircle2 className="h-3 w-3 text-[#E76F00]" />
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
                    image: `${SITE.url}${leader.photo}`,
                    description: leader.bio,
                  }),
                }}
              />
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
