import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Off because Cache Components hang on Cloudflare Workers (Error 1101):
  // Next.js relies on setTimeout() behaviour the Workers runtime doesn't have
  cacheComponents: false,
  partialPrefetching: false,
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
