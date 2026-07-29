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
  { label: "Cities", href: "/cities" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Guides", href: "/psara-license" },
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
          <span key={i} className="ch-top" style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
        {label.split("").map((ch, i) => (
          <span key={i} className="ch-bot" style={{ "--i": i } as React.CSSProperties}>
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
  const [visible, setVisible] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY < 10) {
        // On homepage, wait until past hero before showing
        if (isHome) {
          const hero = document.getElementById("hero");
          if (hero) {
            const heroBottom = hero.getBoundingClientRect().bottom;
            setVisible(heroBottom < 0);
          } else {
            setVisible(true);
          }
        } else {
          setVisible(true);
        }
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down → hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up → show
        setVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Initial state
    if (!isHome) {
      setVisible(true);
    } else {
      const hero = document.getElementById("hero");
      if (!hero) {
        setVisible(true);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── HEADER (Jasmine-inspired: metadata + clean nav) ── */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div
          className="flex h-[var(--header-h)] items-center justify-between gap-3 border-b border-[var(--line-gold)] px-[var(--gutter)]"
          style={{ backgroundColor: "color-mix(in srgb, var(--obsidian) 95%, transparent)" }}
        >
          {/* Left: Brand */}
          <Link href="/" className="shrink-0 origin-left" onClick={() => triggerHaptic(25)}>
            <BrandMark />
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {links.map((l) => (
              <ChrHoverLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={pathname?.startsWith(l.href) && (l.href === "/" ? pathname === "/" : true)}
              />
            ))}
          </nav>

          {/* Right: Actions + Jasmine-style metadata */}
          <div className="flex items-center gap-3">
            {/* Jasmine-inspired header metadata (hidden on mobile) */}
            <div className="hidden xl:flex items-center gap-3 text-[0.55rem] font-bold uppercase tracking-widest text-[var(--text-faint)] mr-2">
              <span>JAIPUR HQ</span>
              <span className="w-px h-3 bg-[var(--line-gold)]" aria-hidden />
              <LiveClock />
              <span className="w-px h-3 bg-[var(--line-gold)]" aria-hidden />
              <span>26.91°N 75.79°E</span>
            </div>

            <a
              href={TEL_HREF}
              data-cursor="Call Now"
              className="hidden sm:inline-flex btn-ghost px-4 py-2 text-[0.6rem]"
            >
              <Phone className="h-3 w-3" />
              Call
            </a>
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WhatsApp"
              className="hidden sm:inline-flex btn-gold px-4 py-2 text-[0.6rem]"
            >
              <MessageSquare className="h-3 w-3" />
              WhatsApp
            </a>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--cream)] lg:hidden hover:border-[var(--gold)] transition-colors"
              onClick={() => { triggerHaptic(40); setMenuOpen(true); }}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU (full-screen overlay) ── */}
      <div
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
        <nav className="flex flex-col px-[var(--gutter)] py-4 overflow-y-auto max-h-[60vh]">
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
      {children}

      {/* ── GLOBAL FOOTER (non-homepage) ── */}
      {!isHome && (
        <footer className="border-t border-[var(--line-gold)] px-[var(--gutter)] py-14 text-sm"
          style={{ backgroundColor: "var(--warm-dark-3)" }}
        >
          <div className="mx-auto max-w-[var(--page-max)]">
            <div className="grid gap-10 md:grid-cols-12">
              {/* Brand + Description */}
              <div className="md:col-span-4">
                <BrandMark />
                <p className="mt-4 max-w-sm text-sm font-medium text-[var(--text-dim)]">
                  {SITE.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[0.55rem] font-bold uppercase tracking-widest text-[var(--text-faint)]">
                  <span>JAIPUR, INDIA</span>
                  <span className="w-px h-3 bg-[var(--line-gold)]" />
                  <LiveClock />
                </div>
              </div>

              {/* Navigation columns */}
              <div className="md:col-span-3">
                <p className="label-meta mb-4 font-bold text-[var(--gold)]">Explore</p>
                <ul className="space-y-2.5 font-medium text-[var(--text-dim)]">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-[var(--gold)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="md:col-span-5">
                <p className="label-meta mb-4 font-bold text-[var(--gold)]">Connect</p>
                <ul className="space-y-2.5 text-sm font-medium text-[var(--text-dim)]">
                  <li>
                    <a href={`tel:+${CONTACT.phoneRaw}`} className="hover:text-[var(--gold)] transition-colors">
                      {CONTACT.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--gold)] transition-colors">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li className="text-[var(--text-faint)]">
                    C-36, Capital Galleria, Sirsi Road, Kanakpura, Jaipur 302034
                  </li>
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={TEL_HREF} className="btn-ghost px-4 py-2 text-[0.6rem]">
                    <Phone className="h-3 w-3" /> Call
                  </a>
                  <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn-gold px-4 py-2 text-[0.6rem]">
                    <MessageSquare className="h-3 w-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar — Jasmine-style metadata */}
            <div className="mt-10 pt-6 border-t border-[var(--line-gold)] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.55rem] font-medium text-[var(--text-faint)]">
                <span>© {new Date().getFullYear()} {SITE.name}</span>
                <span>ALL RIGHTS RESERVED</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.55rem] font-medium text-[var(--text-faint)]">
                <Link href="/privacy-policy" className="hover:text-[var(--gold)] transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-[var(--gold)] transition-colors">Terms</Link>
                <Link href="/disclaimer" className="hover:text-[var(--gold)] transition-colors">Disclaimer</Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* ── FLOATING CTA BUTTONS (mobile + desktop) ── */}
      <div
        className="fixed z-50 flex flex-col items-end gap-2"
        style={{
          right: "calc(1rem + env(safe-area-inset-right, 0px))",
          bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <a
          href={TEL_HREF}
          onClick={() => triggerHaptic(40)}
          className="flex h-11 items-center gap-2 rounded border border-[var(--line-gold)] bg-[var(--obsidian)] px-4 text-[0.6rem] font-bold uppercase tracking-wider text-[var(--cream)] shadow-lg hover:border-[var(--gold)] transition-colors active:scale-95"
          aria-label="Call"
        >
          <Phone className="h-3.5 w-3.5 text-[var(--gold)]" />
          <span className="hidden sm:inline">Call</span>
        </a>
        <a
          href={DEFAULT_WA}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerHaptic(40)}
          className="flex h-11 w-11 items-center justify-center rounded bg-[var(--gold)] text-[var(--warm-dark)] shadow-lg hover:bg-[var(--gold-soft)] transition-colors active:scale-95"
          aria-label="WhatsApp"
        >
          <MessageSquare className="h-5 w-5" />
        </a>
      </div>
    </>
  );
}
