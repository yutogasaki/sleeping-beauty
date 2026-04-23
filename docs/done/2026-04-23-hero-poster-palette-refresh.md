# Done: Hero Poster Palette Refresh

## What Changed

- [MainHero](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MainHero.tsx) を、提供ポスター画像を主役にしたフルビューポート表示へ差し替えました。
- モバイルでは余白だらけの縮小表示をやめ、同じポスターを全画面で見せる専用クロップへ切り替えました。
- 提供画像を [public/images/sleeping-beauty-hero-poster.png](/Users/yutogasaki/Projects/sleeping-beauty/public/images/sleeping-beauty-hero-poster.png) として追加しました。
- [globals.css](/Users/yutogasaki/Projects/sleeping-beauty/src/app/globals.css) の配色トークンを、アイボリー、ゴールドベージュ、ブラウン、セージ系の暖色パレットへ更新しました。
- ヒーロー差し替え後も全体の色調が浮かないように、主要コンポーネントの旧ブルー/ゴールド前提の残存色を最小限追従させました。

## Why

- 既存のトップヒーローは森・シルエット演出が中心で、今回のポスターをそのまま主役に据える意図とずれていました。
- 画像自体がタイトル、日付、会場情報を含むため、トップでは装飾よりもポスターそのものを見せる構成が自然でした。
- 既存の寒色ベース配色は新しいヒーロービジュアルとトーンが離れていたため、ページ全体を暖色とセージ寄りへ寄せました。

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwright でローカル `http://127.0.0.1:3000/` を確認
- デスクトップ表示のヒーローと下層セクションの色なじみを確認
- モバイル表示のヒーロー全画面クロップと文字の見え方を確認
- ブラウザ確認でエラーオーバーレイなし、本文表示ありを確認

## Residual Risks

- ホーム画面には Framer Motion 由来の warning が1件残っています。今回のヒーロー差し替えで追加したものではありませんが、別タスクで見直す余地があります。
- 横長ポスターのため、モバイルでは全面トリミングではなく全体表示優先にしています。将来的にモバイル専用ポスターがあればさらに詰められます。

## Follow-ups

- モバイル用に別アスペクトのKVが用意できるなら、トップの見せ方はさらに密度高く調整できます。
