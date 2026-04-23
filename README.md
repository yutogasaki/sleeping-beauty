This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Available verification commands:

```bash
npm run test
npm run lint
npm run build
```

GitHub Actions runs the same baseline checks on push and pull request via [.github/workflows/ci.yml](./.github/workflows/ci.yml).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Docs

- [Docs index](./docs/index.md)
- [Operating system](./docs/03_operating_system.md)
- [Repo instructions](./AGENTS.md)
- [Claude guide](./CLAUDE.md)
- [Projects common AI guide pointer](./PROJECTS_COMMON_AI_GUIDE.md)
- [Shared agent guide](./.agents/agent-guide.md)
- [Task template](./docs/templates/task.md)
- [Done template](./docs/templates/done.md)
- [Memory template](./docs/templates/memory-entry.md)
- [Skill template](./docs/templates/skill.md)
- [Verification checklist](./docs/templates/verification-checklist.md)
- [ADR template](./docs/templates/adr.md)
- [Tasks folder](./docs/tasks/README.md)
- [Done folder](./docs/done/README.md)
- [Memory folder](./docs/memory/README.md)
- [ADRs folder](./docs/adrs/README.md)
- [Skills folder](./docs/skills/README.md)

## AI Working Environment

- Shared cross-project AI standards are referenced through [PROJECTS_COMMON_AI_GUIDE.md](./PROJECTS_COMMON_AI_GUIDE.md)
- Shared task, memory, and repo-local skills live in [./.agents/](./.agents)
- Codex-specific hooks and adapter files live in [./.codex/](./.codex)
- Frontend polish work can use [sleeping-beauty-ui-taste](./.agents/skills/sleeping-beauty-ui-taste/SKILL.md) together with locally installed `taste-skill` or `gpt-tasteskill`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
