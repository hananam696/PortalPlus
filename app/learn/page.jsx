"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle, XCircle,
  BookOpen, Trophy, Lock, Clock, RotateCcw, ChevronRight,
} from "lucide-react";
import { writeLeaderboardEntry } from "../../utils/leaderboard";
import { calculateEcoPoints, getCurrentEcoTier, calculateAchievements } from "../../utils/gamification";

// ─────────────────────────────────────────────────────────────
// LEVEL & ACTION_PROMPTS 
// ─────────────────────────────────────────────────────────────

const LEVELS = [
  {
    id: 1,
    slug: "planet-first",
    title: "Planet First",
    subtitle: "What sustainability actually means",
    description: "The foundations. What sustainability is, why technology is part of the problem, and why you — as an IT student — are part of the solution.",
    icon: "🌍",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    accentColor: "bg-emerald-500",
    textColor: "text-emerald-700",
    badgeName: "Earth Defender",
    badgeIcon: "🌍",
    passMark: 70,
    readTimePerSlide: 0.01,
  },
  {
    id: 2,
    slug: "digital-footprint",
    title: "Digital Footprint",
    subtitle: "Every click has a cost",
    description: "The internet is not invisible. Data centres, devices, and networks consume enormous energy. Learn to measure and understand your digital carbon trail.",
    icon: "👣",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    accentColor: "bg-blue-500",
    textColor: "text-blue-700",
    badgeName: "Footprint Tracker",
    badgeIcon: "👣",
    passMark: 70,
    readTimePerSlide: 0.01,
  },
  {
    id: 3,
    slug: "sustainable-systems",
    title: "Sustainable Systems",
    subtitle: "Digital sustainability as a discipline",
    description: "Green IT, circular economy principles, hardware lifecycle thinking, and how professional organisations are formalising sustainability as a core engineering competency.",
    icon: "⚙️",
    color: "from-violet-500 to-purple-500",
    bgColor: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    accentColor: "bg-violet-500",
    textColor: "text-violet-700",
    badgeName: "Systems Thinker",
    badgeIcon: "⚙️",
    passMark: 70,
    readTimePerSlide: 0.01,
  },
  {
    id: 4,
    slug: "green-engineer",
    title: "Green Engineer",
    subtitle: "Sustainability in your code, your decisions, your career",
    description: "The technical content. Algorithmic efficiency, carbon-aware computing, cloud deployment choices, AI energy costs, and the metrics that make sustainability measurable.",
    icon: "🔧",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    accentColor: "bg-orange-500",
    textColor: "text-orange-700",
    badgeName: "Green Engineer",
    badgeIcon: "🔧",
    passMark: 75,
    readTimePerSlide: 0.01,
  },
  {
    id: 5,
    slug: "impact-maker",
    title: "Impact Maker",
    subtitle: "Real projects. Real decisions. Real world.",
    description: "The capstone. Open source sustainability tools, professional ethics obligations, career paths in Green IT, and the decisions you will make in your first year of work.",
    icon: "🚀",
    color: "from-rose-500 to-pink-500",
    bgColor: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200",
    accentColor: "bg-rose-500",
    textColor: "text-rose-700",
    badgeName: "Impact Maker",
    badgeIcon: "🚀",
    passMark: 80,
    readTimePerSlide: 0.01,
  },
];

const ACTION_PROMPTS = [
  "Check the sustainability of a website using WebsiteCarbon.com",
  "Estimate your daily digital carbon footprint",
  "Think about how long your devices last and how to improve it",
  "Measure the energy impact of a coding or cloud decision",
  "Explore a real-world green IT tool or project"
];

// ─────────────────────────────────────────────────────────────
// LEVEL 1 TOPICS — Your team's original work, preserved
// ─────────────────────────────────────────────────────────────

