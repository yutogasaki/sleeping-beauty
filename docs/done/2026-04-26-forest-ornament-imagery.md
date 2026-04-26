# Forest Ornament Imagery

## What Changed

- Generated a new romantic forest-and-rose ornament bitmap for the public site.
- Added a reusable `ForestOrnament` component.
- Placed the ornament at section boundaries around the prologue/event transition, cast/messages transition, and gift/behind-the-scenes transition.
- Tuned mobile placement so the image stays peripheral and does not cover core content.

## Why

The home page needed richer storybook atmosphere in the style of the provided floral forest reference, while preserving readability and CTA behavior.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- Desktop visual review with local Chrome screenshots
- Mobile visual review in the in-app browser and local Chrome screenshots

## Residual Risk

The generated asset is decorative and intentionally reused in multiple positions. If the page later adds denser content near the same edges, the ornament placements should be rechecked.
