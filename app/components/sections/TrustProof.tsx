"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, MessageSquare } from "lucide-react";
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
    <Chapter id="trust" tone="paper-lemon" className="bg-noise-lemon border-y border-[var(--lemon-green)]/30">
      <div ref={root} className="py-6">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-12" data-story>
          <div className="lg:col-span-6">
            <h2 ref={headingRef} className="display-xl font-bold text-[var(--royal-blue)]">
              Track Record & <span className="text-[var(--lemon-green)]">Verification Proof</span>
            </h2>
            <p className="mt-4 max-w-md font-[family-name:var(--font-body)] text-sm font-medium leading-relaxed text-[var(--ink-muted)]">
              We are a PSARA licensing consultancy — documentation, MOUs, police liaison, and
              multi-state sequencing. Figures below describe operating scale; your State Controlling
              Authority still decides each grant on its own rules.
            </p>
            <ul className="mt-5 space-y-2 text-sm font-semibold text-[var(--ink-muted)]">
              <li>• Dossier-first preparation — not portal guesswork</li>
              <li>• WhatsApp-first response with Call & landline backup</li>
              <li>• Honest timelines that include police verification</li>
            </ul>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] border border-[var(--royal-blue)]/15 shadow-sm lg:col-span-6">
            <Image
              src="/assets/images/handshake-deal.jpg"
              alt="PSARA consultant client engagement"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          data-story
          className="relative grid grid-cols-2 border-y border-[var(--royal-blue)]/15 bg-white md:grid-cols-4 rounded-[var(--radius)] shadow-sm"
        >
          {/* Corner ornaments */}
          <CornerOrnament position="tl" size="lg" color="var(--royal-blue)" opacity={0.3} />
          <CornerOrnament position="br" size="lg" color="var(--royal-blue)" opacity={0.3} />

          {metrics.map((m, idx) => (
            <div key={m.label} className="relative border-r last:border-r-0 border-[var(--royal-blue)]/10 px-4 py-8 text-center">
              <span className="num-marker num-marker-sm absolute top-2 left-2 text-xs">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span
                data-count={m.v}
                data-suffix={m.s}
                className="block font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl text-[var(--royal-blue)] will-change-transform"
              >
                {m.v}
                {m.s}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-wider text-[var(--royal-blue)]">
                {m.label}
              </span>
              <span className="mt-1 block text-[11px] font-medium text-[var(--ink-muted)]">
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        {/* STATUTORY GOLD CTA BAR — with decorative corner ornaments */}
        <div
          data-story
          className="relative mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] border border-[var(--gold-soft)] bg-[var(--gold)] p-6 md:flex-row md:items-center md:p-8 shadow-lg"
        >
          {/* Corner ornaments — matching Voyeur's bold CTA style */}
          <CornerOrnament position="tl" size="lg" color="var(--obsidian)" opacity={0.2} />
          <CornerOrnament position="br" size="lg" color="var(--obsidian)" opacity={0.2} />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[var(--obsidian)]">
              <PhoneCall className="h-5 w-5 text-[var(--gold)]" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--obsidian)]">
                Speak with a PSARA consultant
              </p>
              <p className="mt-1 text-xs font-semibold text-[var(--obsidian)]/80">
                Jaipur HQ · Delhi · Gurugram · Noida · Ahmedabad · pan-India filing support
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={TEL_HREF}
              className="inline-flex items-center gap-2 rounded bg-[var(--obsidian)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--gold)] transition-colors hover:bg-[var(--obsidian-2)]"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--obsidian)] transition-colors hover:bg-[var(--cream)]"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {onOpenQuiz && (
          <p className="mt-6 text-center text-sm font-semibold text-[var(--ink-muted)]" data-story>
            Not sure if your file is ready?{" "}
            <button
              type="button"
              onClick={onOpenQuiz}
              className="font-bold text-[var(--royal-blue)] underline"
            >
              Run the 60-second readiness check
            </button>
            {" · "}
            <Link href="/faq" className="font-bold text-[var(--royal-blue)] underline">
              Read 100 FAQs
            </Link>
          </p>
        )}
      </div>
    </Chapter>
  );
}
