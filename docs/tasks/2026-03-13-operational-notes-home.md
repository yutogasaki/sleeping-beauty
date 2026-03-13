# Task: Operational Notes Home

## Objective

Create a lightweight home for operational notes so recurring runbooks, observability entry points, rollback guidance, and content-ownership notes have a clear place in the repo without overloading memory or ADRs.

## Non-goals

- Introduce a large new documentation layer
- Add incident-response or on-call process
- Move existing memory or ADR content into a new folder without a clear need

## Scope

- Add a small guide for `docs/operations/`
- Add a template for thin operational notes
- Update repo guidance so contributors know when to use operational notes instead of memory, ADRs, or done records

## Acceptance Criteria

- `docs/operations/` has a README that explains what belongs there and what does not.
- A reusable operational-note template exists.
- Repo guidance points to the new location without changing the core order of truth.
- The new layer stays lightweight and emphasizes links back to the real source of truth.

## Verification

- Review the new operations README and template together for clarity.
- Confirm the guidance distinguishes operational notes from:
  - memory
  - ADRs
  - task and done records
- Review the updates to repo guidance for consistency and minimal duplication.

## Risks and Assumptions

- If the new layer is too broad, it will become a dumping ground.
- If it is too narrow, contributors will keep stuffing operational context into memory or chat.
- The right balance is a thin support layer for workflows and supportability notes that still points back to the owning route, doc, or decision.
