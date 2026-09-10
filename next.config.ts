import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Disable static optimization for dynamic routes
  trailingSlash: false,
};

export default nextConfig;
