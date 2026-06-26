/**
 * 画像が右から左へ無限に流れるマーキー。
 * ヒーローセクションとProblemの境界に配置し、現場・人材の雰囲気を伝える。
 *
 * - framer-motion を使わず CSS @keyframes で実装。
 *   JS管理のアニメーションはサイクル境界でスナップが発生するため、
 *   ブラウザGPUレベルでループする CSS animation: linear infinite を使用。
 * - -50% まで動かして無限ループに見せるため、同じ配列を2回連結
 * - 余白は flex の gap ではなく各アイテムの右マージンで付与する。
 *   gap は「最後のアイテムの後ろ」に入らないため、-50% が 1コピー分の幅と
 *   一致せず、ループ境界でギャップ半分だけズレ（＝初期位置に戻る違和感）が
 *   発生する。右マージンなら全幅の半分が正確に 1コピー分になり継ぎ目が消える。
 * - 両端は背景色へフェード
 */
import Image from "next/image";

type MarqueeImage = {
  src?: string;
  alt: string;
};

function Placeholder({ alt, index }: { alt: string; index: number }) {
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
      {/* CSS keyframe をインラインで定義（tailwind の purge に依存しない確実な方法） */}
      <style>{`
        @keyframes img-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

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

      <div
        className="flex w-max"
        style={{
          animation: `img-marquee ${durationS}s linear infinite`,
          /* right方向は同じキーフレームを逆再生 */
          animationDirection: direction === "right" ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative mr-4 h-40 w-64 shrink-0 overflow-hidden rounded-2xl shadow-sm sm:mr-6 sm:h-48 sm:w-80"
          >
            {img.src ? (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 320px, 256px"
                className="object-cover"
              />
            ) : (
              <Placeholder alt={img.alt} index={i} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
