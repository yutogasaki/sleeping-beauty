# Task: Message Workflow Runbook

## Objective

Add an operational note for the public message-submission flow and admin moderation flow so contributors can quickly check the right env assumptions, user-visible fallbacks, and failure signals when something goes wrong.

## Non-goals

- Change the message workflow behavior itself
- Add external observability tools or dashboards
- Introduce a formal incident-response process

## Scope

- Document the public message display and submission behavior
- Document the admin auth and moderation behavior
- Capture the current safe-failure and sample-data fallbacks
- Point to the main code and test entry points for support and verification

## Acceptance Criteria

- The note explains where the public message and admin moderation flows are implemented.
- The note captures the main env assumptions and fallback modes.
- The note lists the most important visible symptoms and code-level entry points when something breaks.
- The note stays grounded in the current implementation and reads like an operational runbook rather than a general architecture memo.

## Verification

- Review the note against:
  - [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx)
  - [src/app/api/messages/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.ts)
  - [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx)
  - [src/app/api/admin/session/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.ts)
  - [src/lib/supabaseClient.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/supabaseClient.ts)
- Review the note against the current route tests so failure guidance matches existing verification.

## Risks and Assumptions

- The repo does not yet have external monitoring, so this note should focus on current browser-visible, route-visible, and console-visible signals.
- Some fallback behavior is intentionally mock-like or sample-data based; the note should describe that clearly without treating it as production success.
