"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/listings");
      const data = await res.json();
      const onlyBooks = data.filter((item) => item.type === "book");
      setBooks(onlyBooks);
    }
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const text = `${book.title || ""} ${book.author || ""} ${book.location || ""} ${book.course || ""}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [books, search]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rental Hub
          </button>
        </div>

        {/* HEADER CARD (LIKE CALCULATOR) */}
        <div className="mt-8 bg-white rounded-3xl border shadow-sm p-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Available Books
          </h1>

          {/* SEARCH */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author or course code..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border"
            />
          </div>
        </div>

        {/* BOOK LIST */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Link
              key={book._id}
              href={`/rental-hub/books/${book._id}`}
              className="bg-white rounded-3xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <img
                src={book.image || "/placeholder.jpg"}
                alt={book.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-6">
                <p className="text-xs text-slate-500">
                  {book.author || "Author"}
                </p>

                <h2 className="text-lg font-extrabold">
                  {book.title || "Book"}
                </h2>

                <p className="text-blue-700 font-bold mt-2">
  {book.rentPrice} QAR
</p>

<p className="text-sm text-slate-600 mt-2 flex items-center gap-2">
  <MapPin className="w-4 h-4" />
  {book.location || "Location not set"}
</p>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY */}
        {filteredBooks.length === 0 && (
          <div className="mt-10 text-center">
            No books found
          </div>
        )}
      </div>
    </div>
  );
}