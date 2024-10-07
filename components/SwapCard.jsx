"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { fetchSolToUsdcPrice, fetchUsdcToSolPrice } from "@/utils/jup_service";
import { VersionedTransaction, Connection } from "@solana/web3.js";

const SOL_MINT = "So11111111111111111111111111111111111111112"; // SOL mint address
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC mint address

const SwapCard = () => {
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellToken, setSellToken] = useState("SOL");
  const [buyToken, setBuyToken] = useState("USDC");
  const [sellTokenIcon, setSellTokenIcon] = useState("/solana.svg");
  const [buyTokenIcon, setBuyTokenIcon] = useState("/usdt.svg");
  const [isLoading, setIsLoading] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState(null); // Store quote response for swap

  const { wallet, connected, connect, signTransaction, sendTransaction} = useWallet();
  const { setVisible } = useWalletModal();
  const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY_HERE'); // Replace with actual API key
  
  // Debounced function to fetch prices
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
        
        // Get the quote for the transaction from Jupiter API
        const quote = await (
          await fetch(
            `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken === "SOL" ? SOL_MINT : USDC_MINT}&outputMint=${toToken === "SOL" ? SOL_MINT : USDC_MINT}&amount=${amount * Math.pow(10, 9)}&slippage=0.5`
          )
        ).json();
        setQuoteResponse(quote);
        
      } catch (error) {
        console.error("Error fetching conversion:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // Fetch prices on amount change
  useEffect(() => {
    if (sellToken && buyToken) {
      fetchPrice(sellToken, buyToken, sellAmount);
    }
  }, [sellAmount, sellToken, buyToken, fetchPrice]);

  // Handle swapping assets
  const handleSwap = () => {
    const tempAmount = sellAmount;
    const tempToken = sellToken;
    const tempIcon = sellTokenIcon;

    setSellAmount(buyAmount);
    setBuyAmount(tempAmount);
    setSellToken(buyToken);
    setBuyToken(tempToken);

    // Swap the icons
    setSellTokenIcon(buyTokenIcon);
    setBuyTokenIcon(tempIcon);
  };

  // Handle wallet connect or swap button click
  const handleWalletButtonClick = async () => {
    if (connected && quoteResponse) {
      // If connected, proceed to sign and send transaction
      await signAndSendTransaction();
    } else if (!wallet) {
      setVisible(true);
    } else {
      connect();
    }
  };

  // Sign and send transaction function
  async function signAndSendTransaction() {
    if (!connected || !signTransaction || !sendTransaction) {
      console.error("Wallet is not connected or does not support signing transactions");
      return;
    }

    // Get serialized transaction for the swap
    const { swapTransaction } = await (
      await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: wallet.publicKey?.toString(),
          wrapAndUnwrapSol: true, // SOL needs to be wrapped into wSOL
        }),
      })
    ).json();

    try {
      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signedTransaction = await wallet.signTransaction(transaction);

      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        'confirmed'
      );

      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      console.error("Error signing or sending the transaction:", error);
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

      {/* Wallet Connect/Swap Button */}
      <Button
        onClick={handleWalletButtonClick}
        className="rounded-full w-full h-[50px] md:h-[60px] bg-[#95d5a6] hover:bg-[#74c69d] text-xl font-semibold focus:outline-none text-[#081c15] transform transition"
      >
        {connected ? "Swap" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default SwapCard;
