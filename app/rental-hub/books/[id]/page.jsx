"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRentedOut, setIsRentedOut] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      try {
        console.log("Fetching book with ID:", params.id);
        
        const res = await fetch(`/api/listings/${params.id}`);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Book data:", data);
        
        if (data && !data.error) {
          setBook(data);
          
          // Check if book is currently rented out
          const allRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
          const activeRental = allRequests.find(
            req => req.itemId === data._id && 
            (req.status === "active" || req.status === "approved")
          );
          setIsRentedOut(!!activeRental);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white border rounded-3xl p-10 shadow-sm text-center">
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
              {/* Rented Out Badge */}
              {isRentedOut && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Currently Rented
                </div>
              )}
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
                  {book.course || book.department || "General"}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                  Condition: {book.condition}
                </span>
              </div>

              {/* LOCATION */}
              <div className="mt-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <span>{book.location || "UDST Main Campus - Library"}</span>
              </div>

              {/* PRICE */}
              <div className="mt-6">
                <p className="text-2xl font-bold text-emerald-600">{book.rentPrice} QAR <span className="text-sm font-normal text-gray-500">/ week</span></p>
              </div>

              {/* REQUEST TO RENT BUTTON - Disabled if rented out */}
              {isRentedOut ? (
                <button
                  disabled
                  className="mt-8 w-full bg-gray-400 text-white px-6 py-3.5 rounded-2xl font-bold cursor-not-allowed"
                >
                  Currently Not Available
                </button>
              ) : (
                <Link
                  href={`/rental-hub/books/${book._id}/request`}
                  className="mt-8 w-full bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-emerald-700 transition text-center inline-block"
                >
                  Request to Rent
                </Link>
              )}
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