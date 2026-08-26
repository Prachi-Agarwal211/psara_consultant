"use client";

import { useEffect, useRef } from "react";

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let rx = 0, ry = 0, trx = 0, tryy = 0;
    const loop = () => {
      rx += (trx - rx) * 0.15;
      ry += (tryy - ry) * 0.15;
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      trx = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      tryy = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    };
    const onEnter = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      trx = 0; tryy = 0;
      el.style.transition = "transform 0.5s var(--ease-elastic, cubic-bezier(0.175,0.885,0.32,1.275))";
      el.style.transform = "perspective(1000px)";
      setTimeout(() => { el.style.transition = ""; }, 500);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
