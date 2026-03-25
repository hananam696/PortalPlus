"use client";

import confetti from "canvas-confetti";
import { Cpu, Shield, Zap, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SOURCES:
// • UDST-Huawei AI ICT Academy Lab inauguration (Feb 2024):
//   https://www.gulf-times.com/article/677487/qatar/huawei-ai-ict-academy-lab-opens-at-udst
// • UDST–Huawei MoU & ICT Academy partnership (Oct 2022):
//   https://www.udst.edu.qa/about-udst/media/news/university-doha-science-and-technology-signs-mou-huawei
// • Huawei Green Development Award & sustainability commitments:
//   https://www.huawei.com/minisite/ict-competition-2024-2025-global/en/index.html
// • CCIT labs overview: https://www.udst.edu.qa/academic/college-computing-and-information-technology
// ─────────────────────────────────────────────────────────────────────────────

export default function HuaweiLabPage() {
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

  // ── SLIDES — sustainability / Green IT focus, all facts from verified sources ──
  const slides = [
    {
      icon: "🏛️",
      title: "UDST–Huawei AI ICT Academy Lab",
      text: "Inaugurated in February 2024, the UDST–Huawei AI ICT Academy Lab inside CCIT Building 10 is a state-of-the-art facility empowering students with AI and cloud skills aligned with Qatar's National AI Strategy.",
      source: "Gulf Times, Feb 2024",
      link: "https://www.gulf-times.com/article/677487/qatar/huawei-ai-ict-academy-lab-opens-at-udst",
      sustainability: false,
    },
    {
      icon: "♻️",
      title: "E-Waste & the IT Sector",
      text: "The global IT sector generates over 50 million tonnes of electronic waste (e-waste) every year — only 20% is formally recycled. Responsible device management, refurbishment, and certified e-waste disposal in labs like CCIT Building 10 directly reduce this burden.",
      source: "UN Global E-waste Monitor",
      link: "https://www.itu.int/en/ITU-D/Environment/Pages/Spotlight/Global-Ewaste-Monitor-2020.aspx",
      sustainability: true,
    },
    {
      icon: "⚡",
      title: "Green IT & Energy-Efficient Computing",
      text: "Data centres consume ~1–1.5% of global electricity. Huawei's own sustainability strategy prioritises energy-efficient ICT infrastructure, and the UDST-Huawei lab equips students to design low-carbon, resource-efficient digital systems.",
      source: "Huawei Sustainability Report",
      link: "https://www.huawei.com/en/sustainability",
      sustainability: true,
    },
    {
      icon: "🌱",
      title: "Huawei's Green Development Award",
      text: "Huawei's ICT Competition introduced a Green Development Award to recognise students who use AI, IoT, and cloud technologies to solve environmental challenges — directly aligning lab training with Qatar National Vision 2030's sustainability goals.",
      source: "Huawei ICT Competition 2024–25",
      link: "https://www.huawei.com/minisite/ict-competition-2024-2025-global/en/index.html",
      sustainability: true,
    },
    {
      icon: "🔐",
      title: "Cybersecurity Supports Sustainability",
      text: "Cyber-attacks on critical infrastructure — power grids, water systems, smart buildings — threaten sustainability goals. The Huawei lab's cybersecurity and networking training prepares students to protect these vital systems.",
      source: "CCIT Labs — UDST",
      link: "https://www.udst.edu.qa/academic/college-computing-and-information-technology",
      sustainability: true,
    },
  ];

  // ── PROJECTS — all linked to verified UDST/Huawei sources ──
  const projects = {
    ewaste: {
      name: "E-Waste Awareness in CCIT",
      image: "/campus/huawei-ewaste.jpg",
      link: "https://www.itu.int/en/ITU-D/Environment/Pages/Spotlight/Global-Ewaste-Monitor-2020.aspx",
      badge: "♻️ E-Waste Scout",
      content: `The IT and computing sector is one of the fastest-growing sources of electronic waste globally. Every device — server, switch, workstation — has a life cycle that must be managed responsibly.

Inside CCIT Building 10, the Huawei AI ICT Academy Lab trains students to design efficient systems that extend hardware lifespans, adopt virtualisation to reduce device counts, and apply Green IT principles.

Students learn that responsible e-waste management — through certified recycling, device refurbishment, and vendor take-back programmes — is a critical part of sustainable ICT practice.`,
    },
    greenIT: {
      name: "Green IT & Energy Efficiency",
      image: "/campus/huawei-green.jpg",
      link: "https://www.huawei.com/en/sustainability",
      badge: "⚡ Green IT Champion",
      content: `Data centres and network infrastructure account for significant global energy consumption. Huawei, as UDST's partner in the AI ICT Academy Lab, has committed to sustainable ICT — prioritising energy-efficient hardware, renewable-powered data centres, and low-carbon network design.

Through the UDST–Huawei lab, students gain hands-on skills in cloud computing and AI that emphasise resource efficiency: doing more computation with less energy, using serverless architectures that scale down when idle, and selecting certified energy-efficient equipment.`,
    },
    seeds: {
      name: "Seeds for the Future — UDST",
      image: "/campus/huawei-seeds.jpg",
      link: "https://www.gulf-times.com/article/677487/qatar/huawei-ai-ict-academy-lab-opens-at-udst",
      badge: "🌱 Future Leader",
      content: `UDST students excelled in Huawei's "Seeds for the Future" Corporate Social Responsibility programme, securing 3rd place in the Middle East and Central Asia region in 2023 — earning a digital tour to China.

This programme connects ICT talent development with social sustainability: bridging the digital divide, empowering youth with skills for the green economy, and fostering responsible technology leadership.

It reflects the lab's broader mission: not just technical skills, but purpose-driven innovation aligned with Qatar's National AI Strategy and Vision 2030.`,
    },
    certifications: {
      name: "Huawei HCIA / HCIP Certifications",
      image: "/campus/huawei-cert.jpg",
      link: "https://www.udst.edu.qa/about-udst/media/news/university-doha-science-and-technology-signs-mou-huawei",
      badge: "🎓 Certified Practitioner",
      content: `Through the UDST–Huawei MoU (signed October 2022), Huawei certification courses — including HCIA (Huawei Certified ICT Associate) and HCIP (Huawei Certified ICT Professional) — were embedded as micro-credential courses within UDST's curriculum.

These certifications cover networking, cloud computing, AI, and cybersecurity — all disciplines that underpin sustainable digital infrastructure in Qatar.

Certified ICT professionals are better equipped to design energy-efficient networks, manage data securely, and build resilient systems that support Qatar's long-term sustainability goals.`,
    },
  };

  const totalProjects = Object.keys(projects).length;
  const completed = badges.length;

  // ── QUIZ — sustainability-focused, CCIT Building 10 context ──
  const quiz = [
    {
      q: "What percentage of global e-waste is formally recycled each year?",
      options: ["About 20%", "About 80%", "Almost 100%"],
      a: 0,
      explanation: "Only ~20% of e-waste is formally recycled. Proper ICT asset management in labs like CCIT helps reduce this gap.",
    },
    {
      q: "What does 'Green IT' refer to in the context of CCIT's Huawei Lab?",
      options: [
        "Designing energy-efficient, low-carbon digital systems",
        "Painting computer equipment green",
        "Using only green-coloured cables",
      ],
      a: 0,
      explanation: "Green IT means designing ICT systems that minimise energy use, extend hardware life, and reduce environmental impact.",
    },
    {
      q: "Huawei introduced a Green Development Award in its ICT Competition to:",
      options: [
        "Recognise students using technology to solve environmental challenges",
        "Award students who recycle the most paper",
        "Give prizes for the fastest internet connection",
      ],
      a: 0,
      explanation: "Huawei's Green Development Award encourages ICT students globally to build sustainable technology solutions.",
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
    const colors = ["#34d399", "#a78bfa", "#f59e0b", "#60a5fa", "#fb7185"];
    (function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 7, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080b12] text-slate-200 font-sans overflow-x-hidden relative">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute top-0 -left-1/4 w-[700px] h-[700px] bg-red-700/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-rose-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-orange-700/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <div className="relative h-[60vh] min-h-[480px] w-full flex items-end">
          <img
            src="/campus/buildings/labs/huawei-lab.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Huawei AI ICT Academy Lab"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/70 to-black/20" />

          <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
            <button
              onClick={() => router.back()}
              className="mb-8 px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all flex items-center gap-2 group hover:text-red-400"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
              CCIT Building 10
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_24px_rgba(239,68,68,0.35)]">
              Huawei{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                AI ICT Academy
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl font-light tracking-wide">
              Green IT <span className="text-red-500 mx-2">•</span> E-Waste Awareness{" "}
              <span className="text-orange-500 mx-2">•</span> Sustainable Networking
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
              <span className="text-emerald-400 text-sm font-medium tracking-wide uppercase">
                🌱 Qatar National Vision 2030 — Digital Sustainability
              </span>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

          {/* ABOUT */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest">
                About the Lab
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                UDST–Huawei AI ICT Academy Lab
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                Inaugurated in February 2024, this lab inside{" "}
                <span className="text-white font-medium">CCIT Building 10</span> is a
                partnership between UDST and Huawei — equipping students with AI, cloud,
                networking, and cybersecurity skills while preparing them to build
                <span className="text-emerald-400 font-medium"> greener, more sustainable</span> digital
                infrastructure for Qatar.
              </p>
              <a
                href="https://www.gulf-times.com/article/677487/qatar/huawei-ai-ict-academy-lab-opens-at-udst"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                Read official coverage ↗
              </a>
            </div>

            <div className="lg:col-span-5 grid gap-4">
              {[
                { icon: <Cpu size={22} />, color: "red", title: "High-Performance Computing", sub: "AI & cloud workstations" },
                { icon: <Shield size={22} />, color: "orange", title: "Cybersecurity Lab", sub: "24 workstations + Palo Alto courses" },
                { icon: <Zap size={22} />, color: "yellow", title: "HCIA / HCIP Certifications", sub: "Embedded as UDST micro-credentials" },
                { icon: <Leaf size={22} />, color: "emerald", title: "Green IT Focus", sub: "Sustainable ICT design principles" },
              ].map(({ icon, color, title, sub }) => (
                <div
                  key={title}
                  className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group`}
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
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-red-500/15 rounded-full blur-[70px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  💡
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Did You Know?</h2>
                  <p className="text-slate-400 text-sm mt-0.5">Green IT & sustainability in CCIT Building 10</p>
                </div>
              </div>

              <div className="bg-[#080b12]/60 border border-white/5 rounded-2xl p-8 min-h-[170px] flex flex-col justify-center text-center mb-6 transition-all duration-300">
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
                          ? "bg-red-400 w-5 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                          : "bg-slate-700 hover:bg-slate-500 w-2"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setSlideIndex((p) => Math.min(p + 1, slides.length - 1))}
                  disabled={slideIndex === slides.length - 1}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
              <p className="text-center text-slate-500 text-xs mt-3">{slideIndex + 1} / {slides.length}</p>

              {/* Source attribution */}
              <div className="mt-4 text-center">
                <a
                  href={slides[slideIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors"
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
                <p className="text-slate-400">Click each topic to learn more and earn a sustainability badge.</p>
              </div>
              <div className="flex flex-col items-end gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm shrink-0">
                <div className="text-sm font-medium text-red-400">{completed} / {totalProjects} Explored</div>
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
                    className="group relative cursor-pointer bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/40 to-transparent opacity-80 z-10" />
                    <img
                      src={proj.image}
                      className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt={proj.name}
                    />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                      <div className="flex justify-between items-end">
                        <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors drop-shadow-md">
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
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-orange-500/15 rounded-full blur-[70px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  🧠
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Sustainability Quiz</h2>
                  <p className="text-slate-400 text-sm mt-0.5">Test your Green IT knowledge — CCIT Building 10</p>
                </div>
              </div>

              <div className="space-y-8">
                {quiz.map((q, i) => (
                  <div key={i} className="bg-[#080b12]/60 border border-white/5 rounded-2xl p-6">
                    <p className="text-lg font-medium text-white mb-4 flex gap-3">
                      <span className="text-red-400 font-bold shrink-0">{i + 1}.</span> {q.q}
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
                                ? "bg-red-500/20 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 cursor-pointer"
                            } ${score !== null ? "cursor-default" : "cursor-pointer"}`}
                          >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selected ? "border-red-400" : "border-slate-500"}`}>
                              <div className={`w-2.5 h-2.5 rounded-full bg-red-400 transition-transform ${selected ? "scale-100" : "scale-0"}`} />
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
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Submit Answers
                </button>

                {score !== null && (
                  <div className="flex-1">
                    <div className="flex items-center gap-4 bg-[#080b12]/60 border border-white/10 p-4 rounded-xl">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                        {score}/{quiz.length}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-300 font-medium text-sm">Score achieved</p>
                        {score === quiz.length ? (
                          <div className="text-emerald-400 font-bold text-sm mt-1">🎉 Green IT Champion Unlocked!</div>
                        ) : (
                          <p className="text-slate-500 text-xs mt-1">Review the slides and try again for a perfect score.</p>
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
          <div className="relative bg-[#080b12]/95 max-w-2xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative h-56 shrink-0">
              <img src={projects[activeProject].image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] to-transparent" />
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
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors flex items-center gap-1"
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
            <p className="text-emerald-400 text-lg font-medium">Green IT Champion 🌱</p>
          </div>
        </div>
      )}

      {/* 🤖 ROBOT */}
      <div className="hidden md:block fixed bottom-10 right-2 z-[100] pointer-events-none">
        <div style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)`, transition: "transform 0.1s ease-out" }}>
          <div className="robot-container animate-float drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
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
        .robot-glow { position: absolute; inset: 0; background: radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%); border-radius: 50%; }
      `}</style>
    </div>
  );
}