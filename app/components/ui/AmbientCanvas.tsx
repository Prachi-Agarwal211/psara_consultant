"use client";

/**
 * Continuous ambient field — MAAC DynamicBackground approach,
 * recolored to midnight black + cherry red + warm gold atmosphere.
 * Fixed behind ALL content. Sections stay transparent.
 */

import { useEffect, useRef, useState } from "react";

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setRun(mq.matches && !reduced.matches);
    apply();
    mq.addEventListener("change", apply);
    reduced.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      reduced.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!run) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: 0.62, y: 0.35, tx: 0.62, ty: 0.35 };
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / Math.max(w, 1);
      mouse.ty = e.clientY / Math.max(h, 1);
    };
    const onVis = () => {
      visible = !document.hidden;
    };

    const n2 = (x: number, y: number, time: number) =>
      Math.sin(x * 1.55 + time * 0.38) * Math.sin(y * 1.18 + time * 0.44);

    const frame = () => {
      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }
      t += 0.0075;
      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;

      // Plum authority void base — 2026 metallic system
      ctx.fillStyle = "#080714";
      ctx.fillRect(0, 0, w, h);

      // Plum fluid pockets — OKLCH tuned, replaces cherry
      const cols = 7;
      const rows = 5;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const px = (i / cols) * w + (mouse.x - 0.5) * 40;
          const py = (j / rows) * h + (mouse.y - 0.5) * 30;
          const intensity = (n2(i + mouse.x * 2.2, j + mouse.y * 2.2, t) + 1) * 0.5;
          const r = 160 + intensity * 160;
          const g = ctx.createRadialGradient(px, py, 0, px, py, r);
          // Plum authority carries visual identity — desaturated, not cherry
          g.addColorStop(0, `rgba(88, 33, 199, ${0.06 + intensity * 0.12})`);
          g.addColorStop(0.35, `rgba(107, 70, 200, ${0.03 + intensity * 0.06})`);
          g.addColorStop(0.7, `rgba(30, 17, 64, 0.14)`);
          g.addColorStop(1, "rgba(8, 7, 20, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Hero-right plum glow (portal)
      const hero = ctx.createRadialGradient(
        w * 0.72 + (mouse.x - 0.5) * 60,
        h * 0.38 + (mouse.y - 0.5) * 40,
        0,
        w * 0.72,
        h * 0.4,
        w * 0.42
      );
      hero.addColorStop(0, "rgba(88, 33, 199, 0.20)");
      hero.addColorStop(0.4, "rgba(107, 70, 200, 0.07)");
      hero.addColorStop(1, "transparent");
      ctx.fillStyle = hero;
      ctx.fillRect(0, 0, w, h);

      // Gold atmosphere (right edge) — champagne, brushed
      const saff = ctx.createRadialGradient(w * 0.92, h * 0.22, 0, w * 0.92, h * 0.22, w * 0.28);
      saff.addColorStop(0, "rgba(212, 175, 55, 0.13)");
      saff.addColorStop(1, "transparent");
      ctx.fillStyle = saff;
      ctx.fillRect(0, 0, w, h);

      const lowerGold = ctx.createRadialGradient(w * 0.9, h * 0.72, 0, w * 0.9, h * 0.72, w * 0.26);
      lowerGold.addColorStop(0, "rgba(212, 175, 55, 0.09)");
      lowerGold.addColorStop(1, "transparent");
      ctx.fillStyle = lowerGold;
      ctx.fillRect(0, 0, w, h);

      // Metallic dust — plum+gold, not cherry
      ctx.save();
      for (let i = 0; i < 56; i++) {
        const px = ((Math.sin(i * 13.7 + t * 0.28) + 1) * 0.5) * w;
        const py = ((Math.cos(i * 8.1 + t * 0.21) + 1) * 0.5) * h;
        const s = 0.5 + (i % 4) * 0.35;
        ctx.beginPath();
        ctx.fillStyle =
          i % 4 === 0 ? "rgba(232, 213, 163, 0.50)" : "rgba(107, 70, 200, 0.30)";
        ctx.arc(px, py, s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Soft plum vignette — OLED depth
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.45, h * 0.15, w * 0.5, h * 0.5, h * 0.9);
      vig.addColorStop(0, "rgba(8,7,20,0)");
      vig.addColorStop(1, "rgba(8,7,20,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [run]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* CSS base always (mobile + reduced motion) — plum authority */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 72% 32%, rgba(88,33,199,0.24) 0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 92% 18%, rgba(212,175,55,0.13) 0%, transparent 50%),
            radial-gradient(ellipse 40% 38% at 88% 78%, rgba(212,175,55,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 20% 70%, rgba(30,17,64,0.12) 0%, transparent 55%),
            linear-gradient(165deg, #080714 0%, #120E2A 45%, #080714 100%)
          `,
        }}
      />
      {run && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "140px 140px",
        }}
      />
    </div>
  );
}