const LEVEL1_TOPICS = [
  {
    id: 1,
    title: "What is Sustainability?",
    icon: "🌍",
    slide: {
      heading: "What is Sustainability?",
      points: [
        "Meeting present needs without harming future generations",
        "Balance between environment, society, and economy",
        "A global responsibility — not just for governments, but for everyone",
      ],
      highlight:
        '"Development that meets the needs of the present without compromising the ability of future generations to meet their own needs." — World Commission on Environment and Development, 1987',
    },
    question: {
      text: "What does sustainability mean in today's world?",
      options: [
        "Using technology without limits",
        "Protecting only the environment",
        "Meeting present needs without harming future generations",
        "Increasing production at any cost",
      ],
      correct: 2,
      explanation:
        "Sustainability means balancing the needs of today without compromising future generations — defined by the World Commission on Environment and Development in 1987. It covers environmental, social, and economic dimensions together.",
    },
  },
  {
    id: 2,
    title: "Why Should You Care?",
    icon: "⚡",
    slide: {
      heading: "Why Should You Care?",
      points: [
        "Technology uses enormous amounts of energy",
        "Data centres alone consume approximately 1-2% of global electricity",
        "Every app, stream, and search has an environmental cost",
      ],
      highlight:
        "As an IT student, the systems you build will have real environmental consequences. Understanding this now changes how you design everything later.",
    },
    question: {
      text: "Why should you care about sustainability in technology as a student?",
      options: [
        "Technology has no environmental impact",
        "Technology uses energy and creates environmental effects",
        "Technology only helps businesses grow",
        "Technology replaces natural resources",
      ],
      correct: 1,
      explanation:
        "Digital technologies consume significant energy and produce environmental impacts including e-waste and carbon emissions. Future IT professionals must understand this to make responsible decisions in their careers.",
    },
  },
  {
    id: 3,
    title: "Negative Impacts of Technology",
    icon: "♻️",
    slide: {
      heading: "Negative Impacts of Technology",
      points: [
        "Electronic waste (e-waste) — the fastest growing waste stream globally at 62 million metric tonnes in 2022",
        "Environmental damage from hardware manufacturing and disposal including toxic materials",
        "Carbon emissions from data centres, device manufacturing, and daily device usage",
      ],
      highlight:
        "Only 22.3% of global e-waste in 2022 was formally documented as properly recycled. The remainder was landfilled, incinerated, or informally processed in hazardous conditions.",
    },
    question: {
      text: "Which of the following is a negative impact of technology on the environment?",
      options: [
        "Smart energy systems",
        "Environmental monitoring tools",
        "Electronic waste (e-waste)",
        "Sustainable software design",
      ],
      correct: 2,
      explanation:
        "E-waste is one of the fastest-growing waste streams globally, with 62 million metric tonnes generated in 2022. Smart energy systems and monitoring tools are positive applications of technology.",
    },
  },
  {
    id: 4,
    title: "Technology Supporting Sustainability",
    icon: "🌱",
    slide: {
      heading: "Technology as a Solution",
      points: [
        "Smart energy systems that optimise power usage in buildings and grids",
        "Environmental monitoring tools using IoT sensors to track pollution and resource use",
        "Data-driven decision-making for resource management and waste reduction",
      ],
      highlight:
        "Technology is both a cause of sustainability challenges and the most powerful tool available for solving them. Which role it plays depends on the decisions of the people who build it.",
    },
    question: {
      text: "Which of the following shows how technology can support sustainability?",
      options: [
        "Increasing energy consumption",
        "Producing more electronic waste",
        "Smart systems that improve energy efficiency",
        "Ignoring environmental impact",
      ],
      correct: 2,
      explanation:
        "Smart systems that improve energy efficiency are a key example of IT enabling sustainability goals — particularly UN SDGs 9 (Innovation) and 13 (Climate Action).",
    },
  },
  {
    id: 5,
    title: "Three Dimensions of Sustainability",
    icon: "🔍",
    slide: {
      heading: "The Three Dimensions",
      points: [
        "Environmental impact — carbon emissions, e-waste, energy consumption, resource extraction",
        "Social impact — digital inclusion, fair labour in supply chains, ethics, equity of access",
        "Economic impact — cost efficiency, long-term value, avoiding waste in business operations",
      ],
      highlight:
        "Understanding all three dimensions together is what makes a truly sustainability-aware IT professional. Solving one while ignoring the others is not sustainability — it is displacement.",
    },
    question: {
      text: "Sustainability awareness means understanding which impacts of technology?",
      options: [
        "Financial impacts only",
        "Environmental, social, and economic impacts",
        "Educational impacts only",
        "Industrial impacts only",
      ],
      correct: 1,
      explanation:
        "Sustainability is a three-part framework covering environmental, social, and economic dimensions simultaneously. Focusing on only one gives an incomplete and sometimes misleading picture.",
    },
  },
  {
    id: 6,
    title: "Knowledge, Attitude, Behaviour",
    icon: "📚",
    slide: {
      heading: "How Awareness Becomes Action",
      points: [
        "Knowledge — understanding sustainability concepts, frameworks, and the scale of the problem",
        "Attitude — developing a sense of professional responsibility for the systems you build",
        "Behaviour — actually applying sustainable practices in your daily work decisions",
      ],
      highlight:
        "Research shows that knowledge alone does not change behaviour. The gap between knowing something is wrong and changing how you work is where sustainability education either succeeds or fails.",
    },
    question: {
      text: "What is one important part of sustainability awareness?",
      options: [
        "Understanding sustainability concepts",
        "Advertising strategies",
        "Marketing skills",
        "Networking tools",
      ],
      correct: 0,
      explanation:
        "Understanding sustainability concepts is the cognitive foundation of awareness. Without this knowledge it is difficult to develop responsible professional attitudes or make informed sustainable decisions.",
    },
  },
  {
    id: 7,
    title: "Your Role as an IT Student",
    icon: "💻",
    slide: {
      heading: "Your Role Starts Now",
      points: [
        "Make responsible decisions in the systems you design from the very first project",
        "Build applications and platforms that consider their environmental cost",
        "Create sustainable technology solutions for problems that actually matter",
      ],
      highlight:
        "Future IT graduates are expected by employers, professional bodies, and society to embed sustainability into their professional practice. This is not optional extra credit. It is the baseline.",
    },
    question: {
      text: "Why is it important for you as an IT student to learn sustainability?",
      options: [
        "To reduce your academic workload",
        "To design and build responsible and sustainable technology",
        "To avoid programming",
        "To increase hardware production",
      ],
      correct: 1,
      explanation:
        "IT students are the future designers of digital systems. Learning sustainability ensures they build technology that is responsible, energy-efficient, and socially beneficial.",
    },
  },
  {
    id: 8,
    title: "Green IT as a Field",
    icon: "🖥️",
    slide: {
      heading: "Green IT Is Now a Recognised Field",
      points: [
        "Green IT covers designing energy-efficient computing systems and infrastructure",
        "Sustainable software engineering — writing code that uses fewer resources to do the same work",
        "E-waste management, hardware lifecycle thinking, and circular economy principles in technology",
        "Real-world projects that address environmental challenges using data and computing",
      ],
      highlight:
        "Green IT is not a niche specialism. It is becoming a baseline competency expected of all IT professionals — the same way code security is no longer optional.",
    },
    question: {
      text: "Which of the following is an example of a sustainability-related topic in IT?",
      options: [
        "Green IT practices",
        "Video editing",
        "Graphic design",
        "Social media marketing",
      ],
      correct: 0,
      explanation:
        "Green IT covers environmentally sustainable computing practices including energy-efficient systems, responsible hardware use, and sustainable software design.",
    },
  },
  {
    id: 9,
    title: "Learning Through Real Projects",
    icon: "🎯",
    slide: {
      heading: "How You Learn This Best",
      points: [
        "Working on real-world projects is the most effective way to develop genuine sustainability awareness",
        "Universities should embed sustainability across all IT courses — not just one dedicated module",
        "Programming environments and systems analysis are the best tools for exploring sustainability in IT",
        "A major challenge globally is that many IT programmes still lack instructors confident in this area",
      ],
      highlight:
        "The student who builds a system that measures its own carbon emissions learns more about sustainable computing in one project than a student who reads ten textbook chapters about it.",
    },
    question: {
      text: "Which learning approach helps you better understand sustainability in IT?",
      options: [
        "Memorising theory only",
        "Working on real-world projects",
        "Ignoring practical issues",
        "Only listening to lectures",
      ],
      correct: 1,
      explanation:
        "Project-based learning is the most frequently reported and effective approach for sustainability education in IT — it connects theory to the actual decisions engineers make.",
    },
  },
  {
    id: 10,
    title: "How Universities Can Help",
    icon: "🏫",
    slide: {
      heading: "What Good Sustainability Education Looks Like",
      points: [
        "Including sustainability as a core topic across IT courses, not just an elective",
        "Fostering industry collaboration on real sustainability projects with genuine impact",
        "Developing clear guidelines and competency frameworks for what graduates should know",
        "Training lecturers to confidently teach Green IT — the knowledge gap in faculty is real",
      ],
      highlight:
        "When institutions commit to sustainability education, students graduate ready to build systems that do less harm and more good. The alternative is graduating professionals who will spend careers making preventable mistakes.",
    },
    question: {
      text: "How can universities better support your learning of sustainability?",
      options: [
        "Remove sustainability topics",
        "Include sustainability in IT courses",
        "Avoid industry collaboration",
        "Reduce student projects",
      ],
      correct: 1,
      explanation:
        "Embedding sustainability across IT courses ensures all students graduate with the awareness and skills needed for responsible technology practice.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// LEVEL 2 TOPICS — Digital Footprint
// ─────────────────────────────────────────────────────────────

const LEVEL2_TOPICS = [
  {
    id: 1,
    title: "The Internet's Energy Appetite",
    icon: "🌐",
    slide: {
      heading: "The Internet Runs on Electricity",
      points: [
        "The global internet infrastructure — data centres, networks, and devices — consumes approximately 4-6% of global electricity, a figure that doubles roughly every four years",
        "Watching one hour of Netflix in HD generates approximately 36 grams of CO₂ — multiply that by Netflix's 247 million subscribers and the scale becomes industrial",
        "A single Google search consumes around 0.3 watt-hours of energy. Google processes approximately 8.5 billion searches per day. That is 2.5 million kilowatt-hours daily from search alone",
        "Email with a large attachment has a carbon footprint of approximately 50 grams of CO₂. Spam emails — sent at 45 billion per day globally — collectively emit more carbon than a small country",
      ],
      highlight:
        "The internet feels weightless because you cannot see or touch its infrastructure. But every byte you send, store, or receive is physically processed by machines consuming electricity generated somewhere on earth.",
    },
    question: {
      text: "A company's employees send an average of 50 internal emails per person per day, each with a 1MB attachment. The company has 800 employees. Which change has the biggest immediate impact on the company's digital carbon footprint?",
      options: [
        "Ask employees to use dark mode on their email client",
        "Replace attachment-heavy emails with a shared cloud document that is linked rather than attached",
        "Reduce email font size to use less screen space",
        "Move the email server to a newer building",
      ],
      correct: 1,
      explanation:
        "Sending a 1MB attachment 800 times per day means 800 copies of that file are transmitted and stored. A shared link transmits the file once and stores it once. At scale this represents a dramatic reduction in data transfer and storage energy. Dark mode reduces screen brightness marginally. Font size has no effect on data. Building location is unrelated to email energy.",
    },
  },
  {
    id: 2,
    title: "What a Data Centre Actually Is",
    icon: "🏭",
    slide: {
      heading: "The Buildings Your Software Lives In",
      points: [
        "A data centre is a facility housing thousands of servers, cooling systems, power systems, and network equipment — all running continuously, every second of every day",
        "Cooling is the largest non-computing energy cost in most data centres — servers generate enormous heat and must be kept below operating temperature or they fail",
        "Power Usage Effectiveness (PUE) measures efficiency: a PUE of 1.0 means every watt goes to computing. The global average is 1.58, meaning 58% extra energy is wasted on overhead",
        "Hyperscale data centres operated by Google, Microsoft, and Amazon achieve PUEs below 1.2 through liquid cooling, AI-driven temperature management, and strategic geographic placement",
      ],
      highlight:
        "The best data centres in the world waste 20% of their energy before a single computation runs. The average data centre wastes 58%. When you deploy your application, you are renting space in one of these buildings.",
    },
    question: {
      text: "A data centre has a PUE of 2.1. This means that for every 1,000 watts used by the servers doing actual computing work, approximately how many additional watts are consumed by the facility?",
      options: [
        "210 additional watts",
        "1,100 additional watts",
        "21 additional watts",
        "The PUE tells you nothing about wasted energy",
      ],
      correct: 1,
      explanation:
        "A PUE of 2.1 means the total facility power is 2.1 times the IT equipment power. So 1,000W of computing requires 2,100W total — meaning 1,100W is wasted on cooling, lighting, and power conversion. This is an exceptionally inefficient facility. The global average PUE of 1.58 would waste 580W per 1,000W of compute.",
    },
  },
  {
    id: 3,
    title: "Your Phone's Hidden Supply Chain",
    icon: "📱",
    slide: {
      heading: "What It Takes to Make a Smartphone",
      points: [
        "A typical smartphone contains approximately 62 different metals, including rare earth elements mined in conditions with significant environmental and human rights consequences",
        "Manufacturing a smartphone produces approximately 70kg of CO₂ equivalent — the majority of its entire lifetime carbon footprint before it is ever switched on",
        "Coltan, used in capacitors in virtually every smartphone, is primarily mined in the Democratic Republic of Congo under conditions linked to conflict, child labour, and severe environmental damage",
        "The average smartphone replacement cycle in developed countries is 2.5 years — driven largely by software decisions that make older phones feel slow, not by hardware failure",
      ],
      highlight:
        "The most sustainable phone is the one already in your pocket. Every decision a software developer makes about minimum system requirements either extends or shortens the useful life of existing devices for millions of people.",
    },
    question: {
      text: "A mobile app development team is deciding minimum supported Android version. Supporting Android 8 (released 2017) means more complex testing. Supporting Android 11 (released 2020) is easier. Approximately what percentage of global Android users would be excluded by requiring Android 11?",
      options: [
        "About 5% — most people upgrade regularly",
        "About 15% — a small but manageable minority",
        "About 30-40% — a significant portion of global users, predominantly in lower-income markets",
        "The Android version decision has no sustainability implications",
      ],
      correct: 2,
      explanation:
        "As of recent data, approximately 30-40% of active Android devices globally run versions older than Android 11. These users are disproportionately in lower-income and developing markets where device replacement cycles are longer. Requiring a newer Android version excludes these users from your application and pressures device upgrades. This is simultaneously a social sustainability failure and an e-waste accelerator.",
    },
  },
  {
    id: 4,
    title: "Cloud vs Local: What Actually Uses More",
    icon: "☁️",
    slide: {
      heading: "Where Your Computation Should Live",
      points: [
        "Running computation locally on a user's device uses that device's battery and CPU, but avoids the network transmission energy cost and data centre overhead",
        "Running computation in the cloud centralises energy use in (potentially more efficient) data centres and reduces device load, but adds network energy costs for every request",
        "On-device AI inference (running a model locally) uses more device battery but eliminates server round-trips — for frequent, simple tasks this is often the more efficient choice",
        "The right answer depends on: how often the computation runs, how efficient the local device is, how efficient the data centre is, and how much data needs to travel across the network",
      ],
      highlight:
        "There is no universally correct answer between cloud and local computation. The sustainable engineer asks the question, estimates the numbers, and decides based on evidence — not default assumptions.",
    },
    question: {
      text: "A spelling correction feature for a text editor runs every time a user types a word. Which deployment approach is most energy-efficient?",
      options: [
        "Send every word to a cloud API for spell-checking as the user types",
        "Run a small, optimised spell-check model locally on the user's device",
        "Only check spelling when the document is saved",
        "Use a cloud database lookup for every word",
      ],
      correct: 1,
      explanation:
        "Spell-checking is a frequent, lightweight operation. Sending every keystroke to a cloud API creates network requests for every word typed — at millions of users this is enormous unnecessary network and server load. A small local model runs on existing device compute with no network cost. Checking only on save is a UX failure unrelated to sustainability. A database lookup per word is the worst possible approach — high latency, high server load, and poor user experience.",
    },
  },
  {
    id: 5,
    title: "Streaming, Storage, and the Rebound Effect",
    icon: "📺",
    slide: {
      heading: "Why Efficiency Gains Do Not Always Help",
      points: [
        "Video compression technology has improved by over 90% in efficiency in the past decade — the same video quality now requires a fraction of the data it once did",
        "Yet total internet video traffic has increased by over 3,000% in the same period — efficiency gains were consumed by increased demand, a phenomenon called the Jevons Paradox or rebound effect",
        "Cloud storage has become so cheap that most organisations store data indefinitely rather than deleting it — global data storage is doubling every two years, consuming increasing energy regardless of efficiency improvements",
        "Autoplay, infinite scroll, push notifications, and algorithmic recommendation feeds are design patterns specifically engineered to increase consumption — they are sustainability problems with a business model",
      ],
      highlight:
        "Making technology more efficient does not automatically reduce its environmental impact if the efficiency improvement is reinvested in more consumption. Sustainable design requires intentional constraints, not just technical optimisation.",
    },
    question: {
      text: "A video platform improves its compression algorithm, reducing video file sizes by 40%. The platform decides to automatically upgrade all users to higher quality settings to use their improved bandwidth capacity. What sustainability principle does this decision violate?",
      options: [
        "The precautionary principle",
        "The rebound effect — efficiency gains are consumed by increased usage rather than reducing total resource consumption",
        "The polluter pays principle",
        "The circular economy principle",
      ],
      correct: 1,
      explanation:
        "This is a textbook example of the rebound effect. A 40% efficiency improvement that is immediately reinvested in 40% more consumption produces zero net reduction in energy use. Sustainable platform design would offer users the choice to maintain current quality and benefit from reduced data use, rather than defaulting to consuming the efficiency gain as higher quality.",
    },
  },
  {
    id: 6,
    title: "Measuring Your Digital Carbon",
    icon: "📏",
    slide: {
      heading: "Tools That Already Exist",
      points: [
        "Website Carbon Calculator (websitecarbon.com) measures the CO₂ produced per page visit based on data transfer, hosting energy source, and user device energy",
        "The average web page has grown from 500KB in 2011 to over 2MB in 2024 — a 300% increase with no corresponding increase in user value or functionality",
        "Google PageSpeed Insights and Lighthouse include energy efficiency signals in their scoring — a fast website is almost always a more sustainable website",
        "Browser developer tools show you exactly how much data your page loads, where it comes from, and how long it takes — this is also your sustainability dashboard",
      ],
      highlight:
        "Open your browser developer tools on any website you have built. Look at the Network tab. Every line is a request that costs energy. Every kilobyte is data that had to be stored, transmitted, and rendered. You can see your footprint in real time.",
    },
    question: {
      text: "A university student portfolio website loads 4.2MB of assets including uncompressed images, three different font families, and two analytics tracking scripts from third-party providers. Which intervention reduces its carbon footprint most significantly?",
      options: [
        "Switch the website to a green hosting provider",
        "Remove the analytics scripts, compress all images to WebP format, and use a single system font instead of three custom fonts",
        "Add a 'this website is eco-friendly' badge to the homepage",
        "Reduce the number of pages on the site",
      ],
      correct: 1,
      explanation:
        "Data transfer is the primary driver of website carbon footprint. Compressing images typically reduces their file size by 60-85%. Removing third-party scripts eliminates additional requests to external servers. System fonts require zero downloads. These three changes can reduce a 4.2MB page to under 400KB — a 90% reduction in data transfer and approximately 90% reduction in carbon per visit. Green hosting helps but is secondary to reducing the data that must be transferred and processed.",
    },
  },
  {
    id: 7,
    title: "Social Media and Attention Economics",
    icon: "📱",
    slide: {
      heading: "The Sustainability of Attention",
      points: [
        "The average person spends 6 hours 37 minutes per day on screens globally — the infrastructure required to serve this demand is one of the fastest-growing energy consumers on earth",
        "Social media platforms are engineered to maximise time-on-platform through infinite scroll, variable reward notifications, and algorithmic amplification of emotionally activating content",
        "The carbon cost of 1 hour of social media browsing is approximately 50-150 grams of CO₂ depending on device and network — multiplied by 4.9 billion social media users this is a measurable industrial emission",
        "As a future developer you will be asked to implement features designed to increase engagement metrics — understanding when these features conflict with user wellbeing and environmental sustainability is a professional competency",
      ],
      highlight:
        "Engagement time is not a neutral technical metric. It is a design goal with environmental and social consequences. The developer who implements infinite scroll without questioning it is making a sustainability decision by default.",
    },
    question: {
      text: "You are a junior developer at a social media company. Your manager asks you to implement an infinite scroll feature that removes the 'You are all caught up' message that currently stops users from scrolling after seeing all new content. The expected outcome is a 23% increase in average session length. How should you respond professionally?",
      options: [
        "Implement it immediately — increasing engagement is a core business objective",
        "Refuse to implement it on ethical grounds",
        "Implement it but raise the user wellbeing and energy consumption implications with your manager before doing so, documenting your concern",
        "It is not a developer's responsibility to question product decisions",
      ],
      correct: 2,
      explanation:
        "Professional responsibility does not require refusing business instructions, but it does require raising material concerns. A 23% increase in session length multiplied by millions of users has quantifiable energy and carbon consequences. User wellbeing research consistently shows that engineered over-consumption of social media is harmful. Raising this professionally — with data, not just opinion — is exactly what the ACM Code of Ethics requires of computing professionals. You implement the decision made by the informed stakeholder, but you ensure they are informed.",
    },
  },
  {
    id: 8,
    title: "The Carbon Cost of Sending Data",
    icon: "📡",
    slide: {
      heading: "Every Byte Has a Weight",
      points: [
        "Transmitting 1GB of data over a mobile network consumes approximately 0.037 kWh — over WiFi this is roughly 0.004 kWh. Mobile data transmission is approximately 10x more energy-intensive than WiFi",
        "Video calls: a one-hour video call consumes approximately 150-1,000 grams of CO₂ depending on platform and quality settings. Turning off video during audio-only discussions reduces this by 96%",
        "API response sizes matter: returning 50 fields of data when the client needs 5 fields is sending 10x more data than necessary, multiplied by every API call, every user, every day",
        "GraphQL was invented partly to solve this problem — clients specify exactly what data they need, servers send exactly that, reducing over-fetching that is common in REST APIs",
      ],
      highlight:
        "Every time you design an API that returns more data than the client needs, you are burning energy. Every time you send a full object when an ID would do, you are burning energy. API design is sustainability design.",
    },
    question: {
      text: "A REST API endpoint for a mobile app returns a user profile object with 47 fields including full profile data, preferences, history, and settings. The mobile app's profile card displays 6 of these fields. What is the most sustainable architectural improvement?",
      options: [
        "Compress the API response with gzip — this reduces data transfer",
        "Create a dedicated lightweight endpoint or use GraphQL projections that return only the 6 fields the mobile app actually uses",
        "Cache the full 47-field response so it does not need to be fetched again for one hour",
        "Paginate the response to send fields in smaller batches",
      ],
      correct: 1,
      explanation:
        "Gzip compression helps but compresses data that should not be sent at all. Caching reduces repeat fetches but the first fetch and any cache miss still transfers 47 fields when 6 are needed. Pagination sends the same total data in smaller pieces. The only correct solution is to not send unnecessary data. Over-fetching in APIs is one of the most common and easily preventable sources of wasted data transfer in production systems.",
    },
  },
  {
    id: 9,
    title: "Green Hosting: What to Look For",
    icon: "🟢",
    slide: {
      heading: "Where Your Application Lives Matters",
      points: [
        "Green hosting providers power their data centres with renewable energy — wind, solar, hydroelectric — either directly or through renewable energy certificates (RECs)",
        "The Green Web Foundation maintains a public database of verified green hosting providers at thegreenwebfoundation.org — it is free to check any domain",
        "Not all 'green' claims are equal: owning renewable energy generation is more credible than purchasing carbon offsets, which are frequently criticised for lack of verifiability",
        "Geographic region affects carbon intensity independently of provider claims: Iceland's grid runs on nearly 100% geothermal and hydro power; Poland's grid is approximately 70% coal",
      ],
      highlight:
        "Choosing a hosting provider is a procurement decision with a carbon consequence. Asking 'what is the PUE of your data centres and what percentage of your energy is renewable?' is a reasonable professional question to ask any cloud or hosting vendor.",
    },
    question: {
      text: "You are evaluating two hosting providers for a new web application. Provider A is located in a region with a grid carbon intensity of 400g CO₂/kWh and claims to purchase carbon offsets. Provider B is located in a region with a grid carbon intensity of 80g CO₂/kWh and makes no green claims. Which is the more sustainable choice based on this information alone?",
      options: [
        "Provider A — because they have an active sustainability commitment through offsets",
        "Provider B — because the actual energy used is 5x less carbon-intensive regardless of offset claims",
        "They are equivalent — offsets should fully neutralise Provider A's carbon",
        "It cannot be determined without knowing both providers' PUE",
      ],
      correct: 1,
      explanation:
        "Carbon offsets are a secondary mitigation, not a solution. The carbon was still emitted at 400g/kWh — offsets theoretically compensate elsewhere, but with significant verification problems in practice. Running the same workload on Provider B at 80g CO₂/kWh means 5x less carbon is emitted in the first place. The most sustainable energy is energy that was never emitted. This is why grid carbon intensity data is more reliable than offset claims for comparing true sustainability.",
    },
  },
  {
    id: 10,
    title: "Your Digital Footprint Right Now",
    icon: "🪶",
    slide: {
      heading: "Starting From Where You Are",
      points: [
        "The average IT student's annual digital carbon footprint from streaming, browsing, cloud storage, and communication apps is approximately 100-200kg CO₂ equivalent",
        "Simple interventions with measurable impact: lowering streaming quality from 4K to 1080p reduces energy per hour by 86%; deleting cloud files you no longer need reduces storage energy proportionally",
        "Professional habits to start now: optimise images before uploading, question whether real-time sync is necessary, design APIs to return minimum required data, measure before deploying",
        "The shift from individual consumer choices to professional systemic decisions is where your impact multiplies — one well-designed application used by 100,000 people affects far more carbon than your personal streaming choices",
      ],
      highlight:
        "Your personal digital footprint is a starting point for developing instincts. Your professional footprint — the systems you build, the architectures you choose, the code you write — is where your real environmental impact will be determined.",
    },
    question: {
      text: "Which of the following actions has the highest ratio of carbon reduction to effort for an IT student right now?",
      options: [
        "Switching to a vegetarian diet to reduce personal food emissions",
        "Deleting all personal cloud backups to reduce storage energy",
        "Learning to measure and optimise the energy efficiency of code you write, so every application you build professionally is more efficient",
        "Uninstalling social media apps from your phone",
      ],
      correct: 2,
      explanation:
        "Personal behaviour changes have individual-scale impact. Professional skills have population-scale impact. Learning to write energy-efficient code and measure software carbon is a skill you apply to every project for your entire career, affecting every user of every application you build. This single professional habit has higher total carbon reduction potential than any individual lifestyle change. The vegetarian diet reduces your personal food emissions — important, but unrelated to your professional leverage as an IT professional.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// LEVEL 3 TOPICS — Sustainable Systems
// ─────────────────────────────────────────────────────────────

const LEVEL3_TOPICS = [
  {
    id: 1,
    title: "What Digital Sustainability Actually Means",
    icon: "🔄",
    slide: {
      heading: "Digital Sustainability as a Discipline",
      points: [
        "Digital sustainability is not just 'using technology for environmental goals' — it is the practice of designing, building, and operating digital systems in ways that are themselves sustainable",
        "The discipline covers three distinct but related areas: sustainability of IT (making technology itself less harmful), sustainability through IT (using technology to solve environmental problems), and sustainability in IT education (training professionals to do both)",
        "ISO/IEC JTC 1/SC 42 is developing international standards for AI sustainability. The Green Software Foundation has published the Software Carbon Intensity (SCI) specification as an ISO standard. These are professional frameworks you will work within",
        "Digital sustainability is distinct from corporate social responsibility reporting — it requires technical decisions, measurable outcomes, and engineering accountability, not just policy statements",
      ],
      highlight:
        "When a company says 'we are committed to net zero by 2030,' the people who will determine whether that commitment is honoured are the engineers building the systems that consume or conserve energy. That means you.",
    },
    question: {
      text: "Which of the following best describes the relationship between 'sustainability of IT' and 'sustainability through IT'?",
      options: [
        "They are the same thing — using green data centres achieves both",
        "Sustainability of IT means making technology itself less harmful; sustainability through IT means using technology to solve environmental problems — both are necessary and neither substitutes for the other",
        "Sustainability through IT is more important because it has larger scale impact",
        "Sustainability of IT is more important because it addresses the root cause",
      ],
      correct: 1,
      explanation:
        "A company that uses AI to optimise wind farm energy generation (sustainability through IT) but runs that AI on coal-powered servers with no code efficiency considerations (ignoring sustainability of IT) has not achieved digital sustainability. Similarly, a perfectly optimised, renewable-powered application that has no environmental mission (sustainability of IT without through IT) is not the full picture. Both dimensions are required and neither cancels out failures in the other.",
    },
  },
  {
    id: 2,
    title: "The Circular Economy in Hardware",
    icon: "🔁",
    slide: {
      heading: "Hardware Should Not Be Disposable",
      points: [
        "The circular economy applies to hardware through four principles: design for longevity (hardware that lasts), repairability (hardware that can be fixed), recyclability (materials that can be recovered), and reuse (hardware that passes to second owners)",
        "Framework Laptop is a commercial example of fully modular laptop design — individual components including screen, battery, keyboard, and ports can be replaced by users with a screwdriver, eliminating the need to replace the entire device",
        "Right to Repair legislation is being enacted in the EU and some US states, legally requiring manufacturers to provide repair parts and documentation — this is policy driven by engineering decisions about product design",
        "Refurbished enterprise hardware — used servers and networking equipment from large organisations — has a fraction of the carbon footprint of new equipment and is widely available at significantly lower cost",
      ],
      highlight:
        "The most sustainable hardware decision for most organisations is not buying the newest equipment — it is maximising the productive lifespan of existing equipment. Software that runs well on older hardware directly enables this.",
    },
    question: {
      text: "An organisation is replacing its entire fleet of 500 laptops because the IT department has specified a new software platform with minimum requirements that exceed the specifications of the existing 3-year-old devices. The existing devices are fully functional. Who bears the most direct responsibility for this e-waste outcome?",
      options: [
        "The hardware manufacturer who did not make the devices more powerful",
        "The software engineers who specified minimum requirements without considering the existing hardware fleet",
        "The organisation's finance department for not budgeting for hardware upgrades sooner",
        "The users who did not maintain their devices properly",
      ],
      correct: 1,
      explanation:
        "This is a direct consequence of software engineering decisions. The devices are functional. The software requirements exceeded what was necessary given the organisation's existing hardware. Software minimum requirements are engineering decisions with hardware replacement consequences. The ACM Code of Ethics requires computing professionals to assess and report the broader impacts of their decisions — hardware lifecycle impact is within scope of that obligation.",
    },
  },
  {
    id: 3,
    title: "Software Architecture and Energy",
    icon: "🏗️",
    slide: {
      heading: "Architecture Decisions Are Energy Decisions",
      points: [
        "Microservices architecture versus monolithic architecture is not just an organisational convenience decision — microservices add network overhead for every inter-service call, potentially increasing energy consumption versus a well-designed monolith for the same task",
        "Serverless computing (AWS Lambda, Azure Functions) can reduce idle energy consumption dramatically — you pay for and consume energy only during execution, eliminating the always-on server",
        "Event-driven architecture versus polling: a system that checks for updates every second wastes energy on 99.9% of those checks if updates are infrequent — event-driven push notification is more energy-efficient for sparse event patterns",
        "Database architecture: normalised relational databases require joins that consume CPU; denormalised databases reduce query complexity at the cost of storage — the energy trade-off depends on read-write ratio and query frequency",
      ],
      highlight:
        "Every architectural pattern was invented to solve a problem. Understanding the energy implications of those patterns — alongside their scalability, maintainability, and reliability implications — is what separates a thoughtful engineer from one who follows templates.",
    },
    question: {
      text: "A monitoring application checks a server's status by making an API request every 5 seconds, 24 hours a day. The server's status actually changes approximately 3 times per month. What architectural change most reduces energy consumption while maintaining the same monitoring capability?",
      options: [
        "Reduce polling frequency to every 30 seconds",
        "Replace polling with a webhook that pushes a notification to the monitoring application only when the server status actually changes",
        "Use a faster server so each poll completes more quickly",
        "Cache the status response for 5 minutes",
      ],
      correct: 1,
      explanation:
        "Polling every 5 seconds produces 518,400 API requests per month. With 3 actual status changes per month, 518,397 of those requests are unnecessary. A webhook (event-driven push) produces exactly 3 notifications per month — the ones that contain actual information. This reduces request volume by 99.9994%. Reducing to 30-second polling still produces 86,400 monthly requests. Caching helps for repeat reads but does not address the fundamental problem that most polls return unchanged data. Webhook architecture is the correct solution.",
    },
  },
  {
    id: 4,
    title: "Green Software Engineering Standards",
    icon: "📋",
    slide: {
      heading: "The Professional Standards Emerging Now",
      points: [
        "The Green Software Foundation's Software Carbon Intensity (SCI) specification defines a method for calculating the carbon intensity of software as grams of CO₂ equivalent per unit of functional work — this is becoming an ISO standard (ISO/IEC 21031)",
        "The Cloud Carbon Footprint tool (open source, from Thoughtworks) provides actual energy and carbon data for workloads running on AWS, Azure, and Google Cloud — it is free and widely used in enterprise engineering teams",
        "DIMPACT is an industry consortium tool used by Netflix, BBC, and others to measure the carbon footprint of digital content delivery — demonstrating that media companies are treating this as a measurable engineering problem",
        "The Green Web Foundation operates a public API that returns the green hosting status of any domain — it is used by developers to display accurate energy information and by researchers to track industry progress",
      ],
      highlight:
        "These tools are not academic exercises. They are production instruments used by engineering teams at major technology companies to make measurable, accountable sustainability commitments. Learning them now is professional preparation.",
    },
    question: {
      text: "You want to add carbon footprint reporting to a cloud-based application running on AWS. The product manager wants to show customers the emissions associated with their usage. Which is the most technically accurate approach?",
      options: [
        "Estimate it manually based on your monthly AWS bill",
        "Use the AWS Customer Carbon Footprint Tool or an open source tool like Cloud Carbon Footprint to retrieve actual measured emissions data tied to your specific service usage",
        "Display a generic industry average and note it is approximate",
        "Carbon footprint cannot be measured at the application level — only at the data centre level",
      ],
      correct: 1,
      explanation:
        "AWS provides a Customer Carbon Footprint Tool that gives actual measured emissions data by service, region, and time period. Cloud Carbon Footprint (open source) provides even more granular analysis including energy breakdown by compute, storage, and networking. These tools exist specifically for this use case. Estimation from billing data is inaccurate because cost does not correlate linearly with energy. Industry averages are meaningless for customer-specific reporting. Application-level carbon measurement is not only possible — it is a standard practice at engineering teams today.",
    },
  },
  {
    id: 5,
    title: "Sustainable Database Design",
    icon: "🗄️",
    slide: {
      heading: "The Database Is Your Biggest Energy Consumer",
      points: [
        "For most web applications, the database layer consumes more server energy than the application layer — slow queries, missing indexes, and poor schema design are energy problems as much as performance problems",
        "Time-series data retention policies: storing every sensor reading forever versus retaining 90-day high-resolution data with 1-year aggregated summaries can reduce storage by 95% with no loss of analytical value for most use cases",
        "Write amplification in databases — where a single logical write produces multiple physical writes — is a significant energy cost in write-heavy systems. Understanding your database's write behaviour affects energy consumption",
        "Read replicas for read-heavy workloads reduce primary database load; connection pooling reduces the energy cost of establishing new connections; query result caching at the application layer eliminates redundant database work",
      ],
      highlight:
        "A database query that takes 4 seconds instead of 40 milliseconds is not just a user experience problem. If that query runs 100,000 times per day, you are burning server energy for 4 seconds instead of 0.04 seconds on each of those 100,000 executions. Database performance is database sustainability.",
    },
    question: {
      text: "An IoT application records temperature, humidity, and air quality readings from 500 sensors every 10 seconds. After 2 years, the database contains 3.15 billion rows and query performance has degraded significantly. What data management strategy best balances sustainability and analytical utility?",
      options: [
        "Delete all data older than 90 days",
        "Implement tiered retention: keep full 10-second resolution for 90 days, aggregate to hourly averages for 1 year, aggregate to daily averages for 5 years, and archive to cold storage thereafter",
        "Upgrade to a larger database server",
        "Compress all records equally regardless of age",
      ],
      correct: 1,
      explanation:
        "Tiered retention recognises that recent data has operational value at high resolution, while historical data has analytical value at lower resolution. Hourly averages for year 1 and daily averages for years 2-5 reduce storage by over 99% compared to storing every 10-second reading indefinitely — with no loss of trend analysis capability. Deleting after 90 days destroys analytical value. A larger server scales the problem without solving it. Uniform compression does not address the volume growth.",
    },
  },
  {
    id: 6,
    title: "The Hardware Lifecycle You Control",
    icon: "♻️",
    slide: {
      heading: "From Specification to Decommission",
      points: [
        "IT professionals influence hardware at three stages: specification (deciding what gets bought), operational management (how long it runs and at what utilisation), and decommissioning (how it is disposed of)",
        "Server utilisation rates in enterprise data centres average 15-20% — most servers run at a fraction of their capacity most of the time, consuming energy proportional to their maximum capacity regardless",
        "Virtualisation (VMware, Hyper-V) and containerisation (Docker, Kubernetes) improve hardware utilisation by running multiple workloads on shared physical infrastructure — directly reducing the hardware-to-workload ratio",
        "WEEE (Waste Electrical and Electronic Equipment) regulations in the EU legally require proper disposal of electronic equipment. As an IT professional specifying hardware, you are responsible for ensuring compliant end-of-life disposal",
      ],
      highlight:
        "A server running at 15% utilisation is consuming approximately 60-70% of its maximum power draw while doing 15% of its potential work. If you can double utilisation through better workload scheduling or virtualisation, you have effectively halved the hardware required — and all the embedded carbon that came with it.",
    },
    question: {
      text: "A small company runs 20 physical servers averaging 12% CPU utilisation. The IT administrator is asked to assess whether the infrastructure could be made more sustainable without reducing capability. What is the most impactful recommendation?",
      options: [
        "Replace all 20 servers with newer, more energy-efficient models",
        "Consolidate workloads using virtualisation or containerisation onto fewer physical servers running at higher utilisation, decommissioning the underutilised hardware",
        "Add renewable energy certificates to offset the servers' carbon footprint",
        "Enable power-saving sleep modes on all servers",
      ],
      correct: 1,
      explanation:
        "20 servers at 12% utilisation could theoretically run on 3-4 servers at 60-80% utilisation using virtualisation. This eliminates the embedded carbon of 16-17 decommissioned servers, reduces electricity consumption by approximately 75-80%, and reduces cooling requirements proportionally. Replacing with new efficient models still requires manufacturing 20 new servers. Carbon offsets address the symptom, not the cause. Sleep modes on servers are impractical for services requiring uptime. Consolidation through virtualisation is the most impactful, lowest-cost, highest-return sustainability intervention available.",
    },
  },
  {
    id: 7,
    title: "Sustainable UX Design",
    icon: "🎨",
    slide: {
      heading: "Design Decisions Are Energy Decisions",
      points: [
        "Every element rendered on screen requires CPU and GPU computation. Animations, parallax scrolling, video backgrounds, and real-time effects consume measurably more energy than static interfaces",
        "OLED and AMOLED screens consume significantly less power displaying dark pixels than light pixels — dark mode on OLED devices genuinely reduces battery consumption by 30-63% depending on brightness settings",
        "Autoplay video, infinite scroll, and push notification frequency are design decisions that increase device and server energy consumption per user session — they are sustainability decisions with engagement metrics attached",
        "Designing for accessibility and sustainability frequently overlap: high contrast, clear typography, reduced motion, and offline capability benefit users with disabilities and also reduce energy consumption",
      ],
      highlight:
        "The UX designer and the sustainable systems engineer are solving related problems. A UI that loads fast, runs smoothly on older hardware, and does not demand constant repaints is both a better user experience and a lower-energy experience. Good design and sustainable design are usually the same design.",
    },
    question: {
      text: "A web application redesign proposal includes a hero section with a looping 4K background video, CSS particle animations throughout the interface, and real-time data visualisations that refresh every 2 seconds. What is the most accurate characterisation of these design choices?",
      options: [
        "They are neutral aesthetic choices with no material energy or performance implications",
        "They create continuous GPU and CPU load on every user's device for the entire session, increasing device energy consumption and battery drain while forcing users on older hardware to have degraded experiences",
        "The energy impact is handled by the hosting provider, not the user's device",
        "These are standard modern web design practices that users expect",
      ],
      correct: 1,
      explanation:
        "Looping 4K video requires continuous video decoding. CSS particle animations create continuous paint operations. 2-second refresh intervals maintain constant network connections and JavaScript execution. Together these create sustained CPU and GPU load for every user for the duration of their session. On a laptop, this measurably increases battery drain. On older hardware, it degrades performance. The hosting provider's efficiency is irrelevant — the energy consumed on the user's device is a separate and significant cost. These are design decisions, not aesthetic defaults.",
    },
  },
  {
    id: 8,
    title: "Open Source and the Commons",
    icon: "🤝",
    slide: {
      heading: "Shared Code, Shared Responsibility",
      points: [
        "Open source software is intrinsically linked to sustainability: shared code means shared optimisation effort, shared security maintenance, and avoidance of duplicated computation solving the same problems independently worldwide",
        "The Linux kernel powers approximately 96% of the world's top 1 million servers and nearly all of Android — its energy efficiency improvements benefit billions of devices simultaneously, demonstrating the leverage of shared infrastructure",
        "Contributing a performance optimisation to a widely-used open source library that reduces execution time by 10% affects every application built on that library — potentially millions of deployments, permanently",
        "The Sustainability chapter of the OpenSSF (Open Source Security Foundation) addresses how open source communities can integrate sustainability considerations into their development practices and contribution guidelines",
      ],
      highlight:
        "A bug fix in a library used by 50,000 projects is 50,000x more impactful than the same fix in a private codebase. Open source contribution is not just professional development — it is leveraged sustainability work.",
    },
    question: {
      text: "You discover a performance inefficiency in a popular open source JavaScript library used by approximately 200,000 projects. Fixing it would reduce the library's CPU usage by 15% for a common operation. You have the skills to fix it. What is the most impactful action?",
      options: [
        "Fix it in your own project's local copy since you cannot control what others do",
        "Open an issue describing the inefficiency and submit a pull request with a fix — contributing upstream so the improvement benefits all 200,000 dependent projects",
        "Switch to a different library in your own project",
        "Document the inefficiency on your blog so other developers are aware",
      ],
      correct: 1,
      explanation:
        "A local fix affects one project. An upstream contribution affects 200,000 projects simultaneously and permanently. The energy reduction of 15% on one operation across 200,000 projects represents a force multiplication that is unique to open source. Writing a blog post creates awareness but no change. Switching libraries solves your problem but leaves the inefficiency in place for the other 199,999 projects. The upstream pull request is the highest-leverage action available to you and is explicitly encouraged by open source community norms.",
    },
  },
  {
    id: 9,
    title: "Lifecycle Assessment in IT Procurement",
    icon: "📊",
    slide: {
      heading: "What to Ask Before You Buy",
      points: [
        "Lifecycle Assessment (LCA) quantifies the environmental impact of a product across its entire life: raw material extraction, manufacturing, transport, operational use, and end-of-life disposal",
        "For a typical server, manufacturing accounts for approximately 50% of lifetime carbon — meaning a server that lasts 6 years rather than 3 years reduces its manufacturing carbon per year of use by 50%",
        "Product Environmental Profiles and Environmental Product Declarations (EPDs) are standardised documents that manufacturers publish providing verified LCA data — you can and should request these from hardware vendors",
        "Total Cost of Ownership (TCO) analysis that ignores energy costs systematically underestimates the true cost of hardware. A server that costs $500 less to purchase but uses 200W more continuously costs more in electricity over 3 years at typical enterprise energy prices",
      ],
      highlight:
        "When you recommend a hardware purchase without asking for the EPD, you are making a sustainability decision by omission. The data exists. The professional responsibility is to request and consider it.",
    },
    question: {
      text: "An IT manager is comparing two server models for a deployment expected to run for 5 years. Server A costs $3,000 and consumes 250W continuously. Server B costs $3,800 and consumes 150W continuously. Assuming an electricity cost of $0.12/kWh and continuous operation, which server has lower total cost of ownership over 5 years?",
      options: [
        "Server A — it costs $800 less to purchase",
        "Server B — the energy savings over 5 years exceed the $800 price difference",
        "They are approximately equal in total cost",
        "Server A — because electricity costs are not part of IT procurement decisions",
      ],
      correct: 1,
      explanation:
        "Server A energy cost: 250W × 8,760 hours/year × 5 years × $0.12/kWh = $1,314. Server B energy cost: 150W × 8,760 × 5 × $0.12 = $788.40. Energy saving with Server B: $525.60. Server B total cost: $3,800 + $788.40 = $4,588.40. Server A total cost: $3,000 + $1,314 = $4,314. Server A wins on pure TCO in this scenario — but the carbon cost of Server A is 66% higher for the same workload. This illustrates why carbon cost must be factored separately from financial cost in sustainable procurement. The numbers change when carbon has a price, as it does under EU carbon pricing.",
    },
  },
  {
    id: 10,
    title: "Building Sustainability Into Your Process",
    icon: "🔨",
    slide: {
      heading: "Making This Part of How You Work",
      points: [
        "Sustainability reviews should be part of the definition of done in software development — the same way security reviews and accessibility checks are standard gates in mature engineering processes",
        "Adding carbon impact as a ticket field in project management tools (Jira, Linear, GitHub Issues) makes sustainability visible alongside performance and security concerns in daily development work",
        "Monitoring dashboards that include energy and carbon metrics alongside uptime, latency, and error rate make sustainability a first-class operational concern rather than an afterthought",
        "Architecture Decision Records (ADRs) that include sustainability rationale document why energy-conscious decisions were made, creating institutional knowledge that survives team changes",
      ],
      highlight:
        "Sustainability does not happen by caring about it. It happens by building it into the processes, tools, and checkpoints that govern everyday engineering work. Intentions without process produce inconsistent results.",
    },
    question: {
      text: "A software engineering team wants to improve the sustainability of their development process without adding significant overhead. Which single process change has the highest leverage?",
      options: [
        "Require every developer to complete an annual sustainability training course",
        "Add a sustainability checklist to the code review process covering energy efficiency, data minimisation, and hardware compatibility, so every code change is evaluated against these criteria before merging",
        "Host a monthly sustainability awareness meeting",
        "Create a dedicated sustainability team responsible for reviewing all code",
      ],
      correct: 1,
      explanation:
        "A code review checklist embeds sustainability into the existing workflow at the exact moment decisions are made and can still be changed. Annual training improves knowledge but does not change daily decisions. Monthly meetings create awareness without action points. A dedicated sustainability team creates a bottleneck and implicitly relieves other engineers of sustainability responsibility. The checklist approach is high-leverage because it is applied to every change by every engineer continuously — it scales with the team without adding headcount.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// LEVEL 4 TOPICS — Green Engineer
// ─────────────────────────────────────────────────────────────

const LEVEL4_TOPICS = [
  {
    id: 1,
    title: "The Hidden Carbon Cost of Code",
    icon: "⚡",
    slide: {
      heading: "Your Code Has a Carbon Footprint",
      points: [
        "The ICT sector currently accounts for 2-4% of global greenhouse gas emissions — comparable to the entire aviation industry, and growing faster",
        "Training a single large AI model like GPT-3 emitted roughly 284 tonnes of CO₂ — equivalent to 60 petrol cars driven for a full year",
        "A poorly optimised SQL query hitting a database 10,000 times per minute versus once per minute is not merely a performance issue — it is simultaneously an energy issue, a cost issue, and an environmental issue",
        "Software engineers rarely see their energy bill, so they rarely feel the consequence of inefficient code — but the consequence is real, measurable, and attributable to specific engineering decisions",
      ],
      highlight:
        "The single most impactful sustainability decision in IT is not recycling your laptop. It is writing efficient code. You have direct control over one of these.",
    },
    question: {
      text: "A web application makes a database call every time a user loads their profile page, even though profile data changes once per week on average. 50,000 users load their profile daily. Which response is most aligned with sustainable software engineering?",
      options: [
        "Accept it — database calls are normal and the cost is negligible per query",
        "Implement server-side caching so the database is queried once and the result is served from memory for subsequent requests until the data changes",
        "Tell users to reload pages less frequently",
        "Switch to a NoSQL database since it is newer technology",
      ],
      correct: 1,
      explanation:
        "Caching eliminates 49,999 of 50,000 unnecessary database queries per day. At scale this translates directly to server CPU cycles saved, energy not consumed, and carbon not emitted. This is sustainable software engineering — the same decision that saves money and improves performance also reduces environmental impact. NoSQL does not solve an architecture problem. Telling users to change behaviour is not an engineering solution.",
    },
  },
  {
    id: 2,
    title: "Carbon-Aware Computing",
    icon: "🌐",
    slide: {
      heading: "Scheduling Computation for Cleaner Energy",
      points: [
        "The carbon intensity of the electricity grid varies by time of day and by geographic region — solar contributes during daylight, wind contributes when it blows, coal plants run as baseload",
        "Carbon-aware software shifts workloads to times and locations where the electricity grid is running on lower-carbon sources — a background batch job can be scheduled for 3am when solar and wind contribute more",
        "Google's Carbon-Intelligent Computing System delays 20-30% of its internal compute workloads to periods of higher renewable availability — at Google's scale this has measurable global impact",
        "Electricity Maps (electricitymaps.com) and the National Grid Carbon Intensity API provide real-time carbon intensity data by region — they are free APIs you can integrate into your applications today",
      ],
      highlight:
        "Carbon-aware computing does not change what your application does. It changes when it does it. For any workload that does not require immediate completion, scheduling for low-carbon periods is a free environmental improvement.",
    },
    question: {
      text: "You are building a video transcription service for a university. Videos are uploaded and transcribed in the background with no requirement for immediate results. Transcription is computationally intensive. Which architecture best demonstrates carbon-aware software design?",
      options: [
        "Process all transcriptions immediately upon upload regardless of time of day",
        "Queue all transcription jobs and schedule them to run during periods when your cloud region reports low carbon intensity on the electricity grid",
        "Compress videos before transcribing to reduce file size",
        "Use the fastest possible CPU instances to finish transcription quickly and release resources",
      ],
      correct: 1,
      explanation:
        "This is carbon-aware computing in practice. The output is identical — the video gets transcribed — but scheduling non-urgent compute to periods of low grid carbon intensity is a real, production-deployed technique. Video compression reduces storage, not compute carbon. Faster CPUs do not reduce carbon per unit of work performed — they may increase it by enabling higher utilisation. Carbon-aware scheduling is the correct architectural response to this requirement.",
    },
  },
  {
    id: 3,
    title: "Algorithmic Efficiency as Environmental Practice",
    icon: "🧮",
    slide: {
      heading: "Big-O Notation Is a Sustainability Framework",
      points: [
        "An O(n²) algorithm versus an O(n log n) algorithm on 1 million records requires approximately 50,000 times more operations — at scale this is the difference between existing infrastructure and infrastructure that needs to be built",
        "Memory leaks are sustainability failures: an application that grows from 200MB to 2GB RAM after 6 hours forces either a server with 10x the hardware cost or frequent restarts — both waste energy",
        "Database indexing: a query that scans 10 million rows versus one that uses a composite index to find 1,000 matching rows is a 10,000x energy difference, potentially executed millions of times per day",
        "Image optimisation: serving a 4MB JPEG versus a 120KB WebP to 500,000 users per day is a difference of 1,940GB of unnecessary data transfer — the infrastructure to serve that data consumes real energy every day",
      ],
      highlight:
        "Everything your algorithms course taught you about efficiency was also a sustainability course that nobody framed that way. An O(n log n) algorithm is greener than O(n²). A compressed image is greener. A cached result is greener. You already know how to do this.",
    },
    question: {
      text: "You inherit a legacy retail platform with 2 million daily users. The product search function executes a sequential scan of the entire 10-million-record product database for every search query. There is no indexing. Average query time is 4.2 seconds. Which single intervention has the highest combined performance and sustainability impact?",
      options: [
        "Rewrite the entire backend in a compiled language for faster execution",
        "Add more server capacity to handle the concurrent load",
        "Add a composite index on the product name and category columns used in every search query",
        "Implement a CDN to cache static assets",
      ],
      correct: 2,
      explanation:
        "A composite index transforms the query from a full table scan (10 million rows examined) to an index seek (potentially hundreds of rows). This reduces query time from seconds to milliseconds and database CPU load by orders of magnitude. More servers scale a problem that should be solved. A faster language provides marginal gains compared to fixing a fundamental algorithmic problem. A CDN helps static assets, not dynamic queries. Indexing is the single highest-impact, lowest-cost sustainability intervention available here.",
    },
  },
  {
    id: 4,
    title: "AI and the Sustainability Paradox",
    icon: "🤖",
    slide: {
      heading: "The AI You Are Learning to Build",
      points: [
        "Training a frontier large language model requires 500-1,500 MWh of electricity — enough to power approximately 150 average UK homes for a year, for a single training run",
        "Inference (running a trained model to generate responses) is 10-100x more energy-efficient per query than training, but happens billions of times daily globally — cumulative inference energy now exceeds training energy for deployed models",
        "Model distillation, quantisation, and pruning reduce a model's size and energy requirements by 50-90% with minimal accuracy loss — these are standard professional responsibilities in production AI deployment",
        "Right-sizing AI to the task: using a 70-billion-parameter model to answer yes/no questions that a 1-billion-parameter model handles equally well is an engineering failure, not ambition",
      ],
      highlight:
        "You will make decisions about whether to train from scratch or fine-tune, whether to use a large frontier model or a small distilled one, whether to run inference on-device or in the cloud. Each of these decisions carries measurable energy and carbon consequences.",
    },
    question: {
      text: "You are building a customer service chatbot for a small e-commerce company. The chatbot needs to answer questions about orders, products, and return policies from a dataset of 500 documents. Which approach is most sustainable while remaining technically appropriate?",
      options: [
        "Train a custom large language model from scratch on the company's data to ensure maximum accuracy",
        "Use a retrieval-augmented generation (RAG) approach with a small, quantised language model and the 500 documents as a knowledge base",
        "Use the largest available frontier model for all queries to ensure the best possible quality",
        "Avoid AI entirely and use a rule-based decision tree",
      ],
      correct: 1,
      explanation:
        "RAG with a small quantised model is architecturally correct here: the knowledge base is well-defined (500 documents), queries are bounded (order and product questions), and the task does not require frontier model capabilities. Training from scratch on this dataset would cost thousands of dollars in compute and produce an inferior result. A frontier model for every query is disproportionate and accumulates unnecessary inference energy. A decision tree cannot handle natural language variation. Right-sizing AI to the task is both professional and sustainable practice.",
    },
  },
  {
    id: 5,
    title: "Measuring Software Carbon: The Professional Tools",
    icon: "📊",
    slide: {
      heading: "You Cannot Manage What You Do Not Measure",
      points: [
        "CodeCarbon is a Python library that wraps any code block and measures its actual CO₂ equivalent emissions during execution, using local hardware specs and regional grid carbon intensity data",
        "Cloud Carbon Footprint (open source, cloudcarbonfootprint.org) provides granular energy and carbon data for workloads on AWS, Azure, and Google Cloud broken down by service type",
        "Website Carbon Calculator (websitecarbon.com) estimates CO₂ per page visit based on data transfer, hosting energy source, and device energy — run it on anything you have built",
        "For Scope 3 emissions from software products: the Software Carbon Intensity (SCI) formula is SCI = (E × I) + M per R, where E is energy, I is carbon intensity, M is embodied carbon, and R is the functional unit",
      ],
      highlight:
        "Run websitecarbon.com on any website you have built. If it loads more than 1MB of data per visit, it is almost certainly rated D or F. That rating is not a design problem — it is an engineering problem you created and you can fix.",
    },
    question: {
      text: "You want to compare the carbon efficiency of two algorithms for the same data processing task in Python. Which approach gives you the most accurate and actionable measurement?",
      options: [
        "Time both algorithms with Python's time module — faster means less energy",
        "Use the CodeCarbon library to measure actual CO₂ equivalent emissions during execution of each algorithm under representative load conditions",
        "Count lines of code — fewer lines generally indicates greater efficiency",
        "Monitor CPU usage percentage in Task Manager while running each algorithm",
      ],
      correct: 1,
      explanation:
        "CodeCarbon is a production-grade Python library used by researchers and engineers to measure actual energy consumption and CO₂ equivalent during code execution. Execution time correlates with energy but does not account for CPU architecture, instruction efficiency, or memory access patterns. Line count is meaningless for efficiency. Task Manager gives instantaneous snapshots, not cumulative emissions measurements. Measuring carbon directly is the professional approach — the tool is free, open source, and takes three lines of code to integrate.",
    },
  },
  {
    id: 6,
    title: "Cloud Deployment and Carbon Intensity",
    icon: "☁️",
    slide: {
      heading: "Where You Deploy Is What You Emit",
      points: [
        "AWS us-east-1 (Virginia) operates on a grid with approximately 300-400g CO₂/kWh. AWS eu-west-1 (Ireland) operates on approximately 200-250g CO₂/kWh. AWS eu-north-1 (Stockholm) operates on approximately 20-50g CO₂/kWh",
        "The same application running 24/7 on eu-north-1 versus us-east-1 may emit 85-90% less carbon from identical workloads — solely due to the regional electricity grid",
        "Electricity Maps (electricitymaps.com) provides real-time and forecasted carbon intensity by country and region — this is the data source used by carbon-aware computing systems",
        "Multi-region deployment with carbon-aware routing — directing non-latency-sensitive traffic to the lowest-carbon available region at any moment — is a production architecture pattern at scale-conscious engineering teams",
      ],
      highlight:
        "Choosing AWS eu-north-1 versus AWS us-east-1 for a new deployment is a decision a junior developer makes on their first week of work. It can reduce the application's carbon footprint by 85% with no change to code, cost, or performance.",
    },
    question: {
      text: "You are deploying a new web application. The client has no geographic data residency restrictions. You compare two cloud regions: Region A uses 85% renewable energy with a grid intensity of 50g CO₂/kWh. Region B uses 30% renewable energy with a grid intensity of 400g CO₂/kWh but has 12ms lower latency for your primary user base. What is the most professionally responsible approach?",
      options: [
        "Always choose the lowest latency — performance is the only technical metric that matters",
        "Always choose the greener region regardless of any other consideration",
        "Quantify the actual user impact of 12ms latency difference, present both options with their measured carbon cost to the client, and make an informed joint decision",
        "Cloud providers handle sustainability, so deployment region is irrelevant to you as a developer",
      ],
      correct: 2,
      explanation:
        "12ms latency is imperceptible to humans in most application types — research consistently shows users notice latency above 100ms. The carbon difference between 50g and 400g CO₂/kWh is 8x. Professional responsibility means surfacing this trade-off to the client with data, not making the decision unilaterally or ignoring it. Responsible engineers inform clients of environmental costs the same way they inform them of financial costs. The client makes the final decision; the engineer ensures the decision is informed.",
    },
  },
  {
    id: 7,
    title: "Environmental Justice and Technology",
    icon: "⚖️",
    slide: {
      heading: "Who Bears the Costs You Create",
      points: [
        "Agbogbloshie in Ghana was one of the world's largest e-waste processing sites — workers, including children, manually dismantled electronics in toxic conditions to recover metals for resale, with no protective equipment and severe health consequences",
        "The communities most harmed by ICT's environmental impact are disproportionately not the communities that benefit from it — the supply chain of global technology runs through regions with the least regulatory protection",
        "Cobalt — essential for lithium-ion batteries in every smartphone and laptop — is approximately 70% sourced from the DRC, where artisanal mining involves approximately 40,000 children in dangerous conditions",
        "As a system designer you make decisions about device minimum requirements, update policies, planned obsolescence, and repairability that directly determine hardware replacement cycles and the resulting supply chain demand",
      ],
      highlight:
        "There is a child in the DRC mining cobalt for the laptop you are using right now. That is not a metaphor. Your professional decisions about hardware requirements, update cycles, and repairability are connected to that supply chain by a direct causal chain.",
    },
    question: {
      text: "A software company is planning its next major version. The lead developer proposes dropping support for devices older than 3 years to simplify development. The current version supports devices up to 6 years old. The company has 8 million users. Approximately 1.5 million users have devices between 3 and 6 years old, predominantly in lower-income regions. What is the most complete professional assessment of this decision?",
      options: [
        "Reasonable — 3 years is an industry-standard support window",
        "The decision creates a forced hardware replacement cycle for 1.5 million users, generates e-waste disproportionately affecting lower-income communities, and excludes users whose devices are fully functional — the development convenience does not justify these consequences without a thorough investigation of whether the technical constraint is genuinely necessary",
        "Acceptable if the company offsets the carbon of the replaced devices",
        "Not the developer's responsibility — hardware decisions are made by users",
      ],
      correct: 1,
      explanation:
        "1.5 million functional devices being replaced to accommodate developer convenience — not genuine technical necessity — is an environmental justice issue. The devices work. The users in lower-income regions face either exclusion or forced expenditure on replacement hardware. The e-waste from 1.5 million devices is processed disproportionately in regions with inadequate protective infrastructure. Carbon offsets do not address device replacement, user exclusion, or supply chain harm. The ACM Code of Ethics requires assessing the broader societal impacts of technical decisions. This is that assessment.",
    },
  },
  {
    id: 8,
    title: "The Software Carbon Intensity Specification",
    icon: "📐",
    slide: {
      heading: "Measuring Carbon at the Software Level",
      points: [
        "The Software Carbon Intensity (SCI) specification defines: SCI = (E × I + M) per R, where E is energy consumed, I is carbon intensity of the grid, M is embodied carbon of hardware, and R is the functional unit (per user, per API call, per transaction)",
        "Functional units are critical: reporting SCI as grams per API call versus grams per active user tells completely different stories about where carbon is generated and how to reduce it",
        "Embodied carbon (M) accounts for the carbon emitted in manufacturing the hardware your software runs on — a portion of that hardware's lifetime carbon is attributed to your software based on utilisation and time",
        "The SCI is intentionally not an absolute measure — it cannot be used to compare different software doing different things. It is used to track improvement over time and to identify which component of a system contributes most carbon",
      ],
      highlight:
        "The SCI score for your application going from 42g CO₂/user/day to 18g CO₂/user/day represents a 57% reduction. Across 100,000 users for one year that is approximately 8.76 tonnes of CO₂ that was not emitted. This is engineering with a measurable outcome.",
    },
    question: {
      text: "You calculate the SCI for two versions of your application. Version 1 scores 85g CO₂e per active user per day. Version 2 scores 34g CO₂e per active user per day. The application has 200,000 active users. What is the annual carbon reduction achieved by deploying Version 2?",
      options: [
        "51g CO₂e per year",
        "Approximately 3.7 tonnes CO₂e per year",
        "Approximately 3,723 tonnes CO₂e per year",
        "It cannot be calculated from SCI scores alone",
      ],
      correct: 2,
      explanation:
        "Reduction per user per day: 85 - 34 = 51g CO₂e. Per year per user: 51g × 365 = 18,615g = 18.615kg. For 200,000 users: 18.615kg × 200,000 = 3,723,000kg = 3,723 tonnes CO₂e per year. This is the annual carbon impact of a single engineering improvement across your user base. At 3,723 tonnes per year, this is equivalent to removing approximately 800 cars from the road annually. SCI scores are directly convertible to absolute emissions when multiplied by user count and time period.",
    },
  },
  {
    id: 9,
    title: "The Code Review as Sustainability Gate",
    icon: "🔍",
    slide: {
      heading: "Every Merge Is a Sustainability Decision",
      points: [
        "Code review is the last systematic checkpoint before code reaches production — it is the natural integration point for sustainability evaluation in the development workflow",
        "A sustainability checklist in code review might include: Does this introduce unnecessary database queries? Does this increase page weight? Does this add always-on polling where event-driven would work? Does this break compatibility with older hardware?",
        "Pull request descriptions that include energy impact estimates normalise sustainability as a development concern — the same way security and accessibility are described in PR descriptions at mature engineering organisations",
        "Automated tools including Lighthouse CI, CodeCarbon in CI/CD pipelines, and bundle size budgets can catch sustainability regressions automatically before human review, reducing the burden on reviewers",
      ],
      highlight:
        "The developer who raises a sustainability concern in a code review once is noticed. The developer who raises it consistently, with specific data and proposed alternatives, becomes the engineer who changed how their team works. That is professional leadership.",
    },
    question: {
      text: "During a code review, you notice a colleague's implementation makes 45 separate API calls to build a single dashboard page, where these could be consolidated into 3 batched requests. Your colleague says the latency is acceptable. What is the professionally responsible response?",
      options: [
        "Approve the code — if it works and the user experience is acceptable, optimisation is premature",
        "Reject the code on sustainability and scalability grounds: 45 calls versus 3 represents 15x the server load, 15x the network round-trips, and 15x the energy consumption per page load, compounding with every user and every page load across the application's lifetime",
        "Ask a senior developer to decide — this is a subjective trade-off",
        "Optimise it yourself without comment",
      ],
      correct: 1,
      explanation:
        "This is the core professional competency this level has been building toward. 'It works' is not the same as 'it is correct.' 45 API calls versus 3 per dashboard load, across 10,000 users loading dashboards 5 times per day, is 2,100,000 unnecessary API calls per day. Each call represents server processing, network transmission, and energy. This compounds every day the application runs. Raising this clearly in code review, with quantified reasoning and an alternative, is exactly what responsible engineering practice looks like.",
    },
  },
  {
    id: 10,
    title: "Your Professional Obligation",
    icon: "🏛️",
    slide: {
      heading: "What Professional Ethics Requires",
      points: [
        "The ACM Code of Ethics (2018, Article 1.2) states that computing professionals should avoid harm — environmental harm caused by inefficient, wasteful, or unnecessarily resource-intensive systems falls directly under this obligation",
        "The IEEE Code of Ethics requires members to hold paramount the safety, health, and welfare of the public — the environmental commons that makes human welfare possible is within scope of this obligation",
        "Green IT is not a specialism in the way cybersecurity is a specialism — it is a baseline competency expected of all practitioners, the same way code correctness is a baseline competency expected of all practitioners",
        "The most powerful sustainability interventions available to you are the aggregate of ordinary professional decisions: algorithm choice, framework selection, deployment region, caching strategy, image format, database indexing, model sizing, API design",
      ],
      highlight:
        "You will make hundreds of small technical decisions in your first year of work. None of them will be labelled 'sustainability decision.' All of them will be. The professional who understands this produces systems that are more efficient, more accessible, and less harmful. That professional is more valuable, not less.",
    },
    question: {
      text: "A colleague argues that sustainability in software development is 'someone else's job' — either the infrastructure team's or the company's sustainability officer's. What is the most accurate professional response?",
      options: [
        "Agree — individual developers cannot meaningfully affect a company's carbon footprint",
        "The ACM Code of Ethics explicitly assigns responsibility for avoiding harm to all computing professionals. Energy consumption and environmental impact caused by software design decisions are the direct responsibility of the engineers who make those decisions — not a delegable concern",
        "Agree that it is primarily an infrastructure decision, but acknowledge that developers can help by using green themes in their UI",
        "Sustainability is a management concern, not a technical concern",
      ],
      correct: 1,
      explanation:
        "The ACM Code of Ethics is unambiguous: computing professionals are responsible for the foreseeable consequences of their work. The infrastructure team manages hardware efficiency. The sustainability officer reports on corporate carbon. But the energy consumed by unnecessary database queries, oversized payloads, inefficient algorithms, and always-on polling is caused by software engineering decisions — and is therefore the responsibility of the engineers who made those decisions. Sustainability is not delegable. It is a professional obligation that attaches to the decisions you make.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// LEVEL 5 TOPICS — Impact Maker
// ─────────────────────────────────────────────────────────────

const LEVEL5_TOPICS = [
  {
    id: 1,
    title: "The Job Market for Green IT",
    icon: "💼",
    slide: {
      heading: "Your Career Landscape",
      points: [
        "Sustainability engineering roles are among the fastest-growing technology job categories: AWS, Google, Microsoft, and Salesforce have all created dedicated sustainability engineering teams in the last 5 years",
        "The EU Corporate Sustainability Reporting Directive (CSRD) requires large companies to report detailed digital sustainability data from 2024 — creating immediate demand for IT professionals who can measure, report, and reduce digital carbon",
        "Green IT skills that are currently scarce and specifically sought: carbon-aware system design, lifecycle assessment for software, SCI measurement and reporting, and sustainable architecture review",
        "The International Green IT Foundation (IGITF) and the Green Software Foundation offer certifications that are increasingly requested in job specifications for roles at sustainability-conscious technology employers",
      ],
      highlight:
        "The organisation that cannot report its Scope 3 digital emissions will face regulatory penalties from 2025 under EU CSRD. The engineer who can help them measure and reduce those emissions is solving an urgent, well-funded business problem. That engineer is you.",
    },
    question: {
      text: "A technology company is preparing to comply with the EU Corporate Sustainability Reporting Directive starting in 2025. The sustainability team asks the engineering department to provide Scope 3 emissions data from customer use of the company's software products. No engineer in the department has previously worked with carbon measurements. What is the most productive immediate response?",
      options: [
        "Explain that this is not an engineering responsibility and redirect to the sustainability officer",
        "Use the SCI specification and tools like CodeCarbon or Cloud Carbon Footprint to establish baseline measurements, document the methodology, and produce an initial estimate with appropriate confidence intervals",
        "Purchase carbon offsets proportional to estimated software usage",
        "Commission an external consultant to handle all sustainability reporting",
      ],
      correct: 1,
      explanation:
        "Scope 3 emissions from software use are engineering measurements, not policy statements. The SCI specification provides the methodology. CodeCarbon, Cloud Carbon Footprint, and provider-native tools provide the data. An engineering team that steps up to own this measurement builds irreplaceable organisational capability. External consultants can measure but cannot iterate and improve the software. Carbon offsets report impact; they do not measure it. This is the situation where knowing how to measure software carbon becomes directly commercially valuable.",
    },
  },
  {
    id: 2,
    title: "Open Source Projects That Matter",
    icon: "🌐",
    slide: {
      heading: "The Ecosystem You Can Contribute To",
      points: [
        "CodeCarbon (github.com/mlco2/codecarbon) — Python library for measuring ML and software emissions, used by major research institutions and contributed to by engineers worldwide. Beginner-friendly issues are available",
        "Cloud Carbon Footprint (cloudcarbonfootprint.org) — open source multi-cloud carbon measurement tool, actively maintained and accepting contributions. Requires TypeScript and cloud provider API knowledge",
        "The Green Web Foundation's CO2.js library (github.com/thegreenwebfoundation/co2.js) — JavaScript library for estimating digital carbon in browsers and Node.js, used in millions of websites",
        "Electricity Maps (github.com/electricitymaps/electricitymaps-contrib) — open source real-time grid carbon intensity data for 60+ countries, with contribution opportunities for adding new data sources",
      ],
      highlight:
        "Every one of these projects has a 'good first issue' label. Contributing to production sustainability infrastructure used by millions of developers is available to you as a student with basic programming skills. Your degree coursework is sufficient preparation.",
    },
    question: {
      text: "You want to make your first meaningful contribution to open source sustainability infrastructure. You have intermediate Python skills and have completed your first year of IT study. Which is the most strategically valuable starting point?",
      options: [
        "Start a new sustainability project from scratch to demonstrate original thinking",
        "Find a 'good first issue' on CodeCarbon or CO2.js, fix it, submit a pull request, and engage with maintainer feedback — establishing a contribution record in active, widely-used projects",
        "Wait until you have advanced skills before contributing to professional projects",
        "Fork an existing project and create a personal version with improvements",
      ],
      correct: 1,
      explanation:
        "Starting a new project from scratch creates a project that nobody uses, maintained by one person, with no community. Contributing to an active project with millions of users gives your code immediate production impact and provides mentorship through the review process. 'Good first issues' are specifically curated for contributors at your level. A contribution record in CodeCarbon or CO2.js is directly relevant to sustainability engineering job applications. Forking without contributing upstream gives you personal benefit while denying the improvement to the broader ecosystem.",
    },
  },
  {
    id: 3,
    title: "The Carbon Budget Concept",
    icon: "📉",
    slide: {
      heading: "Designing to a Carbon Budget",
      points: [
        "A carbon budget for software sets a maximum SCI score or absolute carbon limit that the system must stay within — analogous to a financial budget or a performance SLA",
        "Sustainable Brand Index and similar frameworks require companies to demonstrate measurable carbon reductions year-on-year — engineering teams that have never measured their carbon cannot demonstrate reduction",
        "Setting a carbon budget forces architectural trade-off discussions that optimising for performance alone does not — 'we cannot add this feature without exceeding our carbon budget' is a constraint that produces creative engineering solutions",
        "Carbon budgets can be set at the feature level, the API level, or the application level — the granularity should match where engineering decisions are made",
      ],
      highlight:
        "A performance budget says 'this page must load in under 2 seconds.' A carbon budget says 'this page must emit less than 0.5g CO₂ per visit.' Both are engineering constraints. Both can be measured. Both can be exceeded by bad decisions and improved by good ones.",
    },
    question: {
      text: "An engineering team sets a carbon budget of 0.3g CO₂e per API request for their new microservice. Initial measurements show the service emits 1.2g CO₂e per request. The team identifies that 60% of the carbon comes from a dependency that fetches live exchange rate data on every request when rates change less than 0.1% daily. What is the most direct path to meeting the carbon budget?",
      options: [
        "Migrate the entire service to a greener cloud region",
        "Cache exchange rate data and refresh once per hour rather than fetching on every request, eliminating 60% of the service's carbon footprint in a single change",
        "Reduce the number of API endpoints to decrease total service calls",
        "The carbon budget is too aggressive and should be revised upward",
      ],
      correct: 1,
      explanation:
        "The dependency fetching live data on every request when data changes at less than 0.1% daily is the identified root cause of 60% of emissions. Caching with hourly refresh eliminates this fetch for approximately 99.9% of requests. This single change reduces emissions from 1.2g to approximately 0.48g per request — still over budget but a 60% improvement from one architectural fix. Migrating regions helps but does not address the root cause identified by measurement. Revising the budget upward defeats the purpose of having one. This illustrates how carbon budget measurement leads directly to specific engineering interventions.",
    },
  },
  {
    id: 4,
    title: "Designing for Longevity",
    icon: "⏳",
    slide: {
      heading: "Building Systems That Last",
      points: [
        "Software that is maintainable, well-documented, and built on stable foundations lasts longer — reducing the energy cost of rewrites, migrations, and the organisational disruption they cause",
        "Technical debt is a sustainability problem: a system so laden with shortcuts and workarounds that it must be rebuilt entirely rather than evolved wastes all the energy that went into building, running, and migrating it",
        "API versioning, backward compatibility policies, and deprecation practices directly affect how long existing client applications can continue functioning without forced rewrites",
        "The most sustainable codebase is one that developers can understand, modify, and extend without producing new problems — clarity and simplicity are environmental values, not just engineering aesthetics",
      ],
      highlight:
        "A system rebuilt every 3 years because it became unmaintainable has a hidden carbon cost in the energy of three builds rather than one. Writing clean, documented, maintainable code is a long-term sustainability investment. This is why technical excellence and environmental responsibility point in the same direction.",
    },
    question: {
      text: "A startup has built its core platform rapidly over 18 months with minimal documentation, no API versioning, and significant technical debt. The engineering team is debating whether to continue adding features or invest 3 months in refactoring and documentation. From a sustainability perspective, what is the strongest argument for the refactoring investment?",
      options: [
        "Refactoring is purely a developer preference with no sustainability implications",
        "A well-structured, documented codebase extends the operational lifespan of the system, reduces the energy and resources required for future changes, and makes it possible to identify and fix inefficiencies — preventing the significantly higher carbon cost of a complete rebuild in 2-3 years",
        "Documentation reduces the need for new developers, which reduces office energy consumption",
        "Refactoring should always be deferred — adding features generates more revenue to fund future sustainability investments",
      ],
      correct: 1,
      explanation:
        "Technical debt compounds. A system that is unmaintainable in 2-3 years requires a complete rebuild — consuming the energy of architecture, development, testing, and migration all over again. A well-maintained system evolves incrementally. The energy difference between incremental improvement and periodic complete rebuild is substantial when aggregated over the system's lifetime. Additionally, readable code makes performance problems identifiable and fixable. Technical debt obscures inefficiency. Investing in code quality now is investing in the system's long-term sustainability.",
    },
  },
  {
    id: 5,
    title: "The Policy Landscape You Will Work Within",
    icon: "📜",
    slide: {
      heading: "Regulation Is Coming to Digital Sustainability",
      points: [
        "EU CSRD (Corporate Sustainability Reporting Directive): from 2024-2026, companies of increasing sizes must report detailed sustainability data including Scope 3 digital emissions — affecting every technology company operating in the EU",
        "EU Energy Efficiency Directive (2023): includes specific provisions for data centre energy efficiency reporting, requiring Power Usage Effectiveness and other metrics to be disclosed publicly",
        "The SEC Climate Disclosure Rule (US, 2024): requires publicly traded companies to disclose Scope 1, 2, and 3 emissions — technology companies' Scope 3 includes customer use of their software products",
        "ISO/IEC 30134 series covers data centre resource efficiency metrics. ISO/IEC 21031 is the emerging SCI standard. These will be referenced in contracts and procurement processes you will encounter professionally",
      ],
      highlight:
        "Within your career you will work at organisations required by law to report and reduce their digital carbon footprint. The engineer who understands these regulations and knows how to respond to them technically is solving a compliance problem with a legal deadline. That is not optional work.",
    },
    question: {
      text: "You are a software engineer at a mid-sized technology company operating in the EU. Your manager informs you that the company will be required to report Scope 3 emissions from customer software use under CSRD from next year. No measurement infrastructure currently exists. What is the correct sequence of actions?",
      options: [
        "Wait for the sustainability team to provide requirements before taking any action",
        "Establish baseline measurement using SCI methodology and available tools, document current emissions by product and service, identify the highest-emission components, present a reduction roadmap to leadership, and implement measurement in the CI/CD pipeline so future releases are measured automatically",
        "Purchase carbon offsets equal to estimated software usage and report this as compliance",
        "Inform management that measuring Scope 3 software emissions is technically impossible",
      ],
      correct: 1,
      explanation:
        "CSRD compliance requires measured data, not estimates or offsets. The sequence described establishes measurement first (you cannot reduce what you cannot measure), identifies priorities (not all components contribute equally), enables strategic planning (a roadmap gives leadership something to commit to), and institutionalises measurement (CI/CD integration means every future release is measured automatically). Carbon offsets do not satisfy CSRD measurement requirements. Scope 3 software emissions measurement is entirely possible — the tools exist and are described throughout this module. Waiting is a compliance risk with legal consequences.",
    },
  },
  {
    id: 6,
    title: "Technology for Climate Solutions",
    icon: "🌱",
    slide: {
      heading: "The Problems That Need You",
      points: [
        "Climate modelling and prediction requires processing petabytes of sensor data continuously — advances in distributed computing, data compression, and efficient numerical methods directly improve climate science",
        "Precision agriculture uses IoT sensors, satellite imagery analysis, and machine learning to reduce water use by 30-50% and fertiliser use by 20-30% on instrumented farms — food production accounts for 26% of global emissions",
        "Grid optimisation software that predicts renewable energy generation and matches it with demand in real time is one of the highest-impact software applications in existence — the algorithms are tractable problems for IT graduates",
        "Carbon accounting software — tools that help organisations measure, report, and reduce their emissions — is a rapidly growing sector with genuine technical complexity and direct environmental impact",
      ],
      highlight:
        "The problems that will determine whether the world meets its climate commitments are computational problems. They require databases, algorithms, APIs, machine learning, and systems architecture. They require exactly the skills your degree is training you to have.",
    },
    question: {
      text: "You are offered two job opportunities upon graduation. Job A is at a well-known social media company offering a higher salary working on recommendation algorithm optimisation. Job B is at a climate technology startup at a lower salary working on software that helps industrial companies measure and reduce their Scope 1 and 2 emissions. From a sustainability impact perspective, how should you evaluate this decision?",
      options: [
        "Job A is better — higher salary allows you to donate more to environmental causes",
        "Job B is better — any work on climate technology is more impactful than any other work",
        "Evaluate the actual counterfactual impact: what happens in each role if you specifically take it versus someone else taking it, considering your skills, the organisation's mission, and the leverage of the specific work",
        "The sustainability impact of career choices is impossible to evaluate and should not be a factor",
      ],
      correct: 2,
      explanation:
        "Effective career impact analysis requires counterfactual thinking: what happens specifically if you take this role? A recommendation algorithm role at a company already staffed with excellent engineers may have lower marginal impact from your specific contribution. A climate tech startup where your skills are scarce may have high leverage. Job B's mission is more directly environmental, but Job A's company may have larger-scale sustainability programmes your work could influence. The salary difference enabling donations is real but typically lower-impact than direct technical work. Neither answer is categorically correct — the framework of counterfactual impact evaluation is what matters.",
    },
  },
  {
    id: 7,
    title: "Building the Sustainability Case Internally",
    icon: "📣",
    slide: {
      heading: "Making the Argument That Gets Heard",
      points: [
        "Sustainability arguments fail when framed only as ethical obligations — most engineering and business decisions are made on efficiency, cost, risk, and competitive advantage grounds",
        "Energy-efficient code is faster, cheaper to run, and scales better — the business case for sustainability is often identical to the business case for engineering excellence",
        "Carbon reporting requirements create direct financial risk for companies that cannot measure their emissions — sustainability compliance is a risk management issue, which gets senior attention",
        "Customer and investor pressure on sustainability is measurable and growing — Gartner reports that sustainability is now a top-5 concern for enterprise technology procurement decisions",
      ],
      highlight:
        "The most effective sustainability advocate in an engineering organisation is not the person who talks about the environment most passionately. It is the person who consistently quantifies the business cost of unsustainable decisions and the business value of sustainable ones.",
    },
    question: {
      text: "You want to introduce sustainability metrics into your engineering team's dashboard alongside performance, uptime, and error rate. Your engineering manager is focused on product delivery timelines and is sceptical. Which argument is most likely to succeed?",
      options: [
        "Explain that sustainability is an ethical obligation that the team should prioritise regardless of business impact",
        "Show that the cloud compute costs that carbon metrics would identify as high-carbon are the same costs that are inflating the team's infrastructure budget, and that reducing both simultaneously has immediate financial benefit alongside environmental benefit",
        "Cite regulatory requirements and warn of future compliance penalties",
        "Ask the sustainability team to make the case on your behalf",
      ],
      correct: 1,
      explanation:
        "A manager focused on delivery timelines responds to arguments framed in terms of delivery efficiency and cost. High-carbon workloads are almost always high-cost workloads — unnecessary computation, inefficient queries, and oversized infrastructure cost money and emit carbon simultaneously. Showing that a sustainability metric is also a cost-reduction metric converts a values-based argument into a business-case argument. Regulatory warnings may work eventually but feel distant and threatening. The ethical argument is correct but not persuasive in a delivery-focused environment. Aligning sustainability metrics with existing financial metrics is the professional approach.",
    },
  },
  {
    id: 8,
    title: "Measuring Your Professional Impact",
    icon: "📏",
    slide: {
      heading: "Making Your Contribution Legible",
      points: [
        "Keep a sustainability engineering log: document every decision you make with a sustainability rationale, every measurement you take, and every improvement you achieve — this is portfolio evidence and institutional memory simultaneously",
        "Quantify in standard units: tonnes of CO₂e reduced, percentage reduction in energy consumption, kilograms of e-waste avoided through extended hardware support — these numbers are meaningful to employers, clients, and regulators",
        "Case studies are the currency of sustainability credibility: a documented 'we reduced our API carbon intensity by 43% by switching from polling to event-driven architecture' is more valuable than any certification",
        "Contribute your measurements and methodologies to the public record — blog posts, conference talks, GitHub repositories — the field is new enough that practical experience is genuinely novel and needed",
      ],
      highlight:
        "Five years from now you will either have a portfolio of quantified sustainability work that demonstrates your professional impact, or you will not. The work you do in the next two years of your degree and your first job determines which. Starting now costs nothing.",
    },
    question: {
      text: "You optimise a machine learning inference pipeline at your internship, reducing average inference time from 340ms to 95ms per request. The service handles 2 million requests per day. You want to calculate the carbon impact of this improvement to include in your professional portfolio. What additional information do you need?",
      options: [
        "Nothing — faster inference automatically means proportionally less carbon",
        "The energy consumption per request at both speeds (or the server's power draw and CPU utilisation at both loads) and the carbon intensity of the cloud region's electricity grid",
        "The number of users who benefited from the faster response time",
        "The cost saving from reduced compute time",
      ],
      correct: 1,
      explanation:
        "Carbon cannot be calculated from latency alone — you need energy consumed. The calculation is: (energy per request before - energy per request after) × requests per day × 365 days × grid carbon intensity (gCO₂e/kWh). Server power draw and CPU utilisation at both load levels gives you energy per request. The grid's carbon intensity converts energy to CO₂e. Cost saving is useful context but is not CO₂e. User count affects perceived impact but not actual carbon reduction. With the right measurements this becomes: 'I reduced this service's annual carbon footprint by X tonnes CO₂e' — a portfolio statement with professional credibility.",
    },
  },
  {
    id: 9,
    title: "The Ethics of Building in a Climate Emergency",
    icon: "⚖️",
    slide: {
      heading: "What You Owe and to Whom",
      points: [
        "The Paris Agreement's 1.5°C pathway requires global emissions to reach net zero by approximately 2050. The ICT sector's projected growth on current trajectories makes this impossible without deliberate engineering intervention",
        "Professional ethical obligations do not disappear when they are commercially inconvenient — the engineer who knows a system causes environmental harm and says nothing has made a choice, not avoided one",
        "Whistleblowing protections exist in many jurisdictions for employees who report genuine environmental harm — understanding your legal rights as an employee is part of professional preparedness",
        "The concept of intergenerational equity — the obligation to future generations — is embedded in sustainability law, the UN SDGs, and increasingly in corporate governance frameworks. It is also a direct professional obligation under the ACM and IEEE codes of ethics",
      ],
      highlight:
        "You will be asked in your career to build things that are technically possible but environmentally harmful. The engineer who has thought about this before it happens makes a better decision under pressure than the one who encounters it for the first time in the moment.",
    },
    question: {
      text: "You are a software engineer at a logistics company. You discover that an optimisation you are asked to build would increase the company's vehicle fleet efficiency by 18%, significantly reducing fuel use and emissions. However, the efficiency gain makes the business case for expanding the fleet by 40% financially attractive, which would increase total emissions despite the per-vehicle improvement. This is a real example of what principle?",
      options: [
        "The precautionary principle",
        "The rebound effect — efficiency improvements that make a harmful activity cheaper or more attractive can increase total harm by inducing more of the activity",
        "The circular economy principle",
        "The polluter pays principle",
      ],
      correct: 1,
      explanation:
        "This is an applied rebound effect at industrial scale — historically called the Jevons Paradox when applied to fuel efficiency. A 18% efficiency improvement that enables a 40% fleet expansion produces a net increase in total emissions despite every vehicle being more efficient. This is a real scenario that logistics optimisation engineers encounter. Recognising it does not mean refusing to build the optimisation — it means raising the question of whether the efficiency gain should be used to reduce the existing fleet's impact or to justify expansion. That is a business decision, but the engineer who surfaces the paradox enables an informed one.",
    },
  },
  {
    id: 10,
    title: "From Student to Practitioner",
    icon: "🎓",
    slide: {
      heading: "What You Do Next",
      points: [
        "Specific actions before you graduate: run websitecarbon.com on your portfolio website, integrate CodeCarbon into one academic project, contribute one good-first-issue to an open source sustainability tool, and document one measurable sustainability improvement you made",
        "Specific actions in your first job: ask what your team's cloud carbon footprint is (if nobody knows, offer to measure it), include a sustainability note in your first code review, and propose one architectural improvement with a carbon rationale",
        "Certifications that signal genuine competency to employers: Green Software Foundation's Green Software Practitioner certification is free, respected, and specifically relevant to software engineering roles",
        "The professional network: Green Software Foundation, Climate Change AI, Work on Climate (workonclimate.org) — communities of practitioners working on exactly these problems who are actively looking for contributors",
      ],
      highlight:
        "You have now completed the most technically rigorous sustainability curriculum available at this level. The difference between this being interesting information and this changing anything is entirely the next decision you make. The tools exist. The problems are real. The leverage is available to you.",
    },
    question: {
      text: "You have completed this learning module and want to take one action this week that has both immediate personal skill-building value and the potential for real-world impact. Which action best satisfies both criteria simultaneously?",
      options: [
        "Share this module on social media to raise awareness among peers",
        "Find a good-first-issue on CodeCarbon, CO2.js, or Electricity Maps, attempt to fix it, and submit a pull request — building a contribution record in production sustainability infrastructure while learning from maintainer feedback",
        "Download and read the Green Software Foundation's Software Carbon Intensity specification",
        "Update your LinkedIn profile to include sustainability as a skill",
      ],
      correct: 1,
      explanation:
        "Reading and updating profiles build knowledge and visibility. A pull request builds demonstrated skill, creates a public contribution record, provides mentorship through code review, and — if merged — produces actual impact in production sustainability infrastructure used by developers worldwide. Social sharing creates awareness with no guarantee of action. The pull request is the only option that has a direct path to real-world consequence. This is the module's final answer to its opening question: the difference between knowing about sustainability and doing something about it is exactly the gap between options A, C, D and option B.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// ASSEMBLE ALL TOPICS
// ─────────────────────────────────────────────────────────────

const ALL_TOPICS = [
  LEVEL1_TOPICS,
  LEVEL2_TOPICS,
  LEVEL3_TOPICS,
  LEVEL4_TOPICS,
  LEVEL5_TOPICS,
];

// ─────────────────────────────────────────────────────────────
// READING TIMER HOOK
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// READING TIMER HOOK
// ─────────────────────────────────────────────────────────────

function useReadingTimer(durationSeconds, active) {
  const [elapsed, setElapsed] = useState(0);
  const [ready, setReady] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setElapsed(0);
      setReady(false);
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        const next = e + 0.1;
        if (next >= durationSeconds) {
          clearInterval(intervalRef.current);
          setReady(true);
          return durationSeconds;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [active, durationSeconds]);

  const progress = Math.min(elapsed / durationSeconds, 1);
  return { progress, ready };
}

// ─────────────────────────────────────────────────────────────
// LEVEL SELECTION SCREEN
// ─────────────────────────────────────────────────────────────

function LevelSelectScreen({ unlockedUpTo, levelScores, onSelectLevel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Learning Journey</h2>
        <p className="text-sm text-gray-500">
          Complete each level to unlock the next. Pass the quiz at 70%+ to advance.
        </p>
      </div>

      <div className="space-y-4">
        {LEVELS.map((level, idx) => {
          const isNext = idx === unlockedUpTo;
          const isLocked = idx > unlockedUpTo;
          const score = levelScores[idx];
          const completed = score !== undefined;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <button
                onClick={() => !isLocked && onSelectLevel(idx)}
                disabled={isLocked}
                className={`w-full text-left rounded-2xl border p-5 transition-all duration-200 ${
                  isLocked
                    ? "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                    : `bg-gradient-to-br ${level.bgColor} ${level.borderColor} hover:shadow-lg cursor-pointer`
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      isLocked ? "bg-gray-200" : `bg-gradient-to-br ${level.color}`
                    }`}
                  >
                    {isLocked ? <Lock size={18} className="text-gray-400" /> : level.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Level {level.id}
                      </span>
                      {completed && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${level.textColor} ${level.bgColor}`}>
                          {level.badgeIcon} {level.badgeName}
                        </span>
                      )}
                      {isNext && !completed && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white text-gray-600 border border-gray-200">
                          Up next
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900">{level.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{level.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {completed && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {Math.round((score.filter(Boolean).length / ALL_TOPICS[idx].length) * 100)}%
                        </p>
                        <p className="text-xs text-gray-400">score</p>
                      </div>
                    )}
                    {!isLocked && <ChevronRight size={18} className="text-gray-400" />}
                  </div>
                </div>

                {!isLocked && (
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed pl-16">
                    {level.description}
                  </p>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────

function ProgressBar({ done, total, color = "bg-emerald-500" }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">{done} of {total} slides read</span>
        <span className="text-xs font-medium text-gray-600">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SLIDE CARD
// ─────────────────────────────────────────────────────────────

function SlideCard({ topic, topicIndex, totalTopics, level, onContinue }) {
  const { progress, ready } = useReadingTimer(level.readTimePerSlide, true);
  const accentGradient = level.color;

  return (
    <motion.div
      key={`slide-${topicIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className={`bg-gradient-to-br ${level.bgColor} border ${level.borderColor} rounded-2xl p-8 mb-4`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{topic.icon}</span>
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
              {level.title} · Slide {topicIndex + 1} of {totalTopics}
            </p>
            <h2 className="text-xl font-semibold text-gray-900">{topic.slide.heading}</h2>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {topic.slide.points.map((pt, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="flex items-start gap-3"
            >
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${level.accentColor}`} />
              <span className="text-sm text-gray-700 leading-relaxed">{pt}</span>
            </motion.li>
          ))}
        </ul>

        <div className="bg-white/70 border border-white rounded-xl px-4 py-3">
          <p className="text-sm text-gray-600 italic leading-relaxed">{topic.slide.highlight}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={12} className="text-gray-400" />
          <span className="text-xs text-gray-400">
            {ready ? "Ready to continue" : "Read the slide to continue..."}
          </span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${accentGradient} rounded-full`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!ready}
        className={`w-full font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
          ready
            ? `bg-gradient-to-r ${accentGradient} text-white hover:opacity-90 shadow-md`
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {topicIndex < totalTopics - 1 ? (
          <>Next slide <ArrowRight size={16} /></>
        ) : (
          <>All slides read — take the quiz <ArrowRight size={16} /></>
        )}
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// QUIZ SESSION
// ─────────────────────────────────────────────────────────────

function QuizSession({ topics, level, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const current = topics[questionIndex];
  const q = current.question;
  const isLast = questionIndex === topics.length - 1;
  const isCorrect = selected !== null && selected === q.correct;

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected === q.correct];
    if (isLast) {
      onComplete(newAnswers);
    } else {
      setAnswers(newAnswers);
      setSelected(null);
      setQuestionIndex((i) => i + 1);
    }
  };

  const optClass = (i) => {
    const base = "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ";
    if (selected === null)
      return base + "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700";
    if (i === q.correct)
      return base + "border-emerald-400 bg-emerald-50 text-emerald-800 font-medium";
    if (i === selected && i !== q.correct)
      return base + "border-red-300 bg-red-50 text-red-700";
    return base + "border-gray-100 bg-gray-50 text-gray-400";
  };

  return (
    <motion.div
      key={`quiz-${questionIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Question {questionIndex + 1} of {topics.length}</span>
          <span>{answers.filter(Boolean).length} correct so far</span>
        </div>
        <div className="flex gap-1">
          {topics.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i < answers.length
                  ? answers[i] ? "bg-emerald-500" : "bg-red-400"
                  : i === questionIndex
                  ? `bg-gradient-to-r ${level.color}`
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={16} className={level.textColor} />
          <span className={`text-xs font-medium uppercase tracking-wide ${level.textColor}`}>
            {level.title} Quiz · Question {questionIndex + 1}
          </span>
        </div>

        <p className="text-base font-medium text-gray-900 leading-relaxed mb-6">{q.text}</p>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(i)} className={optClass(i)}>
              <span className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">
                  {["A", "B", "C", "D"][i]}
                </span>
                {opt}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`mt-5 rounded-xl p-4 flex items-start gap-3 ${
                isCorrect
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {isCorrect ? (
                <CheckCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selected !== null && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className={`w-full bg-gradient-to-r ${level.color} text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm hover:opacity-90 shadow-md`}
        >
          {isLast ? (
            <><Trophy size={16} /> See my level results</>
          ) : (
            <>Next question <ArrowRight size={16} /></>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// LEVEL RESULTS SCREEN
// ─────────────────────────────────────────────────────────────

function LevelResultsScreen({ levelIndex, answers, onContinue, onRetry }) {
  const level = LEVELS[levelIndex];
  const topics = ALL_TOPICS[levelIndex];
  const score = answers.filter(Boolean).length;
  const total = topics.length;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= level.passMark;
  const isLastLevel = levelIndex === LEVELS.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`bg-gradient-to-br ${level.bgColor} border ${level.borderColor} rounded-2xl p-8 mb-6 text-center`}>
        <div className="text-4xl mb-3">{passed ? level.badgeIcon : "💪"}</div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {passed ? `${level.badgeName} earned!` : "Not quite there yet"}
        </h2>
        <div className={`text-5xl font-bold my-4 ${passed ? level.textColor : "text-gray-600"}`}>
          {score}<span className="text-2xl text-gray-400">/{total}</span>
        </div>
        <p className="text-sm text-gray-600">
          {passed
            ? `You scored ${pct}% — above the ${level.passMark}% pass mark.${!isLastLevel ? " Next level unlocked." : " You have completed the full programme."}`
            : `You scored ${pct}% — the pass mark for this level is ${level.passMark}%. Review the slides and try the quiz again.`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {topics.map((t, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs ${
              answers[i]
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {answers[i]
              ? <CheckCircle size={12} className="flex-shrink-0" />
              : <XCircle size={12} className="flex-shrink-0" />}
            <span className="truncate">{t.title}</span>
          </div>
        ))}
      </div>

<div className="flex gap-3">
  {passed ? (
    <>
      <Link href="/sustainability" className="flex-1">
        <button className="w-full border-2 border-emerald-500 text-emerald-700 font-medium py-3 rounded-xl transition-all text-sm hover:bg-emerald-50">
          View Dashboard
        </button>
      </Link>
      <button
        onClick={onContinue}
        className={`flex-1 font-medium py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 bg-gradient-to-r ${level.color} text-white hover:opacity-90 shadow-md`}
      >
        {isLastLevel ? <><Trophy size={16} /> Complete</> : <>Next Level <ArrowRight size={16} /></>}
      </button>
    </>
  ) : (
    <>
      <button onClick={onRetry} className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
        <RotateCcw size={14} /> Retry quiz
      </button>
      <button onClick={onContinue} className={`flex-1 font-medium py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 bg-gradient-to-r ${level.color} text-white hover:opacity-90 shadow-md`}>
        Back to levels <ArrowLeft size={16} />
      </button>
    </>
  )}
</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROGRAMME COMPLETE SCREEN
// ─────────────────────────────────────────────────────────────

function ProgrammeCompleteScreen({ levelScores, onRestart }) {
  const totalQuestions = ALL_TOPICS.reduce((s, t) => s + t.length, 0);
  const totalCorrect = levelScores.reduce((s, a) => s + (a ? a.filter(Boolean).length : 0), 0);
  const overallPct = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-10 mb-6">
        <div className="text-5xl mb-3">🚀</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Programme Complete</h2>
        <div className="text-5xl font-bold text-rose-600 my-4">
          {totalCorrect}<span className="text-2xl text-gray-400">/{totalQuestions}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{overallPct}% across all five levels</p>
        <div className="flex justify-center gap-3 flex-wrap">
          {LEVELS.map((l) => (
            <span key={l.id} className={`text-xs font-medium px-3 py-1 rounded-full ${l.textColor} ${l.bgColor}`}>
              {l.badgeIcon} {l.badgeName}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {LEVELS.map((level, i) => {
          const ans = levelScores[i] || [];
          const sc  = ans.filter(Boolean).length;
          const tot = ALL_TOPICS[i].length;
          const pct = Math.round((sc / tot) * 100);
          return (
            <div key={level.id} className={`flex items-center gap-4 p-3 rounded-xl bg-gradient-to-br ${level.bgColor} border ${level.borderColor}`}>
              <span className="text-xl">{level.icon}</span>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{level.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${level.color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <span className={`text-sm font-bold ${level.textColor}`}>{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} /> Start again
        </button>
        <Link href="/sustainability" className="flex-1">
<button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium py-3 rounded-xl transition-all text-sm hover:opacity-90 shadow-md">
  View My Eco Dashboard
</button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────

function LearnPage() {
  const [levelScores, setLevelScores] = useState(Array(LEVELS.length).fill(undefined));
const [unlockedUpTo, setUnlockedUpTo] = useState(LEVELS.length - 1);
  const [screen, setScreen] = useState("levelSelect");
  const [activeLevel, setActiveLevel] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState([]);

  const level = LEVELS[activeLevel];
  const topics = ALL_TOPICS[activeLevel];

  const handleSelectLevel = (idx) => {
    setActiveLevel(idx);
    setSlideIndex(0);
    setCurrentAnswers([]);
    setScreen("slides");
  };

  const handleSlideNext = () => {
    if (slideIndex < topics.length - 1) {
      setSlideIndex((i) => i + 1);
    } else {
      setScreen("quiz");
    }
  };

  const handleQuizComplete = (answers) => {
    const score = answers.filter(Boolean).length;
    const pct = Math.round((score / topics.length) * 100);
    const passed = pct >= level.passMark;

    const newScores = [...levelScores];
    newScores[activeLevel] = answers;
    setLevelScores(newScores);
    setCurrentAnswers(answers);

    const storedUser = typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
    const userPrefix = storedUser?.id ? `u_${storedUser.id}_` : "";

    if (typeof window !== "undefined") {
      const levelNum = activeLevel + 1;
      localStorage.setItem(`${userPrefix}pp_l${levelNum}_passed`, passed ? "true" : "false");
      localStorage.setItem(`${userPrefix}pp_l${levelNum}_score`,  score.toString());
      localStorage.setItem(`${userPrefix}pp_l${levelNum}_total`,  topics.length.toString());
      localStorage.setItem(`${userPrefix}pp_l${levelNum}_date`,   new Date().toLocaleDateString());

      const prevScores = JSON.parse(localStorage.getItem(`${userPrefix}pp_prev_scores`) || "{}");
      if (!prevScores[levelNum] || score > parseInt(prevScores[levelNum])) {
        prevScores[levelNum] = score;
      }
      localStorage.setItem(`${userPrefix}pp_prev_scores`, JSON.stringify(prevScores));

      const optedIn = localStorage.getItem(`${userPrefix}pp_leaderboard_optin`) === "true";
      if (optedIn) {
        const uid   = localStorage.getItem(`${userPrefix}pp_uid`) || "anon_" + Date.now();
        const dName = localStorage.getItem(`${userPrefix}pp_display_name`) || "Anonymous";
        const allData = Object.keys(localStorage).reduce((acc, k) => {
          if (k.startsWith(`${userPrefix}pp_`)) {
            acc[k.replace(userPrefix, "")] = localStorage.getItem(k);
          }
          return acc;
        }, {});
        const pts      = calculateEcoPoints(allData);
        const tierObj  = getCurrentEcoTier(pts);
        const lvlsDone = Array.from({ length: 5 }, (_, i) =>
          allData[`pp_l${i + 1}_passed`] === "true"
        ).filter(Boolean).length;
        const ach = calculateAchievements(allData);
        const bdg = Object.values(ach).filter(Boolean).length + lvlsDone;
        writeLeaderboardEntry({
          uid, displayName: dName, ecoPoints: pts,
          tierName: tierObj?.name || "Seedling",
          levelsCompleted: lvlsDone, badgeCount: bdg,
        });
      }
    }

    if (passed && activeLevel + 1 > unlockedUpTo) {
      setUnlockedUpTo(Math.min(activeLevel + 1, LEVELS.length - 1));
    }

    setScreen("levelResults");
  };

  const handleLevelResultsContinue = () => {
    const score = currentAnswers.filter(Boolean).length;
    const pct   = Math.round((score / topics.length) * 100);
    const passed = pct >= level.passMark;

    if (passed && activeLevel === LEVELS.length - 1) {
      setScreen("programmeComplete");
    } else {
      setScreen("levelSelect");
    }
  };

  const handleRetryQuiz = () => {
    setCurrentAnswers([]);
    setScreen("quiz");
  };

  const handleRestart = () => {
    setLevelScores(Array(LEVELS.length).fill(undefined));
    setUnlockedUpTo(0);
    setActiveLevel(0);
    setSlideIndex(0);
    setCurrentAnswers([]);
    setScreen("levelSelect");
  };

  const currentLevelObj = LEVELS[activeLevel];

  return (
  <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 35%, #065f46 65%, #0f766e 100%)" }}>
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* Header */}
      {process.env.NODE_ENV === 'development' && (
  <button
    onClick={() => setScreen("quiz")}
    className="text-xs text-green-300 hover:text-white border border-green-700 px-2 py-0.5 rounded transition-colors"
  >
    Skip to quiz
  </button>
)}
      <div className="flex items-center gap-3 mb-8">
        {screen === "levelSelect" ? (
          <Link href="/" className="text-green-300 hover:text-white transition-colors p-1">
            <ArrowLeft size={20} />
          </Link>
        ) : (
          <button
            onClick={() => setScreen("levelSelect")}
            className="text-green-300 hover:text-white transition-colors p-1"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">Sustainability in IT</h1>
          <p className="text-xs text-green-300">5 levels · 50 lessons · 50 questions</p>
        </div>
        <div className="flex items-center gap-1">
          {levelScores.map((s, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                s !== undefined && s.filter(Boolean).length / ALL_TOPICS[i].length >= LEVELS[i].passMark / 100
                  ? "bg-emerald-400"
                  : s !== undefined
                  ? "bg-red-400"
                  : i <= unlockedUpTo
                  ? "bg-green-600"
                  : "bg-green-900"
              }`}
            />
          ))}
        </div>
      </div>

      {screen === "slides" && (
        <div className="mb-6">
          <ProgressBar
            done={slideIndex}
            total={topics.length}
            color={`bg-gradient-to-r ${currentLevelObj.color}`}
          />
        </div>
      )}

      {/* White card wrapper for content */}
<div className="rounded-2xl p-6" style={{ background: "#fafaf7" }}>
  <AnimatePresence mode="wait">
    {screen === "levelSelect" && (
      <LevelSelectScreen
        key="levelSelect"
        unlockedUpTo={unlockedUpTo}
        levelScores={levelScores}
        onSelectLevel={handleSelectLevel}
      />
    )}
    {screen === "slides" && (
      <SlideCard
        key={`slide-${activeLevel}-${slideIndex}`}
        topic={topics[slideIndex]}
        topicIndex={slideIndex}
        totalTopics={topics.length}
        level={currentLevelObj}
        onContinue={handleSlideNext}
      />
    )}
    {screen === "quiz" && (
      <QuizSession
        key={`quiz-${activeLevel}`}
        topics={topics}
        level={currentLevelObj}
        onComplete={handleQuizComplete}
      />
    )}
    {screen === "levelResults" && (
      <LevelResultsScreen
        key="levelResults"
        levelIndex={activeLevel}
        answers={currentAnswers}
        onContinue={handleLevelResultsContinue}
        onRetry={handleRetryQuiz}
      />
    )}
    {screen === "programmeComplete" && (
      <ProgrammeCompleteScreen
        key="programmeComplete"
        levelScores={levelScores}
        onRestart={handleRestart}
      />
    )}
  </AnimatePresence>
</div>

    </div>
  </main>
);
}

export default function WrappedLearnPage() {
  return (
    <ProtectedRoute>
      <LearnPage />
    </ProtectedRoute>
  );
}