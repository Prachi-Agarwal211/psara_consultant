"use client";

import Image from "next/image";

interface BrandMarkProps {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
}

export default function BrandMark({ compact = false, className = "" }: BrandMarkProps) {
  const sizeClass = className
    ? className
    : compact
      ? "h-12 w-12 md:h-14 md:w-14"
      : "h-[4.35rem] w-[4.35rem] md:h-[5.25rem] md:w-[5.25rem]";

  const sizesAttr = className
    ? "128px"
    : compact
      ? "56px"
      : "84px";

  return (
    <div
      data-cursor="PSARA Desk"
      className={`group relative shrink-0 transition-transform duration-200 ${sizeClass}`}
    >
      <Image
        src="/apple-touch-icon.png"
        alt="PSARA Consultant India"
        fill
        className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
        sizes={sizesAttr}
        priority
      />
    </div>
  );
}
