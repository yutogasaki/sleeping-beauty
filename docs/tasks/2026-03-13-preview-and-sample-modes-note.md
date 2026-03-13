# Task: Preview and Sample Modes Note

## Objective

Add an operational note that explains the repo's preview and sample-data behaviors so contributors can tell when the UI is showing live data, forced preview data, or fallback sample data.

## Non-goals

- Change preview or sample-mode behavior
- Add a formal staging environment
- Expand the note into a full QA guide

## Scope

- Document the public `?preview=true` mode
- Document public sample-data fallback behavior when Supabase is unavailable
- Document admin sample mode when client Supabase is unavailable
- Clarify the boundaries and limitations of each mode

## Acceptance Criteria

- The note explains how preview mode is enabled and what it affects.
- The note explains when sample data appears on the public site and admin page.
- The note distinguishes deliberate preview mode from automatic fallback mode.
- The note makes it clear which modes should not be treated as production truth.

## Verification

- Review the note against:
  - [src/components/HomeContent.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/HomeContent.tsx)
  - [src/lib/PreviewContext.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/PreviewContext.tsx)
  - [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx)
  - [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx)
  - [src/lib/sampleData.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/sampleData.ts)
- Confirm the note complements, rather than duplicates, [docs/operations/message-workflow-runbook.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/message-workflow-runbook.md).

## Risks and Assumptions

- If the note is too vague, contributors may still confuse preview and fallback behavior.
- If it repeats the full message workflow debugging guidance, it will overlap too much with the existing runbook.
- The useful boundary is mode semantics: how to activate a mode, what it changes, and what you should not conclude from it.
