"use client";

// ─────────────────────────────────────────────────────────────
// ChatWidget.jsx — Master-level sustainability chatbot for PortalPlus
// ─────────────────────────────────────────────────────────────

import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Loader2, RefreshCw, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";



// ── QUICK ACTIONS ─────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: "📚 My Progress", mode: null, text: "What levels have I completed and what's my score?" },
  { label: "💡 Eco Tip", mode: "tip", text: "Give me today's eco tip!" },
  { label: "🧮 Footprint", mode: "footprint", text: "Help me estimate my carbon footprint." },
  { label: "🌍 Quiz Me", mode: "quiz", text: "Quiz me on sustainability!" },
  { label: "♻️ Rental Hub", mode: null, text: "How does borrowing items instead of buying help the environment?" },
  { label: "🏆 Eco Points", mode: null, text: "How do I earn more eco points on PortalPlus?" },
  { label: "🚀 Next Level", mode: null, text: "What topics are covered in my next level?" },
];

// ── FOLLOW-UP CHIPS per response type ────────────────────────
const FOLLOW_UPS = {
  tip: ["Give me another tip 💡", "Why does this matter? 🌍", "What's the impact? 📊"],
  footprint: ["How do I reduce this? 🌱", "Compare to average 📊", "Biggest impact area? 🔍"],
  quiz: ["Quiz me again! 🎯", "Explain that answer 📚", "Harder question 🧠"],
  general: ["Tell me more 📖", "Give me a practical tip 💡", "Campus angle? 🎓"],
};

// ── WELCOME MESSAGE ───────────────────────────────────────────
// Replace the static WELCOME_MSG with this function
function getWelcomeMessage() {
  if (typeof window === "undefined") return "Hey! I'm Sage 🌿 — your sustainability guide on PortalPlus. Ask me anything!";

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const userPrefix = storedUser?.id ? `u_${storedUser.id}_` : "";
  const savedScores = JSON.parse(localStorage.getItem(`${userPrefix}pp_level_scores`) || "null");
  const completedCount = savedScores ? savedScores.filter(s => s != null).length : 0;
  const firstName = storedUser?.firstName || null;

  const name = firstName ? `Hey ${firstName}` : "Hey";

  if (completedCount === 0) {
    return `${name}! I'm Sage 🌿 — your sustainability guide on PortalPlus.\n\nYou haven't started the Learn module yet — it covers 5 levels of sustainability in IT, from digital footprints to green engineering. Want to know what's in it, or just ask me anything green?`;
  }

  if (completedCount === 5) {
    return `${name}, you've completed all 5 levels! 🚀 That's the full Sustainability in IT programme.\n\nWant to test yourself with a quiz, explore a topic deeper, or estimate your real carbon footprint?`;
  }

  const nextLevel = completedCount + 1;
  const levelNames = ["Planet First", "Digital Footprint", "Sustainable Systems", "Green Engineer", "Impact Maker"];

  return `${name}! I'm Sage 🌿 — you're on Level ${nextLevel}: **${levelNames[completedCount]}** in the Learn module.\n\nAsk me anything about the topics, want a hint, or ready for a quick quiz to prepare?`;
}

// ── DETECT RESPONSE TYPE ─────────────────────────────────────
function detectResponseType(text) {
  const t = text.toLowerCase();
  if (t.includes("tip") || t.includes("try ") || t.includes("switch to")) return "tip";
  if (t.includes("co₂") || t.includes("footprint") || t.includes("kg")) return "footprint";
  if (t.includes("question") || t.includes("correct answer") || t.includes("option")) return "quiz";
  return "general";
}

// ── FORMAT MESSAGE ────────────────────────────────────────────
function formatMessage(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/^[-•] (.+)$/gm, "<li>$1</li>");
  text = text.replace(/(<li>[\s\S]*?<\/li>)+/, (m) => `<ul class="list-disc list-inside space-y-1 mt-2 mb-1">${m}</ul>`);
  text = text.replace(/\n/g, "<br/>");
  return text;
}

