# Preview and Sample Modes

## Title

Operational note for public preview mode and sample-data fallbacks.

## Why This Note Exists

This repo has more than one non-live display mode. Some are deliberate, such as `?preview=true` on the public page. Others are automatic safe-failure paths, such as showing sample messages when Supabase is unavailable. This note explains the difference so contributors do not mistake preview output for production truth.

## Source of Truth

- Public preview toggle: [src/components/HomeContent.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/HomeContent.tsx)
- Preview context: [src/lib/PreviewContext.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/PreviewContext.tsx)
- Public messages fallback behavior: [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx)
- Admin sample-mode behavior: [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx)
- Sample data definitions: [src/lib/sampleData.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/sampleData.ts)

## When To Use This

Open this note when:

- reviewing the site in preview mode
- checking whether displayed messages are live or sample data
- checking why the admin page is showing sample data
- preparing screenshots or manual QA notes
- deciding whether a behavior is a safe fallback or a real data-path success

## What To Check or Do

- Public preview mode is enabled with `?preview=true` on the public page.
  - It is read in [src/components/HomeContent.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/HomeContent.tsx).
  - The page shows a fixed `PREVIEW MODE — サンプルデータを表示中` banner.
  - The preview flag is passed through [src/lib/PreviewContext.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/PreviewContext.tsx).
- In the current implementation, preview mode mainly affects the messages section:
  - [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx) uses `SAMPLE_MESSAGES` immediately when preview mode is active.
  - This is a deliberate preview path, not an integration failure.
- Public sample fallback can also happen without `?preview=true`:
  - if the client Supabase instance is unavailable
  - if the approved-message fetch errors
  - if the approved-message query returns no rows
  - in those cases, [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx) also shows `SAMPLE_MESSAGES`
- Admin sample mode is different from public preview mode:
  - it does not depend on `?preview=true`
  - it happens when [src/lib/supabaseClient.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/supabaseClient.ts) cannot create a client
  - [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx) then uses `SAMPLE_ADMIN_MESSAGES`
  - the admin UI displays `DB未接続: サンプルデータを表示しています`
  - approve/delete actions mutate only local UI state in this mode
- When checking a screen or collecting evidence, note which mode you are in:
  - live data
  - public preview mode
  - public fallback sample mode
  - admin sample mode
- Do not use preview or sample modes as proof that persistence, realtime updates, or moderation are working.
  Use the live route and admin flows for that confirmation.

## Failure Signals or Safe-Failure Behavior

- Public page shows the preview banner because `?preview=true` is active
- Public messages look populated even though live data is missing, because sample fallback is masking the empty or failing integration path
- Admin page shows a sample-data banner because client Supabase is unavailable
- Admin moderation appears to work in sample mode, but changes are not persisted
- Contributors may confuse preview output with live content if screenshots or notes do not mention the current mode

Helpful current cues:

- public preview banner in [src/components/HomeContent.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/HomeContent.tsx)
- admin sample banner in [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx)
- sample-data sources in [src/lib/sampleData.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/sampleData.ts)

## Revisit Trigger

Revisit this note when preview mode affects more than the messages section, when a real staging environment is introduced, or when sample-data fallback rules change.
