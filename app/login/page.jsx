"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        router.push("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 flex items-center justify-center p-6">
      <div className="flex flex-col items-center w-full">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          <div className="h-1.5 bg-emerald-500" />

          <div className="p-10">
            {/* LOGO */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image src="/logo.png" alt="PortalPlus Logo" fill className="object-contain" />
                </div>
                <span className="text-2xl font-bold text-emerald-700">PortalPlus</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">Welcome Back! 👋</h1>
            <p className="text-center text-slate-500 mb-8">Sign in to continue</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center mt-6 text-slate-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-emerald-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* BOTTOM BANNER */}
        <div className="mt-6 max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-center">
          <p className="text-white text-base font-semibold leading-relaxed">
            🔐 Sign In to access all features and start exploring PortalPlus.
          </p>
        </div>

      </div>
    </div>
  );
}