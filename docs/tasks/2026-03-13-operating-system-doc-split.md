# Task: Operating System Doc Split

## Objective

Split the operating-system guidance into a smaller core document plus tightly scoped companion docs so the repo keeps a clear source of truth without growing one oversized file.

## Non-goals

- Change the repo's core constitution or rules beyond small wording alignment
- Introduce new Skills, CI workflows, or test infrastructure
- Rework every docs template in the same task

## Scope

- Restructure [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md) into a shorter hub document
- Add companion docs for:
  - quality and verification
  - operational and documentation hygiene
- Align the order-of-truth language in the operating-system doc with the current repo instructions in [AGENTS.md](/Users/yutogasaki/Projects/sleeping-beauty/AGENTS.md)

## Acceptance Criteria

- [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md) remains the source entry point but is materially shorter and easier to scan.
- The guidance for verification, design quality, and speed-versus-precision tradeoffs moves into a dedicated companion doc.
- The guidance for operational simplicity, file growth, context pollution, and supporting layers moves into a dedicated companion doc.
- No important operating-system guidance is lost during the split.
- The new structure favors links over duplicated policy text.

## Verification

- Review the updated core document and companion docs together for completeness and consistency.
- Confirm [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md) still matches the order-of-truth guidance in [AGENTS.md](/Users/yutogasaki/Projects/sleeping-beauty/AGENTS.md).
- Check document sizes after the split to confirm the core document is meaningfully smaller.

## Risks and Assumptions

- Over-splitting could fragment context, so this change should stop at two companion docs.
- The split should preserve the repo's lightweight feel; if the new docs feel ceremonial, they should be simplified again.
- Existing links and contributor habits should continue to start from [docs/03_operating_system.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/03_operating_system.md).
