"use client";

import { Filter, Leaf, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { buildings, filterCategories } from "../lib/campusData";

// Color per category
const categoryColors = {
  academic:       { bg: "#3b82f6", text: "#fff" },
  sustainability: { bg: "#22c55e", text: "#fff" },
  clinic:         { bg: "#f43f5e", text: "#fff" },
  dining:         { bg: "#f97316", text: "#fff" },
  metro:          { bg: "#6366f1", text: "#fff" },
  parking:        { bg: "#64748b", text: "#fff" },
  services:       { bg: "#06b6d4", text: "#fff" },
  recreation:     { bg: "#a855f7", text: "#fff" },
    training:     { bg: "#14b8a6", text: "#fff" }

};

function getCategoryColor(category) {
  return categoryColors[category] || { bg: "#1e293b", text: "#fff" };
}

function BuildingPin({ building, isHighlighted }) {
  const { bg, text } = getCategoryColor(building.category);

  const highlightRing = isHighlighted
    ? { outline: "3px solid #ef4444", outlineOffset: "2px" }
    : {};

  if (building.icon) {
    return (
      <div
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-150"
        style={{ boxShadow: `0 0 0 3px ${bg}`, ...highlightRing }}
      >
        <img src={building.icon} className="w-6 h-6 object-contain" alt="" />
      </div>
    );
  }

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-125 transition-transform duration-150"
      style={{
        backgroundColor: bg,
        color: text,
        boxShadow: `0 2px 8px ${bg}88`,
        ...highlightRing,
      }}
    >
      {building.number}
    </div>
  );
}

