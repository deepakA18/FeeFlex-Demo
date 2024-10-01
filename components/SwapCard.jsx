"use client";

import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";  // Ensure lodash is installed
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { fetchSolToUsdcPrice, fetchUsdcToSolPrice } from "@/utils/jup_service"; // Import both price functions

const SwapCard = () => {
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellToken, setSellToken] = useState("SOL");
  const [buyToken, setBuyToken] = useState("USDC");
  const [isLoading, setIsLoading] = useState(false);

  const { wallet, connected, connect } = useWallet();
  const { setVisible } = useWalletModal();

  const fetchPrice = useCallback(
    debounce(async (fromToken, toToken, amount) => {
      if (!fromToken || !toToken || amount === undefined) return;
      if (amount === 0 || !amount) {
        setBuyAmount(0);
        return;
      }
      setIsLoading(true);
      try {
        let price = 0;
        if (fromToken === "SOL" && toToken === "USDC") {
          price = await fetchSolToUsdcPrice(fromToken, toToken);
        } else if (fromToken === "USDC" && toToken === "SOL") {
          price = await fetchUsdcToSolPrice(fromToken, toToken);
        }
        setBuyAmount(price * amount);
      } catch (error) {
        console.error("Error fetching conversion:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (sellToken && buyToken) {
      fetchPrice(sellToken, buyToken, sellAmount);
    }
  }, [sellAmount, sellToken, buyToken, fetchPrice]);

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
        // Swap function call
      } else if (!wallet) {
        setVisible(true);
      } else {
        connect();
      }
    }, 300);
  };

  return (
    <div className="text-white rounded-[10px] p-6 max-w-2xl h-[550px] mx-auto flex flex-col justify-evenly shadow-lg mt-16 bg-[#40916c]/10 backdrop-filter backdrop-blur-xl  border border-[#d8f3dc]">
      {/* Sell Section */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#55a27d] to-[#95d5a6] rounded-[15px] p-6 h-[168px] w-[618px] border border-gray-700 mx-auto">
        <div className="flex-1">
          <p className="text-[#081c15] text-lg">Sell</p>
          <input
            type="text"
            className="w-full bg-transparent text-2xl font-semibold outline-none mt-2 text-[#081c15]"
            placeholder="0"
            value={sellAmount}
            onChange={(e) => setSellAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        <p className="text-xl font-semibold text-[#081c15]">{sellToken}</p>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        className="rounded-full w-10 h-10 bg-[#081c15] flex items-center justify-center mx-auto my-4 focus:outline-none transform transition hover:scale-105"
      >
        <span className="transform rotate-90">&#8645;</span> {/* Swap icon */}
      </button>

      {/* Buy Section */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#55a27d] to-[#95d5a6] rounded-[15px] p-6 h-[168px] w-[618px] border border-gray-700 mx-auto">
        <div className="flex-1">
          <p className="text-[#081c15] text-lg">Buy</p>
          <input
            type="text"
            className="w-full bg-transparent text-2xl font-semibold outline-none mt-2 text-[#081c15]"
            placeholder="0"
            value={buyAmount}
            disabled // Prevent user from changing buyAmount directly
          />
        </div>
        <p className="text-xl font-semibold text-[#081c15]">{buyToken}</p>
      </div>

      {/* Swap Button */}
      <Button
        className="w-[618px] h-[60px] mt-6 mx-auto bg-[#d8f3dc] text-[#081c15] text-lg font-semibold rounded-xl hover:bg-[#d8f1de] transition-colors duration-300"
        onClick={handleWalletButtonClick}
      >
        {connected ? "Swap" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default SwapCard;
