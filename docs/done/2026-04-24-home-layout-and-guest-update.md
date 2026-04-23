# Done: Home Layout And Guest Update

## What Changed

- [HomeContent.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/HomeContent.tsx) の並びを変更し、カウントダウンと独立したプログラムカードセクションをホームから外して、公演情報を上側へ移しました。
- [EventInfo.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/EventInfo.tsx) にゲスト欄を追加し、3名のゲスト名と所属を表示するようにしました。
- [guestArtists.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/guestArtists.ts) を追加し、ゲスト表示用の文言を共有データとして切り出しました。
- [CastCards.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/CastCards.tsx) に `青い鳥 / 南野 高廣` を追加しました。
- [content-ownership.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/content-ownership.md) を更新し、ゲスト表記の参照先を明記しました。

## Why

- ホーム上部で知りたい情報を絞り、カウントダウンよりも公演情報を先に見せたい意図に合わせるためです。
- 独立したプログラムカードは今回の案内導線では必須ではなく、`EventInfo` 内の短い構成要約があれば十分でした。
- ゲストと出演者情報を現行の配役案内に合わせて揃える必要がありました。

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Safari で `http://127.0.0.1:3000/#event-info` を確認
- デスクトップ幅で、公演情報が上にあり、ゲスト3名が表示され、プログラムカードが独立表示されないことを確認
- 狭幅の Safari ウインドウで、公演情報とキャストカードが読めることを確認
- `物語を紡ぐ者たち` に `青い鳥 / 南野 高廣` が追加されていることを確認

## Residual Risks

- ゲスト名の中央表記は添付画像をもとに `宮坂 柚` として反映しています。元データと別表記が必要ならそこだけすぐ直せます。
- `Countdown.tsx` と `ProgramCarousel.tsx` のファイル自体は残しており、現在はホームから未使用の状態です。

## Follow-ups

- 不要になった `Countdown.tsx` と `ProgramCarousel.tsx` を将来的に整理するなら、未使用コンポーネントとして別タスクで掃除できます。
