"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Shield, Lock, Wifi, Globe } from "lucide-react";

export default function CyberPage() {
  const router = useRouter();

  const [activeTopic, setActiveTopic] = useState(null);
  const [badges, setBadges] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [slideIndex, setSlideIndex] = useState(0);

  /* ── SLIDES ── */
  const slides = [
    {
      title: "🔐 Cybersecurity & Sustainability",
      text: "Cybersecurity protects digital systems used in smart cities, healthcare, and energy infrastructure.",
    },
    {
      title: "⚡ Why It Matters",
      text: "Cyber attacks can disrupt essential services like electricity, hospitals, and transportation.",
    },
    {
      title: "🌍 Sustainability Impact",
      text: "Secure systems reduce failures, prevent waste, and ensure reliable sustainable technologies.",
    },
    {
      title: "🏫 At UDST",
      text: "Students learn cybersecurity through labs, simulations, and industry partnerships like Palo Alto and Cisco.",
    },
  ];

  /* ── MOUSE PARALLAX ── */
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ── TOPICS ── */
  const topics = {
    iot: {
      name: "Smart Cities & IoT Security",
      image: "/campus/cyber-lab.png",
      link: "https://manara.qnl.qa/articles/journal_contribution/A_Comparative_Analysis_on_Blockchain_versus_Centralized_Authentication_Architectures_for_IoT-Enabled_Smart_Devices_in_Smart_Cities_A_Comprehensive_Review_Recent_Advances_and_Future_Research_Directions/24717525?file=43822422",
      content: `Modern smart cities rely on connected IoT devices to manage water, waste, and transportation.

Cybersecurity ensures these systems operate reliably and support sustainable resource management.`,
    },
    agriculture: {
      name: "Smart Agriculture & Food Security",
      image: "/campus/cyber-agri.jpg",
      link: "https://wfcc2025.udst.edu.qa/coe-fss",
      content: `Smart agriculture uses sensors and automation.

Cybersecurity protects these systems from disruption and supports sustainable food production.`,
    },
    healthcare: {
      name: "Healthcare Systems",
      image: "/campus/cyber-health.jpg",
      link: "https://wfcc2025.udst.edu.qa/coe-fss",
      content: `Healthcare depends on secure digital infrastructure.

Cybersecurity protects patient data and ensures uninterrupted medical services.`,
    },
    tech: {
      name: "Sustainable Technology",
      image: "/campus/cyber-tech.jpg",
      link: "https://wfcc2025.udst.edu.qa/coe-fss",
      content: `Cybersecurity supports sustainable technologies by ensuring long-term reliability and efficiency.`,
    },
  };

  const totalTopics = Object.keys(topics).length;
  const completed = badges.length;

  /* ── QUIZ ── */
  const quiz = [
    {
      q: "Cybersecurity supports sustainability by:",
      options: ["Protecting systems", "Increasing waste", "Deleting data"],
      a: 0,
    },
    {
      q: "Smart cities rely on:",
      options: ["IoT systems", "Manual processes", "Paper systems"],
      a: 0,
    },
    {
      q: "Cybersecurity prevents:",
      options: ["System failures", "Learning", "Electricity"],
      a: 0,
    },
  ];

  const fireConfetti = () => {
    const duration = 800;
    const end = Date.now() + duration;
    const colors = ["#22d3ee", "#a78bfa", "#facc15", "#4ade80", "#fb7185"];
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const submitQuiz = () => {
    let correct = 0;
    answers.forEach((ans, i) => {
      if (ans === quiz[i].a) correct++;
    });
    setScore(correct);
    if (correct === quiz.length) {
      setShowCelebration(true);
      fireConfetti();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  /* ── ABOUT CARDS ── */
  const aboutCards = [
    {
      icon: <Shield size={24} />,
      color: "cyan",
      title: "Advanced Cyber Range",
      desc: "Real-world attack simulations",
    },
    {
      icon: <Lock size={24} />,
      color: "violet",
      title: "Industry Certifications",
      desc: "Palo Alto & Cisco programs",
    },
    {
      icon: <Globe size={24} />,
      color: "emerald",
      title: "Threat Intelligence",
      desc: "Live threat monitoring",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans overflow-x-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
          <img
            src="/campus/buildings/labs/cybersecurity.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-black/20" />

          <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
            <button
              onClick={() => router.back()}
              className="mb-8 px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all flex items-center gap-2 group hover:text-cyan-400"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
            </button>

            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_20px_rgba(0,212,200,0.4)]">
              Cyber Security{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Lab
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl font-light tracking-wide">
              Digital Resilience{" "}
              <span className="text-cyan-500 mx-2">•</span> Smart Systems{" "}
              <span className="text-violet-500 mx-2">•</span> Sustainability
            </p>

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">
                🔐 Qatar National Vision 2030
              </span>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

          {/* ── ABOUT ── */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-bold uppercase tracking-widest mb-2">
                Discovery
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">About the Lab</h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                The Cyber Security Lab is a state-of-the-art facility designed to train students in
                cybersecurity. It provides hands-on simulations of real-world cyber threats and supports
                certifications like Palo Alto Networks and Cisco.
              </p>
            </div>

            <div className="lg:col-span-5 grid gap-4">
              {aboutCards.map(({ icon, color, title, desc }, idx) => {
                const colorMap = {
                  cyan: "bg-cyan-500/20 text-cyan-400",
                  violet: "bg-violet-500/20 text-violet-400",
                  emerald: "bg-emerald-500/20 text-emerald-400",
                };
                return (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${colorMap[color]} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{title}</h3>
                      <p className="text-sm text-slate-400">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SLIDES ── */}
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-cyan-400 to-violet-500 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  📡
                </div>
                <h2 className="text-3xl font-bold text-white">Sustainability Awareness</h2>
              </div>

              {/* Slide card */}
              <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-2xl p-8 min-h-[160px] flex flex-col justify-center text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {slides[slideIndex].title}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  {slides[slideIndex].text}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setSlideIndex((p) => Math.max(p - 1, 0))}
                  disabled={slideIndex === 0}
                  className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === slideIndex
                          ? "bg-cyan-400 w-5 shadow-[0_0_8px_rgba(0,212,200,0.8)]"
                          : "bg-slate-700 hover:bg-slate-500"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setSlideIndex((p) => Math.min(p + 1, slides.length - 1))}
                  disabled={slideIndex === slides.length - 1}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>

              {/* Slide counter */}
              <p className="text-center text-slate-500 text-sm mt-4">
                {slideIndex + 1} / {slides.length}
              </p>
            </div>
          </div>

          {/* ── TOPICS ── */}
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Applications of Cybersecurity
                </h2>
                <p className="text-slate-400">Click on any topic to learn more and earn your badges.</p>
              </div>

              <div className="flex flex-col items-end gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm">
                <div className="text-sm font-medium text-cyan-400">
                  {completed} / {totalTopics} Explored
                </div>
                <div className="flex gap-2">
                  {Object.keys(topics).map((key, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        badges.includes(key)
                          ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,212,200,0.8)]"
                          : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(topics).map(([key, topic]) => {
                const isCompleted = badges.includes(key);
                return (
                  <div
                    key={key}
                    onClick={() => setActiveTopic(key)}
                    className="group relative cursor-pointer bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,212,200,0.15)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-80 z-10"></div>
                    <img
                      src={topic.image}
                      className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                      <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">
                          {topic.name}
                        </h3>
                        {isCompleted && (
                          <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded-full backdrop-blur-md border border-cyan-500/30 shrink-0 shadow-[0_0_10px_rgba(0,212,200,0.3)] animate-pulse">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── QUIZ ── */}
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-cyan-400 to-violet-500 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  🧠
                </div>
                <h2 className="text-3xl font-bold text-white">Knowledge Check</h2>
              </div>

              <div className="space-y-8">
                {quiz.map((q, i) => (
                  <div key={i} className="bg-[#0a0a0f]/50 border border-white/5 rounded-2xl p-6">
                    <p className="text-lg font-medium text-white mb-4 flex gap-3">
                      <span className="text-cyan-400 font-bold">{i + 1}.</span> {q.q}
                    </p>
                    <div className="grid gap-3">
                      {q.options.map((opt, j) => {
                        const isSelected = answers[i] === j;
                        return (
                          <div
                            key={j}
                            onClick={() => {
                              const newAns = [...answers];
                              newAns[i] = j;
                              setAnswers(newAns);
                            }}
                            className={`flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer border transition-all ${
                              isSelected
                                ? "bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_10px_rgba(0,212,200,0.3)]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-cyan-400" : "border-slate-500"
                              }`}
                            >
                              <div
                                className={`w-2.5 h-2.5 rounded-full bg-cyan-400 transition-transform ${
                                  isSelected ? "scale-100" : "scale-0"
                                }`}
                              ></div>
                            </div>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
                <button
                  onClick={submitQuiz}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,212,200,0.3)] hover:shadow-[0_0_30px_rgba(0,212,200,0.5)] transition-all hover:-translate-y-1"
                >
                  Submit Answers
                </button>

                {score !== null && (
                  <div className="flex-1">
                    <div className="flex items-center gap-4 bg-[#0a0a0f]/50 border border-white/10 p-4 rounded-xl">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                        {score}/{quiz.length}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-300 font-medium text-sm">Score achieved</p>
                        {completed === totalTopics && score === quiz.length ? (
                          <div className="text-emerald-400 font-bold text-sm mt-1">
                            🎉 Security Champion Unlocked!
                          </div>
                        ) : (
                          <p className="text-slate-500 text-xs mt-1">
                            {completed !== totalTopics
                              ? "Explore all topics to unlock the final badge."
                              : "Get a perfect score to become a champion."}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── MODAL ── */}
        {activeTopic && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setActiveTopic(null)}
            ></div>

            <div className="relative bg-[#0a0a0f]/90 max-w-2xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]">
              <div className="relative h-64 shrink-0">
                <img
                  src={topics[activeTopic].image}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent"></div>
                <button
                  onClick={() => setActiveTopic(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/10"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  {topics[activeTopic].name}
                </h2>
                <div className="space-y-4 text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {topics[activeTopic].content}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href={topics[activeTopic].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                  >
                    <span>Learn More</span>
                    <span className="text-xl">↗</span>
                  </a>

                  <button
                    onClick={() => {
                      if (!badges.includes(activeTopic)) setBadges([...badges, activeTopic]);
                      setActiveTopic(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
                  >
                    Mark as Read & Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── LOCK MASCOT ── */}
        <div className="hidden md:block fixed bottom-10 right-2 z-[100] pointer-events-none">
          <div
            style={{
              transform: `translate(${mouse.x}px, ${mouse.y}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="robot-container animate-float drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <div className="robot-glow" />
              <img
                src="/campus/lock.png"
                style={{ width: "80%", height: "75%", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CELEBRATION OVERLAY ── */}
      {showCelebration && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur"></div>
          <div className="relative text-center animate-pop">
            <h1 className="text-5xl font-extrabold text-white mb-4">🎉 Perfect Score!</h1>
            <p className="text-cyan-400 text-lg">You nailed it 🔥</p>
          </div>
          <div className="confetti-container">
            {Array.from({ length: 25 }).map((_, i) => {
              const angle = Math.random() * 2 * Math.PI;
              const distance = 150 + Math.random() * 150;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              return (
                <span
                  key={i}
                  className="confetti"
                  style={{ "--x": `${x}px`, "--y": `${y}px` }}
                />
              );
            })}
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}