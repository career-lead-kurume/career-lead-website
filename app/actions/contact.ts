"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contact as contactContent } from "@/lib/site";
import { getResendEnv } from "@/lib/env";
import { rateLimit } from "@/lib/rateLimit";
import { isValidEmail } from "@/lib/utils";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const categoryLabel = (value: string) =>
  contactContent.categories.find((c) => c.value === value)?.label ?? value;

/** リクエストヘッダからクライアントIPを推定する（プロキシ経由を考慮）。 */
async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip")?.trim() || "unknown";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // ハニーポット（bot 対策）: 人間には見えない `website` が埋まっていれば破棄。
  const honeypot = (formData.get("website") as string | null)?.trim() ?? "";
  if (honeypot !== "") {
    return { status: "success" }; // 攻撃側に気づかれないよう成功扱い
  }

  // レート制限（IP単位）: スパム連投・Resend コスト枯渇の一次防御。
  const ip = await getClientIp();
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return {
      status: "error",
      message:
        "送信リクエストが多すぎます。しばらく時間をおいてから再度お試しください。",
    };
  }

  // 改行除去でヘッダインジェクション防止
  const oneLine = (v: FormDataEntryValue | null) =>
    typeof v === "string" ? v.replace(/[\r\n]/g, "").trim() : "";

  const name = oneLine(formData.get("name"));
  const email = oneLine(formData.get("email"));
  const company = oneLine(formData.get("company"));
  const tel = oneLine(formData.get("tel"));
  const category = oneLine(formData.get("category"));
  const message =
    typeof formData.get("message") === "string"
      ? (formData.get("message") as string).trim()
      : "";

  // 必須チェック
  if (!name || !email || !category) {
    return {
      status: "error",
      message: "お名前・メールアドレス・ご相談内容の種別は必須です。",
    };
  }

  // 入力長の上限（巨大ペイロード防止）
  if (
    name.length > 100 ||
    email.length > 254 ||
    company.length > 200 ||
    tel.length > 30 ||
    message.length > 5000
  ) {
    return {
      status: "error",
      message: "入力内容が長すぎます。ご相談内容は5,000文字以内でご入力ください。",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "メールアドレスの形式をご確認ください。",
    };
  }

  const label = categoryLabel(category);
  const bodyLines = [
    "━━━ 新しいお問い合わせ ━━━",
    "",
    `■ 種別: ${label}`,
    `■ お名前: ${name}`,
    `■ メール: ${email}`,
    company ? `■ 会社名: ${company}` : null,
    tel ? `■ 電話番号: ${tel}` : null,
    "",
    "■ ご相談内容:",
    message || "（記載なし）",
    "",
    "━━━━━━━━━━━━━━━━━",
  ]
    .filter(Boolean)
    .join("\n");

  const env = getResendEnv();

  // 開発フォールバック: キー未設定ならメール送信せずコンソール出力のみ。
  // クライアント確定前でもフォームの動作確認ができる。
  if (!env) {
    console.info(
      "[contact] Resend 未設定のため送信スキップ（dev フォールバック）\n" +
        bodyLines
    );
    return {
      status: "success",
      message:
        "送信を受け付けました（開発モード：実際のメールは送信されていません）。",
    };
  }

  try {
    const resend = new Resend(env.apiKey);
    const result = await resend.emails.send({
      from: env.from,
      to: [env.to],
      replyTo: email,
      subject: `【${label}】${name} 様からのお問い合わせ`,
      text: bodyLines,
    });

    if (result.error) {
      console.error("[contact] 送信失敗", result.error);
      return {
        status: "error",
        message: "送信に失敗しました。時間をおいて再度お試しください。",
      };
    }
  } catch (err) {
    console.error("[contact] 例外", err);
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }

  return {
    status: "success",
    message: "お問い合わせを受け付けました。担当者よりご連絡いたします。",
  };
}
