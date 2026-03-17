"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, MapPin, ChevronDown, ChevronUp, Monitor, Shield, Brain, Database, Code2 } from "lucide-react";

const labs = [
  {
    icon: "🔒",
    name: "Cyber Security Lab",
    tag: "Palo Alto Networks",
    color: "#ef4444",
    desc: "Industry-grade tools for ethical hacking, threat detection & incident response.",
    details: "Equipped with industry-grade cybersecurity tools and simulated network environments. Students train in ethical hacking, threat detection, and incident response using real-world scenarios. Fully paperless with energy-efficient workstations and smart power management.",
    sustainability: ["Paperless environment — all exercises are digital", "Energy-efficient workstations with auto sleep mode", "Virtualized environments reduce need for physical hardware"],
  },
  {
    icon: "🤖",
    name: "AI-IoT Lab",
    tag: "AI & IoT Research",
    color: "#3b82f6",
    desc: "Smart sensors, embedded systems & ML models for real-world IoT applications.",
    details: "A dedicated space for building and testing intelligent connected devices. Students work on smart sensors, embedded systems, and ML models for applications like smart buildings and environmental monitoring.",
    sustainability: ["IoT projects include smart energy monitoring systems", "Research into AI-driven sustainability solutions", "Devices tested for low power consumption"],
  },
  {
    icon: "🎥",
    name: "Media Lab",
    tag: "Broadcast Studio",
    color: "#8b5cf6",
    desc: "Green screen studio, professional cameras, lighting rigs & editing suites.",
    details: "A fully equipped broadcast studio used for media production, online content creation, and virtual event hosting — reducing the need for off-campus production facilities.",
    sustainability: ["LED lighting rigs replace traditional high-wattage studio lights", "Digital editing reduces physical media waste", "Enables remote and virtual event production"],
  },
  {
    icon: "📡",
    name: "Huawei Lab",
    tag: "UDST × Huawei",
    color: "#f97316",
    desc: "Enterprise networking, 5G simulation & Huawei HCIA/HCIP certifications.",
    details: "In partnership with Huawei, this lab provides access to enterprise-grade networking equipment, cloud platforms, and 5G simulation tools supporting Huawei HCIA and HCIP certifications.",
    sustainability: ["5G research supports energy-efficient network architectures", "Cloud-based labs reduce on-premise hardware footprint", "Promotes digital transformation aligned with sustainability goals"],
  },
  {
    icon: "☁️",
    name: "UDST G-Lab",
    tag: "Google Cloud",
    color: "#10b981",
    desc: "BigQuery & Vertex AI for large-scale data analytics and AI model development.",
    details: "Powered by Google Cloud, giving students access to BigQuery for large-scale data analytics and Vertex AI for building and deploying ML models — without expensive on-premise infrastructure.",
    sustainability: ["Cloud computing reduces on-premise server energy use", "Google Cloud runs on 100% renewable energy", "Supports AI research into environmental challenges"],
  },
];

const programs = [
  { icon: <Brain size={13} />, title: "MSc AI & Cognitive Cybersecurity", type: "Postgraduate", years: "2 Yrs" },
  { icon: <Database size={13} />, title: "MSc Data Science & AI", type: "Postgraduate", years: "2 Yrs" },
  { icon: <Brain size={13} />, title: "BSc Data Science & AI", type: "Undergraduate", years: "4 Yrs" },
  { icon: <Monitor size={13} />, title: "BSc Information Technology", type: "Undergraduate", years: "4 Yrs" },
  { icon: <Code2 size={13} />, title: "BSc Software Engineering", type: "Undergraduate", years: "4 Yrs" },
  { icon: <Database size={13} />, title: "BSc Information Systems", type: "Undergraduate", years: "4 Yrs" },
  { icon: <Shield size={13} />, title: "BSc Data & Cyber Security", type: "Undergraduate", years: "4 Yrs" },
  { icon: <Monitor size={13} />, title: "Diploma in IT / IS", type: "Diploma", years: "2 Yrs" },
];

