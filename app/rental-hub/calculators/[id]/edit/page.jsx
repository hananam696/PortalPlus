"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud, X, Loader2, Calculator, Coins, MapPin, Tag } from "lucide-react";

async function uploadImageToAzure(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.imageUrl;
}

export default function EditCalculatorPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    condition: "Like New",
    rentPrice: "",
    deposit: "",
    location: "UDST Main Campus - Library",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const imagePreview = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return form.image || "";
  }, [imageFile, form.image]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const item = await res.json();
        if (item && !item.error) {
          setForm({
            brand: item.brand || "",
            model: item.model || "",
            condition: item.condition || "Like New",
            rentPrice: item.rentPrice || "",
            deposit: item.deposit || "",
            location: item.location || "UDST Main Campus - Library",
            image: item.image || "",
          });
        }
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      let imageUrl = form.image;
      if (imageFile) {
        setUploading(true);
        try {
          imageUrl = await uploadImageToAzure(imageFile);
        } catch (err) {
          alert("Image upload failed: " + err.message);
          setUploading(false);
          setSubmitting(false);
          return;
        }
        setUploading(false);
      }

      const res = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
          userId: user?.id,
        }),
      });

      if (res.ok) {
        router.push("/rental-hub/my-listings");
      } else {
        const err = await res.json();
        alert(err.error || "Update failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* TOP BAR */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mt-6 bg-white rounded-3xl border shadow-sm p-8 space-y-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Edit Calculator</h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Photo</label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-5 bg-gray-50">
                {imagePreview ? (
                  <div className="flex items-center gap-4 mb-4">
                    <img src={imagePreview} alt="Preview" className="w-20 h-24 object-cover rounded-xl border" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{imageFile ? imageFile.name : "Current image"}</p>
                    </div>
                    {imageFile && (
                      <button type="button" onClick={() => setImageFile(null)}
                        className="p-2 rounded-lg border bg-white hover:bg-gray-100">
                        <X size={16} className="text-gray-500" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4 text-center">
                    <UploadCloud size={28} className="text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">No image yet</p>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm cursor-pointer transition">
                  <UploadCloud size={16} />
                  Change Photo
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) setImageFile(f); }} />
                </label>
              </div>
            </div>

            {/* BRAND */}
            <Field label="Brand *" icon={<Calculator className="w-5 h-5" />}>
              <input name="brand" value={form.brand} onChange={handleChange}
                placeholder="Casio" className="w-full outline-none bg-transparent" required />
            </Field>

            {/* MODEL */}
            <Field label="Model *" icon={<Tag className="w-5 h-5" />}>
              <input name="model" value={form.model} onChange={handleChange}
                placeholder="fx-991ES" className="w-full outline-none bg-transparent" required />
            </Field>

            {/* CONDITION */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Condition *</label>
              <select name="condition" value={form.condition} onChange={handleChange}
                className="w-full rounded-2xl border px-5 py-4 bg-white font-semibold text-slate-800">
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>

            {/* PRICES */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Rent Price (QAR/week) *" icon={<Coins className="w-5 h-5" />}>
                <input name="rentPrice" value={form.rentPrice} onChange={handleChange}
                  placeholder="5" type="number" className="w-full outline-none bg-transparent" required />
              </Field>
              <Field label="Deposit (optional)" icon={<Coins className="w-5 h-5" />}>
                <input name="deposit" value={form.deposit} onChange={handleChange}
                  placeholder="20" type="number" className="w-full outline-none bg-transparent" />
              </Field>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Pickup Location *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700" />
                <select name="location" value={form.location} onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white font-semibold text-slate-800">
                  <option>UDST Main Campus - Library</option>
                  <option>UDST Main Campus - Student Center</option>
                  <option>UDST Main Campus - Building B</option>
                  <option>UDST Main Campus - Cafeteria</option>
                </select>
              </div>
            </div>

            {/* SUBMIT */}
            <button type="submit" disabled={submitting}
              className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? (
                <><Loader2 size={18} className="animate-spin" />
                  {uploading ? "Uploading image..." : "Updating..."}</>
              ) : "Update Calculator"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-900 mb-2">{label}</label>
      <div className="flex items-center gap-3 rounded-2xl border px-5 py-4 bg-white">
        <span className="text-emerald-700">{icon}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}