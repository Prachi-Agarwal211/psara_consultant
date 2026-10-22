"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, prefersReducedMotion } from "../../lib/motion";

let activeLenis: Lenis | null = null;
let paused = false;
const scrollSubscribers = new Set<() => void>();

/** The intro may lock scrolling before the provider effect mounts. */
export function setSmoothScrollPaused(value: boolean) {
  paused = value;
  if (value) activeLenis?.stop();
  else activeLenis?.start();
}

export function subscribeSmoothScroll(callback: () => void) {
  scrollSubscribers.add(callback);
  return () => { scrollSubscribers.delete(callback); };
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposeLenis: (() => void) | undefined;
    let disposed = false;

    const configure = () => {
      disposeLenis?.();
      disposeLenis = undefined;
      if (prefersReducedMotion()) return;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
        gestureOrientation: "vertical",
      });
      activeLenis = lenis;
      if (paused) lenis.stop();
      const onScroll = () => {
        ScrollTrigger.update();
        scrollSubscribers.forEach((callback) => callback());
      };
      lenis.on("scroll", onScroll);
      const updateLenis = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      const onClick = (event: MouseEvent) => {
        if (!(event.target instanceof Element)) return;
        const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const id = anchor.getAttribute("href")?.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      };
      document.addEventListener("click", onClick);
      disposeLenis = () => {
        gsap.ticker.remove(updateLenis);
        document.removeEventListener("click", onClick);
        lenis.off("scroll", onScroll);
        lenis.destroy();
        if (activeLenis === lenis) activeLenis = null;
      };
    };

    configure();
    reduced.addEventListener("change", configure);
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      disposed = true;
      reduced.removeEventListener("change", configure);
      window.removeEventListener("load", refresh);
      disposeLenis?.();
    };
  }, []);

  return <>{children}</>;
}
