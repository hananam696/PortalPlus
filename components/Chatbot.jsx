"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m the PortalPlus AI Assistant 🌱 How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "That’s a great question! You can explore sustainability tips, rent books, or find eco spots using the dashboard.",
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 z-50"
      >
        <MessageCircle />
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3 rounded-t-2xl">
            <span className="font-semibold">PortalPlus AI</span>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-xl max-w-[75%]
                  ${
                    msg.sender === "bot"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-green-600 text-white ml-auto"
                  }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
