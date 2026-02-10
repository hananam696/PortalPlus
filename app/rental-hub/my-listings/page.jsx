"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Trash2,
  Pencil,
  BadgeCheck,
  Clock,
  XCircle,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
/* Later this will come from backend (Firebase / Supabase / MongoDB) */

const myBooks = [
  {
    id: "my_book_001",
    title: "Introduction to Programming",
    author: "UDST Faculty",
    condition: "Good",
    priceType: "Rent",
    price: 15,
    duration: "2 weeks",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "my_book_002",
    title: "Business Communication",
    author: "Pearson",
    condition: "Like New",
    priceType: "Sale",
    price: 45,
    duration: "-",
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&fit=crop&q=60",
  },
];

const myCalculators = [
  {
    id: "my_calc_001",
    brand: "Casio",
    model: "FX-991ES Plus",
    condition: "Like New",
    price: 5,
    deposit: 30,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900d1?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "my_calc_002",
    brand: "Texas Instruments",
    model: "TI-84 Plus",
    condition: "Good",
    price: 8,
    deposit: 50,
    status: "Rented",
    image:
      "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=900&auto=format&fit=crop&q=60",
  },
];

/* ---------------- PAGE ---------------- */

export default function MyListingsPage() {
  const [tab, setTab] = useState("books"); // books | calculators

  const listings = useMemo(() => {
    return tab === "books" ? myBooks : myCalculators;
  }, [tab]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/rental-hub"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rental Hub
          </Link>

          <Link
            href="/rental-hub/post"
            className="px-5 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition"
          >
            Post an Item
          </Link>
        </div>

        {/* HEADER */}
        <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8 md:p-10">
          <h1 className="text-3xl font-extrabold text-slate-900">
            My Listings
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Manage the books and calculators you posted. You can edit, remove,
            and track status.
          </p>

          {/* TABS */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setTab("books")}
              className={`px-5 py-3 rounded-2xl font-extrabold border transition inline-flex items-center gap-2
              ${
                tab === "books"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Books ({myBooks.length})
            </button>

            <button
              onClick={() => setTab("calculators")}
              className={`px-5 py-3 rounded-2xl font-extrabold border transition inline-flex items-center gap-2
              ${
                tab === "calculators"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Calculator className="w-5 h-5" />
              Calculators ({myCalculators.length})
            </button>
          </div>
        </div>

        {/* LISTINGS */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.image}
                  alt="listing"
                  className="w-full h-44 object-cover"
                />

                {/* STATUS */}
                <div className="absolute top-4 left-4">
                  <StatusBadge status={item.status} />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* TITLE */}
                {tab === "books" ? (
                  <>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      by {item.author}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {item.brand} {item.model}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Deposit: {item.deposit} QAR
                    </p>
                  </>
                )}

                {/* META */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-50 border text-sm font-semibold text-slate-700">
                    {item.condition}
                  </span>

                  {tab === "books" ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-sm font-bold text-emerald-800">
                      {item.priceType}: {item.price} QAR
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-800">
                      {item.price} QAR / week
                    </span>
                  )}

                  {tab === "books" && item.priceType === "Rent" && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 border text-sm font-bold text-slate-800">
                      Duration: {item.duration}
                    </span>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      alert("Edit feature will work when backend is added.")
                    }
                    className="flex-1 px-4 py-3 rounded-2xl border font-extrabold text-slate-800 hover:bg-slate-50 transition inline-flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      alert("Remove feature will work when backend is added.")
                    }
                    className="flex-1 px-4 py-3 rounded-2xl bg-red-50 border border-red-100 font-extrabold text-red-700 hover:bg-red-100 transition inline-flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {listings.length === 0 && (
          <div className="mt-10 bg-white rounded-3xl border shadow-sm p-10 text-center">
            <h3 className="text-xl font-extrabold text-slate-900">
              No listings yet
            </h3>
            <p className="text-slate-600 mt-2">
              Post your first item to start sharing with UDST students.
            </p>
            <Link
              href="/rental-hub/post"
              className="mt-6 inline-block px-6 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition"
            >
              Post an Item
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-extrabold border bg-white/95";

  if (status === "Active") {
    return (
      <div className={`${base} text-emerald-700 border-emerald-200`}>
        <BadgeCheck className="w-4 h-4" />
        Active
      </div>
    );
  }

  if (status === "Rented") {
    return (
      <div className={`${base} text-blue-700 border-blue-200`}>
        <Clock className="w-4 h-4" />
        Rented
      </div>
    );
  }

  return (
    <div className={`${base} text-red-700 border-red-200`}>
      <XCircle className="w-4 h-4" />
      Sold
    </div>
  );
}
