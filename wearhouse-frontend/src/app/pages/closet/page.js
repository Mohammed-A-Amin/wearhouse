"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "../../components/Dropdown";

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
          <Image src="/W logo.svg" alt="wearHouse logo" width={40} height={40} />
          <span className="text-2xl font-semibold text-[#D45129]">
            wear<span className="text-[#E2764A]">House</span>
          </span>
        </div>

        <div className="flex-1"></div>

        <nav className="flex items-center gap-10 text-[#a4432f] text-sm font-medium">
          <Link href="/pages/clothing_selection" className="hover:text-[#e05f3f] transition">
            Shop
          </Link>
          <Link href="/pages/closet" className="hover:text-[#e05f3f] transition">
            Closet
          </Link>
        </nav>

        <button className="ml-8 px-6 py-2 bg-[#d94f6a] text-white rounded-full hover:bg-[#c13f5a] transition text-sm font-medium">
          User
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center py-10">
        <div className="w-full max-w-6xl border border-gray-200 shadow-lg bg-white/50 backdrop-blur-md rounded-xl">

          <div className="px-8 pt-6">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          <div className="flex justify-between items-center px-8 py-4 border-b border-gray-300">
            <SearchHistory history={MOCK_HISTORY} setQuery={setQuery} />

            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 border border-gray-300 hover:bg-gray-200">
              <svg className="h-4 w-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 5h16l-6 7v5l-4 2v-7L4 5z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-[260px_1fr] gap-6 px-8 py-6">
            {/* LEFT PREVIEW PANEL */}
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-[#F06728] mb-4">Today’s Outfit</h2>

              <div className="w-72 h-[500px] bg-[#F4C6D8] border-4 border-[#C43757]"></div>

              <button className="mt-4 w-48 py-2 rounded-md bg-[#D94F6A] text-white text-sm font-medium hover:bg-[#C13F5A] transition">
                Generate Outfit
              </button>

              <p className="text-xs text-[#C13F5A] mt-1">
                Not loading correctly? <span className="underline cursor-pointer">Redraw</span>
              </p>
            </div>

            {/* GRID */}
            <ItemGrid items={filteredItems} selected={selected} toggleSelect={toggleSelect} />
          </div>

        </div>
      </main>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative flex w-full max-w-4xl items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Closet..."
            className="w-full py-3.5 pl-5 pr-12 rounded-full border-2 border-[#F8741F] text-[#F8741F] placeholder-[#F8741F]/50 bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F8741F]/40 transition"
          />

          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8741F] hover:text-[#d45f15] transition">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Dropdown label="CATEGORY" panelClass="w-48">
            <ul className="text-sm text-[#5a2a1f]">
              <li className="py-1 px-2 hover:bg-gray-50 rounded">All</li>
              <li className="py-1 px-2 hover:bg-gray-50 rounded">Top</li>
              <li className="py-1 px-2 hover:bg-gray-50 rounded">Bottom</li>
              <li className="py-1 px-2 hover:bg-gray-50 rounded">Outerwear</li>
              <li className="py-1 px-2 hover:bg-gray-50 rounded">Footwear</li>
            </ul>
          </Dropdown>

          <Dropdown label="FILTER" panelClass="w-64">
            <div className="space-y-3 text-[#5a2a1f]">
              <h4 className="text-sm font-semibold text-[#D45129]">Colour</h4>
              <div className="flex flex-wrap gap-2">
                {['Pink','Green','Blue','Purple','Orange'].map((c) => (
                  <button key={c} className="px-3 py-1 text-xs bg-[#fff6f0] border border-[#f6cdb8] rounded text-[#a4432f] hover:bg-[#fff0e6]">{c}</button>
                ))}
              </div>

              <h4 className="text-sm font-semibold text-[#D45129]">Season</h4>
              <div className="flex flex-wrap gap-2">
                {['Fall','Spring','Summer','Winter'].map((s) => (
                  <button key={s} className="px-3 py-1 text-xs bg-[#fff6f0] border border-[#f6cdb8] rounded text-[#a4432f] hover:bg-[#fff0e6]">{s}</button>
                ))}
              </div>

              <h4 className="text-sm font-semibold text-[#D45129]">Style</h4>
              <div className="flex flex-wrap gap-2">
                {['Casual','Ethnic','Formal','Sports'].map((st) => (
                  <button key={st} className="px-3 py-1 text-xs bg-[#fff6f0] border border-[#f6cdb8] rounded text-[#a4432f] hover:bg-[#fff0e6]">{st}</button>
                ))}
              </div>

              <h4 className="text-sm font-semibold text-[#D45129]">Gender</h4>
              <div className="flex flex-wrap gap-2">
                {['Male','Female','Unisex'].map((g) => (
                  <button key={g} className="px-3 py-1 text-xs bg-[#fff6f0] border border-[#f6cdb8] rounded text-[#a4432f] hover:bg-[#fff0e6]">{g}</button>
                ))}
              </div>
            </div>
          </Dropdown>
        </div>
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
