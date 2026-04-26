# Storybook Color Contrast

## Status

Completed on 2026-04-26. See [docs/done/2026-04-26-storybook-color-contrast.md](../done/2026-04-26-storybook-color-contrast.md).

## Objective

Reduce the beige-on-beige feeling on the public home page while keeping the current antique ballet storybook direction.

## Non-goals

- Do not return the page to a navy-led palette.
- Do not change ticket, message, admin, or data flow behavior.
- Do not redesign section order, content, or CTAs.

## Scope

- Public home page color tokens and section background treatment.
- Main visual surfaces: prologue, event info, cast, messages, behind-the-scenes, and footer.

## Acceptance Criteria

- The page gains stronger contrast without introducing a sudden navy block.
- Paper colors remain as framed surfaces rather than dominating every full-width section.
- Darker sections use deep forest, wood, oxblood, and antique gold tones that fit the existing poster and cast imagery.
- Existing CTA meanings and message submission behavior remain unchanged.
- Desktop and mobile layouts remain readable.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- Desktop visual check of the public home page.
- Mobile visual check of the public home page.

## Risks and Assumptions

- Existing uncommitted UI and asset changes are present; this task should layer on top without reverting them.
- Color balance may still need a second visual pass after viewing real screenshots.
