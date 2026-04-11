"use client";

import { useState, useEffect, Suspense } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// Inner component that uses useSearchParams
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // ✅ Redirect back to the page they tried to access, or home
        router.push(from);
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  const features = [
    { val: "Rental Hub", label: "borrow campus items instead of buying new" },
    { val: "Sustainability", label: "view campus eco initiatives and your activity" },
    { val: "Certificates", label: "download sustainability participation certificates" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-4xl min-h-screen md:min-h-[600px] md:rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
      >
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-[40%] bg-[#0f6e56] flex-col p-10 justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="PortalPlus Logo" fill className="object-contain" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Portal<span className="text-emerald-300">Plus</span>
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-emerald-300 text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">What's inside</p>
            {features.map((s) => (
              <div key={s.val} className="border border-white/20 hover:border-white/40 rounded-2xl px-5 py-4 transition">
                <p className="text-white font-semibold text-sm tracking-tight">{s.val}</p>
                <p className="text-emerald-200/70 text-xs mt-1 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

          <div /> 
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 flex flex-col justify-center items-center px-12 py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center tracking-tight">Welcome back</h1>
            <p className="text-sm text-gray-400 mb-8 text-center">Sign in to your PortalPlus account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition pr-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0f6e56] hover:bg-[#085041] text-white py-3.5 rounded-xl text-sm font-bold tracking-wide transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-emerald-600 font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Main component with Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}