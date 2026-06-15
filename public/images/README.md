# 画像素材の配置場所

クライアント確定後の画像をここに置いてください。

推奨（仮）:
- `hero.jpg` … ヒーローのメインビジュアル（人物写真など、縦長 4:5 目安）
- `affinity.jpg` … 想いセクションの写真（正方形目安）
- `logo.svg` … ロゴ（ヘッダー／フッター用）
- `og.png` … OGP画像（1200×630）

配置後、各セクションのプレースホルダ（グレーの枠）を `next/image` の
`<Image>` に置き換えてください。対象: `components/sections/Hero.tsx`,
`components/sections/Affinity.tsx`, `components/layout/Header.tsx`。
