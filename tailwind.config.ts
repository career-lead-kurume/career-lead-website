import type { Config } from "tailwindcss";

/**
 * カラーパレット設計（クライアント企業：特定技能人材事業 / 女性活躍応援）
 *
 * - brand   : メインカラー = 赤紫（マゼンタ）。コーポレートカラー。
 * - accent  : アクセント①= コーラル（温かみ・親しみやすさ）。
 * - gold    : アクセント②= ソフトゴールド（信頼・前向きさ）。
 * - cream   : ベースカラー = 白〜淡いピンクベージュ。メインカラーを引き立てる。
 *
 * 色味の最終調整はクライアント確定ロゴに合わせて行う。
 * 数値を1か所変えれば全体に反映されるよう、ここに集約している。
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf2f7",
          100: "#fce7f0",
          200: "#fbcfe1",
          300: "#f7a8c8",
          400: "#f072a6",
          500: "#e34a85",
          600: "#c41f63", // メインの赤紫（コーポレートカラー）
          700: "#a51752",
          800: "#891748",
          900: "#73173f",
        },
        accent: {
          50: "#fff5f1",
          100: "#ffe8df",
          200: "#ffd0bd",
          300: "#ffb094",
          400: "#ff8a65", // コーラル
          500: "#f96c46",
          600: "#e44f29",
        },
        gold: {
          100: "#fdf3da",
          200: "#fbe4ac",
          300: "#f8d178",
          400: "#f3bd4c", // ソフトゴールド
          500: "#e0a430",
        },
        cream: {
          50: "#fffdfc",
          100: "#fff7f4",
          200: "#fdeee9", // 淡いピンクベージュ
          300: "#f8ddd4",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(6deg)" },
        },
        "blob": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shine: "shine 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
