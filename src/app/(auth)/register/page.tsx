"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthFooter from "@/components/auth/AuthFooter";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f3f2ef]">
      {/* Header */}
      <header className="py-8 w-full flex flex-col items-center justify-center">
        <Link href="/home" className="flex items-center justify-center mb-6">
          <span className="text-[#0a66c2] text-3xl font-bold tracking-tight">Linked</span>
          <div className="bg-[#0a66c2] rounded-sm ml-0.5 w-7 h-7 flex items-center justify-center">
            <span className="text-white font-bold text-xl pb-1">in</span>
          </div>
        </Link>
        <h1 className="text-[32px] leading-[1.25] font-normal text-black text-center px-4 max-w-2xl">
          Make the most of your professional life
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center px-4 w-full">
        <div className="w-full max-w-[400px]">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <form className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password (6+ characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a66c2] font-semibold text-sm hover:underline"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Agreement text */}
              <p className="text-xs text-gray-600 leading-relaxed">
                By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
                <Link href="#" className="text-[#0a66c2] hover:underline font-medium">
                  User Agreement
                </Link>
                ,{" "}
                <Link href="#" className="text-[#0a66c2] hover:underline font-medium">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link href="#" className="text-[#0a66c2] hover:underline font-medium">
                  Cookie Policy
                </Link>
                .
              </p>

              {/* Agree & Join Button */}
              <button className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-3 rounded-full transition-colors">
                Agree & Join
              </button>

              {/* Divider "or" */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-600 font-medium">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Nút Continue with Google – chuẩn LinkedIn 2025, không có "Continue as Dat" */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-400 rounded-full py-3 px-6 
                         text-gray-700 font-medium text-base
                         hover:border-gray-800 hover:shadow-sm 
                         transition-all duration-200 bg-white"
              >
                <FcGoogle size={22} />
                <span>Continue with Google</span>
              </button>

              {/* Sign in link */}
              <div className="pt-6 text-center">
                Already on LinkedIn?{" "}
                <Link href="/login" className="text-[#0a66c2] font-semibold hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </div>

          {/* Footer help text */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Looking to create a page for a business?{" "}
            <Link href="#" className="text-[#0a66c2] font-semibold hover:underline">
              Get help
            </Link>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}