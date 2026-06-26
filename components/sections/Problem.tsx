import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Reveal from "@/components/ui/Reveal";
import { problem } from "@/lib/site";

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-cream-100 py-20 sm:py-28"
    >
      {/* ごく控えめな背景アクセント */}
      <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-brand-100/40 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* 見出し（この部分は変更しない） */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand-500">
            こんなこと、ありませんか？
          </p>
          <h2 className="relative mt-3 inline-block text-2xl font-bold leading-snug text-neutral-900 sm:text-3xl">
            {problem.title}
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="9"
              viewBox="0 0 300 9"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 6 C70 2, 150 2, 298 5"
                stroke="#f5b942"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {problem.description}
          </p>
        </Reveal>

        {/* お悩み（画像主体・最小テキスト） */}
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {problem.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.08}>
              <figure className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-cream-200 to-sky-100">
                  <Image
                    src={`/images/problem/${String(i + 1).padStart(2, "0")}.webp`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* 連番バッジ */}
                  <span className="absolute left-4 top-4 font-mono text-sm font-semibold tabular-nums text-white/90 drop-shadow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <figcaption className="mt-4 text-center">
                  <h3 className="text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {item.body}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* 次セクションへの橋渡し */}
        <Reveal delay={0.1} className="mt-16 text-center">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/25">
            <ArrowDownIcon className="h-5 w-5" />
          </span>
          <p className="mt-5 text-lg font-medium text-neutral-700 sm:text-xl">
            その悩み、
            <span className="font-bold text-brand-600">「人」の力</span>
            で解決できます。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
