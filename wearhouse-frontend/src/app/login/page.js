"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/Navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, accept any credentials and mark user as logged in.
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBE7CA] to-[#F2BECB] relative overflow-hidden">
      <Navigation />

      <main className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-6">
        <div className="relative max-w-3xl w-full px-6">
          <div className="relative bg-gradient-to-b from-[#ffdcc7] to-[#ffd1df] rounded-xl shadow-2xl border-2 border-[#e97a55] p-8 pt-20">

            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 pointer-events-none">
              <div className="w-56 h-36 relative">
                <Image
                  src="/platy.svg"
                  alt="platypus"
                  fill={false}
                  width={220}
                  height={140}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <h1 className="text-5xl font-extrabold text-[#d94f6a] mb-4">What to Wear?</h1>
              <p className="text-[#a4432f] mb-8 text-lg">Sign in to access your personalized closet</p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email/Username"
                  className="w-full px-4 py-3 rounded-md border-2 border-[#f1a57f] bg-white/90"
                />

                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md border-2 border-[#f1a57f] bg-white/90"
                />

                <button type="submit" className="w-full bg-[#d94f6a] text-white py-3 rounded-md font-semibold">SIGN IN</button>
              </form>

              <p className="text-sm text-[#a4432f] mt-4">Don't have an account? <Link href="#" className="underline">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
