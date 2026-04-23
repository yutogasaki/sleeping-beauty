# Sleeping Beauty Claude Guide

This file is the Claude-specific entry point for the repository.
Shared project truth should stay in `docs/` and `.agents/`.

Shared canonical guide:

- `/Users/yutogasaki/Projects/_common-ai/PROJECTS_COMMON_AI_GUIDE.md`

## Read Order

1. `AGENTS.md`
2. `docs/index.md`
3. `docs/03_operating_system.md`
4. `docs/04_quality_and_verification.md`
5. `.agents/agent-guide.md`
6. `.agents/tasks/TASKS.md`
7. `.agents/memory/durable.md`
8. Relevant files in `docs/tasks/`, `docs/operations/`, and `docs/skills/`

## Claude-Specific Notes

- Shared operational truth belongs in `.agents/`, not in Claude-only notes
- Repo-local durable docs belong in `docs/`
- `.claude/settings.local.json` remains user-specific
- For frontend polish, pair repo guidance in `.agents/skills/sleeping-beauty-ui-taste/SKILL.md` with locally installed `taste-skill` or `gpt-tasteskill` when available

## Key Commands

- `npm run dev`
- `npm run test`
- `npm run lint`
- `npm run build`
