"use client";

import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";

export default function HeroActions() {
  return (
    <section
      id="hero-actions"
      aria-label="Start a PSARA consultation"
      className="relative z-20 isolate block border-b border-[var(--gold-deep,#8F681B)]/35 bg-gradient-to-br from-[#FFFDFF] via-[var(--canvas-cream,#F7F3FF)] to-[#E8DDF6] text-[var(--paper-ink,#151126)]"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[var(--gutter)] py-8 text-center sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-12 lg:text-left">
        <div className="mx-auto max-w-xl lg:mx-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--gold-deep,#8F681B)]">Your next move</p>
          <h2 className="mt-3 max-w-lg text-3xl leading-[0.98] tracking-[-0.03em] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Put the file on solid ground.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--ink-soft,#443A61)] lg:mx-0">
            Tell us your state, entity, and target coverage. We will map the authority path before your application moves.
          </p>
        </div>

        <div className="relative z-20 mx-auto flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:mx-0">
          <Link
            href="#contact"
            data-cursor="Start file"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#241703] shadow-[0_14px_28px_-16px_rgba(133,93,14,0.8)] transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--grad-gold-metallic)", backgroundSize: "220% 100%" }}
          >
            Start a statutory file <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href={DEFAULT_WA}
            data-cursor="Chat desk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[var(--whatsapp-hover,#128C7E)] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_14px_28px_-16px_rgba(18,140,126,0.8)] transition-transform hover:-translate-y-0.5 hover:brightness-95"
          >
            <MessageSquare className="h-4 w-4 fill-white" /> WhatsApp desk
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--gold-deep,#8F681B)]/20 px-[var(--gutter)] py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink-muted,#766D90)]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-6 gap-y-2">
          <span>Verification-ready dossiers</span>
          <span>36 states &amp; UTs</span>
          <span>Post-grant compliance</span>
        </div>
      </div>
    </section>
  );
}
