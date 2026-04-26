# Background Palette Refresh

## Objective

Reduce the one-note beige feel of the public site by giving major sections clearer scenic roles: paper, forest, velvet, wood, and stage light.

## Non-goals

- Do not change event content, CTA destinations, or data flow.
- Do not introduce new UI libraries.
- Do not redesign the full page structure.

## Scope

- Adjust global and section-level background treatments.
- Preserve existing typography, cards, and primary CTA behavior.
- Keep the design romantic, stage-like, readable, and mobile-safe.

## Acceptance Criteria

- The public page no longer reads as a continuous beige background.
- Section transitions feel intentional rather than randomly recolored.
- Text contrast remains clear on desktop and mobile.
- Existing buttons, cards, and interactive cast cards remain usable.

## Verification Plan

- Run `npm run test`.
- Run `npm run lint`.
- Run `npm run build`.
- Review desktop and mobile render of the changed public page.
