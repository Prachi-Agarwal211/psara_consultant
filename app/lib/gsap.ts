"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // MAAC-proven: ignore noisy mobile resize + cap callback spam
  ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
}

export function ensureGsap() {
  return { gsap, ScrollTrigger };
}

export const ease = {
  expo: "power3.out",
  smooth: "power2.out",
  inOut: "power3.inOut",
  cinematic: "power4.out",
  bounce: "back.out(1.7)",
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobile() {
  if (typeof window === "undefined") return true;
  return window.innerWidth < 768;
}

/** Counter animation with scale stamp punch */
export function counterStampAnimation(
  scope: HTMLElement,
  selector = "[data-count]"
) {
  if (!scope || prefersReducedMotion()) return;
  const { gsap: g } = ensureGsap();

  scope.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const obj = { val: 0 };
    const trigger = {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
    };

    g.fromTo(
      el,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1.2,
        ease: ease.expo,
        scrollTrigger: trigger,
      }
    );

    g.to(obj, {
      val: target,
      duration: 1.2,
      ease: ease.expo,
      scrollTrigger: trigger,
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = `${target}${suffix}`;
      },
    });
  });
}
