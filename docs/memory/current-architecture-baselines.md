# Current Architecture Baselines

## Title

Current architecture baselines for public site, admin auth, and message submission.

## Why This Belongs In Memory

These are stable implementation boundaries that will affect future work across multiple tasks, especially UI, admin, and operational changes.

## Source of Truth

- Public site and app structure: [src/app](/Users/yutogasaki/Projects/sleeping-beauty/src/app)
- Admin auth session route: [src/app/api/admin/session/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.ts)
- Message submission route: [src/app/api/messages/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.ts)
- Shared event metadata: [src/lib/eventDetails.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/eventDetails.ts)
- Operating model: [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md)

## Last Verified

2026-03-13

## Revisit Trigger

Revisit when auth, moderation, message submission, or event data ownership changes.

## Notes

- Admin authentication is server-session based and depends on `ADMIN_PIN`.
- Message submissions are accepted through a server route and should remain validated server-side.
- Stable event data is centralized to reduce duplicated copy and date drift.
- Realtime behavior should preserve a reliable initial fetch path.
