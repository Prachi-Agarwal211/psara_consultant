"use client";

import { ShieldCheck, Calculator, BadgeCheck, Clock, MapPin, Phone } from "lucide-react";
import { CONTACT } from "../../../lib/config";

const ITEMS = [
  { icon: Calculator, text: "GOVT FEE ₹5,000 / ₹10,000 / ₹25,000" },
  { icon: ShieldCheck, text: "300+ LICENSES GRANTED" },
  { icon: MapPin, text: "36 STATES & UTS" },
  { icon: BadgeCheck, text: "TRAINING MOU INCLUDED" },
  { icon: Clock, text: "30–45 DAY FAST-TRACK" },
  { icon: Phone, text: CONTACT.phoneDisplay },
];

export default function ComplianceMarquee() {
  return (
    <section className="relative w-full overflow-hidden grad-saffron py-3" aria-label="Fees and trust">
      <div className="marquee-mask flex w-max animate-marquee gap-8">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap text-xs font-black uppercase tracking-[0.16em] text-[#0B1E3B]">
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.text}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0B1E3B]/60" />
          </div>
        ))}
      </div>
    </section>
  );
}
