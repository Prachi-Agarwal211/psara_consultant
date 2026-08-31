"use client";

import { ShieldCheck, Award, Building2, Scale, Clock, MapPin } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, text: "500+ PSARA LICENSES GRANTED" },
  { icon: MapPin, text: "36 STATES & UTs COVERED" },
  { icon: Award, text: "RECOGNIZED TRAINING MOU NETWORK" },
  { icon: Scale, text: "100% POLICE VERIFICATION SUPPORT" },
  { icon: Clock, text: "FAST-TRACK 30–45 DAY PROCESSING" },
  { icon: Building2, text: "JAIPUR HQ • DELHI • GURUGRAM • NOIDA DESKS" },
];

export default function ComplianceMarquee() {
  return (
    <section className="relative w-full overflow-hidden border-y border-[rgba(212,175,55,0.22)] bg-gradient-to-r from-[#120C27] via-[#2A1853] to-[#120C27] py-3.5" aria-label="Trust Signals">
      <div className="flex w-max animate-marquee gap-8">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-3.5 whitespace-nowrap text-xs font-black uppercase tracking-[0.18em] text-[#D4AF37]">
            <item.icon className="h-4 w-4 shrink-0 text-[#D4AF37]" />
            <span>{item.text}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />
          </div>
        ))}
      </div>
    </section>
  );
}
