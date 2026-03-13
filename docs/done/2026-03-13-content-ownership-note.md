# Done: Content Ownership Note

## What Changed

- Added [docs/operations/content-ownership.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/content-ownership.md) as the first concrete operational note in `docs/operations/`.
- Documented the boundary between centralized shared event metadata and still-local presentation copy.
- Captured lightweight verification guidance for event-content changes that affect UI and calendar behavior.

## Why

- The repo now has a home for operational notes, and event-content ownership was the clearest current workflow to anchor there.
- Shared event facts already live in one place, but some visible copy still lives in components. The new note reduces the chance of changing one surface and forgetting the others.

## Verification Run

- Reviewed the note against [src/lib/eventDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.ts), [src/app/api/calendar/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/calendar/route.ts), [src/lib/eventDetails.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.test.ts), [src/components/EventInfo.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/EventInfo.tsx), and [src/components/TicketModal.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/TicketModal.tsx).
- Checked that the note behaves like an operational aid rather than duplicating memory or ADR responsibilities.

## Residual Risks

- The repo still has component-local event copy, so contributors can still miss updates if they skip the note.
- This task documents the current ownership boundary but does not further centralize the remaining local strings.

## Follow-ups

- If event-content edits continue to touch multiple components, consider centralizing more title or program copy later.
