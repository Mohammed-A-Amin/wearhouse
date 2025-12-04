"use client";

"use client";

import Navigation from "../components/Navigation";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleConfirm = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBE7CA] to-[#F2BECB] relative overflow-hidden">
      <Navigation />

      {/* decorative blobs (approximation of Figma art) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-48 -top-24 w-96 h-96 bg-[#f06b3f] rounded-full opacity-90 transform rotate-12"></div>
        <div className="absolute right-0 top-24 w-96 h-96 bg-[#ff7a00] rounded-full opacity-90"></div>
        <div className="absolute left-8 bottom-0 w-128 h-80 bg-gradient-to-br from-[#f7a78b] to-[#ffd6c6] rounded-tl-full rounded-tr-full opacity-100"></div>
      </div>

      <main className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-6">
        <div className="relative max-w-3xl w-full px-6">
          <div className="relative bg-gradient-to-b from-[#ffdcc7] to-[#ffd1df] rounded-xl shadow-2xl border-2 border-[#e97a55] p-8 pt-20">

            {/* platypus image overlapping modal */}
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
              <h1 className="text-5xl font-extrabold text-[#d94f6a] mb-4">Log Out?</h1>
              <p className="text-[#a4432f] mb-8 text-lg">Are you sure you want to sign out of your account?</p>

              <div className="flex items-center justify-center gap-6">
                <Link
                  href="/"
                  className="px-6 py-3 border-2 border-[#f0a07a] text-[#d86a3f] rounded-md font-semibold bg-white/80 hover:bg-white transition"
                >
                  Cancel
                </Link>

                <button
                  onClick={handleConfirm}
                  className="px-6 py-3 bg-[#d94f6a] text-white rounded-md font-semibold shadow-md hover:bg-[#c13f5a] transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
