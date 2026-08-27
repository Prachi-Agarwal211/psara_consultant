"use client";

import StageShell from "./components/ui/StageShell";
import HeroStage from "./components/sections/HeroStage";
import HeroActions from "./components/sections/HeroActions";
import HomeStory from "./components/sections/HomeStory";
import { SiteHeader } from "../components/SiteChrome";

export default function Home() {
  return (
    <StageShell autoMotion={false}>
      <SiteHeader pathname="/" homePlacement />
      <HeroStage />
      <HeroActions />
      <HomeStory />
    </StageShell>
  );
}
