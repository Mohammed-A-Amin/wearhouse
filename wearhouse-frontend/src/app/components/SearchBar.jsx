"use client";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="relative w-full max-w-3xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Closet..."
        className="w-full py-3.5 pl-5 pr-12 rounded-full border-2 border-[#F8741F] text-[#F8741F] placeholder-[#F8741F]/50 bg-white/70 backdrop-blur-sm shadow-sm"
      />

      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8741F]">
        <svg className="h-5 w-5" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" />
          <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
}
