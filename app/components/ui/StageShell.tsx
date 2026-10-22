"use client";

import { useRef } from "react";
import SiteFooter from "../sections/SiteFooter";
import useV3PageMotion from "../v3/useV3PageMotion";
import { CTABand } from "@/components/v3/PagePrimitives";

export default function StageShell({ children, showFooter = true, showCta = true, autoMotion = true }: { children: React.ReactNode; showFooter?: boolean; showCta?: boolean; autoMotion?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useV3PageMotion(rootRef, autoMotion);
  return <div ref={rootRef} className="v3-pages">
    {children}
    {showFooter && <>{showCta && <CTABand />}<SiteFooter /></>}
  </div>;
}
