"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Leaf, 
  Home, 
  Map, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Info,
  Settings,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Demo user (replace with actual user data from Firebase)
  const user = {
    name: "Rabiya Ishaq",
    initials: "RI",
    email: "rabiya@udst.edu.qa"
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <Image
              src="/logo.png"
              alt="PortalPlus Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            Portal<span className="text-emerald-600">Plus</span>
          </span>
        </Link>

        {/* NAV LINKS - Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-600">
          <NavItem icon={<Leaf size={18} />} label="Sustainability" link="/sustainability" />
          <NavItem icon={<Home size={18} />} label="Rental Hub" link="/rental-hub" />
          <NavItem icon={<Map size={18} />} label="Campus Map" link="/campus-map" />
          <NavItem icon={<FileText size={18} />} label="Certificates" link="/certificates" />
          <NavItem icon={<Info size={18} />} label="About" link="/about" />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI CHAT BUTTON - Desktop */}
          <Link
            href="#"  // Keep as # for now, will be replaced with actual AI chat link
            className="hidden md:flex items-center gap-2 bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-full hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
          >
            <MessageCircle size={18} />
            <span className="font-medium text-sm lg:text-base">AI Assistant</span>
          </Link>

          {/* AUTH SECTION */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1 sm:gap-2">
              {/* User Menu - Desktop */}
              <Link
                href="/profile"
                className="hidden md:flex items-center gap-2 sm:gap-3 bg-emerald-50 pl-2 sm:pl-3 pr-1 py-1 rounded-full hover:bg-emerald-100 transition cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-medium text-emerald-700 max-w-[100px] truncate">
                  {user.name}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-sm">
                  {user.initials}
                </div>
              </Link>
              <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
                <LogOut size={18} className="text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Login/Signup - Desktop */}
              <Link
                href="/login"
                className="hidden md:flex items-center gap-1 sm:gap-2 bg-white text-emerald-600 border border-emerald-600 px-3 lg:px-4 py-1.5 sm:py-2 rounded-full hover:bg-emerald-50 transition-all font-medium text-xs lg:text-sm"
              >
                <User size={16} />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="hidden md:flex items-center gap-1 sm:gap-2 bg-emerald-600 text-white px-3 lg:px-4 py-1.5 sm:py-2 rounded-full hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md font-medium text-xs lg:text-sm"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {/* Mobile Nav Links */}
            <MobileNavItem icon={<Leaf size={18} />} label="Sustainability" link="/sustainability" />
            <MobileNavItem icon={<Home size={18} />} label="Rental Hub" link="/rental-hub" />
            <MobileNavItem icon={<Map size={18} />} label="Campus Map" link="/campus-map" />
            <MobileNavItem icon={<FileText size={18} />} label="Certificates" link="/certificates" />
            <MobileNavItem icon={<Info size={18} />} label="About" link="/about" />
            
            {/* Mobile AI Assistant */}
            <Link
              href="#"  // Keep as # for now, will be replaced with actual AI chat link
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <MessageCircle size={18} className="text-emerald-600" />
              <span className="font-medium">AI Assistant</span>
            </Link>

            {/* Mobile Auth Section */}
            {isLoggedIn ? (
              <div className="border-t border-gray-100 mt-3 pt-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.initials}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </Link>
                <Link
                  href="/profile/settings"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Settings size={18} className="text-gray-500" />
                  <span className="font-medium">Settings</span>
                </Link>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <LogOut size={18} className="text-gray-500" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-100 mt-3 pt-3 space-y-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full bg-white text-emerald-600 border border-emerald-600 px-4 py-3 rounded-xl hover:bg-emerald-50 transition-all font-medium"
                >
                  <User size={16} />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 transition-all font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Nav Item
function NavItem({ icon, label, link }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 hover:text-emerald-600 transition-colors font-medium text-sm whitespace-nowrap"
    >
      {icon}
      {label}
    </Link>
  );
}

// Mobile Nav Item
function MobileNavItem({ icon, label, link }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-xl transition-colors"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}