# Task: Operating System Audit

## Objective

Audit the current repo operating system and produce a small, prioritized improvement plan that increases development speed, precision, design quality, and operational simplicity without bloating docs or polluting context.

## Non-goals

- Rewrite the full operating system in this task
- Create every proposed Skill immediately
- Add new CI or test infrastructure unless the audit proves it is the next highest-leverage step

## Scope

- Review the current constitution, rules, templates, and working-folder guidance
- Compare the intended model with the current `tasks`, `done`, `memory`, `skills`, tests, and CI usage
- Identify the strongest current benefits, the main failure modes, and missing layers
- Capture prioritized next actions that can be implemented incrementally

## Acceptance Criteria

- Recommendations cover:
  - development efficiency
  - development precision
  - design quality
  - operational simplicity
  - downsides and tradeoffs
  - file growth and context pollution
- Recommendations explicitly consider:
  - constitution and rules
  - Skills
  - `Task`, `Done`, and `Memory`
  - tests and verification
  - additional layers worth tracking
- The output distinguishes near-term, next-step, and later improvements.
- The output favors small reversible changes over a repo-wide rewrite.

## Verification

- Review [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md) and the doc templates.
- Review current files in:
  - [docs/tasks](/Users/yutogasaki/Projects/sleeping-beauty/docs/tasks)
  - [docs/done](/Users/yutogasaki/Projects/sleeping-beauty/docs/done)
  - [docs/memory](/Users/yutogasaki/Projects/sleeping-beauty/docs/memory)
  - [docs/skills](/Users/yutogasaki/Projects/sleeping-beauty/docs/skills)
- Inspect current automated verification coverage in [package.json](/Users/yutogasaki/Projects/sleeping-beauty/package.json) and [.github/workflows/ci.yml](/Users/yutogasaki/Projects/sleeping-beauty/.github/workflows/ci.yml).
- Check current document sizes to spot growth and split pressure.

## Risks and Assumptions

- Recommendations are based on the repo state verified on `2026-03-13`.
- Some proposed changes should only be implemented when repeated friction appears; otherwise they risk becoming ceremony.
- The audit should prefer clearer ownership and smaller docs over introducing new documentation layers by default.

## Findings

- The current operating model is working well. `Task`, `Done`, `Memory`, and `Skill` all have clear responsibilities and the existing files are still short enough to scan quickly.
- Precision has improved materially because the repo now has `npm run test`, route-level tests, and CI coverage for `test`, `lint`, and `build`.
- The biggest structural risk is concentration in [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md). It is still readable, but it now carries constitution, rules, workflow guidance, design checks, tradeoffs, and future-layer notes in one place.
- Design quality is acknowledged in the rules, but the repo still lacks a reusable design-review Skill or a stronger UI-specific verification pattern in active tasks.
- Operational guidance exists conceptually, but the repo does not yet have a stable home for lightweight observability notes, rollback notes, security notes, or content ownership guidance.

## Prioritized Recommendations

### Now

1. Split [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md) into a smaller core plus topic docs.
   Keep the constitution and order-of-truth in the core document, and move verification policy, documentation lifecycle, and additional-layer guidance into smaller linked docs.
2. Add two repo Skills with immediate leverage:
   - `route-testing.md`
   - `ui-polish-review.md`
3. Tighten the task template for UI and operational work.
   Add explicit prompts for desktop/mobile evidence, primary CTA behavior, failure-state coverage, and env/fallback checks when applicable.

### Next

1. Add a lightweight stale-memory review rule.
   Keep `Last Verified`, and introduce a simple revisit cadence so memory entries do not silently drift.
2. Decide where thin operational notes live.
   Start with one small doc or folder for observability, rollback expectations, security boundaries, and content ownership only if those topics recur.
3. Convert repeated follow-ups from `Done` into either new task files or Skills.
   Avoid leaving operational TODOs buried in closure records.

### Later

1. If UI regressions recur, add a preview-safe browser or screenshot verification workflow.
2. If operational complexity grows, separate public-site and admin/release verification into different Skills.
3. If foundational repo decisions continue to accumulate, add ADRs rather than extending the operating-system doc.

## Proposed Guardrails

- Prefer updating one existing rule over adding a new rule.
- Create a new doc only when it clearly removes repeated chat context or repeated review comments.
- Retire Skills that are rarely used or have become misleading.
- Keep `Done` outcome-focused; move open work back into `Task`.
- Avoid duplicating the same policy across `AGENTS.md`, the operating-system doc, and ADRs; use links when one layer already owns the rule.
