"use client";

import {
  ArrowRight,
  BookOpen,
  Calculator,
  ClipboardList,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

export default function RentalHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* LEFT */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                Rental Hub
              </h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Borrow or share textbooks and calculators with UDST students.
                Save money and reduce waste ♻️
              </p>
            </div>

            {/* RIGHT (Top UX button) */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/rental-hub/post"
                className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} />
                Post an Item
              </Link>

              <Link
                href="/rental-hub/my-listings"
                className="border bg-white px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ClipboardList size={18} />
                My Listings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-14">
        {/* BORROW SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Browse Items
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <BigCard
              title="Browse Books"
              desc="Find textbooks shared by students"
              icon={<BookOpen size={34} />}
              link="/rental-hub/books"
              tag="Borrow"
            />

            <BigCard
              title="Browse Calculators"
              desc="Borrow scientific calculators for exams"
              icon={<Calculator size={34} />}
              link="/rental-hub/calculators"
              tag="Borrow"
            />
          </div>
        </section>

        {/* SHARE SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Share an Item
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <BigCard
              title="Post an Item"
              desc="List a book or calculator for rent"
              icon={<PlusCircle size={34} />}
              link="/rental-hub/post"
              tag="Share"
            />

            <BigCard
              title="My Listings"
              desc="Manage items you posted"
              icon={<ClipboardList size={34} />}
              link="/rental-hub/my-listings"
              tag="Manage"
            />
          </div>
        </section>

        {/* FOOTER INFO */}
        <div className="bg-white rounded-3xl shadow p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Sustainable sharing ♻️
            </h3>
            <p className="text-gray-600">
              Sharing reduces waste and earns eco points in the Sustainability
              module.
            </p>
          </div>

          <Link
            href="/sustainability"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition flex items-center gap-2"
          >
            Go to Sustainability <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

function BigCard({ title, desc, icon, link, tag }) {
  return (
    <Link href={link}>
      <div className="bg-white rounded-3xl shadow hover:shadow-xl transition p-9 cursor-pointer relative overflow-hidden group">
        <div
          className={`absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full
          ${tag === "Borrow" ? "bg-blue-50 text-blue-700" : ""}
          ${tag === "Share" ? "bg-green-50 text-green-700" : ""}
          ${tag === "Manage" ? "bg-gray-100 text-gray-700" : ""}`}
        >
          {tag}
        </div>

        <div className="w-16 h-16 rounded-2xl bg-gray-50 border flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-105 transition">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{desc}</p>

        <div className="text-emerald-700 font-semibold flex items-center gap-2">
          Open <ArrowRight size={18} />
        </div>

        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-100 to-transparent rounded-full blur-2xl opacity-70"></div>
      </div>
    </Link>
  );
}
