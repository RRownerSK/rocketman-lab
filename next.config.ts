import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      Next 16 only allows qualities listed here (default [75]); anything else
      warns and snaps back to 75. The work screenshots are UI with small text,
      so they get 90 — everything else stays on the default.
    */
    qualities: [75, 90],
  },
};

export default nextConfig;
