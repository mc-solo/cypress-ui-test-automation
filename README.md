# Cypress UI Test Automation

[![Cypress Tests](https://github.com/mc-solo/cypress-ui-test-automation/actions/workflows/ci.yml/badge.svg)](https://github.com/mc-solo/cypress-ui-test-automation/actions/workflows/ci.yml)

Cypress + TypeScript UI and API test automation sample by Wondwosen Asegid,
a junior/mid-level SDET building strong fundamentals: Cypress, UI + API
testing, TypeScript, and CI/CD with GitHub Actions and a daily run.

UI tests run against public demo apps only, and API tests run against the public
JSONPlaceholder fake API. There is no private backend, no real user data, and no
claim about any work or client system.

## What it tests

**23 tests in total: 15 UI, 8 API.**

| Suite | File | Tests | Target |
| --- | --- | --- | --- |
| TodoMVC UI | `cypress/e2e/ui/todos.cy.ts` | 12 | https://demo.playwright.dev/todomvc |
| Kitchen Sink Todo UI | `cypress/e2e/ui/kitchen-sink-todo.cy.ts` | 3 | https://example.cypress.io/todo |
| JSONPlaceholder API | `cypress/e2e/api/jsonplaceholder.cy.ts` | 8 | https://jsonplaceholder.typicode.com |

UI coverage: adding one and multiple todos, completing, deleting, editing,
filtering (All / Active / Completed), clearing completed, toggle-all, empty
entry rejected, and persistence after reload. A second spec covers the Cypress
Kitchen Sink seeded todo list.

API coverage: `GET /posts` (100 posts, shape check), `GET /posts/1`,
`GET /posts?userId=1`, `POST /posts` (201, id 101), `PUT /posts/1`,
`PATCH /posts/1`, `DELETE /posts/1`, and `GET /users` (10 users, valid emails).
All API calls use `cy.request()`.

## Project structure

```
cypress-ui-test-automation/
├── cypress.config.ts                  # Cypress config: timeouts, retries (1 in run mode), viewports
├── tsconfig.json                      # Strict TypeScript
├── package.json                       # Scripts: test, test:ui, test:api, cy:open
├── .github/workflows/ci.yml           # CI: push, PR, daily cron 06:00 UTC
├── cypress/
│   ├── e2e/
│   │   ├── ui/todos.cy.ts             # 12 TodoMVC UI tests
│   │   ├── ui/kitchen-sink-todo.cy.ts # 3 Kitchen Sink UI tests
│   │   └── api/jsonplaceholder.cy.ts  # 8 API tests
│   ├── fixtures/
│   │   ├── todos.json                 # Seeded todo data
│   │   └── newPost.json               # POST request body
│   └── support/
│       ├── e2e.ts                     # Global setup
│       ├── commands.ts                # Custom command: cy.addTodo()
│       └── pages/TodoPage.ts          # Page Object for TodoMVC
└── README.md
```

Patterns used, with clear and readable code: Page Object Model (`TodoPage`),
custom commands (`cy.addTodo()`), fixtures for test data, strict TypeScript,
and retry-on-failure in run mode only.

## How to run locally

Prerequisites: Node.js 18+ and npm. On Linux, Cypress needs its system
dependencies for Electron/Chrome (see the Cypress docs for your distro).

```bash
npm install
npx cypress open     # interactive Test Runner
npm test             # headless: all 23 tests (Electron)
npm run test:ui      # headless: UI specs only
npm run test:api     # headless: API specs only
npm run typecheck    # tsc --noEmit
```

## CI

`.github/workflows/ci.yml` runs on every push and pull request to `main`, on
a daily schedule (`cron: '0 6 * * *'`, 06:00 UTC), and on manual dispatch.
It installs Node 20, runs `npm ci`, typechecks, then runs the full suite in
headless Chrome via `cypress-io/github-action@v6`. Screenshots are uploaded
as an artifact only when a run fails.

> The badge points at this repo under `mc-solo` on GitHub.
