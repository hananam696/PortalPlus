"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  BookOpen,
  Filter,
  Tag,
  GraduationCap,
  Plus,
} from "lucide-react";

import { BOOKS } from "./data";

export default function BooksListPage() {
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");

  // Filters based on shared data.js
  const departments = useMemo(() => {
    const unique = Array.from(new Set(BOOKS.map((b) => b.department)));
    return ["All", ...unique];
  }, []);

  const conditions = ["All", "Like New", "Good", "Fair"];
  const availability = ["All", "Available", "Unavailable"];

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((b) => {
      const matchesQuery =
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase()) ||
        b.department.toLowerCase().includes(query.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ? true : b.department === departmentFilter;

      const matchesCondition =
        conditionFilter === "All" ? true : b.condition === conditionFilter;

      const matchesAvailability =
        availabilityFilter === "All"
          ? true
          : availabilityFilter === "Available"
          ? b.available
          : !b.available;

      return (
        matchesQuery &&
        matchesDepartment &&
        matchesCondition &&
        matchesAvailability
      );
    });
  }, [query, departmentFilter, conditionFilter, availabilityFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back */}
          <Link
            href="/rental-hub"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Rental Hub
          </Link>

          {/* Header row */}
          <div className="mt-5 flex items-start justify-between gap-6 flex-col lg:flex-row">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Textbook Rentals
              </h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Browse available textbooks shared by UDST students. Request a
                rental and pick it up on campus.
              </p>
            </div>

            {/* Right side actions */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold">
                <BookOpen size={18} />
                {filteredBooks.length} results
              </div>

              {/* NOTE: we will create this page later */}
              <Link
                href="/rental-hub/post/book/"
                className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Post a Book
              </Link>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mt-7 max-w-2xl bg-gray-50 border rounded-full flex items-center px-4 py-3 shadow-sm">
            <Search className="text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, or department..."
              className="ml-3 w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* FILTERS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <FilterPill
              icon={<GraduationCap size={16} />}
              label="Department"
              value={departmentFilter}
              options={departments}
              onChange={setDepartmentFilter}
            />

            <FilterPill
              icon={<Tag size={16} />}
              label="Condition"
              value={conditionFilter}
              options={conditions}
              onChange={setConditionFilter}
            />

            <FilterPill
              icon={<Filter size={16} />}
              label="Availability"
              value={availabilityFilter}
              options={availability}
              onChange={setAvailabilityFilter}
            />
          </div>
        </div>
      </div>

      {/* BOOK GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredBooks.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <h2 className="text-xl font-bold text-gray-900">No books found</h2>
            <p className="text-gray-600 mt-2">
              Try changing the filters or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FilterPill({ icon, label, value, options, onChange }) {
  return (
    <div className="bg-gray-50 border rounded-full px-4 py-2 flex items-center gap-2">
      <span className="text-gray-500">{icon}</span>
      <span className="text-sm font-semibold text-gray-700">{label}:</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-sm text-gray-700 font-medium cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function BookCard({ book }) {
  return (
    <Link href={`/rental-hub/books/${book.id}`} className="block">
      <div className="bg-white rounded-3xl shadow hover:shadow-xl transition p-7 cursor-pointer relative overflow-hidden">
        {/* Availability badge */}
        <div
          className={`absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full ${
            book.available
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {book.available ? "Available" : "Unavailable"}
        </div>

        {/* Book cover */}
        <div className="h-40 rounded-2xl border overflow-hidden mb-5">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600 mt-1">{book.author}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
            {book.department}
          </span>

          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
            {book.condition}
          </span>

          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold">
            Rent: {book.rentPrice} QAR / week
          </span>
        </div>

        <div className="mt-6 text-green-700 font-semibold text-sm">
          View details →
        </div>
      </div>
    </Link>
  );
}
