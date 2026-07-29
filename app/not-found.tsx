import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { SITE, CONTACT } from "../lib/config";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page does not exist. Browse PSARA License guides or contact us.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-[var(--gutter)] text-center"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Decorative background mark */}
      <div
        className="pointer-events-none absolute select-none font-[family-name:var(--font-accent)] text-[clamp(12rem,40vw,30rem)] font-bold leading-none tracking-tight opacity-[0.03]"
        aria-hidden
      >
        404
      </div>

      <div className="relative z-10 max-w-lg">
        {/* Dossier seal */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--gold)]/30">
          <Shield className="h-8 w-8 text-[var(--gold)]" />
        </div>

        {/* Small gold label */}
        <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
          DOSSIER NOT FOUND
        </span>

        <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[var(--cream)]">
          This file does not exist in our registry.
        </h1>

        <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--text-muted)]">
          The page you&apos;re looking for may have been moved, renamed, or never filed with the
          Controlling Authority. Try navigating from the homepage, or call us for a direct route.
        </p>

        {/* Action links */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
          <a
            href={`tel:+${CONTACT.phoneRaw}`}
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider"
          >
            Call {CONTACT.phoneDisplay}
          </a>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-6 border-t border-[var(--line)]">
          <p className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--text-faint)] mb-3">
            Popular destinations
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "PSARA License Guide", href: "/psara-license" },
              { label: "Services", href: "/services" },
              { label: "States", href: "/states" },
              { label: "FAQ", href: "/faq" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-[var(--line)] px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-wider text-[var(--text-dim)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer context */}
      <p className="relative z-10 mt-16 text-[0.5rem] font-medium text-[var(--text-faint)]">
        {SITE.name} &middot; Statute-First &middot; Verification-Ready
      </p>
    </div>
  );
}
