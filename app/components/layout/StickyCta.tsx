"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";

export default function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (approx 400px)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Contact Bar"
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[var(--gold)]/30 bg-[var(--void)]/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[var(--gold-bright)] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold-bright)]">
              PSARA Desk
            </span>
            <span className="text-xs font-semibold text-white">
              Instant Advisory
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={TEL_HREF}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold text-white transition-colors active:bg-white/10"
          >
            <Phone className="h-3.5 w-3.5 text-[var(--gold-bright)]" />
            <span>Call</span>
          </a>

          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-transform active:scale-95"
            style={{
              background: "var(--grad-metal)",
              color: "var(--void)",
            }}
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
