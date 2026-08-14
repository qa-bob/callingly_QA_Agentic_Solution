# Callingly — QA Agentic Solution

Playwright + TypeScript regression suite for [callingly.com](https://callingly.com), built with a **Page Object Model (POM)** architecture and powered by **Claude Code** for agentic test generation and maintenance.

---

## What This Repo Tests

[Callingly](https://callingly.com) is an AI-powered call and SMS platform for B2B sales teams. This suite covers every discoverable page and feature without requiring account creation or form submission.

| Suite | Tag | Coverage |
|-------|-----|----------|
| Smoke | `@smoke` | Availability, HTTPS, load time, console errors |
| Navigation | `@navigation` | Nav menus, dropdowns, routing, mobile hamburger |
| Forms | `@forms` | Contact form fields and browser validation |
| Functional | `@functional` | Hero, pricing, features, integrations, AI agents, dropdowns |
| Visual | `@visual` | Screenshot regression — desktop, mobile, tablet |
| Responsive | `@responsive` | Layout integrity at three breakpoints |
| Regression | `@regression` | Content accuracy, pricing values, nav structure |

---

## Tech Stack

| Tool | Role |
|------|------|
| [Playwright](https://playwright.dev/) | Browser automation |
| TypeScript (strict) | Strongly typed test code |
| Page Object Model | Maintainable selector abstraction |
| Claude Code | Agentic test generation and maintenance |
| GitHub Actions | CI/CD pipeline |

---

## Repository Structure

```
callingly_QA_Agentic_Solution/
├── CLAUDE.md                    # Claude Code project instructions (primary)
├── AGENTS.md                    # Agent and automation documentation
├── Skills.md                    # Slash command skill reference
├── site.config.json             # Site URL and test flags
├── playwright.config.ts         # Playwright projects and settings
│
├── .claude/
│   ├── settings.json            # Claude Code permissions and hooks
│   ├── agents/                  # Subagent definitions
│   ├── commands/                # Slash command skill files
│   ├── hooks/                   # Lifecycle automation scripts
│   └── rules/                   # Path-scoped coding rules
│
├── .github/
│   ├── workflows/               # GitHub Actions (Playwright CI, Claude review)
│   ├── ISSUE_TEMPLATE/          # Bug and feature request templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CONTRIBUTING.md
│
├── src/
│   ├── pages/                   # Page Object Model classes
│   │   ├── base.page.ts         # Shared base class
│   │   ├── home.page.ts         # Homepage
│   │   ├── navigation.page.ts   # Primary navigation
│   │   ├── pricing.page.ts      # Pricing page
│   │   ├── features.page.ts     # Features page
│   │   ├── integrations.page.ts # Integrations page
│   │   ├── ai.page.ts           # AI Agents page
│   │   └── contact.page.ts      # Contact form
│   ├── fixtures/
│   │   └── site.fixture.ts      # Custom Playwright fixtures
│   ├── utils/
│   │   ├── link-checker.ts      # Link reachability helpers
│   │   └── visual-helper.ts     # Screenshot helpers
│   └── types/
│       └── site-config.types.ts # TypeScript interfaces for site.config.json
│
└── tests/
    ├── smoke/                   # @smoke — availability checks
    ├── navigation/              # @navigation — links and menus
    ├── forms/                   # @forms — form fields and validation
    ├── functional/              # @functional — business feature tests
    ├── visual/                  # @visual — screenshot regression
    ├── responsive/              # @responsive — layout breakpoints
    └── regression/              # @regression — content value accuracy
```

---

## Development Environment Setup

### Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later
- A Chromium-compatible browser (installed automatically by Playwright)

### Install

```bash
git clone https://github.com/your-org/callingly_QA_Agentic_Solution.git
cd callingly_QA_Agentic_Solution

npm install
npx playwright install --with-deps
```

### Verify setup

```bash
npm run typecheck    # TypeScript must compile with zero errors
npm run test:smoke   # Smoke tests should pass before anything else
```

---

## Running Tests

```bash
npm test                     # All tests
npm run test:smoke           # Availability and basic load (@smoke)
npm run test:navigation      # Navigation and routing (@navigation)
npm run test:forms           # Form fields and validation (@forms)
npm run test:functional      # Business logic and features (@functional)
npm run test:visual          # Screenshot regression (@visual)
npm run test:responsive      # Layout at each breakpoint (@responsive)
npm run test:regression      # Content accuracy regression (@regression)

npm run baseline             # Update visual snapshots
npm run report               # Open HTML test report
npm run typecheck            # TypeScript check (zero errors required)
npm run lint                 # ESLint
```

### Headed mode

```bash
npx playwright test --headed           # See the browser
npx playwright test --ui               # Interactive Playwright UI
npx playwright test --project=chromium-desktop  # Single project
```

---

## Claude Code Integration

This repo is initialized for Claude Code. Use slash commands in any Claude Code session pointed at this directory:

| Command | What it does |
|---------|-------------|
| `/generate-full-suite` | Analyze site, generate complete POM and test suite |
| `/analyze-site` | Report pages, forms, and elements on the live site |
| `/run-smoke` | Run smoke tests and summarize results |
| `/update-baseline` | Refresh visual regression baselines |
| `/generate-report` | Generate a formatted test results summary |

See `AGENTS.md` for agent documentation and `Skills.md` for detailed skill descriptions.

### GitHub Integration

Add `ANTHROPIC_API_KEY` to your repository secrets to enable:
- **`@claude` comments** — mention Claude in any issue or PR to get help
- **Auto code review** — Claude reviews every PR against POM and Playwright standards

---

## Architecture: Page Object Model

Every page or section has its own class in `src/pages/`. Classes extend `BasePage`:

- **Locators** are `readonly Locator` properties defined in the constructor
- **Action methods** drive the browser (`clickCTA`, `toggleAnnualPricing`)
- **Query methods** return data (`getPlanNames`, `getNavLinks`)
- **No `expect()` inside page objects** — assertions belong in test files only

```typescript
// Page object — returns data, never asserts
async getPlanNames(): Promise<string[]> { ... }

// Test — asserts on returned data
const names = await pricingPage.getPlanNames();
expect(names).toContain('Growth');
```

Import page objects via the custom fixture, never instantiate them directly in tests:

```typescript
import { test, expect } from '@fixtures/site.fixture';

test('pricing page has three plans @functional', async ({ pricingPage }) => {
  const names = await pricingPage.getPlanNames();
  expect(names.length).toBeGreaterThanOrEqual(3);
});
```

---

## Contributor Rules

1. **Never submit forms** — test field interactions and browser validation only
2. **Never hardcode URLs** — use `baseURL` from Playwright config (reads `site.config.json`)
3. **All page interactions through page objects** — no raw `page.locator()` in test bodies
4. **Tag every test** with at least one of: `@smoke`, `@navigation`, `@forms`, `@functional`, `@visual`, `@responsive`, `@regression`
5. **`npm run typecheck` must pass** with zero errors before pushing
6. **No `page.waitForTimeout()`** — use Playwright auto-waiting or `waitForSelector`
7. **No `any` type** without explicit justification
8. **Run `npm run test:smoke` locally** before opening a PR

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for the full guide.

---

## CI/CD

| Workflow | Trigger | What runs |
|----------|---------|-----------|
| `playwright.yml` | Push / PR to `main` | Smoke on push; full suite on PR; report artifact |
| `claude-review.yml` | Every PR to `main` | Claude reviews diff for POM/TS/Playwright compliance |
| `claude.yml` | `@claude` comment | Claude responds to questions and requests |

---

## About the Site Under Test

**Callingly** (founded 2016, Scottsdale AZ) provides AI-powered call and SMS automation for B2B sales teams. Key pages tested:

| Page | URL |
|------|-----|
| Homepage | `/` |
| Pricing | `/pricing` |
| Features | `/features` |
| Integrations | `/integrations` |
| AI Agents | `/ai` |
| Contact | `/contact` |

---

## License

MIT
