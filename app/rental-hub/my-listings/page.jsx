"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Trash2,
  Pencil,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyListingsPage() {
  const [filter, setFilter] = useState("all"); // ✅ FIXED
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  // ✅ Get logged-in user
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      fetchMyListings(user);
    } catch (error) {
      console.error("Error parsing user:", error);
      router.push("/login");
    }
  }, []);

  // ✅ Fetch user listings
  async function fetchMyListings(user) {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings?userId=${user.id}`);
      const listings = await res.json();
      setData(Array.isArray(listings) ? listings : []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ FILTER LOGIC
  const listings = useMemo(() => {
    if (filter === "all") return data;

    if (filter === "books") {
      return data.filter((item) => item.type === "book");
    }

    if (filter === "calculators") {
      return data.filter((item) => item.type === "calculator");
    }

    return data;
  }, [data, filter]);

  // ✅ DELETE
  async function handleDelete(id) {
    if (!currentUser) return;

    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      if (res.ok) {
        setData((prev) => prev.filter((item) => item._id !== id));
        alert("Item deleted successfully!");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Something went wrong");
    }
  }

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your listings...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

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
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-extrabold hover:from-emerald-700 hover:to-green-700"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Post an Item
          </Link>
        </div>

        {/* HEADER */}
        <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            My Listings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your posted books and calculators
          </p>

          {/* FILTER BUTTONS */}
          <div className="mt-6 flex gap-3">

            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-3 rounded-2xl font-extrabold border ${
                filter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("books")}
              className={`px-5 py-3 rounded-2xl font-extrabold border ${
                filter === "books"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Books
            </button>

            <button
              onClick={() => setFilter("calculators")}
              className={`px-5 py-3 rounded-2xl font-extrabold border ${
                filter === "calculators"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <Calculator className="w-4 h-4 inline mr-2" />
              Calculators
            </button>

          </div>
        </div>

        {/* LISTINGS */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >
              <div className="flex justify-end mb-2">
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {item.status || "Available"}
                </span>
              </div>

              {item.type === "book" ? (
                <>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">by {item.author}</p>
                </>
              ) : (
                <h2 className="font-bold text-lg">
                  {item.brand} {item.model}
                </h2>
              )}

              <p className="text-sm text-gray-600 mt-2">
                {item.condition}
              </p>

              <p className="font-bold text-xl text-emerald-600 mt-3">
                {item.rentPrice} QAR
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/rental-hub/${item.type}s/${item._id}/edit`}
                  className="flex-1 bg-amber-500 text-white px-3 py-2 rounded-xl text-sm flex justify-center items-center gap-1"
                >
                  <Pencil size={14} /> Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded-xl text-sm flex justify-center items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
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