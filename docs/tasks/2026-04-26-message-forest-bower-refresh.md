# Message Forest Balanced Background Refresh

## Objective

Refresh the "森に灯る光" message-section background with a generated forest image that feels softly enchanted, readable, and consistent with the site's antique ballet-program atmosphere, including a dedicated mobile portrait version.

## Non-goals

- Change the top poster hero visual.
- Redesign the full home page.
- Change ticket, message submission, or admin behavior.

## Scope

- Message-section background assets.
- Responsive desktop and mobile background switching for the message section.

## Acceptance Criteria

- Desktop message section uses a single horizontal sage/olive forest background.
- Mobile message section uses a single portrait sage/olive forest background.
- The background keeps the center readable while adding small warm forest lights and restrained rose/vine detail near the edges.
- The image avoids both overly black night-forest contrast and overly pale parchment contrast.
- The top poster hero remains unchanged.
- Background images do not double-render.

## Verification

- Run `npm run test`.
- Run `npm run lint`.
- Run `npm run build`.
- Manually review the message section on desktop and mobile widths.

## Risks and Assumptions

- The attached reference is a mood/composition reference, not an edit target.
- The mobile portrait image is a matched concept rather than an exact crop of the desktop image.
