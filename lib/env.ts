/**
 * 環境変数の取得・検証を集約する。
 * 設定漏れの判定を1か所に寄せ、各所での重複チェックを防ぐ。
 */

export type ResendEnv = {
  apiKey: string;
  to: string;
  from: string;
};

/**
 * 問い合わせメール送信（Resend）に必要な環境変数を取得する。
 * いずれか未設定なら null を返す（呼び出し側で dev フォールバックに分岐）。
 */
export function getResendEnv(): ResendEnv | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) return null;

  return { apiKey, to, from };
}
