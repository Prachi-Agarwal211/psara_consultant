"use client";

import Image from "next/image";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { LEADERS } from "../../../data/team";

export default function Leadership() {
  return (
    <section className="relative py-20 px-4 md:px-8 border-t border-white/10 bg-[#0B0E14] text-white overflow-hidden my-12">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-xl border border-[#BF953F]/40 bg-[#8C1F32]/30 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#BF953F] shadow-md">
            <ShieldCheck className="h-4 w-4 text-[#BF953F]" /> Board of Leadership
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
            <div
              key={leader.id}
              className="relative flex flex-col md:flex-row gap-6 rounded-3xl border-2 border-[#C89B3C]/40 bg-gradient-to-br from-[#0A233F] via-[#0F3C65] to-[#07192C] text-white p-6 md:p-8 shadow-2xl transition-all duration-300 hover:border-[#C89B3C]"
            >
              {/* Leader Photo */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 overflow-hidden rounded-2xl border-2 border-[#C89B3C] self-center md:self-start shadow-xl">
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>

              {/* Bio & Credentials */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {leader.name}
                    </h3>
                    <span className="bg-[#FFF2BA] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0F3C65] rounded-lg shadow-sm">
                      {leader.role}
                    </span>
                  </div>

                  <p className="mt-3 text-xs md:text-sm font-medium leading-relaxed text-slate-300">
                    {leader.bio}
                  </p>
                </div>

                {/* Key Track Record Tags */}
                <div className="mt-6 border-t border-white/15 pt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFF2BA] mb-2 block">
                    Proven Experience
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {leader.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm"
                      >
                        <CheckCircle2 className="h-3 w-3 text-[#C89B3C]" />
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
