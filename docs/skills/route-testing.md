# Skill: Route Testing

## Trigger

Use this Skill when changing or adding a server route whose behavior matters enough that we should verify it directly instead of inferring correctness from surrounding code.

Typical triggers in this repo:

- request validation changes
- auth or permission behavior changes
- env-dependent fallback behavior
- persistence or side-effect logic
- cookie or header semantics

## Inputs

- The route file being changed
- Any shared libs the route depends on
- Expected success, failure, and fallback behavior
- Required env vars, cookies, or external clients involved
- Related task or done record, if one exists

## Output

A route test or small route-test set that:

- exercises the highest-value route behavior directly
- covers at least one success path and the most important failure path
- documents mocked boundaries clearly enough to maintain later
- runs in the repo's normal `npm run test` flow

## Workflow

1. Read the route and identify the behaviors that matter most:
   - success path
   - validation or parsing failure
   - auth or permission failure
   - missing env or missing integration fallback
   - side effects such as cookies, headers, or persistence calls
2. Test route behavior, not framework internals.
   Prefer calling exported handlers such as `GET`, `POST`, or `DELETE` directly.
3. Mock only the boundaries that are outside the route's responsibility.
   In this repo, that often means:
   - `next/headers`
   - Supabase client creation
   - environment variables
   - `server-only` module boundaries when needed
4. Reset mutable global state carefully.
   Clear mocks between tests, restore `process.env`, and make cookie mocks explicit.
5. Assert both response shape and meaningful side effects.
   Check status codes, JSON payloads, cookies, headers, and persistence calls where relevant.
6. Keep the suite small.
   Cover the high-risk behaviors first instead of trying to recreate a full server integration harness.

## Verification

Minimum:

- `npm run test`

Add when the route affects wider user or operator behavior:

- `npm run lint`
- `npm run build`

Route-specific checks to include when applicable:

- success response payload
- validation error payload
- auth or permission rejection
- missing env or missing integration fallback
- cookie and header behavior
- persistence call shape and table target
- cooldown, honeypot, or replay guard behavior

Current repo examples:

- [src/app/api/messages/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/messages/route.test.ts)
- [src/app/api/admin/session/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/admin/session/route.test.ts)
- [src/app/api/calendar/route.test.ts](/Users/yutogasaki/Projects/sleeping-beauty/src/app/api/calendar/route.test.ts)

## Known Traps

- Asserting only status codes and missing the response body or side effects
- Mutating `process.env` without restoring it
- Letting mocks leak between tests
- Testing mocked helpers more than the route's actual branching behavior
- Skipping missing-env or auth-failure coverage because the happy path already passes
- Building a heavy harness when a direct handler call would cover the risk

## Split or Retire When

- The repo adopts a substantially different integration-testing strategy
- Route testing for public APIs and admin routes diverges enough to need separate workflows
- Framework or runtime changes make the current mock approach misleading
