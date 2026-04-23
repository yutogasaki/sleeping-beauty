# Sleeping Beauty Shared Agent Guide

This file is the shared operations entry point for Codex and Claude Code in this repository.

Shared canonical guide:

- `/Users/yutogasaki/Projects/_common-ai/PROJECTS_COMMON_AI_GUIDE.md`

## Repo Snapshot

- Product: public event site and lightweight admin workflow for Sleeping Beauty
- Stack: Next.js App Router, React 19, TypeScript, Supabase, Vitest
- Main surfaces: marketing home page, ticket CTA flow, message submission, admin session route
- Current priority: keep the public experience polished and the operational workflow easy to verify

## Read Order

1. `AGENTS.md`
2. `docs/index.md`
3. `docs/03_operating_system.md`
4. `docs/04_quality_and_verification.md`
5. `docs/05_operational_hygiene.md`
6. `.agents/tasks/TASKS.md`
7. `.agents/memory/durable.md`
8. Relevant files in `docs/tasks/`, `docs/operations/`, and `docs/skills/`

## Canonical Boundaries

- Long-lived project truth: `docs/`
- Shared agent operations: `.agents/`
- Claude adapter files: `.claude/`
- Codex adapter files: `.codex/`

Do not duplicate the same durable rule across those layers.

## Repo Rules

- Keep secrets out of client code
- No meaningful change is done without verification
- Prefer small reversible changes over broad rewrites
- UI work must keep CTA behavior, copy, layout, and mobile quality intact
- Stable workflow knowledge should move into docs instead of staying in chat

## Key Docs

- Product and concept: `docs/01_concept_and_spec.md`
- Implementation plan: `docs/02_implementation_plan.md`
- Supabase setup: `docs/02_supabase_setup.md`
- Operating model: `docs/03_operating_system.md`
- Verification guidance: `docs/04_quality_and_verification.md`
- Operational notes: `docs/operations/`
- Workflow skills: `docs/skills/`

## Key Commands

- `npm run dev`
- `npm run test`
- `npm run lint`
- `npm run build`

## Tasks And Memory

- `.agents/tasks/TASKS.md`
  Shared short queue for active work
- `.agents/tasks/BLOCKED.md`
  Shared blocked queue
- `.agents/tasks/DONE.md`
  Shared completion index
- `docs/tasks/*.md`
  Detailed task briefs and execution context
- `.agents/memory/durable.md`
  Shared operational memory only
- `docs/memory/*.md`
  Durable project memory

## Shared Skills

- `.agents/skills/sleeping-beauty-ui-taste/SKILL.md`
  Repo-specific guidance for pairing this project's frontend work with locally installed `taste-skill` or `gpt-tasteskill`
- `docs/skills/ui-polish-review.md`
  UI review expectations for public and admin surfaces
- `docs/skills/release-readiness-checks.md`
  Release-oriented checks for higher-risk changes
- `docs/skills/route-testing.md`
  Lightweight route-test workflow
