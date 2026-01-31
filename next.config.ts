import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "img.freepik.com",
        protocol: "https",
        port: "",
      },{
        hostname: "valuable-puffin-264.convex.cloud",
        protocol: "https",
        port: "",
      }
    ],
  },
};


export default nextConfig;
