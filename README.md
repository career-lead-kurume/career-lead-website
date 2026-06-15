# 特定技能人材事業 LP（ワイヤーフレーム）

クライアント企業の特定技能人材事業向けランディングページ。
**現段階はワイヤーフレーム／全体イメージ形成用**で、テキスト・画像はクライアント確定後に差し替えます。

## 技術スタック

- Next.js 16（App Router）／ React 19 / TypeScript
- Tailwind CSS 3
- framer-motion（スクロール連動の2Dアニメーション）
- Lenis（スムーズスクロール）
- Resend（お問い合わせフォームのメール送信）

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
```

## LP構成（PASONAフレーム）

ヘッダー → ヒーロー → 問題提起(Problem) → Affinity(共感) → Solution(解決策)
→ Offer(支援内容) → Narrowing down(選ばれる理由/対象) → Action(問い合わせ) → フッター

各セクションは `components/sections/` 配下。

## コンテンツの編集

**テキスト・数値・連絡先・ナビ**はすべて `lib/site.ts` に集約しています。
ここを書き換えるだけでサイト全体に反映されます（社名・キャッチコピー・各セクション文言など）。

## 画像の差し替え

`public/images/` に画像を配置し、各セクションのプレースホルダ部分を
`next/image` の `<Image>` に置き換えてください（Hero・Affinity にプレースホルダあり）。

## 配色（メイン＝赤紫／マゼンタ）

`tailwind.config.ts` の `colors` に集約：

- `brand`（赤紫＝コーポレートカラー）
- `accent`（コーラル）／ `gold`（ソフトゴールド）＝女性活躍応援に最適化したアクセント
- `cream`（白〜淡いピンクベージュ＝ベース）

ロゴ確定後、`brand.600` 等の数値を合わせて調整してください。

## お問い合わせフォーム

`app/actions/contact.ts`（サーバーアクション）+ Resend。

`.env.local.example` を `.env.local` にコピーして以下を設定：

- `RESEND_API_KEY` … Resend APIキー
- `CONTACT_EMAIL` … 通知先（クライアント受信用）
- `CONTACT_FROM` … 送信元（Resend認証済みドメイン）

> キー未設定でも開発可能です。その場合メールは送信されず、内容がコンソールに出力されます。

bot対策はハニーポット＋入力検証を実装済み。公開前に reCAPTCHA 等の追加も検討してください。
