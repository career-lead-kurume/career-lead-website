import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { solution } from "@/lib/site";

/**
 * ご利用の流れ（Flow）
 * 参考: shokusaiseikatsu.com「選ばれる4つの理由」のジグザグ配置。
 * 各ステップを「大きな番号 + キャッチコピー + 見出し + 本文 + 画像」で構成し、
 * 画像とテキストを左右交互に並べる。
 *
 * 画像はダミー（後日 /public/images/flow/step-0X.jpg を配置して
 * 下のプレースホルダーを next/image に差し替える想定）。
 */
export default function Solution() {
  return (
    <section id="solution" className="relative bg-white/80 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={solution.eyebrow}
          title={solution.title}
          description={solution.description}
        />

        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {solution.steps.map((step, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={step.no}
                className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* ===== 画像（ダミープレースホルダー） ===== */}
                <Reveal
                  direction={reversed ? "left" : "right"}
                  className={reversed ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg shadow-brand-600/10 ring-1 ring-brand-100">
                    {/* TODO: 画像確定後に下記を next/image へ差し替え
                        <Image src={step.image} alt={step.title} fill className="object-cover" /> */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-cream-200 to-accent-100" />
                    {/* ドット装飾 */}
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(196,31,99,0.18) 1.2px, transparent 1.2px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="absolute inset-0 grid place-items-center text-center text-brand-500/70">
                      <div>
                        <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-white/70 shadow-sm" />
                        <p className="text-xs font-medium tracking-wide">
                          STEP {step.no} イメージ
                        </p>
                        <p className="mt-0.5 text-[10px] text-brand-400/70">
                          {step.image}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* ===== テキスト ===== */}
                <Reveal
                  direction={reversed ? "right" : "left"}
                  delay={0.1}
                  className={reversed ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="relative">
                    {/* 大きな番号（ウォーターマーク） */}
                    <span className="pointer-events-none absolute -top-10 left-0 select-none text-[5rem] font-extrabold leading-none text-brand-100 sm:-top-12 sm:text-[7rem]">
                      {step.no}
                    </span>

                    <div className="relative">
                      <span className="text-sm font-bold tracking-wide text-accent-500">
                        {step.lead}
                      </span>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                        {step.title}
                      </h3>
                      <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-brand-600 to-accent-400" />
                      <p className="mt-5 text-base leading-relaxed text-neutral-600">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
