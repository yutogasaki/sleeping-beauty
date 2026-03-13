# Operations

Use this folder for lightweight operational notes that help contributors run, support, or safely change the system.

Operational notes are support docs, not the top source of truth. They should point back to the real owner of the fact:

- code or route files for implementation behavior
- memory for durable cross-task facts
- ADRs for long-lived decisions
- tasks and done records for active work and completed changes

## Good Operational Note Candidates

- observability entry points and what to check first
- rollback triggers or safe backout steps
- admin or release runbooks
- content ownership notes for business-managed text, dates, or links
- thin integration-failure playbooks

## Bad Operational Note Candidates

- architecture decisions that belong in ADRs
- stable facts that belong in memory
- long incident timelines or historical narratives
- one-off debugging notes
- duplicated setup instructions when another doc already owns them

## Naming

Use concise workflow or topic names:

- `content-ownership.md`
- `rollback-triggers.md`
- `admin-moderation-runbook.md`
- `observability-entry-points.md`

## Hygiene

Each operational note should say:

- why the note exists
- where the source of truth lives
- who uses it or when it matters
- what to check, do, or avoid
- what failure signals or safe-failure behavior matter
- what should trigger a revisit

Keep notes short and link out instead of duplicating large chunks of policy or implementation detail.

## Template

Start from [docs/templates/operations-note.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/operations-note.md).
