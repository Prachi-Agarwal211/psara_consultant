"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Phone } from "lucide-react";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { CONTACT } from "../../../lib/config";

export default function HeroActions() {
  return (
    <section id="hero-actions" aria-label="Start a PSARA consultation" className="relative z-20 isolate block border-b border-[#B58A32]/35 bg-[#F3EFE5] text-[#102033]">
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[var(--gutter)] py-8 text-center sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-12 lg:text-left">
        <div className="mx-auto max-w-xl lg:mx-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F681B]">Your next move</p>
          <h2 className="mt-3 max-w-lg text-3xl leading-[0.98] tracking-[-0.03em] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>Put the file on solid ground.</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#405064] lg:mx-0">Tell us your state, entity, and target coverage. We will map the authority path before your application moves.</p>
        </div>

        <div className="relative z-20 mx-auto flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:mx-0">
          <Link href="#contact" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#241703] shadow-[0_14px_28px_-16px_rgba(133,93,14,0.8)] transition-transform hover:-translate-y-0.5" style={{ background: "var(--grad-gold-metallic)", backgroundSize: "220% 100%" }}>
            Start a statutory file <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#138C7E] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_14px_28px_-16px_rgba(18,140,126,0.8)] transition-transform hover:-translate-y-0.5 hover:bg-[#0F786C]">
            <MessageSquare className="h-4 w-4 fill-white" /> WhatsApp desk
          </a>
        </div>

        <div className="mx-auto flex w-full max-w-sm shrink-0 flex-col gap-4 rounded-2xl border border-[#B58A32]/30 bg-[#EEE8DC]/80 p-4 shadow-[0_16px_32px_-24px_rgba(50,35,12,0.55)] sm:p-5 lg:mx-0 lg:w-[320px] lg:max-w-none">
          {/* The source PNG has transparent padding above the desk. Crop that
              padding in a fixed-ratio frame so the artwork stays intentional. */}
          <div className="relative h-[92px] w-full overflow-hidden rounded-xl bg-[#E5DDCF] sm:h-[102px]">
            <Image
              src="/assets/images/generated/psara-hero-desk-cutout.png"
              alt=""
              aria-hidden="true"
              width={1672}
              height={940}
              sizes="(min-width: 1024px) 280px, 100vw"
              className="absolute inset-x-0 bottom-0 h-auto w-full max-w-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-[#B58A32]/20 pt-3 text-xs text-[#405064]">
            <div>
              <span className="block font-bold text-[#102033]">Speak to the desk</span>
              <a href={TEL_HREF} className="mt-1 inline-flex items-center gap-2 hover:text-[#8F681B]">
                <Phone className="h-3.5 w-3.5" /> {CONTACT.phoneDisplay}
              </a>
            </div>
            <span className="hidden h-8 w-px bg-[#B58A32]/25 sm:block" aria-hidden="true" />
            <span className="hidden text-right text-[9px] font-bold uppercase leading-relaxed tracking-[0.16em] text-[#8F681B] sm:block">
              Jaipur<br />Advisory desk
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-[#B58A32]/20 px-[var(--gutter)] py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#657184]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-6 gap-y-2"><span>Verification-ready dossiers</span><span>36 states &amp; UTs</span><span>Post-grant compliance</span></div>
      </div>
    </section>
  );
}
