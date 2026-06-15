import { CheckCircleIcon } from "@heroicons/react/24/solid";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { narrowing } from "@/lib/site";

export default function NarrowingDown() {
  return (
    <section id="narrowing" className="relative bg-brand-50/55 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={narrowing.eyebrow} title={narrowing.title} />

        {/* 選ばれる理由 */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {narrowing.reasons.map((r, i) => (
            <Reveal key={r.no} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-b from-cream-100 to-white p-8 shadow-sm">
                <span className="absolute -right-2 -top-4 text-7xl font-black text-brand-100 select-none">
                  {r.no}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-bold text-neutral-900">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {r.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* こんな企業様へ（絞り込み） */}
        <Reveal className="mt-16">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-500 p-8 text-white sm:p-12">
            <h3 className="text-center text-2xl font-bold">
              {narrowing.target.title}
            </h3>
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {narrowing.target.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3.5 backdrop-blur"
                >
                  <CheckCircleIcon className="h-6 w-6 shrink-0 text-gold-300" />
                  <span className="text-sm font-medium sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-white/80">
              ひとつでも当てはまれば、ぜひ一度ご相談ください。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
