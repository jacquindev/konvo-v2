import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ["@repo/ui", "@repo/backend"],
};

export default nextConfig;
