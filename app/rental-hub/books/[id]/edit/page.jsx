// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function EditBookPage() {
//   const router = useRouter();
//   const { id } = useParams();

//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     department: "",
//     condition: "",
//     rentPrice: "",
//     location: "",
//     image: "",
//   });

//   // ✅ Fetch existing book
//   useEffect(() => {
//     async function fetchBook() {
//       const res = await fetch("/api/listings");
//       const data = await res.json();

//       const item = data.find((i) => i._id === id);

//       if (item) {
//         setForm({
//           title: item.title || "",
//           author: item.author || "",
//           department: item.department || "",
//           condition: item.condition || "",
//           rentPrice: item.rentPrice || "",
//           location: item.location || "",
//           image: item.image || "",
//         });
//       }
//     }

//     fetchBook();
//   }, [id]);

//   // ✅ Handle input change
//   function handleChange(e) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   }

//   // ✅ Submit update
//   async function handleSubmit(e) {
//     e.preventDefault();

//     const res = await fetch(`/api/listings/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       router.push("/rental-hub/books");
//     } else {
//       alert("Update failed");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-4"
//       >
//         <h1 className="text-2xl font-bold">Edit Book</h1>

//         <input
//           name="title"
//           placeholder="Book Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//           required
//         />

//         <input
//           name="author"
//           placeholder="Author"
//           value={form.author}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//           required
//         />

//         <input
//           name="department"
//           placeholder="Department (e.g. IT, Engineering)"
//           value={form.department}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <select
//           name="condition"
//           value={form.condition}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         >
//           <option value="">Select Condition</option>
//           <option value="Like New">Like New</option>
//           <option value="Good">Good</option>
//           <option value="Fair">Fair</option>
//         </select>

//         <input
//           name="rentPrice"
//           placeholder="Rent Price (QAR/week)"
//           value={form.rentPrice}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//           required
//         />

//         <input
//           name="location"
//           placeholder="Pickup Location"
//           value={form.location}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <input
//           name="image"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={handleChange}
//           className="w-full border p-3 rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
//         >
//           Update Book
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, UploadCloud, X, Loader2, BookOpen, Coins, MapPin, Tag, GraduationCap } from "lucide-react";
import Link from "next/link";

async function uploadImageToAzure(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.imageUrl;
}

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    author: "",
    course: "",
    condition: "Like New",
    rentPrice: "",
    buyPrice: "",
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

  // ✅ Fetch existing book by ID directly
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const item = await res.json();
        if (item && !item.error) {
          setForm({
            title: item.title || "",
            author: item.author || "",
            course: item.course || item.department || "",
            condition: item.condition || "Like New",
            rentPrice: item.rentPrice || "",
            buyPrice: item.buyPrice || "",
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
    fetchBook();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // Upload new image if selected
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
          userId: user?.id,  // ✅ Required for ownership check
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
          <h1 className="text-2xl font-extrabold text-slate-900">Edit Book</h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Cover Image</label>
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
                  {imageFile ? "Change Photo" : "Change Photo"}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) setImageFile(f); }} />
                </label>
              </div>
            </div>

            {/* TITLE */}
            <Field label="Book Title *" icon={<BookOpen className="w-5 h-5" />}>
              <input name="title" value={form.title} onChange={handleChange}
                placeholder="Database Systems" className="w-full outline-none bg-transparent" required />
            </Field>

            {/* AUTHOR */}
            <Field label="Author *" icon={<Tag className="w-5 h-5" />}>
              <input name="author" value={form.author} onChange={handleChange}
                placeholder="R. Elmasri" className="w-full outline-none bg-transparent" required />
            </Field>

            {/* COURSE */}
            <Field label="Course Code" icon={<GraduationCap className="w-5 h-5" />}>
              <input name="course" value={form.course} onChange={handleChange}
                placeholder="IT220" className="w-full outline-none bg-transparent" />
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
                  placeholder="10" type="number" className="w-full outline-none bg-transparent" required />
              </Field>
              <Field label="Buy Price (optional)" icon={<Coins className="w-5 h-5" />}>
                <input name="buyPrice" value={form.buyPrice} onChange={handleChange}
                  placeholder="45" type="number" className="w-full outline-none bg-transparent" />
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
              ) : "Update Book"}
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