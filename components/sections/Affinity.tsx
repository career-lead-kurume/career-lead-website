import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import WaveDivider from "@/components/ui/WaveDivider";
import { affinity } from "@/lib/site";

export default function Affinity() {
  return (
    // 波の仕切りを外側へはみ出させるため overflow は切らず、隣接セクションより
    // 手前に来るよう z-10 を付与する。
    <section
      id="affinity"
      className="relative z-10 bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 py-20 text-white sm:py-28"
    >
      {/* 上下境界の波（曲線）。端の色に合わせ上＝brand-700 / 下＝accent-500。 */}
      <WaveDivider position="top" fill="#a51752" />
      <WaveDivider position="bottom" fill="#f96c46" />

      {/* 装飾ブロブ（セクション内に収めるため overflow-hidden で囲う） */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden opacity-30">
        <div className="absolute -right-20 top-0 h-80 w-80 animate-blob bg-accent-300 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-72 w-72 animate-blob bg-brand-400 blur-3xl [animation-delay:-6s]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        {/* ビジュアル（代表者写真） */}
        <Reveal direction="right">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-white/20 shadow-2xl shadow-black/20 lg:mx-0">
            <Image
              src="/images/representative.webp"
              alt="株式会社キャリア・リード 代表取締役 佐藤有里子"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
        </Reveal>

        {/* テキスト */}
        <div>
          <SectionHeading
            eyebrow={affinity.eyebrow}
            title={affinity.title}
            align="left"
            invert
          />
          <div className="mt-6 space-y-4">
            {affinity.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-base leading-relaxed text-white/85 sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <blockquote className="mt-8 border-l-4 border-gold-300 pl-5 text-xl font-bold leading-relaxed text-white">
              {affinity.pullQuote}
            </blockquote>
          </Reveal>

          {affinity.signature && (
            <Reveal delay={0.4}>
              <p className="mt-6 whitespace-pre-line text-right text-sm font-medium text-white/70">
                {affinity.signature}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
