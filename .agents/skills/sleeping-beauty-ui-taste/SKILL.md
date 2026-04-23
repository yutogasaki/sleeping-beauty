# Sleeping Beauty UI Taste

## Purpose

Use this skill for public-site or presentation-heavy UI work in this repo when you want stronger frontend taste without drifting away from project constraints.

This is a repo-local companion to locally installed frontend design skills such as `gpt-tasteskill` or `taste-skill`.
Treat those external skills as style accelerators, and treat this file as the repo-specific guardrail layer.

## Use When

- refining the home page or major public sections
- redesigning layout, hierarchy, spacing, or motion
- improving polish without changing the product scope
- building new public-facing sections that should feel premium and intentional

## Read First

1. `AGENTS.md`
2. `docs/03_operating_system.md`
3. `docs/04_quality_and_verification.md`
4. `docs/skills/ui-polish-review.md`

If available locally, also use:

- `~/.codex/skills/gpt-tasteskill/SKILL.md`
- `~/.codex/skills/taste-skill/SKILL.md`

## Repo-Specific Guardrails

- Keep the design romantic and stage-like, but still clear and readable
- Prefer one or two strong visual ideas over many decorative effects
- Motion should support elegance, not distract from ticket or message actions
- Preserve concrete CTA behavior and avoid fake affordances
- Do not sacrifice mobile readability or tap targets for visual drama
- Keep privileged or sensitive logic on the server side

## Working Loop

1. Identify the main section or path being improved
2. Choose the visual direction before touching lots of code
3. Apply stronger taste to hierarchy, rhythm, and atmosphere
4. Re-check CTA behavior, copy clarity, and responsive layout
5. Run the repo verification baseline before closing the task

## Verification Minimum

- `npm run test`
- `npm run lint`
- `npm run build`
- Manual check of changed CTA paths
- Desktop and mobile review of the changed section
