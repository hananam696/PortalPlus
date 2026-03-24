"use client";

import { Cpu, Leaf, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AIoTLabPage() {

  const router = useRouter();

  const [activeProject, setActiveProject] = useState(null);
  const [badges, setBadges] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  // 🔥 Mouse tracking
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
      content: `Inspired by UDST’s smart sustainable greenhouse, this system demonstrates solar-powered agriculture adapted to Qatar’s climate.

It uses photovoltaic energy to power cooling, irrigation, and lighting systems, while recycling water from AC condensate and solar panel cleaning.

IoT sensors regulate temperature, humidity, and soil conditions, enabling automated and efficient food production.`
    },

    bins: {
      name: "Smart Waste",
      image: "/campus/smart-bins.png",
      link: "https://www.udst.edu.qa/about-udst/media/news/university-doha-science-and-technology-hosts-more-20000-visitors-its-expo",
      content: `Inspired by smart sustainability initiatives showcased at UDST Expo, this system uses AI and IoT to automate waste management.

Smart bins and sensors enable segregation of materials such as plastic, metal, and glass, improving recycling efficiency.

This reflects UDST’s broader commitment to sustainable waste systems and circular economy practices.`
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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <div className="relative h-[420px] w-full">
        <img src="/campus/buildings/labs/ai-iot-lab.jpg" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-10 left-10">
          <button onClick={() => router.back()} className="mb-4 text-sm text-slate-300 hover:text-white">
            ← Back
          </button>

          <h1 className="text-5xl font-bold">AI & IoT Innovation Lab</h1>
          <p className="text-slate-300 mt-2">Smart Systems • Applied AI • Sustainability</p>

          <span className="inline-block mt-3 px-3 py-1 text-xs bg-emerald-500/20 border border-emerald-400 rounded-full text-emerald-400">
            🌱 Qatar National Vision 2030
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">

        {/* ABOUT */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About the Lab</h2>
            <p className="text-slate-300 text-sm">
              The AI & IoT Lab develops intelligent systems using AI,
              IoT, and data science focused on sustainability and innovation.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p className="flex gap-2 mb-2"><Cpu size={16}/> Workstations</p>
            <p className="flex gap-2 mb-2"><Wifi size={16}/> IoT Devices</p>
            <p className="flex gap-2"><Leaf size={16}/> Sustainability Focus</p>
          </div>
        </div>

        {/* PROJECTS */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(projects).map(([key, proj]) => (
              <div
                key={key}
                onClick={() => setActiveProject(key)}
                className="cursor-pointer bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:scale-[1.03] transition"
              >
                <img src={proj.image} className="h-40 w-full object-cover"/>
                <div className="p-4">
                  <h3 className="font-semibold">{proj.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUIZ */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">🧠 Quiz</h2>

          {quiz.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="text-sm mb-2">{q.q}</p>
              {q.options.map((opt, j) => (
                <label key={j} className="block text-sm text-slate-300">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    onChange={() => {
                      const newAns = [...answers];
                      newAns[i] = j;
                      setAnswers(newAns);
                    }}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button onClick={submitQuiz} className="mt-3 bg-emerald-600 px-4 py-2 rounded-lg">
            Submit
          </button>

          {score !== null && (
            <div className="mt-4">
              <p className="text-emerald-400">Score: {score}/{quiz.length}</p>

              {completed === totalProjects && score === quiz.length && (
                <div className="mt-3 p-3 bg-emerald-600/20 border border-emerald-500 rounded-lg text-emerald-300">
                  🎉 Sustainability Champion Unlocked!
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* MODAL */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200]">
          <div className="bg-slate-900 max-w-xl w-full rounded-xl overflow-hidden">

            <img src={projects[activeProject].image} className="h-48 w-full object-cover"/>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">
                {projects[activeProject].name}
              </h2>

              <p className="text-sm text-slate-300 whitespace-pre-line">
                {projects[activeProject].content}
              </p>

              <a
                href={projects[activeProject].link}
                target="_blank"
                className="inline-block mt-3 text-sm text-emerald-400 hover:underline"
              >
                🔗 Learn more
              </a>

              <button
                onClick={() => {
                  if (!badges.includes(activeProject)) {
                    setBadges([...badges, activeProject]);
                  }
                  setActiveProject(null);
                }}
                className="mt-4 bg-emerald-600 px-4 py-2 rounded-lg"
              >
                Mark as Read & Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🤖 INTERACTIVE ROBOT */}
      <div className="hidden md:block fixed bottom-10 right-2 z-[100] pointer-events-none">

  {/* mouse movement layer */}
  <div
    style={{
      transform: `translate(${mouse.x}px, ${mouse.y}px)`
    }}
  >

    {/* floating layer */}
    <div className="robot-container animate-float">

      <div className="robot-glow" />

      <img
        src="/campus/robot.png"
        style={{
        width: "80%",
        height: "75%",
        objectFit: "contain"
      }}
      />

    </div>

  </div>

</div>

    </div>
  );
}