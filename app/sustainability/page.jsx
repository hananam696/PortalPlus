"use client";

import { useState } from "react";
import { Leaf, Award, CheckCircle } from "lucide-react";

export default function SustainabilityPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPopup, setShowPopup] = useState(true); // demo popup

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-700">
      {/* HERO */}
      <div className="py-24 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <Leaf className="w-10 h-10" />
          Sustainability
        </h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          Track your eco progress, learn sustainable habits, and earn badges by
          making greener choices on campus.
        </p>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-t-3xl px-6 py-10 max-w-6xl mx-auto">
        {/* TABS */}
        <div className="flex justify-center gap-6 mb-10">
          <TabButton
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <TabButton
            label="Actions"
            active={activeTab === "actions"}
            onClick={() => setActiveTab("actions")}
          />
          <TabButton
            label="Badges"
            active={activeTab === "badges"}
            onClick={() => setActiveTab("badges")}
          />
        </div>

        {/* TAB CONTENT */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "actions" && <ActionsTab />}
        {activeTab === "badges" && <BadgesTab />}
      </div>

      {/* BADGE POPUP */}
      {showPopup && (
        <BadgePopup onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

/* ---------------- TAB BUTTON ---------------- */

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition
        ${
          active
            ? "bg-green-600 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );
}

/* ---------------- OVERVIEW TAB ---------------- */

function OverviewTab() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">Your Eco Progress</h2>

      <div className="bg-gray-50 rounded-2xl p-8 shadow">
        <p className="text-lg mb-2">
          🌳 <span className="font-semibold">Eco Level:</span> Forest
        </p>
        <p className="text-lg mb-4">
          ⭐ <span className="font-semibold">Eco Points:</span> 355
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-4 w-[70%]"></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          70% progress to next level
        </p>
      </div>
    </div>
  );
}

/* ---------------- ACTIONS TAB ---------------- */

function ActionsTab() {
  const actions = [
    {
      title: "Use reusable bottle",
      description: "Reduce plastic waste on campus",
    },
    {
      title: "Rent textbooks",
      description: "Save resources by sharing books",
    },
    {
      title: "Share calculators",
      description: "Avoid unnecessary electronic waste",
    },
    {
      title: "Use campus transport",
      description: "Lower carbon emissions",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {actions.map((action, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
        >
          <CheckCircle className="text-green-600 mb-3" />
          <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
          <p className="text-gray-600 text-sm">{action.description}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- BADGES TAB ---------------- */

function BadgesTab() {
  const badges = [
    { name: "First Green Step", unlocked: true },
    { name: "Smart Renter", unlocked: true },
    { name: "Eco Aware", unlocked: false },
    { name: "Sustainability Champion", unlocked: false },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`rounded-2xl p-6 text-center shadow ${
            badge.unlocked
              ? "bg-green-50"
              : "bg-gray-100 opacity-60"
          }`}
        >
          <Award
            className={`mx-auto mb-3 ${
              badge.unlocked ? "text-green-600" : "text-gray-400"
            }`}
            size={32}
          />
          <p className="font-semibold">{badge.name}</p>
          <p className="text-sm text-gray-500">
            {badge.unlocked ? "Unlocked" : "Locked"}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- BADGE POPUP ---------------- */

function BadgePopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[320px] text-center animate-popup">
        <div className="text-5xl mb-4">🌱</div>

        <h2 className="text-2xl font-bold mb-2 text-green-600">
          Badge Unlocked!
        </h2>

        <p className="text-gray-600 mb-6">
          You earned the <span className="font-semibold">First Green Step</span>{" "}
          badge for making sustainable choices.
        </p>

        <button
          onClick={onClose}
          className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
