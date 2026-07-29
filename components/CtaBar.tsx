import { Phone, MessageSquare } from "lucide-react";
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
    <div className="mt-12 flex flex-col items-start justify-between gap-5 border border-[var(--line-gold)] bg-[var(--obsidian-2)] p-6 md:flex-row md:items-center md:p-8">
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)] md:text-2xl">
          {title}
        </h3>
        <p className="mt-1 text-sm font-medium text-[var(--cream-dim)]">{subtitle}</p>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <a href={TEL_HREF} className="btn-gold inline-flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" />
          Call {CONTACT.phoneDisplay}
        </a>
        <a
          href={DEFAULT_WA}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-emerald inline-flex items-center justify-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
