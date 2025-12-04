"use client";

import Navigation from "./components/Navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    if (!logged) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBE7CA] to-[#F2BECB]">
      <Navigation />

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-6xl font-bold text-[#D45129] mb-6">
            Welcome to <span className="text-[#E2764A]">wear</span>House
          </h1>
          <p className="text-xl text-[#a4432f] mb-8 leading-relaxed">
            Your personal wardrobe assistant. Organize your closet, discover new outfits,
            and never wonder what to wear again.
          </p>

          <div className="flex gap-6 justify-center">
            <Link
              href="/pages/clothing_selection"
              className="px-8 py-4 bg-[#d94f6a] text-white rounded-full hover:bg-[#c13f5a] transition text-lg font-medium shadow-lg"
            >
              Explore Your Closet
            </Link>
            <button className="px-8 py-4 bg-white/70 text-[#D45129] border-2 border-[#D45129] rounded-full hover:bg-white transition text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-[#F06728] rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white text-2xl">👔</span>
            </div>
            <h3 className="text-xl font-semibold text-[#D45129] mb-3 text-center">Organize</h3>
            <p className="text-[#a4432f] text-center">
              Keep track of all your clothing items in one digital closet
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-[#E2764A] rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-[#D45129] mb-3 text-center">Discover</h3>
            <p className="text-[#a4432f] text-center">
              Get AI-powered outfit suggestions based on your wardrobe
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
            <div className="w-16 h-16 bg-[#d94f6a] rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-[#D45129] mb-3 text-center">Plan</h3>
            <p className="text-[#a4432f] text-center">
              Plan your outfits in advance and never be caught unprepared
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
