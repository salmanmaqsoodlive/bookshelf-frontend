"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isShowNavbar = () => {
    if (pathname === "/" || pathname === "/signin" || pathname === "/signup") {
      return false;
    }

    return true;
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {isShowNavbar() && <Navbar />}
        {children}

        <ToastContainer />
      </body>
    </html>
  );
}
