"use client";

import { useRef, useState, type ButtonHTMLAttributes } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  intensity?: number;
  targetId?: string;
}

export function MagneticButton({ children, intensity = 0.28, targetId, className, onClick, type, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  return (
    <button
      ref={ref}
      {...rest}
      onClick={(e) => {
        if (type === undefined) e.preventDefault();
        if (targetId) document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        onClick?.(e);
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        setLeaving(false);
        const rect = ref.current.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * intensity,
          y: (e.clientY - rect.top - rect.height / 2) * intensity,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setPos({ x: 0, y: 0 });
        setHovered(false);
        setLeaving(true);
      }}
      className={`magnetic ${className ?? ""}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${hovered ? 1.03 : 1})`,
        transition: leaving ? "transform 0.5s var(--ease-elastic, cubic-bezier(0.175,0.885,0.32,1.275))" : "none",
        willChange: "transform",
      }}
    >
      <span className="magnetic-glow" aria-hidden data-on={hovered || undefined} />
      <span className="magnetic-label">{children}</span>
    </button>
  );
}
