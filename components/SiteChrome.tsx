"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import BrandMark from "../app/components/ui/BrandMark";
import { CONTACT, OFFICES, SITE } from "../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../lib/whatsapp";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "States", href: "/states" },
  { label: "Cities", href: "/cities" },
  { label: "FAQ", href: "/faq" },
  { label: "Guides", href: "/psara-license" },
  { label: "Contact", href: "/contact" },
];

/** Subtle haptic vibration for mobile touch devices */
function triggerHaptic(ms = 35) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      // Haptics suppressed or unsupported
    }
  }
}

function ChrHoverLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`chr-hover text-xs font-bold uppercase tracking-widest ${
        active ? "text-[var(--gold)]" : "text-[var(--cream)]"
      }`}
      data-cursor={label}
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

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(!isHome);
  const [pastHero, setPastHero] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      setVisible(true);
      return;
    }
    const hero = document.getElementById("hero");
    if (!hero) {
      setPastHero(true);
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        const past = !e.isIntersecting && e.boundingClientRect.top < 0;
        setPastHero(past);
        setVisible(past);
      },
      { threshold: 0, rootMargin: "-10% 0px 0px 0px" }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [isHome, pathname]);

  useEffect(() => {
    if (!isHome) return;
    setVisible(pastHero);
  }, [pastHero, isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between gap-3 border-b border-[var(--line-gold)] bg-[var(--obsidian)] px-[var(--gutter)]">
          <Link href="/" className="shrink-0 scale-90 origin-left" onClick={() => triggerHaptic(25)}>
            <BrandMark />
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <ChrHoverLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={pathname?.startsWith(l.href)}
              />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={TEL_HREF} className="hidden btn-ghost px-4 py-2 sm:inline-flex" data-cursor="Call">
              <Phone className="h-3.5 w-3.5" />
              Call
            </a>
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden btn-gold px-4 py-2 sm:inline-flex"
              data-cursor="WhatsApp"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--cream)] lg:hidden"
              onClick={() => {
                triggerHaptic(40);
                setMenuOpen(true);
              }}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu with safe area insets */}
      <div
        className={`fixed inset-0 z-[110] transition-opacity duration-300 flex flex-col justify-between ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          background: "var(--obsidian)",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-[var(--gutter)] py-4">
          <BrandMark />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--cream)]"
            onClick={() => {
              triggerHaptic(30);
              setMenuOpen(false);
            }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col px-[var(--gutter)] py-4 overflow-y-auto max-h-[60vh]">
          <Link
            href="/"
            onClick={() => {
              triggerHaptic(30);
              setMenuOpen(false);
            }}
            className="border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]"
          >
            Home
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => {
                triggerHaptic(30);
                setMenuOpen(false);
              }}
              className="border-b border-[var(--line)] py-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 px-[var(--gutter)] pb-8 pt-4 border-t border-[var(--line)]">
          <a
            href={TEL_HREF}
            className="btn-ghost w-full justify-center"
            onClick={() => {
              triggerHaptic(45);
              setMenuOpen(false);
            }}
          >
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full justify-center"
            onClick={() => {
              triggerHaptic(45);
              setMenuOpen(false);
            }}
          >
            WhatsApp Desk
          </a>
        </div>
      </div>

      {children}

      {/* Global footer for multi-page */}
      {!isHome && (
        <footer className="border-t border-[var(--line-gold)] bg-[var(--obsidian)] px-[var(--gutter)] py-14 text-sm">
          <div className="mx-auto grid max-w-[var(--page-max)] gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <BrandMark />
              <p className="mt-4 max-w-sm font-medium text-[var(--cream-dim)]">{SITE.description}</p>
            </div>
            <div className="md:col-span-3">
              <p className="label-meta mb-3 font-bold text-[var(--gold)]">Explore</p>
              <ul className="space-y-2 font-semibold text-[var(--cream-dim)]">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-[var(--gold)]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5">
              <p className="label-meta mb-3 font-bold text-[var(--gold)]">Offices</p>
              <ul className="space-y-2 font-semibold text-[var(--cream-dim)]">
                {OFFICES.map((o) => (
                  <li key={o.city}>
                    <strong className="text-[var(--cream)]">{o.city}</strong> — {o.badge}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={TEL_HREF} className="btn-ghost">
                  Call
                </a>
                <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-[var(--page-max)] label-meta text-[var(--cream)]/35">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </footer>
      )}

      {/* Floating dual CTA for mobile & desktop */}
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
          className="flex h-11 items-center gap-2 rounded border border-[var(--line-gold)] bg-[var(--obsidian)] px-4 text-xs font-bold uppercase tracking-wider text-[var(--cream)] shadow-md hover:border-[var(--gold)] transition-colors active:scale-95"
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
          className="flex h-11 w-11 items-center justify-center rounded bg-[var(--gold)] text-[var(--obsidian)] shadow-md hover:bg-[var(--gold-soft)] transition-colors active:scale-95"
          aria-label="WhatsApp"
        >
          <MessageSquare className="h-5 w-5" />
        </a>
      </div>
    </>
  );
}
