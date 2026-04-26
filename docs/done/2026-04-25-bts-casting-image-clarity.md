# Behind-The-Scenes Casting Image Clarity

## What Changed

- Replaced the behind-the-scenes casting thumbnail with a rehearsal-room bulletin-board image centered on a posted cast list.
- Added a cache-busting asset path, `behind-the-scenes-casting-board.svg`, plus a matching PNG preview.
- Updated the image alt text to describe the cast-list board, script, and rehearsal notebook.

## Why

The previous image read as a decorative ballet illustration rather than a clear record of the day casting was decided. The new image is meant to communicate "the cast list was posted in the rehearsal room" at a glance.

## Verified

- `xmllint --noout public/images/behind-the-scenes-casting.svg`
- `npm run test`
- `npm run lint`
- `npm run build`
- Desktop browser review at `http://localhost:3000`
- Mobile responsive review at `320 x 480`

## Still Worries Us

- Small text inside the thumbnail is naturally limited on narrow mobile screens, so the composition relies on the larger cast-list shape and stamp rather than row-level readability.

## Next

- If future behind-the-scenes entries are added, keep each thumbnail grounded in a concrete backstage object or moment instead of abstract stage decoration.
