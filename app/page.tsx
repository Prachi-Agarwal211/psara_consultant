"use client";

import { useEffect, useRef, useState } from "react";
import { initAllSectionTransitions, ensureGsap } from "./lib/gsap";
import HeroDossier from "./components/sections/HeroDossier";
import StatsBar from "./components/sections/StatsBar";
import TickerMarquee from "./components/sections/TickerMarquee";
import Philosophy from "./components/sections/Philosophy";
import ApprovalRoadmap from "./components/sections/ApprovalRoadmap";
import Presence from "./components/sections/Presence";
import StateGridHome from "./components/sections/StateGridHome";
import TrustProof from "./components/sections/TrustProof";
import GoogleReviews from "./components/sections/GoogleReviews";
import HomeFaq from "./components/sections/HomeFaq";
import HomeContact from "./components/sections/HomeContact";
import SiteFooter from "./components/sections/SiteFooter";
import EligibilityQuiz from "./components/sections/EligibilityQuiz";
import SectionDivider from "./components/ui/SectionDivider";
import FluidGoldLine from "./components/ui/FluidGoldLine";

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      initAllSectionTransitions(mainRef.current!, "[data-section-transition]");
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--obsidian)" }}
    >
      {/* Atmosphere noise grain */}
      <div className="noise-overlay" aria-hidden />

      {/* ════════════════════════════════════════════
          ACT 1: THE GOLDEN SEAL — First Impression
          ════════════════════════════════════════════ */}

      {/* 1. Cinematic Hero */}
      <div data-section-transition data-transition="clip-left" className="theme-paper-jasmine">
        <HeroDossier onOpenQuiz={() => setQuizOpen(true)} />
      </div>

      {/* 2. Stats */}
      <SectionDivider label="01 — STATUTORY METRICS" />
      <div data-section-transition data-transition="clip-up" className="theme-obsidian-dark">
        <StatsBar />
      </div>

      {/* ════════════════════════════════════════════
          ACT 2: THE METHOD — How We Work
          ════════════════════════════════════════════ */}

      <SectionDivider label="02 — PHILOSOPHY & PROCESS" />

      {/* 3. Philosophy */}
      <div data-section-transition data-transition="clip-left" className="theme-paper-jasmine">
        <Philosophy />
      </div>

      <SectionDivider />

      {/* 4. Ticker */}
      <div data-section-transition data-transition="fade" className="theme-obsidian-dark">
        <TickerMarquee />
      </div>

      <SectionDivider />

      {/* 5. Process */}
      <div data-section-transition data-transition="clip-right" className="theme-obsidian-dark">
        <ApprovalRoadmap />
      </div>

      {/* ════════════════════════════════════════════
          ACT 3: THE REACH — Where We Work
          ════════════════════════════════════════════ */}

      <SectionDivider label="03 — STATUTORY JURISDICTION" />

      {/* 6. Presence */}
      <div data-section-transition data-transition="blur" className="theme-obsidian-dark">
        <Presence />
      </div>

      <SectionDivider />

      {/* 7. State Grid */}
      <div data-section-transition data-transition="clip-up" className="theme-paper-jasmine">
        <StateGridHome />
      </div>

      {/* ════════════════════════════════════════════
          ACT 4: THE PROOF — Social Proof & Trust
          ════════════════════════════════════════════ */}

      <SectionDivider label="04 — VERIFIED REVIEWS" />

      {/* 8. Trust Proof */}
      <div data-section-transition data-transition="clip-left" className="theme-obsidian-dark">
        <TrustProof onOpenQuiz={() => setQuizOpen(true)} />
      </div>

      <SectionDivider />

      {/* 9. Reviews */}
      <div data-section-transition data-transition="blur" className="theme-paper-jasmine">
        <GoogleReviews variant="compact" />
      </div>

      {/* ════════════════════════════════════════════
          ACT 5: THE CONVERSATION — Call to Action
          ════════════════════════════════════════════ */}

      <SectionDivider label="05 — DIRECT CONSULTATION" />

      {/* 10. FAQ */}
      <div data-section-transition data-transition="clip-up" className="theme-paper-jasmine">
        <HomeFaq />
      </div>

      <SectionDivider />

      {/* 11. Contact */}
      <div data-section-transition data-transition="blur" className="theme-obsidian-dark">
        <HomeContact />
      </div>

      <SectionDivider />

      {/* Closing fluid line */}
      <div aria-hidden="true">
        <FluidGoldLine variant="double" className="py-6" opacity={0.15} />
      </div>

      {/* 12. Footer */}
      <div data-section-transition data-transition="clip-left" className="theme-obsidian-dark">
        <SiteFooter />
      </div>

      <EligibilityQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </main>
  );
}
