"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { Filter, Leaf } from "lucide-react";

import { buildings, filterCategories } from "../lib/campusData";

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
UDST Campus Explorer
</span>

</div>

<h1 className="text-5xl font-black bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
Interactive Campus Map
</h1>

<p className="mt-3 text-slate-300 text-lg max-w-2xl">
Drag to move the map, zoom in/out, and hover markers to explore campus locations.
</p>

</div>

{/* FILTER BAR */}

<div className="max-w-7xl mx-auto px-6 mb-6">

<div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-5">

<div className="flex items-center gap-2 text-slate-300 mb-3">
<Filter size={18}/>
<span className="font-semibold">Filter Locations</span>
</div>

<div className="flex flex-wrap gap-3">

{filterCategories.map((cat)=>{

const active = selectedFilter === cat.id;

return (

<button
key={cat.id}
onClick={()=>setSelectedFilter(cat.id)}
className={`px-4 py-2 rounded-xl text-sm font-semibold transition
${active
? "bg-emerald-600 text-white"
: "bg-slate-700 text-slate-300 hover:bg-slate-600"
}`}
>

{cat.label}

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
minScale={0.7}
maxScale={4}
wheel={{ step: 0.15 }}
panning={{ velocityDisabled: true }}
>

{({ zoomIn, zoomOut, resetTransform }) => (

<>

{/* ZOOM CONTROLS */}

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

{/* <div className="relative w-full aspect-[16/9] cursor-grab active:cursor-grabbing"> */}
<div
className="relative w-full aspect-[16/9] cursor-grab active:cursor-grabbing"
onClick={(e)=>{

const rect = e.currentTarget.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const leftPercent = (x / rect.width) * 100
const topPercent = (y / rect.height) * 100

console.log(`top:${topPercent.toFixed(2)}, left:${leftPercent.toFixed(2)}`)

}}
>

{/* <img
src="/campus/campus-map.png"
alt="Campus Map"
className="w-full h-full object-cover"
/> */}
<img
  src="/campus/campus-map.png"
  alt="Campus Map"
  className="w-full h-full object-cover"
  onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const left = (x / rect.width) * 100;
    const top = (y / rect.height) * 100;

    console.log("coordinates:", {
      top: Number(top.toFixed(2)),
      left: Number(left.toFixed(2))
    });
  }}
/>
{/* MARKERS */}

<div className="absolute inset-0">

{filteredBuildings.map((building)=>{

return (

<div
key={building.id}
className="absolute"
style={{
top:`${building.coordinates.top}%`,
left:`${building.coordinates.left}%`,
transform:"translate(-50%, -50%)"
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
className="w-9 h-9 rounded-full bg-slate-900 border border-white flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition"
>

{building.icon ? (
<img src={building.icon} className="w-5 h-5"/>
) : (
building.number
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

{/* HOVER CARD */}

{hoveredBuilding && (

<div
className="fixed z-[100] w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden pointer-events-none"
style={{
left: mousePosition.x + 20,
top: mousePosition.y + 20
}}
>

<div className="p-3 flex items-center gap-2">

{hoveredBuilding.icon && (
<img
src={hoveredBuilding.icon}
className="w-8 h-8"
/>
)}

<div>

<div className="font-semibold text-sm">
{hoveredBuilding.name}
</div>

{hoveredBuilding.number && (
<div className="text-xs text-slate-400">
Building {hoveredBuilding.number}
</div>
)}

</div>

</div>

<img
src={hoveredBuilding.image}
className="w-full h-32 object-cover"
/>

</div>

)}

</div>

);
}