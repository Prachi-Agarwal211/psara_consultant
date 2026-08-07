"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import BrandMark from "../app/components/ui/BrandMark";
import { CONTACT, SITE } from "../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../lib/whatsapp";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "States", href: "/states" },
  { label: "Fee Calculator", href: "/calculator" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Certifications", href: "/certification" },
  { label: "Emergency Desk", href: "/emergency" },
  { label: "Contact", href: "/contact" },
];

function triggerHaptic(ms = 35) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(ms); } catch { /* noop */ }
  }
}

/* ── Character Hover Link (Luke-inspired) ── */
function ChrHoverLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`chr-hover text-[0.65rem] font-bold uppercase tracking-[0.12em] ${
        active ? "text-[var(--gold)]" : "text-[var(--cream)]/80 hover:text-[var(--gold)]"
      } transition-colors duration-300`}
    >
      <span className="ch-wrapper">
        {label.split("").map((ch, i) => (
          <span key={i} className="ch-top" style={{ animationDelay: `${i * 30}ms` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
        {label.split("").map((ch, i) => (
          <span key={i} className="ch-bot" style={{ animationDelay: `${i * 30}ms` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </Link>
  );
}

/* ── Live Clock (Jasmine-inspired header metadata) ── */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function pad(n: number) { return n.toString().padStart(2, "0"); }
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

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(() => !isHome);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentScrollY = window.scrollY;
      const isPastTop = currentScrollY > 20;

      // Guarded state updates (only update if state actually changed)
      setScrolled((prev) => (prev !== isPastTop ? isPastTop : prev));

      let nextVisible = true;

      if (isHome) {
        const hero = document.getElementById("hero");
        const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;

        // In hero or top of homepage (any screen size) -> hide header
        if (currentScrollY < 50 || heroBottom > 50) {
          nextVisible = false;
        } else if (currentScrollY < lastScrollY) {
          // Past hero & scrolling UP -> show header
          nextVisible = true;
        } else {
          // Past hero & scrolling DOWN -> hide header
          nextVisible = false;
        }
      } else {
        // Inner pages -> show header at top or when scrolling up
        if (currentScrollY < 50 || currentScrollY < lastScrollY) {
          nextVisible = true;
        } else {
          nextVisible = false;
        }
      }

      setVisible((prev) => (prev !== nextVisible ? nextVisible : prev));

      lastScrollY = currentScrollY;
      ticking = false;
    };

    update();

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed Header (Laptop + Mobile) ── */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div
          className={`flex items-center justify-between gap-4 px-[var(--gutter)] transition-colors duration-300 ${
            scrolled
              ? "bg-[#020814]/95 backdrop-blur-md border-b border-white/15 shadow-xl"
              : "bg-[#020814]/80 backdrop-blur-sm border-b border-white/10"
          }`}
          style={{ height: "4.5rem" }}
        >
          {/* Left: Brand Logo (Enlarged) */}
          <Link href="/" className="shrink-0 origin-left" onClick={() => triggerHaptic(25)}>
            <BrandMark />
          </Link>

          {/* Center: Primary Essential Nav Links (Decluttered: 4 items) */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {[
              { label: "Services", href: "/services" },
              { label: "States", href: "/states" },
              { label: "Fee Calculator", href: "/calculator" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <ChrHoverLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={pathname?.startsWith(l.href) && (l.href === "/" ? pathname === "/" : true)}
              />
            ))}
          </nav>

          {/* Right: Actions (Call Desk + Menu Button) */}
          <div className="flex items-center gap-3.5">
            {/* Quick Call Desk CTA */}
            <a
              href={TEL_HREF}
              className="hidden sm:inline-flex items-center gap-2 rounded border border-[var(--gold)]/50 bg-[var(--gold)]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[var(--gold-bright)] transition-all duration-200 hover:bg-[var(--gold)] hover:text-black"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Phone className="h-3.5 w-3.5 text-[var(--gold-bright)]" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>

            {/* Universal Menu Button */}
            <button
              type="button"
              className="flex items-center gap-2 rounded border border-sky-400/50 bg-[#040D21] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-sky-200 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black active:scale-95 transition-all duration-200 shadow-lg shadow-sky-500/10"
              onClick={() => { triggerHaptic(40); setMenuOpen(true); }}
              aria-label="Open navigation menu"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU (full-screen overlay) ── */}
      <div
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-0 z-[110] transition-opacity duration-300 flex flex-col justify-between ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          backgroundColor: "var(--obsidian)",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-[var(--line)] px-[var(--gutter)] py-4">
          <BrandMark />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--cream)] hover:border-[var(--gold)] transition-colors"
            onClick={() => { triggerHaptic(30); setMenuOpen(false); }}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile" className="flex flex-col px-[var(--gutter)] py-4 overflow-y-auto max-h-[60vh]">
          <Link
            href="/"
            onClick={() => { triggerHaptic(30); setMenuOpen(false); }}
            className="border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
          >
            Home
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => { triggerHaptic(30); setMenuOpen(false); }}
              className="border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact actions */}
        <div className="flex flex-col gap-3 px-[var(--gutter)] pb-8 pt-4 border-t border-[var(--line)]">
          <a
            href={TEL_HREF}
            className="btn-ghost w-full justify-center"
            onClick={() => { triggerHaptic(45); setMenuOpen(false); }}
          >
            <Phone className="h-3.5 w-3.5" />
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full justify-center"
            onClick={() => { triggerHaptic(45); setMenuOpen(false); }}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            WhatsApp Desk
          </a>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <main id="main">{children}</main>

      {/* ── GLOBAL FOOTER (non-homepage) ── */}
      {!isHome && (
        <footer className="border-t border-white/10 px-[var(--gutter)] py-14 text-sm"
          style={{ backgroundColor: "rgba(2,8,20,0.6)" }}
        >
          <div className="mx-auto max-w-[var(--page-max)]">
            <div className="grid gap-10 md:grid-cols-12">
              {/* Brand + Description */}
              <div className="md:col-span-4">
                <BrandMark />
                <p className="mt-4 max-w-sm text-sm font-medium text-[var(--white-55)]">
                  {SITE.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[0.55rem] font-bold uppercase tracking-widest text-[var(--white-40)]">
                  <span>JAIPUR, INDIA</span>
                  <span className="w-px h-3 bg-white/10" aria-hidden />
                  <LiveClock />
                </div>
              </div>

              {/* Navigation columns */}
              <div className="md:col-span-3">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Explore</p>
                <ul className="space-y-2.5 font-medium text-[var(--white-55)]">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-[var(--gold-bright)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="md:col-span-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Connect</p>
                <ul className="space-y-2.5 text-sm font-medium text-[var(--white-55)]">
                  <li>
                    <a href={`tel:+${CONTACT.phoneRaw}`} className="hover:text-[var(--gold-bright)] transition-colors">
                      {CONTACT.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--gold-bright)] transition-colors">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li className="text-[var(--white-40)]">
                    C-36, Capital Galleria, Sirsi Road, Kanakpura, Jaipur 302034
                  </li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={TEL_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-wider text-white hover:border-[var(--gold)]">
                    <Phone className="h-3 w-3" /> Call
                  </a>
                  <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.6rem] font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
                    <MessageSquare className="h-3 w-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar — Jasmine-style metadata */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.55rem] font-medium text-[var(--white-40)]">
                <span>© {new Date().getFullYear()} {SITE.name}</span>
                <span>ALL RIGHTS RESERVED</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.55rem] font-medium text-[var(--white-40)]">
                <Link href="/privacy-policy" className="hover:text-[var(--gold-bright)] transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-[var(--gold-bright)] transition-colors">Terms</Link>
                <Link href="/disclaimer" className="hover:text-[var(--gold-bright)] transition-colors">Disclaimer</Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* ── FLOATING CTA BUTTONS (mobile + desktop) ── */}
      <div
        role="complementary"
        aria-label="Quick contact"
        className="fixed z-50 flex flex-col items-end gap-3"
        style={{
          right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
          bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <a
          href={TEL_HREF}
          onClick={() => triggerHaptic(40)}
          className="flex h-11 items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-5 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[color,border-color,background-color] duration-300 hover:border-[var(--gold-bright)] hover:shadow-[0_0_25px_rgba(232,213,163,0.6)] hover:scale-105 active:scale-95"
          aria-label="Call"
        >
          <Phone className="h-3.5 w-3.5 text-[var(--gold-bright)]" />
          <span className="hidden sm:inline">Call Desk</span>
        </a>
        <a
          href={DEFAULT_WA}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerHaptic(40)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/60 text-white shadow-[0_0_25px_rgba(212,184,114,0.4)] backdrop-blur-md transition-[color,border-color,background-color] duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(232,213,163,0.8)] hover:border-[var(--gold-bright)] active:scale-95"
          style={{ background: "linear-gradient(135deg, rgba(232,213,163,0.35) 0%, rgba(184,142,68,0.6) 100%)" }}
          aria-label="WhatsApp"
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </a>
      </div>
    </>
  );
}
