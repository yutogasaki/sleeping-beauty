# Forest Ornament Imagery

## Status

Completed on 2026-04-26. See [docs/done/2026-04-26-forest-ornament-imagery.md](../done/2026-04-26-forest-ornament-imagery.md).

## Objective

Add generated forest-and-rose decorative imagery to the public home page so the site feels richer and more storybook-like without weakening readability or CTA behavior.

## Non-goals

- Do not redesign the hero poster or change event content.
- Do not change message submission, ticket, or admin data flows.
- Do not overwrite existing user-edited image assets.

## Scope

- Generate a new decorative bitmap asset inspired by the existing romantic rose/forest visual language.
- Place the asset as non-interactive atmosphere around public-page sections.
- Support a section-spanning composition on desktop and a cropped, lower-density treatment on mobile.

## Acceptance Criteria

- Decorative imagery can overlap section boundaries on desktop without covering headings, body copy, forms, or CTAs.
- Mobile layout keeps decoration behind or outside core content and avoids horizontal scrolling.
- Asset is saved under `public/images/` and referenced from the app.
- Existing primary CTAs remain visible and clickable.

## Verification Plan

- Run `npm run test`.
- Run `npm run lint`.
- Run `npm run build`.
- Manually review desktop and mobile render of the changed home-page sections.
