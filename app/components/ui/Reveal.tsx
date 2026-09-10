"use client";

/**
 * Reveal — CSS-only scroll reveal via IntersectionObserver.
 * No GSAP, no conflicts, mobile-safe. Usage:
 * <Reveal>...</Reveal> or <Reveal variant="left" delay={120}>...</Reveal>
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "up" | "scale" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  id?: string;
};

const VARIANTS: Record<string, string> = {
  up: "reveal",
  scale: "reveal reveal-scale",
  left: "reveal reveal-left",
  right: "reveal reveal-right",
  none: "",
};

export default function Reveal({ children, variant = "up", delay = 0, className = "", id }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || variant === "none") return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  if (variant === "none") {
    return <div id={id} className={className}>{children}</div>;
  }

  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  return (
    <div ref={ref} id={id} style={style} className={`${VARIANTS[variant]} ${className}`}>
      {children}
    </div>
  );
}
