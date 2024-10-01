"use client";

// import { Bebas_Neue } from 'next/font/google';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Cross2Icon } from '@radix-ui/react-icons';


// const spaceGrotesk = Bebas_Neue({
//   subsets: ["latin"],
//   weight: ["400"],
// });

const items = [
  { id: 1, title: "How it works", subtitle: "Subtitle 1", width: "w-2/5", height: "h-55" },
  { id: 2, title: "Title 2", subtitle: "Subtitle 2", width: "w-1/4", height: "h-80" },
  { id: 3, title: "Title 3", subtitle: "Subtitle 3", width: "w-1/3", height: "h-64" },
  { id: 4, title: "Title 4", subtitle: "Subtitle 4", width: "", height: "h-72" }
];


const Overview = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    
    <div className="container mx-auto px-4 mt-16">
      
      {/* First row: 1st and 2nd divs side by side */}
      <div className="flex justify-center gap-6">
        {items.slice(0, 2).map(item => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            className={`p-6 bg-[#b7e4c7] hover:shadow-custom-red rounded-3xl text-[#081c15] cursor-pointer w-1/2 ${item.height} ${item.width} `}
            onClick={() => setSelectedId(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h1>{item.title}</motion.h1>
            <motion.h5>{item.subtitle}</motion.h5>
          </motion.div>
        ))}
      </div>

      {/* Second row: 3rd and 4th divs side by side */}
      <div className="flex justify-center gap-6 mt-6">
        {items.slice(2).map(item => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            className={`p-6 bg-[#b7e4c7] hover:shadow-custom-red rounded-3xl text-[#081c15] cursor-pointer w-1/2 ${item.height} ${item.width}`}
            onClick={() => setSelectedId(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: "flex", flexDirection: "column", justifyItems: item.id === 3 ? "self-end" : "" }} 
          >
            <motion.h1>{item.title}</motion.h1>
            <motion.h5>{item.subtitle}</motion.h5>
          </motion.div>
        ))}
      </div>

      {/* AnimatePresence for selected item */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="fixed top-0 left-0 w-full h-full bg-white/10 bg-opacity-10 backdrop-blur-lg backdrop-filter flex items-center justify-center z-50"
          >
            <div className="bg-black p-6 rounded-lg text-center w-2/4 h-3/4 relative">
              <motion.h1 className="text-white text-3xl font-semibold">
                {items.find((item) => item.id === selectedId)?.title}
              </motion.h1>
              <motion.h5>{items.find((item) => item.id === selectedId)?.subtitle}</motion.h5>

              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 bg-white/20 backdrop-filter backdrop-blur-lg text-white rounded-full h-10 w-10 flex justify-center items-center"
                onClick={() => setSelectedId(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Cross2Icon className='h-5 w-5 hover:h-8,w-8'/>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
  );
};

export default Overview;
