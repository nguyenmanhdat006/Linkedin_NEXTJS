import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import AuthNavbar from "@/components/auth/AuthNavbar";
import AuthFooter from "@/components/auth/AuthFooter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3f2ef]">
      <AuthNavbar />

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="max-w-[1128px] w-full mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Content */}
          <div className="max-w-lg order-2 md:order-1 space-y-10">
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] font-light text-[#b24020] tracking-tight">
              Welcome to your<br className="hidden md:block" /> professional community
            </h1>

            <div className="space-y-4 max-w-sm">
              {/* Google Button - giống LinkedIn 100% */}
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-full py-3 px-6 text-gray-700 font-medium text-lg hover:border-gray-800 hover:shadow-sm transition-all duration-200">
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>

              <button className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-full text-lg hover:border-gray-800 hover:shadow-sm transition-all duration-200">
                Sign in with email
              </button>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              By clicking Continue to join or sign in, you agree to LinkedIn’s{" "}
              <Link href="#" className="text-[#0a66c2] hover:underline">
                User Agreement
              </Link>
              ,{" "}
              <Link href="#" className="text-[#0a66c2] hover:underline">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="#" className="text-[#0a66c2] hover:underline">
                Cookie Policy
              </Link>
              .
            </p>

            <div className="pt-6">
              <span className="text-lg text-gray-700 mr-3">New to LinkedIn?</span>
              <Link
                href="/register"
                className="text-[#0a66c2] text-lg font-semibold hover:underline"
              >
                Join now
              </Link>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-xl -mr-20 md:-mr-32">
              <Image
                src="/thumb.jpg" 
                alt="Welcome to LinkedIn"
                width={800}
                height={700}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <div className="bg-[#f3f2ef]">
        <AuthFooter />
      </div>
    </div>
  );
}