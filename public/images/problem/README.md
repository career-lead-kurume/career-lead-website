# 「こんな採用の悩み、ありませんか？」セクションの画像

`components/sections/Problem.tsx`（Problem セクション）の各お悩みカードに対応する画像をここに配置してください。

## ファイル名（推奨・連番）

`problem.items` の並び順に対応します（横長 4:3 目安）。

- `01.jpg` … 人材不足
- `02.jpg` … 採用してもすぐ辞めてしまう
- `03.jpg` … 外国人雇用が複雑で不安
- `04.jpg` … 繁忙期の人手が足りない

## 配置後の対応

画像を置いたら、`components/sections/Problem.tsx` のプレースホルダ
（グラデーションの枠 + 「画像（0X）」の表示）を `next/image` の
`<Image src="/images/problem/0X.jpg" ... />` に差し替えてください。
