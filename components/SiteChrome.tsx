"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";
import BrandMark from "../app/components/ui/BrandMark";
import { CONTACT } from "../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../lib/whatsapp";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "States", href: "/states" },
  { label: "Fee Calculator", href: "/calculator" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Certifications", href: "/certification" },
  { label: "Contact", href: "/contact" },
];

const PRIMARY_NAV_LINKS = NAV_LINKS.filter((link) =>
  ["/about", "/services", "/states", "/calculator", "/contact"].includes(link.href),
);

export function SiteHeader({ pathname, homePlacement = false }: { pathname: string; homePlacement?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(!homePlacement);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentScrollY = window.scrollY;
      const hero = homePlacement ? document.getElementById("hero") : null;
      const heroBottom = hero ? hero.getBoundingClientRect().bottom + currentScrollY : 0;
      const isPastHero = homePlacement
        ? currentScrollY > Math.max(heroBottom - 12, 20)
        : currentScrollY > 20;

      setScrolled(isPastHero);

      if (homePlacement && !isPastHero) {
        setVisible(false);
      } else if (currentScrollY < 60) {
        setVisible(!homePlacement);
      } else if (currentScrollY < lastScrollY - 5) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setVisible(false);
      }

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
  }, [homePlacement]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isHeaderShown = visible && (!homePlacement || scrolled);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ease-out ${
          isHeaderShown ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isHeaderShown}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          viewTransitionName: "navbar",
        }}
      >
        <div
          className={`flex items-center justify-between gap-4 px-[var(--gutter)] transition-all duration-300 ${
            homePlacement && !scrolled
              ? "border-b border-[#0B1E3B]/10 bg-[#FFFDF5]/90 text-[#0B1E3B] backdrop-blur"
              : scrolled
                ? "bg-[#0B1E3B]/95 backdrop-blur-md border-b border-[#E76F00]/40 shadow-xl text-white"
                : "bg-[#0B1E3B]/90 backdrop-blur-sm border-b border-white/10 text-white"
          }`}
          style={{ height: "4.5rem" }}
        >
          {/* Brand Logo — ponytail: lockup PNG carries the name, no duplicate text (was invisible white-on-cream on home header) */}
          <Link href="/" className="shrink-0 flex items-center gap-2.5" aria-label="PSARA Consultant India home">
            <BrandMark variant="light" compact />
          </Link>

          {/* Center: Main Primary Desktop Nav */}
          <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-0">
            {PRIMARY_NAV_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 py-1.5 px-2 relative ${
                    active ? "text-[#FFB25E]" : "text-white/75 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>{l.label}</span>
                  {active && (
                    <span className="absolute bottom-0 inset-x-2 h-[2px] bg-[#E76F00] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Quick Call */}
            <a
              href={TEL_HREF}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#E76F00]/75 bg-[#0B1E3B]/55 px-4 py-2.5 text-xs font-bold uppercase tracking-[.06em] text-[#FFB25E] transition-all duration-200 hover:bg-[#E76F00] hover:text-[#0B1E3B]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>

            {/* Universal Menu Button */}
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E76F00]/70 bg-[#0B1E3B]/70 p-0 text-xs font-bold uppercase tracking-[.08em] text-white shadow-md transition-all duration-200 hover:border-[#FFB25E] hover:text-[#FFB25E] active:scale-95"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="site-navigation-drawer"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Menu className="h-4 w-4 text-[#E76F00]" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-navigation-drawer"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[120] transition-opacity duration-300 flex flex-col justify-between ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          backgroundColor: "#0B1E3B",
          color: "#FFFFFF",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/15 px-[var(--gutter)] py-4">
          <BrandMark variant="light" />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white hover:border-[#E76F00] hover:text-[#FFB25E] transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav aria-label="Mobile Navigation" className="flex flex-col px-[var(--gutter)] py-6 overflow-y-auto max-h-[60vh] space-y-1">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between border-b border-white/10 py-3.5 font-bold text-lg text-white hover:text-[#FFB25E] transition-colors"
          >
            <span>Home</span>
            <ArrowRight className="h-4 w-4 text-white/40" />
          </Link>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-3.5 font-bold text-lg text-white hover:text-[#FFB25E] transition-colors"
            >
              <span>{l.label}</span>
              <ArrowRight className="h-4 w-4 text-[#E76F00]" />
            </Link>
          ))}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="flex flex-col gap-3 px-[var(--gutter)] pb-8 pt-4 border-t border-white/15 bg-gradient-to-br from-[#1A3A6B] to-[#132E57]">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <ShieldCheck className="h-4 w-4 text-[#E76F00]" />
            <span>Pan-India Statutory PSARA Advisory Desk</span>
          </div>
          <a
            href={TEL_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <Phone className="h-4 w-4 text-[#FFB25E]" />
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:brightness-110"
            style={{ background: "var(--grad-wa)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 26px -10px rgba(4,106,56,0.6)" }}
            onClick={() => setMenuOpen(false)}
          >
            <MessageSquare className="h-4 w-4 fill-white" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

    </>
  );
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <SiteHeader pathname={pathname ?? ""} />}
      <div id="main">{children}</div>
    </>
  );
}
