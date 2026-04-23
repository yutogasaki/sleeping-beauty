# Content Ownership

## Title

Content ownership for event metadata, ticket details, and calendar information.

## Why This Note Exists

Small event-content changes can affect the page, metadata, ticket modal, and calendar download at the same time. This note makes it clear where to edit shared event details first and where copy is still local to individual components.

## Source of Truth

- Shared event metadata: [src/lib/eventDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.ts)
- Shared guest artist copy: [src/lib/guestArtists.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/guestArtists.ts)
- Shared program chapter copy: [src/lib/programDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/programDetails.ts)
- Calendar file generation: [src/app/api/calendar/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/calendar/route.ts)
- Shared metadata checks: [src/lib/eventDetails.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.test.ts)
- Calendar route checks: [src/app/api/calendar/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/calendar/route.test.ts)

## When To Use This

Open this note when changing any of the following:

- event title or studio title
- performance date or start/end time
- venue name or access link
- calendar description, file name, or time zone
- ticket-facing date, pass code, or access CTA
- page copy that must stay aligned with the event details above
- guest artist names or affiliations
- shared chapter labels or program-card summary copy

## What To Check or Do

- Update [src/lib/eventDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.ts) first when the change affects shared event facts:
  - titles
  - venue and access links
  - date and time labels
  - countdown target
  - calendar metadata
  - ticket pass code
- Update [src/lib/guestArtists.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/guestArtists.ts) first when the change affects shared guest content:
  - guest names
  - guest affiliations
- Update [src/lib/programDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/programDetails.ts) first when the change affects shared program-card copy:
  - chapter labels
  - chapter titles
  - short summaries
  - shared program note
- After changing shared event facts, review the main consumers:
  - [src/components/EventInfo.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/EventInfo.tsx)
  - [src/components/Footer.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/Footer.tsx)
  - [src/components/Countdown.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/Countdown.tsx)
  - [src/components/TicketModal.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/TicketModal.tsx)
  - [src/app/layout.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/layout.tsx)
  - [src/app/api/calendar/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/calendar/route.ts)
- After changing shared guest artist copy, review the main consumers:
  - [src/components/EventInfo.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/EventInfo.tsx)
- After changing shared program-card copy, review the main consumers:
  - [src/components/ProgramCarousel.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/ProgramCarousel.tsx)
  - [src/components/EventInfo.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/EventInfo.tsx)
- Some presentation content is still component-local and will not update automatically from `EVENT_DETAILS`. Check these areas explicitly when the event or program changes:
  - hero title and hero tagline in [src/components/MainHero.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MainHero.tsx)
  - footer title strings in [src/components/Footer.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/Footer.tsx)
  - cast role cards in [src/components/CastCards.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/CastCards.tsx)
- If the change is a reschedule or venue move, update all time-related fields together:
  - `dateLabel`
  - `footerDateLabel`
  - `ticketDateLabel`
  - `doorsOpenLabel`
  - `startLabel`
  - `endLabel`
  - `doorsAndShowLabel`
  - `countdownTargetMs`
  - `calendarStartIso`
  - `calendarEndIso`
  - `calendarStartLabel`
  - `calendarEndLabel`
  - `calendarDescription`
- After updating event content, run the usual static checks and spot-check the rendered result:
  - `npm run test`
  - `npm run lint`
  - `npm run build`
  - verify the event info section, footer, ticket modal, and `/api/calendar` download
  - verify desktop and mobile if public-facing UI changed

## Failure Signals or Safe-Failure Behavior

- Mismatched dates or times between the event section, footer, ticket modal, and calendar export
- Countdown targeting a different time than the calendar start time
- Calendar download or Google Calendar link containing stale title, venue, or time-zone data
- Venue or studio links pointing to the wrong destination
- Footer or hero strings drifting from the shared event metadata because they remain component-local
- Guest artist names drifting between assets and the public event-info section
- Program summary copy drifting between the detailed card section and the event-info summary

Helpful current safeguards:

- [src/lib/eventDetails.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.test.ts) checks Google Calendar parameters and countdown/calendar alignment
- [src/app/api/calendar/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/calendar/route.test.ts) checks the generated ICS response

## Revisit Trigger

Revisit this note when shared event metadata is centralized further, when new event-content surfaces are added, or when a content update slips through with inconsistent public details.
