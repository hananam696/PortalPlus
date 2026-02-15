"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Filter,
  MapPin,
  Building2,
  GraduationCap,
  Utensils,
  Car,
  BookOpen,
  Activity,
  ChevronDown,
  Sparkles
} from "lucide-react";

export default function CampusMapPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Complete building database with all UDST buildings
  const buildings = [
    // Colleges & Academic Buildings
    {
      id: "ccit",
      number: "10",
      name: "College of Computing and IT",
      shortName: "CCIT",
      category: "academic",
      image: "/campus/buildings/building-10-ccit.jpg",
      sustainability: {
        title: "Green IT & E-Waste Management",
        description: "Learn about sustainable computing, e-waste recycling, and energy-efficient data centers",
        topics: ["E-waste Recycling", "Energy-Efficient Computing", "Green Data Centers"]
      },
      coordinates: { top: 48, left: 62, width: 10, height: 14 },
      color: "emerald"
    },
    {
      id: "cet",
      number: "08",
      name: "College of Engineering & Technology",
      shortName: "CET",
      category: "academic",
      image: "/campus/buildings/building-08-cet.jpg",
      sustainability: {
        title: "Sustainable Engineering",
        description: "Discover renewable energy, green building design, and sustainable materials",
        topics: ["Renewable Energy", "Green Architecture", "Sustainable Materials"]
      },
      coordinates: { top: 42, left: 45, width: 12, height: 16 },
      color: "blue"
    },
    {
      id: "chs",
      number: "19",
      name: "College of Health Sciences",
      shortName: "CHS",
      category: "academic",
      image: "/campus/buildings/building-19-chs.jpg",
      sustainability: {
        title: "Healthcare & Environmental Health",
        description: "Explore sustainable healthcare practices and environmental health impact",
        topics: ["Green Healthcare", "Medical Waste", "Public Health"]
      },
      coordinates: { top: 35, left: 28, width: 10, height: 13 },
      color: "rose"
    },
    {
      id: "chs-other",
      number: "20",
      name: "College of Health Sciences (Annex)",
      shortName: "CHS Annex",
      category: "academic",
      sustainability: null,
      coordinates: { top: 35, left: 18, width: 9, height: 13 },
      color: "rose"
    },
    {
      id: "cob",
      number: "12",
      name: "College of Business",
      shortName: "COB",
      category: "academic",
      image: "/campus/buildings/building-12-cob.jpg",
      sustainability: {
        title: "Sustainable Business & Economics",
        description: "Learn about circular economy, CSR, and sustainable finance",
        topics: ["Circular Economy", "CSR", "Green Finance"]
      },
      coordinates: { top: 58, left: 45, width: 11, height: 14 },
      color: "amber"
    },
    {
      id: "cge",
      number: "05",
      name: "College of General Education",
      shortName: "CGE",
      category: "academic",
      image: "/campus/buildings/building-05-cge.jpg",
      sustainability: {
        title: "Sustainability Literacy",
        description: "Foundation courses on environmental awareness and sustainability",
        topics: ["Environmental Science", "Climate Change", "Sustainability Basics"]
      },
      coordinates: { top: 52, left: 28, width: 10, height: 12 },
      color: "violet"
    },

    // Administrative & Services
    {
      id: "admin",
      number: "02",
      name: "Auditorium & Lecture Theatres",
      shortName: "Auditorium",
      category: "administrative",
      coordinates: { top: 62, left: 18, width: 9, height: 11 },
      color: "slate"
    },
    {
      id: "library",
      number: "14",
      name: "Library Services Directorate",
      shortName: "Library",
      category: "services",
      sustainability: {
        title: "Digital Libraries & Paper Reduction",
        description: "Discover how digital resources reduce paper consumption",
        topics: ["Digital Resources", "Paper Reduction", "Energy-Efficient Lighting"]
      },
      coordinates: { top: 68, left: 45, width: 10, height: 10 },
      color: "indigo"
    },
    {
      id: "student-center",
      number: "13",
      name: "Student Central Services & Male Gym",
      shortName: "Student Center",
      category: "services",
      coordinates: { top: 70, left: 32, width: 12, height: 11 },
      color: "cyan"
    },

    // Food & Dining
    {
      id: "food-court",
      number: "—",
      name: "Food Court / Cafe",
      shortName: "Food Court",
      category: "dining",
      sustainability: {
        title: "Food Waste & Sustainable Dining",
        description: "Learn about composting, food waste reduction, and local sourcing",
        topics: ["Food Waste Reduction", "Composting", "Local Sourcing"]
      },
      coordinates: { top: 55, left: 75, width: 8, height: 9 },
      color: "orange"
    },

    // Parking
    {
      id: "parking-main",
      number: "C1-C3",
      name: "Main Parking Areas",
      shortName: "Parking",
      category: "parking",
      sustainability: {
        title: "Sustainable Transportation",
        description: "EV charging stations, carpooling, and emission reduction",
        topics: ["EV Charging", "Carpooling", "Carbon Footprint"]
      },
      coordinates: { top: 48, left: 8, width: 14, height: 25 },
      color: "gray"
    },

    // Sports & Recreation
    {
      id: "sports",
      number: "E6",
      name: "Sports Field",
      shortName: "Sports Field",
      category: "recreation",
      sustainability: {
        title: "Sustainable Sports Facilities",
        description: "Water conservation, eco-friendly turf, and solar lighting",
        topics: ["Water Conservation", "Eco-Turf", "Solar Lighting"]
      },
      coordinates: { top: 25, left: 65, width: 15, height: 12 },
      color: "green"
    }
  ];

  // Filter categories
  const filterCategories = [
    { id: "all", label: "Show All", icon: MapPin, count: buildings.length },
    {
      id: "academic",
      label: "Colleges & Academic",
      icon: GraduationCap,
      count: buildings.filter(b => b.category === "academic").length
    },
    {
      id: "dining",
      label: "Food & Dining",
      icon: Utensils,
      count: buildings.filter(b => b.category === "dining").length
    },
    {
      id: "parking",
      label: "Parking",
      icon: Car,
      count: buildings.filter(b => b.category === "parking").length
    },
    {
      id: "services",
      label: "Services & Library",
      icon: BookOpen,
      count: buildings.filter(b => b.category === "services").length
    },
    {
      id: "recreation",
      label: "Sports & Recreation",
      icon: Activity,
      count: buildings.filter(b => b.category === "recreation").length
    }
  ];

  // Filter buildings
  const filteredBuildings = useMemo(() => {
    if (selectedFilter === "all") return buildings;
    return buildings.filter(b => b.category === selectedFilter);
  }, [selectedFilter]);

  // Get color classes
  const getColorClasses = (color, isHovered = false) => {
    const colors = {
      emerald: {
        border: "border-emerald-500",
        bg: isHovered ? "bg-emerald-500/40" : "bg-emerald-400/20",
        tooltip: "bg-emerald-600"
      },
      blue: {
        border: "border-blue-500",
        bg: isHovered ? "bg-blue-500/40" : "bg-blue-400/20",
        tooltip: "bg-blue-600"
      },
      rose: {
        border: "border-rose-500",
        bg: isHovered ? "bg-rose-500/40" : "bg-rose-400/20",
        tooltip: "bg-rose-600"
      },
      amber: {
        border: "border-amber-500",
        bg: isHovered ? "bg-amber-500/40" : "bg-amber-400/20",
        tooltip: "bg-amber-600"
      },
      violet: {
        border: "border-violet-500",
        bg: isHovered ? "bg-violet-500/40" : "bg-violet-400/20",
        tooltip: "bg-violet-600"
      },
      slate: {
        border: "border-slate-500",
        bg: isHovered ? "bg-slate-500/40" : "bg-slate-400/20",
        tooltip: "bg-slate-700"
      },
      indigo: {
        border: "border-indigo-500",
        bg: isHovered ? "bg-indigo-500/40" : "bg-indigo-400/20",
        tooltip: "bg-indigo-600"
      },
      cyan: {
        border: "border-cyan-500",
        bg: isHovered ? "bg-cyan-500/40" : "bg-cyan-400/20",
        tooltip: "bg-cyan-600"
      },
      orange: {
        border: "border-orange-500",
        bg: isHovered ? "bg-orange-500/40" : "bg-orange-400/20",
        tooltip: "bg-orange-600"
      },
      gray: {
        border: "border-gray-500",
        bg: isHovered ? "bg-gray-500/40" : "bg-gray-400/20",
        tooltip: "bg-gray-700"
      },
      green: {
        border: "border-green-500",
        bg: isHovered ? "bg-green-500/40" : "bg-green-400/20",
        tooltip: "bg-green-600"
      }
    };
    return colors[color] || colors.slate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition mb-6 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
                Interactive Campus Map
              </h1>
              <p className="mt-3 text-slate-300 text-lg max-w-2xl">
                Explore UDST's sustainability initiatives across campus. Click any building to learn how sustainability connects to that space.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl px-6 py-4 shadow-2xl border border-emerald-400/30"
            >
              <div className="flex items-center gap-2 font-bold">
                <Sparkles size={20} />
                Interactive Features
              </div>
              <ul className="mt-2 text-sm text-emerald-100 space-y-1">
                <li>• Hover to preview building info</li>
                <li>• Click to open sustainability content</li>
                <li>• Filter by category</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-emerald-400" />
                <span className="font-semibold text-slate-300">Filter Buildings:</span>
              </div>

              {/* Desktop Filter Buttons */}
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                {filterCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedFilter === category.id;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedFilter(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all
                        ${isActive
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        }
                      `}
                    >
                      <Icon size={16} />
                      {category.label}
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${isActive ? 'bg-white/20' : 'bg-slate-600'}
                      `}>
                        {category.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Filter Dropdown */}
              <div className="md:hidden relative w-full">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-700/50 rounded-xl text-left"
                >
                  <span className="flex items-center gap-2">
                    {filterCategories.find(c => c.id === selectedFilter)?.icon && (
                      (() => {
                        const Icon = filterCategories.find(c => c.id === selectedFilter).icon;
                        return <Icon size={18} />;
                      })()
                    )}
                    {filterCategories.find(c => c.id === selectedFilter)?.label}
                  </span>
                  <ChevronDown size={18} className={`transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showFilterMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {filterCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedFilter(category.id);
                              setShowFilterMenu(false);
                            }}
                            className={`
                              w-full flex items-center justify-between px-4 py-3 text-left transition-colors
                              ${selectedFilter === category.id
                                ? 'bg-emerald-600 text-white'
                                : 'hover:bg-slate-700 text-slate-300'
                              }
                            `}
                          >
                            <span className="flex items-center gap-2">
                              <Icon size={18} />
                              {category.label}
                            </span>
                            <span className={`
                              text-xs px-2 py-0.5 rounded-full
                              ${selectedFilter === category.id ? 'bg-white/20' : 'bg-slate-600'}
                            `}>
                              {category.count}
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Map Image */}
          <div className="relative w-full aspect-[16/9]">
            <img
              src="/campus/udst-campus-map.png"
              alt="UDST Campus Map"
              className="w-full h-full object-cover"
            />

            {/* Overlay gradient for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Building Hotspots */}
          <div className="absolute inset-0">
            <AnimatePresence>
              {filteredBuildings.map((building) => {
                const isHovered = hoveredBuilding === building.id;
                const colorClasses = getColorClasses(building.color, isHovered);
                const hasSustainability = !!building.sustainability;

                return (
                  <motion.div
                    key={building.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                    style={{
                      top: `${building.coordinates.top}%`,
                      left: `${building.coordinates.left}%`,
                      width: `${building.coordinates.width}%`,
                      height: `${building.coordinates.height}%`,
                    }}
                  >
                    {hasSustainability ? (
                      <Link
                        href={`/campus-map/building-${building.number}`}
                        onMouseEnter={() => setHoveredBuilding(building.id)}
                        onMouseLeave={() => setHoveredBuilding(null)}
                        className={`
                          block w-full h-full rounded-2xl border-3 backdrop-blur-sm transition-all duration-300
                          ${colorClasses.border} ${colorClasses.bg}
                          cursor-pointer hover:scale-105
                          ${isHovered ? 'shadow-2xl z-20' : 'z-10'}
                        `}
                      >
                        {/* Building Number Badge */}
                        <div className={`
                          absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center
                          text-xs font-black text-white shadow-lg
                          ${colorClasses.tooltip}
                        `}>
                          {building.number}
                        </div>

                        {/* Sustainability Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Sparkles size={14} className="text-white" />
                        </motion.div>

                        {/* Hover Tooltip */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 max-w-[90vw] pointer-events-none"
                            >
                              <div className={`
                                rounded-2xl shadow-2xl border border-white/10 overflow-hidden
                                ${colorClasses.tooltip}
                              `}>
                                {/* Building Image */}
                                {building.image && (
                                  <div className="relative h-32 overflow-hidden">
                                    <img
                                      src={building.image}
                                      alt={building.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  </div>
                                )}

                                <div className="p-4">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div>
                                      <div className="font-black text-lg text-white leading-tight">
                                        {building.shortName}
                                      </div>
                                      <div className="text-xs text-white/80 mt-1">
                                        Building {building.number}
                                      </div>
                                    </div>
                                    <Building2 size={24} className="text-white/60 flex-shrink-0" />
                                  </div>

                                  <div className="text-sm text-white/90 mb-3">
                                    {building.name}
                                  </div>

                                  <div className="h-px bg-white/20 my-3" />
                                  <div className="space-y-2">
                                    <div className="text-xs font-bold text-white/90 flex items-center gap-2">
                                      <Sparkles size={14} />
                                      {building.sustainability.title}
                                    </div>
                                    <div className="text-xs text-white/70">
                                      {building.sustainability.description}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      {building.sustainability.topics.map((topic, idx) => (
                                        <span
                                          key={idx}
                                          className="text-xs px-2 py-1 bg-white/20 rounded-lg text-white"
                                        >
                                          {topic}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="mt-3 text-xs font-bold text-emerald-200">
                                    → Click to explore slides & quiz
                                  </div>
                                </div>
                              </div>

                              {/* Tooltip Arrow */}
                              <div className={`
                                w-4 h-4 rotate-45 mx-auto -mt-2
                                ${colorClasses.tooltip}
                              `} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Link>
                    ) : (
                      <div
                        onMouseEnter={() => setHoveredBuilding(building.id)}
                        onMouseLeave={() => setHoveredBuilding(null)}
                        className={`
                          w-full h-full rounded-2xl border-3 backdrop-blur-sm transition-all duration-300
                          ${colorClasses.border} ${colorClasses.bg}
                          cursor-default
                          ${isHovered ? 'shadow-2xl z-20' : 'z-10'}
                        `}
                      >
                        {/* Building Number Badge */}
                        <div className={`
                          absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center
                          text-xs font-black text-white shadow-lg
                          ${colorClasses.tooltip}
                        `}>
                          {building.number}
                        </div>

                        {/* Hover Tooltip for non-interactive buildings */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 max-w-[90vw] pointer-events-none"
                            >
                              <div className={`
                                rounded-2xl shadow-2xl border border-white/10 overflow-hidden
                                ${colorClasses.tooltip}
                              `}>
                                <div className="p-4">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div>
                                      <div className="font-black text-lg text-white leading-tight">
                                        {building.shortName}
                                      </div>
                                      <div className="text-xs text-white/80 mt-1">
                                        Building {building.number}
                                      </div>
                                    </div>
                                    <Building2 size={24} className="text-white/60 flex-shrink-0" />
                                  </div>

                                  <div className="text-sm text-white/90 mb-3">
                                    {building.name}
                                  </div>

                                  <div className="text-xs text-white/60 italic">
                                    Sustainability content coming soon
                                  </div>
                                </div>
                              </div>

                              {/* Tooltip Arrow */}
                              <div className={`
                                w-4 h-4 rotate-45 mx-auto -mt-2
                                ${colorClasses.tooltip}
                              `} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-emerald-400" />
            Map Legend
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Interactive Content</div>
                <div className="text-xs text-slate-400">Sustainability slides & quiz available</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center shadow-lg">
                <Building2 size={18} className="text-slate-300" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Building Number</div>
                <div className="text-xs text-slate-400">Official UDST building identifier</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-700/50 border-2 border-blue-500 flex items-center justify-center shadow-lg">
                <Filter size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Category Colors</div>
                <div className="text-xs text-slate-400">Each category has distinct colors</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400"
        >
          <div className="flex items-center gap-6">
            <div>
              <span className="font-bold text-emerald-400">{filteredBuildings.length}</span>
              <span className="ml-1">buildings displayed</span>
            </div>
            <div>
              <span className="font-bold text-emerald-400">
                {buildings.filter(b => b.sustainability).length}
              </span>
              <span className="ml-1">with sustainability content</span>
            </div>
          </div>
          <div className="text-xs">
            University of Doha for Science & Technology • Zone 68, Street 980
          </div>
        </motion.div>
      </div>
    </div>
  );
}