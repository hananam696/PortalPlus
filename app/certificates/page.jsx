"use client";

import { useState } from "react";
import { FileText, Upload, Search } from "lucide-react";

export default function CertificatesPage() {
  const [query, setQuery] = useState("");
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "Sustainability Workshop",
      type: "Workshop",
      date: "2024-03-12",
    },
    {
      id: 2,
      title: "Internship Completion",
      type: "Internship",
      date: "2023-08-30",
    },
  ]);

  const filtered = certificates.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-2">Certificate Repository</h1>
      <p className="text-gray-600 mb-6">
        Store and manage your academic and extracurricular certificates
      </p>

      {/* Search + Upload */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search certificates..."
            className="w-full pl-10 p-3 rounded-xl border shadow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
          <Upload size={18} /> Upload Certificate
        </button>
      </div>

      {/* Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((cert) => (
          <div
            key={cert.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <FileText className="text-green-600 mb-3" />
            <h2 className="font-semibold">{cert.title}</h2>
            <p className="text-sm text-gray-500">{cert.type}</p>
            <p className="text-xs text-gray-400 mt-1">{cert.date}</p>

            <button className="mt-4 w-full py-2 border rounded-lg hover:bg-gray-100">
              View Certificate
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
