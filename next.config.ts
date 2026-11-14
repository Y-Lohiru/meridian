import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dfknlwtazqqfpescfxkp.supabase.co",
        pathname: "/storage/v1/object/public/thumbnails/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
