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
              ? "border-b border-white/10 bg-gradient-to-b from-[#050B14]/90 via-[#050B14]/55 to-transparent text-white"
              : scrolled
                ? "bg-[#050B14]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-2xl shadow-black/60 text-white"
                : "bg-[#050B14]/80 backdrop-blur-sm border-b border-white/10 text-white"
          }`}
          style={{ height: "4.5rem" }}
        >
          {/* Brand Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2.5" aria-label="PSARA Consultant India home">
            <BrandMark variant="light" compact />
            <span className="flex flex-col justify-center leading-none text-white">
              <span className="text-[0.95rem] font-bold uppercase tracking-[0.16em]">PSARA</span>
              <span className="mt-1 hidden text-[0.52rem] font-bold uppercase tracking-[0.2em] text-[#E8D5A3] sm:block">Consultant India</span>
            </span>
          </Link>

          {/* Center: Main Primary Desktop Nav */}
          <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-0">
            {PRIMARY_NAV_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 py-1.5 px-2 relative after:ml-4 after:text-[#D4AF37] after:content-['·'] last:after:hidden ${
                    active ? "text-[#E8D5A3]" : "text-white/75 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>{l.label}</span>
                  {active && (
                    <span className="absolute bottom-0 inset-x-2 h-[2px] bg-[#D4AF37] rounded-full" />
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
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/75 bg-[#071525]/45 px-4 py-2.5 text-xs font-bold uppercase tracking-[.06em] text-[#E8D5A3] transition-all duration-200 hover:bg-[#D4AF37] hover:text-[#050B14]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>

            {/* Universal Menu Button */}
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/70 bg-[#071525]/60 p-0 text-xs font-bold uppercase tracking-[.08em] text-white shadow-md transition-all duration-200 hover:border-[#E8D5A3] hover:text-[#E8D5A3] active:scale-95"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="site-navigation-drawer"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Menu className="h-4 w-4 text-[#D4AF37]" />
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
          backgroundColor: "#050B14",
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#F5D061] transition-colors"
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
            className="flex items-center justify-between border-b border-white/10 py-3.5 font-bold text-lg text-white hover:text-[#F5D061] transition-colors"
          >
            <span>Home</span>
            <ArrowRight className="h-4 w-4 text-white/40" />
          </Link>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-3.5 font-bold text-lg text-white hover:text-[#F5D061] transition-colors"
            >
              <span>{l.label}</span>
              <ArrowRight className="h-4 w-4 text-[#D4AF37]" />
            </Link>
          ))}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="flex flex-col gap-3 px-[var(--gutter)] pb-8 pt-4 border-t border-white/15 bg-[#10243A]">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
            <span>Pan-India Statutory PSARA Advisory Desk</span>
          </div>
          <a
            href={TEL_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <Phone className="h-4 w-4 text-[#F5D061]" />
            Call {CONTACT.phoneDisplay}
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:brightness-110"
            style={{ background: "var(--grad-wa)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 10px 26px -10px rgba(18,140,126,0.6)" }}
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
