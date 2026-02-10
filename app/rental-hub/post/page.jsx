"use client";

import { ArrowLeft, ArrowRight, BookOpen, Calculator, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function PostItemPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/rental-hub"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rental Hub
          </Link>
        </div>

        {/* HEADER */}
        <div className="mt-8">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Post an Item
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Choose what you want to share with UDST students. You can post a book
            or a calculator.
          </p>
        </div>

        {/* OPTIONS */}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* BOOK */}
          <Link href="/rental-hub/post/book">
            <div className="bg-white rounded-3xl border shadow-sm hover:shadow-lg transition p-10 cursor-pointer relative overflow-hidden group">
              <div className="absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                Book
              </div>

              <div className="w-16 h-16 rounded-2xl bg-slate-50 border flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-105 transition">
                <BookOpen size={34} />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Post a Book
              </h2>

              <p className="text-slate-600 mb-6">
                List your textbook for rent or sale so other students can use it.
              </p>

              <div className="text-emerald-700 font-bold flex items-center gap-2">
                Continue <ArrowRight size={18} />
              </div>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-100 to-transparent rounded-full blur-2xl opacity-70"></div>
            </div>
          </Link>

          {/* CALCULATOR */}
          <Link href="/rental-hub/post/calculator">
            <div className="bg-white rounded-3xl border shadow-sm hover:shadow-lg transition p-10 cursor-pointer relative overflow-hidden group">
              <div className="absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                Calculator
              </div>

              <div className="w-16 h-16 rounded-2xl bg-slate-50 border flex items-center justify-center text-blue-700 mb-6 group-hover:scale-105 transition">
                <Calculator size={34} />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Post a Calculator
              </h2>

              <p className="text-slate-600 mb-6">
                Share your calculator for other students to borrow for exams.
              </p>

              <div className="text-blue-700 font-bold flex items-center gap-2">
                Continue <ArrowRight size={18} />
              </div>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-70"></div>
            </div>
          </Link>
        </div>

        {/* EXTRA INFO */}
        <div className="mt-12 bg-white border rounded-3xl p-8 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <PlusCircle className="w-6 h-6 text-emerald-700" />
          </div>

          <div>
            <p className="font-extrabold text-slate-900">
              Tip: Posting helps sustainability ♻️
            </p>
            <p className="text-slate-600 text-sm mt-1">
              Sharing reduces waste and supports the eco-points system later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
