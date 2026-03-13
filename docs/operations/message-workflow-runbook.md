# Message Workflow Runbook

## Title

Operational checks for public message submission and admin moderation.

## Why This Note Exists

The message workflow spans a public display surface, a server submission route, admin authentication, and a moderation UI. When something breaks, the symptom might show up in the public page, the admin page, the network response, or the console. This note gathers the current entry points in one place.

## Source of Truth

- Public message UI: [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx)
- Submission route: [src/app/api/messages/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.ts)
- Submission validation and limits: [src/lib/messageSubmission.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/messageSubmission.ts)
- Admin page: [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx)
- Admin session route: [src/app/api/admin/session/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.ts)
- Admin auth helpers: [src/lib/adminAuth.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/adminAuth.ts)
- Client Supabase setup: [src/lib/supabaseClient.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/supabaseClient.ts)
- Route checks:
  - [src/app/api/messages/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.test.ts)
  - [src/app/api/admin/session/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.test.ts)

## When To Use This

Open this note when any of the following happens:

- public messages stop appearing or look stale
- message submission fails, rate-limits unexpectedly, or claims success without showing up later
- admin login fails
- admin moderation actions fail or show sample data unexpectedly
- a change touches Supabase envs, admin PIN setup, or moderation behavior

## What To Check or Do

- Start by identifying which layer is failing:
  - public display only
  - message submission route
  - admin authentication
  - admin moderation data or updates
- Check current env assumptions:
  - public/admin client access depends on `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` through [src/lib/supabaseClient.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/supabaseClient.ts)
  - server-side message persistence depends on `NEXT_PUBLIC_SUPABASE_URL` plus `SUPABASE_SERVICE_ROLE_KEY` or fallback `NEXT_PUBLIC_SUPABASE_ANON_KEY` in [src/app/api/messages/route.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.ts)
  - admin login depends on `ADMIN_PIN` in [src/lib/adminAuth.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/adminAuth.ts)
- Public page behavior to remember:
  - if preview mode is active or client Supabase is unavailable, [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx) shows `SAMPLE_MESSAGES`
  - if the approved-message fetch errors, the public page also falls back to `SAMPLE_MESSAGES`
  - realtime updates are enhancement-only; the initial approved-message fetch is still the main path
- Submission route behavior to remember:
  - invalid input returns `422`
  - repeat submissions inside the cooldown return `429`
  - honeypot submissions return success without persistence
  - missing server-side Supabase envs return `503`
  - insert failures return `500`
- Admin behavior to remember:
  - if `ADMIN_PIN` is missing, the login screen explains that login is unavailable and `/api/admin/session` returns `503` with `error: "not_configured"`
  - invalid PIN returns `401` with `error: "invalid_pin"`
  - if client Supabase is unavailable, the admin page still works in sample mode using `SAMPLE_ADMIN_MESSAGES`
  - in sample mode, the admin page shows a `DB未接続: サンプルデータを表示しています` banner
  - moderation approve/delete actions mutate sample state locally when Supabase is unavailable, so that UI state is not production persistence
- When debugging, check both the user-visible UI and the console/network surface:
  - browser console for `Error fetching messages:`, `Error submitting message:`, `Error checking admin session:`, `Error creating admin session:`, `Error updating message:`, `Error deleting message:`
  - server logs for `Error inserting message:`
  - network responses from `/api/messages` and `/api/admin/session`
- After fixing a workflow issue, run the usual checks and the targeted flow:
  - `npm run test`
  - `npm run lint`
  - `npm run build`
  - submit a message
  - confirm the admin login path
  - confirm moderation updates on the admin page

## Failure Signals or Safe-Failure Behavior

- Public message area shows sample data because client Supabase is missing or fetch failed
- Submitted message appears to succeed, but moderation or persistence never happened
- Public submission shows a cooldown message because the 30-second cookie guard is still active
- Admin login UI is disabled because `ADMIN_PIN` is missing
- Admin page shows sample-data banner instead of live data
- Admin approve/delete action updates the UI locally in sample mode but does not persist anywhere
- Console errors appear during fetch, login, insert, update, or delete operations

Helpful current safeguards:

- [src/app/api/messages/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.test.ts) covers validation failure, honeypot behavior, cooldown blocking, missing env behavior, and success persistence
- [src/app/api/admin/session/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.test.ts) covers missing `ADMIN_PIN`, invalid PIN, authenticated session reads, login cookie creation, and logout cookie clearing

## Revisit Trigger

Revisit this note when the repo adds real observability tooling, changes the Supabase integration boundary, changes admin auth behavior, or replaces the current sample-data fallback patterns.
