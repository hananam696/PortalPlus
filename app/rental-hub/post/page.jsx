"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Calculator, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostItemPage() {
  const [category, setCategory] = useState("book");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    brand: "",
    model: "",
    condition: "Like New",
    rentPrice: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userStr));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    setSubmitting(true);
    
    const itemData = {
      type: category,
      condition: formData.condition,
      rentPrice: parseFloat(formData.rentPrice),
      status: "Available",
      userId: user.id,
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      createdAt: new Date(),
    };

    if (category === "book") {
      itemData.title = formData.title;
      itemData.author = formData.author;
    } else {
      itemData.brand = formData.brand;
      itemData.model = formData.model;
    }

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert("Item posted successfully!");
        router.push("/rental-hub/my-listings");
      } else {
        alert(data.error || "Failed to post item");
      }
    } catch (error) {
      alert("Error posting item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Link href="/rental-hub" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft size={16} />
          Back to Rental Hub
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post an Item</h1>
          <p className="text-gray-500 mb-6">Share your books and calculators with fellow students</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCategory("book")}
                  className={`flex-1 py-3 rounded-xl border-2 transition ${
                    category === "book"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-emerald-200"
                  }`}
                >
                  <BookOpen size={20} className="inline mr-2" />
                  Book
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("calculator")}
                  className={`flex-1 py-3 rounded-xl border-2 transition ${
                    category === "calculator"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-emerald-200"
                  }`}
                >
                  <Calculator size={20} className="inline mr-2" />
                  Calculator
                </button>
              </div>
            </div>

            {/* Book Fields */}
            {category === "book" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            {/* Calculator Fields */}
            {category === "calculator" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Like New</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Acceptable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rent Price (QAR per day)</label>
              <input
                type="number"
                required
                value={formData.rentPrice}
                onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}
                placeholder="0"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}