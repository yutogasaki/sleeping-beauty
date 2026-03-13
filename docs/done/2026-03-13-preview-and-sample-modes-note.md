# Done: Preview and Sample Modes Note

## What Changed

- Added [docs/operations/preview-and-sample-modes.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/preview-and-sample-modes.md) to document public preview mode and sample-data fallback behavior.
- Clarified the difference between deliberate preview mode, public fallback sample mode, and admin sample mode.
- Captured the main cues contributors should use before treating a screen as live behavior.

## Why

- The repo already had preview and sample-data behavior, but it was easy to confuse them with real live-data success.
- A thin operational note makes QA, screenshots, and support checks more reliable without changing any code behavior.

## Verification Run

- Reviewed the note against [src/components/HomeContent.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/HomeContent.tsx), [src/lib/PreviewContext.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/PreviewContext.tsx), [src/components/MessagesSection.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/components/MessagesSection.tsx), [src/app/admin/page.tsx](/Users/yutogasaki/Projects/sleeping-beauty/src/app/admin/page.tsx), and [src/lib/sampleData.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/lib/sampleData.ts).
- Checked that the note complements [docs/operations/message-workflow-runbook.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/message-workflow-runbook.md) instead of repeating its debugging guidance.

## Residual Risks

- Public fallback sample mode can still hide missing integrations if contributors do not notice that live data is unavailable.
- Preview mode currently documents only the present implementation; if more sections start respecting preview state, this note will need an update.

## Follow-ups

- If preview usage becomes more important for UI review, consider linking this note from future UI-polish or manual-verification tasks.
