# Task: Admin Session Route Tests

## Objective

Add route-level tests for the admin session API so authentication behavior is verified rather than inferred.

## Non-goals

- UI tests for the admin page
- Full browser auth flow coverage
- Refactoring the auth model itself

## Scope

- `src/app/api/admin/session/route.ts`
- Mocking cookies and env-driven auth behavior
- A completion record in `docs/done/`

## Acceptance Criteria

- The route is tested for:
  - unconfigured admin PIN behavior
  - invalid PIN rejection
  - successful login cookie creation
  - authenticated and unauthenticated GET behavior
  - logout cookie clearing
- `npm run test`, `npm run lint`, and `npm run build` all succeed.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`

## Risks and Assumptions

- Keep the tests lightweight by mocking Next cookie access.
- Focus on route behavior and cookie semantics rather than UI rendering.
