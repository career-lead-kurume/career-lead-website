/**
 * 色付きセクションの上下境界を、水平線ではなく「波（曲線）」にするための仕切り。
 * セクションの外側へはみ出して配置するため、置く側のセクションは
 * overflow を切らず（overflow-visible）、必要なら z-index を上げること。
 *
 * fill にはセクションの端の色を渡す（上端と下端で色が違うグラデの場合は別々に）。
 */
export default function WaveDivider({
  position,
  fill,
  className = "",
}: {
  position: "top" | "bottom";
  fill: string;
  className?: string;
}) {
  const isTop = position === "top";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${
        isTop ? "top-0 -translate-y-[99%]" : "bottom-0 translate-y-[99%]"
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`block h-[44px] w-full sm:h-[80px] ${
          isTop ? "" : "rotate-180"
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,100 C240,18 480,18 720,52 C960,86 1200,92 1440,28 L1440,100 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
