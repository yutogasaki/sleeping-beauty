# Done: Operational Notes Home

## What Changed

- Added [docs/operations/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations/README.md) as a lightweight home for operational notes and runbooks.
- Added [docs/templates/operations-note.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/operations-note.md) for recurring operational-note structure.
- Updated [docs/05_operational_hygiene.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/05_operational_hygiene.md) and [AGENTS.md](/Users/yutogasaki/Projects/sleeping-beauty/AGENTS.md) so contributors know when to use `docs/operations/`.

## Why

- The repo already recognized observability, rollback, and content-ownership notes as important, but did not give them a stable home.
- A thin operational-notes layer keeps that material out of memory and ADRs while still preserving it in the repo.

## Verification Run

- Reviewed the new operations README and template together for scope and clarity.
- Checked that the guidance distinguishes operational notes from memory, ADRs, task files, and done records.
- Reviewed the updates to [docs/05_operational_hygiene.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/05_operational_hygiene.md) and [AGENTS.md](/Users/yutogasaki/Projects/sleeping-beauty/AGENTS.md) for consistency.

## Residual Risks

- The repo does not yet have actual operational notes in the new folder, so adoption still depends on future tasks using it.
- If contributors treat `docs/operations/` as a general dumping ground, it could accumulate duplicated material.

## Follow-ups

- When the next observability, rollback, or content-ownership workflow comes up, create the first concrete note in [docs/operations/](/Users/yutogasaki/Projects/sleeping-beauty/docs/operations).
