# Mobile-First Visual Polish

## Objective

Refine the home page visual system so the site feels intentional on mobile first, then scales cleanly to desktop. Keep the antique ballet storybook direction while reducing abrupt dark color fields and improving section rhythm.

## Non-goals

- Do not change message submission, Supabase, or admin behavior.
- Do not regenerate or replace the forest imagery in this task.
- Do not rewrite the home page structure or change event content.

## Scope

- Home page visual surface and responsive layout.
- `src/app/globals.css`
- `src/components/EventInfo.tsx`
- `src/components/CastCards.tsx`
- `src/components/MessagesSection.tsx`
- `src/components/Footer.tsx` if needed for closing rhythm.

## Acceptance Criteria

- Mobile is checked first and reads as a deliberate design rather than a squeezed desktop layout.
- The page keeps a parchment/storybook base; deep forest, wood, and oxblood tones are used as depth, frame, or the message forest moment rather than broad unrelated slabs.
- Event information feels like a recital program sheet and remains easy to scan on mobile.
- Cast cards prioritize vertical mobile reading instead of forcing desktop layout behavior.
- Existing CTA behavior remains intact, including ticket/access links and message submission entry points.
- Forest images are left as-is for this task.

## Verification

- Run `npm run test`.
- Run `npm run lint`.
- Run `npm run build`.
- Manually check mobile before desktop.
- Check desktop after mobile to confirm the page still has enough hierarchy and no awkward color jumps.
- Confirm message form/archive overlays remain reachable and readable.

## Risks and Assumptions

- The current forest image may still need a later art-direction pass.
- Existing generated image files in `public/images/message-forest-*` are preserved and not adjudicated in this task.
- Inline styles remain in several components, so the polish should use targeted class hooks instead of broad rewrites.
