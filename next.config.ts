import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SVGs in public/ are served as static assets; no extra config needed.
  // Images from local public/ folder don't need remotePatterns.
};

export default nextConfig;
