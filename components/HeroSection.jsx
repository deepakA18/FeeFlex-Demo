"use client";

import React from 'react'
import Image from 'next/image';
import {AnimatedBeamDemo} from '@/components/AnimatedBeamDemo'

const HeroSection = () => {
  return (
    <section className="relative flex flex-col mt-10 min-h-72 ">
      {/* Text Section */}
      <div className="text-center ">
        <h1 className="text-5xl font-regular text-[#40916c] text-shadow-green-glow">
          No <span className="text-[#d8f3dc]">Native Tokens</span>?
        </h1>
        <h1 className="text-5xl font-regular text-[#40916c] text-shadow-green-glow">
          No Problem. Just <span className="text-[#d8f3dc]">FeeFlex.</span>
        </h1>
      </div>

      <div className='flex justify-center'> 
      <AnimatedBeamDemo />
      </div>
      
    </section>
  );
};

export default HeroSection