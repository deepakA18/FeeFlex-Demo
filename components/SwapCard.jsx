"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { fetchSolToUsdcPrice, fetchUsdcToSolPrice } from "@/utils/jup_service";
import { VersionedTransaction, Connection } from "@solana/web3.js";

const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

const SwapCard = () => {
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellToken, setSellToken] = useState("USDC");
  const [buyToken, setBuyToken] = useState("SOL");
  const [sellTokenIcon, setSellTokenIcon] = useState("/usdt.svg");
  const [buyTokenIcon, setBuyTokenIcon] = useState("/solana.svg");
  const [isLoading, setIsLoading] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState(null);
  const [error, setError] = useState(null);

  const { wallet, connected, connect, signTransaction, sendTransaction, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY_HERE');

  const fetchPrice = useCallback(
    debounce(async (fromToken, toToken, amount) => {
      if (!fromToken || !toToken || amount === undefined || amount === 0) {
        setBuyAmount(0);
        setQuoteResponse(null);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        let price = 0;
        if (fromToken === "SOL" && toToken === "USDC") {
          price = await fetchSolToUsdcPrice(fromToken, toToken);
        } else if (fromToken === "USDC" && toToken === "SOL") {
          price = await fetchUsdcToSolPrice(fromToken, toToken);
        }
        setBuyAmount(price * amount);
        
        const quote = await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken === "SOL" ? SOL_MINT : USDC_MINT}&outputMint=${toToken === "SOL" ? SOL_MINT : USDC_MINT}&amount=${amount * Math.pow(10, 9)}&slippage=0.5`
        ).then(res => res.json());
        setQuoteResponse(quote);
      } catch (error) {
        console.error("Error fetching conversion:", error);
        setError("Failed to fetch price. Please try again.");
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
    const tempIcon = sellTokenIcon;

    setSellAmount(buyAmount);
    setBuyAmount(tempAmount);
    setSellToken(buyToken);
    setBuyToken(tempToken);
    setSellTokenIcon(buyTokenIcon);
    setBuyTokenIcon(tempIcon);
  };

  const handleWalletButtonClick = async () => {
    if (!wallet) {
      setVisible(true);
      return;
    }

    if (!connected) {
      try {
        await connect();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        setError("Failed to connect wallet. Please try again.");
        return;
      }
    }

    if (connected && quoteResponse) {
      await signAndSendTransaction();
    }
  };

  async function signAndSendTransaction() {
    if (!connected || !signTransaction || !sendTransaction || !publicKey) {
      setError("Wallet is not connected or does not support signing transactions");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Preparing swap transaction request...");
      const requestPayload = {
        quoteResponse,
        userPublicKey: publicKey.toString(),
        wrapAndUnwrapSol: true,
      };
      console.log("Request payload:", requestPayload);

      const response = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const { swapTransaction } = await response.json();

      if (!swapTransaction) {
        throw new Error("Swap transaction is undefined in the API response");
      }

      console.log("Deserializing transaction...");
      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      console.log("Signing transaction...");
      const signedTransaction = await signTransaction(transaction);

      console.log("Sending transaction...");
      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      console.log("Transaction sent. Confirming...");
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid,
      }, 'confirmed');

      console.log(`Transaction confirmed: https://solscan.io/tx/${txid}`);
      // You might want to update UI here to show success message
    } catch (error) {
      console.error("Error in signAndSendTransaction:", error);
      setError("Failed to complete the swap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-white rounded-[10px] px-[106px] pt-[60px] pb-[30px] max-w-3xl h-auto items-center mx-auto flex flex-col justify-evenly shadow-lg mt-16 bg-[#40916c]/10 backdrop-filter backdrop-blur-xl border border-[#d8f3dc] shadow-[#d8f3dc]">
      {/* Sell Section */}
      <div className="flex flex-row md:flex-row justify-between items-start md:items-center bg-gradient-to-br from-[#55a27d] to-[#95d5a6] rounded-[15px] px-[46px] py-[36] h-auto md:h-[150px] w-full border border-gray-700 mx-auto mb-4">
        <div className="flex-1 mb-4 md:mb-0">
          <p className="text-[#1B4332] text-lg">Sell</p>
          <input
            type="text"
            className="w-full bg-transparent text-2xl font-semibold outline-none mt-2 text-[#1B4332]"
            placeholder="0"
            value={sellAmount}
            onChange={(e) => setSellAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="flex items-center space-x-2 py-1 px-3 border rounded-full border-[#1B4332]">
          <Image src={sellTokenIcon} alt={sellToken} width={20} height={20} />
          <p className="text-l font-normal text-[#1B4332]">{sellToken}</p>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        className="rounded-full w-12 h-12 bg-[#0e281e] border-[#0e281e] border-2 flex items-center justify-center mx-auto my-4 focus:outline-none transform transition group absolute translate-y-[-50px]"
      >
        <span className="transform -rotate-90 group-hover:rotate-90 transition-transform duration-300">
          <Image src="swap-curve.svg" alt="swap" width={18} height={18} />
        </span>
      </button>

      {/* Buy Section */}
      <div className="flex flex-row md:flex-row justify-between items-start md:items-center bg-gradient-to-br from-[#55a27d] to-[#95d5a6] rounded-[15px] px-[46px] py-[36] h-auto md:h-[150px] w-full border border-gray-700 mx-auto mb-4">
        <div className="flex-1 mb-4 md:mb-0">
          <p className="text-[#1B4332] text-lg">Buy</p>
          <input
            type="text"
            className="w-full bg-transparent text-2xl font-semibold outline-none mt-2 text-[#1B4332]"
            placeholder="0"
            value={buyAmount}
            disabled
          />
        </div>
        <div className="flex items-center space-x-2 py-1 px-3 border rounded-full border-[#1B4332]">
          <Image src={buyTokenIcon} alt={buyToken} width={20} height={20} />
          <p className="text-l font-normal text-[#1B4332]">{buyToken}</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {/* Wallet Connect/Swap Button */}
      <Button
        onClick={handleWalletButtonClick}
        disabled={isLoading}
        className="rounded-full w-full h-[50px] md:h-[60px] bg-[#95d5a6] hover:bg-[#74c69d] text-xl font-semibold focus:outline-none text-[#081c15] transform transition"
      >
        {isLoading ? "Processing..." : connected ? "Swap" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default SwapCard;