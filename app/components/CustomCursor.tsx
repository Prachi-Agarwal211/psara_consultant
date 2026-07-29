"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only on desktop with fine pointer — no cursor suppression on touch devices
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion()) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!cursor || !ring || !label) return;

    // Add class to suppress native cursor ONLY on desktop fine-pointer devices
    document.documentElement.classList.add("cursor-custom");

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let currentTarget: HTMLElement | null = null;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.set(cursor, { x: mouseX, y: mouseY });

      // Ring follows with slight lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: "power2.out",
      });

      // Check for cursor-hoverable elements
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (target !== currentTarget) {
        currentTarget = target;
        if (target) {
          const text = target.getAttribute("data-cursor") || "";
          label.textContent = text;
          label.style.opacity = "1";
          ring.classList.add("active");
          gsap.to(ring, {
            width: text ? 80 : 56,
            height: text ? 80 : 56,
            duration: 0.25,
            ease: "power2.out",
          });
        } else {
          label.style.opacity = "0";
          ring.classList.remove("active");
          gsap.to(ring, {
            width: 32,
            height: 32,
            duration: 0.25,
            ease: "power2.out",
          });
        }
      }
    };

    // Hide cursor when leaving window
    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
      gsap.to(ring, { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
      gsap.to(ring, { opacity: 1, duration: 0.2 });
    };

    // Click burst effect on dot
    const onClick = () => {
      gsap.fromTo(
        cursor,
        { scale: 2.5, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("click", onClick);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <>
      {/* Cursor dot — follows instantly */}
      <div
        ref={cursorRef}
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[9999]"
        aria-hidden="true"
      />
      {/* Cursor ring — follows with lag + label */}
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[9998]"
        aria-hidden="true"
      >
        <span ref={labelRef} className="custom-cursor-label pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest opacity-0" />
      </div>
    </>
  );
}
