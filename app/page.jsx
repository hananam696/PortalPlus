"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, Home, Map, RotateCcw, Send, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";

// ─────────────────────────────────────────────────────────────
// SAGE CHATBOT — Constants & Helpers
// ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: "💡 Daily Tip",        mode: "tip" },
  { label: "🧮 My Footprint",     mode: "footprint" },
  { label: "🌍 Quiz Me",          mode: "quiz" },
  { label: "♻️ Campus Life",      mode: "campus" },
  { label: "🌊 Water Saving",     mode: "water" },
  { label: "⚡ Energy Tips",      mode: "energy" },
  { label: "🛍️ Ethical Shopping", mode: "shopping" },
  { label: "🚲 Green Commute",    mode: "commute" },
];

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Hey! I'm Sage 🌿 — your sustainability guide on PortalPlus.\n\nI can give you daily eco tips, estimate your carbon footprint, quiz you on green topics, and answer any sustainability questions.\n\nPick a quick action above or ask me anything!",
  timestamp: Date.now(),
};

const FALLBACK_VARIANTS = [
  "I'm not sure I understood — try asking about eco tips, your carbon footprint, or campus sustainability 🌿",
  "Hmm, that one's outside my green zone! Want an eco tip or a quiz instead?",
  "I'm best at sustainability topics — what would you like to explore? Tips, footprint, or quiz?",
];

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function formatText(text) {
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];

  const flushList = (key) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="space-y-1 my-1">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) { flushList(i); return; }
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      listItems.push(
        <li key={i} className="flex gap-2 text-[13px] leading-relaxed">
          <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
          <span>{renderInline(trimmed.slice(2))}</span>
        </li>
      );
    } else {
      flushList(i);
      elements.push(
        <p key={i} className="text-[13px] leading-relaxed mb-1">
          {renderInline(trimmed)}
        </p>
      );
    }
  });
  flushList("end");
  return elements;
}

