"use client";

import { useEffect, type RefObject } from "react";
import { ensureGsap, ease, prefersReducedMotion, splitWords } from "../lib/gsap";

type Opts = { scope: RefObject<HTMLElement | null> };

export function useDataAnimations({ scope }: Opts) {
  useEffect(() => {
    if (!scope.current) return;
    const { gsap } = ensureGsap();
    if (prefersReducedMotion()) {
      gsap.set(scope.current.querySelectorAll("[data-reveal],[data-stagger],[data-count]"), {
        opacity: 1, clearProps: "all",
      });
      return;
    }

    const rootEl = scope.current;

    const ctx = gsap.context(() => {
      rootEl.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const split = el.dataset.split;
        const start = el.dataset.splitStart || "top 85%";
        const delay = parseFloat(el.dataset.splitDelay || "0.2");
        const staggerVal = parseFloat(el.dataset.splitStagger || "0.07");
        let words: HTMLElement[] = [];
        if (split === "words") {
          words = splitWords(el);
        }
        if (words.length) {
          gsap.fromTo(words, { yPercent: 110, opacity: 0 }, {
            yPercent: 0, opacity: 1, duration: 1.05, stagger: staggerVal,
            ease: ease.cinematic, delay,
            scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
          });
        }
      });

      rootEl.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal;
        const start = el.dataset.revealStart || "top 85%";
        const d = parseFloat(el.dataset.revealDur || "0.9");
        const from = type === "blur"
          ? { opacity: 0, filter: "blur(8px)", y: 15 }
          : { opacity: 0, y: 36 };
        gsap.fromTo(el, from, {
          opacity: 1, y: 0, filter: type === "blur" ? "blur(0px)" : undefined,
          duration: d, ease: ease.expo,
          scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
        });
      });

      rootEl.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
        const s = parseFloat(el.dataset.stagger || "0.08");
        const start = el.dataset.staggerStart || "top 80%";
        const fromY = parseFloat(el.dataset.staggerY || "25");
        const kids = Array.from(el.children) as HTMLElement[];
        if (!kids.length) return;
        gsap.fromTo(kids, { opacity: 0, y: fromY }, {
          opacity: 1, y: 0, duration: 0.7, stagger: s, ease: ease.expo,
          scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
        });
      });

      rootEl.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count || 0);
        const suffix = el.dataset.countSuffix || "";
        const dur = parseFloat(el.dataset.countDur || "1.6");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: dur, ease: ease.expo,
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          onUpdate: () => { el.textContent = `${Math.round(obj.val)}${suffix}`; },
        });
      });

      rootEl.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "0.1");
        if (window.innerWidth < 768) return;
        gsap.fromTo(el, { y: -(amt * 100) * 0.35 }, {
          y: (amt * 100) * 0.35, ease: "none",
          scrollTrigger: { trigger: el.parentElement || rootEl, start: "top bottom", end: "bottom top", scrub: 0.85 },
        });
      });
    }, rootEl);

    return () => ctx.revert();
  }, [scope]);
}
