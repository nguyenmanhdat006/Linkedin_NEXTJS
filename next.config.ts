import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   appDir: true, // nếu dùng App Router
  // },
  images: {
    domains: ["images.unsplash.com", "randomuser.me"], // thêm tất cả domain ảnh bên ngoài
  },
};

export default nextConfig;
