# Vintage Poster UI Polish

## What Changed

- Public top page styling was shifted toward an antique ballet-program look: warm paper background, fine ornamental rules, muted rose/sage/gold palette, parchment panels, and framed dark forest message section.
- Existing section order, labels, CTA meanings, flip-card behavior, message form, and gift mock flow were preserved.
- Ticket, message, and gift overlays now raise their parent section while open so later sections cannot intercept clicks.

## Why

- The requested direction was to keep the original UI and card formats, but align the design taste with the provided poster-style reference image.

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwright desktop and mobile visual review
- CTA checks: ticket modal open/close, message form open, gift selection, gift mock success display

## Residual Risks

- Full-page screenshots can show below-fold animated sections as blank until scrolled into view because Framer Motion reveal animations intentionally trigger on viewport entry.

## Follow-ups

- Consider a dedicated mobile hero artwork if the site needs to match the vertical mobile reference more closely.
