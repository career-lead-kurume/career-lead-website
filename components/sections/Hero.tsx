"use client";

import { motion } from "framer-motion";
import CircleArrow from "@/components/ui/CircleArrow";
import ImageMarquee from "@/components/ui/ImageMarquee";
import { hero, cta } from "@/lib/site";
import { accent } from "@/lib/theme";

/** 見出し両端の手書き風スラッシュ */
function SlashMarks({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      aria-hidden
      className={flip ? "-scale-x-100" : ""}
    >
      <path
        d="M2 16 L8 3 M9 16 L15 3 M16 16 L22 3"
        stroke="#f5b942"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white pt-20"
    >
      {/* 背景: 淡い縦ストライプの紙テクスチャ */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(99,102,150,0.025) 0 1px, transparent 1px 8px)",
        }}
      />
      {/* 背景ブロブ（淡く） */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-16 h-72 w-72 animate-blob bg-brand-100/40 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-64 w-64 animate-blob bg-sky-100/50 blur-3xl [animation-delay:-6s]" />
      </div>

      {/* ===== 上部マーキー ===== */}
      <ImageMarquee
        images={[
          { src: "/images/marquee/01.jpg", alt: "現場写真 1" },
          { src: "/images/marquee/02.jpg", alt: "現場写真 2" },
          { src: "/images/marquee/03.jpg", alt: "現場写真 3" },
          { src: "/images/marquee/04.jpg", alt: "現場写真 4" },
          { src: "/images/marquee/05.jpg", alt: "現場写真 5" },
          { src: "/images/marquee/06.jpg", alt: "現場写真 6" },
        ]}
        durationS={35}
        fadeColor="#ffffff"
      />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-6">
        {/* ===== 左: コピー ===== */}
        <div>
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5"
          >
            <SlashMarks />
            <span className="text-lg font-bold tracking-wide text-neutral-600 sm:text-xl">
              {hero.eyebrow}
            </span>
            <SlashMarks flip />
          </motion.div>

          {/* title */}
          <h1 className="mt-5 text-xl font-extrabold leading-[1.22] tracking-tight text-slate-800 sm:text-3xl lg:text-4xl lg:leading-[1.2]">
            {hero.titleSegments.map((seg, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.06 }}
                style={
                  seg.accent
                    ? { color: seg.accent === "coral" ? accent.coral : accent.blue }
                    : undefined
                }
              >
                {seg.text}
                {seg.break && <br />}
              </motion.span>
            ))}
          </h1>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 max-w-lg text-sm leading-[2] text-neutral-600 sm:text-base"
          >
            {hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
          >
            <a
              href={cta.contactHref}
              className="group inline-flex items-center gap-5 rounded-full py-4 pl-9 pr-3 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(90deg, ${accent.coral} 0%, ${accent.coralGradientEnd} 100%)`,
                boxShadow: "0 14px 30px -10px rgba(239,93,107,0.6)",
              }}
            >
              {cta.contactLabel}
              <CircleArrow bg="#ffffff" arrow={accent.coral} />
            </a>
          </motion.div>
        </div>

        {/* ===== 右: ビジュアル（地球＋人材。人材イラストは素材を配置） ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto aspect-square w-full max-w-xl"
        >
          {/* ラベンダーの水彩地球ブロブ */}
          <div
            className="absolute right-[4%] top-[3%] h-[86%] w-[86%] blur-md"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(165,180,252,0.55), rgba(196,181,253,0.45) 45%, rgba(186,230,253,0.4) 70%, transparent 78%)",
              borderRadius: "46% 54% 58% 42% / 52% 46% 54% 48%",
            }}
          />
          {/* ハーフトーンの点（右上） */}
          <div
            className="absolute right-[2%] top-[6%] h-24 w-24 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(rgba(107,134,214,0.5) 1.4px, transparent 1.4px)",
              backgroundSize: "10px 10px",
            }}
          />

          {/* 手書き風アクセント（右上） */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute right-[3%] top-[10%] z-10 text-right"
          >
            <p
              className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-700 sm:text-base"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
            >
              {hero.handwrite}
            </p>
            <svg
              width="70"
              height="12"
              viewBox="0 0 70 12"
              fill="none"
              className="ml-auto mt-1"
            >
              <path
                d="M2 8 C20 2, 45 2, 68 6"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* 人材イラスト（素材プレースホルダ） */}
          <div className="absolute inset-x-[8%] bottom-0 top-[20%] grid place-items-center rounded-2xl border border-dashed border-slate-300/70 bg-white/30 backdrop-blur-[1px]">
            <div className="text-center text-slate-400">
              <div className="mx-auto mb-2 h-14 w-14 animate-float rounded-full bg-white/70 shadow" />
              <p className="text-sm font-medium">人材イラスト</p>
              <p className="mt-0.5 text-xs">（素材を /public/images に配置）</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
