import "./globals.css";

// At the top with your other imports
import ChatWidget from "@/components/ChatWidget";
import { Inter, Syne } from "next/font/google";

// At the bottom of your return, just before </body>
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}