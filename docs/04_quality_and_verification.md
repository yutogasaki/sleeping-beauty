# Quality and Verification

## Purpose

This companion document expands the quality bar introduced in [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md).

Use it when you need to choose the smallest sufficient verification set, review a UI change, or keep speed gains from reducing accuracy.

## Verification Ladder

Verification should be chosen deliberately, not copied blindly.

Use this ladder:

1. Static checks
   - `npm run test`
   - `npm run lint`
   - `npm run build`
2. Behavioral checks
   - Manually exercise the changed flow
   - Confirm edge states and error states
3. UX checks
   - Desktop and mobile pass
   - Visual consistency with surrounding sections
   - CTA and empty-state behavior
4. Operational checks
   - Missing env behavior
   - Permission or auth failures
   - Recovery and rollback path

Use the smallest sufficient verification set, but never skip the level that catches the likely failure mode.

Use [docs/templates/verification-checklist.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/verification-checklist.md) when a checklist will help.

## Design Quality

If a task changes the UI, treat design as a deliverable with its own acceptance bar.

Minimum design review questions:

- Is there a clear visual hierarchy?
- Does the primary action stand out?
- Is the copy specific and in the same tone as the rest of the site?
- Does the component still feel intentional on mobile?
- Did we replace or remove obvious placeholders?
- Are color, spacing, and interaction states coherent?

When useful, capture before-and-after screenshots and note what changed beyond code structure.

## Efficiency and Precision

To improve speed without losing quality:

- Convert repeated flows into Skills rather than repeating instructions in chat.
- Use Task templates so implementation and verification are decided early.
- Keep Done short so future work starts from outcomes, not archaeology.
- Push stable facts into Memory and keep temporary context out of it.
- Promote repeated review comments into Rules.

To improve precision:

- Put acceptance criteria in the Task before implementation.
- Make verification explicit in both Task and Done.
- Use server boundaries for privileged operations.
- Record assumptions when the code depends on missing infrastructure.

## Repo Defaults

For this repo, meaningful user-facing or operational work normally starts with:

- `npm run test`
- `npm run lint`
- `npm run build`

Then add targeted checks when applicable:

- CTA behavior
- admin auth or moderation flows
- mobile layout
- error and empty states
- missing env fallback
- realtime initial fetch plus live update path
