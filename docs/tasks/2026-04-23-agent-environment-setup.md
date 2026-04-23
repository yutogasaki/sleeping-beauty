# Agent Environment Setup

## Objective

Set up a shared AI working environment for this repository using `/Users/yutogasaki/Projects/_common-ai/PROJECTS_COMMON_AI_GUIDE.md` as the canonical reference, and make `taste-skill` available for frontend-oriented work in this project.

## Non-goals

- Reorganizing the full documentation taxonomy in this task
- Changing application behavior or visual design
- Adding project-specific Claude/Codex automations beyond a minimal safe baseline

## Scope

- Repo-level agent entry files such as `CLAUDE.md` and common-guide pointers
- Shared operations layer under `.agents/`
- Codex adapter files under `.codex/`
- Project documentation describing the new environment
- Installing `taste-skill` for local Codex usage

## Acceptance Criteria

- The repo has a shared agent operations layer aligned with `_common-ai`
- Claude and Codex both have clear entry points for this repository
- The project documents where shared truth, active tasks, and durable memory should live
- `taste-skill` is installed and referenced for frontend work
- The setup does not overwrite or conflict with existing app configuration

## Verification

- Confirm the expected files exist and contain project-specific guidance
- Validate any JSON/TOML or hook scripts added for Codex
- Confirm `taste-skill` was installed into the local Codex skills directory
- Note any intentional gaps, such as Claude-local settings that should stay user-specific

## Risks and Assumptions

- This repo already has its own operating-system docs, so the shared environment should complement rather than replace them
- Repo-local shared skills should stay lightweight until repeated workflows justify more custom skill authoring
- Existing `.claude/settings.local.json` is user-specific and should remain minimally touched
