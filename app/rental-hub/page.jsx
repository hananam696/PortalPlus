// "use client";

// import { useState } from "react";
// import { BookOpen, Calculator } from "lucide-react";

// export default function RentalHubPage() {
//   const [activeTab, setActiveTab] = useState("books");

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600">
//       {/* HERO */}
//       <div className="py-24 text-center text-white">
//         <h1 className="text-5xl font-extrabold mb-4">
//           Rental Hub
//         </h1>
//         <p className="text-lg text-blue-100 max-w-2xl mx-auto">
//           Borrow textbooks and calculators from fellow students to save money
//           and reduce resource consumption.
//         </p>
//       </div>

//       {/* CONTENT */}
//       <div className="bg-white rounded-t-3xl px-6 py-10 max-w-6xl mx-auto">
//         {/* TABS */}
//         <div className="flex justify-center gap-6 mb-10">
//           <TabButton
//             label="Books"
//             icon={<BookOpen />}
//             active={activeTab === "books"}
//             onClick={() => setActiveTab("books")}
//           />
//           <TabButton
//             label="Calculators"
//             icon={<Calculator />}
//             active={activeTab === "calculators"}
//             onClick={() => setActiveTab("calculators")}
//           />
//         </div>

//         {/* TAB CONTENT */}
//         {activeTab === "books" && <BooksTab />}
//         {activeTab === "calculators" && <CalculatorsTab />}
//       </div>
//     </div>
//   );
// }

// /* ---------------- TAB BUTTON ---------------- */

// function TabButton({ label, icon, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition
//         ${
//           active
//             ? "bg-indigo-600 text-white shadow"
//             : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//         }`}
//     >
//       {icon}
//       {label}
//     </button>
//   );
// }

// /* ---------------- BOOKS TAB ---------------- */

// function BooksTab() {
//   const books = [
//     {
//       title: "Data Structures & Algorithms",
//       course: "CS204",
//       status: "Available",
//     },
//     {
//       title: "Engineering Mathematics",
//       course: "MATH201",
//       status: "Rented",
//     },
//     {
//       title: "Database Systems",
//       course: "CS310",
//       status: "Available",
//     },
//   ];

//   return (
//     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {books.map((book, index) => (
//         <RentalCard
//           key={index}
//           icon={<BookOpen />}
//           title={book.title}
//           subtitle={book.course}
//           status={book.status}
//         />
//       ))}
//     </div>
//   );
// }

// /* ---------------- CALCULATORS TAB ---------------- */

// function CalculatorsTab() {
//   const calculators = [
//     {
//       title: "Casio FX-991ES Plus",
//       course: "Engineering",
//       status: "Available",
//     },
//     {
//       title: "Texas Instruments TI-84",
//       course: "Statistics",
//       status: "Rented",
//     },
//   ];

//   return (
//     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {calculators.map((calc, index) => (
//         <RentalCard
//           key={index}
//           icon={<Calculator />}
//           title={calc.title}
//           subtitle={calc.course}
//           status={calc.status}
//         />
//       ))}
//     </div>
//   );
// }

// /* ---------------- RENTAL CARD ---------------- */

// function RentalCard({ icon, title, subtitle, status }) {
//   const isAvailable = status === "Available";

//   return (
//     <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
//       <div className="text-indigo-600 mb-3">{icon}</div>

//       <h3 className="font-semibold text-lg mb-1">{title}</h3>
//       <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

//       <span
//         className={`inline-block px-3 py-1 text-sm rounded-full font-medium
//           ${
//             isAvailable
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//       >
//         {status}
//       </span>
//     </div>
//   );
// }
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
          <h1 className="text-4xl font-extrabold text-gray-900">
            Rental Hub
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Borrow or share textbooks and calculators with UDST students.
            Save money and reduce waste ♻️
          </p>
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

        {/* LENDER SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Share / Manage
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <BigCard
              title="Post an Item"
              desc="List your book or calculator for rent"
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

        <div className="w-16 h-16 rounded-2xl bg-gray-50 border flex items-center justify-center text-green-700 mb-6 group-hover:scale-105 transition">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{desc}</p>

        <div className="text-green-700 font-semibold flex items-center gap-2">
          Open <ArrowRight size={18} />
        </div>

        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-2xl opacity-70"></div>
      </div>
    </Link>
  );
}
