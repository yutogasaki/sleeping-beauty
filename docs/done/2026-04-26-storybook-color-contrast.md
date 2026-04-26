# Storybook Color Contrast

## What Changed

- Shifted the global dark palette away from navy and toward deep forest green, wood brown, oxblood rose, and antique gold.
- Darkened the primary CTA treatment so button text stays readable against the rose tone.
- Added section-level color treatments so event info, messages, behind-the-scenes, and footer create stronger rhythm while cast/gift surfaces keep the antique paper relief.
- Added a `sizes` hint to the decorative crown image in the message section.

## Why

- The page felt too beige because paper tones were being used as full-width backgrounds across too many consecutive sections.
- A direct navy return would have clashed with the current poster, cast medallions, and old storybook direction.

## Verification Run

- `npm run lint`
- `npm run test`
- `npm run build`
- Playwright desktop visual review at 1440px wide for hero, event info, cast, messages, behind-the-scenes, and footer.
- Playwright mobile visual review at 390px wide for hero, event info, and messages.

## Residual Risks

- The message background asset itself still contains cool blue forest tones; the surrounding palette now uses green/brown framing, but a warmer custom asset would be the deeper fix if that section still feels too blue.
- Browser console still reports a Next.js LCP hint for `rose_full_bg.png` when reloading from the message scroll position. This is performance guidance, not a rendering error.

## Follow-ups

- If the color direction feels right, tune the cast section one more notch darker or add a transitional ornament between cast and messages.
