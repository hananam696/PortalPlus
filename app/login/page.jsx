"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        //  SAVE TOKEN + USER
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        //  redirect
        window.location.href = "/rental-hub";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button className="w-full bg-green-600 text-white py-3 mt-4 rounded-xl">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}