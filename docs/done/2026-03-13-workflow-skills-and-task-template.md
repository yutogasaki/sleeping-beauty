# Done: Workflow Skills and Task Template

## What Changed

- Added [docs/skills/route-testing.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/skills/route-testing.md) for the repo's current lightweight route-test workflow.
- Added [docs/skills/ui-polish-review.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/skills/ui-polish-review.md) for consistent UI review across public and admin surfaces.
- Updated [docs/templates/task.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/task.md) so task briefs prompt better main-path, failure-state, UI, and operational verification thinking.
- Updated [docs/skills/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/skills/README.md) so the new Skills are visible in the repo's workflow guidance.

## Why

- Route testing and UI polish review were already recurring workflows, but their quality bar still depended too much on memory and recent chat context.
- Small repo Skills and a slightly stronger task template improve speed and consistency without turning the repo into process theater.

## Verification Run

- Reviewed the new Skills against existing route-test examples in [src/app/api/messages/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.test.ts) and [src/app/api/admin/session/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.test.ts).
- Reviewed the updated task template against the repo's current quality and verification guidance in [docs/04_quality_and_verification.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/04_quality_and_verification.md).
- Checked that the new docs stay short and workflow-focused.

## Residual Risks

- The new Skills still rely on contributors to choose them when the workflow fits.
- The task template is stronger, but it still depends on judgment about which checks are relevant for a given task.
- This task does not yet add automation or stronger enforcement for screenshot capture or UI-specific verification.

## Follow-ups

- If route or UI work keeps recurring, consider linking these Skills directly from future tasks or from additional repo workflow docs.