// ── GIBBERISH DETECTION ───────────────────────────────────────
// WITH
function isGibberish(text) {
  const t = text.trim().toLowerCase();
  const greetings = ["hi", "hey", "hello", "helo", "hiya", "yo", "sup", "ok", "okay"];
  if (greetings.includes(t)) return false;
  if (t.length < 2) return true;
  const words = t.split(/\s+/);
  const gibWords = words.filter(w => {
    if (w.length <= 3) return false;
    const hasVowel = /[aeiou]/i.test(w);
    const hasRepeats = /(.)\1{3,}/.test(w);
    return !hasVowel || hasRepeats;
  });
  return gibWords.length / words.length >= 0.7;
}

// ── VARIED REDIRECTS ──────────────────────────────────────────
const REDIRECTS = [
  "I'm all about sustainability 🌿 — try asking me for an eco tip or a campus green hack!",
  "That's outside my green zone! 🍃 Ask me about your carbon footprint or eco-friendly campus life.",
  "Oops, I only speak sustainability 🌱 — want a daily tip or a quick quiz instead?",
  "I'm Sage, your eco guide — not quite my area! Want to explore your carbon footprint? 🌍",
  "Green topics only for me! 🌿 Try: 'Quiz me' or 'Give me a campus tip'.",
];
let redirectIdx = 0;
function getRedirect() {
  return REDIRECTS[redirectIdx++ % REDIRECTS.length];
}

// ─────────────────────────────────────────────────────────────
export default function ChatWidget({ onOpenChange, externalOpen }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
const [messages, setMessages] = useState(() => [{
  role: "assistant",
  content: getWelcomeMessage(),
  followUps: [],
  id: "welcome",
}]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if (externalOpen) setOpen(true); }, [externalOpen]);
  useEffect(() => { onOpenChange?.(open); }, [open, onOpenChange]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const focusInput = useCallback(() => {
    setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  useEffect(() => { if (open) focusInput(); }, [open, focusInput]);
  useEffect(() => { if (!loading && open) focusInput(); }, [loading, open, focusInput]);

  const buildHistory = () =>
    messages
      .filter(m => m.id !== "welcome")
      .map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));

async function sendMessage(text, mode = null) {
  const trimmed = text.trim();
  if (!trimmed || loading) return;

  if (isGibberish(trimmed)) {
    setMessages(prev => [
      ...prev,
      { role: "user", content: trimmed, id: Date.now(), followUps: [] },
      { role: "assistant", content: "Didn't quite catch that! Ask me something green 🌿", id: Date.now() + 1, followUps: [] },
    ]);
    setInput("");
    focusInput();
    return;
  }

  setMessages(prev => [...prev, { role: "user", content: trimmed, id: Date.now(), followUps: [] }]);
  setInput("");
  setLoading(true);

  try {

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
const userPrefix = storedUser?.id ? `u_${storedUser.id}_` : "";
const savedScores = JSON.parse(localStorage.getItem(`${userPrefix}pp_level_scores`) || "null");
const unlockedUpTo = parseInt(localStorage.getItem(`${userPrefix}pp_unlocked_up_to`) || "0");

// Rental activity
const allRentals = JSON.parse(localStorage.getItem("rental_requests") || "[]");
const myRentals = allRentals.filter(r => r.renterEmail === storedUser?.email);

// Eco points (recalculate inline)
let ecoPoints = 0;
for (let i = 1; i <= 5; i++) {
  const passed = localStorage.getItem(`${userPrefix}pp_l${i}_passed`) === "true";
  const score = parseInt(localStorage.getItem(`${userPrefix}pp_l${i}_score`) || "0");
  if (passed) { ecoPoints += 100; if (score >= 9) ecoPoints += 50; if (score === 10) ecoPoints += 100; }
}
const allPassed = Array.from({length:5},(_,i) => localStorage.getItem(`${userPrefix}pp_l${i+1}_passed`) === "true").every(Boolean);
if (allPassed) ecoPoints += 200;

// Tier
const tiers = [
  {name:"Seedling",min:0},{name:"Sapling",min:100},{name:"Forest",min:300},
  {name:"Canopy",min:600},{name:"Guardian",min:1000}
];
const tierName = [...tiers].reverse().find(t => ecoPoints >= t.min)?.name || "Seedling";

const userContext = {
  levelsCompleted: savedScores ? savedScores.filter(s => s != null).length : 0,
  levelScores: savedScores ? savedScores.map((s) => s ? Math.round((s.filter(Boolean).length / 10) * 100) : null) : [],
  unlockedUpTo,
  userName: storedUser?.firstName || null,
  ecoPoints,
  tierName,
  rentalsCount: myRentals.length,
  currentPage: typeof window !== "undefined" ? window.location.pathname : "/",
};

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed, history: buildHistory(), mode, userContext }),
    });

    const data = await res.json();

    if (!res.ok) {
      const err =
        res.status === 401 ? "⚠️ API key issue — please contact the admin."
          : res.status === 429 ? "⚠️ Too many requests! Give me a moment and try again."
            : res.status >= 500 ? "⚠️ Server hiccup — try again in a few seconds."
              : `⚠️ Something went wrong (${res.status}).`;
      throw new Error(err);
    }

    const type = mode || detectResponseType(data.answer);
    const followUps = FOLLOW_UPS[type] || FOLLOW_UPS.general;

    setMessages(prev => [...prev, {
      role: "assistant", content: data.answer, followUps, id: Date.now(),
    }]);
  } catch (err) {
    setMessages(prev => [...prev, {
      role: "assistant", content: err.message, followUps: [], id: Date.now(), isError: true,
    }]);
  } finally {
    setLoading(false);
  }
}

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

