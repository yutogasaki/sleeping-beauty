# Done: Message Workflow Runbook

## What Changed

- Added [docs/operations/message-workflow-runbook.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/message-workflow-runbook.md) for public message submission, admin auth, and moderation support checks.
- Documented current env assumptions, safe-failure behavior, sample-data fallback behavior, and the most useful console and network entry points.
- Linked the runbook back to the current route tests so support guidance stays grounded in verified behavior.

## Why

- The repo now has a home for operational notes, and the message workflow is one of the highest-risk user and operator flows.
- A short runbook makes it easier to debug issues without mixing support guidance into memory or architectural docs.

## Verification Run

- Reviewed the note against [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx), [src/app/api/messages/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.ts), [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx), [src/app/api/admin/session/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.ts), and [src/lib/supabaseClient.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/supabaseClient.ts).
- Checked the runbook against existing route tests for message submission and admin session behavior.

## Residual Risks

- The repo still lacks external monitoring, so this runbook depends on browser-visible and log-visible signals.
- Sample-data fallback can still mask missing integrations if contributors do not notice the UI banners or read the runbook.

## Follow-ups

- If the repo gains dashboards or error monitoring later, extend this runbook with those entry points instead of creating a second overlapping note.
