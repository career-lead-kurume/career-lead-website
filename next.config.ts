import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // dev サーバーへ LAN（スマホ実機確認等）からアクセスする場合は、
  // ここに端末から見たPCのローカルIP（例: "192.168.x.x"）を追加して再起動する。
  // Next.js 16 から localhost 以外は既定でブロックされるため。
  allowedDevOrigins: [],
};

export default nextConfig;
