"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import {
  Filter,
  MapPin,
  GraduationCap,
  Utensils,
  Car,
  BookOpen,
  Activity,
  ChevronDown,
  Sparkles,
  Leaf,
  Building2
} from "lucide-react";

import { buildings, filterCategories, colorMap } from "../lib/campusData";

export default function CampusMapPage() {

  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filteredBuildings = useMemo(() => {
    if (selectedFilter === "all") return buildings;
    return buildings.filter((b) => b.category === selectedFilter);
  }, [selectedFilter]);

  const handleBuildingClick = (building) => {
    if (building.link) router.push(building.link);
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8">

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Leaf size={20}/>
            </div>

            <span className="text-emerald-400 font-semibold tracking-wide">
              UDST SUSTAINABILITY HUB
            </span>
          </div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
            Interactive Campus Map
          </h1>

          <p className="mt-3 text-slate-300 text-lg max-w-2xl">
            Explore UDST's sustainability initiatives across campus. Click any highlighted building to discover eco-friendly features and initiatives.
          </p>

          {/* HOW TO USE CARD */}
          <div className="mt-6 bg-emerald-900/40 border border-emerald-600/40 rounded-2xl px-6 py-4 max-w-md">

            <div className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
              <Sparkles size={16}/>
              How to use
            </div>

            <ul className="text-sm text-emerald-100 space-y-1">
              <li>• Hover any building to preview info</li>
              <li>• Click a green ✦ building for sustainability details</li>
              <li>• Building 10 has a full interactive tour</li>
            </ul>

          </div>

        </div>


        {/* FILTER BAR */}
        <div className="mb-6">

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-5">

            <div className="flex items-center gap-2 text-slate-300 mb-3">
              <Filter size={18}/>
              <span className="font-semibold">Filter Buildings:</span>
            </div>

            <div className="flex flex-wrap gap-3">

              {filterCategories.map((cat)=>{

                const active = selectedFilter === cat.id;
                const count = cat.id === "all"
                  ? buildings.length
                  : buildings.filter(b=>b.category===cat.id).length;

                return (

                  <button
                    key={cat.id}
                    onClick={()=>setSelectedFilter(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
                    ${active
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >

                    {cat.label}

                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/30">
                      {count}
                    </span>

                  </button>

                );

              })}

            </div>

          </div>

        </div>


        {/* MAP */}
        <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">

          <div className="relative w-full aspect-[16/9]">
            <img
              src="/campus/campus-map.png"
              className="w-full h-full object-cover"
              alt="Campus map"
            />
          </div>


          {/* HOTSPOTS */}
          <div className="absolute inset-0">

            {filteredBuildings.map((building)=>{

              const colors = colorMap[building.color] || colorMap.emerald;
              const isHovered = hoveredBuilding === building.id;

              return (

                <div
                  key={building.id}
                  className="absolute"
                  style={{
                    top:`${building.coordinates.top}%`,
                    left:`${building.coordinates.left}%`,
                    width:`${building.coordinates.width}%`,
                    height:`${building.coordinates.height}%`
                  }}
                  onMouseEnter={()=>setHoveredBuilding(building.id)}
                  onMouseLeave={()=>setHoveredBuilding(null)}
                >

                  <div
                    onClick={()=>handleBuildingClick(building)}
                    className={`relative w-full h-full rounded-xl border-2 backdrop-blur-sm transition
                    ${colors.border}
                    ${isHovered ? colors.hover : colors.bg}`}
                  >

                    <div className={`absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${colors.badge}`}>
                      {building.number}
                    </div>

                    {building.sustainability && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Sparkles size={12}/>
                      </div>
                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </div>


        {/* MAP LEGEND */}
        <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-2xl p-6">

          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin size={20}/>
            Map Legend
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Sparkles size={16}/>
              </div>
              <div>
                <div className="font-bold">Interactive</div>
                <div className="text-xs text-slate-400">
                  Has sustainability content
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                10
              </div>
              <div>
                <div className="font-bold">Building 10 — CCIT</div>
                <div className="text-xs text-slate-400">
                  Full interactive lab tour
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center">
                <Leaf size={16}/>
              </div>
              <div>
                <div className="font-bold">Sustainability Facilities</div>
                <div className="text-xs text-slate-400">
                  Dedicated sustainability locations
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                <Building2 size={16}/>
              </div>
              <div>
                <div className="font-bold">Other Buildings</div>
                <div className="text-xs text-slate-400">
                  General campus facilities
                </div>
              </div>
            </div>

          </div>

        </div>


        {/* FOOTER STATS */}
        <div className="mt-6 flex justify-between text-sm text-slate-400">

          <div>
            <span className="text-emerald-400 font-bold">
              {filteredBuildings.length}
            </span>
            <span className="ml-1">buildings shown</span>
          </div>

          <div className="text-xs">
            University of Doha for Science & Technology · Zone 68
          </div>

        </div>

      </div>
    </div>
  );
}