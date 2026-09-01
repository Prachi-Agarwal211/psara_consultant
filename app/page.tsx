"use client";

import StageShell from "./components/ui/StageShell";
import HeroStage from "./components/sections/HeroStage";
import HeroActions from "./components/sections/HeroActions";
import ComplianceMarquee from "./components/sections/ComplianceMarquee";
import StatsBar from "./components/sections/StatsBar";
import ServicesSection from "./components/sections/ServicesSection";
import ApprovalRoadmap from "./components/sections/ApprovalRoadmap";
import GoogleReviews from "./components/sections/GoogleReviews";
import HomeFaq from "./components/sections/HomeFaq";
import HomeContact from "./components/sections/HomeContact";
import StateGridHome from "./components/sections/StateGridHome";
import GbpOfficeSection from "./components/sections/GbpOfficeSection";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import { SiteHeader } from "../components/SiteChrome";
import { OFFICES } from "../lib/config";

const HQ_OFFICES = OFFICES.filter((o) => o.isHQ);

export default function Home() {
  return (
    <StageShell autoMotion={false}>
      <SiteHeader pathname="/" homePlacement />
      <HeroStage />
      <div className="hidden md:block">
        <HeroActions />
      </div>
      <ComplianceMarquee />
      <StatsBar />
      <WhyChooseUs />
      <ServicesSection />
      <ApprovalRoadmap />
      <GoogleReviews />
      <HomeFaq />
      <StateGridHome />
      <GbpOfficeSection placeLabel={HQ_OFFICES[0]?.city ?? "Jaipur"} offices={HQ_OFFICES} />
      <HomeContact />
    </StageShell>
  );
}
