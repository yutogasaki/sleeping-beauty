# Program Finale Highlights

## What Changed

- Chapter 1 / Chapter 2 に、それぞれのトリ演目を追加しました。
- 章説明の下に、細い罫線付きの小さな「トリ演目」ブロックとして表示しました。
- トリ演目情報を `src/lib/programDetails.ts` に持たせ、プログラム情報の管理場所を維持しました。
- `docs/operations/content-ownership.md` に、トリ演目ハイライトも `programDetails.ts` で管理することを追記しました。

## Why

- 公演情報内で章全体の説明を保ちつつ、各章の締めとなる演目だけを分かりやすく見せるため。

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwrightで公演情報セクションをデスクトップ幅とモバイル幅で確認

## Residual Risks

- モバイルでは長い演目名が自然に複数行へ折り返されます。

## Follow-ups

- 今後トリ演目以外も掲載する場合は、詳細プログラム用の別表示として設計する。
