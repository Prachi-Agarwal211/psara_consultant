"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // route in-page anchors through Lenis so nav/footer links glide
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    // refresh after fonts/images settle — fixes timing bleed
    const onFonts = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(onFonts);
    window.addEventListener("load", onFonts);

    return () => {
      gsap.ticker.remove(updateLenis);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onFonts);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
