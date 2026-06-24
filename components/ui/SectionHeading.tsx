import Reveal from "./Reveal";

/**
 * 各セクション共通の見出し（eyebrow + タイトル + 説明）。
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <span
          className={`mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase ${
            invert ? "text-accent-200" : "text-brand-600"
          }`}
        >
          <span
            className={`h-px w-6 ${invert ? "bg-accent-200" : "bg-brand-400"}`}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`whitespace-pre-line text-2xl font-bold leading-tight sm:text-3xl ${
          invert ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            invert ? "text-white/80" : "text-neutral-600"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
