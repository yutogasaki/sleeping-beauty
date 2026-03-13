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

## Template

Start from [docs/templates/memory-entry.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/memory-entry.md).
