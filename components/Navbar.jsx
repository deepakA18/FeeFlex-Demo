"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const components = [
  { title: "Tokens", href: "/" },
  { title: "Pools", href: "/docs/primitives/hover-card" },
  { title: "Transactions", href: "/docs/primitives/progress" },
  { title: "NFTs", href: "/docs/primitives/scroll-area" }
];

const pools = [
  { title: "View position", href: "/" },
  { title: "Create position", href: "/" }
];

const Navbar = () => {
  const { wallet, connect, disconnect, connecting, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);

  // Handles the custom dialog open/close state
  const handleCustomDialogClose = () => setIsCustomDialogOpen(false);

  // Function to handle the wallet connection
  const handleWalletButtonClick = useCallback(async () => {
    handleCustomDialogClose(); // Close custom dialog

    // Open prebuilt Solana wallet modal after custom dialog closes
    setTimeout(() => {
      if (connected) {
        disconnect();
      } else if (!wallet) {
        setVisible(true); // Opens the Solana wallet modal
      } else {
        connect();
      }
    }, 300); // Delay for a smoother transition
  }, [connected, disconnect, wallet, setVisible, connect]);

  return (
    <header className="flex flex-col md:flex-row items-center text-white p-4 justify-between">
      {/* Navigation Menu */}
      <nav className="flex-col items-center md:flex-row md:flex w-full md:w-auto md:items-center mt-4 md:mt-0 space-x-6">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col md:flex-row items-center md:items-center">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white/10 backdrop-blur-lg backdrop-filter bg-opacity-10">
                <ul className="grid w-[150px] gap-3 p-4 md:w-[150px] md:grid-cols-1 lg:w-[150px]">
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Pools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[160px] gap-2 p-2 md:w-[150px] md:grid-cols-1 lg:w-[160px]">
                  {pools.map((pool) => (
                    <ListItem key={pool.title} title={pool.title} href={pool.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/swap" passHref>
                <span className={navigationMenuTriggerStyle()}>Swap</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search for tokens..."
          className="w-full pl-10 border placeholder:text-white rounded-lg placeholder:font-extralight focus-visible:outline-transparent focus-visible:ring-0"
        />
      </div>

      {/* Custom Dialog */}
      <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4 md:mt-0 md:ml-5 md:w-40 md:h-12 text-md">
            Connect
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[300px] md:h-[400px] lg:h-[400px] w-[90vw] sm:w-[425px] bg-white/10 backdrop-blur-sm flex flex-col justify-center items-center">
          <DialogHeader className="text-center">
            <DialogTitle>Connect Wallet / Login with Gmail</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center items-center mt-4">
            <Button
              onClick={handleWalletButtonClick}
              variant="outline"
              className="w-full md:w-auto md:h-12 flex items-center justify-center"
            >
              <AccountBalanceWalletOutlinedIcon className="text-base mr-1" />
              {connected ? "Disconnect Wallet" : connecting ? "Connecting..." : "Connect Wallet"}
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
            <Button type="submit" variant="outline" className="h-10 w-28">Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

const ListItem = React.forwardRef(function ListItem(
  { className, title, children, ...props },
  ref
) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  );
});

export default Navbar;
