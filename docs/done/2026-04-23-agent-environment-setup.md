# Done: Agent Environment Setup

## What Changed

- Added a root pointer to `/Users/yutogasaki/Projects/_common-ai/PROJECTS_COMMON_AI_GUIDE.md` in [PROJECTS_COMMON_AI_GUIDE.md](/Users/yutogasaki/Projects/sleeping-beauty/PROJECTS_COMMON_AI_GUIDE.md).
- Added [CLAUDE.md](/Users/yutogasaki/Projects/sleeping-beauty/CLAUDE.md) and [docs/index.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/index.md) as clear entry points for repo docs and AI tooling.
- Added the shared operations layer under [.agents/](/Users/yutogasaki/Projects/sleeping-beauty/.agents), including queue, done index, durable memory, and a repo-local frontend taste skill.
- Added Codex adapter files and safe baseline hooks under [.codex/](/Users/yutogasaki/Projects/sleeping-beauty/.codex) and [scripts/ai/hooks/](/Users/yutogasaki/Projects/sleeping-beauty/scripts/ai/hooks).
- Installed `taste-skill` and `gpt-tasteskill` into the local Codex skills directory for frontend-oriented work.

## Why

- This repo already had strong operating-system docs, but it did not yet have the shared `.agents/` and `.codex/` structure expected by the cross-project `_common-ai` standard.
- Frontend-heavy work in this project benefits from explicit taste guidance, especially when preserving premium UI quality across desktop and mobile.

## Verification Run

- Confirmed the skill installer completed for `taste-skill` and `gpt-tasteskill`.
- Ran `python3 -m py_compile scripts/ai/hooks/session_start.py scripts/ai/hooks/block_destructive.py .codex/hooks/session_start.py .codex/hooks/block_destructive.py`.
- Ran `python3 .codex/hooks/session_start.py` and validated the JSON output shape.
- Ran a destructive-command sample through `python3 .codex/hooks/block_destructive.py` and confirmed it returns a deny decision.
- Ran `npm run test`.
- Ran `npm run lint`.
- Ran `npm run build`.

## Residual Risks

- Claude local permissions remain user-specific in `.claude/settings.local.json`, so this task does not fully standardize Claude runtime behavior.
- The repo-local frontend taste skill references globally installed Codex skills, so collaborators still need to install them locally to get the full benefit.

## Follow-ups

- If the shared task queue starts being used regularly, add current active work to `.agents/tasks/TASKS.md`.
- If frontend redesign work repeats, consider splitting the repo-local taste guide into separate public-site and admin-site variants.
