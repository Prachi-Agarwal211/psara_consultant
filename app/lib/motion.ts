/**
 * Site motion system — patterns from:
 * technique-catalogs/02-scroll, 04-text-animations
 * code-patterns/cinematic-easings
 * lukebaffait scrub/parallax
 * MAAC / collab pin narratives
 */

"use client";

import { ensureGsap, prefersReducedMotion, ease } from "./gsap";

export { ease, prefersReducedMotion, ensureGsap };

/** Multi-layer parallax on [data-speed] children of scope */
export function initParallaxLayers(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  const layers = scope.querySelectorAll<HTMLElement>("[data-speed]");
  layers.forEach((el) => {
    const speed = parseFloat(el.dataset.speed || "0.2");
    const trigger = (el.closest("[data-parallax-root]") as HTMLElement) || scope;
    gsap.to(el, {
      y: () => speed * (typeof window !== "undefined" ? window.innerHeight * 0.35 : 120),
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  });
}

/** Clip-path curtain reveal (Luke-style, not fade-only) */
export function initClipReveals(scope: HTMLElement, selector = "[data-clip]") {
  if (prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  scope.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 18 },
      {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: ease.expo,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/** Word rise — transform+opacity only (blur is expensive residue on large screens) */
export function initWordReveal(el: HTMLElement, start = "top 85%") {
  if (!el || prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  gsap.fromTo(
    el,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: ease.expo,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/** Floating drift for [data-float] — desktop only, max 3 nodes, no rotation (CPU residue). */
export function initFloatDrift(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  if (typeof window !== "undefined" && window.innerWidth < 1024) return;
  const { gsap } = ensureGsap();
  const nodes = Array.from(scope.querySelectorAll<HTMLElement>("[data-float]")).slice(0, 3);
  nodes.forEach((el, i) => {
    const amp = Math.min(parseFloat(el.dataset.amp || "10"), 12);
    gsap.to(el, {
      y: amp,
      duration: 3.2 + i * 0.35,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.15,
    });
  });
}

/** Stagger children in [data-stagger] */
export function initStaggerChildren(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
    const kids = parent.children;
    if (!kids.length) return;
    gsap.fromTo(
      kids,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: ease.expo,
        scrollTrigger: {
          trigger: parent,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/** Scale-in images/visuals with scrub */
export function initVisualScrub(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  scope.querySelectorAll<HTMLElement>("[data-scrub-visual]").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 1.12, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "center center",
          scrub: 1.4,
        },
      }
    );
  });
}
