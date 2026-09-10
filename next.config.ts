import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder art in /public is authored SVG. The CSP below keeps the
    // optimizer from treating SVGs as executable.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
