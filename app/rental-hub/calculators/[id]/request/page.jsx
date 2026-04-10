"use client";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  NotebookPen,
  ShieldCheck,
  CheckCircle,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export default function CalculatorRequestPage() {
  const params = useParams();
  const router = useRouter();
  const [calculator, setCalculator] = useState(null);
  const [loadingCalc, setLoadingCalc] = useState(true);

  const [weeks, setWeeks] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch calculator from API
  useEffect(() => {
    async function fetchCalculator() {
      try {
        const res = await fetch(`/api/listings/${params.id}`);
        const data = await res.json();
        if (data && !data.error) {
          setCalculator(data);
        }
      } catch (error) {
        console.error("Error fetching calculator:", error);
      } finally {
        setLoadingCalc(false);
      }
    }
    if (params.id) {
      fetchCalculator();
    }
  }, [params.id]);

  const total = useMemo(() => {
    if (!calculator) return 0;
    return weeks * calculator.rentPrice;
  }, [weeks, calculator]);

  if (loadingCalc) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!calculator) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white border rounded-3xl p-10 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Calculator not found</h1>
          <Link href="/rental-hub/calculators" className="inline-flex mt-6 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-semibold">
            Go to Calculators List
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

    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const startDate = new Date(pickupDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (weeks * 7));

    const rentalRequest = {
      id: Date.now().toString(),
      itemId: calculator._id,
      itemTitle: `${calculator.brand} ${calculator.model}`,
      itemType: "calculator",
      ownerId: calculator.userId,
      ownerName: calculator.userName || "Calculator Owner",
      ownerEmail: calculator.userEmail || "owner@udst.edu.qa",
      renterId: user.id || "user_001",
      renterName: user.firstName ? `${user.firstName} ${user.lastName}` : "Student",
      renterEmail: user.email || "student@udst.edu.qa",
      weeks: weeks,
      startDate: pickupDate,
      endDate: endDate.toISOString().split('T')[0],
      totalPrice: total,
      weeklyPrice: calculator.rentPrice,
      message: notes,
      status: "pending",
      createdAt: new Date().toISOString(),
      location: calculator.location,
    };

    const existingRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
    existingRequests.push(rentalRequest);
    localStorage.setItem("rental_requests", JSON.stringify(existingRequests));

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border p-10 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">Request Sent! ✅</h1>
          <p className="text-slate-600 mt-2">Your rental request has been submitted successfully.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/rental-hub/my-rentals" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold">
              View My Rentals
            </Link>
            <Link href="/rental-hub/calculators" className="px-5 py-2 border rounded-xl font-semibold">
              Browse More Calculators
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <Link href={`/rental-hub/calculators/${calculator._id}`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
            Back to details
          </Link>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* LEFT: FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border p-8 md:p-10">
            <h1 className="text-3xl font-extrabold text-slate-900">Request Rental</h1>
            <p className="text-slate-600 mt-2">Fill in the details below to request this calculator from the owner.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* RENT WEEKS */}
              <div>
                <label className="block font-semibold text-slate-900 mb-2">Rental Duration (weeks)</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setWeeks((w) => Math.max(1, w - 1))} className="w-12 h-12 rounded-2xl border bg-white hover:bg-slate-50 font-bold text-lg">−</button>
                  <div className="flex-1 rounded-2xl border bg-slate-50 px-5 py-4 text-center">
                    <p className="text-lg font-bold text-slate-900">{weeks} week{weeks > 1 ? "s" : ""}</p>
                    <p className="text-sm text-slate-500">{calculator.rentPrice} QAR / week</p>
                  </div>
                  <button type="button" onClick={() => setWeeks((w) => Math.min(12, w + 1))} className="w-12 h-12 rounded-2xl border bg-white hover:bg-slate-50 font-bold text-lg">+</button>
                </div>
              </div>

              {/* PICKUP DATE */}
              <div>
                <label className="block font-semibold text-slate-900 mb-2">Pickup Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700" />
                  <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} min={minDate} className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600" required />
                </div>
              </div>

              {/* NOTES */}
              <div>
                <label className="block font-semibold text-slate-900 mb-2">Notes to Owner (optional)</label>
                <div className="relative">
                  <NotebookPen className="absolute left-4 top-5 w-5 h-5 text-emerald-700" />
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Example: I need this for my exam. When can I pick it up?" className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none" />
                </div>
              </div>

              {/* AGREEMENT */}
              <div className="rounded-2xl border bg-slate-50 p-5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Campus Exchange Rules</p>
                  <p className="text-sm text-slate-600 mt-1">I will meet the owner in a public campus area and return the calculator on time in good condition.</p>
                  <label className="flex items-center gap-2 mt-4 text-sm text-slate-700">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-emerald-600" />
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition disabled:opacity-50">
                {loading ? "Sending Request..." : `Confirm Request • ${total} QAR`}
              </button>
            </form>
          </div>

          {/* RIGHT: SUMMARY CARD */}
          <div className="bg-white rounded-3xl shadow-sm border p-6 h-fit">
            <p className="text-sm font-semibold text-slate-500">You are requesting</p>
            <div className="mt-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-3">
                <Calculator size={32} className="text-emerald-600" />
              </div>
              <p className="font-bold text-slate-900">{calculator.brand} {calculator.model}</p>
              <p className="text-xs text-emerald-600 mt-1">{calculator.condition}</p>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 border p-5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-slate-600">Rent per week</span><span className="font-bold">{calculator.rentPrice} QAR</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-600">Weeks</span><span className="font-bold">{weeks}</span></div>
              <div className="border-t pt-3 flex justify-between"><span className="font-semibold">Total</span><span className="text-lg font-extrabold">{total} QAR</span></div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-700 mt-0.5" />
              <div><p className="text-sm font-medium">Pickup Location</p><p className="text-sm text-slate-600">{calculator.location || "UDST Main Campus - Library"}</p></div>
            </div>

            <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
              <p className="font-bold text-emerald-900">Eco Bonus 🌿</p>
              <p className="text-sm text-slate-700 mt-1">Renting this calculator gives you +{Math.floor(calculator.rentPrice * 2)} Eco Points.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
