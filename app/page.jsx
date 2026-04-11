"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, Home, Map, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative px-4 sm:px-8 py-8 pb-20">

        {/* Hero Section */}
        <motion.section
          className="max-w-5xl mx-auto text-center space-y-6 pt-12 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo - Clickable to About */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative inline-block group cursor-pointer"
            onClick={() => window.location.href = "/about"}
          >
            <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500" />
            <Image
              src="/logo.png"
              width={170}
              height={150}
              alt="PortalPlus Logo"
              className="mx-auto relative group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Title with gradient */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900">
                Portal
              </span>
              <span className="text-emerald-600">Plus</span>
            </h1>
          </motion.div>

          {/* Tagline / Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Advancing sustainability awareness, learning, and success for IT students.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
              <span className="inline-flex items-center text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Eco-Friendly
              </span>
              <span className="inline-flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Student-Led
              </span>
              <span className="inline-flex items-center text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Earn Rewards
              </span>
            </div>
          </motion.div>
        </motion.section>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mt-6 mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <SearchBar />
        </motion.div>

        {/* Feature Cards Section */}
        <motion.section
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* EcoQuest Learning Module */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4 px-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                <Sparkles size={14} className="text-emerald-500" />
                Featured Learning Path
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent" />
            </div>

            <Link href="/learn">
              <div className="group relative bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50/40 border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:shadow-xl shadow-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen size={24} className="text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-xl font-bold text-gray-900">
                          EcoQuest
                        </h3>
                        <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
                          Start Here
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 max-w-md">
                        Master sustainability through interactive levels, quizzes, and real-world challenges.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>🎯 5 Levels</span>
                        <span>•</span>
                        <span>📚 50+ Lessons</span>
                        <span>•</span>
                        <span>⭐ Earn Eco Points</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowRight
                      className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-2 transition-all duration-300"
                      size={24}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <EnhancedCard
              href="/rental-hub"
              Icon={Home}
              title="Rental Hub"
              description="Borrow and share textbooks, calculators, and study materials with fellow students. Save money and reduce waste."
              badge="Share & Save"
            />
            <EnhancedCard
              href="/campus-map"
              Icon={Map}
              title="Campus Map"
              description="Navigate UDST with ease. Find classrooms, labs, libraries, and eco-friendly spots around campus."
              badge="Interactive"
            />
            <EnhancedCard
              href="/certificates"
              Icon={FileText}
              title="Certificates"
              description="Track your achievements and earn official certificates for completing sustainability programs."
              badge="Verified"
            />
          </div>

          {/* Motivational Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 pt-8 border-t border-gray-200 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <Leaf size={32} className="text-emerald-500 mx-auto mb-4 opacity-50" />
              <p className="text-sm text-gray-500 italic">
                "Empowering IT students to build a sustainable future, one step at a time."
              </p>
              <p className="text-xs text-gray-400 mt-3">
                PortalPlus — Where sustainability meets technology
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}

// Enhanced Card Component
function EnhancedCard({ href, Icon, title, description, badge }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="group h-full bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:shadow-xl hover:border-gray-300"
      >
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
            <Icon size={22} className="text-gray-700" strokeWidth={1.8} />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {badge}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-end mt-4 pt-2 border-t border-gray-100">
          <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </motion.div>
    </Link>
  );
}