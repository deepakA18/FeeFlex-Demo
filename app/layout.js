import { Inter} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppWalletProvider from "@/components/AppWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "feeflex",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <AppWalletProvider>
            <Navbar />
            {children}
            <Footer />
          </AppWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
