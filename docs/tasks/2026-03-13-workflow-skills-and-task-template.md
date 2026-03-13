# Task: Workflow Skills and Task Template

## Objective

Add two repo Skills and strengthen the task template so repeated route-testing and UI-review work becomes faster, more consistent, and easier to verify.

## Non-goals

- Rewrite the full operating system again
- Add browser E2E or visual-regression tooling
- Replace contributor judgment with exhaustive checklists

## Scope

- Add a repo Skill for route-level testing
- Add a repo Skill for UI polish and review
- Update the task template so UI and operational work prompts better acceptance criteria and verification plans
- Refresh skill guidance so the new Skills are visible as first-class repo workflows

## Acceptance Criteria

- A `route-testing` Skill exists and reflects current repo testing patterns for server routes and mocked boundaries.
- A `ui-polish-review` Skill exists and reflects the repo's current quality bar for hierarchy, copy, CTA behavior, states, and mobile checks.
- [docs/templates/task.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/task.md) prompts authors to think about main-path behavior, failure states, and UI or operational verification where applicable.
- [docs/skills/README.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/skills/README.md) mentions the new Skills or candidate workflows without duplicating full guidance.
- The new docs stay concise and consistent with the operating-system split.

## Verification

- Review the new Skills against:
  - [src/app/api/messages/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.test.ts)
  - [src/app/api/admin/session/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.test.ts)
  - [docs/04_quality_and_verification.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/04_quality_and_verification.md)
- Review the updated task template for coverage of:
  - main path
  - failure and fallback behavior
  - desktop and mobile checks for UI work
  - env, auth, or operational checks when relevant
- Check file sizes and wording so the new docs remain lightweight.

## Risks and Assumptions

- If the Skills become too prescriptive, they will create copy-paste behavior instead of better judgment.
- The template should improve prompts without turning every task into ceremony.
- The repo's route-testing patterns are still lightweight and mock-driven; the Skill should reflect that rather than imply full integration coverage.
