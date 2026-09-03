"use client";

import { useEffect, useRef } from "react";

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    // ponytail: keep tilt only on capable desktop, throttle rAF, pause when offscreen
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let raf = 0;
    let rx = 0, ry = 0, trx = 0, tryy = 0;
    let visible = false;
    const loop = () => {
      if (!visible) return;
      rx += (trx - rx) * 0.12;
      ry += (tryy - ry) * 0.12;
      // skip tiny updates to avoid layout thrash
      if (Math.abs(trx - rx) < 0.02 && Math.abs(tryy - ry) < 0.02) {
        el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        raf = requestAnimationFrame(loop);
        return;
      }
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      trx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      tryy = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    };
    const onEnter = () => {
      if (!visible) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      trx = 0; tryy = 0;
      el.style.transition = "transform 0.4s var(--ease-snappy, cubic-bezier(0.16,1,0.3,1))";
      el.style.transform = "perspective(1000px)";
      setTimeout(() => { el.style.transition = ""; }, 400);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (!visible) cancelAnimationFrame(raf);
    }, { threshold: 0.05 });
    io.observe(el);

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
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
