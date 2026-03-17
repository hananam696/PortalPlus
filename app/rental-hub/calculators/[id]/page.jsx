"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Coins, ShieldCheck } from "lucide-react";

export default function CalculatorDetailsPage() {
  const { id } = useParams();
  const [calculator, setCalculator] = useState(null);

  useEffect(() => {
    async function fetchCalculator() {
      const res = await fetch("/api/listings");
      const data = await res.json();

      const found = data.find(
        (item) => item._id.toString() === id
      );

      setCalculator(found);
    }

    fetchCalculator();
  }, [id]);

  if (!calculator) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Loading calculator...</h2>
      </div>
    );
  }

  async function handleDelete() {
  const confirmDelete = confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  await fetch(`/api/listings/${id}`, {
    method: "DELETE",
  });

  window.location.href = "/rental-hub/calculators";
}

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          href="/rental-hub/calculators"
          className="flex items-center gap-2 text-gray-600 hover:text-black font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Calculators
        </Link>

        {/* Card */}
        <div className="mt-6 bg-white rounded-3xl shadow p-8 grid md:grid-cols-2 gap-10">

          {/* Image */}
          <img
            src={calculator.image}
            alt={calculator.model}
            className="w-full h-80 object-cover rounded-xl"
          />

          {/* Info */}
          <div>

            <p className="text-sm text-gray-500 font-semibold">
              {calculator.brand}
            </p>

            <h1 className="text-3xl font-bold mt-1">
              {calculator.model}
            </h1>

            <div className="mt-6 space-y-3 text-gray-700">

              <div className="flex items-center gap-2">
                <Coins size={18} />
                Rent: {calculator.rentPrice} QAR / week
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={18} />
                Deposit: {calculator.deposit} QAR
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                Location: {calculator.location}
              </div>

              <div>
                Condition: <b>{calculator.condition}</b>
              </div>

            </div>

            {/* Contact */}
            <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
              Contact Owner
            </button>

            <button
            onClick={() => window.location.href = `/rental-hub/calculators/${id}/edit`}
            className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600"
            >
              Edit Listing
              </button>

            <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700"
            >
              Delete Listing
              </button>

          </div>
        </div>

      </div>
    </div>
  );
}
