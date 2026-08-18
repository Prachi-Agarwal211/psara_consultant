import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "base-uri 'self'",
      "form-action 'self' https://wa.me https://api.whatsapp.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 301s for city slugs merged to canonical spellings (katni, davangere, raebareli,
  // mangalore -> mangaluru) — preserves legacy live-site URLs through the migration.
  // Live Vercel host is www — send apex there so sitemap/canonical match.
  async redirects() {
    const merged = [
      ["kathni", "katni"],
      ["davanagere", "davangere"],
      ["rae-bareli", "raebareli"],
      ["mangalore", "mangaluru"],
    ];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "psaraconsultantindia.com" }],
        destination: "https://www.psaraconsultantindia.com/:path*",
        permanent: true,
      },
      ...merged.flatMap(([from, to]) => [
        { source: `/city/${from}`, destination: `/city/${to}`, permanent: true },
        { source: `/security-services/city/${from}`, destination: `/security-services/city/${to}`, permanent: true },
      ]),
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
