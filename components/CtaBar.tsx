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
    <div className="relative mt-12 border border-[var(--line-light)] bg-white p-6 md:p-8 rounded-lg shadow-sm overflow-hidden text-[var(--text-dark)] group">
      <div className="relative z-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h3
            className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--text-dark)] md:text-2xl tracking-tight"
          >
            {title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[var(--text-dark-muted)]">{subtitle}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={TEL_HREF}
            data-cursor="Call Now"
            className="px-6 py-3 rounded bg-[var(--obsidian-bg)] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[var(--signal-red)] transition-colors"
          >
            <Phone className="h-4 w-4 text-[var(--amber)]" />
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WhatsApp"
            className="px-6 py-3 rounded bg-[var(--amber)] text-[var(--obsidian-bg)] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[var(--obsidian-bg)] hover:text-white transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
