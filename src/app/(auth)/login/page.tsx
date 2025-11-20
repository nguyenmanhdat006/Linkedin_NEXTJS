"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthFooter from "@/components/auth/AuthFooter";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex flex-col font-sans">
      {/* Header: Logo nằm chính giữa */}
      <header className="w-full py-8 flex justify-center">
        <Link href="/home" className="flex items-center">
          <span className="text-[#0a66c2] text-3xl font-bold tracking-tight">Linked</span>
          <div className="bg-[#0a66c2] rounded-sm ml-0.5 w-7 h-7 flex items-center justify-center">
            <span className="text-white font-bold text-xl pb-1">in</span>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start pt-4 px-4">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-8">

            <h1 className="text-3xl font-semibold text-black mb-2">Sign in</h1>
            <p className="text-base text-gray-600 mb-6">
              Stay updated on your professional world
            </p>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Email or phone number"
                className="w-full h-12 px-3 rounded-md border border-gray-300 text-base
                         focus:border-black focus:outline-none focus:ring-1 focus:ring-black 
                         transition placeholder-gray-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-12 px-3 rounded-md border border-gray-300 text-base
                           focus:border-black focus:outline-none focus:ring-1 focus:ring-black 
                           transition placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a66c2] font-semibold text-sm hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <Link href="#" className="block text-[#0a66c2] font-semibold text-sm hover:underline">
                Forgot password?
              </Link>

              <button className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-3.5 rounded-full transition-colors text-base">
                Sign in
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-600 font-medium">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-400 rounded-full py-3 px-6
                       text-gray-700 font-medium text-base
                       hover:border-gray-800 hover:shadow-sm 
                       transition-all duration-200 bg-white"
            >
              <FcGoogle size={22} />
              <span>Sign in with Google</span>
            </button>
          </div>

          {/* Join now */}
          <div className="text-center text-base">
            <span className="text-gray-700">New to LinkedIn? </span>
            <Link href="/register" className="text-[#0a66c2] font-semibold hover:underline">
              Join now
            </Link>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}