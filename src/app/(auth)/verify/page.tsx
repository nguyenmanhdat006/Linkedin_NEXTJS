"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import AuthFooter from "@/components/auth/AuthFooter";
import { toast } from "react-toastify";
import axios from "axios";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromQuery = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromQuery);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosClient.post("/auth/verify", { email, code });

      if (res.data.includes("thành công")) {
        toast.success(res.data);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.data);
      }
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
        <h1 className="text-[32px] leading-[1.25] font-normal text-black text-center px-4 max-w-2xl">
          Xác nhận email
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center px-4 w-full">
        <div className="w-full max-w-[400px]">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <form className="space-y-6" onSubmit={handleVerify}>
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

              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Verify"}
              </button>
            </form>
          </div>

          {/* Footer help text */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Having trouble?{" "}
            <a href="#" className="text-[#0a66c2] font-semibold hover:underline">
              Get help
            </a>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
