# Task: Test Foundation

## Objective

Introduce a lightweight automated test foundation that improves development precision without adding heavy maintenance cost.

## Non-goals

- Full end-to-end browser coverage
- Visual regression tooling
- Broad component snapshot coverage

## Scope

- Package scripts and dev dependencies for unit testing
- Test runner configuration
- Initial tests for stable pure logic in shared libraries
- A completion record in `docs/done/`

## Acceptance Criteria

- The repo has a standard unit test command.
- At least the current shared pure logic around message validation and event metadata is covered.
- Tests run successfully in CI-friendly non-interactive mode.
- Existing `lint` and `build` still succeed.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`

## Risks and Assumptions

- Keep the first step intentionally small to avoid test framework churn.
- Prefer low-maintenance pure-logic coverage first; UI tests can come later.
