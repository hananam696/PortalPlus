"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch("/api/listings");
      const data = await res.json();
      const found = data.find((item) => item._id.toString() === params.id);
      setBook(found);
    }
    fetchBook();
  }, [params.id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
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

            {/* IMAGE */}
            <div className="relative">
              <img
                src={book.image || "/placeholder.jpg"}
                alt={book.title}
                className="w-full h-[420px] object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="p-8 md:p-10">
              <h1 className="text-3xl font-extrabold text-slate-900">
                {book.title}
              </h1>
              <p className="text-slate-600 mt-2">
                by <span className="font-semibold">{book.author}</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                  {book.department}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                  Condition: {book.condition}
                </span>
              </div>

              {/* LOCATION */}
              <div className="mt-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <span>{book.location}</span>
              </div>

              {/* PRICE */}
              <div className="mt-6">
                <p className="text-lg font-bold">{book.rentPrice} QAR / week</p>
              </div>
              {/* CONTACT BUTTON */}
<button className="mt-8 w-full bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-emerald-700 transition">
  Contact Owner
</button>
            </div>

          </div>
        </div>

        {/* EXTRA CARDS */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold">Pickup Tip</h3>
            <p className="text-sm mt-2">Meet in a public campus area like the library.</p>
          </div>
          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold">Eco Impact</h3>
            <p className="text-sm mt-2">Renting helps sustainability.</p>
          </div>
          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold">Reminder</h3>
            <p className="text-sm mt-2">Return on time and in good condition.</p>
          </div>
        </div>

      </div>
    </div>
  );
}