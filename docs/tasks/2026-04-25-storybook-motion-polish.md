# Storybook Motion Rollback

## Objective

一度追加した上品な「眠れる森の美女」演出のうち、ユーザー確認で不要と判断された要素を戻す。

## Non-goals

- 大規模なページ再設計
- 既存CTA、メッセージ投稿、ギフトモックの仕様変更
- カウントダウンの独立セクション復活
- チケットモーダルの小画面クリップ修正の取り消し

## Scope

- スクロールで伸びる左右の蔦と小さな花を削除
- 招待状風の公演情報/アクセスカードを元の縦並び公演情報へ戻す
- スマホ向けに再構成した公演情報レイアウトを戻す
- 体感しづらかったポスターの目覚め演出を削除
- チケットモーダルのモバイル表示修正は維持

## Acceptance Criteria

- Hero poster remains the main visual and is not obscured by extra copy.
- No scroll-growing vine/flower overlays remain.
- Event date, time, venue, ticket CTA, and access link use the simpler previous presentation.
- Mobile EventInfo reads as a straightforward vertical list.
- Ticket modal opens, closes, and remains usable on small screens.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- Desktop browser review of hero, event info, and lower sections.
- Mobile browser review of hero, event info, and CTA/access links.
- Manual checks for ticket modal open/close and venue link presence.

## Risks and Assumptions

- The existing mobile poster asset is the source of truth for the mobile hero.
- Existing uncommitted work in the same files should be preserved.
