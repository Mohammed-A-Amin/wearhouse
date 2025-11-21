"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <header className="h-20 bg-gradient-to-r from-[#fcd0ae] to-[#f7b58b] flex items-center px-10 shadow-md">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#D45129] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">W</span>
        </div>
        <span className="text-2xl font-semibold text-[#D45129]">
          wear<span className="text-[#E2764A]">House</span>
        </span>
      </Link>

      <div className="flex-1"></div>

      <nav className="flex items-center gap-10 text-[#a4432f] text-sm font-medium">
        <Link href="/pages/clothing_selection" className="hover:text-[#e05f3f] transition">
          Shop
        </Link>
        <a href="/closet" className="hover:text-[#e05f3f] transition">
          Closet
        </a>
      </nav>

      <button className="ml-8 px-6 py-2 bg-[#d94f6a] text-white rounded-full hover:bg-[#c13f5a] transition text-sm font-medium">
        User
      </button>
    </header>
  );
}