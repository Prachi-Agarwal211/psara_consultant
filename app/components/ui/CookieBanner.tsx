"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X, Settings, Lock } from "lucide-react";

export default function CookieBanner() {
  const [mounted] = useState(() => typeof window !== "undefined");
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);

  // Preference toggles
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);

  useEffect(() => {
    const syncHeroBoundary = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
      setHeroPassed(!hero || window.scrollY >= heroBottom);
    };

    syncHeroBoundary();
    window.addEventListener("scroll", syncHeroBoundary, { passive: true });
    return () => window.removeEventListener("scroll", syncHeroBoundary);
  }, []);

  useEffect(() => {
    if (!heroPassed) return;
    const consent = localStorage.getItem("psara_cookie_consent");
    if (!consent) {
      // Delay entrance slightly for non-intrusive presentation
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [heroPassed]);

  const handleAcceptAll = () => {
    const preferences = { essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    localStorage.setItem("psara_cookie_consent", JSON.stringify(preferences));
    setIsOpen(false);
    setShowSettingsModal(false);
  };

  const handleAcceptNecessary = () => {
    const preferences = { essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
    localStorage.setItem("psara_cookie_consent", JSON.stringify(preferences));
    setIsOpen(false);
    setShowSettingsModal(false);
  };

  const handleSaveCustom = () => {
    const preferences = {
      essential: true,
      analytics: analyticsCookies,
      marketing: marketingCookies,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("psara_cookie_consent", JSON.stringify(preferences));
    setIsOpen(false);
    setShowSettingsModal(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── FLOATING COOKIE CONSENT BAR ── */}
      {isOpen && !showSettingsModal && (
        <div
          role="dialog"
          aria-label="Cookie consent banner"
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] left-4 right-4 z-[999] rounded-2xl border-2 border-[#C89B3C]/45 bg-[#0D0A18]/95 p-5 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 md:bottom-4 md:right-auto md:max-w-md"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C89B3C]/12 border border-[#C89B3C]/45 flex items-center justify-center text-[#F5E6BA] shrink-0">
                <Cookie className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white tracking-wide uppercase" style={{ fontFamily: "var(--font-display)" }}>
                  Cookie Privacy &amp; Security
                </h3>
                <span className="text-[0.62rem] font-bold text-[#F5E6BA] uppercase tracking-wider">
                  PSARA Act Compliance
                </span>
              </div>
            </div>
            <button
              onClick={handleAcceptNecessary}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-normal mb-4">
            We use essential cookies to maintain statutory filing session state, security verification, and compliance analytics across 36 States &amp; UTs.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] via-[var(--gold)] to-[var(--gold-bright)] text-black font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Accept All
            </button>
            <button
              onClick={handleAcceptNecessary}
              className="py-2.5 px-3.5 rounded-xl border border-[#C89B3C]/45 bg-[#1A1408]/70 text-[#F5E6BA] hover:bg-[#2A2010] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Necessary Only
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              aria-label="Customize cookie settings"
              title="Customize Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[0.62rem] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Data Protection
            </span>
            <Link href="/privacy-policy" className="hover:text-[#F5E6BA] transition-colors underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      )}

      {/* ── COOKIE PREFERENCES MODAL ── */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border-2 border-[#C89B3C]/45 bg-[#0D0A18] p-6 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C89B3C]/12 border border-[#C89B3C]/45 flex items-center justify-center text-[#F5E6BA]">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-wide uppercase" style={{ fontFamily: "var(--font-display)" }}>
                    Cookie Preferences
                  </h3>
                  <p className="text-xs text-[#F5E6BA] font-medium">
                    Manage statutory &amp; analytics tracking permissions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Category 1: Essential (Always Active) */}
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Essential &amp; Statutory Cookies</span>
                  </div>
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Required for core PSARA filing session security, state directory preservation, and CSRF protection. Cannot be turned off.
                </p>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="p-4 rounded-xl border border-white/15 bg-[#061433] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Analytics &amp; Performance</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsCookies}
                      onChange={(e) => setAnalyticsCookies(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C89B3C]"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Helps us analyze state traffic metrics, fee calculator usage, and search query trends to improve portal speed.
                </p>
              </div>

              {/* Category 3: Marketing & Desk Routing */}
              <div className="p-4 rounded-xl border border-white/15 bg-[#061433] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Marketing &amp; Desk Routing</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingCookies}
                      onChange={(e) => setMarketingCookies(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C89B3C]"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Allows instant WhatsApp desk routing and customized regional PSARA consultancy support based on your state selection.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2.5 rounded-xl border border-[#C89B3C]/45 bg-[#1A1408]/80 text-[#F5E6BA] font-bold text-xs uppercase tracking-wider hover:bg-[#2A2010] transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] via-[var(--gold)] to-[var(--gold-bright)] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
