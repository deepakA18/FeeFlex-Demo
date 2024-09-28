"use client";

import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";  // Ensure lodash is installed
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
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

  // Debounced function to fetch the conversion price
  const fetchPrice = useCallback(
    debounce(async (fromToken, toToken, amount) => {
      if (!fromToken || !toToken || amount === undefined) return;
  
      // Set buyAmount to 0 when sellAmount is 0 or empty
      if (amount === 0 || !amount) {
        setBuyAmount(0);
        return;
      }

      setIsLoading(true);
      try {
        let price = 0;
        // Check if we are converting SOL to USDC or USDC to SOL
        if (fromToken === "SOL" && toToken === "USDC") {
          price = await fetchSolToUsdcPrice(fromToken, toToken);
        } else if (fromToken === "USDC" && toToken === "SOL") {
          price = await fetchUsdcToSolPrice(fromToken, toToken);
        }

        // Set the buy amount based on the fetched price
        setBuyAmount(price * amount);
      } catch (error) {
        console.error("Error fetching conversion:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // Automatically fetch price whenever sellAmount or tokens change
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
      >
        <ArrowUpIcon className="w-5 h-5" />
        <ArrowDownIcon className="w-5 h-5" />
      </button>

      {/* Buy Section */}
      <div className="flex justify-evenly items-center bg-black rounded-lg p-4 space-x-4 h-40">
        <div className="flex-1">
          <p className="text-gray-400 text-lg">Buy</p>
          <input
            type="text"
            className="w-full bg-transparent text-2xl font-semibold outline-none"
            placeholder="0"
            value={buyAmount}
            disabled // Prevent user from changing buyAmount directly
          />
        </div>
        <p className="text-xl font-semibold">{buyToken}</p>
      </div>

      {/* Swap Button */}
      <Button
        className="w-full mt-6 bg-white text-black text-lg font-semibold rounded-xl hover:bg-gray-300 h-12"
        onClick={handleWalletButtonClick}
      >
        {connected ? "Swap" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default SwapCard;
