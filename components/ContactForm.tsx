"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { contact } from "@/lib/site";

const initialState: ContactState = { status: "idle" };

const inputCls =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-brand-100/50"
      >
        <CheckCircleIcon className="mx-auto h-16 w-16 text-brand-500" />
        <h3 className="mt-4 text-xl font-bold text-neutral-900">
          送信が完了しました
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          {state.message ??
            "お問い合わせありがとうございます。担当者よりご連絡いたします。"}
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full border border-brand-200 bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
        >
          トップへ戻る
        </a>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-brand-100/50 sm:p-10">
      <form action={formAction} className="space-y-5">
        {/* ハニーポット（視覚・支援技術から隠す） */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Webサイト
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="お名前" required>
            <input
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder="山田 花子"
              className={inputCls}
            />
          </Field>
          <Field label="会社名">
            <input
              name="company"
              type="text"
              maxLength={200}
              placeholder="株式会社○○"
              className={inputCls}
            />
          </Field>
          <Field label="メールアドレス" required>
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              placeholder="example@company.co.jp"
              className={inputCls}
            />
          </Field>
          <Field label="電話番号">
            <input
              name="tel"
              type="tel"
              maxLength={30}
              placeholder="000-0000-0000"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="ご相談内容の種別" required>
          <select name="category" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              選択してください
            </option>
            {contact.categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="ご相談内容">
          <textarea
            name="message"
            rows={5}
            maxLength={5000}
            placeholder="現場のお悩みやご質問を自由にご記入ください。"
            className={`${inputCls} resize-y`}
          />
        </Field>

        <div aria-live="assertive" role="alert">
          {state.status === "error" && (
            <p className="rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-600">
              {state.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "送信中..." : "この内容で送信する"}
        </button>
        <p className="text-center text-xs text-neutral-400">
          ご相談・お見積りは無料です。お預かりした情報は本件のご連絡にのみ利用します。
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="ml-1 text-brand-600">*</span>}
      </span>
      {children}
    </label>
  );
}