function LabCard({ lab }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? `linear-gradient(135deg, ${lab.color}15, ${lab.color}08)` : "rgba(255,255,255,0.06)",
        border: `1px solid ${open ? lab.color + "50" : "rgba(255,255,255,0.1)"}`,
        boxShadow: open ? `0 8px 32px ${lab.color}20` : "0 2px 8px rgba(0,0,0,0.2)",
        transform: open ? "scale(1.01)" : "scale(1)",
      }}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 px-5 py-4 text-left">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-all"
          style={{ background: `linear-gradient(135deg, ${lab.color}30, ${lab.color}15)`, border: `1px solid ${lab.color}40` }}>
          {lab.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-white">{lab.name}</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold"
              style={{ background: `${lab.color}20`, color: lab.color, border: `1px solid ${lab.color}40` }}>
              {lab.tag}
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{lab.desc}</p>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
          style={{ background: open ? lab.color : "rgba(255,255,255,0.1)", color: open ? "#fff" : "rgba(255,255,255,0.4)" }}>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-6 space-y-4 border-t" style={{ borderColor: `${lab.color}25` }}>
          <p className="text-sm leading-relaxed pt-4" style={{ color: "rgba(255,255,255,0.6)" }}>{lab.details}</p>
          <div className="rounded-xl p-4" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4ade80" }}>🌱 Sustainability Contribution</p>
            <ul className="space-y-2">
              {lab.sustainability.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <span style={{ color: "#4ade80", flexShrink: 0 }}>✓</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function SideCard({ emoji, title, children, accent = "rgba(255,255,255,0.08)" }) {
  return (
    <div className="rounded-2xl p-5 transition-all duration-200"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.35)" }}>
        <span className="text-base">{emoji}</span>{title}
      </p>
      {children}
    </div>
  );
}

export default function Building10Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("undergrad");

  const filtered = programs.filter(p =>
    activeTab === "postgrad" ? p.type === "Postgraduate" :
    activeTab === "diploma" ? p.type === "Diploma" :
    p.type === "Undergraduate"
  );

  return (
    <div className="min-h-screen text-white" style={{
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(135deg, #0f1923 0%, #1a2535 40%, #0f1923 100%)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        h1, h2.display { font-family: 'Syne', sans-serif; }
        .stat-card { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .stat-card:hover { transform: translateY(-6px) scale(1.05); }
        .nearby-card { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .nearby-card:hover { transform: translateY(-8px); }
        .program-card { transition: all 0.2s ease; }
        .program-card:hover { transform: translateX(4px); }
      `}</style>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "620px" }}>
        <img src="/campus/ccit.jpg" alt="CCIT"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.3) saturate(0.7)" }} />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(251,191,36,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%), linear-gradient(to bottom, transparent 30%, #0f1923 100%)"
        }} />

        {/* Back */}
        <button onClick={() => router.back()}
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium backdrop-blur-md px-4 py-2 rounded-full transition-all"
          style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          <ArrowLeft size={15} /> Back to Map
        </button>

        <div className="relative px-8 pt-32 pb-16 max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>
              Building 10
            </span>
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}>
              🌱 Sustainability Focus
            </span>
          </div>

          <h1 className="font-black leading-none text-white" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            College of<br />
            <span style={{ background: "linear-gradient(90deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Computing & IT
            </span>
          </h1>
          <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.45)" }}>CCIT · Ground Floor & Floor 1</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-10">
            {[
              { n: "8", l: "Programs", icon: "🎓", c: "#fbbf24" },
              { n: "5", l: "Labs", icon: "🔬", c: "#60a5fa" },
              { n: "2", l: "Floors", icon: "🏢", c: "#a78bfa" },
              { n: "2", l: "Partners", icon: "🤝", c: "#34d399" },
            ].map((s, i) => (
              <div key={i} className="stat-card rounded-2xl px-5 py-4 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)` }}>
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-2xl font-black leading-none" style={{ color: s.c, fontFamily: "'Syne', sans-serif" }}>{s.n}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 grid md:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-12">

          {/* About */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#fbbf24" }}>About</h2>
            <div className="rounded-2xl p-6" style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>
                The College of Computing and IT (CCIT) is where the future gets built. From cybersecurity to AI, software engineering to data science — CCIT equips students with the skills the digital economy demands. With industry-grade labs and real-world partnerships with <strong style={{ color: "#fbbf24", fontWeight: 600 }}>Google</strong> and <strong style={{ color: "#fbbf24", fontWeight: 600 }}>Huawei</strong>, your learning goes far beyond the classroom.
              </p>
            </div>
          </section>

          {/* Programs */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#fbbf24" }}>Programs Offered</h2>
            <div className="flex gap-1.5 mb-5 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {[{ id: "undergrad", l: "Undergraduate" }, { id: "postgrad", l: "Postgraduate" }, { id: "diploma", l: "Diploma" }].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={activeTab === t.id ? { background: "linear-gradient(135deg, #fbbf24, #f97316)", color: "#000", boxShadow: "0 4px 12px rgba(251,191,36,0.4)" } : { color: "rgba(255,255,255,0.4)" }}
                >{t.l}</button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {filtered.map((p, i) => (
                <div key={i} className="program-card flex items-start gap-3 rounded-2xl p-4 cursor-default"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(251,191,36,0.07)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div className="mt-0.5 shrink-0" style={{ color: "#fbbf24" }}>{p.icon}</div>
                  <div>
                    <p className="text-sm font-medium leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>{p.title}</p>
                    <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{p.years}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Labs */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#fbbf24" }}>Labs & Facilities</h2>
            <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>All on Ground Floor · Tap any lab to expand</p>
            <div className="space-y-3">
              {labs.map((lab, i) => <LabCard key={i} lab={lab} />)}
            </div>
          </section>

          {/* Sustainability */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#4ade80" }}>Sustainability Highlights</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "🌿", title: "Energy-efficient labs", desc: "Smart power management cuts idle consumption by up to 40%", c: "#4ade80" },
                { icon: "💡", title: "Smart lighting", desc: "Motion-sensor LEDs on both floors reduce wasted energy", c: "#facc15" },
                { icon: "📄", title: "Digital-first", desc: "Reduced paper waste across all programmes", c: "#60a5fa" },
                { icon: "♻️", title: "Recycling stations", desc: "Paper, plastic & general bins on every floor", c: "#34d399" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5 transition-all duration-200 cursor-default"
                  style={{ background: `linear-gradient(135deg, ${item.c}10, ${item.c}05)`, border: `1px solid ${item.c}25`, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${item.c}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}
                >
                  <span className="text-3xl block mb-3">{item.icon}</span>
                  <p className="text-sm font-bold mb-1.5 text-white">{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What You Can Do */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#fbbf24" }}>What You Can Do</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { tip: "Go paperless", desc: "Use digital notes instead of printing", icon: "📱" },
                { tip: "Save energy", desc: "Turn off systems & lights when done", icon: "⚡" },
                { tip: "Stay hydrated", desc: "Bring a reusable water bottle", icon: "💧" },
                { tip: "Sort your waste", desc: "Use the correct recycling bin", icon: "🗂️" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-2xl p-4 transition-all duration-200 cursor-default"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.08)"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{item.tip}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#fbbf24" }}>Nearby</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: "🌳", label: "Main Courtyard", sub: "—" },
                { icon: "🎭", label: "Auditorium", sub: "Bldg 01" },
                { icon: "🏥", label: "Health Sciences", sub: "Bldg 19" },
                { icon: "🏥", label: "Health Sciences", sub: "Bldg 20" },
                { icon: "💼", label: "College of Business", sub: "Bldg 12" },
              ].map((spot, i) => (
                <div key={i} className="nearby-card flex flex-col items-center text-center gap-2.5 rounded-2xl py-6 px-3 cursor-default"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(251,191,36,0.1)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.35)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(251,191,36,0.2), inset 0 1px 0 rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)"; }}
                >
                  <span className="text-4xl">{spot.icon}</span>
                  <p className="text-sm font-semibold text-white">{spot.label}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>{spot.sub}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">

          {/* Map button */}
          <button onClick={() => router.push("/campus-map?highlight=10")}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 text-sm font-black transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", color: "#000", boxShadow: "0 8px 32px rgba(251,191,36,0.4), inset 0 1px 0 rgba(255,255,255,0.3)" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(251,191,36,0.55), inset 0 1px 0 rgba(255,255,255,0.3)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(251,191,36,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"}
          >
            <MapPin size={16} /> View on Campus Map
          </button>

          {/* Building Info */}
          <SideCard emoji="🏢" title="Building Info">
            {[
              { l: "Number", v: "10" },
              { l: "Short Name", v: "CCIT" },
              { l: "Category", v: "Academic" },
              { l: "Floors", v: "Ground + Floor 1" },
              { l: "Focus", v: "Sustainability" },
            ].map((item, i, arr) => (
              <div key={i} className="flex justify-between items-center py-2.5" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{item.l}</span>
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.78)" }}>{item.v}</span>
              </div>
            ))}
          </SideCard>

          {/* Prayer Rooms */}
          <SideCard emoji="🕌" title="Prayer Rooms">
            {[{ l: "Male", v: "Floor 1" }, { l: "Female", v: "Ground Floor" }].map((r, i) => (
              <div key={i} className="flex justify-between items-center py-2.5" style={{ borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{r.l}</span>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>{r.v}</span>
              </div>
            ))}
          </SideCard>

          {/* Washrooms */}
          <SideCard emoji="🚻" title="Washrooms">
            {[{ l: "Male", v: "Both Floors" }, { l: "Female", v: "Both Floors" }].map((r, i) => (
              <div key={i} className="flex justify-between items-center py-2.5" style={{ borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{r.l}</span>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>{r.v}</span>
              </div>
            ))}
          </SideCard>

          {/* Recycling */}
          <div className="rounded-2xl p-5 transition-all duration-200"
            style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.04))", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "#4ade80" }}>
              ♻️ Recycling Bins
            </p>
            {[{ l: "Paper & Cardboard" }, { l: "Plastic & Cans" }, { l: "General Waste" }].map((r, i) => (
              <div key={i} className="flex justify-between items-center py-2.5" style={{ borderBottom: i < 2 ? "1px solid rgba(34,197,94,0.1)" : "none" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{r.l}</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}>Both Floors</span>
              </div>
            ))}
          </div>

          {/* Vending */}
          <SideCard emoji="🥤" title="Vending Machine">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Drinks & Snacks</span>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>Ground · Lobby</span>
            </div>
          </SideCard>

          {/* Did you know */}
          <div className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(249,115,22,0.06))", border: "1px solid rgba(251,191,36,0.25)", boxShadow: "0 4px 20px rgba(251,191,36,0.1)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#fbbf24" }}>💡 Did You Know?</p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              UDST G-Lab is a revolutionary research hub powered by Google Cloud, supported by the Ministry of Communications and Information Technology. It gives students access to BigQuery, Vertex AI, and RAD Lab for rapid prototyping with Google's world-class engineers. 🚀
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}