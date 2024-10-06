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
        "z-10 flex size-16 items-center justify-center rounded-full border-[#40916C] border bg-[#081c15] p-3 shadow-circle-glow",
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
      className="relative flex w-full max-w-[600px] items-center justify-center overflow-hidden bg-transparent p-10 "
      ref={containerRef}
    >
      <div className="flex w-full items-center justify-between gap-20">
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
        curvature={0}
      />
    

      {/* Animated beams from OpenAI to each logo */}
      
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={logo1Ref}
        startYOffset={-10}
        endYOffset={10}
        curvature={100}
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
        startYOffset={10}
        endYOffset={-10}
        curvature={-100}
      />
    </div>
  );
}

// Icons for various tokens (replace with your actual icons)
const Icons = {
  openai: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 375 375" preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id="clip1">
          <path d="M 118.441406 72.25 L 233.941406 72.25 L 233.941406 298.75 L 118.441406 298.75 Z" />
        </clipPath>
        <clipPath id="clip2">
          <path d="M 118.441406 72.25 L 186 72.25 L 186 298.75 L 118.441406 298.75 Z" />
        </clipPath>
      </defs>
      <g fill="#d8f3dc">
        <g transform="translate(85.939902, 299.046718)">
          <path d="M 184.796875 -226.203125 L 177 -176.40625 L 105.90625 -176.40625 L 99.90625 -138.59375 L 164.40625 -138.59375 L 156.59375 -88.796875 L 92.09375 -88.796875 L 78 0 L 19.203125 0 L 54.90625 -226.203125 Z" />
        </g>
      </g>
      <g clipPath="url(#clip1)">
        <path fill="#081c15" d="M 175.632812 72.25 L 233.785156 72.25 L 187.664062 150.394531 L 221.75 150.394531 L 118.484375 298.855469 L 164.605469 183.710938 L 127.511719 185.542969 Z" />
      </g>
      <g clipPath="url(#clip2)">
        <path fill="#52b788" d="M 175.632812 72.25 L 185.65625 72.25 L 127.511719 185.542969 Z M 118.484375 298.855469 L 171.625 183.710938 L 164.605469 183.710938 Z" />
      </g>
    </svg>
  ),
  user: () => (
    <svg
      width="100"
      height="100"
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
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 24 24">
    <path fill="#8FFCF3" d="M12 2v7.39l6.25 2.795z"/>
    <path fill="#CABCF8" d="M12 2 5.75 12.185 12 9.39z"/>
    <path fill="#CBA7F5" d="M12 16.975V22l6.25-8.65z"/>
    <path fill="#74A0F3" d="M12 22v-5.025L5.75 13.35z"/>
    <path fill="#CBA7F5" d="m12 15.81 6.25-3.625L12 9.39z"/>
    <path fill="#74A0F3" d="M5.75 12.185 12 15.81V9.39z"/>
    <path fill="#202699" fill-rule="evenodd" d="m12 15.81-6.25-3.625L12 2l6.25 10.185zm-5.835-3.92L11.9 2.545V9.34zm-.085.255L11.9 9.56v5.96zM12.1 9.56v5.96l5.815-3.375zm0-.22 5.735 2.55L12.1 2.545z" clip-rule="evenodd"/>
    <path fill="#202699" fill-rule="evenodd" d="m12 16.895-6.25-3.55L12 22l6.25-8.655zM6.45 13.97l5.45 3.1v4.45zm5.65 3.1v4.45l5.45-7.55z" clip-rule="evenodd"/>
</svg>

  ),
  solana: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 24 24">
      <path fill="#1B4332" d="M19.125 7.447a.7.7 0 0 1-.456.181H2.644c-.568 0-.856-.65-.462-1.031l2.631-2.538a.67.67 0 0 1 .456-.187h16.087c.575 0 .857.656.457 1.037zm0 12.506a.68.68 0 0 1-.456.175H2.644c-.568 0-.856-.644-.462-1.025l2.631-2.544a.66.66 0 0 1 .456-.18h16.087c.575 0 .857.65.457 1.03zm0-9.65a.68.68 0 0 0-.456-.175H2.644c-.568 0-.856.644-.462 1.025l2.631 2.544a.7.7 0 0 0 .456.181h16.087c.575 0 .857-.65.457-1.031z" />
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
