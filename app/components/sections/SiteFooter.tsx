"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { CONTACT, SITE } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function pad(n: number) {
      return n.toString().padStart(2, "0");
    }
    function update() {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setTime(`${pad(ist.getHours())}:${pad(ist.getMinutes())} IST`);
    }
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

/**
 * Jasmine Gunarto Signature Footer Component
 * Features:
 * - Giant "LET'S TALK" kinetic marquee banner
 * - Multi-column social & navigation links
 * - Geographic coordinates & live IST clock
 * - Smooth back-to-top trigger
 */
export default function SiteFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative theme-obsidian-dark border-t border-white/10 pt-20 pb-12 px-[var(--gutter)] text-white">
      <div className="max-w-[var(--page-max)] mx-auto">
        {/* Top Label Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50">
          <span>(CONNECT & SOCIAL)</span>
          <span>(STATUTORY NAVIGATION)</span>
        </div>

        {/* Multi-Column Links Section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <BrandMark />
            <p className="mt-4 text-sm font-medium text-white/60 leading-relaxed max-w-sm">
              Pan-India statutory licensing advisory for private security agencies.
              Statute-first preparation, training MOUs, and post-grant compliance craft.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={TEL_HREF}
                data-cursor="Call Now"
                className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                Call {CONTACT.phoneDisplay}
              </a>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="WhatsApp"
                className="px-4 py-2 rounded bg-[var(--amber)] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                WhatsApp Desk
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3">
            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--amber)] block mb-4">
              Social Channels
            </span>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider text-white/70">
              <li>
                <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--amber)] transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--amber)] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--amber)] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--amber)] transition-colors">
                  Email Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation & Back to Top */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--amber)] block mb-4">
                Core Sections
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
                <Link href="/about" className="hover:text-[var(--amber)] transition-colors">About</Link>
                <Link href="/services" className="hover:text-[var(--amber)] transition-colors">Services</Link>
                <Link href="/franchise" className="hover:text-[var(--amber)] transition-colors">Franchise</Link>
                <Link href="/states" className="hover:text-[var(--amber)] transition-colors">States</Link>
                <Link href="/cities" className="hover:text-[var(--amber)] transition-colors">Cities</Link>
                <Link href="/blog" className="hover:text-[var(--amber)] transition-colors">Blog</Link>
                <Link href="/contact" className="hover:text-[var(--amber)] transition-colors">Contact</Link>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              data-cursor="Top"
              className="mt-8 self-start inline-flex items-center gap-2 px-4 py-2 rounded border border-white/20 text-[0.6rem] font-bold uppercase tracking-widest text-white hover:border-[var(--amber)] hover:text-[var(--amber)] transition-colors"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Giant Marquee Heading: LET'S TALK */}
        <div className="py-8 border-b border-white/10 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-white/10 hover:text-[var(--amber)] transition-colors duration-500 mr-12 select-none">
              LET&apos;S TALK PSARA COMPLIANCE —
            </span>
            <span className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-white/10 hover:text-[var(--amber)] transition-colors duration-500 mr-12 select-none">
              LET&apos;S TALK PSARA COMPLIANCE —
            </span>
          </div>
        </div>

        {/* Bottom Metadata Bar (Jasmine Style) */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[0.6rem] font-bold uppercase tracking-widest text-white/40">
          <div className="flex items-center gap-4">
            <span>JAIPUR, INDIA</span>
            <span>·</span>
            <LiveClock />
            <span>·</span>
            <span>26.9124° N, 75.7873° E</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
