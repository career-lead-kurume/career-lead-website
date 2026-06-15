"use client";

import { motion } from "framer-motion";

/**
 * 互い違いに流れる複数行のロゴ／社名バンド。
 * interactive deck p21「LogoBand」演出を、本LPのライトテーマ＋
 * ブランドカラー（赤紫）に最適化して移植したもの。
 *
 * - 行ごとに方向・速度を変えて立体感を出す
 * - 両端は背景色へフェード（fadeColor）
 * - 社名は確定後 /public/images の実ロゴ画像へ差し替え可能
 */
function Row({
  items,
  direction = "left",
  durationS = 40,
  fadeColor,
}: {
  items: string[];
  direction?: "left" | "right";
  durationS?: number;
  fadeColor: string;
}) {
  // -50% まで動かして無限ループに見せるため、同じ配列を2回連結
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      {/* 両端フェード */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24"
        style={{
          backgroundImage: `linear-gradient(to right, ${fadeColor}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24"
        style={{
          backgroundImage: `linear-gradient(to left, ${fadeColor}, transparent)`,
        }}
      />

      <motion.div
        className="flex gap-4 whitespace-nowrap py-2 sm:gap-6"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: durationS, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-full border border-brand-100 bg-white px-5 py-2.5 shadow-sm"
          >
            <span className="text-sm font-medium tracking-wide text-neutral-500">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LogoBand({
  rows,
  fadeColor = "#ffffff",
}: {
  rows: string[][];
  fadeColor?: string;
}) {
  // 各行で方向・速度を変える（奇数行は逆方向）
  const durations = [48, 58, 52, 44, 60];
  return (
    <div className="flex flex-col gap-3">
      {rows.map((items, i) => (
        <Row
          key={i}
          items={items}
          direction={i % 2 === 1 ? "right" : "left"}
          durationS={durations[i % durations.length]}
          fadeColor={fadeColor}
        />
      ))}
    </div>
  );
}
