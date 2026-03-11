"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import {
  Filter,
  Leaf
} from "lucide-react";

import { buildings, filterCategories, colorMap } from "../lib/campusData";

export default function CampusMapPage() {

const router = useRouter();

const [selectedFilter, setSelectedFilter] = useState("all");
const [hoveredBuilding, setHoveredBuilding] = useState(null);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

const filteredBuildings = useMemo(() => {
if (selectedFilter === "all") return buildings;
return buildings.filter((b) => b.category === selectedFilter);
}, [selectedFilter]);

const handleBuildingClick = (building) => {
if (building.link) router.push(building.link);
};

return (

<div className="min-h-screen text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

{/* HEADER */}

<div className="max-w-7xl mx-auto px-6 py-10">

<div className="flex items-center gap-3 mb-6">

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
Hover buildings to preview them and click to explore more.
</p>

</div>


{/* FILTER BAR */}

<div className="max-w-7xl mx-auto px-6 mb-6">

<div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-5">

<div className="flex items-center gap-2 text-slate-300 mb-3">
<Filter size={18}/>
<span className="font-semibold">Filter Buildings</span>
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

<div className="max-w-7xl mx-auto px-6">

<div className="relative bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">

<TransformWrapper
initialScale={1}
minScale={0.8}
maxScale={4}
wheel={{ step: 0.2 }}
>

{({ zoomIn, zoomOut, resetTransform }) => (

<>

{/* ZOOM BUTTONS */}

<div className="absolute right-4 top-4 flex flex-col gap-2 z-50">

<button
onClick={() => zoomIn()}
className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700"
>
+
</button>

<button
onClick={() => zoomOut()}
className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700"
>
−
</button>

<button
onClick={() => resetTransform()}
className="w-10 h-10 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700"
>
⟳
</button>

</div>

<TransformComponent>

<div className="relative w-full aspect-[16/9]">

<img
src="/campus/campus-map.png"
alt="Campus Map"
className="w-full h-full object-cover"
/>

{/* BUILDING HOTSPOTS */}

<div className="absolute inset-0">

{filteredBuildings.map((building)=>{

const colors = colorMap[building.color] || colorMap.emerald;

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

onMouseEnter={(e)=>{
setHoveredBuilding(building);
setMousePosition({ x:e.clientX, y:e.clientY });
}}

onMouseMove={(e)=>{
setMousePosition({ x:e.clientX, y:e.clientY });
}}

onMouseLeave={()=>setHoveredBuilding(null)}

>

<div
onClick={()=>handleBuildingClick(building)}
className={`relative w-full h-full rounded-xl border-2 backdrop-blur-sm transition cursor-pointer
${colors.border}
${colors.bg}`}
>

<div className={`absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${colors.badge}`}>
{building.number}
</div>

{building.isSustainability && (
<div className="absolute bottom-1 right-1 text-green-400 text-xs">
🌱
</div>
)}

</div>

</div>

);

})}

</div>

</div>

</TransformComponent>

</>

)}

</TransformWrapper>

</div>

</div>


{/* FLOATING PREVIEW CARD */}

{hoveredBuilding && (

<div
className="fixed z-[100] w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden pointer-events-none"
style={{
left: mousePosition.x + 20,
top: mousePosition.y + 20
}}
>

<img
src={hoveredBuilding.image}
className="w-full h-32 object-cover"
/>

<div className="p-3">

<div className="font-semibold text-sm flex items-center gap-2">

{hoveredBuilding.isSustainability && (
<span className="text-green-400">🌱</span>
)}

{hoveredBuilding.name}

</div>

<div className="text-xs text-slate-400 mt-1">
Building {hoveredBuilding.number}
</div>

</div>

</div>

)}

</div>

);
}