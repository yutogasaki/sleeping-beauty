# ADR 0001: Project Operating System

## Status

Accepted

## Context

The repository had implementation and setup docs, but no clear operating model for where to place active tasks, durable knowledge, reusable workflows, or completion records. As work expanded across product, design, engineering, and operations, too much context risked living only in chat history.

## Decision

Adopt the project operating system defined in [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md), with the following working folders:

- `docs/tasks/`
- `docs/done/`
- `docs/memory/`
- `docs/adrs/`
- `docs/skills/`

Add `AGENTS.md` at the repo root to translate this model into direct contributor instructions.

## Consequences

- Development should become easier to resume across sessions.
- Repeated work can move into Skills instead of relying on ad hoc prompts.
- Durable facts have a home outside chat logs.
- The repo gains more structure, which introduces some maintenance cost.

## Verification Impact

Future changes should verify not only code, but also whether task, memory, skill, or ADR updates are needed when the change affects repo workflow or long-lived decisions.

## Revisit Trigger

Revisit this ADR if the documentation model becomes hard to maintain, contributors stop using it, or the folders become noisy enough to slow work instead of clarifying it.
