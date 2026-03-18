"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    author: "",
    department: "",
    condition: "",
    rentPrice: "",
    location: "",
    image: "",
  });

  // ✅ Fetch existing book
  useEffect(() => {
    async function fetchBook() {
      const res = await fetch("/api/listings");
      const data = await res.json();

      const item = data.find((i) => i._id === id);

      if (item) {
        setForm({
          title: item.title || "",
          author: item.author || "",
          department: item.department || "",
          condition: item.condition || "",
          rentPrice: item.rentPrice || "",
          location: item.location || "",
          image: item.image || "",
        });
      }
    }

    fetchBook();
  }, [id]);

  // ✅ Handle input change
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // ✅ Submit update
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/listings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/rental-hub/books");
    } else {
      alert("Update failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold">Edit Book</h1>

        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="department"
          placeholder="Department (e.g. IT, Engineering)"
          value={form.department}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Condition</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>

        <input
          name="rentPrice"
          placeholder="Rent Price (QAR/week)"
          value={form.rentPrice}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="location"
          placeholder="Pickup Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}