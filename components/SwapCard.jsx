"use client";

import React, { useState } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { ArrowDownIcon,ArrowUpIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

const SwapCard = () => {
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellToken, setSellToken] = useState("SOL"); 
  const [buyToken, setBuyToken] = useState("USDC");

  const {wallet,connected, connect} = useWallet();
 

  const { setVisible } = useWalletModal();

  const handleSwap = () => {
    const tempAmount = sellAmount;
    const tempToken = sellToken;
    
    setSellAmount(buyAmount);
    setBuyAmount(tempAmount);

    setSellToken(buyToken);
    setBuyToken(tempToken);
  };

  const handleWalletButtonClick = () => {
    setTimeout(() => {
      if (connected) {
       //Swap function call 
      } else if (!wallet) {
        setVisible(true);
      } else {
        connect();
      }
    }, 300);
  };



  return (
    <div className="text-white rounded-lg p-6 max-w-lg h-[460px] mx-auto flex flex-col justify-evenly shadow-lg mt-16 bg-white/10 backdrop-blur-lg backdrop-filter bg-opacity-70">
      {/* Sell Section */}
      <div className="flex justify-evenly items-center bg-black rounded-lg p-4 space-x-4 h-40">
        <div className="flex-1">
          <p className="text-gray-400 text-lg">Sell</p>
          <input
            type="text"
            className="w-full bg-transparent text-2xl font-semibold outline-none"
            placeholder="0"
            value={sellAmount}
            onChange={(e) => setSellAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
       <p className="text-xl font-semibold">{sellToken}</p>
      </div>

      <button
        onClick={handleSwap}
        className="rounded-full w-10 h-10 bg-[#343434] text-white flex items-center justify-center mx-auto my-4 focus:outline-none"
      ><ArrowUpIcon className="w-5 h-5"/><ArrowDownIcon className="w-5 h-5"/></button>
    

      {/* Buy Section */}
      <div className="flex justify-evenly items-center bg-black rounded-lg p-4 space-x-4 h-40">
        <div className="flex-1">
          <p className="text-gray-400 text-lg">Buy</p>
          <input
            type="text"
            className="w-full bg-transparent text-2xl font-semibold outline-none"
            placeholder="0"
            value={buyAmount}
            onChange={(e) => setBuyAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
       <p className="text-xl font-semibold">{buyToken}</p>
      </div>

      {/* Swap Button */}
      <Button className="w-full mt-6 bg-white text-black text-lg font-semibold rounded-xl hover:bg-gray-300 h-12" onClick={handleWalletButtonClick}>
        {connected ? 'Swap': 'Connect Wallet'}
      </Button>
    </div>
  );
};

export default SwapCard;
