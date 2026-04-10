// "use client";

// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// export default function SignupPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.success) {
//       alert("Account created successfully! Please login.");
//       window.location.href = "/login";
//     } else {
//       alert(data.error || "Something went wrong");
//     }
//   };

//   // return (
//   //   <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 flex items-center justify-center p-6">
//   //     <motion.div
//   //       initial={{ opacity: 0, y: 20 }}
//   //       animate={{ opacity: 1, y: 0 }}
//   //       className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
//   //     >
//   //       <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
//   //       <div className="p-8">
//   //         {/* PortalPlus Logo */}
//   //         <div className="flex justify-center mb-6">
//   //           <div className="flex items-center gap-3">
//   //             <div className="relative w-12 h-12">
//   //               <Image
//   //                 src="/logo.png"
//   //                 alt="PortalPlus Logo"
//   //                 fill
//   //                 className="object-contain"
//   //               />
//   //             </div>
//   //             <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//   //               PortalPlus
//   //             </span>
//   //           </div>
//   //         </div>

//   //         <h1 className="text-2xl font-bold text-center mb-2">Create Account </h1>
//   //         <p className="text-center text-gray-500 mb-6">Join the sustainable student community</p>

//   //         <form onSubmit={handleSubmit} className="space-y-4">
//   //           <div className="grid grid-cols-2 gap-4">
//   //             <input
//   //               name="firstName"
//   //               onChange={handleChange}
//   //               placeholder="First Name"
//   //               required
//   //               className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
//   //             />
//   //             <input
//   //               name="lastName"
//   //               onChange={handleChange}
//   //               placeholder="Last Name"
//   //               required
//   //               className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
//   //             />
//   //           </div>

//   //           <input
//   //             name="email"
//   //             type="email"
//   //             onChange={handleChange}
//   //             placeholder="Email Address"
//   //             required
//   //             className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
//   //           />

//   //           <div className="relative">
//   //             <input
//   //               type={showPassword ? "text" : "password"}
//   //               name="password"
//   //               onChange={handleChange}
//   //               placeholder="Password"
//   //               required
//   //               className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
//   //             />
//   //             <button
//   //               type="button"
//   //               onClick={() => setShowPassword(!showPassword)}
//   //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//   //             >
//   //               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//   //             </button>
//   //           </div>

//   //           <button
//   //             type="submit"
//   //             disabled={loading}
//   //             className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50"
//   //           >
//   //             {loading ? "Creating account..." : "Sign Up"}
//   //           </button>
//   //         </form>

//   //         <p className="text-center mt-6 text-gray-600">
//   //           Already have an account?{" "}
//   //           <Link href="/login" className="text-green-600 font-semibold hover:underline">
//   //             Log in
//   //           </Link>
//   //         </p>
//   //       </div>
//   //     </motion.div>
//   return (
//   <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 flex items-center justify-center p-6">

//     {/* 🔥 WRAPPER (FIX ALIGNMENT) */}
//     <div className="flex flex-col items-center w-full">

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
//       >
//         <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>

//         <div className="p-8">
//           {/* LOGO */}
//           <div className="flex justify-center mb-6">
//             <div className="flex items-center gap-3">
//               <div className="relative w-12 h-12">
//                 <Image
//                   src="/logo.png"
//                   alt="PortalPlus Logo"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                 PortalPlus
//               </span>
//             </div>
//           </div>

//           <h1 className="text-2xl font-bold text-center mb-2">
//             Create Account
//           </h1>

//           <p className="text-center text-gray-500 mb-6">
//             Join the sustainable student community
//           </p>

//           {/* FORM (UNCHANGED) */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 name="firstName"
//                 onChange={handleChange}
//                 placeholder="First Name"
//                 required
//                 className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//               <input
//                 name="lastName"
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 required
//                 className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             <input
//               name="email"
//               type="email"
//               onChange={handleChange}
//               placeholder="Email Address"
//               required
//               className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//                 className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50"
//             >
//               {loading ? "Creating account..." : "Sign Up"}
//             </button>
//           </form>

//           <p className="text-center mt-6 text-gray-600">
//             Already have an account?{" "}
//             <Link href="/login" className="text-green-600 font-semibold hover:underline">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </motion.div>

//       <div className="mt-6 max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-center">
//   <p className="text-white text-lg font-semibold leading-relaxed">
//     🔐 Sign up to access all features and start exploring PortalPlus.
//   </p>
// </div>

//     </div>
//   </div>
// );
// }
"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      alert("Account created successfully! Please login.");
      window.location.href = "/login";
    } else {
      alert(data.error || "Something went wrong");
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

            <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">Create Account</h1>
            <p className="text-center text-slate-500 mb-8">Join the sustainable student community</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
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
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center mt-6 text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* BOTTOM BANNER */}
        <div className="mt-6 max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-center">
          <p className="text-white text-base font-semibold leading-relaxed">
            🔐 Sign up to access all features and start exploring PortalPlus.
          </p>
        </div>

      </div>
    </div>
  );
}