"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";

export default function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Past hero — use hero height when present so art isn't covered mid-fold
      const hero = document.getElementById("hero");
      const threshold = hero ? Math.max(hero.offsetHeight * 0.55, 320) : 400;
      setIsVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Contact Bar"
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[#C89B3C]/35 bg-[#0A233F]/97 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 md:hidden"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <ShieldCheck className="h-5 w-5 shrink-0 text-[#C89B3C]" />
          <div className="flex min-w-0 flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFF2BA]">
              PSARA Desk
            </span>
            <span className="truncate text-xs font-semibold text-white">Instant Advisory</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={TEL_HREF}
            className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-bold text-white transition-colors active:bg-white/15"
          >
            <Phone className="h-3.5 w-3.5 text-[#FFF2BA]" />
            <span>Call</span>
          </a>

          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#0A233F] transition-transform active:scale-95"
            style={{ background: "var(--grad-metal)" }}
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
