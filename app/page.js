import React from "react";
import Overview from "@/components/Overview";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";



export default function Home() {
  return (
   <main>
    <HeroSection />
    <Overview />
    <Features/>
    <CallToAction />
   </main>
  );
}
