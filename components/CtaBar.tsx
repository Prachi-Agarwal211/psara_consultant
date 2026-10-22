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
      className="v3-inline-cta relative mt-14 p-6 md:p-8"
      data-v3-reveal
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
            className="v3-button v3-button--ghost"
            data-v3-magnetic
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Phone className="h-3.5 w-3.5" style={{ color: "var(--gold-bright)" }} />
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="v3-button v3-button--wa"
            data-v3-magnetic
          >
            <MessageSquare className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
