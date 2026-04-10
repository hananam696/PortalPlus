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
  const [tab, setTab] = useState("books");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  // ✅ Get logged-in user from localStorage
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

  // ✅ Fetch ONLY current user's listings
  async function fetchMyListings(user) {
    setLoading(true);
    try {
      // Pass userId to API to get user-specific listings
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

  // ✅ FILTER BY TAB
  const listings = useMemo(() => {
    return data.filter((item) =>
      tab === "books" ? item.type === "book" : item.type === "calculator"
    );
  }, [data, tab]);

  // ✅ DELETE (with user verification)
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

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/rental-hub"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rental Hub
          </Link>

          <Link
            href="/rental-hub/post"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-extrabold hover:from-emerald-700 hover:to-green-700 transition shadow-md"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Post an Item
          </Link>
        </div>

        {/* HEADER */}
        <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8 md:p-10">
          <h1 className="text-3xl font-extrabold text-slate-900">
            My Listings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your posted books and calculators
          </p>

          {/* TABS */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setTab("books")}
              className={`px-5 py-3 rounded-2xl font-extrabold border transition ${
                tab === "books"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Books
            </button>

            <button
              onClick={() => setTab("calculators")}
              className={`px-5 py-3 rounded-2xl font-extrabold border transition ${
                tab === "calculators"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Calculator className="w-4 h-4 inline mr-2" />
              Calculators
            </button>
          </div>
        </div>

        {/* LISTINGS GRID */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-6"
            >
              {/* Status Badge */}
              <div className="flex justify-end mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status || "Available"}
                </span>
              </div>

              {/* Title */}
              {item.type === "book" ? (
                <>
                  <h2 className="font-bold text-lg text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500">by {item.author}</p>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-lg text-gray-900">
                    {item.brand} {item.model}
                  </h2>
                </>
              )}

              {/* Condition */}
              <p className="text-sm text-gray-600 mt-3">{item.condition}</p>

              {/* Price */}
              <p className="font-bold text-xl text-emerald-600 mt-3">
                {item.rentPrice} QAR
                <span className="text-xs text-gray-400 font-normal"> /day</span>
              </p>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/rental-hub/${item.type}s/${item._id}/edit`}
                  className="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium text-sm transition flex items-center justify-center gap-1"
                >
                  <Pencil size={14} />
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium text-sm transition flex items-center justify-center gap-1"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {listings.length === 0 && (
          <div className="mt-10 text-center py-12 bg-white rounded-2xl border">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No {tab} listings yet
            </h3>
            <p className="text-gray-500 mb-4">
              Share your {tab === "books" ? "books" : "calculators"} with fellow students
            </p>
            <Link
              href="/rental-hub/post"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
            >
              <Plus size={16} />
              Post a {tab === "books" ? "Book" : "Calculator"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}