# Operational and Documentation Hygiene

## Purpose

This companion document keeps the operating model usable as the repo grows.

Use it when deciding what should be documented, when to split a doc, and how to avoid stale or duplicated context.

## Operational Simplicity

Operations become easier when the repo tells the truth about how it works.

Prefer to document:

- required env vars
- fallback behavior when integrations are missing
- manual runbooks for admin-facing workflows
- release or rollback triggers
- source-of-truth locations for event and content data

If a workflow is business-critical and still depends on chat memory, it is under-documented.

## File Growth and Context Pollution

We should actively prevent knowledge layers from bloating.

### Split Triggers

- Split a rules file when it contains unrelated domains.
- Split a Skill when it serves more than one workflow.
- Split a task when it has more than one independent acceptance target.
- Split a doc when readers need only one third of it for normal work.

### Soft Size Limits

- Constitution: aim for under 1 page
- Rules doc section: under 150 lines per topic
- Skill: under 200 lines
- Task: under 120 lines
- Done: under 60 lines
- Memory entry: short enough to re-verify in under 2 minutes

### Context Pollution Warnings

- Repeating the same policy in multiple files
- Recording chat summaries instead of decisions
- Mixing active tasks with historical notes
- Leaving outdated assumptions without verification dates
- Turning templates into giant checklists nobody uses

## Downsides and Tradeoffs

This operating model has costs.

- More structure can slow very small tasks.
- Too many rules reduce judgment instead of helping it.
- Bad Skills create copy-paste thinking.
- Over-documenting Done or Memory creates noise.
- Excessive templates can become theater.

Mitigations:

- Keep the constitution tiny.
- Prefer updating an existing rule over adding a new one.
- Retire unused Skills.
- Delete stale memory.
- Review whether a document is still saving time.

## Other Important Layers

The following do not fit perfectly into one bucket, but matter enough to track deliberately when they recur:

- ADRs: major design decisions and why they were made
- Security notes: trust boundaries, secret handling, risky flows
- Observability: logging, failure visibility, supportability
- Release notes: what changed in a deployable way
- Rollback notes: how to back out of a risky change
- Content ownership: who updates event text, dates, and links

Use [docs/templates/adr.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/adr.md) when a decision should outlive the task that created it.

## Guidance for Adding More Docs

Create a new doc or layer only when it clearly removes repeated chat context, repeated review comments, or repeated operational confusion.

When a higher-priority document already owns a rule, prefer linking to it rather than duplicating the same policy again.
