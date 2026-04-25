# Done: Storybook Motion Rollback

## What Changed

- スクロールで伸びる左右の蔦と小さな花の装飾を削除しました。
- 招待状風の公演情報/アクセスカードを戻し、元の縦並びの公演情報にしました。
- スマホ向けに再構成した公演情報レイアウトを戻しました。
- 体感しづらかったポスターの目覚め演出と関連CSSを削除しました。
- チケットモーダルが小さい画面で上端クリップしないようにする修正は残しました。

## Why

- ユーザー確認で、蔦・花、招待状風カード、スマホ公演情報レイアウトは元に戻したい方針になったためです。
- ポスターの目覚め演出は視覚的な効果が弱く、残す価値が低いと判断しました。

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Desktop browser review of hero, event info, ticket modal, and horizontal overflow
- Mobile browser review of hero, event info, ticket modal, and horizontal overflow
- DOM check confirmed no storybook vine, hero wake, or invitation/access classes remain.

## Residual Risks

- Dev-mode browser console still reports one Framer Motion scroll-offset warning; there were no browser console errors.
- Existing uncommitted public-home changes were already present before this task and were preserved.
