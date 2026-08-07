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
    <div
      className="relative mt-14 border border-white/10 p-6 md:p-8"
      style={{ background: "rgba(0,102,255,0.06)" }}
      data-clip
    >
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h3
            className="text-xl font-semibold tracking-tight md:text-2xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--white-55)", fontFamily: "var(--font-body)" }}>
            {subtitle}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={TEL_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[var(--gold)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Phone className="h-3.5 w-3.5" style={{ color: "var(--gold-bright)" }} />
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.16em]"
            style={{ background: "var(--grad-metal)", color: "var(--void)", fontFamily: "var(--font-body)" }}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
