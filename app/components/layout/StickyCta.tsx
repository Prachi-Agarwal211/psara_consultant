"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";

export default function StickyCta() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [homeHeroPassed, setHomeHeroPassed] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;

    let ticking = false;
    const update = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : window.innerHeight;
      setHomeHeroPassed(window.scrollY >= heroBottom);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isVisible = !isHome || homeHeroPassed;

  return (
    <aside
      aria-label="Statutory Quick Contact Bar"
      className={`fixed bottom-0 left-0 right-0 z-[90] border-t border-[#D4AF37]/30 bg-[#080714]/95 px-3 py-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 sm:px-6 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left desktop info */}
        <div className="hidden sm:flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C89B3C]/12 border border-[#C89B3C]/40 text-[#F5D061] shrink-0">
            <ShieldCheck className="h-4 w-4 text-[#F5D061]" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#F5D061]">
              PSARA Statutory Advisory Desk
            </span>
            <span className="truncate text-xs font-bold text-white">
              Instant Filing &amp; Regulatory Guidance Across 36 States &amp; UTs
            </span>
          </div>
        </div>

        {/* Action Buttons: Visible & Accessible on Mobile & Desktop */}
        <div className="flex w-full sm:w-auto shrink-0 items-center gap-2.5 justify-center">
          <a
            href={TEL_HREF}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.08em] text-[#241703] transition-all active:scale-95 min-h-[42px]"
            style={{
              background: "var(--grad-gold-metallic)",
              boxShadow: "inset 0 1px 0 rgba(255,250,230,0.85), inset 0 -1px 0 rgba(88,58,8,0.5), 0 8px 20px -8px rgba(200,155,60,0.5)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call Now</span>
          </a>

          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[11px] font-bold uppercase tracking-[.08em] text-white transition-all active:scale-95 min-h-[42px]"
            style={{ background: "var(--grad-wa)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 20px -8px rgba(18,140,126,0.55)", fontFamily: "var(--font-body)" }}
          >
            <MessageCircle className="h-3.5 w-3.5 fill-white text-white" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
