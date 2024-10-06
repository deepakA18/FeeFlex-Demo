"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import ToggleSwitch from "@/components/ToggleSwitch";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useWalletModal, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";


import Image from "next/image";

const tabs = [
  { name: "Home", icon: "/house.svg", id: "home", href: "/" },
  { name: "Swap", icon: "/swap.svg", id: "swap", href: "/swap" },
  { name: "Docs", icon: "/docs.svg", id: "docs", href: "/" },
];

const Navbar = () => {
  const { wallet, connect, disconnect, connecting, connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [activeTab, setActiveTab] = useState("home");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleWalletButtonClick = () => {
    if (connected) {
      disconnect();
    } else if (!wallet) {
      setVisible(true); // Opens the wallet connection modal
    } else {
      connect();
    }
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-lg w-full">
      {/* Tab Navigation */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center">
        <div className="relative flex items-center justify-around rounded-xl bg-white/10 backdrop-blur-lg backdrop-filter p-1 shadow-lg w-[470px] h-[60px] border-2 border-[#d8f3dc] font-thin">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative flex items-center justify-center flex-1">
              <Link href={tab.href} passHref>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 text-[#D8F3DC] px-4 py-2 hover:bg-[#D9D9D9]/10 hover:rounded-lg hover:text-[#D8F3DC] text-md font-light h-[48px] w-[150px]",
                    activeTab === tab.id && "text-[#D8F3DC]"
                  )}
                >
                  <Image src={tab.icon} alt={`${tab.name} icon`} width={18} height={18} />
                  <span>{tab.name}</span>
                </Button>
              </Link>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-white/10"
                  transition={{ type: "spring", stiffness: 300, damping: 23 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Theme Toggle and Connect Button */}
      <div className="flex ml-auto items-center">
        {theme === "dark" ? (
          <ToggleSwitch ariaLabel="Toggle light mode" css="hover:text-[#1B4332]" handleClick={toggleTheme}>
            <MoonIcon className="text-[#d8f3dc] text-xl group-hover:text-[#1B4332] h-[22px] w-[22px]" />
          </ToggleSwitch>
        ) : (
          <ToggleSwitch ariaLabel="Toggle dark mode" css="hover:text-[#1B4332]" handleClick={toggleTheme}>
            <SunIcon className="text-[#d8f3dc] text-xl h-[18px] w-[18px] group-hover:text-[#1B4332]" />
          </ToggleSwitch>
        )}

        {/* Connect Button */}
        {/* <Button
          variant="outline"
          onClick={handleWalletButtonClick}
          className={cn(
            "p-4 text-md text-[#1B4332] bg-[#d8f3dc] border-2 rounded-xl md:h-[60px] md:w-[150px] font-normal",
            connected && "bg-transparent border-none" // CSS change when wallet is connected
          )}
        >
          <AccountBalanceWalletOutlinedIcon className="text-lg mr-1" />
          {connected
            ? publicKey.toBase58().slice(0, 6) + "..." + publicKey.toBase58().slice(-4) // Show shortened public key
            : connecting
            ? "Connecting..."
            : "Connect"}
        </Button> */}

<WalletMultiButton
  style={{
    padding: "1rem",
    fontSize: "1rem",
    color: "#1B4332",
    backgroundColor: "#d8f3dc",
    border: "2px solid",
    borderRadius: "0.75rem",
    fontWeight: "normal",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",  // Default height
    width: "150px",  // Default width
    // Add responsive design with media queries
    '@media (max-width: 768px)': {
      height: "50px",  // Adjust height for smaller screens
      width: "130px",  // Adjust width for smaller screens
      fontSize: "0.9rem", // Adjust font size for smaller screens
    },
    '@media (max-width: 480px)': {
      height: "40px",  // Adjust height for very small screens
      width: "110px",  // Adjust width for very small screens
      fontSize: "0.8rem", // Adjust font size for very small screens
    },
  }}
/>
      
      </div>
    </header>
  );
};

export default Navbar;