"use client";

import { ShieldCheck, Award, Building2, Scale, Clock, MapPin } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, text: "500+ PSARA LICENSES GRANTED" },
  { icon: MapPin, text: "28 STATES & UTs COVERED" },
  { icon: Award, text: "RECOGNIZED TRAINING MOU NETWORK" },
  { icon: Scale, text: "100% POLICE VERIFICATION SUPPORT" },
  { icon: Clock, text: "FAST-TRACK 30–45 DAY PROCESSING" },
  { icon: Building2, text: "JAIPUR HQ • DELHI • GURUGRAM • NOIDA DESKS" },
];

export default function ComplianceMarquee() {
  return (
    <section className="relative w-full overflow-hidden border-y border-white/10 bg-white/[0.015] py-4" aria-label="Trust Signals">
      <div className="flex w-max animate-marquee gap-8" data-cursor="PSARA Trust">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-3.5 whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em] text-[var(--white-70)]">
            <item.icon className="h-4 w-4 shrink-0 text-[var(--gold-bright)]" />
            <span>{item.text}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--gold-bright)] opacity-40" />
          </div>
        ))}
      </div>
    </section>
  );
}
