import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   appDir: true, // nếu dùng App Router
  // },
  images: {
    domains: ["images.unsplash.com", "randomuser.me", "via.placeholder.com","raw.githubusercontent.com", "static.licdn.com"],
  },
};

export default nextConfig;
