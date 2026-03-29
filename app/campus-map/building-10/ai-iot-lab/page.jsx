"use client";

import confetti from "canvas-confetti";
import { Cpu, Leaf, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AIoTLabPage() {

  const router = useRouter();

  const [activeProject, setActiveProject] = useState(null);
  const [badges, setBadges] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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

  // ── SLIDES (all facts verified from UDST official sources) ──
  const slides = [
    {
      title: "🌾 AI & IoT at AgriteQ 2026",
      text: "UDST showcased smart irrigation systems, AI and IoT-enabled agricultural prototypes, and data-driven tools at AgriteQ 2026 — all focused on water efficiency, climate resilience, and food security in Qatar.",
    },
    {
      title: "☀️ Qatar's First Smart Greenhouse",
      text: "UDST inaugurated Qatar's first smart sustainable greenhouse, powered by solar energy and equipped with IoT sensors to regulate temperature, humidity, irrigation, and soil conditions automatically.",
    },
    {
      title: "♻️ Smart Waste at UDST Expo",
      text: "UDST showcased smart waste and sustainability innovations at its EXPO 2023 Doha pavilion, attracting over 20,000 visitors and demonstrating AI-driven solutions for a circular economy.",
    },
    {
      title: "🎓 Applied Research for Qatar",
      text: "UDST's Center of Excellence for Sustainability and Food Security translates AI and IoT research into practical solutions that directly support Qatar National Vision 2030 goals.",
    },
  ];

  const projects = {
    qcattle: {
      name: "Q-Cattle (Smart Livestock System)",
      image: "/campus/qcattle.jpeg",
      link: "https://thepeninsulaqatar.com/article/13/02/2026/udst-highlights-agricultural-innovation-at-agriteq",
      content: `Inspired by AI and IoT-based agricultural innovations showcased at AgriteQ 2026, this system focuses on smart livestock monitoring.

It uses wearable sensors and data analytics to track animal health, movement, and productivity in real time.

Such systems improve livestock management, enhance food security, and support sustainable animal farming practices in Qatar.`
    },
    greenhouse: {
      name: "Smart Greenhouse",
      image: "/campus/greenhouse.png",
      link: "https://www.udst.edu.qa/about-udst/media/news/university-doha-science-and-technology-inaugurates-its-first-smart-and",
      content: `Inspired by UDST's smart sustainable greenhouse, this system demonstrates solar-powered agriculture adapted to Qatar's climate.

It uses photovoltaic energy to power cooling, irrigation, and lighting systems, while recycling water from AC condensate and solar panel cleaning.

IoT sensors regulate temperature, humidity, and soil conditions, enabling automated and efficient food production.`
    },
    bins: {
      name: "Smart Waste",
      image: "/campus/smart-bins.png",
      link: "https://www.udst.edu.qa/about-udst/media/news/university-doha-science-and-technology-hosts-more-20000-visitors-its-expo",
      content: `Inspired by smart sustainability initiatives showcased at UDST Expo, this system uses AI and IoT to automate waste management.

Smart bins and sensors enable segregation of materials such as plastic, metal, and glass, improving recycling efficiency.

This reflects UDST's broader commitment to sustainable waste systems and circular economy practices.`
    },
    water: {
      name: "Water AI Dashboard",
      image: "/campus/water-ai.png",
      link: "https://innolight.qrdi.org.qa/en/projects/41395",
      content: `Inspired by QRDI-supported research and UDST initiatives, this system focuses on AI-driven groundwater monitoring.

It tracks climate impact, water levels, and usage patterns using real-time data analytics.

The dashboard supports sustainable water resource planning in arid environments like Qatar.`
    }
  };

  const totalProjects = Object.keys(projects).length;
  const completed = badges.length;

  const quiz = [
    {
      q: "What does the Q-Cattle system monitor?",
      options: ["Livestock health & movement", "Internet speed", "Printing"],
      a: 0
    },
    {
      q: "Smart greenhouse is powered by:",
      options: ["Solar energy", "Coal", "Manual labor"],
      a: 0
    },
    {
      q: "Smart waste systems improve:",
      options: ["Recycling efficiency", "Gaming", "Noise"],
      a: 0
    }
  ];

  const submitQuiz = () => {
    let correct = 0;
    answers.forEach((ans, i) => {
      if (ans === quiz[i].a) correct++;
    });

    setScore(correct);

    if (correct === quiz.length) {
      setShowCelebration(true);
      fireConfetti();
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans overflow-x-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">

        {/* HERO */}
        <div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
          <img src="/campus/buildings/labs/ai-iot-lab.jpg" className="absolute inset-0 w-full h-full object-cover" />
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
              AI & IoT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Innovation Lab</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl font-light tracking-wide">
              Smart Systems <span className="text-cyan-500 mx-2">•</span> Applied AI <span className="text-violet-500 mx-2">•</span> Sustainability
            </p>

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <span className="text-emerald-400 text-sm font-medium tracking-wide uppercase">🌱 Qatar National Vision 2030</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

          {/* ABOUT */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-bold uppercase tracking-widest mb-2">
                Discovery
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">About the Lab</h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                The AI & IoT Lab develops intelligent systems using cutting-edge artificial intelligence,
                Internet of Things, and data science, with a core focus on sustainability and modern innovation.
              </p>
            </div>

            <div className="lg:col-span-5 grid gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium">Advanced Workstations</h3>
                  <p className="text-sm text-slate-400">High-performance AI computing</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wifi size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium">Connected IoT Devices</h3>
                  <p className="text-sm text-slate-400">Real-time sensor networks</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Leaf size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium">Sustainability Focus</h3>
                  <p className="text-sm text-slate-400">Eco-friendly smart solutions</p>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDES */}
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-cyan-400 to-violet-500 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  📡
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Did You Know?</h2>
                  <p className="text-slate-400 text-sm mt-1">AI & IoT at UDST — real facts, real impact</p>
                </div>
              </div>

              {/* Slide card */}
              <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-2xl p-8 min-h-[160px] flex flex-col justify-center text-center mb-8 transition-all duration-300">
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
                <div className="flex gap-2 items-center">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === slideIndex
                          ? "bg-cyan-400 w-5 shadow-[0_0_8px_rgba(0,212,200,0.8)]"
                          : "bg-slate-700 hover:bg-slate-500 w-2"
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

              {/* Counter */}
              <p className="text-center text-slate-500 text-sm mt-4">
                {slideIndex + 1} / {slides.length}
              </p>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore Projects</h2>
                <p className="text-slate-400">Click on any project to learn more and earn your badges.</p>
              </div>

              <div className="flex flex-col items-end gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm">
                <div className="text-sm font-medium text-cyan-400">{completed} / {totalProjects} Explored</div>
                <div className="flex gap-2">
                  {Object.keys(projects).map((key, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-500 ${badges.includes(key) ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,212,200,0.8)]' : 'bg-slate-700'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(projects).map(([key, proj]) => {
                const isCompleted = badges.includes(key);
                return (
                  <div
                    key={key}
                    onClick={() => setActiveProject(key)}
                    className="group relative cursor-pointer bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,212,200,0.15)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-80 z-10"></div>
                    <img src={proj.image} className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                      <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">{proj.name}</h3>
                        {isCompleted && (
                          <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded-full backdrop-blur-md border border-cyan-500/30 shrink-0 shadow-[0_0_10px_rgba(0,212,200,0.3)] animate-pulse">✓</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUIZ */}
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-cyan-400 to-violet-500 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">🧠</div>
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
                            className={`
                              flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer border transition-all
                              ${isSelected
                                ? "bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_10px_rgba(0,212,200,0.3)]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"}
                            `}
                          >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-cyan-400" : "border-slate-500"}`}>
                              <div className={`w-2.5 h-2.5 rounded-full bg-cyan-400 transition-transform ${isSelected ? "scale-100" : "scale-0"}`}></div>
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
                        {completed === totalProjects && score === quiz.length ? (
                          <div className="text-emerald-400 font-bold text-sm mt-1">🎉 Sustainability Champion Unlocked!</div>
                        ) : (
                          <p className="text-slate-500 text-xs mt-1">
                            {completed !== totalProjects ? "Explore all projects to unlock the final badge." : "Get a perfect score to become a champion."}
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

        {/* MODAL */}
        {activeProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveProject(null)}></div>

            <div className="relative bg-[#0a0a0f]/90 max-w-2xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]">
              <div className="relative h-64 shrink-0">
                <img src={projects[activeProject].image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent"></div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/10"
                >✕</button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{projects[activeProject].name}</h2>
                <div className="space-y-4 text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {projects[activeProject].content}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href={projects[activeProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                  >
                    <span>Read Full Article</span><span className="text-xl">↗</span>
                  </a>

                  <button
                    onClick={() => {
                      if (!badges.includes(activeProject)) setBadges([...badges, activeProject]);
                      setActiveProject(null);
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

        {/* 🤖 ROBOT — upgraded to match Huawei/G-Lab style */}
        <div className="hidden md:block fixed bottom-10 right-2 z-[100] pointer-events-none">
          <div style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)`, transition: 'transform 0.1s ease-out' }}>
            <div
  className="robot-container animate-float drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]"
  style={{ width: "240px", height: "240px" }}
>
              <div className="robot-glow" />
              <img src="/campus/robot.png" style={{ width: "80%", height: "75%", objectFit: "contain" }} alt="robot" />
            </div>
          </div>
        </div>

      </div>

      {/* ── CELEBRATION ── */}
      {showCelebration && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur"></div>
          <div className="relative text-center animate-pop">
            <h1 className="text-5xl font-extrabold text-white mb-4">
              🎉 Perfect Score!
            </h1>
            <p className="text-cyan-400 text-lg">
              You nailed it 🔥
            </p>
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
        /* ── Robot ── */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .robot-container {
          position: relative;
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .robot-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }

        /* ── Celebration pop ── */
        @keyframes pop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* ── Confetti burst ── */
        .confetti-container {
          position: absolute;
          top: 50%;
          left: 50%;
          pointer-events: none;
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          animation: burst 0.8s ease-out forwards;
          background: #22d3ee;
        }
        .confetti:nth-child(odd)  { background: #a78bfa; border-radius: 50%; }
        .confetti:nth-child(3n)   { background: #facc15; width: 8px; height: 8px; }
        .confetti:nth-child(4n)   { background: #4ade80; }
        .confetti:nth-child(5n)   { background: #fb7185; border-radius: 50%; }
        @keyframes burst {
          0%   { transform: translate(0, 0) rotate(0deg);   opacity: 1; }
          100% { transform: translate(var(--x), var(--y)) rotate(720deg); opacity: 0; }
        }

        /* ── Scrollbar ── */
        .custom-scrollbar::-webkit-scrollbar       { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}