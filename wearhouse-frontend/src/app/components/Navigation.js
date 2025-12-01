"use client";

import Image from "next/image";
import Link from "next/link";
import Dropdown from "./Dropdown";

export default function Navigation() {
  return (
    <header className="h-20 bg-gradient-to-r from-[#fcd0ae] to-[#f7b58b] flex items-center px-10 shadow-md">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/W logo.svg" alt="wearHouse logo" width={40} height={40} />
        <span className="text-2xl font-semibold text-[#D45129]">
          wear<span className="text-[#E2764A]">House</span>
        </span>
      </Link>

      <div className="flex-1"></div>

      <nav className="flex items-center gap-10 text-[#a4432f] text-sm font-medium">
        <Link href="/pages/clothing_selection" className="hover:text-[#e05f3f] transition">
          Shop
        </Link>
        <Link href="/pages/closet" className="hover:text-[#e05f3f] transition">
          Closet
        </Link>
      </nav>

      <div className="ml-8">
        <Dropdown
          label={
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#D45129] rounded-full flex items-center justify-center text-white font-semibold">E</div>
              <span className="text-sm font-medium text-[#7a270f]">User</span>
            </span>
          }
          panelClass="w-40"
        >
          <div className="flex flex-col gap-2">
            <Link
              href="/logout"
              className="px-3 py-2 rounded-md text-sm text-[#d86a3f] hover:bg-[#fff2ea] transition"
            >
              Log Out
            </Link>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}