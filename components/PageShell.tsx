import type { ReactNode } from "react";
import Link from "next/link";

export function PageHero({
  roman,
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  roman?: string;
  eyebrow: string;
  title: string;
  lead: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <header
      className="relative overflow-hidden border-b border-[var(--line-sky)] px-[var(--gutter)] pb-14 pt-28 md:pt-32"
      style={{ background: "var(--grad-dark-sky)" }}
    >
      <div className="ambient-glow ambient-glow--sky opacity-70" aria-hidden>
        <span className="orb-gold" />
      </div>
      <div className="guilloche-sky absolute inset-0 opacity-35" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-[2px] opacity-70"
        style={{ background: "var(--grad-spectrum)" }}
      />
      <div className="relative z-10 mx-auto max-w-[var(--page-max)]">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-6 flex flex-wrap gap-2 text-xs font-semibold text-[var(--cream-dim)]">
            <Link href="/" className="hover:text-[var(--gold-soft)]">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span className="text-[var(--gold)]/50">/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-[var(--gold-soft)]">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[var(--cream)]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="eyebrow">
          {roman && <span className="roman text-sm font-bold">{roman}</span>}
          <span className="pill font-bold">{eyebrow}</span>
        </div>
        <h1 className="display-xl max-w-4xl font-bold text-[var(--cream)]">{title}</h1>
        <p className="body-copy mt-5 max-w-2xl text-base font-medium text-[var(--text-muted)]">
          {lead}
        </p>
      </div>
    </header>
  );
}

export function PageMain({ children, paper = false }: { children: ReactNode; paper?: boolean }) {
  return (
    <div
      className={`px-[var(--gutter)] py-14 md:py-20 ${paper ? "theme-paper" : "theme-ink"}`}
    >
      <div className="mx-auto max-w-[var(--page-max)]">{children}</div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-[0.98rem] font-medium leading-relaxed text-[var(--text-muted)] [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--cream)] [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-bold [&_strong]:text-[var(--gold-soft)]">
      {children}
    </div>
  );
}

export function ProseLight({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-[0.98rem] font-semibold leading-relaxed text-[var(--ink-muted)] [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--ink)] [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-bold [&_strong]:text-[var(--ink)]">
      {children}
    </div>
  );
}
