"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import AuthFooter from "@/components/auth/AuthFooter";
import axiosClient from "@/lib/axiosClient";
import { toast } from "react-toastify";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosClient.post("/auth/register", {
        email,
        password,
        firstname,
        lastname,
      });

      toast.success(
        "Mã xác nhận đã được gửi tới email của bạn, vui lòng xác nhận"
      );

      // redirect sang verify với email
      setTimeout(() => {
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data || "Lỗi kết nối server");
      } else {
        toast.error("Lỗi không xác định");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f3f2ef]">
      {/* Header */}
      <header className="py-8 w-full flex flex-col items-center justify-center">
        <Link href="/home" className="flex items-center justify-center mb-6">
          <span className="text-[#0a66c2] text-3xl font-bold tracking-tight">
            Linked
          </span>
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
            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Firstname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition"
                  required
                />
              </div>

              {/* Lastname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Agree & Join Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Agree & Join"}
              </button>
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
