"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/gsap";

export default function MagneticButton({
  children,
  className = "btn-gold",
  as = "button",
  href,
  target,
  rel,
  onClick,
  dataCursor,
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  dataCursor?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || prefersReducedMotion()) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.18,
      y: (e.clientY - r.top - r.height / 2) * 0.18,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  const cursorAttr = dataCursor ? { "data-cursor": dataCursor } : {};

  if (as === "a" && href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        {...cursorAttr}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      {...cursorAttr}
    >
      {children}
    </button>
  );
}
