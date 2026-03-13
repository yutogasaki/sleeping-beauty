# Memory

Use this folder for durable project knowledge that should survive individual tasks.

## Good memory candidates

- stable source-of-truth locations
- important env assumptions
- repeated failure modes
- operational constraints
- decisions that affect future work

## Bad memory candidates

- temporary TODOs
- one-off debugging notes
- chat summaries
- work logs
- details that already belong in a better source-of-truth file

## Naming

Use concise topic names:

- `event-data-source-of-truth.md`
- `admin-auth-boundary.md`
- `realtime-fallback-behavior.md`

## Hygiene

Every memory entry should say:

- why it is durable
- where the primary source of truth is
- when it was last verified
- what should trigger a re-check

## Reverification Rule

Keep memory fresh with task-driven review, not calendar-driven busywork.

- Re-check a memory entry when the current task depends on it.
- Re-check a memory entry after a production issue, architectural change, or workflow change touches that area.
- If an entry is older than about 90 days and you are relying on it for current work, verify it before treating it as current.
- When an entry is still correct, update `Last Verified` instead of rewriting the whole note.
- When an entry is no longer durable or no longer true, trim it, replace it, or move the outcome to a better source of truth.

## Template

Start from [docs/templates/memory-entry.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/memory-entry.md).
