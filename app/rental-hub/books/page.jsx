"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/listings");
      const data = await res.json();

      console.log("ALL DATA:", data); //  DEBUG

      //  ONLY BOOKS
      const onlyBooks = data.filter(
        (item) => item.type === "book"
      );

      console.log("FILTERED BOOKS:", onlyBooks); // 👈 DEBUG

      setBooks(onlyBooks);
    }

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8">Books</h1>

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {books.map((book) => (
            <Link
              key={book._id}
              href={`/rental-hub/books/${book._id}`}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md"
            >
              <img
                src={book.image || "/placeholder.jpg"}
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="font-bold mt-3">{book.title}</h2>

              <p className="text-sm text-gray-500">
                {book.author}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                {book.rentPrice} QAR
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}