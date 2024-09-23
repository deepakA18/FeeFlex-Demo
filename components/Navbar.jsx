"use client";

import React, { useState } from "react";
import Link from "next/link";
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

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

// Define tab links
const tabs = [
  { name: "Home", icon: "🏠", id: "home", href: "/" },
  { name: "Swap", icon: "↔", id: "swap", href: "/swap" },
  { name: "Docs", icon: "📄", id: "docs", href: "/docs" },
];

const Navbar = () => {
  const { wallet, connect, disconnect, connecting, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // For active tab highlight

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab state
  };

  // Handles the custom dialog open/close state
  const handleCustomDialogClose = () => setIsCustomDialogOpen(false);

  // Function to handle wallet connection
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
    <header className="flex flex-col md:flex-row items-center justify-between p-4  shadow-lg w-full">
      {/* Tab Navigation */}
      <div className="relative flex items-center justify-around rounded-full bg-white/10 backdrop-blur-lg backdrop-filter p-1 shadow-lg w-full max-w-md">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="relative flex items-center justify-center flex-1 text-white"
          >
            <Link href={tab.href} passHref>
            <Button
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-2 text-white px-4 py-2",
                activeTab === tab.id && "text-white"
              )}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.name}</span>
            </Button>
            </Link>
            {/* Framer Motion for Animated Active Tab */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-white/20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Connect Wallet Button */}
      <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 md:mt-0 md:ml-5">
            {connected ? "Disconnect Wallet" : "Connect"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[300px] bg-white/10 backdrop-blur-sm">
          <DialogHeader className="text-center">
            <DialogTitle>Connect Wallet / Login</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center mt-4">
            <Button
              onClick={handleWalletButtonClick}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <AccountBalanceWalletOutlinedIcon className="mr-1" />
              {connected ? "Disconnect Wallet" : connecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center">
            <Label htmlFor="email" className="mr-4">
              Email
            </Label>
            <Input id="email" type="email" />
          </div>
          <DialogFooter className="flex justify-center">
            <Button variant="outline">Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
