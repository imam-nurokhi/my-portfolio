import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The previous site lived at /portfolio.html; keep old links working.
    return [{ source: "/portfolio.html", destination: "/", permanent: true }];
  },
  async rewrites() {
    return {
      // Serve the static portfolio page at the site root.
      beforeFiles: [{ source: "/", destination: "/index.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
