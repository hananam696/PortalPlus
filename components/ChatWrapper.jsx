

"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import ChatWidget from "./ChatWidget";

export default function ChatWrapper({ children }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Navbar onOpenChat={() => setChatOpen(true)} />
      {children}
      <ChatWidget
        externalOpen={chatOpen}
        onOpenChange={(val) => setChatOpen(val)}
      />
    </>
  );
}