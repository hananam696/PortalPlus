"use client";

import {
    ArrowLeft,
    Calculator,
    CheckCircle2,
    Coins,
    Image as ImageIcon,
    MapPin,
    ShieldCheck,
    UploadCloud,
    X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function PostCalculatorPage() {
  const router = useRouter();

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("Casio");
  const [condition, setCondition] = useState("Like New");
  const [rentPrice, setRentPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [location, setLocation] = useState("UDST Main Campus - Library");

  // upload file
  const [photoFile, setPhotoFile] = useState(null);

  // still allow URL
  const [photoUrl, setPhotoUrl] = useState("");

  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // preview for uploaded file
  const uploadedPreview = useMemo(() => {
    if (!photoFile) return "";
    return URL.createObjectURL(photoFile);
  }, [photoFile]);

  const photoPreview =
    uploadedPreview ||
    photoUrl ||
    "https://images.unsplash.com/photo-1629019239278-7bda9a8e3f2d?w=900&auto=format&fit=crop&q=60";

async function handleSubmit(e) {
  e.preventDefault();

  if (!model || !rentPrice || !location) {
    alert("Please fill in all required fields.");
    return;
  }

  const listing = {
    type: "calculator",
    brand,
    model,
    condition,
    rentPrice,
    deposit,
    location,
    notes,
    image: photoUrl,
    createdAt: new Date(),
  };

  const res = await fetch("/api/listings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listing),
  });

  const data = await res.json();

  if (data.success) {
    setSubmitted(true);
  }
}


  function clearUpload() {
    setPhotoFile(null);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="max-w-3xl mx-auto bg-white border rounded-3xl p-10 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
            <CheckCircle2 className="w-8 h-8 text-blue-700" />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mt-6">
            Calculator Posted Successfully 🎉
          </h1>

          <p className="text-slate-600 mt-3 leading-relaxed">
            Your listing has been created (demo UI). Later this will be saved
            into the database and appear automatically in the Calculators list.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/rental-hub/calculators"
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              View Calculators List
            </Link>

            <button
              onClick={() => router.push("/rental-hub")}
              className="px-6 py-3 rounded-2xl border bg-white hover:bg-slate-50 font-bold transition"
            >
              Back to Rental Hub
            </button>
          </div>

          {/* PREVIEW */}
          <div className="mt-10 text-left rounded-3xl bg-slate-50 border p-6">
            <p className="text-sm font-semibold text-slate-500">Preview</p>

            <div className="mt-4 flex gap-5">
              <img
                src={photoPreview}
                alt={model}
                className="w-28 h-28 object-cover rounded-2xl border bg-white"
              />

              <div>
                <p className="font-extrabold text-slate-900">
                  {brand} {model}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white border text-sm font-semibold text-slate-700">
                    {condition}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-800">
                    Rent: {rentPrice} QAR / week
                  </span>

                  {deposit && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 border text-sm font-bold text-slate-800">
                      Deposit: {deposit} QAR
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 mt-3">
                  Pickup: <span className="font-semibold">{location}</span>
                </p>
              </div>
            </div>

            {notes && (
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {notes}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
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
            href="/rental-hub/calculators"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            View all calculators
          </Link>
        </div>

        {/* CARD */}
        <div className="mt-6 bg-white rounded-3xl border shadow-sm overflow-hidden">
          <div className="p-8 md:p-10">
            <h1 className="text-3xl font-extrabold text-slate-900">
              Post a Calculator
            </h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Share your calculator so other UDST students can borrow it for
              exams. Backend will be connected later.
            </p>

            {/* LIVE PREVIEW */}
            <div className="mt-8 rounded-3xl border bg-slate-50 p-6 flex flex-col sm:flex-row gap-5">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-2xl border bg-white"
              />

              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-500">
                  Live Preview
                </p>

                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {(brand || "Brand") + " " + (model || "Calculator Model")}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white border text-sm font-semibold text-slate-700">
                    {condition}
                  </span>

                  {rentPrice ? (
                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-800">
                      Rent: {rentPrice} QAR / week
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-100 border text-sm font-bold text-slate-700">
                      Rent price not set
                    </span>
                  )}

                  {deposit && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 border text-sm font-bold text-slate-800">
                      Deposit: {deposit} QAR
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 mt-3">
                  Pickup: <span className="font-semibold">{location}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
              {/* BRAND */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Brand *
                </label>

                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full rounded-2xl border px-5 py-4 bg-white font-semibold text-slate-800"
                >
                  <option>Casio</option>
                  <option>Texas Instruments</option>
                  <option>Sharp</option>
                  <option>Other</option>
                </select>
              </div>

              {/* MODEL */}
              <Field label="Model Name *" icon={<Calculator className="w-5 h-5" />}>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Example: FX-991ES Plus"
                  className="w-full outline-none bg-transparent"
                />
              </Field>

              {/* CONDITION */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Condition *
                </label>

                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full rounded-2xl border px-5 py-4 bg-white font-semibold text-slate-800"
                >
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>

              {/* PRICES */}
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Rent Price (per week) *" icon={<Coins className="w-5 h-5" />}>
                  <input
                    value={rentPrice}
                    onChange={(e) => setRentPrice(e.target.value)}
                    placeholder="Example: 5"
                    type="number"
                    className="w-full outline-none bg-transparent"
                  />
                </Field>

                <Field label="Deposit (optional)" icon={<ShieldCheck className="w-5 h-5" />}>
                  <input
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="Example: 30"
                    type="number"
                    className="w-full outline-none bg-transparent"
                  />
                </Field>
              </div>

              {/* LOCATION */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Pickup Location *
                </label>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white font-semibold text-slate-800"
                  >
                    <option>UDST Main Campus - Library</option>
                    <option>UDST Main Campus - Student Center</option>
                    <option>UDST Main Campus - Building B</option>
                    <option>UDST Main Campus - Cafeteria</option>
                  </select>
                </div>
              </div>

              {/* UPLOAD PHOTO */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Upload Calculator Photo (optional)
                </label>

                <div className="rounded-3xl border bg-white p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <UploadCloud className="w-6 h-6 text-blue-700" />
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">Upload a photo</p>
                        <p className="text-sm text-slate-600">
                          JPG / PNG recommended
                        </p>
                      </div>
                    </div>

                    <label className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setPhotoFile(file);
                          setPhotoUrl("");
                        }}
                      />
                    </label>
                  </div>

                  {photoFile && (
                    <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 border px-4 py-3">
                      <div className="text-sm">
                        <p className="font-bold text-slate-900">{photoFile.name}</p>
                        <p className="text-slate-500 text-xs">
                          {(photoFile.size / 1024).toFixed(0)} KB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={clearUpload}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-white hover:bg-slate-100 font-bold text-slate-700 transition"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 mt-4">
                    Note: This is preview-only for now. Later we will upload this
                    image to cloud storage.
                  </p>
                </div>
              </div>

              {/* PHOTO URL */}
              <Field label="Photo URL (optional)" icon={<ImageIcon className="w-5 h-5" />}>
                <input
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    setPhotoFile(null);
                  }}
                  placeholder="Paste an image link (Unsplash etc.)"
                  className="w-full outline-none bg-transparent"
                />
              </Field>

              {/* NOTES */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Example: Includes cover case. Battery recently changed."
                  className="w-full rounded-2xl border px-5 py-4 bg-white text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
              >
                Post Listing
              </button>

              <p className="text-xs text-slate-500 text-center">
                Note: This is currently a demo UI. Later we will connect it to a
                real database.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL UI COMPONENT ---------------- */

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-900 mb-2">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border px-5 py-4 bg-white">
        <span className="text-blue-700">{icon}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
