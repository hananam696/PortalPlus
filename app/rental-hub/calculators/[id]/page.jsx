"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Coins, ShieldCheck, Calculator, Leaf } from "lucide-react";

export default function CalculatorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [calculator, setCalculator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCalculator() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const data = await res.json();
        setCalculator(data);
      } catch (error) {
        console.error("Error fetching calculator:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCalculator();
  }, [id]);

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const user = JSON.parse(localStorage.getItem("user"));

    await fetch(`/api/listings/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id }),
    });

    router.push("/rental-hub/calculators");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!calculator) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white border rounded-3xl p-10 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-slate-900">Calculator not found</h1>
          <Link href="/rental-hub/calculators" className="inline-flex mt-6 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-semibold">
            Go to Calculators List
          </Link>
        </div>
      </div>
    );
  }

  const isOwner =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user") || "{}")?.id === calculator.userId;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <Link
            href="/rental-hub/calculators"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            View all calculators
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="mt-6 bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="grid md:grid-cols-2">

            {/* IMAGE */}
            {calculator.image ? (
              <img
                src={calculator.image}
                alt={calculator.model}
                className="w-full h-[380px] object-cover"
              />
            ) : (
              <div className="w-full h-[380px] bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                <Calculator size={80} className="text-emerald-600" />
              </div>
            )}

            {/* INFO */}
            <div className="p-8 md:p-10">
              <p className="text-sm text-slate-500 font-semibold">{calculator.brand}</p>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-1">{calculator.model}</h1>

              <div className="mt-6 space-y-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <Coins size={18} className="text-emerald-700" />
                  Rent: <span className="font-bold">{calculator.rentPrice} QAR / week</span>
                </div>

                {calculator.deposit && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-700" />
                    Deposit: <span className="font-bold">{calculator.deposit} QAR</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-700" />
                  {calculator.location || "Location not set"}
                </div>

                <div>
                  Condition: <span className="font-bold">{calculator.condition}</span>
                </div>
              </div>

              {/* ✅ REQUEST TO RENT BUTTON (Changed from Contact Owner) */}
              <Link
                href={`/rental-hub/calculators/${calculator._id}/request`}
                className="mt-8 w-full bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-emerald-700 transition text-center inline-block"
              >
                Request to Rent
              </Link>

              {/* OWNER ONLY BUTTONS */}
              {isOwner && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => router.push(`/rental-hub/calculators/${id}/edit`)}
                    className="flex-1 bg-yellow-500 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* EXTRA INFO */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold">Pickup Tip</h3>
            <p className="text-sm mt-2">Meet in a public campus area like library.</p>
          </div>
          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold flex items-center gap-2"><Leaf size={16} /> Eco Impact</h3>
            <p className="text-sm mt-2">Renting helps sustainability and reduces e-waste.</p>
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