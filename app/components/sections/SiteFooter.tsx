"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Send, ArrowUp } from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { CONTACT, SITE } from "../../../lib/config";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { ensureGsap, storyEnter, initLiveClock } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

const navCols = [
  {
    title: "Practice",
    links: [
      { label: "Services", href: "/services" },
      { label: "PSARA License", href: "/services/psara-license" },
      { label: "Training MOU", href: "/services/training-mou" },
      { label: "Police Verification", href: "/services/police-verification" },
      { label: "Company Registration", href: "/services/company-registration" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Complete PSARA Guide", href: "/psara-license" },
      { label: "Process", href: "/psara-process" },
      { label: "Documents", href: "/psara-documents" },
      { label: "Fees", href: "/psara-fees" },
      { label: "Multi-State", href: "/multi-state-license" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Coverage",
    links: [
      { label: "All States", href: "/states" },
      { label: "All Cities", href: "/cities" },
      { label: "Rajasthan", href: "/states/rajasthan" },
      { label: "Delhi", href: "/states/delhi" },
      { label: "Haryana", href: "/states/haryana" },
      { label: "Maharashtra", href: "/states/maharashtra" },
    ],
  },
];

export default function SiteFooter() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      storyEnter(root.current!);
    }, root);

    const clockCleanup = initLiveClock(root.current!, ".footer-time");

    return () => {
      ctx.revert();
      if (typeof clockCleanup === "function") clockCleanup();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      ref={root}
      className="section relative border-t border-[var(--line-gold)] overflow-hidden"
      style={{
        backgroundColor: "var(--warm-dark-3, #2e261c)",
        color: "var(--cream, #f6fafd)",
      }}
    >
      {/* Voyeur-inspired atmospheric overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(224, 184, 74, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="section-inner relative z-10 binding-rail pl-0 md:pl-6">
        {/* SECTION LABELS — Jasmine/Voyeur style */}
        <div
          className="flex items-center justify-between mb-2 text-[10px] font-bold uppercase tracking-widest select-none"
          style={{ color: "color-mix(in srgb, var(--gold, #e0b84a) 60%, transparent)" }}
          data-story
        >
          <span>(CONTACT)</span>
          <span>(NAVIGATION)</span>
        </div>
        <div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--gold, #e0b84a) 20%, var(--gold, #e0b84a) 80%, transparent 100%)",
          }}
        />

        {/* MAIN FOOTER GRID — with contact form (Voyeur-inspired) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" data-story>
          {/* Column 1: Brand + Info */}
          <div className="lg:col-span-4">
            <BrandMark />
            <p
              className="mt-4 text-sm leading-relaxed font-medium"
              style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 78%, transparent)" }}
            >
              {SITE.name} — PSARA licensing advisory, training MOUs, police verification liaison,
              and multi-state compliance craft under the Private Security Agencies (Regulation)
              Act, 2005.
            </p>
            <div className="mt-6 space-y-3 text-sm font-medium">
              <a
                href={`tel:+${CONTACT.phoneRaw}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 82%, transparent)" }}
              >
                <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--gold, #e0b84a)" }} />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`tel:${CONTACT.landlineRaw}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 82%, transparent)" }}
              >
                <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--gold, #e0b84a)" }} />
                {CONTACT.landlineDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 82%, transparent)" }}
              >
                <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--gold, #e0b84a)" }} />
                {CONTACT.email}
              </a>
              <p
                className="flex items-start gap-2"
                style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold, #e0b84a)" }} />
                C-36, Capital Galleria, Sirsi Road, Kanakpura, Jaipur 302034
              </p>
            </div>
          </div>

          {/* Column 2-4: Navigation columns */}
          {navCols.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p
                className="text-xs font-bold uppercase tracking-wider mb-4"
                style={{ color: "var(--gold, #e0b84a)" }}
              >
                {col.title}
              </p>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="transition-colors hover:text-[var(--gold)]"
                      style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Company + Back to Top — Voyeur-inspired */}
          <div className="lg:col-span-2">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: "var(--gold, #e0b84a)" }}
            >
              Company
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-[var(--gold)]"
                  style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-[var(--gold)]"
                  style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--gold)]"
                  style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--gold)]"
                  style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                >
                  YouTube
                </a>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-[var(--gold)]"
                  style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-[var(--gold)]"
                  style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="transition-colors hover:text-[var(--gold)]"
                  style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 72%, transparent)" }}
                >
                  Disclaimer
                </Link>
              </li>
            </ul>              {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:gap-3"
              style={{ color: "var(--gold, #e0b84a)" }}
            >
              Back to top
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* VOYEUR-INSPIRED CONTACT FORM SECTION — with corner ornaments */}
        <div
          className="relative mt-12 rounded-[var(--radius)] p-6 md:p-8"
          style={{
            backgroundColor: "color-mix(in srgb, var(--warm-dark, #1a1510) 60%, transparent)",
            border: "1px solid color-mix(in srgb, var(--gold, #e0b84a) 20%, transparent)",
          }}
          data-story
        >
          {/* Corner ornaments — Voyeur/Jasmine style */}
          <CornerOrnament position="tl" size="lg" opacity={0.3} />
          <CornerOrnament position="tr" size="lg" opacity={0.3} />
          <CornerOrnament position="bl" size="lg" opacity={0.3} />
          <CornerOrnament position="br" size="lg" opacity={0.3} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "var(--gold, #e0b84a)" }}
              >
                Send a Brief
              </p>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--cream, #f6fafd)" }}
              >
                Start your PSARA file today
              </h3>
              <p
                className="mt-2 text-sm font-medium leading-relaxed"
                style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 70%, transparent)" }}
              >
                Submit opens WhatsApp with your details so our team can reply with a
                State-specific checklist within 4 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:+${CONTACT.phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:opacity-85"
                  style={{
                    backgroundColor: "var(--gold, #e0b84a)",
                    color: "var(--warm-dark, #1a1510)",
                  }}
                >
                  <Phone className="h-3.5 w-3.5" />
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={DEFAULT_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:opacity-85"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--gold, #e0b84a)",
                    border: "1px solid color-mix(in srgb, var(--gold, #e0b84a) 40%, transparent)",
                  }}
                >
                  <Send className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div
                className="flex items-center gap-3 rounded p-4"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--warm-dark, #1a1510) 80%, transparent)",
                }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "color-mix(in srgb, var(--gold, #e0b84a) 15%, transparent)" }}>
                  <span className="text-lg font-bold" style={{ color: "var(--gold, #e0b84a)" }}>?</span>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--cream, #f6fafd)" }}>
                    Not sure where to start?
                  </p>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 60%, transparent)" }}
                  >
                    Read our 104 PSARA FAQs or call for a free pre-check
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LARGE PSARA TYPOGRAPHY — Voyeur's footer logo approach */}
        <div
          className="mt-12 border-t pt-8 select-none pointer-events-none"
          style={{ borderColor: "color-mix(in srgb, var(--gold, #e0b84a) 25%, transparent)" }}
          data-story
        >
          <p
            className="font-[family-name:var(--font-accent)] text-[clamp(4rem,18vw,16rem)] font-bold leading-none tracking-tight uppercase select-none"
            style={{
              color: "color-mix(in srgb, var(--warm-dark, #1a1510) 55%, transparent)",
            }}
          >
            PSARA<span style={{ color: "color-mix(in srgb, var(--gold, #e0b84a) 45%, transparent)" }}>.</span>
          </p>
        </div>

        {/* JASMINE/VOYEUR-INSPIRED MARQUEE CTA with amber glow */}
        <div
          className="footer-marquee border-t py-6 overflow-hidden"
          style={{ borderColor: "color-mix(in srgb, var(--gold, #e0b84a) 25%, transparent)" }}
          data-story
        >
          <div className="footer-marquee-track flex whitespace-nowrap">
            <span
              className="footer-marquee-text font-[family-name:var(--font-accent)] text-[clamp(2rem,8vw,5rem)] font-bold uppercase tracking-tight"
              style={{
                color: "color-mix(in srgb, var(--gold, #e0b84a) 12%, transparent)",
                textShadow: "0 0 60px color-mix(in srgb, var(--gold, #e0b84a) 8%, transparent)",
              }}
            >
              START YOUR PSARA APPLICATION&nbsp;&bull;&nbsp;START YOUR PSARA APPLICATION&nbsp;&bull;&nbsp;
            </span>
            <span
              className="footer-marquee-text font-[family-name:var(--font-accent)] text-[clamp(2rem,8vw,5rem)] font-bold uppercase tracking-tight"
              style={{
                color: "color-mix(in srgb, var(--gold, #e0b84a) 12%, transparent)",
                textShadow: "0 0 60px color-mix(in srgb, var(--gold, #e0b84a) 8%, transparent)",
              }}
            >
              START YOUR PSARA APPLICATION&nbsp;&bull;&nbsp;START YOUR PSARA APPLICATION&nbsp;&bull;&nbsp;
            </span>
          </div>
        </div>

        {/* FOOTER METADATA — Jasmine/Voyeur style */}
        <div
          className="flex flex-col gap-2 border-t pt-4 pb-2 text-[11px] font-medium md:flex-row md:items-center md:justify-between"
          style={{
            borderColor: "color-mix(in srgb, var(--gold, #e0b84a) 25%, transparent)",
            color: "color-mix(in srgb, var(--cream, #f6fafd) 45%, transparent)",
          }}
          data-story
        >
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>JAIPUR, INDIA</span>
            <span className="footer-time" data-live-clock>
              --:-- IST
            </span>
            <span>26.9124° N, 75.7873° E</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>

        {/* Disclaimer */}
        <p
          className="mt-4 pb-4 text-[10px] font-medium leading-relaxed"
          style={{ color: "color-mix(in srgb, var(--cream, #f6fafd) 30%, transparent)" }}
        >
          Educational content on PSARA licensing. Fees and timelines are indicative — confirm
          with the State Controlling Authority. Not a substitute for formal legal advice.
        </p>
      </div>
    </footer>
  );
}
