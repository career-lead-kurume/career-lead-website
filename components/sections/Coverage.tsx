import {
  HeartIcon,
  TruckIcon,
  Cog6ToothIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/solid";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { coverage } from "@/lib/site";

/** 分野アイコンの対応づけ（site.ts の icon キーと連動） */
const industryIcons = {
  care: HeartIcon,
  truck: TruckIcon,
  factory: Cog6ToothIcon,
  food: BuildingStorefrontIcon,
  construction: HomeModernIcon,
} as const;

export default function Coverage() {
  return (
    <section
      id="coverage"
      className="relative overflow-hidden bg-white/85 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-pattern opacity-50" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={coverage.eyebrow}
          title={coverage.title}
          description={coverage.description}
        />

        {/* ===== 対応業種 ===== */}
        <Reveal className="mt-14">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            {coverage.industriesTitle}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {coverage.industries.map((ind) => {
              const Icon =
                industryIcons[ind.icon as keyof typeof industryIcons];
              return (
                <div
                  key={ind.field}
                  className="group flex flex-col items-center rounded-2xl border border-brand-100 bg-white px-4 py-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="mb-4 inline-grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </span>
                  <p className="text-base font-bold text-neutral-900">
                    {ind.example}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">{ind.field}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ===== ご紹介可能国 ===== */}
        <Reveal className="mt-16">
          <h3 className="mb-6 text-center text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            {coverage.countriesTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {coverage.countries.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-5 py-2.5 shadow-sm"
              >
                <GlobeAsiaAustraliaIcon className="h-5 w-5 text-brand-500" />
                <span className="text-sm font-semibold tracking-wide text-neutral-700 sm:text-base">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
