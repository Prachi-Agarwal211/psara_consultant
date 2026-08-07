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
      { clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 },
      {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: ease.expo,
      }
    );
  });
}

/** Word-by-word rise (manual split — no Club plugin) */
export function initWordReveal(el: HTMLElement, start = "top 85%") {
  if (!el || prefersReducedMotion()) return;
  // Keep text immediately visible without hidden split spans
}

/** Horizontal infinite ticker */
export function initMarquee(track: HTMLElement, speed = 40) {
  if (prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  const total = track.scrollWidth / 2;
  gsap.to(track, {
    x: -total,
    duration: speed,
    ease: "none",
    repeat: -1,
  });
}

/** Pin process path — scrub through steps (collab/Luke narrative) */
export function initPinnedProcess(section: HTMLElement) {
  if (prefersReducedMotion() || typeof window === "undefined" || window.innerWidth < 900) return;
  const { gsap } = ensureGsap();
  const steps = section.querySelectorAll<HTMLElement>("[data-process-step]");
  const line = section.querySelector<HTMLElement>("[data-process-line]");
  if (!steps.length) return;

  const nums = Array.from(steps).map((s) => s.querySelector<HTMLElement>("[data-process-num]"));
  const setActive = (i: number) => {
    nums.forEach((n, idx) => n?.classList.toggle("active", idx === i));
  };

  // Initial states: first step lit, rest dimmed, first number highlighted
  gsap.set(steps, { opacity: 0.35 });
  gsap.set(steps[0], { opacity: 1 });
  setActive(0);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // Vertical progress line (markup is height-driven, not scaleX)
  if (line) {
    gsap.set(line, { height: "0%" });
    tl.to(line, { height: "100%", ease: "none" }, 0);
  }

  steps.forEach((step, i) => {
    if (i === 0) return;
    const t = i / (steps.length - 1);
    tl.to(steps[i - 1], { opacity: 0.35, duration: 0.01 }, t - 0.02);
    tl.to(step, { opacity: 1, duration: 0.01 }, t - 0.02);
    tl.call(setActive, [i], t - 0.02);
  });

  // Reset highlight to step 01 when scrubbed back to the top
  tl.call(setActive, [0], 0);
}

/** Floating drift for [data-float] */
export function initFloatDrift(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  scope.querySelectorAll<HTMLElement>("[data-float]").forEach((el, i) => {
    const amp = parseFloat(el.dataset.amp || "16");
    gsap.to(el, {
      y: amp,
      duration: 3 + i * 0.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.2,
    });
    gsap.to(el, {
      rotation: i % 2 === 0 ? 4 : -4,
      duration: 5 + i * 0.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });
}

/** Mouse parallax on container */
export function initMouseParallax(el: HTMLElement, strength = 18) {
  if (prefersReducedMotion()) return () => {};
  const { gsap } = ensureGsap();
  const onMove = (e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(el, {
      x: nx * -strength,
      y: ny * -strength * 0.6,
      duration: 1.1,
      ease: "power2.out",
    });
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}

/** Stagger children in [data-stagger] */
export function initStaggerChildren(scope: HTMLElement) {
  if (prefersReducedMotion()) return;
  const { gsap } = ensureGsap();
  scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
    const kids = parent.children;
    gsap.fromTo(
      kids,
      { opacity: 1, y: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
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
