# Project Operating System

## Purpose

This document is the entry point for how this repository handles product, design, engineering, and operational work without letting important context decay into chat history.

Use this file for the smallest and most stable guidance. Companion docs hold the heavier workflow detail:

- Quality and verification: [docs/04_quality_and_verification.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/04_quality_and_verification.md)
- Operational and documentation hygiene: [docs/05_operational_hygiene.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/05_operational_hygiene.md)

## Order of Truth

When information conflicts, use this order:

1. Constitution and core principles in this document
2. Repo rules in this document
3. Active task documents in [docs/tasks/](/Users/yutogasaki/Projects/sleeping-beauty/docs/tasks)
4. Durable memory in [docs/memory/](/Users/yutogasaki/Projects/sleeping-beauty/docs/memory)
5. ADRs in [docs/adrs/](/Users/yutogasaki/Projects/sleeping-beauty/docs/adrs)
6. Done records in [docs/done/](/Users/yutogasaki/Projects/sleeping-beauty/docs/done)

Chat history is not a durable source of truth.

Skills support execution, but they do not override the layers above them.

The closer something is to the top, the smaller and more stable it should be.

## Constitution

The constitution should stay short and contain only principles that are expensive to violate.

Current constitution for this repo:

1. Never ship secrets to the client. Server-only values stay server-only.
2. No meaningful change is complete without verification.
3. Prefer small reversible changes over large speculative rewrites.
4. Production-facing UI must work on mobile and desktop.
5. Design quality is part of quality, not decoration after implementation.
6. Durable knowledge must be recorded in the right layer, not left in chat history.
7. When a rule causes more confusion than safety, refine or remove it.

## Rules

Rules are repo-specific and should stay concrete enough to guide work without becoming a second constitution.

### Engineering Rules

- Security-sensitive writes should prefer server routes over direct client writes.
- Public env vars must be safe to expose. Admin or privileged values must use server env vars.
- Before push, run at least `npm run test`, `npm run lint`, and `npm run build` for user-facing or workflow-affecting changes.
- For realtime features, treat the subscription as an enhancement and keep the initial fetch reliable.
- Centralize stable business data such as event metadata when it appears in multiple places.

### UX and Design Rules

- Every primary CTA must do something concrete.
- Avoid placeholder UI in production paths unless it is explicitly labeled as mock behavior.
- A design change is not done until spacing, states, copy, and mobile behavior are checked.
- Prefer a small number of intentional visual ideas over many generic effects.

### Operational Rules

- New operational behavior should document required env vars and failure modes.
- Admin flows should expose state clearly: counts, filters, current mode, and error conditions.
- If a manual workflow repeats more than twice, consider codifying it as a Skill.

## Working Layers

### Skills

Skills are reusable playbooks for repeated work with hidden traps or a non-obvious quality bar.

Create or update a Skill when one of these is true:

- the same category of work appears 2 or more times in a sprint
- the work has a non-obvious verification checklist
- a teammate would otherwise need a long handoff message
- the task combines design, code, and operational concerns

Use [docs/skills/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/skills/README.md) and [docs/templates/skill.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/skill.md).

### Task

Task is the active working brief. Keep it narrow, current, and specific enough that a reviewer can tell whether the work is done without reading the whole diff.

Every active task should state:

- objective
- non-goals
- scope
- acceptance criteria
- verification plan
- risks or assumptions

Use [docs/tasks/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/tasks/README.md) and [docs/templates/task.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/task.md).

### Done

Done is the closure record for a task. It is not a full changelog and not a replay of the whole working session.

Every Done record should answer:

- what changed
- why it changed
- what was verified
- what still worries us
- what should happen next, if anything

Use [docs/done/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/done/README.md) and [docs/templates/done.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/done.md).

### Memory

Memory is for durable facts that should survive individual tasks. It is not for temporary reasoning, chat summaries, or one-off debugging notes.

Each memory entry should include:

- why it is durable
- where the source of truth lives
- when it was last verified
- when it should be reconsidered

Use [docs/memory/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/memory/README.md) and [docs/templates/memory-entry.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/memory-entry.md).

### ADRs

Use ADRs for architectural or workflow decisions that should outlive the task that introduced them.

ADRs should:

- record one decision clearly
- focus on the decision rather than the whole discussion
- note testing, monitoring, or operational implications

Use [docs/adrs/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/adrs/README.md) and [docs/templates/adr.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/adr.md).

## Companion Guidance

Use the companion docs when the work needs more than the core operating model:

- [docs/04_quality_and_verification.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/04_quality_and_verification.md) for verification ladders, design review questions, and practices that improve speed without losing precision
- [docs/05_operational_hygiene.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/05_operational_hygiene.md) for operational simplicity, file-growth controls, context-pollution warnings, and additional layers such as observability or rollback notes

## Update Policy

Update the operating system when:

- the same problem appears in review 3 times
- a workflow repeats enough to justify a Skill
- a document becomes hard to use because of size
- a rule is routinely ignored because it is impractical
- a production issue reveals a missing verification step

Delete or simplify anything that is no longer improving speed, accuracy, design quality, or operations.
