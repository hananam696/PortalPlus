"use client";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  NotebookPen,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { BOOKS } from "../../data";

/* ---------------- PAGE ---------------- */
export default function BookRequestPage() {
  const params = useParams();
  const router = useRouter();

  const book = useMemo(() => BOOKS.find((b) => b.id === params.id), [params.id]);

  const [weeks, setWeeks] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(() => {
    if (!book) return 0;
    return weeks * book.rentPrice;
  }, [weeks, book]);

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white border rounded-3xl p-10 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Book not found</h1>
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
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!pickupDate) {
      alert("Please select a pickup date.");
      return;
    }

    if (!agree) {
      alert("Please agree to the campus exchange rules.");
      return;
    }

    setSubmitted(true);
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
            href={`/rental-hub/books/${book.id}`}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Back to details
          </Link>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* LEFT: FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border p-8 md:p-10">
            <h1 className="text-3xl font-extrabold text-slate-900">
              Request Rental
            </h1>
            <p className="text-slate-600 mt-2">
              Fill in the details below to request this book from the owner.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-3xl border bg-emerald-50 p-8">
                <h2 className="text-2xl font-bold text-emerald-800">
                  Request Sent ✅
                </h2>
                <p className="text-slate-700 mt-2">
                  Your request has been submitted. The owner will be notified and
                  can accept or reject your request.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/rental-hub/books"
                    className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-center"
                  >
                    Back to Books
                  </Link>

                  <Link
                    href="/rental-hub"
                    className="px-6 py-3 rounded-2xl border bg-white hover:bg-slate-50 font-bold transition text-center"
                  >
                    Go to Rental Hub
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* RENT WEEKS */}
                <div>
                  <label className="block font-semibold text-slate-900 mb-2">
                    Rental Duration (weeks)
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setWeeks((w) => Math.max(1, w - 1))}
                      className="w-12 h-12 rounded-2xl border bg-white hover:bg-slate-50 font-bold text-lg transition"
                    >
                      −
                    </button>

                    <div className="flex-1 rounded-2xl border bg-slate-50 px-5 py-4 text-center">
                      <p className="text-lg font-bold text-slate-900">
                        {weeks} week{weeks > 1 ? "s" : ""}
                      </p>
                      <p className="text-sm text-slate-500">
                        {book.rentPrice} QAR / week
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setWeeks((w) => Math.min(12, w + 1))}
                      className="w-12 h-12 rounded-2xl border bg-white hover:bg-slate-50 font-bold text-lg transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Max duration: 12 weeks.
                  </p>
                </div>

                {/* PICKUP DATE */}
                <div>
                  <label className="block font-semibold text-slate-900 mb-2">
                    Pickup Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700" />
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {/* NOTES */}
                <div>
                  <label className="block font-semibold text-slate-900 mb-2">
                    Notes to Owner (optional)
                  </label>

                  <div className="relative">
                    <NotebookPen className="absolute left-4 top-5 w-5 h-5 text-emerald-700" />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder="Example: Hi! I can pick it up after 2pm at the library desk..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                    />
                  </div>
                </div>

                {/* AGREEMENT */}
                <div className="rounded-2xl border bg-slate-50 p-5 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 mt-1" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      Campus Exchange Rules
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      I will meet the owner in a public campus area and return
                      the book on time in good condition.
                    </p>

                    <label className="flex items-center gap-2 mt-4 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="w-4 h-4"
                      />
                      I agree
                    </label>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition"
                >
                  Confirm Request • {total} QAR
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: SUMMARY CARD */}
          <div className="bg-white rounded-3xl shadow-sm border p-6 h-fit">
            <p className="text-sm font-semibold text-slate-500">
              You are requesting
            </p>

            <div className="mt-4 flex gap-4">
              <img
                src={book.cover}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-2xl border"
              />
              <div>
                <p className="font-bold text-slate-900 leading-snug">
                  {book.title}
                </p>
                <p className="text-sm text-slate-600 mt-1">{book.author}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 border p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Rent per week</span>
                <span className="font-bold text-slate-900">
                  {book.rentPrice} QAR
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Weeks</span>
                <span className="font-bold text-slate-900">{weeks}</span>
              </div>

              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="text-lg font-extrabold text-slate-900">
                  {total} QAR
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-700 mt-0.5" />
              <p className="text-sm text-slate-700">
                Pickup Location:{" "}
                <span className="font-semibold">{book.location}</span>
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
              <p className="font-bold text-emerald-900">Eco Bonus 🌿</p>
              <p className="text-sm text-slate-700 mt-1">
                Renting this book gives you Eco Points in Sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
