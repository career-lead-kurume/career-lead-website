import type { NextConfig } from "next";

/**
 * Content-Security-Policy。
 * - 静的生成（SSG）を維持するため nonce は使わずヘッダ方式。
 *   ※より厳格な nonce ベースCSPへ移行する場合は middleware が必要で、
 *     ページが動的レンダリングになる点に注意（本LPは静的優先）。
 * - script/style に 'unsafe-inline' を許可しているのは、Next の
 *   ハイドレーション用インラインスクリプトと、framer-motion / Leaflet が
 *   付与するインラインスタイルのため。
 * - Google ドメインと reCAPTCHA は将来の実装に備えて許可済み。
 * - 地図タイル（CARTO）を img-src で許可。
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.basemaps.cartocdn.com https://*.cartocdn.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google.com https://www.recaptcha.net",
  "frame-src https://www.google.com https://www.recaptcha.net",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // dev サーバーへ LAN（スマホ実機確認等）からアクセスする場合は、
  // ここに端末から見たPCのローカルIP（例: "192.168.x.x"）を追加して再起動する。
  // Next.js 16 から localhost 以外は既定でブロックされるため。
  allowedDevOrigins: [],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