// WITH
function resetChat() {
  setMessages([{
    role: "assistant",
    content: getWelcomeMessage(),
    followUps: [],
    id: "welcome",
  }]);
    setInput("");
    focusInput();
  }

  const lastBot = [...messages].reverse().find(m => m.role === "assistant");
  const followUps = lastBot?.followUps || [];

  return (
    <>
      {/* ── PANEL ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 w-[360px] sm:w-[400px] flex flex-col"
            style={{ maxHeight: "calc(100vh - 130px)" }}
          >
            <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl border border-emerald-100 bg-white">

              {/* HEADER */}
              <div className="flex-shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600">
                <div className="flex items-center justify-between px-4 pt-3 pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Leaf size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-none">Sage</p>
                      <p className="text-emerald-100 text-xs mt-0.5">Sustainability Guide</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={resetChat} className="flex items-center gap-1 text-white/70 hover:text-white text-xs px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                      <RefreshCw size={11} /><span>Reset</span>
                    </button>
                    <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Quick actions — always visible, horizontally scrollable */}
                <div className="flex gap-2 px-3 pb-3 overflow-x-auto scrollbar-none">
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      onClick={() => sendMessage(a.text, a.mode)}
                      disabled={loading}
                      className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 hover:border-white/40 transition-all font-medium disabled:opacity-40 whitespace-nowrap"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50 min-h-0">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 shadow-sm">
                        <Leaf size={11} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                          ? "bg-emerald-600 text-white rounded-br-sm"
                          : msg.isError
                            ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-sm"
                            : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                        }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  </motion.div>
                ))}

                {/* Typing dots */}
                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Leaf size={11} className="text-white" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* FOLLOW-UPS + INPUT */}
              <div className="flex-shrink-0 bg-white border-t border-gray-100">
                <AnimatePresence>
                  {followUps.length > 0 && !loading && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-2 px-3 pt-2.5 pb-1 overflow-x-auto scrollbar-none"
                    >
                      {followUps.map(fu => (
                        <button
                          key={fu}
                          onClick={() => sendMessage(fu)}
                          className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-all font-medium whitespace-nowrap"
                        >
                          {fu}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="px-3 py-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100 transition-all px-3 py-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Sage anything green..."
                      disabled={loading}
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white disabled:opacity-40 hover:bg-emerald-700 active:scale-95 transition-all flex-shrink-0"
                    >
                      {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-gray-400 mt-1.5">Powered by PortalPlus 🌿</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BUBBLE ───────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(p => !p)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open Sage"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.span>
            : <motion.span key="leaf" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Leaf size={22} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {!open && <span className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />}
    </>
  );
}
