# Behind-The-Scenes Casting Image Clarity

## Objective

Replace the unclear decorative behind-the-scenes thumbnail for `2026.04.01 / 配役決定` with an image that immediately reads as a casting announcement record.

## Non-goals

- Redesign the full behind-the-scenes section.
- Add new timeline entries.
- Publish real cast names that are not already part of the site content.

## Scope

- `public/images/behind-the-scenes-casting-board.svg`
- `public/images/behind-the-scenes-casting-board.png`
- The image alt text in `src/components/BehindTheScenes.tsx`
- Verification for desktop and mobile rendering of the changed section.

## Acceptance Criteria

- The image depicts a rehearsal-room or backstage scene where a cast list has been posted.
- Supporting objects such as a script, rehearsal notebook, pencil, ballet shoes, or cloth swatches reinforce that this is a production-preparation record.
- The image still includes `2026.04.01` and `配役決定`.
- The thumbnail is legible in the existing 16:9 card on desktop and mobile.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- Manual desktop and mobile review of the behind-the-scenes section.

## Risks and Assumptions

- The image should communicate the event without requiring actual performer names.
- SVG keeps Japanese label text deterministic and local.
