"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="h-20 bg-gradient-to-b from-[#FBE7CA] to-[#F2BEC8] flex items-center px-10 shadow-md">
      <div className="flex items-center gap-3">
        <Image src="/W logo.svg" alt="wearHouse logo" width={40} height={40} />
        <span className="text-2xl font-semibold text-[#D45129]">
          wear<span className="text-[#E2764A]">House</span>
        </span>
      </div>

      <div className="flex-1"></div>

      <nav className="flex items-center gap-10 text-[#a4432f] text-sm font-medium">
        <a href="/catalog">Shop</a>
        <a href="/closet">Closet</a>
      </nav>

      <button className="ml-8 px-6 py-2 bg-[#d94f6a] text-white rounded-full">
        User
      </button>
    </header>
  );
}