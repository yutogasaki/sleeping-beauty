# Skill: Release Readiness Checks

## Trigger

Use this Skill before pushing meaningful user-facing, admin-facing, or operational changes.

## Inputs

- Changed files
- Required env assumptions for the change
- Any related task or done record

## Output

A short release-readiness summary that says:

- what was verified
- what was not verified
- what operational assumptions still exist
- whether the change is ready to push

## Workflow

1. Read the changed files and identify the primary user or operator flow.
2. Confirm whether the change touches one or more of these areas:
   - public UI
   - admin flows
   - server routes
   - env-dependent behavior
   - realtime behavior
3. Run static checks:
   - `npm run test`
   - `npm run lint`
   - `npm run build`
4. Run targeted manual checks for the changed area:
   - CTA or navigation behavior
   - desktop and mobile layout
   - admin auth and failure states
   - missing env fallback
   - realtime initial fetch plus live update path
5. Record anything intentionally skipped.
6. If the change affects long-lived workflow or architecture, update memory or ADRs.

## Verification

Minimum:

- `npm run test`
- `npm run lint`
- `npm run build`

Add manual checks when applicable:

- public CTA path works end to end
- error and empty states still make sense
- admin moderation state is visible and understandable
- privileged actions remain server-side
- placeholders are removed or clearly labeled

## Known Traps

- Passing static checks but not confirming mobile layout
- Shipping env-dependent changes without testing fallback behavior
- Changing realtime behavior without checking the initial fetch path
- Treating a docs update as enough when code behavior changed
- Forgetting to record new durable assumptions in memory

## Split or Retire When

- Release checks become meaningfully different for public UI and admin workflows
- The repo gains automated test coverage that changes the manual checklist substantially
