"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initLoadingBar, prefersReducedMotion } from "../../lib/gsap";

/**
 * Inner component that uses useSearchParams — must be wrapped in <Suspense>
 * because Next.js App Router requires it for client-side navigation hooks.
 */
function PageLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const bar = initLoadingBar();

    // Start bar on route change, finish after a brief delay.
    // For static pages the transition is near-instant.
    bar.start();

    const timer = setTimeout(() => {
      bar.finish();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return null;
}

/**
 * PageLoader — Thin gold loading bar at the top of the page.
 * Triggers on route changes (pathname + searchParams changes).
 * Jasmine/Voyeur inspired: a subtle page-loading indicator that gives visual feedback
 * during navigation without blocking the user.
 */
export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderInner />
    </Suspense>
  );
}
