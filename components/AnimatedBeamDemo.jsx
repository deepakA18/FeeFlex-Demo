"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";

// Reusable Circle component
const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef(null);
  const div1Ref = useRef(null); // Ref for User logo
  const div2Ref = useRef(null); // Ref for OpenAI logo
  const logo1Ref = useRef(null); // Ref for first logo (Ethereum)
  const logo2Ref = useRef(null); // Ref for second logo (Solana)
  const logo3Ref = useRef(null); // Ref for third logo (Bitcoin)

  return (
    <div
      className="relative flex w-full max-w-[600px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex w-full items-center justify-between gap-10">
        {/* Left: User logo */}
        <Circle ref={div1Ref}>
          <Icons.user />
        </Circle>

        {/* Center: OpenAI logo */}
        <Circle ref={div2Ref}>
          <Icons.openai />
        </Circle>

        {/* Right: 3 logos one below another */}
        <div className="flex flex-col items-center gap-10">
          <Circle ref={logo1Ref}>
            <Icons.ethereum />
          </Circle>
          <Circle ref={logo2Ref}>
            <Icons.solana />
          </Circle>
          <Circle ref={logo3Ref}>
            <Icons.bitcoin />
          </Circle>
        </div>
      </div>

      {/* Animated beams between User and OpenAI */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={-20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={20}
        reverse
      />

      {/* Animated beams from OpenAI to each logo */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo1Ref}
        startYOffset={10}
        endYOffset={-10}
        curvature={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo2Ref}
        startYOffset={0}
        endYOffset={0}
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo3Ref}
        startYOffset={-10}
        endYOffset={10}
        curvature={10}
      />
    </div>
  );
}

// Icons for various tokens (replace with your actual icons)
const Icons = {
  openai: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* OpenAI icon SVG path */}
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  ethereum: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      fill="currentColor"
    >
      {/* Ethereum logo SVG path */}
      <path d="M128 256L0 192l128 64 128-64-128 64z" />
    </svg>
  ),
  solana: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      fill="currentColor"
    >
      {/* Solana logo SVG path */}
      <path d="M64 128L0 64l128 64L256 0 128 64 0 64z" />
    </svg>
  ),
  bitcoin: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      fill="currentColor"
    >
      {/* Bitcoin logo SVG path */}
      <path d="M128 0L0 128l128 128L256 128 128 0z" />
    </svg>
  ),
};
