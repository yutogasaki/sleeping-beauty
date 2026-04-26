# Responsive Hero Visual Set

## What Changed

- Replaced the home hero artwork with four supplied responsive visuals:
  - wide desktop: `sleeping-beauty-hero-wide.png`
  - standard desktop: `sleeping-beauty-hero-desktop.png`
  - tablet/intermediate: `sleeping-beauty-hero-tablet.png`
  - mobile: `sleeping-beauty-hero-mobile.png`
- Updated hero CSS media queries so viewport shape selects the appropriate composition.
- Updated the mobile hero intrinsic height calculation to match the new tall mobile image.

## Why

The new artwork was produced specifically for web hero use, with different compositions for wide, desktop, tablet, and mobile screens. Selecting by viewport shape preserves the important text and stage-like illustration better than forcing one poster into every screen.

## Verified

- `npm run test`
- `npm run lint`
- `npm run build`
- Playwright browser check confirmed:
  - 1440x900 uses desktop artwork
  - 2560x1080 uses wide artwork
  - 820x1180 uses tablet artwork
  - 390x844 uses mobile artwork

## Residual Risk

- The artwork still contains text, so future layout changes should keep using `contain` unless the images are remade as background-only layers with HTML text.
