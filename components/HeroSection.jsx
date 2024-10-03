import React from 'react'
import Image from 'next/image';
import {AnimatedBeamDemo} from '@/components/AnimatedBeamDemo'

const HeroSection = () => {
  return (
    <section className="relative flex flex-col mt-20 min-h-72 ">
      {/* Text Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-[#40916c]">
          No <span className="text-[#d8f3dc]">Native Tokens</span>?
        </h1>
        <h1 className="text-6xl font-bold text-[#40916c]">
          No Problem. Just <span className="text-[#d8f3dc]">FeeFlex</span>
        </h1>
      </div>

      <div className='flex justify-center'> 
      <AnimatedBeamDemo />
      </div>
      
    </section>
  );
};

export default HeroSection