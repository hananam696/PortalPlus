"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  Calculator,
  Search,
  MapPin,
  Coins,
  ShieldCheck,
  Star,
  Plus,
} from "lucide-react";

export default function CalculatorsListPage() {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [calculatorsData, setCalculatorsData] = useState([]);

  useEffect(() => {
    async function fetchCalculators() {
      const res = await fetch("/api/listings");
      const data = await res.json();

      const calculatorsOnly = data.filter(
        (item) => item.type?.toLowerCase() === "calculator"
      );

      setCalculatorsData(calculatorsOnly);
    }

    fetchCalculators();
  }, []);

  const filtered = useMemo(() => {
    return calculatorsData.filter((c) => {
      const text = `${c.brand || ""} ${c.model || ""} ${c.location || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesBrand =
        brandFilter === "All" ? true : c.brand === brandFilter;

      const matchesCondition =
        conditionFilter === "All" ? true : c.condition === conditionFilter;

      return matchesSearch && matchesBrand && matchesCondition;
    });
  }, [search, brandFilter, conditionFilter, calculatorsData]);

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
            href="/rental-hub/post/calculator"
            className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <Plus size={18} />
            Post a Calculator
          </Link>
        </div>

        {/* HEADER */}
        <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Available Calculators
          </h1>

          {/* SEARCH */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Link
              key={c._id}
              href={`/rental-hub/calculators/${c._id}`}
              className="bg-white rounded-3xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <img
                src={c.image || "/placeholder.jpg"}
                alt={c.model}
                className="w-full h-44 object-cover"
              />

              <div className="p-6">
                <p className="text-xs text-slate-500">{c.brand || "Brand"}</p>

                <h2 className="text-lg font-extrabold">
                  {c.model || "Calculator"}
                </h2>

                <p className="text-blue-700 font-bold mt-2">
                  {c.rentPrice || 0} QAR / week
                </p>

                <p className="text-sm text-slate-600 mt-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {c.location || "Location not set"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="mt-10 text-center">
            No calculators found
          </div>
        )}
      </div>
    </div>
  );
}