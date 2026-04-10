// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { BookOpen, Calculator, ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function PostItemPage() {
//   const [category, setCategory] = useState("book");
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     brand: "",
//     model: "",
//     condition: "Like New",
//     rentPrice: "",
//     description: "",
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     if (!userStr) {
//       router.push("/login");
//       return;
//     }
//     setUser(JSON.parse(userStr));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert("Please login first");
//       router.push("/login");
//       return;
//     }

//     setSubmitting(true);

//     const itemData = {
//       type: category,
//       condition: formData.condition,
//       rentPrice: parseFloat(formData.rentPrice),
//       status: "Available",
//       userId: user.id,
//       userEmail: user.email,
//       userName: `${user.firstName} ${user.lastName}`,
//       createdAt: new Date(),
//     };

//     if (category === "book") {
//       itemData.title = formData.title;
//       itemData.author = formData.author;
//     } else {
//       itemData.brand = formData.brand;
//       itemData.model = formData.model;
//     }

//     try {
//       const res = await fetch("/api/listings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(itemData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Item posted successfully!");
//         router.push("/rental-hub/my-listings");
//       } else {
//         alert(data.error || "Failed to post item");
//       }
//     } catch (error) {
//       alert("Error posting item");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-2xl mx-auto px-6">
//         <Link href="/rental-hub" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
//           <ArrowLeft size={16} />
//           Back to Rental Hub
//         </Link>

//         <div className="bg-white rounded-2xl shadow-sm p-8">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Post an Item</h1>
//           <p className="text-gray-500 mb-6">Share your books and calculators with fellow students</p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Category Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
//               <div className="flex gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setCategory("book")}
//                   className={`flex-1 py-3 rounded-xl border-2 transition ${
//                     category === "book"
//                       ? "border-emerald-500 bg-emerald-50 text-emerald-700"
//                       : "border-gray-200 hover:border-emerald-200"
//                   }`}
//                 >
//                   <BookOpen size={20} className="inline mr-2" />
//                   Book
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setCategory("calculator")}
//                   className={`flex-1 py-3 rounded-xl border-2 transition ${
//                     category === "calculator"
//                       ? "border-emerald-500 bg-emerald-50 text-emerald-700"
//                       : "border-gray-200 hover:border-emerald-200"
//                   }`}
//                 >
//                   <Calculator size={20} className="inline mr-2" />
//                   Calculator
//                 </button>
//               </div>
//             </div>

//             {/* Book Fields */}
//             {category === "book" && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.author}
//                     onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                     className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Calculator Fields */}
//             {category === "calculator" && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.brand}
//                     onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
//                     className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.model}
//                     onChange={(e) => setFormData({ ...formData, model: e.target.value })}
//                     className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Common Fields */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//               <select
//                 value={formData.condition}
//                 onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
//                 className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               >
//                 <option>Like New</option>
//                 <option>Very Good</option>
//                 <option>Good</option>
//                 <option>Acceptable</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Rent Price (QAR per day)</label>
//               <input
//                 type="number"
//                 required
//                 value={formData.rentPrice}
//                 onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}
//                 placeholder="0"
//                 className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition disabled:opacity-50"
//             >
//               {submitting ? "Posting..." : "Post Item"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Calculator, ArrowLeft, UploadCloud, X, Loader2 } from "lucide-react";
import Link from "next/link";

/* ── Upload helper ── */
async function uploadImageToAzure(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.imageUrl;
}

export default function PostItemPage() {
  const [category, setCategory] = useState("book");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    brand: "",
    model: "",
    condition: "Like New",
    rentPrice: "",
    description: "",
  });

  // Image state
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Image preview URL
  const imagePreview = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userStr));
  }, []);

  // Reset image when category changes
  function handleCategoryChange(cat) {
    setCategory(cat);
    setImageFile(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Upload image to Azure if a file was selected
      let imageUrl = "";
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

      // 2. Build listing object
      const itemData = {
        type: category,
        condition: formData.condition,
        rentPrice: parseFloat(formData.rentPrice),
        description: formData.description,
        image: imageUrl,
        status: "Available",
        userId: user.id,
        userEmail: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        createdAt: new Date(),
      };

      if (category === "book") {
        itemData.title = formData.title;
        itemData.author = formData.author;
      } else {
        itemData.brand = formData.brand;
        itemData.model = formData.model;
      }

      // 3. Save to MongoDB
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Item posted successfully!");
        router.push("/rental-hub/my-listings");
      } else {
        alert(data.error || "Failed to post item");
      }
    } catch (error) {
      alert("Error posting item: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Link
          href="/rental-hub"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Rental Hub
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post an Item</h1>
          <p className="text-gray-500 mb-6">
            Share your books and calculators with fellow students
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ── Category ── */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleCategoryChange("book")}
                  className={`flex-1 py-3 rounded-xl border-2 transition ${
                    category === "book"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-emerald-200"
                  }`}
                >
                  <BookOpen size={20} className="inline mr-2" />
                  Book
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryChange("calculator")}
                  className={`flex-1 py-3 rounded-xl border-2 transition ${
                    category === "calculator"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-emerald-200"
                  }`}
                >
                  <Calculator size={20} className="inline mr-2" />
                  Calculator
                </button>
              </div>
            </div>

            {/* ── IMAGE UPLOAD ── */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo (optional)
              </label>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 bg-gray-50">
                {/* Preview */}
                {imagePreview ? (
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-xl border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {imageFile.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {(imageFile.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImageFile(null)}
                      className="p-2 rounded-lg border bg-white hover:bg-gray-100 transition"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4 text-center">
                    <UploadCloud size={32} className="text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">
                      Upload a photo or take one with your camera
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG, WEBP · Max 5MB
                    </p>
                  </div>
                )}

                {/* File input button */}
                <label className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm cursor-pointer transition">
                  <UploadCloud size={16} />
                  {imageFile ? "Change Photo" : "Choose / Take Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setImageFile(file);
                    }}
                  />
                </label>

                <p className="text-xs text-gray-400 text-center mt-2">
                  📱 On mobile, you can take a photo directly with your camera.
                  Image stored securely on Azure.
                </p>
              </div>
            </div>

            {/* ── Book Fields ── */}
            {category === "book" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Example: Database Systems"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    placeholder="Example: R. Elmasri"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            {/* ── Calculator Fields ── */}
            {category === "calculator" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    placeholder="Example: Casio"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    placeholder="Example: fx-991ES Plus"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            {/* ── Common Fields ── */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition *
              </label>
              <select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Like New</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Acceptable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent Price (QAR per day) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.rentPrice}
                onChange={(e) =>
                  setFormData({ ...formData, rentPrice: e.target.value })
                }
                placeholder="0"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {uploading ? "Uploading image..." : "Posting..."}
                </>
              ) : (
                "Post Item"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}