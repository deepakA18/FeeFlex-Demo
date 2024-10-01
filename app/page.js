import React from "react";
import Overview from "@/components/Overview";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";



export default function Home() {
  return (
   <main>
    <HeroSection />
    <Overview />
    <Features/>
   </main>
  );
}
