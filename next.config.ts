import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disables image resizing cache to save disk memory
  },
};

export default nextConfig;
