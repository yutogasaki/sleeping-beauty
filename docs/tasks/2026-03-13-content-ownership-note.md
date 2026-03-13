# Task: Content Ownership Note

## Objective

Add the first concrete operational note in `docs/operations/` so contributors know where event dates, venue details, calendar metadata, and still-local presentation copy should be updated.

## Non-goals

- Centralize all remaining presentation copy in this task
- Rewrite page components to remove every hardcoded title or program string
- Change the event content itself

## Scope

- Add a content-ownership operational note grounded in the current event metadata implementation
- Document the boundary between centralized event details and still-local component copy
- Capture the key checks to run when event information changes

## Acceptance Criteria

- The note clearly identifies the primary source of truth for shared event metadata.
- The note calls out the main consumers of that metadata across UI, metadata, and calendar export.
- The note identifies important content that is still component-local.
- The note gives lightweight verification guidance for event-content changes.

## Verification

- Review the note against:
  - [src/lib/eventDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.ts)
  - [src/app/api/calendar/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/calendar/route.ts)
  - [src/lib/eventDetails.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.test.ts)
  - [src/components/EventInfo.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/EventInfo.tsx)
  - [src/components/TicketModal.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/TicketModal.tsx)
- Confirm the note reads like an operational aid, not a duplicate memory entry or ADR.

## Risks and Assumptions

- Some visible copy is still intentionally local to components, so the note should help contributors update it safely without implying the repo is already fully centralized.
- The note should stay focused on current event-content workflows, not expand into a general design or product style guide.
