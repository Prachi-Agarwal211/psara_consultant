"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

/** Story enter: mask up + slight rise */
export function storyEnter(
  scope: HTMLElement,
  selector = "[data-story]",
  start = "top 85%"
) {
  const { gsap: g } = ensureGsap();
  const els = scope.querySelectorAll(selector);
  if (!els.length) return;

  if (prefersReducedMotion()) {
    g.set(els, { clearProps: "all", opacity: 1 });
    return;
  }

  g.fromTo(
    els,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: ease.expo,
      scrollTrigger: {
        trigger: scope,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Word-blur reveal helper (about-text pattern)
 */
export function wordBlurReveal(headingEl: HTMLElement, start = "top 88%") {
  if (!headingEl || prefersReducedMotion()) return;
  const { gsap: g } = ensureGsap();

  const text = headingEl.textContent?.trim() ?? "";
  if (!text) return;

  headingEl.setAttribute("aria-label", text);
  headingEl.textContent = "";

  const words = text.split(/\s+/);
  const wordSpans: HTMLElement[] = [];

  words.forEach((word) => {
    const wrap = document.createElement("span");
    wrap.className = "inline-block overflow-hidden mr-[0.25em]";
    // Glyph room inside the mask — avoids descender clipping at tight line-heights
    wrap.style.paddingBottom = "0.12em";
    wrap.style.marginBottom = "-0.12em";

    const inner = document.createElement("span");
    inner.className = "inline-block will-change-transform";
    inner.textContent = word;

    wrap.appendChild(inner);
    headingEl.appendChild(wrap);
    wordSpans.push(inner);
  });

  g.fromTo(
    wordSpans,
    { opacity: 0, filter: "blur(8px)", y: 16 },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.75,
      stagger: 0.04,
      ease: ease.expo,
      scrollTrigger: {
        trigger: headingEl,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Line-by-line heading reveal.
 * Groups words into ~3 lines and reveals each line cleanly.
 * Wraps words naturally across lines on mobile devices.
 */
export function lineByLineReveal(
  headingEl: HTMLElement,
  options: {
    lines?: number;
    start?: string;
    stagger?: number;
    duration?: number;
  } = {}
) {
  if (!headingEl || prefersReducedMotion()) return;
  const { gsap: g } = ensureGsap();
  const { lines = 3, start = "top 88%", stagger = 0.12, duration = 0.9 } = options;

  const text = headingEl.textContent?.trim() ?? "";
  if (!text) return;

  headingEl.setAttribute("aria-label", text);
  headingEl.textContent = "";

  const words = text.split(/\s+/);
  const wordsPerLine = Math.max(1, Math.ceil(words.length / lines));
  const lineSpans: HTMLElement[] = [];

  // Group words into lines using normal spaces for mobile responsiveness
  for (let i = 0; i < words.length; i += wordsPerLine) {
    const lineWords = words.slice(i, i + wordsPerLine);
    const lineWrap = document.createElement("span");
    lineWrap.className = "t-line inline-block overflow-hidden w-full";

    const lineInner = document.createElement("span");
    lineInner.className = "t-line-inner inline-block will-change-transform";
    lineInner.textContent = lineWords.join(" ");

    lineWrap.appendChild(lineInner);
    headingEl.appendChild(lineWrap);
    lineSpans.push(lineInner);
  }

  g.fromTo(
    lineSpans,
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingEl,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/** Dossier rubber stamp reveal */
export function dossierStampReveal(el: HTMLElement, start = "top 88%") {
  if (!el || prefersReducedMotion()) return;
  const { gsap: g } = ensureGsap();
  g.fromTo(
    el,
    { scale: 1.18, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.65,
      ease: ease.bounce,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    }
  );
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

    g.fromTo(
      el,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1.2,
        ease: ease.expo,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      }
    );

    g.to(obj, {
      val: target,
      duration: 1.2,
      ease: ease.expo,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
}

/** Staggered card sequence reveal */
export function cardStaggerReveal(
  scope: HTMLElement,
  selector: string,
  start = "top 85%"
) {
  if (!scope || prefersReducedMotion()) return;
  const { gsap: g } = ensureGsap();
  const cards = scope.querySelectorAll(selector);
  if (!cards.length) return;

  g.fromTo(
    cards,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: ease.expo,
      scrollTrigger: {
        trigger: scope,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/** Interactive 3D mouse tracking tilt on hover */
export function initDossierTilt(card: HTMLElement) {
  if (!card || isMobile() || prefersReducedMotion()) return () => {};

  const onMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 30}deg) rotateY(${x / 30}deg) translateY(-3px)`;
  };

  const onMouseLeave = () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  card.addEventListener("mousemove", onMouseMove);
  card.addEventListener("mouseleave", onMouseLeave);

  return () => {
    card.removeEventListener("mousemove", onMouseMove);
    card.removeEventListener("mouseleave", onMouseLeave);
  };
}

/** Scroll-driven image scale & blur-in parallax */
export function initParallaxImage(imgWrap: HTMLElement, trigger: HTMLElement) {
  if (!imgWrap || !trigger || prefersReducedMotion() || isMobile()) return;
  const { gsap: g } = ensureGsap();

  g.fromTo(
    imgWrap,
    { scale: 1.15, opacity: 0.3 },
    {
      scale: 1,
      opacity: 0.45,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    }
  );
}

export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent?.trim() ?? "";
  if (!text) return [];
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const spans: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
      return;
    }
    const wrap = document.createElement("span");
    wrap.className = "split-line";
    const inner = document.createElement("span");
    inner.textContent = part;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    spans.push(inner);
  });
  return spans;
}

/**
 * Scroll progress indicator
 */
export function initScrollProgress(): () => void {
  const noop = () => {};
  if (typeof window === "undefined" || prefersReducedMotion()) return noop;
  const rail = document.getElementById("scroll-progress");
  if (!rail) return noop;

  const sections = rail.querySelectorAll<HTMLElement>(".sp-segment");
  if (!sections.length) return noop;

  const triggers: ScrollTrigger[] = [];

  sections.forEach((seg) => {
    const target = document.querySelector(seg.getAttribute("data-section") || "");
    if (!target) return;

    const st = ScrollTrigger.create({
      trigger: target,
      start: "top center",
      end: "bottom center",
      onToggle: ({ isActive }) => {
        seg.classList.toggle("sp-active", isActive);
      },
    });
    triggers.push(st);
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
}

/**
 * Navigation loading bar — animates a thin gold bar across the top of the page.
 * Call start() when navigation begins, finish() when complete.
 */
export function initLoadingBar() {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return { start: () => {}, finish: () => {} };
  }
  const { gsap: g } = ensureGsap();

  // Create the bar element if it doesn't exist
  let bar = document.getElementById("page-loading-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "page-loading-bar";
    bar.style.position = "fixed";
    bar.style.top = "0";
    bar.style.left = "0";
    bar.style.width = "0%";
    bar.style.height = "2px";
    bar.style.backgroundColor = "var(--gold, #e0b84a)";
    bar.style.zIndex = "10000";
    bar.style.pointerEvents = "none";
    bar.style.transformOrigin = "left center";
    bar.style.boxShadow = "0 0 8px rgba(224, 184, 74, 0.4)";
    document.body.appendChild(bar);
  }

  let tl: gsap.core.Timeline | null = null;

  const start = () => {
    tl?.kill();
    tl = g.timeline();
    tl.set(bar!, { width: "0%", opacity: 1 });
    tl.to(bar!, { width: "30%", duration: 0.3, ease: "power1.out" });
    tl.to(bar!, { width: "70%", duration: 0.8, ease: "power1.inOut" });
  };

  const finish = () => {
    tl?.kill();
    tl = g.timeline();
    tl.to(bar!, { width: "100%", duration: 0.2, ease: "power2.out" });
    tl.to(bar!, { opacity: 0, duration: 0.4, delay: 0.15 }, ">");
    tl.set(bar!, { width: "0%" }, ">");
  };

  return { start, finish };
}

/**
 * Fluid line SVG draw — animates stroke-dashoffset from full to 0
 * as the trigger section scrolls from top-bottom to bottom-top.
 * Luke Baffait-inspired organic decorative line that reveals on scroll.
 * Supports multiple paths for layered depth (primary + secondary ghost lines).
 */
export function initFluidLine(
  svgEl: HTMLElement,
  options: {
    pathSelector?: string;
    trigger?: HTMLElement | null;
    start?: string;
    end?: string;
    color?: string;
  } = {}
) {
  if (!svgEl || prefersReducedMotion() || isMobile()) return;
  const { gsap: g } = ensureGsap();

  const {
    pathSelector = ".fluid-path",
    trigger = svgEl.parentElement,
    start = "top bottom",
    end = "bottom top",
  } = options;

  if (!trigger) return;

  const paths = svgEl.querySelectorAll<SVGPathElement>(pathSelector);
  if (!paths.length) return;

  // Set up stroke-dasharray for each path based on its total length
  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
  });

  // Animate all paths simultaneously via ScrollTrigger scrub
  g.fromTo(
    paths,
    { strokeDashoffset: (i, el) => el.getTotalLength() },
    {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub: 0.6,
      },
    }
  );
}

/** Live clock — shows current IST time in the given element */
export function initLiveClock(container: HTMLElement, selector = "[data-live-clock]") {
  const el = container.querySelector<HTMLElement>(selector);
  if (!el) return () => {};

  function pad(n: number) {
    return n.toString().padStart(2, "0");
  }

  function update() {
    const now = new Date();
    const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    el!.textContent = `${pad(ist.getHours())}:${pad(ist.getMinutes())} IST`;
  }

  update();
  const interval = setInterval(update, 30000);

  return () => clearInterval(interval);
}

/** Card Hover Video preview helper (Jasmine-inspired) */
export function initHoverVideo(card: HTMLElement, videoSrc: string): () => void {
  if (!card) return () => {};

  const video = document.createElement("video");
  video.src = videoSrc;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.className = "t-card-hover-media";
  video.style.cssText = `
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; opacity: 0; transition: opacity 0.4s ease;
    z-index: 2; pointer-events: none;
  `;

  card.style.position = "relative";
  card.insertBefore(video, card.firstChild);

  const onEnter = () => {
    video.style.opacity = "1";
    video.play().catch(() => {});
  };
  const onLeave = () => {
    video.style.opacity = "0";
    video.pause();
  };

  card.addEventListener("mouseenter", onEnter);
  card.addEventListener("mouseleave", onLeave);

  return () => {
    video.remove();
    card.removeEventListener("mouseenter", onEnter);
    card.removeEventListener("mouseleave", onLeave);
  };
}

/** Data-Parallax attribute system for cards and image containers */
export function initDataParallax(scope: HTMLElement) {
  if (!scope || prefersReducedMotion() || isMobile()) return;
  const { gsap: g } = ensureGsap();

  scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = parseFloat(el.getAttribute("data-parallax") || "0");
    const targetSelector = el.getAttribute("data-parallax-target");
    const target = targetSelector ? el.querySelector(targetSelector) : el;

    if (!target) return;

    g.to(target, {
      yPercent: amount,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  });
}

/** GSAP Scroll-driven Marquee Headings */
export function initMarqueeScroll(container: HTMLElement, selector: string, speed: number = 40) {
  if (!container || prefersReducedMotion()) return;
  const { gsap: g } = ensureGsap();

  const el = container.querySelector(selector);
  if (!el) return;

  g.to(el, {
    xPercent: -speed,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8,
    },
  });
}
