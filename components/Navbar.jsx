"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
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
  MessageCircle,
  BookOpen,
  Calendar,
  Inbox,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ onOpenChat }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setIsLoggedIn(true);
          setUser(userData);
          checkPendingRequests(userData);
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setPendingRequestsCount(0);
      }
    };

    const checkPendingRequests = (userData) => {
      if (userData?.email) {
        const allRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
        const pending = allRequests.filter(
          req => req.ownerEmail === userData.email && req.status === "pending"
        ).length;
        setPendingRequestsCount(pending);
      }
    };

    checkAuth();
    
    // Check for new requests every 5 seconds
    const interval = setInterval(() => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          checkPendingRequests(userData);
        } catch (e) {
          console.error("Error checking requests:", e);
        }
      }
    }, 5000);
    
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setPendingRequestsCount(0);
    window.location.href = "/";
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.firstName || user.name?.split(" ")[0] || "";
    const lastName = user.lastName || user.name?.split(" ")[1] || "";
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  };

  const getDisplayName = () => {
    if (!user) return "User";
    return user.firstName ? `${user.firstName} ${user.lastName || ""}` : user.name || "User";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

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
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-600 text-sm">
          <NavItem icon={<BookOpen size={18} />} label="EcoQuest" link="/learn" />
          <NavItem icon={<Home size={18} />} label="Rental Hub" link="/rental-hub" />
          <NavItem icon={<Map size={18} />} label="Campus Map" link="/campus-map" />
          <NavItem icon={<FileText size={18} />} label="Certificates" link="/certificates" />
          <NavItem icon={<Zap size={18} />} label="EcoClash" link="/eco-clash" />
          <NavItem icon={<Info size={18} />} label="About" link="/about" />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* AUTH SECTION */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-1 sm:gap-2">
              {/* User Menu - Desktop */}
              <div className="relative group">
                <button className="hidden md:flex items-center justify-center w-9 h-9 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full hover:opacity-90 transition cursor-pointer text-white font-semibold text-sm shadow-sm">
                  {getUserInitials()}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition">
                      <User size={16} />
                      <span className="text-sm">My Profile</span>
                    </Link>
                    <Link href="/sustainability" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition">
                      <Leaf size={16} />
                      <span className="text-sm">My Dashboard</span>
                    </Link>
                    <Link
                      href="/rental-hub/my-rentals"
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition"
                    >
                      <BookOpen size={16} />
                      <span className="text-sm">My Rentals</span>
                    </Link>
                    
                    {/* Incoming Requests with Notification Badge */}
                    <Link
                      href="/rental-hub/incoming-requests"
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition"
                    >
                      <Inbox size={16} />
                      <span className="text-sm">Incoming Requests</span>
                      {pendingRequestsCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                          {pendingRequestsCount}
                        </span>
                      )}
                    </Link>
                    
                    <div className="border-t my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
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
        <div className="md:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-70px)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <MobileNavItem icon={<BookOpen size={18} />} label="EcoQuest" link="/learn" />
            <MobileNavItem icon={<Home size={18} />} label="Rental Hub" link="/rental-hub" />
            <MobileNavItem icon={<Map size={18} />} label="Campus Map" link="/campus-map" />
            <MobileNavItem icon={<FileText size={18} />} label="Certificates" link="/certificates" />
            <MobileNavItem icon={<Zap size={18} />} label="EcoClash" link="/eco-clash" />
            <MobileNavItem icon={<Info size={18} />} label="About" link="/about" />

            <button
              onClick={() => { onOpenChat?.(); setIsMenuOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <MessageCircle size={18} className="text-emerald-600" />
              <span className="font-medium">AI Assistant</span>
            </button>

            {isLoggedIn && user ? (
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="px-4 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{getDisplayName()}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                <MobileNavItem icon={<User size={18} />} label="My Profile" link="/profile" />
                <MobileNavItem icon={<BookOpen size={18} />} label="My Rentals" link="/rental-hub/my-rentals" />
                
                {/* Incoming Requests with Notification Badge in Mobile */}
                <Link
                  href="/rental-hub/incoming-requests"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Inbox size={18} className="text-gray-500" />
                  <span className="font-medium">Incoming Requests</span>
                  {pendingRequestsCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                      {pendingRequestsCount}
                    </span>
                  )}
                </Link>
                
                <MobileNavItem icon={<Settings size={18} />} label="Settings" link="/profile/settings" />

                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-2"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-100 mt-3 pt-3 space-y-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full bg-white text-emerald-600 border border-emerald-600 px-4 py-3 rounded-xl hover:bg-emerald-50 transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
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

function NavItem({ icon, label, link }) {
  const pathname = usePathname();
  const isActive = pathname === link || pathname.startsWith(link + "/");

  return (
    <Link
      href={link}
      className={`flex items-center gap-2 font-medium text-sm whitespace-nowrap transition-colors ${isActive
        ? "bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full"
        : "text-gray-600 hover:text-emerald-600"
        }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavItem({ icon, label, link, onClick }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-xl transition-colors"
      onClick={() => {
        document.activeElement?.blur();
        if (onClick) onClick();
      }}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}