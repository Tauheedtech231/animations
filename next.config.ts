import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // ✅ Google profile images
      "images.unsplash.com",       // ✅ Unsplash images
    ],
  },
  /* other config options here */
};

export default nextConfig;
