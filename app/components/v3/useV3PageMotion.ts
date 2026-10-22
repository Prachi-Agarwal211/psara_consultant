"use client";

import { useEffect, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { SplitText } from "gsap/SplitText";
import { ensureGsap } from "../../lib/motion";

/** One scoped owner for inner-page motion. Content starts visible without JS. */
export default function useV3PageMotion(rootRef: RefObject<HTMLDivElement | null>, enabled = true) {
  const pathname = usePathname();
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    gsap.registerPlugin(SplitText);
    const media = gsap.matchMedia();
    let disposed = false;
    media.add({ animate: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px) and (hover: hover) and (pointer: fine)" }, (context) => {
      if (!context.conditions?.animate) return;
      const cleanups: (() => void)[] = [];
      root.querySelectorAll<HTMLElement>("[data-v3-title]").forEach((heading) => {
        const split = SplitText.create(heading, {
          type: "lines", mask: "lines", autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 1.1, stagger: 0.09, ease: "expo.out" }),
        });
        cleanups.push(() => split.revert());
      });
      gsap.from(root.querySelectorAll("[data-v3-hero-reveal]"), { y: 18, opacity: 0, duration: 0.9, delay: 0.18, stagger: 0.1, ease: "expo.out", clearProps: "all" });
      const candidates = Array.from(root.querySelectorAll<HTMLElement>("[data-v3-reveal], .v3-content-wrap > section, .v3-content-wrap > div:not(:has(aside, .sticky)), .v3-editorial-body > section"));
      const bounded = candidates.filter((element) => element.offsetHeight < innerHeight * 1.6);
      const groups = bounded.filter((element) => !bounded.some((parent) => parent !== element && parent.contains(element)));
      groups.forEach((element) => gsap.from(element, { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", clearProps: "all", scrollTrigger: { trigger: element, start: "top 96%", once: true } }));
      if (context.conditions?.desktop) {
        root.querySelectorAll<HTMLElement>(".v3-hero-media").forEach((image) => gsap.to(image, { yPercent: 9, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top top", end: "bottom top", scrub: 0.8 } }));
        root.querySelectorAll<HTMLElement>("[data-v3-magnetic], .btn-whatsapp, .btn-primary, .btn-gold").forEach((button) => {
          const x = gsap.quickTo(button, "x", { duration: 0.45, ease: "power3.out" });
          const y = gsap.quickTo(button, "y", { duration: 0.45, ease: "power3.out" });
          const move = (event: MouseEvent) => { const rect = button.getBoundingClientRect(); x((event.clientX - rect.left - rect.width / 2) * 0.15); y((event.clientY - rect.top - rect.height / 2) * 0.15); };
          const leave = () => { x(0); y(0); };
          button.addEventListener("mousemove", move); button.addEventListener("mouseleave", leave);
          cleanups.push(() => { button.removeEventListener("mousemove", move); button.removeEventListener("mouseleave", leave); });
        });
      }
      return () => cleanups.forEach((cleanup) => cleanup());
    }, root);
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => { disposed = true; window.removeEventListener("load", refresh); media.revert(); };
  }, [rootRef, enabled, pathname]);
}
