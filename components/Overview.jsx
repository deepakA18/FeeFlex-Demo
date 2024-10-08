"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Cross2Icon } from '@radix-ui/react-icons';



const items = [
  { id: 1, title: "What is FeeFlex?", subtitle: "FeeFlex is a token swap where you can swap tokens without native gas fee balance.", width: "w-2/5", height: "h-55" },
  { id: 2, title: "Why FeeFlex?", subtitle: "Not everyone holds the native tokens and faces problem to pay gas, they either will have to onramp or ask their friend for funds.", width: "w-1/4", height: "h-80" },
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
            className={`p-6 bg-[#1b4332] hover:shadow-custom-red rounded-3xl text-[#d8f3dc] cursor-pointer w-1/2 ${item.height} ${item.width} font-unbounded font-normal`}
            onClick={() => setSelectedId(item.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h1 className='font-unbounded text-2xl '>{item.title}</motion.h1>
            <motion.p className='font-unbounded text-xl'>{item.subtitle}</motion.p>
          </motion.div>
        ))}
      </div>

      {/* Second row: 3rd and 4th divs side by side */}
      <div className="flex justify-center gap-6 mt-6">
        {items.slice(2).map(item => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            className={`p-6 bg-[#1b4332] hover:shadow-custom-red rounded-3xl text-[#d8f3dc] cursor-pointer w-1/2 ${item.height} ${item.width} font-unbounded font-normal`}
            onClick={() => setSelectedId(item.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: "flex", flexDirection: "column", justifyItems: item.id === 3 ? "self-end" : "" }} 
          >
            <motion.h1 className='font-unbounded text-2xl '>{item.title}</motion.h1>
            <motion.h5 className='font-unbounded text-xl'>{item.subtitle}</motion.h5>
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
            <div className="bg-[#1b4332] p-6 rounded-lg text-center w-2/4 h-3/4 relative">
              <motion.h1 className="text-[#d8f3dc] text-3xl font-thin">
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
