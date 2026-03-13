# AGENTS.md

## Purpose

This repository uses a lightweight operating system for product, design, engineering, and operational work.

The source document is [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md). This file turns that model into direct working instructions for agents and contributors.

## Order of Truth

When information conflicts, use this order:

1. Constitution and core principles in `docs/03_operating_system.md`
2. Repo rules in `docs/03_operating_system.md`
3. Active task documents in `docs/tasks/`
4. Durable memory in `docs/memory/`
5. ADRs in `docs/adrs/`
6. Done records in `docs/done/`

Chat history is not a durable source of truth.

## Core Working Rules

1. Never expose secrets in client code. Use server-only env vars for privileged behavior.
2. No meaningful change is complete without verification appropriate to the risk.
3. Prefer small reversible changes over broad rewrites.
4. UI work must be checked on desktop and mobile.
5. Replace placeholders in production paths, or label them clearly as mock behavior.
6. If a workflow repeats, codify it in docs instead of relying on memory.

## Before You Change Code

- Read the relevant spec or implementation doc in `docs/`.
- If the task is non-trivial, create or update an active task file in `docs/tasks/`.
- Record acceptance criteria and verification before implementation when possible.
- If the work changes a long-lived decision, plan an ADR or memory update too.

## While You Work

- Keep changes scoped and reviewable.
- Prefer server routes for sensitive writes or moderation logic.
- Centralize stable shared content instead of duplicating it across components.
- If you notice a repeated review comment or repeated manual flow, propose a Rule or Skill update.

## Verification Minimums

For user-facing or operational changes, normally run:

- `npm run test`
- `npm run lint`
- `npm run build`

Also add targeted manual verification when applicable:

- changed CTA paths
- admin flows
- mobile layout
- error states
- missing env behavior

Use [docs/templates/verification-checklist.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/verification-checklist.md) if you need a checklist.

## Documentation Rules

- Active work goes in `docs/tasks/`
- Completed work summaries go in `docs/done/`
- Durable facts go in `docs/memory/`
- Architectural decisions go in `docs/adrs/`
- Thin operational notes and runbooks go in `docs/operations/`
- Reusable playbooks go in `docs/skills/`

Do not store long progress logs in memory documents.

## File Growth and Context Hygiene

- Keep constitution and rule text small.
- Split docs by workflow or domain once they stop being fast to scan.
- Do not duplicate the same rule across many files.
- Do not treat chat summaries as durable documentation.
- If a document becomes mostly historical narrative, move the outcome to `done` or `memory` and trim the rest.

## Naming Conventions

- Tasks: `docs/tasks/YYYY-MM-DD-short-title.md`
- Done: `docs/done/YYYY-MM-DD-short-title.md`
- Memory: `docs/memory/short-topic.md`
- ADRs: `docs/adrs/NNNN-short-title.md`
- Operations: `docs/operations/short-topic.md`
- Skills: `docs/skills/short-workflow.md`

## Good Defaults For This Repo

- Product and UI changes: verify CTA behavior, copy, layout, and mobile.
- Admin changes: verify auth, state visibility, counts, filters, and safe failure behavior.
- Data flow changes: verify fallback behavior when Supabase or env vars are missing.
- Realtime changes: verify both initial fetch and live update path.

## When To Update Docs

Update docs when:

- the same workflow repeats
- a production issue reveals a missing check
- a stable decision will matter to future tasks
- a task changes how contributors should work

If the docs do not make future work faster or safer, simplify them.
