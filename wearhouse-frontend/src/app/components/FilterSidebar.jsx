"use client";

import { useState } from "react";

export default function FilterSidebar({ compact = false }) {
  const [state, setState] = useState({});

  const toggle = (key) => {
    setState((s) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <aside className={`${compact ? "w-64 p-4" : "w-full p-6"} bg-[#F7DCE6] border border-[#E8A8B7] rounded-md shadow-md`}>
      <div className={`${compact ? "p-3" : "p-4"} bg-[#F3CFE0] rounded-md border border-[#E6A5B7]`}> 
        <h3 className="text-2xl font-bold text-[#D45129] mb-3">Colour</h3>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {['Pink','Green','Blue','Purple','Orange'].map((c) => (
            <label key={c} className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!state[c]} onChange={() => toggle(c)} className="w-4 h-4 accent-[#D45129]" />
              <span className="text-[#a4432f]">{c}</span>
            </label>
          ))}
        </div>

        <h4 className="text-lg font-semibold text-[#D45129] mb-2">Season</h4>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {['Fall','Spring','Summer','Winter'].map((s) => (
            <label key={s} className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!state[s]} onChange={() => toggle(s)} className="w-4 h-4 accent-[#D45129]" />
              <span className="text-[#a4432f]">{s}</span>
            </label>
          ))}
        </div>

        <h4 className="text-lg font-semibold text-[#D45129] mb-2">Style</h4>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {['Casual','Ethnic','Formal','Sports'].map((st) => (
            <label key={st} className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!state[st]} onChange={() => toggle(st)} className="w-4 h-4 accent-[#D45129]" />
              <span className="text-[#a4432f]">{st}</span>
            </label>
          ))}
        </div>

        <h4 className="text-lg font-semibold text-[#D45129] mb-2">Gender</h4>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {['Male','Female','Unisex'].map((g) => (
            <label key={g} className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!state[g]} onChange={() => toggle(g)} className="w-4 h-4 accent-[#D45129]" />
              <span className="text-[#a4432f]">{g}</span>
            </label>
          ))}
        </div>

        <button className="mt-4 w-full py-2 bg-[#D94F6A] text-white rounded-md hover:bg-[#C13F5A] transition">
          Filter
        </button>
      </div>
    </aside>
  );
}
