"use client";

import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import Navigation from "../../components/Navigation";
import { useAuth } from "@clerk/nextjs";
import ItemGrid from "@/app/components/ItemGrid";

const MOCK_HISTORY = ["Hoodie", "Sneakers", "Jeans", "Jacket", "Hat"];

export default function Page() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [closetItems, setClosetItems] = useState([]);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(new Set());

  // -------------------------------------------
  // Load closet items from backend
  // -------------------------------------------
  useEffect(() => {
    const fetchCloset = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        const token = await getToken();
        const res = await fetch("http://127.0.0.1:8080/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const userData = await res.json();
          setClosetItems(userData.closet || []);
        }
      } catch (error) {
        console.error("Failed to load closet:", error);
      }
    };

    fetchCloset();
  }, [isLoaded, isSignedIn, getToken]);

  // -------------------------------------------
  // Toggle item selection
  // -------------------------------------------
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredItems = closetItems.filter((item) =>
    item.productDisplayName?.toLowerCase().includes(query.toLowerCase())
  );

  // -------------------------------------------
  // GENERATE OUTFIT (calls Flask + Gemini)
  // -------------------------------------------
  const handleGenerateOutfit = async () => {
    try {
      setLoading(true);
      setGeneratedImage(null);

      const res = await fetch("http://127.0.0.1:8080/api/outfits/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: closetItems }),
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedImage(data.generated_image);
      } else {
        console.error("Generation error:", data.error);
      }
    } catch (err) {
      console.error("Error generating outfit:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBE7CA] to-[#F2BECB] flex flex-col">
      <Navigation />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center py-10">
        <div className="w-full max-w-6xl border border-gray-200 shadow-lg bg-white/50 backdrop-blur-md rounded-xl">

          {/* SEARCH BAR */}
          <div className="px-8 pt-6">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* SEARCH HISTORY */}
          <div className="flex justify-between items-center px-8 py-4 border-b border-gray-300">
            <SearchHistory history={MOCK_HISTORY} setQuery={setQuery} />

            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 border border-gray-300 hover:bg-gray-200">
              <svg className="h-4 w-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 5h16l-6 7v5l-4 2v-7L4 5z" />
              </svg>
            </button>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-[260px_1fr] gap-6 px-8 py-6">

            {/* LEFT — MANNEQUIN PREVIEW */}
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-[#F06728] mb-4">Today’s Outfit</h2>

              <div className="w-72 h-[500px] bg-[#F4C6D8] border-4 border-[#C43757] flex items-center justify-center overflow-hidden">
                {generatedImage ? (
                  <img
                    src={`data:image/png;base64,${generatedImage}`}
                    alt="Generated Outfit"
                    className="object-contain w-full h-full"
                  />
                ) : loading ? (
                  <span className="text-[#C43757] animate-pulse text-lg">Generating...</span>
                ) : (
                  <span className="text-[#C43757] opacity-70">No outfit yet</span>
                )}
              </div>

              <button
                onClick={handleGenerateOutfit}
                className="mt-4 w-48 py-2 rounded-md bg-[#D94F6A] text-white text-sm font-medium hover:bg-[#C13F5A] transition"
              >
                {loading ? "Generating..." : "Generate Outfit"}
              </button>

              <p className="text-xs text-[#C13F5A] mt-1">
                Not loading correctly? <span className="underline cursor-pointer">Redraw</span>
              </p>
            </div>

            {/* RIGHT — ITEM GRID */}
            <ItemGrid items={filteredItems} selected={selected} toggleSelect={toggleSelect} />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------ COMPONENTS ------------------------------ */

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
