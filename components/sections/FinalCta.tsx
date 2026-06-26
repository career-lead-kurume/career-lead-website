import Image from "next/image";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Reveal from "@/components/ui/Reveal";
import CircleArrow from "@/components/ui/CircleArrow";
import { finalCta, cta, site } from "@/lib/site";
import { accent } from "@/lib/theme";
import { telHref } from "@/lib/utils";

export default function FinalCta() {
  return (
    <section className="relative bg-white py-12 sm:py-16">
      <Reveal className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-12 sm:py-12"
          style={{
            background:
              "linear-gradient(100deg, #f04e6e 0%, #f25e5e 42%, #f7984a 100%)",
          }}
        >
          {/* ハーフトーンの点（右上） */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.9) 1.4px, transparent 1.4px)",
              backgroundSize: "12px 12px",
            }}
          />

          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* 左: テキスト＋ボタン */}
            <div className="w-full max-w-xl text-center lg:text-left">
              <p className="text-sm font-medium text-white/95 sm:text-base">
                {finalCta.lead}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {finalCta.title}
              </h2>

              <a
                href={cta.contactHref}
                className="group mt-7 flex w-full items-center justify-center gap-4 rounded-full bg-white py-4 pl-6 pr-3 text-base font-bold shadow-lg transition-all hover:-translate-y-0.5 sm:max-w-md"
                style={{ color: accent.coral }}
              >
                <span className="flex-1 text-center">{cta.contactLabel}</span>
                <CircleArrow />
              </a>

              {/* 電話での相談 */}
              <div className="mt-6 sm:max-w-md">
                <a
                  href={telHref(site.tel)}
                  className="inline-flex items-center gap-2 text-3xl font-extrabold tracking-wide text-white"
                >
                  <PhoneIcon className="h-7 w-7" />
                  {site.tel}
                </a>
                <p className="mt-1 text-xs text-white/90">{site.telHours}</p>
              </div>
            </div>

            {/* 右: オペレーター写真 */}
            <div className="relative h-52 w-full max-w-xs shrink-0 overflow-hidden rounded-2xl lg:h-60">
              <Image
                src="/images/contact.jpeg"
                alt="お問い合わせスタッフ"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 320px, 320px"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
