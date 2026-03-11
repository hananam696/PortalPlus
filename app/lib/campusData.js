export const buildings = [
{
id:"ccit",
number:"10",
name:"College of Computing and IT",
shortName:"CCIT",
category:"academic",
coordinates:{top:48,left:32,width:9,height:11},
color:"emerald",
link:"/campus-map/building-10"
},

{
id:"cge",
number:"05",
name:"College of General Education",
shortName:"CGE",
category:"academic",
coordinates:{top:60,left:25,width:8,height:10},
color:"violet"
},

{
id:"cob",
number:"12",
name:"College of Business",
shortName:"COB",
category:"academic",
coordinates:{top:52,left:38,width:9,height:11},
color:"amber"
},

{
id:"chs19",
number:"19",
name:"College of Health Sciences",
shortName:"CHS",
category:"academic",
coordinates:{top:35,left:20,width:10,height:13},
color:"rose"
},

{
id:"chs20",
number:"20",
name:"College of Health Sciences Annex",
shortName:"CHS Annex",
category:"academic",
coordinates:{top:36,left:30,width:10,height:13},
color:"rose"
},

{
id:"library",
number:"14",
name:"Library Services",
shortName:"Library",
category:"services",
coordinates:{top:66,left:46,width:9,height:10},
color:"indigo"
},

{
id:"studentcenter",
number:"13",
name:"Student Center",
shortName:"Student Center",
category:"services",
coordinates:{top:64,left:34,width:10,height:10},
color:"cyan"
},

{
id:"auditorium",
number:"01",
name:"Auditorium",
shortName:"Auditorium",
category:"services",
coordinates:{top:70,left:18,width:9,height:11},
color:"slate"
},

{
id:"foodcourt",
number:"FC",
name:"Food Court",
shortName:"Food Court",
category:"dining",
coordinates:{top:56,left:60,width:8,height:9},
color:"orange"
},

{
id:"sports",
number:"E6",
name:"Sports Field",
shortName:"Sports Field",
category:"recreation",
coordinates:{top:22,left:60,width:15,height:13},
color:"green"
},

{
id:"wellnessF",
number:"17",
name:"Wellness Female",
shortName:"Wellness F",
category:"recreation",
coordinates:{top:27,left:41,width:8,height:11},
color:"pink"
},

{
id:"wellnessM",
number:"18",
name:"Wellness Male",
shortName:"Wellness M",
category:"recreation",
coordinates:{top:27,left:50,width:8,height:11},
color:"teal"
},

{
id:"parkingC1",
number:"C1",
name:"Parking C1",
shortName:"Parking",
category:"parking",
coordinates:{top:72,left:8,width:9,height:12},
color:"gray"
},

{
id:"parkingC2",
number:"C2",
name:"Parking C2",
shortName:"Parking",
category:"parking",
coordinates:{top:58,left:8,width:9,height:12},
color:"gray"
},

{
id:"parkingC3",
number:"C3",
name:"Parking C3",
shortName:"Parking",
category:"parking",
coordinates:{top:44,left:8,width:9,height:12},
color:"gray"
},

{
id:"a25",
number:"A25",
name:"Centre of Excellence Sustainability",
shortName:"A25",
category:"sustainability",
coordinates:{top:12,left:74,width:10,height:10},
color:"emerald"
},

{
id:"a26",
number:"A26",
name:"Vertical Farming",
shortName:"A26",
category:"sustainability",
coordinates:{top:12,left:85,width:8,height:9},
color:"green"
},

{
id:"a27",
number:"A27",
name:"Smart Greenhouse",
shortName:"A27",
category:"sustainability",
coordinates:{top:24,left:85,width:8,height:9},
color:"lime"
}
]

export const filterCategories=[
{id:"all",label:"Show All"},
{id:"academic",label:"Colleges"},
{id:"sustainability",label:"Sustainability Spots"},
{id:"dining",label:"Dining"},
{id:"parking",label:"Parking"},
{id:"services",label:"Services"},
{id:"recreation",label:"Recreation"}
]

export const colorMap={
emerald:{border:"border-emerald-500",bg:"bg-emerald-400/20",hover:"bg-emerald-500/40",badge:"bg-emerald-600"},
blue:{border:"border-blue-500",bg:"bg-blue-400/20",hover:"bg-blue-500/40",badge:"bg-blue-600"},
rose:{border:"border-rose-500",bg:"bg-rose-400/20",hover:"bg-rose-500/40",badge:"bg-rose-600"},
amber:{border:"border-amber-500",bg:"bg-amber-400/20",hover:"bg-amber-500/40",badge:"bg-amber-600"},
violet:{border:"border-violet-500",bg:"bg-violet-400/20",hover:"bg-violet-500/40",badge:"bg-violet-600"},
indigo:{border:"border-indigo-500",bg:"bg-indigo-400/20",hover:"bg-indigo-500/40",badge:"bg-indigo-600"},
cyan:{border:"border-cyan-500",bg:"bg-cyan-400/20",hover:"bg-cyan-500/40",badge:"bg-cyan-600"},
orange:{border:"border-orange-500",bg:"bg-orange-400/20",hover:"bg-orange-500/40",badge:"bg-orange-600"},
gray:{border:"border-gray-500",bg:"bg-gray-400/20",hover:"bg-gray-500/40",badge:"bg-gray-700"},
green:{border:"border-green-500",bg:"bg-green-400/20",hover:"bg-green-500/40",badge:"bg-green-600"},
pink:{border:"border-pink-500",bg:"bg-pink-400/20",hover:"bg-pink-500/40",badge:"bg-pink-600"},
teal:{border:"border-teal-500",bg:"bg-teal-400/20",hover:"bg-teal-500/40",badge:"bg-teal-600"},
lime:{border:"border-lime-500",bg:"bg-lime-400/20",hover:"bg-lime-500/40",badge:"bg-lime-600"}
}