# Responsive Hero Visual Set

## Objective

Replace the home hero with the four newly produced Sleeping Beauty hero visuals so each major viewport shape gets an appropriate composition.

## Non-goals

- Do not redesign the surrounding home page sections.
- Do not change CTA behavior or event metadata.
- Do not alter existing unrelated in-progress UI changes.

## Scope

- Home hero image assets in `public/images/`
- Hero background selection in `src/app/globals.css`
- Completion record in `docs/done/`

## Acceptance Criteria

- Wide desktop uses the 21:9 visual.
- Standard desktop uses the 16:9 visual.
- Tablet and intermediate portrait layouts use the poster-style visual.
- Mobile uses the tall dedicated visual.
- The hero remains full viewport height without exposing the next section on first load.
- Important text in the image remains readable at desktop and mobile breakpoints.

## Verification

- Run `npm run lint`
- Run `npm run build`
- Manually inspect desktop and mobile hero layout if a browser session is available.

## Risks and Assumptions

- The supplied images include text, so CSS must preserve the artwork without aggressive cropping.
- Existing uncommitted changes outside the hero are assumed to belong to the user or another task and should not be reverted.
