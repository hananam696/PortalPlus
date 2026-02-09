"use client";

import { Leaf, Map, Home, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.main
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Leaf className="text-green-600" size={40} />
        <h1 className="text-5xl font-bold text-gray-800">
          Portal<span className="text-green-600">Plus</span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <p className="text-gray-600 text-lg mb-10 text-center max-w-xl">
        A smart eco-aesthetic hub for UDST students — sustainability, rentals,
        campus navigation, and certificates in one place.
      </p>

      {/* Search */}
      <motion.div
        className="w-full max-w-xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search features, locations, or services…"
          className="w-full p-4 rounded-full shadow border focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        <AnimatedCard
          href="/sustainability"
          icon={<Leaf size={28} />}
          title="Sustainability"
          description="Earn eco points & badges"
        />
        <AnimatedCard
          href="/rental-hub"
          icon={<Home size={28} />}
          title="Rental Hub"
          description="Borrow & share resources"
        />
        <AnimatedCard
          href="/campus-map"
          icon={<Map size={28} />}
          title="Campus Map"
          description="Navigate UDST easily"
        />
        <AnimatedCard
          href="/certificates"
          icon={<FileText size={28} />}
          title="Certificates"
          description="Manage your achievements"
        />
      </div>
    </motion.main>
  );
}

function AnimatedCard({ href, icon, title, description }) {
  return (
    <Link href={href}>
      <motion.div
        className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flex justify-center mb-3 text-green-600">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </motion.div>
    </Link>
  );
}
