# Hero First Viewport

## What Changed

- モバイルの hero 高さを画面高ぶん確保し、ポスター直下の prologue 本文が初期表示で見えないようにしました。
- モバイルポスターを hero セクション内で縦方向中央に配置しました。
- PCでも hero 高さを画面高ぶん確保し、横長寄りの画面で prologue 本文が初期表示に入らないようにしました。
- PCポスターも hero セクション内で縦方向中央に配置しました。
- ポスター画像は `contain` のまま維持し、左右を大きく切る `cover` には変えていません。

## Why

- スマホ画面や横長寄りのPC画面では、全幅表示のままだと画像の下端より先に次セクションが見えていました。
- ポスター全体の可読性を守るため、画像を拡大クロップせず hero 領域側を伸ばす方針にしました。

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwright screenshot review at `430x932`
- Playwright screenshot review at `1214x835`
- Playwright screenshot review at `1440x900`

## Residual Risks

- 細長いスマホではポスター下に紙色の余白が出ます。これはポスター全体表示を優先した意図的な妥協です。

## Follow-ups

- 余白なしで画面いっぱいに見せたい場合は、専用のさらに縦長いモバイルKV画像を作るのが最もきれいです。