export default function CampusMapPage() {
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const transformRef = useRef(null);
  const mapContainerRef = useRef(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    // Normalize: lowercase + strip special chars like ' ' so "lh" matches "L'Hardy"
    const normalize = (str) =>
      str.toLowerCase().replace(/[^a-z0-9 ]/g, "");

    const q = normalize(searchQuery);

    return buildings
      .filter(
        (b) =>
          normalize(b.name).includes(q) ||
          (b.shortName && normalize(b.shortName).includes(q)) ||
          (b.number && normalize(b.number).includes(q)) ||
          normalize(b.category).includes(q)
      )
      .slice(0, 10); // raise limit so duplicates (Tim Hortons x2, L'Hardy x2) both show
  }, [searchQuery]);

  const filteredBuildings = useMemo(() => {
    if (selectedFilter === "all") return buildings;
    return buildings.filter((b) => b.category === selectedFilter);
  }, [selectedFilter]);

  const areaBuildings = filteredBuildings.filter(
    (b) => b.coordinates.width && b.coordinates.height
  );
  const pinBuildings = filteredBuildings.filter(
    (b) => !b.coordinates.width || !b.coordinates.height
  );
  const allRenderedBuildings = [...areaBuildings, ...pinBuildings];

  const handleBuildingClick = (building) => {
    if (building.link) router.push(building.link);
  };

  const handleSearchSelect = (building) => {
    setSearchQuery(building.name);
    setSearchFocused(false);
    setHighlightedId(building.id);
    setSelectedFilter("all");
    setTimeout(() => setHighlightedId(null), 3000);

    if (transformRef.current && mapContainerRef.current) {
      const container = mapContainerRef.current;
      const containerW = container.offsetWidth;
      const containerH = container.offsetHeight;
      const pinX = (building.coordinates.left / 100) * containerW;
      const pinY = (building.coordinates.top / 100) * containerH;
      const zoomLevel = 2.5;

      transformRef.current.setTransform(
        containerW / 2 - pinX * zoomLevel,
        containerH / 2 - pinY * zoomLevel,
        zoomLevel,
        600,
        "easeOut"
      );
    }
  };

  return (
    <>
      <style>{`
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.7; }
        }
      `}</style>

      <div className="min-h-screen text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Leaf size={20} />
            </div>
            <span className="text-emerald-400 font-semibold tracking-wide">
              UDST Campus Explorer
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-6">

            <div className="flex-1">
              <h1 className="text-5xl font-black bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
                Interactive Campus Map
              </h1>
              <p className="mt-3 text-slate-300 text-lg max-w-2xl">
                Drag to move the map, zoom in/out, and hover markers to explore campus locations.
              </p>
            </div>

            {/* SEARCH BAR */}
            <div className="relative w-full md:w-80">

              <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 focus-within:border-emerald-500 transition">
                <Search size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search buildings, cafés, parking..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  className="bg-transparent text-sm text-white placeholder-slate-400 outline-none w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setHighlightedId(null);
                    }}
                  >
                    <X size={14} className="text-slate-400 hover:text-white" />
                  </button>
                )}
              </div>

              {/* DROPDOWN */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-[200] overflow-hidden">
                  {searchResults.map((b, idx) => {
                    const { bg } = getCategoryColor(b.category);
                    // Check if another result shares the same name (duplicate)
                    const isDuplicate = searchResults.filter((r) => r.name === b.name).length > 1;
                    // Build a location hint using shortName or coordinates quadrant
                    const locationHint = isDuplicate
                      ? (b.shortName && b.shortName !== b.name
                          ? b.shortName
                          : `Location ${idx + 1} — ${b.coordinates.top < 50 ? "North" : "South"} ${b.coordinates.left < 50 ? "West" : "East"}`)
                      : null;
                    return (
                      <button
                        key={b.id}
                        onMouseDown={() => handleSearchSelect(b)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition text-left"
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 text-white"
                          style={{ backgroundColor: bg }}
                        >
                          {b.number || b.category.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{b.name}</div>
                          <div className="text-xs text-slate-400 capitalize">
                            {b.category}
                            {locationHint && (
                              <span className="ml-1 text-slate-300">· {locationHint}</span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {searchFocused && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-[200] px-4 py-3 text-sm text-slate-400">
                  No results found
                </div>
              )}

            </div>

          </div>

        </div>

        {/* FILTER BAR */}
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-5">

            <div className="flex items-center gap-2 text-slate-300 mb-3">
              <Filter size={18} />
              <span className="font-semibold">Filter Locations</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {filterCategories.map((cat) => {
                const active = selectedFilter === cat.id;
                const { bg } = getCategoryColor(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedFilter(cat.id)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition"
                    style={
                      active
                        ? { backgroundColor: bg, color: "#fff" }
                        : { backgroundColor: "rgb(51 65 85)", color: "rgb(203 213 225)" }
                    }
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.backgroundColor = "rgb(71 85 105)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.backgroundColor = "rgb(51 65 85)";
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* COLOR LEGEND */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700">
              {Object.entries(categoryColors).map(([cat, { bg }]) => (
                <div key={cat} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: bg }} />
                  <span className="capitalize">{cat}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* MAP */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">

            <TransformWrapper
              ref={transformRef}
              initialScale={1}
              minScale={0.7}
              maxScale={4}
              wheel={{ step: 0.15 }}
              panning={{ velocityDisabled: true }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>

                  {/* ZOOM BUTTONS */}
                  <div className="absolute right-4 top-4 flex flex-col gap-2 z-50">
                    <button
                      onClick={() => zoomIn()}
                      className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 text-white font-bold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 text-white font-bold"
                    >
                      −
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 text-white"
                    >
                      ⟳
                    </button>
                  </div>

                  <TransformComponent>
                    <div
                      ref={mapContainerRef}
                      className="relative w-full aspect-[16/9] cursor-grab active:cursor-grabbing"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        console.log(
                          `coordinates:{top:${((y / rect.height) * 100).toFixed(2)}, left:${((x / rect.width) * 100).toFixed(2)}}`
                        );
                      }}
                    >
                      <img
                        src="/campus/campus-map.png"
                        alt="Campus Map"
                        className="w-full h-full object-cover"
                      />

                      {/* PINS */}
                      <div className="absolute inset-0">
                        {allRenderedBuildings.map((building) => (
                          <div
                            key={`pin-${building.id}`}
                            className="absolute"
                            style={{
                              top: `${building.coordinates.top}%`,
                              left: `${building.coordinates.left}%`,
                              transform: "translate(-50%, -50%)",
                              zIndex: highlightedId === building.id ? 30 : 10,
                            }}
                            onMouseEnter={(e) => {
                              setHoveredBuilding(building);
                              setMousePosition({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseMove={(e) => {
                              setMousePosition({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseLeave={() => setHoveredBuilding(null)}
                          >
                            <div
                              onClick={() => handleBuildingClick(building)}
                              className="relative flex flex-col items-center"
                            >
                              {/* Bouncing arrow when highlighted */}
                              {highlightedId === building.id && (
                                <div
                                  className="absolute flex flex-col items-center"
                                  style={{
                                    top: "-52px",
                                    animation: "bounceArrow 0.7s ease-in-out infinite",
                                  }}
                                >
                                  <div
                                    className="text-red-500 font-black text-2xl leading-none drop-shadow-lg"
                                    style={{ textShadow: "0 0 8px #ef4444" }}
                                  >
                                    ▼
                                  </div>
                                  <div
                                    className="text-red-500 font-black text-lg leading-none opacity-60"
                                    style={{ marginTop: "-6px" }}
                                  >
                                    ▼
                                  </div>
                                </div>
                              )}

                              <BuildingPin
                                building={building}
                                isHighlighted={highlightedId === building.id}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </TransformComponent>

                </>
              )}
            </TransformWrapper>

          </div>
        </div>

        {/* HOVER CARD */}
        {hoveredBuilding && (
          <div
            className="fixed z-[100] w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden pointer-events-none"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y + 20,
            }}
          >
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: getCategoryColor(hoveredBuilding.category).bg }}
            />
            <div className="p-3 flex items-center gap-2">
              {hoveredBuilding.icon && (
                <img src={hoveredBuilding.icon} className="w-8 h-8 rounded-full" alt="" />
              )}
              <div>
                <div className="font-semibold text-sm">{hoveredBuilding.name}</div>
                {hoveredBuilding.number && (
                  <div className="text-xs text-slate-400">Building {hoveredBuilding.number}</div>
                )}
                <div
                  className="text-xs font-medium mt-0.5 capitalize"
                  style={{ color: getCategoryColor(hoveredBuilding.category).bg }}
                >
                  {hoveredBuilding.category}
                </div>
                {hoveredBuilding.description && (
                  <div className="text-xs text-slate-400 whitespace-pre-line mt-1">
                    {hoveredBuilding.description}
                  </div>
                )}
              </div>
            </div>
            <img
              src={hoveredBuilding.image}
              className="w-full h-32 object-cover"
              alt={hoveredBuilding.name}
            />
          </div>
        )}

      </div>
    </>
  );
}