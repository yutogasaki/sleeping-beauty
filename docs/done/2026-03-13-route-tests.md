# Done: Route-Level Tests

## What Changed

- Added a route test for `src/app/api/calendar/route.ts`.
- Added route tests for `src/app/api/messages/route.ts`.
- Covered validation failure, honeypot bypass, cooldown blocking, missing env behavior, and successful message persistence.

## Why

The repo already had unit tests for shared pure logic, but high-value server route behavior was still unverified. Adding route-level tests improves precision around operational and security-sensitive flows without needing a full integration harness.

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`

## Residual Risks

- These tests mock framework boundaries rather than exercising a live Next server.
- Admin session route behavior is still untested.
- UI-level interactions for ticket download and message submission remain covered only indirectly.

## Follow-ups

- Add route tests for `src/app/api/admin/session/route.ts`.
- Consider a small `test-writing` or `route-testing` Skill once patterns stabilize.
