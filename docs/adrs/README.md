# ADRs

Use ADRs for architecture or workflow decisions that should outlive the task that introduced them.

## Good ADR candidates

- changing where privileged writes happen
- introducing or removing a major integration boundary
- adopting a new repo operating model
- centralizing shared business data
- changing moderation, auth, or release strategy

## Naming

Use:

`NNNN-short-title.md`

Examples:

- `0001-project-operating-system.md`
- `0002-server-side-message-submission.md`

## Rules

- ADRs should record the decision, not every discussion.
- If an ADR is replaced, mark the old one as superseded rather than deleting it.
- Keep ADRs focused on one decision each.

## Template

Start from [docs/templates/adr.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/adr.md).
