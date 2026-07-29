"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, MessageSquare, ShieldCheck } from "lucide-react";
import Chapter from "../layout/Chapter";
import { CONTACT } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { lineByLineReveal, counterStampAnimation } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

const metrics = [
  { v: 10, s: "+", label: "Years practice focus", sub: "Licensing & compliance" },
  { v: 500, s: "+", label: "Agencies supported", sub: "Across India" },
  { v: 28, s: "+", label: "States & UTs", sub: "Filing capability" },
  { v: 12, s: "", label: "Operational desks", sub: "Real addresses" },
];

export default function TrustProof({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const root = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
    counterStampAnimation(root.current, "[data-count]");
  }, []);

  return (
    <Chapter id="trust" tone="warm-dark" className="border-y border-[var(--line-gold)]">
      <div ref={root} className="py-6">
        {/* Heading + Image row */}
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-12" data-story>
          <div className="lg:col-span-6">
            {/* Dossier badge */}
            <span className="inline-flex items-center gap-2 border border-[var(--line-gold)] px-3 py-1 mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--gold)]" />
              <span className="text-[0.5rem] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
                STATUTORY DOSSIER METRICS
              </span>
            </span>

            <h2 ref={headingRef} className="display-xl text-[var(--cream)] split-heading relative pl-4 md:pl-8">
              <span className="side-caption" aria-hidden>VERIFIED TRACK</span>
              Track Record & <span className="text-[var(--gold)]">Verification Proof</span>
            </h2>
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-[var(--text-muted)]">
              We are a PSARA licensing consultancy — documentation, MOUs, police liaison, and
              multi-state sequencing. Figures below describe operating scale; your State Controlling
              Authority still decides each grant on its own rules.
            </p>
            <ul className="mt-5 space-y-2 text-sm font-medium text-[var(--text-dim)]">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                Dossier-first preparation — not portal guesswork
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                WhatsApp-first response with Call & landline backup
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                Honest timelines that include police verification
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded border border-[var(--line-gold)] lg:col-span-6">
            <Image
              src="/assets/images/handshake-deal.jpg"
              alt="PSARA consultant client engagement"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, var(--warm-dark) 0%, transparent 50%)",
            }} />
          </div>
        </div>

        {/* Metrics grid — dossier gold style */}          <div
          data-story
          className="relative grid grid-cols-2 border-y border-[var(--line-gold)] md:grid-cols-4 rounded"
          style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              className="relative border-r last:border-r-0 border-[var(--line-gold)] px-4 py-8 text-center"
            >
              <span
                data-count={m.v}
                data-suffix={m.s}
                className="block font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl text-[var(--gold)] will-change-transform"
              >
                {m.v}{m.s}
              </span>
              <span className="mt-2 block text-[0.55rem] font-bold uppercase tracking-wider text-[var(--cream)]">
                {m.label}
              </span>
              <span className="mt-1 block text-[0.6rem] font-medium text-[var(--text-dim)]">
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        {/* GOLD CTA BAR — full gold section */}
        <div
          data-story
          className="relative mt-12 flex flex-col items-start justify-between gap-6 rounded border border-[var(--gold-soft)] p-6 md:flex-row md:items-center md:p-8 shadow-lg"
          style={{ backgroundColor: "var(--gold-bg)" }}
        >
          <CornerOrnament position="tl" size="lg" color="var(--warm-dark)" opacity={0.2} />
          <CornerOrnament position="br" size="lg" color="var(--warm-dark)" opacity={0.2} />

          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded"
              style={{ backgroundColor: "var(--warm-dark)" }}
            >
              <PhoneCall className="h-5 w-5 text-[var(--gold)]" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight"
                style={{ color: "var(--warm-dark)" }}>
                Speak with a PSARA consultant
              </p>
              <p className="mt-1 text-xs font-semibold"
                style={{ color: "color-mix(in srgb, var(--warm-dark) 80%, transparent)" }}>
                Jaipur HQ · Delhi · Gurugram · Noida · Ahmedabad · pan-India filing support
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={TEL_HREF}
              className="inline-flex items-center gap-2 rounded px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:opacity-85"
              style={{
                backgroundColor: "var(--warm-dark)",
                color: "var(--gold)",
              }}
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:opacity-85"
              style={{
                backgroundColor: "var(--cream)",
                color: "var(--warm-dark)",
              }}
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Readiness check link */}
        {onOpenQuiz && (
          <p className="mt-6 text-center text-sm font-medium text-[var(--text-dim)]" data-story>
            Not sure if your file is ready?{" "}
            <button
              type="button"
              onClick={onOpenQuiz}
              className="font-bold text-[var(--gold)] underline hover:text-[var(--gold-soft)]"
            >
              Run the 60-second readiness check
            </button>
            {" · "}
            <Link href="/faq" className="font-bold text-[var(--gold)] underline hover:text-[var(--gold-soft)]">
              Read 100 FAQs
            </Link>
          </p>
        )}
      </div>
    </Chapter>
  );
}
