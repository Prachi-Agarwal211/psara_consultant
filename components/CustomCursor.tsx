"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { isMobile, prefersReducedMotion } from "../app/lib/gsap";

const noopSubscribe = () => () => {};

/**
 * Custom Luxury Spring Cursor System
 * Features: smooth spring trailing, magnetic element snapping,
 * expanding gold aura ring, and dynamic hover text (data-cursor="Text").
 */
export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [hovered, setHovered] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  // Enable only on capable desktop devices — SSR-safe (false during hydration).
  const enabled = useSyncExternalStore(
    noopSubscribe,
    () => !isMobile() && !prefersReducedMotion(),
    () => false
  );

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      // Check if mouse is hovering over an element with data-cursor
      const targetEl = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      let nextText = "";
      let nextHovered = false;

      if (targetEl) {
        nextText = targetEl.getAttribute("data-cursor") || "";
        nextHovered = true;
        const rect = targetEl.getBoundingClientRect();
        targetEl.style.setProperty("--pointer-x", `${e.clientX - rect.left}px`);
        targetEl.style.setProperty("--pointer-y", `${e.clientY - rect.top}px`);
      } else {
        nextHovered = Boolean(
          (e.target as HTMLElement)?.closest("a, button, input, textarea, [role='button']")
        );
      }

      setCursorText((prev) => (prev !== nextText ? nextText : prev));
      setHovered((prev) => (prev !== nextHovered ? nextHovered : prev));
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;

    const render = () => {
      // Smooth lerp / spring physics
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`psara-cursor-ring fixed top-0 left-0 pointer-events-none z-[10001] rounded-full border border-[var(--gold)] flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ${
          hovered
            ? cursorText
              ? "w-24 h-24 bg-[var(--gold)]/20 backdrop-blur-xs border-[var(--gold)] text-[var(--gold)]"
              : "w-12 h-12 bg-[var(--gold)]/15 border-[var(--gold)]"
            : "w-8 h-8 bg-transparent opacity-60"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--gold)] text-center px-2 select-none leading-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10001] w-1.5 h-1.5 rounded-full bg-[var(--gold)]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
