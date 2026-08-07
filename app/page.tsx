"use client";

import StageShell from "./components/ui/StageShell";
import HeroStage from "./components/sections/HeroStage";
import HomeStory from "./components/sections/HomeStory";

export default function Home() {
  return (
    <StageShell autoMotion={false}>
      <HeroStage />
      <HomeStory />
    </StageShell>
  );
}
