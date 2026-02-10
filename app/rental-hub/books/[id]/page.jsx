"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, MapPin, BookOpen, ShieldCheck } from "lucide-react";
import { useMemo } from "react";

import { BOOKS } from "../data";

/* ---------------- PAGE ---------------- */
export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const book = useMemo(() => {
    return BOOKS.find((b) => b.id === params.id);
  }, [params.id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="mt-10 rounded-3xl bg-white p-10 shadow-sm border">
            <h1 className="text-2xl font-bold text-slate-900">
              Book not found
            </h1>
            <p className="text-slate-600 mt-2">
              This book does not exist or was removed.
            </p>

            <Link
              href="/rental-hub/books"
              className="inline-flex mt-6 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Go to Books List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <Link
            href="/rental-hub/books"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            View all books
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="mt-6 bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* COVER */}
            <div className="relative">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-[420px] object-cover"
              />

              <div className="absolute top-5 left-5">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold shadow
                    ${
                      book.available
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-white"
                    }`}
                >
                  {book.available ? "Available" : "Currently Rented"}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
                    {book.title}
                  </h1>
                  <p className="text-slate-600 mt-2">
                    by <span className="font-semibold">{book.author}</span>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                      {book.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                      Condition: {book.condition}
                    </span>
                  </div>
                </div>

                {/* OWNER RATING */}
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 border border-emerald-100">
                  <p className="text-sm text-slate-700 font-semibold">
                    {book.owner?.name || "UDST Student"}
                  </p>

                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-emerald-700" />
                    <span className="text-sm font-bold text-slate-900">
                      {book.owner?.rating || 4.5}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({book.owner?.reviews || 0})
                    </span>
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mt-6 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-700 mt-0.5" />
                <p className="text-slate-700">
                  Pickup Location:{" "}
                  <span className="font-semibold">{book.location}</span>
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  Description
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* PRICES */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 border p-5">
                  <p className="text-sm text-slate-500 font-medium">
                    Rent per week
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {book.rentPrice} QAR
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border p-5">
                  <p className="text-sm text-slate-500 font-medium">Buy price</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {book.buyPrice} QAR
                  </p>
                </div>
              </div>

              {/* TRUST + INFO */}
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border p-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Safe Campus Exchange
                    </p>
                    <p className="text-sm text-slate-600">
                      Only UDST students can list items.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border p-4 flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-700 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Sustainability Impact
                    </p>
                    <p className="text-sm text-slate-600">
                      Renting saves paper and reduces waste.
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/rental-hub/books/${book.id}/request`}
                  className={`flex-1 text-center px-6 py-4 rounded-2xl font-bold transition
                    ${
                      book.available
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none"
                    }`}
                >
                  Rent / Request
                </Link>

                <button className="flex-1 px-6 py-4 rounded-2xl font-bold border bg-white hover:bg-slate-50 transition">
                  Message Owner
                </button>
              </div>

              {!book.available && (
                <p className="text-sm text-slate-500 mt-3">
                  This item is currently rented. Check again later.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* EXTRA SECTION */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h3 className="font-bold text-slate-900">Pickup Tip</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Meet in a public campus area like the library desk or student
              center for safety.
            </p>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h3 className="font-bold text-slate-900">Eco Reward</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Renting books earns Eco Points inside Sustainability.
            </p>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h3 className="font-bold text-slate-900">Return Reminder</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Be respectful. Return the book on time and in good condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
