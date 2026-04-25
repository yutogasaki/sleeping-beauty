# Flower Gifts And Behind-The-Scenes Image

## Objective

Make "王国への贈り物" clearly describe a future real flower-purchase flow where supporters can buy flowers to be delivered to performers, and replace the behind-the-scenes placeholder with a dedicated image for the 2026.04.01 casting record.

## Non-goals

- Implement payment, inventory, fulfillment, Stripe, or an external flower vendor integration.
- Add a real purchase link before the sales flow exists.
- Redesign the full home page.

## Scope

- Public home page gift section copy, site-consistent glass-panel layout, and preparation-state messaging.
- Behind-the-scenes timeline image asset and image rendering.
- Product/spec documentation for the durable flower-gift direction.

## Acceptance Criteria

- The gift section uses "王国への贈り物" and explains that real celebration flowers will be purchasable and delivered to performers.
- Planned flower types are presented inside the existing ornament/glass-panel visual system, with no fake payment affordance.
- The behind-the-scenes record for `2026.04.01 / 配役決定` uses a purpose-built cute ballet image containing the requested date/title text.
- Desktop and mobile layouts remain readable.

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- Manual desktop and mobile review of the changed gift and behind-the-scenes sections.

## Risks and Assumptions

- Purchase infrastructure is not available yet, so the public CTA must stay in a preparation state.
- The generated image is deterministic and project-local so Japanese text can remain exact.
