
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import ToggleSwitch from "@/components/ToggleSwitch";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";


import Image from "next/image";

const tabs = [
  { name: "Home", icon: "/house.svg", id: "home", href: "/" },
  { name: "Swap", icon: "/swap.svg", id: "swap", href: "/swap" },
  { name: "Docs", icon: "/docs.svg", id: "docs", href: "/" },
];

const Navbar = () => {
  const { wallet, connect, disconnect, connecting, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const handleCustomDialogClose = () => setIsCustomDialogOpen(false);

  const handleWalletButtonClick = () => {
    handleCustomDialogClose();
    setTimeout(() => {
      if (connected) {
        disconnect();
      } else if (!wallet) {
        setVisible(true);
      } else {
        connect();
      }
    }, 300);
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-lg w-full ">
      {/* Tab Navigation */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center font-[200]  ">
        <div className="relative flex items-center justify-around rounded-xl bg-white/10 backdrop-blur-lg backdrop-filter p-1 shadow-lg w-[470px] h-[60px] border-2 border-[#d8f3dc]  font-thin">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="relative flex items-center justify-center flex-1 text-white " 
            >
              <Link href={tab.href} passHref>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 text-[#D8F3DC] px-4 py-2 hover:bg-[#D9D9D9]/10 hover:rounded-lg hover:text-[#D8F3DC] text-md font-light h-[48px] w-[150px]",
                    activeTab === tab.id && "text-[#D8F3DC]"
                  )}
                >
                  {/* Using Next.js Image component for icons */}
                  <Image src={tab.icon} alt={`${tab.name} icon`} width={20} height={20} />
                  <span>{tab.name}</span>
                </Button>
              </Link>
              {/* Framer Motion for Animated Active Tab */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-white/10  "
                  transition={{ type: "spring", stiffness: 300, damping: 23 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the code */}
      <div className="flex ml-auto space-x-4 items-center">
        {theme === 'dark' ? (
          <ToggleSwitch ariaLabel="Toggle light mode" css="hover:text-[#1B4332]" handleClick={toggleTheme}>
            <MoonIcon className="text-[#d8f3dc] text-xl group-hover:text-[#1B4332] h-[22px] w-[22px] " />
          </ToggleSwitch>
        ) : (
          <ToggleSwitch ariaLabel="Toggle dark mode" css="hover:text-[#1B4332]" handleClick={toggleTheme}>
            <SunIcon className=" text-[#d8f3dc] text-xl  h-[22px] w-[22px] group-hover:text-[#1B4332]" />
          </ToggleSwitch>
        )}

        <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-md text-[#1B4332]  m-0 bg-[#d8f3dc] border-2 rounded-xl md:h-[60px] md:w-[150px]  hover:bg-white/10 hover:border-2 hover:border-[#d8f3dc]  hover:text-[#d8f3dc] font-light">
              Connect
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-[300px] md:h-[400px] lg:h-[400px] w-[90vw] sm:w-[425px] bg-white/10 backdrop-blur-sm flex flex-col justify-center items-center">
            <DialogHeader className="text-center">
              <DialogTitle>Connect Wallet / Login with Gmail</DialogTitle>
            </DialogHeader>

            <div className=" mt-4">
              <Button
                onClick={handleWalletButtonClick}
                variant="outline"
                className="w-full md:w-auto md:h-12 flex items-center justify-center"
              >
                <AccountBalanceWalletOutlinedIcon className="text-base mr-1" />
                {connected
                  ? "Disconnect Wallet"
                  : connecting
                  ? "Connecting..."
                  : "Connect Wallet"}
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col items-center gap-4 py-4 w-full">
              <div className="flex justify-between w-full items-center">
                <Label htmlFor="email" className="text-right mr-4">
                  Email
                </Label>
                <Input id="email" type="email" className="flex-grow w-1/3" />
              </div>
            </div>

            <DialogFooter className="flex justify-center">
              <Button type="submit" variant="outline" className="h-10 w-28">
                Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Navbar;
