# Mobile-First Visual Polish

## What Changed

- Reworked the home page section color strategy away from broad dark slabs and back toward a parchment/program-sheet base.
- Updated EventInfo to read more like a recital program sheet, with date and venue grouped for easier scanning.
- Added mobile-first Cast behavior so cards stack vertically on narrow screens while keeping the desktop multi-card layout.
- Kept the message forest as the primary immersive dark moment and tightened its mobile spacing and CTA layout.
- Lightened the behind-the-scenes closing section so the page does not stay dark after the forest moment.
- After review, made the change more visible by adding a dark ticket-stub date panel to EventInfo and changing mobile Cast cards into horizontal role cards.
- Tightened the hero-to-prologue transition by reducing Prologue height and shifting it into a compact left-rule story block.
- Swapped the message forest from the darker balanced artwork to the warmer storybook artwork.
- Added a clarity pass that reduced soft radial gradients, strengthened ink/line contrast, tightened panel radii, and made section surfaces more defined.

## Why

The previous pass added contrast, but the dark sections felt abrupt and desktop-led. This pass prioritizes mobile readability first and uses deep color as depth, framing, and atmosphere rather than as broad unrelated surfaces.

## Verification Run

- `npm run test` passed: 5 files, 22 tests.
- `npm run lint` passed.
- `npm run build` passed.
- Checked mobile first at 390x844 with screenshots for EventInfo, Cast, Messages, closing/Footer, and message form overlay.
- Checked desktop at 1440x900 with screenshots for EventInfo, Cast, Messages, and closing/Footer.
- Rechecked the stronger pass at 390x844 and 1440x900 after the layout changes.
- Rechecked the final Prologue and Message pass at 390x844 and 1440x900.
- Rechecked the clarity pass at 390x844 and 1440x900 across Prologue, EventInfo, Cast, and Message sections.

## Residual Risks

- Forest imagery was intentionally not regenerated in this task.
- Existing pending forest-image files and the existing message forest task document still need separate cleanup or selection.
- Framer Motion in-view sections can look blank in a full-page screenshot before scrolling; section-level viewport checks were used for visual review.

## Follow-ups

- Decide whether to keep the current `message-forest-balanced` imagery or generate a lighter paper-leaning version.
- Review the final visual direction once actual non-preview data is available.
