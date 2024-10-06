import React from "react";
import SwapCard from "@/components/SwapCard";
import Image from "next/image";

export default function SwapPage() {
  return (
    <main>
      <div className="absolute top-0 right-0 -z-10 ">
          <Image 
            src="/gradient-top.svg" 
            alt="Top Right Blob" 
            width={500} 
            height={500} 
          />
        </div>
      <SwapCard />
      {/* Add other content for the swap page if needed */}
    </main>
  );
}
