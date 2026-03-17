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
      const matchesSearch =
        (c.brand + " " + c.model)
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        c.location?.toLowerCase().includes(search.toLowerCase());

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
        <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                Available Calculators
              </h1>
              <p className="text-slate-600 mt-2">
                Rent calculators from other UDST students.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-[380px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search model, brand, or location..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full rounded-2xl border px-5 py-4 bg-white font-semibold text-slate-800"
            >
              <option value="All">All Brands</option>
              <option value="Casio">Casio</option>
              <option value="Texas Instruments">Texas Instruments</option>
              <option value="Sharp">Sharp</option>
            </select>

            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="w-full rounded-2xl border px-5 py-4 bg-white font-semibold text-slate-800"
            >
              <option value="All">All Conditions</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>

            <div className="hidden md:flex items-center justify-end text-sm font-semibold text-slate-600">
              Showing{" "}
              <span className="mx-1 font-extrabold">{filtered.length}</span>{" "}
              calculators
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Link
              key={c._id.toString()}
              href={`/rental-hub/calculators/${c._id.toString()}`}
              className="group bg-white rounded-3xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative">
                <img
                  src={c.image}
                  alt={c.model}
                  className="w-full h-44 object-cover group-hover:scale-[1.02] transition"
                />

                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border text-sm font-bold text-slate-800">
                  <Star className="w-4 h-4 text-blue-700" />
                  {c.rating || "4.5"}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      {c.brand}
                    </p>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {c.model}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-blue-700 font-extrabold">
                    <Coins className="w-4 h-4" />
                    {c.rentPrice}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-50 border text-sm font-semibold text-slate-700">
                    {c.condition}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-50 border text-sm font-bold text-blue-800">
                    {c.rentPrice} QAR / week
                  </span>

                  <span className="px-3 py-1 rounded-full bg-slate-100 border text-sm font-bold text-slate-800 inline-flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Deposit: {c.deposit} QAR
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  {c.location}
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                  <Calculator className="w-4 h-4" />
                  View details
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="mt-10 bg-white rounded-3xl border shadow-sm p-10 text-center">
            <h3 className="text-xl font-extrabold text-slate-900">
              No calculators found
            </h3>
            <p className="text-slate-600 mt-2">
              Try changing filters or searching something else.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
