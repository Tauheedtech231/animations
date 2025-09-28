import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ["lh3.googleusercontent.com"], // ✅ allow Googleusercontent images
  },
  /* config options here */
};

export default nextConfig;
