"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCalculatorPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    condition: "",
    rentPrice: "",
    deposit: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/listings");
      const data = await res.json();

      const item = data.find((i) => i._id.toString() === id);

      if (item) setForm(item);
    }

    fetchData();
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`/api/listings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/rental-hub/calculators");
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Calculator</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="w-full border p-3 rounded" />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" className="w-full border p-3 rounded" />
        <input name="condition" value={form.condition} onChange={handleChange} placeholder="Condition" className="w-full border p-3 rounded" />
        <input name="rentPrice" value={form.rentPrice} onChange={handleChange} placeholder="Rent Price" className="w-full border p-3 rounded" />
        <input name="deposit" value={form.deposit} onChange={handleChange} placeholder="Deposit" className="w-full border p-3 rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-3 rounded" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full border p-3 rounded" />

        <button className="bg-blue-600 text-white px-6 py-3 rounded font-bold">
          Save Changes
        </button>
      </form>
    </div>
  );
}