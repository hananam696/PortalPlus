"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue (important)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function CampusMapPage() {
  // Example coordinates (replace with UDST actual ones later if needed)
  const campusCenter = [25.3735, 51.4881];

  const locations = [
    {
      name: "Main Library",
      position: [25.3738, 51.4883],
      description: "Study spaces and academic resources",
    },
    {
      name: "Rental Hub",
      position: [25.3732, 51.4878],
      description: "Borrow textbooks and calculators",
    },
    {
      name: "Engineering Labs",
      position: [25.3736, 51.4887],
      description: "Practical learning facilities",
    },
    {
      name: "Cafeteria",
      position: [25.3730, 51.4885],
      description: "Food court and student seating",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-blue-500">
      {/* HERO */}
      <div className="py-20 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Campus Map</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Explore campus facilities and find important locations easily.
        </p>
      </div>

      {/* MAP CONTAINER */}
      <div className="bg-white rounded-t-3xl px-6 py-8 max-w-6xl mx-auto">
        <div className="h-[500px] rounded-2xl overflow-hidden shadow">
          <MapContainer
            center={campusCenter}
            zoom={17}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((loc, index) => (
              <Marker key={index} position={loc.position}>
                <Popup>
                  <h3 className="font-semibold">{loc.name}</h3>
                  <p className="text-sm">{loc.description}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* LEGEND */}
        <div className="mt-6 text-center text-sm text-gray-600">
          📍 Click on markers to view campus locations
        </div>
      </div>
    </div>
  );
}
