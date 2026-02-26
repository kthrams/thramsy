import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://cv.thramsy.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
