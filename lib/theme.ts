/**
 * Tailwind パレット外で使う強調色。
 * ヒーローや最終CTAなど、グラデーション／インライン style で
 * 直接参照する箇所のために 1 か所へ集約する。
 */
export const accent = {
  /** 強調・CTA のコーラルレッド */
  coral: "#ef5d6b",
  /** 強調の青 */
  blue: "#6b86d6",
  /** コーラル系グラデーションの終端（オレンジ寄り） */
  coralGradientEnd: "#f5845f",
} as const;
