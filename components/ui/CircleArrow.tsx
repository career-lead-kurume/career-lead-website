import { accent } from "@/lib/theme";

/**
 * ボタン内に置く、丸い背景つきの右向き矢印アイコン。
 * - bg: 円の背景色（既定: コーラル）
 * - arrow: 矢印の線色（既定: 白）
 */
export default function CircleArrow({
  bg = accent.coral,
  arrow = "#ffffff",
}: {
  bg?: string;
  arrow?: string;
}) {
  return (
    <span
      className="grid h-7 w-7 place-items-center rounded-full"
      style={{ backgroundColor: bg }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h12m0 0l-5-5m5 5l-5 5"
          stroke={arrow}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
