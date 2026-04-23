# Done: Hero Contained Poster Reset

## What Changed

- [MainHero](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MainHero.tsx) を、ページ全体を染める実装から切り離し、hero セクション専用の背景レイヤー構成へ整理しました。
- [globals.css](/Users/yutogasaki/Projects/sleeping-beauty/src/app/globals.css) の配色トークンを、ダークネイビー / 白 / 金ベースへ戻しました。
- `glass-panel` を半透明寄りから solid 寄りの面に戻し、カードやUIが背景画像に引っ張られない状態にしました。
- ヒーローの desktop 表示では黒い被りを外し、`Prologue` の食い込みもやめて、ポスター下端が欠けずに見えるよう調整しました。
- 今回の方針を [docs/tasks/2026-04-23-hero-contained-poster-reset.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/tasks/2026-04-23-hero-contained-poster-reset.md) に記録しました。

## Why

- 直前の更新では、ポスター画像の暖色がグローバル配色まで広がり、もともとのネイビー基調UIが崩れていました。
- いただいた方針どおり、変える範囲を hero 背景とそのなじませ処理に限定した方が、既存UIの強さを保てると判断しました。

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwright で `http://127.0.0.1:3000/` の desktop 表示を確認
- Playwright で `http://127.0.0.1:3000/` の mobile 表示を確認
- browser console で error 0 件を確認

## Residual Risks

- Framer Motion 由来の warning が 1 件残っています。今回の hero 調整で増えたものではなく、既存スクロール演出側の見直し余地です。
- モバイルではポスター全景を優先しているため、hero 下の余白感は desktop より大きめです。必要なら別タスクでモバイル専用KVを検討できます。
