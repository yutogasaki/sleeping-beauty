# Done: Memory Reverification Rule

## What Changed

- Added a lightweight stale-memory review rule to [docs/memory/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/memory/README.md).
- Updated [docs/templates/memory-entry.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/memory-entry.md) so new entries make the re-verification expectation explicit.
- Added stale-memory handling guidance to [docs/05_operational_hygiene.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/05_operational_hygiene.md).

## Why

- The repo already records `Last Verified`, but it needed a clearer rule for when that field should be revisited.
- A task-driven re-verification rule reduces stale-memory risk without adding recurring process for its own sake.

## Verification Run

- Reviewed the updated memory guidance and template together for consistency.
- Confirmed the new rule builds on existing `Last Verified` and `Revisit Trigger` fields rather than adding new process-heavy fields.
- Checked that the updated docs stay short and scannable.

## Residual Risks

- The rule still depends on contributors noticing when a task relies on an older memory entry.
- The repo does not yet automate reminders for stale entries, which is intentional for now.

## Follow-ups

- If memory entries begin to accumulate or drift despite this rule, consider a small repo checklist or lightweight automation later.
