"use client";

import confetti from "canvas-confetti";
import { Cloud, Database, Cpu, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SOURCES:
// • UDST G-Lab official announcement (June 2024):
//   https://www.udst.edu.qa/news/glab
// • CCIT labs overview:
//   https://www.udst.edu.qa/academic/college-computing-and-information-technology
// • Google Cloud sustainability:
//   https://cloud.google.com/sustainability
// ─────────────────────────────────────────────────────────────────────────────

export default function GLabPage() {
  const router = useRouter();

  const [activeProject, setActiveProject] = useState(null);
  const [badges, setBadges]   = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore]     = useState(null);
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

  // ── SLIDES — sustainability / Green Cloud focus, facts from verified sources ──
  const slides = [
    {
      icon: "🔬",
      title: "UDST G-Lab — Powered by Google Cloud",
      text: "Unveiled in June 2024, UDST's G-Lab is a state-of-the-art research hub inside CCIT Building 10 powered by Google Cloud — giving researchers access to BigQuery, Vertex AI, and high-performance cloud computing for real-world applied research.",
      source: "UDST Official News, June 2024",
      link: "https://www.udst.edu.qa/news/glab",
      sustainability: false,
    },
    {
      icon: "🌍",
      title: "Cloud Computing & Carbon Footprint",
      text: "Shifting from on-premises servers to cloud platforms can reduce energy use by up to 65% and carbon emissions by up to 98% when using a provider running on renewable energy. UDST's G-Lab commitment to 'agile and sustainable solutions' reflects this principle directly.",
      source: "UDST G-Lab Official Announcement",
      link: "https://www.udst.edu.qa/news/glab",
      sustainability: true,
    },
    {
      icon: "🔋",
      title: "Sustainable Research with Cloud AI",
      text: "G-Lab's access to Google Cloud's Vertex AI and BigQuery allows UDST researchers to run advanced AI simulations and data analytics without maintaining energy-hungry physical hardware — reducing the lab's hardware footprint and e-waste generation.",
      source: "UDST G-Lab Official Announcement",
      link: "https://www.udst.edu.qa/news/glab",
      sustainability: true,
    },
    {
      icon: "📊",
      title: "Big Data for Sustainability Decisions",
      text: "G-Lab's BigQuery integration enables researchers to analyse massive environmental and operational datasets — such as energy consumption patterns, urban heat data, and resource usage — turning data into actionable sustainability insights aligned with Qatar Vision 2030.",
      source: "UDST G-Lab Official Announcement",
      link: "https://www.udst.edu.qa/news/glab",
      sustainability: true,
    },
    {
      icon: "⚙️",
      title: "RAD Lab: Rapid Prototyping, Less Waste",
      text: "G-Lab's RAD Lab access facilitates rapid prototyping and experimentation with Google Cloud engineers — allowing ideas to be tested digitally before physical production, reducing material waste and shortening the sustainability innovation cycle.",
      source: "UDST G-Lab Official Announcement",
      link: "https://www.udst.edu.qa/news/glab",
      sustainability: true,
    },
  ];

  // ── PROJECTS — tied to verified G-Lab capabilities & sustainability ──
  const projects = {
    vertexai: {
      name: "Vertex AI & Sustainable Modelling",
      image: "/campus/glab-vertexai.jpg",
      link: "https://www.udst.edu.qa/news/glab",
      badge: "🤖 AI Sustainability Researcher",
      content: `G-Lab gives UDST researchers access to Vertex AI — Google Cloud's world-class platform for building and deploying AI models — without the need for energy-intensive physical GPU clusters on campus.

This approach directly reduces the lab's hardware footprint and eliminates the e-waste that would come from maintaining dedicated on-premises AI infrastructure.

Researchers can model environmental scenarios, analyse climate data, and develop AI-driven tools for water management, energy efficiency, and urban planning — all in support of Qatar National Vision 2030.`,
    },
    bigquery: {
      name: "BigQuery — Data-Driven Sustainability",
      image: "/campus/glab-bigquery.jpg",
      link: "https://www.udst.edu.qa/news/glab",
      badge: "📊 Data for Good Analyst",
      content: `According to UDST's official G-Lab announcement, BigQuery and Google Cloud's AI tools "enable researchers at UDST to analyse vast datasets, uncover patterns, and accelerate ground-breaking discoveries."

Applied to sustainability, this means researchers can process large-scale environmental data — energy consumption records, atmospheric datasets, waste metrics — at a scale impossible with traditional campus hardware.

This eliminates the need to purchase and maintain large physical data storage infrastructure, reducing both energy use and e-waste inside CCIT Building 10.`,
    },
    scalable: {
      name: "Scalable Cloud vs Physical Servers",
      image: "/campus/glab-cloud.jpg",
      link: "https://www.udst.edu.qa/news/glab",
      badge: "☁️ Green Cloud Advocate",
      content: `UDST chose Google Cloud for G-Lab explicitly because of its "scalability and flexibility" — the ability to scale computing resources up and down on demand rather than maintaining idle, energy-wasting physical servers year-round.

This serverless and elastic model means CCIT Building 10 consumes computing energy only when research is actively running — directly cutting the facility's ICT-related carbon footprint.

Students trained on G-Lab learn to design cloud-native applications with sustainability in mind: efficient architectures that avoid wasteful over-provisioning.`,
    },
    rad: {
      name: "RAD Lab — Digital-First Prototyping",
      image: "/campus/glab-rad.jpg",
      link: "https://www.udst.edu.qa/news/glab",
      badge: "🚀 Circular Innovator",
      content: `G-Lab's RAD Lab access connects UDST researchers directly with Google Cloud's world-class engineers to rapidly prototype and experiment — testing and validating ideas in a virtual environment before any physical materials are used.

This digital-first approach to innovation embodies circular economy principles: fewer failed physical prototypes means less material waste, lower production energy, and a more sustainable research cycle.

It also accelerates the development of sustainability-focused solutions by shortening the feedback loop between idea, test, and deployment.`,
    },
  };

  const totalProjects = Object.keys(projects).length;
  const completed = badges.length;

  // ── QUIZ — sustainability-focused, CCIT Building 10 / G-Lab context ──
  const quiz = [
    {
      q: "Why does using cloud computing (like G-Lab's Google Cloud) reduce environmental impact compared to on-premises servers?",
      options: [
        "Cloud providers share and optimise infrastructure across many users, reducing idle energy waste",
        "Cloud computers use less electricity because they are stored in the sky",
        "On-premises servers are always turned off when not in use",
      ],
      a: 0,
      explanation: "Shared cloud infrastructure is utilised far more efficiently than dedicated on-premises servers, which often sit idle consuming power — resulting in significantly lower energy and carbon footprints.",
    },
    {
      q: "According to UDST's official G-Lab announcement, what does UDST use BigQuery for?",
      options: [
        "To analyse vast datasets, uncover patterns, and accelerate research discoveries",
        "To manage student attendance records",
        "To stream movies for the campus cinema",
      ],
      a: 0,
      explanation: "UDST's G-Lab official news confirms BigQuery is used for large-scale data analysis and research — including potential environmental and sustainability datasets.",
    },
    {
      q: "How does G-Lab's scalable cloud model support sustainability in CCIT Building 10?",
      options: [
        "Computing resources scale with demand, so energy is only consumed when actively needed",
        "The lab keeps all servers running at full power 24/7 to be ready",
        "Scalability means the lab can print more research papers",
      ],
      a: 0,
      explanation: "Elastic cloud scaling means CCIT only uses energy for the computing it actually needs — a core Green IT principle that reduces the building's ICT carbon footprint.",
    },
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
      setTimeout(() => setShowCelebration(false), 3500);
    }
  };

  const fireConfetti = () => {
    const duration = 900;
    const end = Date.now() + duration;
    const colors = ["#3b82f6", "#22d3ee", "#a78bfa", "#34d399", "#facc15"];
    (function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 7, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#060a14] text-slate-200 font-sans overflow-x-hidden relative">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        <div className="absolute top-0 -left-1/4 w-[750px] h-[750px] bg-blue-700/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-500/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <div className="relative h-[60vh] min-h-[480px] w-full flex items-end">
          <img
            src="/campus/buildings/labs/glab.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="UDST G-Lab"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/70 to-black/20" />

          <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
            <button
              onClick={() => router.back()}
              className="mb-8 px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all flex items-center gap-2 group hover:text-blue-400"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              CCIT Building 10
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_24px_rgba(59,130,246,0.35)]">
              UDST{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                G-Lab
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl font-light tracking-wide">
              Powered by Google Cloud <span className="text-blue-500 mx-2">•</span> Sustainable Research{" "}
              <span className="text-cyan-500 mx-2">•</span> Green IT
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
              <span className="text-emerald-400 text-sm font-medium tracking-wide uppercase">
                🌱 Qatar National Vision 2030 — Sustainable Digital Innovation
              </span>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

          {/* ABOUT */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                About G-Lab
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Qatar's First Google Cloud Research Hub
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                Unveiled in June 2024, <span className="text-white font-medium">UDST G-Lab</span> is a
                revolutionary research hub inside <span className="text-white font-medium">CCIT Building 10</span>{" "}
                powered by Google Cloud. It provides researchers with BigQuery, Vertex AI, RAD Lab access,
                and scalable cloud computing — all underpinned by UDST's commitment to{" "}
                <span className="text-emerald-400 font-medium">agile and sustainable solutions</span>.
              </p>
              <a
                href="https://www.udst.edu.qa/news/glab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Read official UDST announcement ↗
              </a>
            </div>

            <div className="lg:col-span-5 grid gap-4">
              {[
                { icon: <Cloud size={22} />, color: "blue", title: "Google Cloud Infrastructure", sub: "Scalable compute & storage for research" },
                { icon: <Database size={22} />, color: "cyan", title: "BigQuery Analytics", sub: "Large-scale dataset analysis" },
                { icon: <Cpu size={22} />, color: "violet", title: "Vertex AI Platform", sub: "Build & deploy AI models" },
                { icon: <Leaf size={22} />, color: "emerald", title: "Sustainable Solutions", sub: "Agile, green-first approach" },
              ].map(({ icon, color, title, sub }) => (
                <div
                  key={title}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-${color}-500/20 text-${color}-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SLIDES ── */}
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-blue-500/15 rounded-full blur-[70px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  💡
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Did You Know?</h2>
                  <p className="text-slate-400 text-sm mt-0.5">G-Lab & sustainable cloud computing — CCIT Building 10</p>
                </div>
              </div>

              <div className="bg-[#060a14]/60 border border-white/5 rounded-2xl p-8 min-h-[170px] flex flex-col justify-center text-center mb-6 transition-all duration-300">
                <div className="text-4xl mb-3">{slides[slideIndex].icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{slides[slideIndex].title}</h3>
                <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">{slides[slideIndex].text}</p>
                {slides[slideIndex].sustainability && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold mx-auto">
                    🌱 Sustainability Insight
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setSlideIndex((p) => Math.max(p - 1, 0))}
                  disabled={slideIndex === 0}
                  className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === slideIndex
                          ? "bg-blue-400 w-5 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                          : "bg-slate-700 hover:bg-slate-500 w-2"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setSlideIndex((p) => Math.min(p + 1, slides.length - 1))}
                  disabled={slideIndex === slides.length - 1}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
              <p className="text-center text-slate-500 text-xs mt-3">{slideIndex + 1} / {slides.length}</p>

              <div className="mt-4 text-center">
                <a
                  href={slides[slideIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-blue-400 transition-colors"
                >
                  Source: {slides[slideIndex].source} ↗
                </a>
              </div>
            </div>
          </div>

          {/* ── PROJECTS ── */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore Topics</h2>
                <p className="text-slate-400">Click each topic to learn about G-Lab and earn a sustainability badge.</p>
              </div>
              <div className="flex flex-col items-end gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm shrink-0">
                <div className="text-sm font-medium text-blue-400">{completed} / {totalProjects} Explored</div>
                <div className="flex gap-2">
                  {Object.keys(projects).map((key, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        badges.includes(key) ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(projects).map(([key, proj]) => {
                const done = badges.includes(key);
                return (
                  <div
                    key={key}
                    onClick={() => setActiveProject(key)}
                    className="group relative cursor-pointer bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/40 to-transparent opacity-80 z-10" />
                    <img
                      src={proj.image}
                      className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt={proj.name}
                    />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                      <div className="flex justify-between items-end">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors drop-shadow-md">
                          {proj.name}
                        </h3>
                        {done && (
                          <div className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md shrink-0 ml-2">
                            {proj.badge}
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
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-500/15 rounded-full blur-[70px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  🧠
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Sustainability Quiz</h2>
                  <p className="text-slate-400 text-sm mt-0.5">G-Lab & Green Cloud — CCIT Building 10</p>
                </div>
              </div>

              <div className="space-y-8">
                {quiz.map((q, i) => (
                  <div key={i} className="bg-[#060a14]/60 border border-white/5 rounded-2xl p-6">
                    <p className="text-lg font-medium text-white mb-4 flex gap-3">
                      <span className="text-blue-400 font-bold shrink-0">{i + 1}.</span> {q.q}
                    </p>
                    <div className="grid gap-3">
                      {q.options.map((opt, j) => {
                        const selected = answers[i] === j;
                        const correct  = score !== null && j === q.a;
                        const wrong    = score !== null && selected && j !== q.a;
                        return (
                          <div
                            key={j}
                            onClick={() => {
                              if (score !== null) return;
                              const n = [...answers];
                              n[i] = j;
                              setAnswers(n);
                            }}
                            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all ${
                              wrong
                                ? "bg-red-500/10 border-red-500 text-red-300"
                                : correct && score !== null
                                ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
                                : selected
                                ? "bg-blue-500/20 border-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.25)]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 cursor-pointer"
                            } ${score !== null ? "cursor-default" : "cursor-pointer"}`}
                          >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selected ? "border-blue-400" : "border-slate-500"}`}>
                              <div className={`w-2.5 h-2.5 rounded-full bg-blue-400 transition-transform ${selected ? "scale-100" : "scale-0"}`} />
                            </div>
                            {opt}
                          </div>
                        );
                      })}
                    </div>

                    {score !== null && (
                      <div className="mt-4 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-400">
                        💡 {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
                <button
                  onClick={submitQuiz}
                  disabled={answers.length < quiz.length || answers.includes(undefined) || score !== null}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Submit Answers
                </button>

                {score !== null && (
                  <div className="flex-1">
                    <div className="flex items-center gap-4 bg-[#060a14]/60 border border-white/10 p-4 rounded-xl">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                        {score}/{quiz.length}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-300 font-medium text-sm">Score achieved</p>
                        {score === quiz.length ? (
                          <div className="text-emerald-400 font-bold text-sm mt-1">🎉 Green Cloud Champion Unlocked!</div>
                        ) : (
                          <p className="text-slate-500 text-xs mt-1">Review the slides above and try again for a perfect score.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── PROJECT MODAL ── */}
      {activeProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setActiveProject(null)} />
          <div className="relative bg-[#060a14]/95 max-w-2xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative h-56 shrink-0">
              <img src={projects[activeProject].image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] to-transparent" />
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-4">{projects[activeProject].name}</h2>
              <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm space-y-3">
                {projects[activeProject].content}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={projects[activeProject].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1"
                >
                  Read Source ↗
                </a>
                <button
                  onClick={() => {
                    if (!badges.includes(activeProject)) setBadges([...badges, activeProject]);
                    setActiveProject(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  {badges.includes(activeProject) ? `✓ ${projects[activeProject].badge}` : "Mark as Read & Earn Badge"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CELEBRATION ── */}
      {showCelebration && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur" />
          <div className="relative text-center">
            <h1 className="text-5xl font-extrabold text-white mb-3">🎉 Perfect Score!</h1>
            <p className="text-cyan-400 text-lg font-medium">Green Cloud Champion 🌿</p>
          </div>
        </div>
      )}

      {/* 🤖 ROBOT */}
      <div className="hidden md:block fixed bottom-10 right-2 z-[100] pointer-events-none">
        <div style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)`, transition: "transform 0.1s ease-out" }}>
          <div className="robot-container animate-float drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="robot-glow" />
            <img src="/campus/robot.png" style={{ width: "80%", height: "75%", objectFit: "contain" }} alt="robot" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .robot-container { position: relative; width: 160px; height: 160px; display: flex; align-items: center; justify-content: center; }
        .robot-glow { position: absolute; inset: 0; background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%); border-radius: 50%; }
      `}</style>
    </div>
  );
}