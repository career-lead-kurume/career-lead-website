import {
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PresentationChartBarIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  ShareIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { solution } from "@/lib/site";

/** ステップアイコンの対応づけ（site.ts の icon キーと連動） */
const stepIcons = {
  mail: EnvelopeIcon,
  hearing: ChatBubbleLeftRightIcon,
  proposal: PresentationChartBarIcon,
  matching: UserPlusIcon,
  setup: Cog6ToothIcon,
  deploy: ShareIcon,
  support: CalendarDaysIcon,
} as const;

/**
 * 導入の流れ（Flow）。
 * 縦のタイムライン：左に円形アイコン、右に STEP番号 + タイトル + 補足。
 * 各ステップ間は下向き矢印でつなぐ。色はブランドカラー。
 */
export default function Solution() {
  return (
    <section id="solution" className="relative bg-white/80 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={solution.eyebrow} title={solution.title} />

        <div className="mx-auto mt-14 max-w-2xl">
          {solution.steps.map((step, i) => {
            const Icon = stepIcons[step.icon as keyof typeof stepIcons];
            const isLast = i === solution.steps.length - 1;
            return (
              <div key={step.title}>
                <Reveal delay={i * 0.05}>
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* 円形アイコン */}
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/30 sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>

                    {/* STEP番号 + タイトル + 補足 + 期間目安 */}
                    <div>
                      <p className="text-base sm:text-lg">
                        <span className="mr-2.5 font-extrabold tracking-wide text-brand-700 sm:mr-3">
                          STEP{i + 1}
                        </span>
                        <span className="font-bold text-neutral-800">
                          {step.title}
                        </span>
                        {"note" in step && step.note && (
                          <span className="text-sm text-neutral-400">
                            {step.note}
                          </span>
                        )}
                      </p>
                      {"period" in step && step.period && (
                        <p className="mt-1 pl-[calc(theme(space.10)+theme(space.2.5))] text-xs font-medium text-brand-400 sm:pl-[calc(theme(space.12)+theme(space.3))]">
                          {step.period}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>

                {/* 下向き矢印（円の中心に揃える） */}
                {!isLast && (
                  <div className="flex w-12 justify-center py-1.5 sm:w-14">
                    <ChevronDownIcon className="h-5 w-5 text-brand-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
