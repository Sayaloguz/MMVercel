import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["community.cloudflare.steamstatic.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
