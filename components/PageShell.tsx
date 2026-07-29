"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { wordBlurReveal } from "../app/lib/gsap";

/* ── Section Label (Jasmine's caption-1 / caption-2 pattern) ── */
function SectionLabel({ label, position = "left" }: { label: string; position?: "left" | "right" }) {
  return (
    <span
      className="section-label hidden md:block font-[family-name:var(--font-accent)] text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)] opacity-60"
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        position: "absolute",
        [position]: "-1.75rem",
        top: "0.25rem",
      }}
    >
      {label}
    </span>
  );
}

/* ── Breadcrumb Navigation ── */
function Breadcrumbs({ crumbs }: { crumbs?: { label: string; href?: string }[] }) {
  if (!crumbs || crumbs.length === 0) return null;
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--text-dim)]">
      <Link href="/" className="hover:text-[var(--gold)] transition-colors">
        Home
      </Link>
      {crumbs.map((c) => (
        <span key={c.label} className="flex items-center gap-2">
          <span className="text-[var(--gold)] opacity-40">/</span>
          {c.href ? (
            <Link href={c.href} className="hover:text-[var(--gold)] transition-colors">
              {c.label}
            </Link>
          ) : (
            <span className="text-[var(--cream)]">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PageHero — main page header with dossier feel
   Jasmine: clean layout with gold accents + metadata
   Luke: word-blur typography, chr-hover interaction
   PSARA: statutory authority + warm trust
   ═══════════════════════════════════════════════════════════════ */
export function PageHero({
  roman,
  eyebrow,
  title,
  lead,
  crumbs,
  ornament = true,
}: {
  roman?: string;
  eyebrow?: string;
  title: string;
  lead: string;
  crumbs?: { label: string; href?: string }[];
  ornament?: boolean;
}) {
  const leadRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (leadRef.current) {
      wordBlurReveal(leadRef.current, "top 92%");
    }
  }, []);

  return (
    <header
      className="relative overflow-hidden border-b border-[var(--line-gold)] px-[var(--gutter)] pb-14 pt-28 md:pt-32"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Simple flat header background — no atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden
        style={{ backgroundColor: "var(--obsidian-2)", opacity: 0.3 }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--page-max)]">
        <Breadcrumbs crumbs={crumbs} />

        {/* Roman numeral as simple metadata — not a kicker */}
        {roman && (
          <span
            className="font-[family-name:var(--font-accent)] text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-faint)]"
            aria-hidden
          >
            — {roman}
          </span>
        )}

        {/* Main title — no kicker, no eyebrow, just the thing */}
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-[var(--cream)]"
          style={{ fontFamily: "var(--font-display)", maxWidth: "48rem" }}
        >
          {title}
        </h1>

        {/* Lead paragraph — word-blur reveal on scroll */}
        <p
          ref={leadRef}
          className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed font-medium text-[var(--text-muted)]"
        >
          {lead}
        </p>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PageMain — content wrapper with optional theme
   ═══════════════════════════════════════════════════════════════ */
export function PageMain({
  children,
  theme = "dark",
}: {
  children: ReactNode;
  theme?: "dark" | "warm" | "cream" | "paper";
}) {
  const themeClass =
    theme === "warm" ? "theme-warm-dark" :
    theme === "cream" ? "theme-warm-cream" :
    theme === "paper" ? "theme-paper" :
    "theme-ink";

  return (
    <div className={`px-[var(--gutter)] py-14 md:py-20 ${themeClass}`}>
      <div className="mx-auto max-w-[var(--page-max)]">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Prose — rich text content (Jasmine's clean typography + statutory authority)
   ═══════════════════════════════════════════════════════════════ */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-6 text-base font-medium leading-relaxed text-[var(--cream-soft)]
      [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:font-[family-name:var(--font-display)] [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[var(--cream)] [&_h1]:tracking-tight
      [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--cream)] [&_h2]:tracking-tight [&_h2]:border-b [&_h2]:border-[var(--line)] [&_h2]:pb-2
      [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-[family-name:var(--font-display)] [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[var(--gold)] [&_h3]:tracking-tight
      [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-[family-name:var(--font-display)] [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-[var(--cream)]
      [&_p]:leading-relaxed [&_p]:text-[var(--cream-soft)] [&_p]:mb-4
      [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-6
      [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal
      [&_li]:list-disc [&_li]:text-[var(--cream-dim)] [&_li]:leading-relaxed
      [&_ol_li]:list-decimal
      [&_strong]:font-bold [&_strong]:text-[var(--cream)]
      [&_em]:italic [&_em]:text-[var(--gold-soft)]
      [&_a]:text-[var(--gold)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-[var(--gold-soft)] [&_a]:transition-colors
      [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--gold)] [&_blockquote]:bg-[var(--obsidian-soft)] [&_blockquote]:p-4 [&_blockquote]:italic [&_blockquote]:text-[var(--cream)]
      [&_code]:rounded [&_code]:bg-[var(--obsidian-soft)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-[var(--gold)]
      [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:border [&_pre]:border-[var(--line)] [&_pre]:bg-[var(--obsidian-soft)] [&_pre]:p-4
      [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
      [&_th]:border [&_th]:border-[var(--line)] [&_th]:bg-[var(--obsidian-soft)] [&_th]:p-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-[var(--gold)]
      [&_td]:border [&_td]:border-[var(--line)] [&_td]:p-3 [&_td]:text-[var(--cream-dim)]
      [&_hr]:my-8 [&_hr]:border-[var(--line)]
    ">
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ProseLight — for light/cream backgrounds
   ═══════════════════════════════════════════════════════════════ */
export function ProseLight({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-6 text-base font-semibold leading-relaxed text-[var(--ink-muted)]
      [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:font-[family-name:var(--font-display)] [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[var(--ink)] [&_h1]:tracking-tight
      [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--ink)] [&_h2]:tracking-tight [&_h2]:border-b [&_h2]:border-[var(--ink)]/15 [&_h2]:pb-2
      [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-[family-name:var(--font-display)] [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[var(--sapphire)] [&_h3]:tracking-tight
      [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-[family-name:var(--font-display)] [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-[var(--ink)]
      [&_p]:leading-relaxed [&_p]:mb-4
      [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-6
      [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal
      [&_li]:list-disc [&_li]:text-[var(--ink-soft)]
      [&_ol_li]:list-decimal
      [&_strong]:font-bold [&_strong]:text-[var(--ink)]
      [&_em]:italic [&_em]:text-[var(--sapphire-deep)]
      [&_a]:text-[var(--sapphire)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-[var(--sapphire-deep)]
      [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--sapphire)] [&_blockquote]:bg-white [&_blockquote]:p-4 [&_blockquote]:italic
      [&_hr]:my-8 [&_hr]:border-[var(--ink)]/15
    ">
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Decorative Section Heading with side caption (Jasmine style)
   ── Usage: <SectionHeading number="01" caption="PURPOSEFUL DESIGN">TITLE</SectionHeading>
   ═══════════════════════════════════════════════════════════════ */
export function SectionHeading({
  children,
  number,
  caption,
  className = "",
}: {
  children: ReactNode;
  number?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`heading-display mb-8 ${className}`}>
      <div className="flex items-center gap-3 mb-1">
        {number && (
          <span className="num-marker num-marker-sm text-[var(--gold)] opacity-30">
            {number}
          </span>
        )}
        <span className="flex-1 h-px bg-[var(--line-gold)]" aria-hidden />
        {caption && (
          <span className="text-[0.5rem] font-bold uppercase tracking-widest text-[var(--gold)] opacity-60">
            {caption}
          </span>
        )}
      </div>
      <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-[var(--cream)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Card wrapper — numbered, with corner ornaments, hover glow
   ── Usage: <DossierCard number="01" title="..." desc="...">content</DossierCard>
   ═══════════════════════════════════════════════════════════════ */
export function DossierCard({
  number,
  title,
  desc,
  href,
  children,
  className = "",
}: {
  number?: string;
  title?: string;
  desc?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
}) {
  const inner = (
    <>
      {/* Corner ornaments on hover */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-transparent group-hover:border-[var(--gold)] transition-colors duration-500" aria-hidden />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-transparent group-hover:border-[var(--gold)] transition-colors duration-500" aria-hidden />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-transparent group-hover:border-[var(--gold)] transition-colors duration-500" aria-hidden />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-transparent group-hover:border-[var(--gold)] transition-colors duration-500" aria-hidden />

      {number && (
        <span className="num-marker absolute top-4 right-4 text-[2rem] opacity-20 group-hover:opacity-40 transition-opacity">
          {number}
        </span>
      )}
      <div className="p-6">
        {title && (
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
            {title}
          </h3>
        )}
        {desc && (
          <p className="mt-2 text-sm font-medium text-[var(--text-muted)]">{desc}</p>
        )}
        {children}
        {href && (
          <span className="mt-3 inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-wider text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity">
            View <ArrowUpRight className="h-3 w-3" />
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group relative border border-[var(--line)] hover:border-[var(--line-gold)] transition-all duration-300 card-glow-hover ${className}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={`group relative border border-[var(--line)] hover:border-[var(--line-gold)] transition-all duration-300 card-glow-hover ${className}`}>
      {inner}
    </div>
  );
}
