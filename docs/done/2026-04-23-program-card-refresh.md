# Done: Program Card Refresh

## What Changed

- [ProgramCarousel.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/ProgramCarousel.tsx) の既存横スクロールUIは維持したまま、プログラムカードの中身を3章の短い紹介文へ差し替えました。
- `Chapter 1 / Chapter 2 / Chapter 3` の短い章紹介コピーを [programDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/programDetails.ts) に共通化し、[EventInfo.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/EventInfo.tsx) と同じ文言を使うように揃えました。
- プログラムセクションに `#program` アンカーを追加し、確認や今後の導線追加に使えるようにしました。
- [content-ownership.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/content-ownership.md) を更新し、プログラム章コピーのソースオブトゥルースを `src/lib/programDetails.ts` に明記しました。

## Why

- 添付の配役表に合わせると、既存の詳細カードは情報の粒度が今回の運用意図より細かく、章単位の短い案内へ寄せる必要がありました。
- 一方で既存の横スクロールUI自体はページの見せ方として成立していたため、UI構成は変えずに文言だけ差し替えるほうが意図に合っていました。
- 同じ章情報が複数コンポーネントに分散していたため、今後の文言修正を安全にするためにも共通化が必要でした。

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Safari で `http://127.0.0.1:3000/#program` を確認
- デスクトップ幅で、既存の横スクロールUIのまま3章カードになっていることを確認
- 狭幅の Safari ウインドウで、横スクロールUI内の3章カード文言が崩れていないことを確認
- `EventInfo` の章要約が同じ文言になっていることを確認

## Residual Risks

- モバイル確認は狭幅の Safari ウインドウによる確認です。実機ブラウザ特有のフォント差やアドレスバー挙動までは見ていません。
- `Chapter 2` の中にはクラシック作品 `サタネラ` も含まれますが、今回は章全体の性格を優先して `創作作品` と表現しています。

## Follow-ups

- 必要になれば、プログラムカードからPDFや詳細配役一覧へ飛ぶ導線を追加できます。
