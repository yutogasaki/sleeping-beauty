# Skill: UI Polish Review

## Trigger

Use this Skill when a task changes public or admin UI in a way that could affect perceived quality, clarity, or task completion.

Typical triggers in this repo:

- landing page updates
- CTA or navigation changes
- section layout changes
- admin workflow UI changes
- copy, hierarchy, or state treatment changes

## Inputs

- Changed UI files
- Related task or acceptance criteria
- Any screenshots, local preview notes, or surrounding reference sections
- Known device or breakpoint constraints
- Relevant content or event source-of-truth docs

## Output

A short UI review summary that says:

- what was checked
- what feels stronger
- what still feels weak or risky
- what was intentionally skipped

## Workflow

1. Identify the main user task the UI needs to support.
   Start from the primary CTA, key message, or admin action rather than from the component tree.
2. Review the changed surface in context.
   Compare it with the surrounding page or flow so local improvements do not break overall coherence.
3. Check the main-path UX first:
   - visual hierarchy
   - CTA clarity
   - copy specificity
   - spacing and grouping
   - interaction states
4. Check failure and supporting states:
   - empty state
   - error state
   - loading or disabled state when relevant
   - placeholder or mock labeling
5. Check responsive behavior.
   Confirm the UI still feels intentional on mobile and does not only work at desktop width.
6. Record only the useful outcome.
   Note the most important strengths, risks, and skipped checks rather than producing a long aesthetic commentary.

## Verification

When UI code changed, normally pair this Skill with:

- `npm run test`
- `npm run lint`
- `npm run build`

Manual checks to include when applicable:

- primary CTA behavior
- desktop layout
- mobile layout
- copy consistency with surrounding sections
- empty, error, loading, and disabled states
- placeholder removal or clear mock labeling
- auth, permission, or missing-env UI behavior for admin or operational flows

Use [docs/04_quality_and_verification.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/04_quality_and_verification.md) when you need the repo's broader design-quality and verification bar.

## Known Traps

- Reviewing the code structure instead of the rendered outcome
- Checking only the happy path and missing empty or error states
- Looking at one breakpoint and assuming the layout scales
- Leaving vague CTA copy that sounds plausible but does not tell the user what happens next
- Adding generic visual treatment that weakens hierarchy instead of clarifying it
- Treating placeholder content as harmless in a production path

## Split or Retire When

- Public-site and admin UI reviews need meaningfully different checklists
- The repo adopts a design system or visual-review process that supersedes this workflow
- The Skill becomes a bloated checklist instead of a fast review aid
