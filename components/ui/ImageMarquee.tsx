"use client";

import { motion } from "framer-motion";

/**
 * 画像が右から左へ無限に流れるマーキー。
 * ヒーローセクションとProblemの境界に配置し、現場・人材の雰囲気を伝える。
 *
 * - 画像は後から /public/images に差し替え可能（現在はダミー）
 * - -50% まで動かして無限ループに見せるため、同じ配列を2回連結
 * - 両端は背景色へフェード
 */
type MarqueeImage = {
  src?: string;
  alt: string;
};

function Placeholder({ alt, index }: { alt: string; index: number }) {
  // ダミー用の淡いグラデーション（ブランドカラー基調で交互に変化）
  const gradients = [
    "linear-gradient(135deg, #fce7f0 0%, #f7a8c8 100%)",
    "linear-gradient(135deg, #ffe8df 0%, #ff8a65 100%)",
    "linear-gradient(135deg, #fdf3da 0%, #f3bd4c 100%)",
    "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 100%)",
  ];
  return (
    <div
      className="grid h-full w-full place-items-center"
      style={{ background: gradients[index % gradients.length] }}
    >
      <span className="text-xs font-medium text-white/90">{alt}</span>
    </div>
  );
}

export default function ImageMarquee({
  images,
  direction = "left",
  durationS = 40,
  fadeColor = "#ffffff",
}: {
  images: MarqueeImage[];
  direction?: "left" | "right";
  durationS?: number;
  fadeColor?: string;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden bg-white py-6">
      {/* 両端フェード */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32"
        style={{
          backgroundImage: `linear-gradient(to right, ${fadeColor}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32"
        style={{
          backgroundImage: `linear-gradient(to left, ${fadeColor}, transparent)`,
        }}
      />

      <motion.div
        className="flex gap-4 sm:gap-6"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: durationS, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative h-40 w-64 shrink-0 overflow-hidden rounded-2xl shadow-sm sm:h-48 sm:w-80"
          >
            {img.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
            ) : (
              <Placeholder alt={img.alt} index={i} />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
