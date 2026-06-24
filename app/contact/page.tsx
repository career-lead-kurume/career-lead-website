import type { Metadata } from "next";
import Link from "next/link";
import {
  PhoneIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import ContactForm from "@/components/ContactForm";
import { contact, site } from "@/lib/site";
import { telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "特定技能外国人の採用・定着に関するご相談・お見積りは無料です。登録支援機関のキャリア・リードが、現場のお悩みからワンストップでサポートします。お気軽にお問い合わせください。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="relative bg-cream-100/70 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          トップへ戻る
        </Link>

        <div className="mt-6 text-center">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
            <span className="h-px w-6 bg-brand-400" />
            {contact.eyebrow}
          </span>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {contact.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            {contact.description}
          </p>
        </div>

        {/* 連絡手段 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={telHref(site.tel)}
            className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <PhoneIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-xs text-neutral-500">
                お電話でのご相談
              </span>
              <span className="block text-lg font-bold text-neutral-900">
                {site.tel}
              </span>
              <span className="block text-xs text-neutral-400">
                {site.telHours}
              </span>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <EnvelopeIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-xs text-neutral-500">
                メールでのご相談
              </span>
              <span className="block text-lg font-bold text-neutral-900">
                {site.email}
              </span>
              <span className="block text-xs text-neutral-400">
                下記フォームもご利用ください
              </span>
            </span>
          </div>
        </div>

        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
