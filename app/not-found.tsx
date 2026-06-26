import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center bg-cream-100/70 px-4 py-28">
      <div className="text-center">
        <p className="text-6xl font-extrabold tracking-tight text-brand-600 sm:text-7xl">
          404
        </p>
        <h1 className="mt-4 text-xl font-bold text-neutral-900 sm:text-2xl">
          ページが見つかりませんでした
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
          お探しのページは移動または削除された可能性があります。
          URLをご確認いただくか、トップページからお進みください。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          トップページへ戻る
        </Link>
      </div>
    </section>
  );
}
