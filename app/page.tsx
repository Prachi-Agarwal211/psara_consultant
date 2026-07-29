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
      <div data-section-transition data-transition="clip-left">
        <HeroDossier onOpenQuiz={() => setQuizOpen(true)} />
      </div>

      {/* 2. Stats */}
      <SectionDivider label="01 — The Seal" />
      <div data-section-transition data-transition="clip-up">
        <StatsBar />
      </div>

      {/* ════════════════════════════════════════════
          ACT 2: THE METHOD — How We Work
          ════════════════════════════════════════════ */}

      <SectionDivider label="02 — The Method" />

      {/* 3. Philosophy */}
      <div data-section-transition data-transition="clip-left">
        <Philosophy />
      </div>

      <SectionDivider />

      {/* 4. Ticker */}
      <div data-section-transition data-transition="fade">
        <TickerMarquee />
      </div>

      <SectionDivider />

      {/* 5. Process */}
      <div data-section-transition data-transition="clip-right">
        <ApprovalRoadmap />
      </div>

      {/* ════════════════════════════════════════════
          ACT 3: THE REACH — Where We Work
          ════════════════════════════════════════════ */}

      <SectionDivider label="03 — The Reach" />

      {/* 6. Presence */}
      <div data-section-transition data-transition="blur">
        <Presence />
      </div>

      <SectionDivider />

      {/* 7. State Grid */}
      <div data-section-transition data-transition="clip-up">
        <StateGridHome />
      </div>

      {/* ════════════════════════════════════════════
          ACT 4: THE PROOF — Social Proof & Trust
          ════════════════════════════════════════════ */}

      <SectionDivider label="04 — The Proof" />

      {/* 8. Trust Proof */}
      <div data-section-transition data-transition="clip-left">
        <TrustProof onOpenQuiz={() => setQuizOpen(true)} />
      </div>

      <SectionDivider />

      {/* 9. Reviews */}
      <div data-section-transition data-transition="blur">
        <GoogleReviews variant="compact" />
      </div>

      {/* ════════════════════════════════════════════
          ACT 5: THE CONVERSATION — Call to Action
          ════════════════════════════════════════════ */}

      <SectionDivider label="05 — The Conversation" />

      {/* 10. FAQ */}
      <div data-section-transition data-transition="clip-up">
        <HomeFaq />
      </div>

      <SectionDivider />

      {/* 11. Contact */}
      <div data-section-transition data-transition="blur">
        <HomeContact />
      </div>

      <SectionDivider />

      {/* Closing fluid line */}
      <div aria-hidden="true">
        <FluidGoldLine variant="double" className="py-6" opacity={0.15} />
      </div>

      {/* 12. Footer */}
      <div data-section-transition data-transition="clip-left">
        <SiteFooter />
      </div>

      <EligibilityQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </main>
  );
}
