"use client";

import dynamic from "next/dynamic";
import type { MapPin } from "./LeafletMap";

/**
 * Leaflet は window 依存のため SSR を無効化して読み込む。
 * （ssr:false は Client Component 内でのみ許可されるため、このラッパーを挟む）
 */
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-[#eef3fb] text-sm text-neutral-400">
      地図を読み込み中…
    </div>
  ),
});

/** 国名 → 緯度経度（site.ts に国を追加する場合はここに座標を足す） */
const countryCoords: Record<string, [number, number]> = {
  パキスタン: [30.3753, 69.3451],
  インド: [22.3511, 78.6677],
  スリランカ: [7.8731, 80.7718],
  タイ: [15.87, 100.9925],
  ネパール: [28.3949, 84.124],
  インドネシア: [-2.5489, 118.0149],
};

export default function CountryMap({ countries }: { countries: string[] }) {
  // 重複を除いた対象国（ピンは国ごとに1つ）
  const pins: MapPin[] = Array.from(new Set(countries))
    .filter((name) => countryCoords[name])
    .map((name) => ({ name, coord: countryCoords[name] }));

  return (
    <div className="relative">
      {/* グラデーションフレーム */}
      <div className="rounded-[1.6rem] bg-gradient-to-br from-brand-200/80 via-brand-100 to-sky-200/70 p-[1.5px] shadow-[0_24px_60px_-28px_rgba(196,31,99,0.35)]">
        <div className="relative h-[380px] w-full overflow-hidden rounded-[1.5rem] bg-[#eef3fb] sm:h-[520px]">
          <LeafletMap pins={pins} />

          {/* 装飾オーバーレイ（操作を妨げない） */}
          <div className="pointer-events-none absolute inset-0 z-[500]">
            {/* やわらかい縁取り */}
            <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/60 shadow-[inset_0_0_60px_20px_rgba(255,255,255,0.5)]" />
            {/* ブランドグロー（淡く） */}
            <div className="absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-brand-300/20 blur-3xl" />
            <div className="absolute bottom-4 right-1/4 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl" />
          </div>

          {/* キャプション */}
          <div className="pointer-events-none absolute left-4 top-4 z-[500]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-neutral-700 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              ご紹介可能国 → 日本
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
