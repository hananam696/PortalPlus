"use client";

import { useState } from "react";
import { BookOpen, Calculator } from "lucide-react";

export default function RentalHubPage() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600">
      {/* HERO */}
      <div className="py-24 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Rental Hub
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Borrow textbooks and calculators from fellow students to save money
          and reduce resource consumption.
        </p>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-t-3xl px-6 py-10 max-w-6xl mx-auto">
        {/* TABS */}
        <div className="flex justify-center gap-6 mb-10">
          <TabButton
            label="Books"
            icon={<BookOpen />}
            active={activeTab === "books"}
            onClick={() => setActiveTab("books")}
          />
          <TabButton
            label="Calculators"
            icon={<Calculator />}
            active={activeTab === "calculators"}
            onClick={() => setActiveTab("calculators")}
          />
        </div>

        {/* TAB CONTENT */}
        {activeTab === "books" && <BooksTab />}
        {activeTab === "calculators" && <CalculatorsTab />}
      </div>
    </div>
  );
}

/* ---------------- TAB BUTTON ---------------- */

function TabButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition
        ${
          active
            ? "bg-indigo-600 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ---------------- BOOKS TAB ---------------- */

function BooksTab() {
  const books = [
    {
      title: "Data Structures & Algorithms",
      course: "CS204",
      status: "Available",
    },
    {
      title: "Engineering Mathematics",
      course: "MATH201",
      status: "Rented",
    },
    {
      title: "Database Systems",
      course: "CS310",
      status: "Available",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <RentalCard
          key={index}
          icon={<BookOpen />}
          title={book.title}
          subtitle={book.course}
          status={book.status}
        />
      ))}
    </div>
  );
}

/* ---------------- CALCULATORS TAB ---------------- */

function CalculatorsTab() {
  const calculators = [
    {
      title: "Casio FX-991ES Plus",
      course: "Engineering",
      status: "Available",
    },
    {
      title: "Texas Instruments TI-84",
      course: "Statistics",
      status: "Rented",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {calculators.map((calc, index) => (
        <RentalCard
          key={index}
          icon={<Calculator />}
          title={calc.title}
          subtitle={calc.course}
          status={calc.status}
        />
      ))}
    </div>
  );
}

/* ---------------- RENTAL CARD ---------------- */

function RentalCard({ icon, title, subtitle, status }) {
  const isAvailable = status === "Available";

  return (
    <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div className="text-indigo-600 mb-3">{icon}</div>

      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

      <span
        className={`inline-block px-3 py-1 text-sm rounded-full font-medium
          ${
            isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
      >
        {status}
      </span>
    </div>
  );
}