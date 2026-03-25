"use client";

import confetti from "canvas-confetti";
import { Film, Mic, Tv } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MediaLabPage() {

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

  // ── SLIDES ──
  // Sources: UDST DCMP programme page; Qatar Tribune Feb 2024 (QMC MoU); verified industry facts on streaming energy use.
  const slides = [
    {
      title: "📡 Media Shapes Sustainability Awareness",
      text: "Digital media is one of the most powerful tools for raising public awareness about environmental issues. UDST's B.Sc. in Digital Communication and Media Production equips students to create content that communicates sustainability messages aligned with Qatar National Vision 2030.",
    },
    {
      title: "🤝 UDST × Qatar Media Corporation",
      text: "In February 2024, UDST signed a Memorandum of Understanding with Qatar Media Corporation (QMC) to strengthen digital communication and media production education — preparing graduates to shape Qatar's evolving media landscape responsibly.",
    },
    {
      title: "🟢 Virtual Production = Less Carbon",
      text: "Virtual production techniques like green screen significantly reduce the need for location travel and physical set construction. This lowers a production's carbon footprint while expanding creative possibilities — a greener way to make media.",
    },
    {
      title: "💡 Streaming Has an Environmental Cost",
      text: "Streaming video accounts for a significant share of global internet traffic, and data centres consume enormous amounts of energy. Media professionals trained at UDST learn to consider the environmental impact of how digital content is distributed.",
    },
  ];

  // ── SKILL AREAS ──
  // These are skill areas from the UDST B.Sc. DCMP curriculum — NOT named research projects.
  // They are labelled clearly as "Student Skill Area" so students understand what these represent.
  // Source: https://www.udst.edu.qa/academic/our-colleges/college-computing-and-information-technology/our-programs/bachelor-science
  const projects = {
    campaign: {
      name: "Digital Campaigns & Storytelling",
      image: "/campus/media-campaign.jpg",
      tag: "Student Skill Area",
      content: `The B.Sc. DCMP programme trains students in content creation, visual design, and digital communication — skills essential for producing sustainability campaigns.

Students learn to craft messages for social media, short-form video, and digital platforms, giving them the tools to raise awareness about environmental issues in Qatar and beyond.

Note: This is not a specific named research project at UDST. It reflects the content creation and channel development skills graduates develop through the programme.`,
      link: "https://www.udst.edu.qa/academic/our-colleges/college-computing-and-information-technology/our-programs/bachelor-science"
    },
    green: {
      name: "Virtual Production & Green Screen",
      image: "/campus/media-green.jpg",
      tag: "Student Skill Area",
      content: `Virtual production using green screen is a technique students can develop through the DCMP programme's audio and video production modules.

By creating convincing environments without physical travel or set construction, this approach reduces the carbon footprint of media production — an important sustainability consideration for Qatar's growing media industry.

Note: This reflects a general industry practice aligned with sustainability. It is not a specific published UDST research project.`,
      link: "https://www.qatar-tribune.com/article/108506/nation/qmc-udst-move-to-boost-digital-communication-media-production"
    },
    distribution: {
      name: "Responsible Digital Distribution",
      image: "/campus/media-vr.jpg",
      tag: "Student Skill Area",
      content: `DCMP graduates develop skills in channel development and content distribution — understanding how and where to share media. This includes awareness of the environmental impact of digital infrastructure.

Streaming, cloud storage, and social platforms all consume significant energy. Media professionals who understand this can make more sustainable choices about how they distribute content.

Note: This skill area is grounded in the DCMP programme curriculum and is not a specific UDST research project.`,
      link: "https://www.udst.edu.qa/academic/our-colleges/college-computing-and-information-technology/our-programs/bachelor-science"
    },
    archive: {
      name: "Digital Content Organisation",
      image: "/campus/media-archive.jpg",
      tag: "Student Skill Area",
      content: `The DCMP programme covers content organisation and assessment — skills that underpin responsible digital archiving. Storing media digitally reduces the need for physical materials, contributing to a lower environmental footprint.

Good archiving practices also extend the lifespan of digital content, reducing the need to re-shoot or re-produce material and cutting down on associated energy use.

Note: This reflects a skill area within the programme curriculum; it is not a specific named UDST Media Lab project.`,
      link: "https://www.udst.edu.qa/academic/our-colleges/college-computing-and-information-technology/our-programs/bachelor-science"
    }
  };

  const totalProjects = Object.keys(projects).length;
  const completed = badges.length;

  // ── QUIZ ──
  // Questions focus on sustainability concepts: e-waste, green production, digital energy use.
  // Directly relevant to CCIT Building 10 and the Media Lab context.
  const quiz = [
    {
      q: "What is 'e-waste' and why does it matter in a media lab like CCIT's?",
      options: [
        "Discarded electronic devices — which contain toxic materials and must be recycled responsibly",
        "Waste paper used in printing scripts and storyboards",
        "Unused storage space on computers"
      ],
      a: 0
    },
    {
      q: "Which media production approach has the smaller environmental footprint?",
      options: [
        "Filming on location with a large crew and equipment flown in internationally",
        "Using virtual production (green screen) to eliminate travel and physical set construction",
        "Printing high-resolution physical copies of all finished content"
      ],
      a: 1
    },
    {
      q: "Why does streaming video have an environmental cost?",
      options: [
        "It requires data centres and internet infrastructure that consume large amounts of electricity",
        "It uses too much screen brightness on devices",
        "It always requires a physical disc to be manufactured and shipped"
      ],
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
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const fireConfetti = () => {
    const duration = 800;
    const end = Date.now() + duration;
    const colors = ["#f97316", "#fb923c", "#fbbf24", "#4ade80", "#fb7185"];
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans overflow-x-hidden relative selection:bg-orange-500/30 selection:text-orange-200">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">

        {/* HERO */}
        <div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
          <img src="/campus/buildings/labs/media-lab.jpg" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-black/20" />
          <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
            <button
              onClick={() => router.back()}
              className="mb-8 px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all flex items-center gap-2 group hover:text-orange-400"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
            </button>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_20px_rgba(251,146,60,0.4)]">
              Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Production Lab</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl font-light tracking-wide">
              Digital Storytelling <span className="text-orange-500 mx-2">•</span> Green Production <span className="text-rose-500 mx-2">•</span> Sustainability
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
              <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">Discovery</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">About the Lab</h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                CCIT's Media Lab is an innovative studio space where students in the B.Sc. Digital Communication and Media Production programme develop technical skills across visual design, audio and video production, content creation, and digital distribution — with a growing focus on sustainability in media practice.
              </p>
            </div>
            <div className="lg:col-span-5 grid gap-4">
              {[
                { icon: <Film size={24}/>, color: "orange", title: "Studio Production Space", sub: "Industry-standard media equipment" },
                { icon: <Tv size={24}/>, color: "rose", title: "Virtual & Green Production", sub: "Lower carbon footprint filmmaking" },
                { icon: <Mic size={24}/>, color: "emerald", title: "QMC Partnership (Feb 2024)", sub: "MoU with Qatar Media Corporation" },
              ].map(({ icon, color, title, sub }) => (
                <div key={title} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                  <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 text-${color}-400 flex items-center justify-center group-hover:scale-110 transition-transform`}>{icon}</div>
                  <div>
                    <h3 className="text-white font-medium">{title}</h3>
                    <p className="text-sm text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLIDES */}
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-orange-400 to-rose-500 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(251,146,60,0.3)]">🎥</div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Did You Know?</h2>
                  <p className="text-slate-400 text-sm mt-1">Media & Sustainability — facts about CCIT Building 10</p>
                </div>
              </div>
              <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-2xl p-8 min-h-[160px] flex flex-col justify-center text-center mb-8 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">{slides[slideIndex].title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">{slides[slideIndex].text}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button onClick={() => setSlideIndex((p) => Math.max(p - 1, 0))} disabled={slideIndex === 0}
                  className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  ← Prev
                </button>
                <div className="flex gap-2 items-center">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setSlideIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${i === slideIndex ? "bg-orange-400 w-5 shadow-[0_0_8px_rgba(251,146,60,0.8)]" : "bg-slate-700 hover:bg-slate-500 w-2"}`} />
                  ))}
                </div>
                <button onClick={() => setSlideIndex((p) => Math.min(p + 1, slides.length - 1))} disabled={slideIndex === slides.length - 1}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  Next →
                </button>
              </div>
              <p className="text-center text-slate-500 text-sm mt-4">{slideIndex + 1} / {slides.length}</p>
            </div>
          </div>

          {/* SKILL AREAS */}
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore Skill Areas</h2>
                <p className="text-slate-400">Tap each card to discover how media skills connect to sustainability.</p>
              </div>
              <div className="flex flex-col items-end gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm">
                <div className="text-sm font-medium text-orange-400">{completed} / {totalProjects} Explored</div>
                <div className="flex gap-2">
                  {Object.keys(projects).map((key, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-500 ${badges.includes(key) ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]' : 'bg-slate-700'}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(projects).map(([key, proj]) => {
                const isCompleted = badges.includes(key);
                return (
                  <div key={key} onClick={() => setActiveProject(key)}
                    className="group relative cursor-pointer bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(251,146,60,0.15)] transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent opacity-80 z-10"></div>
                    <img src={proj.image} className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                      <div className="mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded-full">{proj.tag}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <h3 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors drop-shadow-md">{proj.name}</h3>
                        {isCompleted && (
                          <div className="bg-orange-500/20 text-orange-400 p-2 rounded-full backdrop-blur-md border border-orange-500/30 shrink-0 shadow-[0_0_10px_rgba(251,146,60,0.3)] animate-pulse">✓</div>
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
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-orange-400 to-rose-500 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(251,146,60,0.3)]">🧠</div>
                <h2 className="text-3xl font-bold text-white">Sustainability Quiz</h2>
              </div>
              <p className="text-slate-400 text-sm mb-8 ml-[60px]">Test what you know about e-waste, green production, and digital energy use</p>
              <div className="space-y-8">
                {quiz.map((q, i) => (
                  <div key={i} className="bg-[#0a0a0f]/50 border border-white/5 rounded-2xl p-6">
                    <p className="text-lg font-medium text-white mb-4 flex gap-3">
                      <span className="text-orange-400 font-bold">{i + 1}.</span> {q.q}
                    </p>
                    <div className="grid gap-3">
                      {q.options.map((opt, j) => {
                        const isSelected = answers[i] === j;
                        return (
                          <div key={j}
                            onClick={() => { const a = [...answers]; a[i] = j; setAnswers(a); }}
                            className={`flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer border transition-all ${isSelected ? "bg-orange-500/20 border-orange-500 text-white shadow-[0_0_10px_rgba(251,146,60,0.3)]" : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"}`}>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-orange-400" : "border-slate-500"}`}>
                              <div className={`w-2.5 h-2.5 rounded-full bg-orange-400 transition-transform ${isSelected ? "scale-100" : "scale-0"}`}></div>
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
                <button onClick={submitQuiz}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)] transition-all hover:-translate-y-1">
                  Submit Answers
                </button>
                {score !== null && (
                  <div className="flex-1">
                    <div className="flex items-center gap-4 bg-[#0a0a0f]/50 border border-white/10 p-4 rounded-xl">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-emerald-400">{score}/{quiz.length}</div>
                      <div className="flex-1">
                        <p className="text-slate-300 font-medium text-sm">Score achieved</p>
                        {completed === totalProjects && score === quiz.length ? (
                          <div className="text-emerald-400 font-bold text-sm mt-1">🎉 Media Sustainability Champion Unlocked!</div>
                        ) : (
                          <p className="text-slate-500 text-xs mt-1">
                            {completed !== totalProjects ? "Explore all skill areas to unlock the final badge." : "Get a perfect score to become a champion."}
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
                <button onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/10">✕</button>
                <div className="absolute bottom-4 left-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded-full backdrop-blur-md">
                    {projects[activeProject].tag}
                  </span>
                </div>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{projects[activeProject].name}</h2>
                <div className="space-y-4 text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {projects[activeProject].content}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a href={projects[activeProject].link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300 transition-colors">
                    <span>View UDST Programme</span><span className="text-xl">↗</span>
                  </a>
                  <button onClick={() => { if (!badges.includes(activeProject)) setBadges([...badges, activeProject]); setActiveProject(null); }}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                    Mark as Read & Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating mascot */}
        <div className="hidden md:block fixed bottom-10 right-2 z-[100] pointer-events-none">
          <div style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)`, transition: 'transform 0.1s ease-out' }}>
            <div
  className="robot-container animate-float drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]"
  style={{ width: "240px", height: "240px" }}
>
               <div className="robot-glow" />
              <img src="/campus/camera.png" style={{ width: "80%", height: "75%", objectFit: "contain" }} alt="robot" />
            </div>
          </div>
        </div>

      </div>

      {showCelebration && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur"></div>
          <div className="relative text-center animate-pop">
            <h1 className="text-5xl font-extrabold text-white mb-4">🎉 Perfect Score!</h1>
            <p className="text-orange-400 text-lg">You nailed it 🔥</p>
          </div>
          <div className="confetti-container">
            {Array.from({ length: 25 }).map((_, i) => {
              const angle = Math.random() * 2 * Math.PI;
              const distance = 150 + Math.random() * 150;
              return <span key={i} className="confetti" style={{ "--x": `${Math.cos(angle) * distance}px`, "--y": `${Math.sin(angle) * distance}px` }} />;
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