"use client";

import { useState } from "react";
import Image from "next/image";

// Sample catalog items
const MOCK_ITEMS = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: i % 2 === 0 ? "Top" : "Bottom",
}));

const MOCK_HISTORY = ["Hoodie", "Sneakers", "Jeans", "Jacket", "Hat"];

export default function Page() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(new Set());

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredItems = MOCK_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBE7CA] to-[#F2BECB] flex flex-col">

      {/* TOP NAV BAR */}
      <header className="h-20 bg-gradient-to-r from-[#fcd0ae] to-[#f7b58b] flex items-center px-10 shadow-md">
  <div className="flex items-center gap-3">
  <Image
    src="/W logo.svg"    // 👈 your exported logo
    alt="wearHouse logo"
    width={40}
    height={40}
  />

  <span className="text-2xl font-semibold text-[#D45129]">
    wear<span className="text-[#E2764A]">House</span>
  </span>
</div>

  {/* Middle spacer */}
  <div className="flex-1"></div>

  {/* Navigation Links */}
  <nav className="flex items-center gap-10 text-[#a4432f] text-sm font-medium">
    <a href="/catalog" className="hover:text-[#e05f3f] transition">Shop</a>
    <a href="/closet" className="hover:text-[#e05f3f] transition">Closet</a>
  </nav>

  {/* User button on the right */}
  <button className="ml-8 px-6 py-2 bg-[#d94f6a] text-white rounded-full hover:bg-[#c13f5a] transition text-sm font-medium">
    User
  </button>
</header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center py-10">
        <div className="w-full max-w-6xl bg-white border border-gray-200 shadow-lg">

          {/* SEARCH BAR */}
          <div className="px-8 pt-6">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* SEARCH HISTORY + FILTER */}
          <div className="flex justify-between items-center px-8 py-4 border-b border-gray-300">
            <SearchHistory history={MOCK_HISTORY} setQuery={setQuery} />

            {/* Filter Button */}
            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 border border-gray-300 hover:bg-gray-200">
              <svg
                className="h-4 w-4 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 5h16l-6 7v5l-4 2v-7L4 5z" />
              </svg>
            </button>
          </div>

          {/* 2-COLUMN LAYOUT */}
          <div className="grid grid-cols-[260px_1fr] gap-6 px-8 py-6">

            {/* Left — Preview Area */}
            <div className="flex flex-col items-center">
  <h2 className="text-3xl font-bold text-[#F06728] mb-4">Today’s Outfit</h2>

  <div className="w-72 h-[500px] bg-[#F4C6D8] border-4 border-[#C43757] rounded-none shadow-sm"></div>

  <button className="mt-4 w-48 py-2 rounded-md bg-[#D94F6A] text-white text-sm font-medium hover:bg-[#C13F5A] transition">
    Generate Outfit
  </button>

  <p className="text-xs text-[#C13F5A] mt-1">
    Not loading correctly? <span className="underline cursor-pointer">Redraw</span>
  </p>
</div>

            {/* Right — Grid */}
            <ItemGrid
              items={filteredItems}
              selected={selected}
              toggleSelect={toggleSelect}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SearchBar({ query, setQuery }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative flex w-full max-w-3xl">
        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Closet..."
          className="w-full py-3.5 pl-5 pr-12 rounded-full border-2 border-[#F8741F] text-[#F8741F] placeholder-[#F8741F]/50 bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F8741F]/40 transition"
        />

        {/* Search Icon */}
        <button
          className="
            absolute 
            right-3 
            top-1/2 
            -translate-y-1/2
            text-[#F8741F]
            hover:text-[#d45f15]
            transition
          "
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16" y1="16" x2="21" y2="21" />
          </svg>
        </button>
      </div>
    </div>
  );
}


function SearchHistory({ history, setQuery }) {
  return (
    <div className="flex flex-wrap gap-2">
      {history.map((tag) => (
        <button
          key={tag}
          onClick={() => setQuery(tag)}
          className="px-3 py-1 bg-orange-100 border border-orange-300 text-orange-700 rounded text-xs"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

function ItemGrid({ items, selected, toggleSelect }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => {
        const isSelected = selected.has(item.id);
        return (
          <button
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`relative bg-orange-100 border border-orange-300 hover:shadow
              ${isSelected ? "ring-2 ring-blue-500" : ""}`}
          >
            <div className="aspect-[4/5] bg-orange-200" />
            <div className="px-2 py-1 text-left text-sm text-gray-700">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">{item.category}</div>
            </div>

            {isSelected && (
              <div className="absolute top-1 right-1 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
