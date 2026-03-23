"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
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

export default function MyListingsPage() {
  const [tab, setTab] = useState("books");
  const [data, setData] = useState([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/listings");
      const listings = await res.json();

      // ✅ Only current user listings
      const mine = listings.filter(
        (item) => item.userEmail === "student@udst.edu"
      );

      setData(mine);
    }

    fetchData();
  }, []);

  // ✅ FILTER BY TAB
  const listings = useMemo(() => {
    return data.filter((item) =>
      tab === "books" ? item.type === "book" : item.type === "calculator"
    );
  }, [data, tab]);

  // ✅ DELETE
  async function handleDelete(id) {
    await fetch(`/api/listings/${id}`, {
      method: "DELETE",
    });

    // remove from UI instantly
    setData((prev) => prev.filter((item) => item._id !== id));
  }

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

          {/* TABS */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setTab("books")}
              className={`px-5 py-3 rounded-2xl font-extrabold border ${
                tab === "books"
                  ? "bg-emerald-600 text-white"
                  : "bg-white"
              }`}
            >
              Books
            </button>

            <button
              onClick={() => setTab("calculators")}
              className={`px-5 py-3 rounded-2xl font-extrabold border ${
                tab === "calculators"
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              Calculators
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl border shadow-sm p-6"
            >
              {/* TITLE */}
              {item.type === "book" ? (
                <>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.author}</p>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-lg">
                    {item.brand} {item.model}
                  </h2>
                </>
              )}

              {/* INFO */}
              <p className="text-sm mt-2">{item.condition}</p>

              <p className="font-bold mt-2">
                {item.rentPrice} QAR
              </p>

              {/* ACTIONS */}
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/rental-hub/${item.type}s/${item._id}/edit`}
                  className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {listings.length === 0 && (
          <div className="mt-10 text-center">
            No listings found
          </div>
        )}
      </div>
    </div>
  );
}