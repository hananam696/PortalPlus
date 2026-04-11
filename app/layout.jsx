"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarPages = ["/login", "/signup"];
  const showNavbar = !hideNavbarPages.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {showNavbar && <Navbar />}
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}