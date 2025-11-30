"use client";

import { useEffect, useRef, useState } from "react";

export default function Dropdown({ label, children, className = "", panelClass = "w-64" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 border border-[#f0a07a] text-[#d86a3f] rounded-full shadow-sm hover:bg-white transition"
        aria-expanded={open}
      >
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div className={`absolute right-0 mt-2 z-50 ${panelClass} bg-white text-[#5a2a1f] rounded-md shadow-lg border border-gray-200 p-3`}> 
          {children}
        </div>
      )}
    </div>
  );
}
