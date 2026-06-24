/**
 * 簡易インメモリ・レートリミッタ（固定ウィンドウ）。
 *
 * - 外部依存なしで動く軽量版。スパム連投・Resend のコスト/クォータ枯渇の
 *   一次防御として利用する。
 * - 注意: サーバーレス（Vercel 等）では実行インスタンスごとにメモリが
 *   分離されるため、厳密なグローバル制限にはならない。将来的に
 *   Upstash Redis などへ差し替える場合は rateLimit() のシグネチャを
 *   維持したまま中身を置き換えればよい。
 */

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

const DEFAULT_WINDOW_MS = 10 * 60 * 1000; // 10分
const DEFAULT_MAX = 5; // ウィンドウあたり最大回数

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterMs: number;
};

export function rateLimit(
  key: string,
  max: number = DEFAULT_MAX,
  windowMs: number = DEFAULT_WINDOW_MS
): RateLimitResult {
  const now = Date.now();

  // 肥大化防止: 期限切れエントリを軽く掃除
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1, retryAfterMs: 0 };
  }

  if (entry.count >= max) {
    return { ok: false, remaining: 0, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true, remaining: max - entry.count, retryAfterMs: 0 };
}