// ─────────────────────────────────────────────────────────────
// SAGE SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs flex-shrink-0">
        🌿
      </div>
      <div className="bg-white border border-emerald-100 rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-sm">
        <div className="flex gap-1 items-center h-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2 mb-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs flex-shrink-0 self-end">
          🌿
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2.5 shadow-sm ${
          isUser
            ? "bg-emerald-600 text-white rounded-br-sm"
            : "bg-white border border-emerald-100 text-gray-800 rounded-bl-sm"
        }`}
      >
        {isUser ? (
          <p className="text-[13px] leading-relaxed">{msg.text}</p>
        ) : (
          <div>{formatText(msg.text)}</div>
        )}
        <p className={`text-[10px] mt-1 ${isUser ? "text-emerald-100 text-right" : "text-gray-400"}`}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SAGE FLOATING CHATBOT WIDGET
// ─────────────────────────────────────────────────────────────

function SageChatbot() {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState([WELCOME_MESSAGE]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [unread, setUnread]       = useState(0);
  const bottomRef                 = useRef(null);
  const inputRef                  = useRef(null);
  const fallbackIdxRef            = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnread(0);
    }
  }, [isOpen]);

  const buildHistory = useCallback((msgs) =>
    msgs
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.text })),
  []);

  const sendMessage = useCallback(async ({ text, mode }) => {
    if (loading) return;
    if (!text?.trim() && !mode) return;

    const userMsg = text?.trim();
    const userEntry = userMsg
      ? { id: genId(), role: "user", text: userMsg, timestamp: Date.now() }
      : null;

    setMessages((prev) => (userEntry ? [...prev, userEntry] : prev));
    setInput("");
    setLoading(true);

    try {
      const history = buildHistory(userEntry ? [...messages, userEntry] : messages);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg || undefined,
          history,
          mode: mode || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "API error");

      const botMsg = { id: genId(), role: "assistant", text: data.answer, timestamp: Date.now() };
      setMessages((prev) => [...prev, botMsg]);
      setFailCount(0);
      if (!isOpen) setUnread((u) => u + 1);

    } catch (err) {
      const fallback = FALLBACK_VARIANTS[fallbackIdxRef.current % FALLBACK_VARIANTS.length];
      fallbackIdxRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: genId(),
          role: "assistant",
          text: failCount >= 2
            ? "Looks like we're stuck! Try one of the quick actions above to get back on track 🌿"
            : fallback,
          timestamp: Date.now(),
        },
      ]);
      setFailCount((c) => c + 1);
    } finally {
      setLoading(false);
      if (isOpen) inputRef.current?.focus();
    }
  }, [loading, messages, buildHistory, failCount, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ text: input });
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setFailCount(0);
    fallbackIdxRef.current = 0;
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close Sage chat" : "Open Sage sustainability chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xl"
            >
              🌿
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[400px] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border border-emerald-100"
            style={{ maxHeight: "580px" }}
            aria-label="Sage sustainability chat"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                  🌿
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Sage</p>
                  <p className="text-emerald-200 text-[11px]">Sustainability Guide · PortalPlus</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            <div className="bg-emerald-50 px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-hide border-b border-emerald-100">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.mode}
                  onClick={() => sendMessage({ mode: action.mode })}
                  disabled={loading}
                  className="text-[11px] whitespace-nowrap bg-white border border-emerald-200 text-emerald-700 rounded-full px-2.5 py-1 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-150 disabled:opacity-50 flex-shrink-0"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 bg-gray-50/80"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-emerald-100 bg-white p-3 flex gap-2 items-center flex-shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Sage anything green..."
                disabled={loading}
                maxLength={500}
                autoComplete="off"
                className="flex-1 text-[13px] bg-gray-50 border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all disabled:opacity-50 placeholder-gray-400 text-gray-800"
                aria-label="Type your message to Sage"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>

            <div className="bg-white px-4 py-1.5 border-t border-gray-100 text-center flex-shrink-0">
              <p className="text-[10px] text-gray-400">Powered by PortalPlus 🌿</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// HOMEPAGE
// ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative px-2 sm:px-8 py-4 pb-26">

        {/* Hero */}
        <motion.section
          className="max-w-5xl mx-auto text-center space-y-8 pt-12 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full scale-150" />
            <Image
              src="/logo.png"
              width={170}
              height={150}
              alt="PortalPlus Logo"
              className="mx-auto relative"
            />
          </motion.div>

          {/* About Us link below logo */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center -mt-4"
          >
            <p className="text-sm text-gray-500">
              Want to know more about us?{" "}
              <Link href="/about" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 font-medium transition-colors">
                Visit our About Us page
              </Link>
            </p>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-emerald-900 to-gray-900">
                Portal
              </span>
              <span className="text-emerald-600">Plus</span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mb-16 text-center"
            >
              <p className="text-sm text-gray-500 max-w-xl mx-auto">
                Test your knowledge through interactive quizzes
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Search */}
        <motion.div
          className="max-w-2xl mx-auto mt-4 mb-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SearchBar />
        </motion.div>

        {/* Feature Cards */}
        <motion.section
          className="max-w-6xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* ── LEARN MODULE CARD (with progress removed) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* "Start here" nudge */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Start here — your first step
              </span>
              <div className="flex-1 h-px bg-emerald-100" />
            </div>

            <Link href="/learn">
              <div className="group relative bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border-2 border-emerald-300 hover:border-emerald-400 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:shadow-lg shadow-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                      <BookOpen size={20} className="text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-base font-semibold text-gray-900">
                          Sustainability in IT — Learning Module
                        </h3>
                        <span className="px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full">
                          New
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        10 lessons · 10 quiz questions · ~15 min
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowRight
                      className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all"
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <CleanCard href="/rental-hub"   Icon={Home}     title="Rental Hub"    description="Share and borrow campus resources" />
            <CleanCard href="/campus-map"   Icon={Map}      title="Campus Map"    description="Navigate with interactive maps" />
            <CleanCard href="/certificates" Icon={FileText} title="Certificates"  description="Manage your achievements" />
          </div>
        </motion.section>

      </div>

      <SageChatbot />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

function CleanCard({ href, Icon, title, description }) {
  return (
    <Link href={href}>
      <div className="group h-full bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-7 transition-all duration-300 cursor-pointer hover:shadow-lg shadow-sm">
        <div className="mb-5">
          <Icon size={24} className="text-gray-700 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
          <ArrowRight size={16} strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}