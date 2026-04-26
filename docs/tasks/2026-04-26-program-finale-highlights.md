# Program Finale Highlights

## Objective

公演情報の Chapter 1 / Chapter 2 に、それぞれのトリ演目を短く上品に表示する。

## Non-goals

- プログラム全体の詳細一覧を作らない
- Chapter 3 や公演基本情報を変更しない
- 独立したプログラムカルーセルを復活させない

## Scope

- `src/lib/programDetails.ts`
- `src/components/EventInfo.tsx`
- `docs/operations/content-ownership.md`

## Acceptance Criteria

- Chapter 1 に `『ドン・キホーテ』第3幕 グラン・パ・ド・ドゥ` と出演者が表示される
- Chapter 2 に `サタネラ グラン・パ・ド・ドゥ` と出演者が表示される
- 表示は章説明を邪魔せず、トリ演目として自然に読める
- デスクトップとモバイルで文字が詰まりすぎない

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwrightで公演情報セクションをデスクトップ幅とモバイル幅で確認

## Risks and Assumptions

- トリ演目は各章1件だけ表示する前提
- 出演者・演目は既存の注記どおり変更される場合がある
