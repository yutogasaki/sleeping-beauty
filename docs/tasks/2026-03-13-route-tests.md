# Task: Route-Level Tests

## Objective

Extend the new test foundation to cover important route behavior for calendar export and message submission.

## Non-goals

- Full browser-driven E2E coverage
- Realtime subscription tests
- Full Next.js integration harness

## Scope

- Unit-style route tests for:
  - `src/app/api/calendar/route.ts`
  - `src/app/api/messages/route.ts`
- Mocking cookies and Supabase where needed
- A completion record in `docs/done/`

## Acceptance Criteria

- The calendar route is tested for content type and core ICS payload shape.
- The message route is tested for validation failure and at least one success path.
- Important guardrails such as cooldown or honeypot behavior are covered.
- `npm run test`, `npm run lint`, and `npm run build` all succeed.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`

## Risks and Assumptions

- Keep tests lightweight by mocking framework boundaries instead of spinning up a server.
- Focus on high-value behavior, not framework internals.
