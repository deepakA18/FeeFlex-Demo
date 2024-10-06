import React from "react";
import Overview from "@/components/Overview";
import HeroSection from "@/components/HeroSection";
import CallToAction from "@/components/CallToAction";
import FeaturesSection from "@/components/FeaturesSection";



export default function Home() {
  return (
   <main>
    <HeroSection />
    <Overview />
    <FeaturesSection/>
    <CallToAction />
   </main>
  );
}
