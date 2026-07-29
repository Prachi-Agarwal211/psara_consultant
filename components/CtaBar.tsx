import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { CONTACT } from "../lib/config";
import { TEL_HREF, DEFAULT_WA } from "../lib/whatsapp";

export default function CtaBar({
  title = "Talk to a PSARA consultant",
  subtitle = "Call or WhatsApp — Jaipur · Delhi · Gurugram · Noida · Ahmedabad",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative mt-12 border border-[var(--line-gold)] p-6 md:p-8 overflow-hidden group"
      style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
    >
      {/* Corner ornaments */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[var(--gold)] opacity-30 group-hover:opacity-60 transition-opacity" aria-hidden />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[var(--gold)] opacity-30 group-hover:opacity-60 transition-opacity" aria-hidden />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[var(--gold)] opacity-30 group-hover:opacity-60 transition-opacity" aria-hidden />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[var(--gold)] opacity-30 group-hover:opacity-60 transition-opacity" aria-hidden />

      {/* Gold gradient background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(224, 184, 74, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h3
            className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)] md:text-2xl tracking-tight"
          >
            {title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[var(--text-dim)]">{subtitle}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={TEL_HREF}
            className="btn-gold inline-flex items-center justify-center gap-2 group/btn"
          >
            <Phone className="h-4 w-4" />
            Call {CONTACT.phoneDisplay}
            <ArrowRight className="h-3 w-3 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4 text-[var(--gold)]" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
