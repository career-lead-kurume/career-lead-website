import {
  UserGroupIcon,
  BuildingOffice2Icon,
  HandThumbUpIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/solid";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import LogoBand from "@/components/ui/LogoBand";
import { achievements } from "@/lib/site";

const statIcons = [
  UserGroupIcon,
  BuildingOffice2Icon,
  HandThumbUpIcon,
  GlobeAsiaAustraliaIcon,
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-white/85 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dot-pattern opacity-50" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={achievements.eyebrow}
          title={achievements.title}
          description={achievements.description}
        />

        {/* 紺〜青の実績バンド（カウントアップ） */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-6 py-12 shadow-xl sm:px-12">
            {/* 装飾 */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
              {achievements.stats.map((s, i) => {
                const Icon = statIcons[i % statIcons.length];
                return (
                  <div
                    key={s.label}
                    className="flex flex-col items-center text-center"
                  >
                    <Icon className="mb-3 h-8 w-8 text-sky-300" />
                    <p className="text-sm font-medium text-sky-100/80">
                      {s.label}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                      <CountUp value={s.value} />
                      <span className="text-lg sm:text-xl">{s.suffix}</span>
                    </p>
                    {s.note && (
                      <p className="mt-1 text-[11px] text-sky-200/60">
                        {s.note}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 導入企業ロゴバンド（deck p21 LogoBand 演出を移植） */}
        <Reveal className="mt-16">
          <div className="mb-6 flex flex-col items-center gap-1 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-400">
              {achievements.trustedEyebrow}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              {achievements.trustedTitle}
            </h3>
          </div>
          <LogoBand rows={achievements.companyRows} fadeColor="#ffffff" />
        </Reveal>
      </div>
    </section>
  );
}
