import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppWalletProvider from "@/components/AppWalletProvider";


export const metadata = {
  title: "feeflex",
  description: "",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-unbounded">
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
