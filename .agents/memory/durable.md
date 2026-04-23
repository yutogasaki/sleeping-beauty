# Shared Agent Durable Memory

This file stores shared operational reminders for the repository.
It should stay subordinate to `docs/` and should not become a second source of truth for product behavior.

## Durable Reminders

- Repo operating-system rules live in `AGENTS.md` and `docs/03_operating_system.md`
- `docs/index.md` is the fastest entry point into the repo docs
- `.agents/` is the shared operations layer for Codex and Claude Code
- `docs/tasks/*.md` holds detailed task briefs; `.agents/tasks/*.md` stays short
- `docs/memory/*.md` is for durable project knowledge; this file is for shared operational memory only
- `/.claude/settings.local.json` remains user-specific
- For frontend implementation or redesign work, prefer pairing repo guidance in `.agents/skills/sleeping-beauty-ui-taste/SKILL.md` with locally installed `gpt-tasteskill` or `taste-skill` when available
