"use client";

import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { CONTACT } from "../../../lib/config";

export default function StickyCta() {
  return (
    <aside
      aria-label="Statutory Quick Contact Bar"
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[#D4AF37]/30 bg-[#050714]/95 px-3 sm:px-6 py-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left desktop info */}
        <div className="hidden sm:flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5821C7]/30 border border-[#7638FA]/50 text-[#F5D061] shrink-0">
            <ShieldCheck className="h-4 w-4 text-[#F5D061]" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#F5D061]">
              PSARA Statutory Advisory Desk
            </span>
            <span className="truncate text-xs font-bold text-white">
              Instant Filing &amp; Regulatory Guidance Across 28 States
            </span>
          </div>
        </div>

        {/* Action Buttons: Visible & Accessible on Mobile & Desktop */}
        <div className="flex w-full sm:w-auto shrink-0 items-center gap-2.5 justify-center">
          <a
            href={TEL_HREF}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-[#0A1022] hover:bg-[#14203D] px-4 py-2.5 text-xs font-bold uppercase tracking-[.06em] text-white transition-all active:scale-95 shadow-md min-h-[42px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Phone className="h-3.5 w-3.5 text-[#F5D061]" />
            <span>Call Now</span>
          </a>

          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-[#5821C7] hover:bg-[#7638FA] px-5 py-2.5 text-xs font-bold uppercase tracking-[.06em] text-white transition-all active:scale-95 shadow-lg shadow-purple-900/50 min-h-[42px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <MessageCircle className="h-3.5 w-3.5 fill-white text-white" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
