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

  /*
    Old WordPress URLs Google still has indexed. permanent: true answers 308,
    which tells search engines to move the listing to the new URL for good.
    Redirects run before the filesystem, so these win over any page or
    /public file of the same name.
  */
  async redirects() {
    return [
      { source: "/sluzby", destination: "/", permanent: true },
      { source: "/tvorba-webu", destination: "/", permanent: true },
      { source: "/author/filip", destination: "/", permanent: true },
      { source: "/ahoj-svet", destination: "/", permanent: true },
    ];
  },

  /*
    Baseline security headers on every route. No Content-Security-Policy yet:
    it needs testing against GA, Formspree and the scroll animations first.
  */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
