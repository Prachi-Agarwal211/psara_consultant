"use client";

import { useEffect, type RefObject } from "react";
import { ensureGsap, prefersReducedMotion } from "../../lib/motion";
import { setSmoothScrollPaused, subscribeSmoothScroll } from "../providers/SmoothScroll";

const INTRO_KEY = "psara-v3-intro-seen";

/** One scoped motion owner, with visible HTML as the no-JavaScript fallback. */
export default function useV3Motion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const media = gsap.matchMedia();
    let introStarted = false;
    const originalBackground = document.body.style.backgroundColor;
    const query = <T extends HTMLElement = HTMLElement>(selector: string) => root.querySelector<T>(selector);
    const all = <T extends HTMLElement = HTMLElement>(selector: string) => Array.from(root.querySelectorAll<T>(selector));

    media.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const desktop = Boolean(context.conditions?.desktop);
      const reduced = Boolean(context.conditions?.reduce) || prefersReducedMotion();
      const pre = query("#pre");
      const steps = all("#proc .step");
      const counter = query("#pct");
      const cleanups: Array<() => void> = [];
      let disposed = false;
      const hidePreloader = () => {
        if (pre) {
          pre.style.display = "none";
          pre.setAttribute("aria-hidden", "true");
          delete pre.dataset.preloading;
        }
        setSmoothScrollPaused(false);
      };
      const setStep = (progress: number) => {
        const current = Math.min(steps.length - 1, Math.floor(progress * steps.length));
        steps.forEach((step, index) => step.classList.toggle("on", index <= current));
        if (counter && steps.length) counter.textContent = `Step ${current + 1} of ${steps.length}`;
      };

      if (reduced) {
        hidePreloader();
        gsap.set(all(".ln > span, .rv, .hrv, #manitext .w, #float .fl, #list .srow"), { opacity: 1, x: 0, y: 0 });
        gsap.set(all("#credshot"), { clipPath: "inset(0% 0% 0% 0% round 20px)" });
        gsap.set(all("#fill"), { scaleY: 1 });
        setStep(1);
        return () => { hidePreloader(); steps.forEach((step) => step.classList.remove("on")); };
      }

      let seen = false;
      try { seen = sessionStorage.getItem(INTRO_KEY) === "true"; } catch { /* Storage may be disabled. */ }
      const playIntro = Boolean(pre && !seen && !introStarted);
      if (playIntro && pre) {
        const kenBurns = all("#hero .kb");
        const originalAnimations = kenBurns.map((element) => element.style.animationName);
        let animationRestored = false;
        const restoreKenBurns = () => {
          if (animationRestored) return;
          animationRestored = true;
          kenBurns.forEach((element, index) => { element.style.animationName = originalAnimations[index]; });
        };
        // CSS animation wins over inline transforms; let the entrance settle first.
        kenBurns.forEach((element) => { element.style.animationName = "none"; });
        cleanups.push(restoreKenBurns);
        introStarted = true;
        pre.style.display = "grid";
        pre.dataset.preloading = "true";
        pre.setAttribute("aria-hidden", "true");
        setSmoothScrollPaused(true);
        const intro = gsap.timeline({ onComplete: () => {
          hidePreloader();
          gsap.set(kenBurns, { clearProps: "transform" });
          restoreKenBurns();
          try { sessionStorage.setItem(INTRO_KEY, "true"); } catch { /* Keep the page usable. */ }
          ScrollTrigger.refresh();
        } });
        intro.fromTo(pre.querySelector(".in img"), { scale: 0.7, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, 0)
          .fromTo(pre.querySelector(".bar i"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.35)
          .fromTo(pre.querySelector(".panel"), { yPercent: 100, y: 0 }, { yPercent: 0, y: 0, duration: 0.65, ease: "expo.inOut" }, 1.15)
          .to(pre, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut" }, 1.9)
          .fromTo(kenBurns, { scale: 1.25 }, { scale: 1.02, duration: 1.3, ease: "expo.out" }, 1.3)
          .from(all("#hero h1 .ln > span"), { yPercent: 110, duration: 0.9, stagger: 0.09, ease: "expo.out" }, 1.5)
          .from(all(".hrv"), { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "expo.out" }, 1.7)
          .fromTo(all(".hdr"), { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.8);
      } else {
        hidePreloader();
        gsap.from(all("#hero h1 .ln > span"), { yPercent: 110, duration: 1.1, stagger: 0.09, ease: "expo.out" });
        gsap.from(all(".hrv"), { y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" });
      }

      if (desktop) {
        const copy = query("#hero .copy");
        const header = query(".hdr");
        const previousCopyInert = copy?.inert ?? false;
        const previousHeaderInert = header?.inert ?? false;
        cleanups.push(() => {
          if (copy) copy.inert = previousCopyInert;
          if (header) header.inert = previousHeaderInert;
        });
        gsap.set(all("#hero .cap"), { y: 30, opacity: 0 });
        gsap.timeline({ scrollTrigger: {
          trigger: query("#hero"), start: "top top", end: "+=120%", pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (copy) copy.inert = self.progress >= 0.5 || previousCopyInert;
            if (header) header.inert = self.progress >= 0.3 || previousHeaderInert;
          },
        } })
          .to(all("#hero .media"), { clipPath: "inset(10% 24% 22% 24% round 26px)", ease: "none" }, 0)
          .to(all("#hero .img"), { scale: 1.06, yPercent: 9, ease: "none" }, 0)
          .to(all("#hero .copy"), { y: -80, opacity: 0, ease: "none", duration: 0.5 }, 0)
          .fromTo(all(".hdr"), { opacity: 1 }, { opacity: 0, duration: 0.3, immediateRender: false }, 0)
          .to(all("#hero .media .tag"), { opacity: 0, duration: 0.2 }, 0)
          .to(all("#hero .cap"), { opacity: 1, y: 0, duration: 0.4 }, 0.6)
          .fromTo(all("#hero .watermark"), { y: 120, rotation: -8 }, { y: 0, rotation: 0, ease: "none" }, 0);
      } else {
        gsap.to(all("#hero .img"), { yPercent: 12, ease: "none", scrollTrigger: { trigger: query("#hero"), start: "top top", end: "bottom top", scrub: true } });
        gsap.to(all("#hero .copy"), { y: -40, opacity: 0.2, ease: "none", scrollTrigger: { trigger: query("#hero"), start: "40% top", end: "bottom top", scrub: true } });
      }

      all("section:not(#hero) h2").forEach((heading) => {
        const lines = heading.querySelectorAll(".ln > span");
        if (lines.length) gsap.from(lines, { yPercent: 110, duration: 1.1, stagger: 0.09, ease: "expo.out", scrollTrigger: { trigger: heading, start: "top 85%", once: true } });
      });
      all(".rv").forEach((element) => gsap.from(element, { opacity: 0, y: 30, duration: 1, ease: "expo.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } }));
      gsap.fromTo(all("#manitext .w"), { opacity: 0.16 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: query("#manitext"), start: "top 78%", end: "bottom 45%", scrub: true } });
      gsap.fromTo(all("#mani .eagle"), { yPercent: desktop ? -30 : 0, rotation: -6 }, { yPercent: desktop ? -70 : -30, rotation: 6, ease: "none", scrollTrigger: { trigger: query("#mani"), scrub: true } });
      all("#list .srow").forEach((row) => gsap.from(row, { y: desktop ? 40 : 24, opacity: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 94%", once: true } }));

      const list = query("#list");
      const preview = query("#pv");
      const previewImage = query<HTMLImageElement>("#pv .im img");
      const previewVideo = query<HTMLVideoElement>("#pv .im video");
      const previewInner = query("#pv .im");
      if (desktop && list && preview && previewInner) {
        gsap.set(preview, { opacity: 0, scale: 0.6 });
        const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" });
        const imageXTo = gsap.quickTo(previewInner, "x", { duration: 0.6, ease: "power3.out" });
        const appearance = gsap.to(preview, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out", paused: true });
        let activeRow: HTMLElement | null = null;
        const bounds = (row: HTMLElement) => {
          const title = row.querySelector<HTMLElement>(".service-title")?.getBoundingClientRect();
          const description = row.querySelector<HTMLElement>(".service-description")?.getBoundingClientRect();
          const rect = list.getBoundingClientRect();
          if (!title || !description) return null;
          // The preview can span adjacent rows; reserve their entire title
          // column, including its hover shift, rather than one short label.
          const firstColumn = parseFloat(getComputedStyle(row).gridTemplateColumns.split(" ")[0]);
          const columnEdge = Number.isFinite(firstColumn)
            ? row.getBoundingClientRect().left - rect.left + firstColumn + 14
            : title.right - rect.left + 14;
          const min = columnEdge + 12;
          const max = description.left - rect.left - 12 - 240;
          return max >= min ? { min, max, rect } : null;
        };
        const leave = () => { activeRow = null; appearance.reverse(); previewVideo?.pause(); };
        const move = (event: MouseEvent) => {
          if (!activeRow) return;
          const gap = bounds(activeRow);
          if (!gap) { leave(); return; }
          xTo(gsap.utils.clamp(gap.min, gap.max, event.clientX - gap.rect.left - 120));
          yTo(gsap.utils.clamp(0, Math.max(0, gap.rect.height - 160), event.clientY - gap.rect.top - 80));
          imageXTo((event.clientX - gap.rect.left - gap.rect.width / 2) * -0.03);
        };
        all("#list .srow").forEach((row) => {
          const enter = (event: MouseEvent) => {
            const gap = bounds(row);
            if (!gap) { leave(); return; }
            activeRow = row;
            gsap.set(preview, { x: gsap.utils.clamp(gap.min, gap.max, event.clientX - gap.rect.left - 120), y: gsap.utils.clamp(0, Math.max(0, gap.rect.height - 160), event.clientY - gap.rect.top - 80) });
            if (row.dataset.img) {
              if (previewImage) {
                // A browser prefers Next Image's original srcset over a new src.
                previewImage.removeAttribute("srcset");
                previewImage.removeAttribute("sizes");
                previewImage.src = row.dataset.img;
              }
              else previewInner.style.backgroundImage = `url("${row.dataset.img}")`;
              if (previewVideo) previewVideo.poster = row.dataset.img;
            }
            if (previewVideo) {
              const source = row.dataset.webm || row.dataset.mp4;
              if (source) {
                if (previewVideo.getAttribute("src") !== source) previewVideo.src = source;
                previewVideo.hidden = false;
                void previewVideo.play().catch(() => { previewVideo.hidden = true; });
              } else { previewVideo.pause(); previewVideo.hidden = true; }
            }
            appearance.play();
          };
          row.addEventListener("mouseenter", enter);
          cleanups.push(() => row.removeEventListener("mouseenter", enter));
        });
        list.addEventListener("mousemove", move);
        list.addEventListener("mouseleave", leave);
        window.addEventListener("resize", leave);
        cleanups.push(() => { list.removeEventListener("mousemove", move); list.removeEventListener("mouseleave", leave); window.removeEventListener("resize", leave); previewVideo?.pause(); });
      }
      if (!desktop) all(".mprev").forEach((element) => gsap.to(element.querySelector(".im"), { yPercent: 12, ease: "none", scrollTrigger: { trigger: element, scrub: true } }));
      gsap.fromTo(all("#credshot"), { clipPath: "inset(10% 10% 10% 10% round 20px)" }, { clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "none", scrollTrigger: { trigger: query("#credshot"), start: "top 90%", end: "center 50%", scrub: true } });
      gsap.fromTo(all("#credshot .im"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: query("#credshot"), scrub: true } });

      // Repeating motion is paused outside its section and in background tabs.
      const loops = new Map<Element, gsap.core.Tween[]>();
      const visible = new Set<Element>();
      const cssMotion = all(".kb, .streak");
      const originalPlayStates = cssMotion.map((element) => element.style.animationPlayState);
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
        loops.get(entry.target)?.forEach((tween) => tween.paused(!entry.isIntersecting || document.hidden));
        if (entry.target instanceof HTMLElement && cssMotion.includes(entry.target)) entry.target.style.animationPlayState = !entry.isIntersecting || document.hidden ? "paused" : "running";
      }));
      const loop = (element: HTMLElement, tween: gsap.core.Tween) => {
        loops.set(element, [...(loops.get(element) || []), tween]);
        observer.observe(element);
      };
      cssMotion.forEach((element) => observer.observe(element));
      const visibility = () => {
        loops.forEach((tweens, element) => tweens.forEach((tween) => tween.paused(document.hidden || !visible.has(element))));
        cssMotion.forEach((element) => { element.style.animationPlayState = document.hidden || !visible.has(element) ? "paused" : "running"; });
      };
      document.addEventListener("visibilitychange", visibility);
      cleanups.push(() => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", visibility);
        cssMotion.forEach((element, index) => { element.style.animationPlayState = originalPlayStates[index]; });
      });
      all("#float .fl").forEach((element, index) => {
        if (desktop) {
          const inner = element.querySelector<HTMLElement>(".d");
          if (inner) loop(element, gsap.to(inner, { y: 10 + index * 4, x: index % 2 ? 8 : -8, rotation: index % 2 ? 1.5 : -1.5, duration: 3 + index * 0.6, yoyo: true, repeat: -1, ease: "sine.inOut", paused: true }));
          const speed = Number(element.dataset.speed || 60);
          gsap.fromTo(element, { y: -speed * 0.5 }, { y: speed * 0.5, ease: "none", scrollTrigger: { trigger: query("#float"), start: "top bottom", end: "bottom top", scrub: true } });
        } else gsap.from(element, { y: 40, opacity: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
      if (desktop) {
        all("#float .ring").forEach((ring) => {
          loop(ring, gsap.to(ring, { rotation: 360, duration: 60, repeat: -1, ease: "none", paused: true }));
          gsap.fromTo(ring, { scale: 0.85 }, { scale: 1.1, ease: "none", scrollTrigger: { trigger: query("#float"), scrub: true } });
        });
      }
      setStep(0);
      gsap.fromTo(all("#fill"), { scaleY: 0, transformOrigin: "top center" }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: query(desktop ? "#proc" : "#proc .tl"), start: desktop ? "top top" : "top 70%", end: desktop ? "+=150%" : "bottom 60%", pin: desktop, scrub: 0.6, invalidateOnRefresh: true, onUpdate: (self) => setStep(self.progress) } });
      all("#cta .shield").forEach((shield) => {
        if (desktop) loop(shield, gsap.to(shield, { y: -18, rotation: 3, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut", paused: true }));
        gsap.fromTo(shield, { yPercent: 30 }, { yPercent: -20, ease: "none", scrollTrigger: { trigger: query("#cta"), scrub: true } });
      });
      if (desktop) all(".mag").forEach((button) => {
        const xTo = gsap.quickTo(button, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.5, ease: "power3.out" });
        const move = (event: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.35);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.35);
        };
        const leave = () => { xTo(0); yTo(0); };
        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", leave);
        cleanups.push(() => { button.removeEventListener("mousemove", move); button.removeEventListener("mouseleave", leave); });
      });

      const sections = all("section[data-bg]");
      let currentBackground = "";
      let backgroundTween: gsap.core.Tween | undefined;
      const checkBackground = () => {
        const section = sections.find((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= innerHeight * 0.55 && bounds.bottom > innerHeight * 0.55;
        });
        const next = section?.dataset.bg;
        if (!next || next === currentBackground) return;
        currentBackground = next;
        backgroundTween?.kill();
        backgroundTween = gsap.to(document.body, { backgroundColor: next, duration: 0.6, ease: "power2.out", overwrite: true });
      };
      const unsubscribe = subscribeSmoothScroll(checkBackground);
      // Native scroll covers touch/keyboard and a provider that has not mounted yet.
      window.addEventListener("scroll", checkBackground, { passive: true });
      window.addEventListener("resize", checkBackground);
      checkBackground();
      cleanups.push(() => { unsubscribe(); window.removeEventListener("scroll", checkBackground); window.removeEventListener("resize", checkBackground); backgroundTween?.kill(); });
      const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
      document.fonts?.ready.then(refresh);
      return () => {
        disposed = true;
        cleanups.forEach((cleanup) => cleanup());
        hidePreloader();
        steps.forEach((step) => step.classList.remove("on"));
      };
    }, root);

    return () => {
      media.revert();
      setSmoothScrollPaused(false);
      document.body.style.backgroundColor = originalBackground;
    };
  }, [rootRef]);
}
