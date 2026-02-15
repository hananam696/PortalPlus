"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Shield,
  Cpu,
  Video,
  Server,
  GraduationCap,
  Recycle,
  Info
} from "lucide-react";

export default function CCITBuildingInterior() {
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const rooms = [
    {
      id: "cyber-security-lab",
      name: "Cyber Security Lab",
      floor: "Ground Floor",
      icon: Shield,
      image: "/campus/buildings/labs/cyber-security-lab.jpg",
      hasSustainability: true,
      description: "24 workstations with enterprise security systems.",
      sustainability: {
        title: "Energy-Smart Lab Infrastructure",
        description: "Power scheduling and efficient server cooling reduce energy waste.",
        impact: "Lower electricity demand and improved cooling efficiency."
      },
      coordinates: { top: 15, left: 15, width: 20, height: 15 },
      color: "border-blue-500 bg-blue-400/30"
    },
    {
      id: "ai-iot-lab",
      name: "AI-IoT Lab",
      floor: "Ground Floor",
      icon: Cpu,
      image: "/campus/buildings/labs/ai-iot-lab.jpg",
      hasSustainability: true,
      description: "AI robotics and IoT innovation hub.",
      sustainability: {
        title: "Sustainable AI Computing",
        description: "GPU optimization and auto-sleep systems minimize power use.",
        impact: "Reduced energy usage for AI workloads."
      },
      coordinates: { top: 25, left: 60, width: 20, height: 16 },
      color: "border-violet-500 bg-violet-400/30"
    },
    {
      id: "huawei-lab",
      name: "Huawei Lab",
      floor: "Ground Floor",
      icon: Server,
      image: "/campus/buildings/labs/huawei-lab.jpg",
      hasSustainability: true,
      description: "High-performance computing innovation center.",
      sustainability: {
        title: "Green Data Center Practices",
        description: "Virtualization reduces hardware dependency and cooling load.",
        impact: "Improved cooling efficiency and lower emissions."
      },
      coordinates: { top: 50, left: 15, width: 22, height: 16 },
      color: "border-cyan-500 bg-cyan-400/30"
    },
    {
      id: "media-lab",
      name: "Media Lab",
      floor: "Ground Floor",
      icon: Video,
      image: "/campus/buildings/labs/media-lab.jpg",
      hasSustainability: true,
      description: "Digital media production studio.",
      sustainability: {
        title: "Digital-First Production",
        description: "Cloud workflows reduce physical storage and printing.",
        impact: "Significant reduction in physical media waste."
      },
      coordinates: { top: 42, left: 55, width: 18, height: 14 },
      color: "border-rose-500 bg-rose-400/30"
    },
    {
      id: "classrooms",
      name: "Classrooms",
      floor: "All Floors",
      icon: GraduationCap,
      hasSustainability: true,
      description: "Smart classrooms with digital platforms.",
      sustainability: {
        title: "Smart Classroom Technology",
        description: "LED lighting + digital learning reduces paper and electricity.",
        impact: "Energy savings + paper reduction."
      },
      coordinates: { top: 65, left: 45, width: 25, height: 13 },
      color: "border-amber-500 bg-amber-400/30"
    },
    {
      id: "recycling",
      name: "Recycling Stations",
      floor: "All Floors",
      icon: Recycle,
      hasSustainability: true,
      description: "Recycling bins for paper, plastic, aluminum.",
      sustainability: {
        title: "Campus Recycling Program",
        description: "Standardized bins across floors encourage proper waste segregation.",
        impact: "Waste diverted from landfill."
      },
      coordinates: { top: 15, left: 42, width: 14, height: 10 },
      color: "border-emerald-500 bg-emerald-400/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <Link href="/campus-map" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
            <ArrowLeft size={18} />
            Back to Campus Map
          </Link>

          <h1 className="text-4xl font-black bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
            CCIT Building 10 – Sustainability Overview
          </h1>

          <p className="text-slate-300 mt-4 max-w-3xl">
            Click on any sustainability-enabled lab to explore awareness slides and quiz.
          </p>
        </div>

        {/* MAP */}
        <div className="relative bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative w-full aspect-[16/10] bg-slate-900">

            {rooms.map((room) => {
              const Icon = room.icon || Info;
              const isHovered = hoveredRoom === room.id;

              return room.hasSustainability ? (
                <Link
                  key={room.id}
                  href={`/campus-map/building-10/${room.id}`}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className={`absolute border-2 rounded-xl p-2 backdrop-blur-sm cursor-pointer hover:scale-105 transition ${room.color}`}
                  style={{
                    top: `${room.coordinates.top}%`,
                    left: `${room.coordinates.left}%`,
                    width: `${room.coordinates.width}%`,
                    height: `${room.coordinates.height}%`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    <span className="text-xs font-bold">{room.name}</span>
                  </div>

                  {isHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl overflow-hidden z-50">
                      {room.image && (
                        <div className="relative h-32 w-full">
                          <Image src={room.image} alt={room.name} fill className="object-cover" />
                        </div>
                      )}
                      <div className="p-4 text-xs">
                        <div className="font-bold mb-2">{room.name}</div>
                        <p className="text-slate-300 mb-3">{room.description}</p>
                        <div className="text-emerald-400 font-semibold">
                          {room.sustainability.title}
                        </div>
                        <div className="text-slate-300">
                          {room.sustainability.description}
                        </div>
                        <div className="mt-2 text-emerald-300 font-bold">
                          💚 {room.sustainability.impact}
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              ) : null;
            })}

          </div>
        </div>

      </div>
    </div>
  );
}
