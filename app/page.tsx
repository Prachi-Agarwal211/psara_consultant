"use client";

import StageShell from "./components/ui/StageShell";
import HeroStage from "./components/sections/HeroStage";

import ComplianceMarquee from "./components/sections/ComplianceMarquee";
import StatsBar from "./components/sections/StatsBar";
import ServicesSection from "./components/sections/ServicesSection";
import FieldBand from "./components/sections/FieldBand";
import ApprovalRoadmap from "./components/sections/ApprovalRoadmap";
import GoogleReviews from "./components/sections/GoogleReviews";
import HomeFaq from "./components/sections/HomeFaq";
import HomeContact from "./components/sections/HomeContact";
import StateGridHome from "./components/sections/StateGridHome";
import GbpOfficeSection from "./components/sections/GbpOfficeSection";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import SiteFooter from "./components/sections/SiteFooter";
import { SiteHeader } from "../components/SiteChrome";
import { OFFICES } from "../lib/config";

const HQ_OFFICES = OFFICES.filter((o) => o.isHQ);

export default function Home() {
  return (
    <StageShell autoMotion={false} showFooter={false}>
      <SiteHeader pathname="/" homePlacement />
      <HeroStage />
      <ComplianceMarquee />
      <StatsBar />
      <StateGridHome />
      <ServicesSection />
      <FieldBand />
      <ApprovalRoadmap />
      <GoogleReviews />
      <WhyChooseUs />
      <HomeFaq />
      <HomeContact />
      <GbpOfficeSection placeLabel={HQ_OFFICES[0]?.city ?? "Jaipur"} offices={HQ_OFFICES} />
      <SiteFooter />
    </StageShell>
  );
}
