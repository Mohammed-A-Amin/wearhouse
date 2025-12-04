"use client";

import { useState, useEffect } from "react";
import FilterSidebar from "../../components/FilterSidebar";
import Dropdown from "../../components/Dropdown";
import Navigation from "../../components/Navigation";
import Image from "next/image";

const MOCK_HISTORY = ["Hoodie", "Sneakers", "Jeans", "Jacket", "Hat"];

export default function Page() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [filters, setFilters] = useState({ category: "", gender: "" });
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/localization.json")
      .then(res => res.json())
      .then(data => setItems(data.Sheet1))
      .catch(console.error);
  }, []);

  const toggleSelect = (id) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const filteredItems = items.filter(item =>
    (filters.category === "" || item.masterCategory === filters.category) &&
    (filters.gender === "" || item.gender === filters.gender) &&
    (!query || item.productDisplayName.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBE7CA] to-[#F2BECB] flex flex-col">

      <Navigation></Navigation>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center py-10">
        <div className="w-full max-w-6xl border border-gray-200 shadow-lg bg-white/50 backdrop-blur-md rounded-xl">

          {/* Search Bar */}
          <div className="px-8 pt-6">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* Search History & Filters */}
          <div className="flex justify-between items-center px-8 py-4 border-b border-gray-300">
            <SearchHistory history={MOCK_HISTORY} setQuery={setQuery} />
          </div>

          <div className="flex gap-2 px-8 py-4 border-b border-gray-300">
            <button 
              onClick={()=> setFilters(prev=> ({...prev, category: "", gender: ""}))}
              className = {`px-3 py-1 rounded ${filters.category === "" ? "bg-[#F8741F] text-white" : "bg-orange-100 text-orange-700"}`}
            >
              All
            </button>
            {["Apparel", "Accessories", "Footwear"].map(cat => (
              <button
                key={cat}
                onClick={() => setFilters(prev => ({ ...prev, category: prev.category === cat ? "" : cat }))}
                className={`px-3 py-1 rounded ${filters.category === cat ? "bg-[#F8741F] text-white" : "bg-orange-100 text-orange-700"}`}
              >
                {cat}
              </button>
            ))}
            {["Men", "Women", "Unisex"].map(g => (
              <button
                key={g}
                onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === g ? "" : g }))}
                className={`px-3 py-1 rounded ${filters.gender === g ? "bg-[#F8741F] text-white" : "bg-orange-100 text-orange-700"}`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-[260px_1fr] gap-6 px-8 py-6">
            {/* Left: Filter Sidebar */}
            <div>
              <FilterSidebar />
            </div>

            {/* Item Grid */}
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
      <div className="relative flex w-full max-w-3xl">
        <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search..."
  className="w-full py-3.5 pl-5 pr-12 rounded-full border-2 border-[#F8741F] text-[#F8741F] placeholder-[#F8741F]/50 bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F8741F]/40 transition"
/>

        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8741F] hover:text-[#d45f15] transition">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
  const baseUrl = "http://assets.myntassets.com/v1/images/style/properties/"
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => {
        const isSelected = selected.has(item.id);
        return (
          <button
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`relative bg-orange-100 border border-orange-300 hover:shadow flex flex-col justify-between h-[320px]`}
          >
            <img 
            src={item.imageLink}
            alt={item.productDisplayName}
            className="object-cover w-full h-64"
            />
            <div className="px-2 py-1 text-left text-sm text-gray-700">
              <div className="font-medium">{item.productDisplayName}</div>
              <div className="text-xs text-gray-500">{item.masterCategory}</div>
              <div className="text-xs text-gray-500">{item.gender}</div>
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