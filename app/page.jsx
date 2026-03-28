"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Home, Map, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../components/SearchBar"; 

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative px-2 sm:px-8 py-4 pb-26">
        {/* Hero Section */}
        <motion.section
          className="max-w-5xl mx-auto text-center space-y-8 pt-12 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full scale-150" />
            <Image
              src="/logo.png"
              width={170}
              height={150}
              alt="PortalPlus Logo"
              className="mx-auto relative"
            />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-emerald-900 to-gray-900">
                Portal
              </span>
              <span className="text-emerald-600">Plus</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-2 pt-4">
                Learn and grow your sustainability awareness
              </h2>
              <p className="text-sm text-gray-500 max-w-xl mx-auto">
                Test your knowledge through interactive quizzes
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Search Bar - NOW WITH SEARCHBAR COMPONENT */}
        <motion.div
          className="max-w-2xl mx-auto mt-4 mb-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SearchBar />  {/* ← REPLACE with this */}
        </motion.div>

        {/* Rest of your content remains the same */}
        <motion.section
          className="max-w-6xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Sustainability Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link href="/sustainability">
              <div className="group relative bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border border-emerald-200/60 hover:border-emerald-300 rounded-2xl p-8 lg:p-10 transition-all duration-300 cursor-pointer hover:shadow-xl shadow-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 to-teal-500 rounded-l-2xl" />
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all">
                        <TrendingUp size={26} className="text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-2xl font-semibold text-gray-900">Sustainability</h2>
                          <span className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full">Featured</span>
                        </div>
                        <p className="text-gray-700">Track your eco-impact and earn rewards for sustainable choices</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 lg:gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-teal-600">15K+</div>
                      <div className="text-xs text-gray-600 font-medium">CO₂ Saved</div>
                    </div>
                    <div className="w-px bg-gray-300" />
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-teal-600">1.2K+</div>
                      <div className="text-xs text-gray-600 font-medium">Users</div>
                    </div>
                    <div className="w-px bg-gray-300" />
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-teal-600">850+</div>
                      <div className="text-xs text-gray-600 font-medium">Actions</div>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0" size={24} />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <CleanCard href="/rental-hub" Icon={Home} title="Rental Hub" description="Share and borrow campus resources" />
            <CleanCard href="/campus-map" Icon={Map} title="Campus Map" description="Navigate with interactive maps" />
            <CleanCard href="/certificates" Icon={FileText} title="Certificates" description="Manage your achievements" />
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.div
          className="max-w-6xl mx-auto mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent h-px" />
            <div className="grid grid-cols-3 gap-16 pt-16">
              <StatItem number="2,400+" label="Active Students" />
              <StatItem number="850+" label="Resources Shared" />
              <StatItem number="15K+" label="CO₂ Saved (kg)" />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function CleanCard({ href, Icon, title, description }) {
  return (
    <Link href={href}>
      <div className="group h-full bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-7 transition-all duration-300 cursor-pointer hover:shadow-lg shadow-sm">
        <div className="mb-5">
          <Icon size={24} className="text-gray-700 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
          <ArrowRight size={16} strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="text-center group cursor-default">
      <div className="text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600 mb-2 tracking-tight group-hover:scale-105 transition-transform">
        {number}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}