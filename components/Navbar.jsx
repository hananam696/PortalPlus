"use client";

import { FileText, Home, Leaf, Map, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PortalPlus Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-gray-900">
            Portal<span className="text-emerald-600">Plus</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <NavItem icon={<Home size={18} />} label="Home" link="/" />
          <NavItem icon={<Leaf size={18} />} label="Sustainability" link="/sustainability" />
          <NavItem icon={<Home size={18} />} label="Rental Hub" link="/rental-hub" />
          <NavItem icon={<Map size={18} />} label="Campus Map" link="/campus-map" />
          <NavItem icon={<FileText size={18} />} label="Certificates" link="/certificates" />
        </div>

        {/* AI CHAT BUTTON */}
        <Link
          href="#"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-full hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
        >
          <MessageCircle size={18} />
          <span className="font-medium">AI Assistant</span>
        </Link>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, link }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 hover:text-emerald-600 transition-colors font-medium text-sm"
    >
      {icon}
      {label}
    </Link>
  );
}