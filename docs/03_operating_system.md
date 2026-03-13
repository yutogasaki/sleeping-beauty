# Project Operating System

## Purpose

This document defines how we keep development fast, accurate, design-aware, and operable without letting the repository turn into a pile of stale context.

Use this as the order of precedence for project knowledge:

1. Constitution
2. Rules
3. Skills
4. Task
5. Done
6. Memory

The closer something is to the top, the smaller and more stable it should be.

## Constitution

The constitution is the shortest layer and should contain only principles that are expensive to violate.

Current constitution for this repo:

1. Never ship secrets to the client. Server-only values stay server-only.
2. No meaningful change is complete without verification.
3. Prefer small reversible changes over large speculative rewrites.
4. Production-facing UI must work on mobile and desktop.
5. Design quality is part of quality, not decoration after implementation.
6. Durable knowledge must be recorded in the right layer, not left in chat history.
7. When a rule causes more confusion than safety, refine or remove it.

## Rules

Rules are repo-specific and can evolve. They should be concrete enough to guide implementation, but not so broad that they become a second constitution.

### Engineering Rules

- Security-sensitive writes should prefer server routes over direct client writes.
- Public env vars must be safe to expose. Admin or privileged values must use server env vars.
- Before push, run at least `npm run lint` and `npm run build` for user-facing or workflow-affecting changes.
- For realtime features, treat the subscription as an enhancement and keep the initial fetch reliable.
- Centralize stable business data such as event metadata when it appears in multiple places.

### UX and Design Rules

- Every primary CTA must do something concrete.
- Avoid placeholder UI in production paths unless it is explicitly labeled as mock behavior.
- A design change is not done until spacing, states, copy, and mobile behavior are checked.
- Prefer a small number of intentional visual ideas over many generic effects.

### Operational Rules

- New operational behavior should document required env vars and failure modes.
- Admin flows should expose state clearly: counts, filters, current mode, and error conditions.
- If a manual workflow repeats more than twice, consider codifying it as a Skill.

## Skills

Skills are reusable playbooks for repeated work. A Skill is justified when the same workflow recurs, has hidden pitfalls, or needs a consistent quality bar.

Create or update a Skill when one of these is true:

- The same category of work appears 2 or more times in a sprint.
- The work has a non-obvious verification checklist.
- A teammate would otherwise need a long handoff message.
- The task combines design, code, and operational concerns.

Good candidates in this repo:

- Landing page interaction improvements
- Ticket and event-information changes
- Message submission hardening
- Admin moderation workflow upgrades
- Release readiness checks
- UI polish and screenshot review

A Skill should include:

- Trigger
- Inputs
- Output expectations
- Step-by-step workflow
- Verification checklist
- Known traps
- When to retire or split the Skill

See templates in [docs/templates/skill.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/skill.md).

## Task

Task is the active working brief. It should be narrow and current, not a long narrative.

Every active task should state:

- Objective
- Non-goals
- Scope
- Acceptance criteria
- Verification plan
- Risks or assumptions

Good tasks are specific enough that a reviewer can tell whether the work is done without reading the entire diff.

See [docs/templates/task.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/task.md).

## Done

Done is the closure record for a task. It is not a full changelog and not a replay of the work.

Every Done record should answer:

- What changed
- Why it changed
- What was verified
- What still worries us
- What should happen next, if anything

Done entries should be short, scannable, and useful to the next person picking up the area.

See [docs/templates/done.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/done.md).

## Memory

Memory is for stable facts that should survive individual tasks. It is not for temporary reasoning, chat summaries, or every experiment we tried.

Keep in memory:

- Stable architecture decisions
- Naming and source-of-truth choices
- Environment assumptions that affect multiple tasks
- Repeated failure modes
- Decisions with future follow-up implications

Do not keep in memory:

- Temporary TODO lists
- Long progress logs
- One-off debugging notes
- Entire discussions
- Information that already has a better source-of-truth file

Each memory entry should include:

- Why it is durable
- Where the source of truth lives
- When it was last verified
- When it should be reconsidered

See [docs/templates/memory-entry.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/memory-entry.md).

## Test and Verification

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

See [docs/templates/verification-checklist.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/verification-checklist.md).

## Design Quality

If a task changes the UI, we should treat design as a deliverable with its own acceptance bar.

Minimum design review questions:

- Is there a clear visual hierarchy?
- Does the primary action stand out?
- Is the copy specific and in the same tone as the rest of the site?
- Does the component still feel intentional on mobile?
- Did we replace or remove obvious placeholders?
- Are color, spacing, and interaction states coherent?

When useful, capture before/after screenshots and note what changed beyond code structure.

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

## Operational Simplicity

Operations become easier when the repo tells the truth about how it works.

Prefer to document:

- Required env vars
- Fallback behavior when integrations are missing
- Manual runbooks for admin-facing workflows
- Release or rollback triggers
- Source-of-truth locations for event and content data

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

The following do not fit perfectly into one bucket, but matter enough to track deliberately:

- ADRs: major design decisions and why they were made
- Security notes: trust boundaries, secret handling, risky flows
- Observability: logging, failure visibility, supportability
- Release notes: what changed in a deployable way
- Rollback notes: how to back out of a risky change
- Content ownership: who updates event text, dates, and links

Use [docs/templates/adr.md](/Users/yutogasaki/Projects/sleeping-beauty/docs/templates/adr.md) when a decision should outlive the task that created it.

## Update Policy

Update the operating system when:

- The same problem appears in review 3 times
- A workflow repeats enough to justify a Skill
- A document becomes hard to use because of size
- A rule is routinely ignored because it is impractical
- A production issue reveals a missing verification step

Delete or simplify anything that is no longer improving speed, accuracy, design quality, or operations.
