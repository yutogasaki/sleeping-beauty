# Mobile Hero First Viewport

## Objective

スマホ表示と横長寄りのPC表示でトップポスター直下のセクションがファーストビューに見えないようにし、ポスターを主役として見せる。

## Non-goals

- ポスター画像の差し替え
- トップページ全体の再デザイン
- CTA、コピー、セクション順の変更

## Scope

- [src/app/globals.css](/Users/yutogasaki/Projects/sleeping-beauty/src/app/globals.css) の hero 表示調整
- 影響範囲は公開トップページの hero から prologue への境界

## Acceptance Criteria

- モバイルの初期表示で prologue セクション本文が見えない
- モバイルポスターが hero セクション内で縦方向中央に見える
- PCでもアスペクト比によって prologue セクション本文がファーストビューに見えない
- PCポスターが hero セクション内で縦方向中央に見える
- モバイルポスターの全体表示を優先し、左右を大きく切らない
- デスクトップの hero 表示は意図せず変えない
- 横スクロールや不自然な重なりを増やさない

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwright で desktop と mobile の hero 表示を確認

## Risks and Assumptions

- 画面がポスター画像より細長い端末では、ポスター下に余白が出る可能性がある。画像を `cover` で拡大して切るより、全体表示を優先する。
