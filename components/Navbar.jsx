"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, Home, Map, FileText, MessageCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PortalPlus Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-green-700">
            PortalPlus
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <NavItem icon={<Leaf size={18} />} label="Sustainability" link="/sustainability" />
          <NavItem icon={<Home size={18} />} label="Rental Hub" link="/rental" />
          <NavItem icon={<Map size={18} />} label="Campus Map" link="/campus-map" />
          <NavItem icon={<FileText size={18} />} label="Certificates" link="/certificates" />
        </div>

        {/* AI CHAT BUTTON */}
        <Link
          href="#"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          <MessageCircle size={18} />
          AI Assistant
        </Link>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, link }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 hover:text-green-600 transition"
    >
      {icon}
      {label}
    </Link>
  );
}
