"use client";

import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Account created successfully!");
      window.location.href = "/login";
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="firstName" onChange={handleChange} placeholder="First Name" required className="input"/>
          <input name="lastName" onChange={handleChange} placeholder="Last Name" required className="input"/>
          <input name="email" type="email" onChange={handleChange} placeholder="Email" required className="input"/>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="input w-full"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}