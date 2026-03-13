# Done: Test Foundation

## What Changed

- Added `vitest` as a lightweight unit test runner.
- Added `npm run test` and `npm run test:watch`.
- Added initial unit tests for shared pure logic in:
  - `src/lib/messageSubmission.ts`
  - `src/lib/eventDetails.ts`
- Updated repo workflow docs so verification now includes the test command.

## Why

The repo had lint and build checks but no automated unit test layer. Adding a small, low-maintenance test foundation improves development precision without introducing a heavy framework.

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`

## Residual Risks

- Current coverage is intentionally limited to stable pure logic.
- UI interaction tests and route-level behavior tests are still missing.
- `npm install` reported 1 high-severity vulnerability in dependencies; it was not addressed in this task.

## Follow-ups

- Add route-level tests for calendar and message submission behavior.
- Add a repo-specific Skill for test-writing once patterns stabilize.
