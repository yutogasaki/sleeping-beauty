# Task: Memory Reverification Rule

## Objective

Add a lightweight rule for rechecking durable memory so future work can trust `docs/memory/` without turning memory maintenance into busywork.

## Non-goals

- Create a scheduled review process for every memory entry
- Add automation or CI enforcement for memory freshness
- Expand memory into a larger documentation layer

## Scope

- Update [docs/memory/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/memory/README.md) with a simple re-verification rule
- Update [docs/templates/memory-entry.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/memory-entry.md) so new entries carry the expectation clearly
- Update [docs/05_operational_hygiene.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/05_operational_hygiene.md) so stale-memory handling is part of documentation hygiene

## Acceptance Criteria

- The memory guidance explains when contributors should re-check an existing memory entry before relying on it.
- The rule stays lightweight and favors task-driven re-verification over calendar-driven ceremony.
- The memory-entry template reflects the re-verification expectation without adding unnecessary fields.
- The updated guidance stays short and consistent with the current operating-system docs.

## Verification

- Review the updated memory guidance and template together for clarity and consistency.
- Confirm the new rule works with the existing fields `Last Verified` and `Revisit Trigger`.
- Check that the updated docs remain short and easy to scan.

## Risks and Assumptions

- A rule that is too vague will not reduce stale-memory risk.
- A rule that is too strict will create busywork and discourage memory updates.
- The right balance is a task-driven prompt: refresh memory when work depends on it or when the entry is getting old, not on an unconditional schedule.
