# Contributing

Guide for contributing tests, page objects, and documentation to the Callingly QA Agentic Solution.

---

## Before You Start

1. Read `CLAUDE.md` — the complete architecture reference
2. Read `AGENTS.md` — available agents and automation
3. Read `Skills.md` — slash commands for Claude Code
4. Complete setup and verify it works:

```bash
npm install
npx playwright install --with-deps
npm run typecheck     # must pass with zero errors
npm run test:smoke    # must pass before you write anything new
```

---

## Contributor Rules

These rules apply to all code in this repository:

| Rule | Why |
|------|-----|
| Never submit forms | Tests must be non-destructive and repeatable |
| Never create accounts or log in | No auth flows unless `auth.required: true` in `site.config.json` |
| Never hardcode the base URL | Use `baseURL` from Playwright config (reads `site.config.json`) |
| All page interactions through page objects | Maintainability — selectors belong in `src/pages/`, not test bodies |
| No `page.waitForTimeout()` | Playwright auto-waiting is always safer and faster |
| No `any` type | TypeScript strict mode is enforced; every property must be typed |
| Every test must have a tag | Enables selective test runs with `npm run test:<suite>` |
| Run `npm run typecheck` before pushing | Zero errors required |

---

## Test Tags

Tag every `test()` call with at least one suite tag:

| Tag | Script | When to use |
|-----|--------|-------------|
| `@smoke` | `npm run test:smoke` | Site loads, no console errors, HTTP 2xx |
| `@navigation` | `npm run test:navigation` | Nav links, dropdowns, routing, mobile menu |
| `@forms` | `npm run test:forms` | Form fields, labels, browser validation |
| `@functional` | `npm run test:functional` | Business features: pricing, AI agents, integrations |
| `@visual` | `npm run test:visual` | Screenshot regression with `toHaveScreenshot()` |
| `@responsive` | `npm run test:responsive` | Viewport-specific layout checks |
| `@regression` | `npm run test:regression` | Content value accuracy: plan names, prices, nav items |

---

## Writing Page Objects

Every page or major section needs its own class in `src/pages/`. Follow this pattern:

```typescript
// src/pages/my-feature.page.ts
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import type { SiteConfig } from '@types/site-config.types';

export class MyFeaturePage extends BasePage {
  // Locators are readonly and defined in the constructor
  readonly featureHeading: Locator;
  readonly ctaButton: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    // Prefer role-based selectors
    this.featureHeading = page.getByRole('heading', { name: /my feature/i });
    this.ctaButton = page.getByRole('link', { name: /get started/i });
  }

  // Action methods — drive the browser
  async clickCTA(): Promise<void> {
    await this.ctaButton.click();
  }

  // Query methods — return data
  async getHeadingText(): Promise<string> {
    return await this.featureHeading.textContent() ?? '';
  }

  // Page-specific navigation (when not the site root)
  async navigateToMyFeature(): Promise<void> {
    await this.page.goto(`${this.config.url}/my-feature`);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
```

**Never put `expect()` inside a page object method.** Assertions belong in tests only.

### Locator preference order

1. `getByRole()` — semantic and accessible, preferred
2. `getByLabel()` — for form fields
3. `getByText()` — for unique text content
4. `locator('css')` — only as a last resort

---

## Writing Tests

Tests import from the custom fixture, not from `@playwright/test` directly:

```typescript
import { test, expect } from '@fixtures/site.fixture';
```

Available fixtures: `siteConfig`, `homePage`, `navigationPage`, `contactPage`, `pricingPage`, `featuresPage`, `integrationsPage`, `aiPage`.

For pages not in the fixture, instantiate the page object in `beforeEach`:

```typescript
import { test, expect } from '@fixtures/site.fixture';
import { MyFeaturePage } from '@pages/my-feature.page';

test.describe('@functional My Feature', () => {
  let myPage: MyFeaturePage;

  test.beforeEach(async ({ page, siteConfig }) => {
    myPage = new MyFeaturePage(page, siteConfig);
    await myPage.navigateToMyFeature();
  });

  test('feature heading is visible @functional', async () => {
    await expect(myPage.featureHeading).toBeVisible();
  });
});
```

---

## Adding to the Fixture

When you create a new page object that will be widely used, add it to `src/fixtures/site.fixture.ts`:

1. Import the new class
2. Add a property to the `Fixtures` interface
3. Add the fixture implementation using `base.extend()`

Then register it in this file and in `README.md`.

---

## Pull Request Checklist

Before opening a PR:

- [ ] `npm run typecheck` passes with zero TypeScript errors
- [ ] `npm run test:smoke` passes locally
- [ ] New tests are tagged with at least one suite tag
- [ ] New page objects are added to `src/fixtures/site.fixture.ts` (if fixture-worthy)
- [ ] Visual baselines updated if visual tests changed: `npm run baseline`
- [ ] No hardcoded URLs in any test or page object
- [ ] No `page.waitForTimeout()` calls
- [ ] PR description explains what changed and what site behavior it validates

---

## Using Claude Code to Accelerate Contributions

```
/analyze-site           # Discover what to test on a page you haven't covered yet
/generate-full-suite    # Auto-generate POM + tests for the entire site
/run-smoke              # Quick health check after changes
/generate-report        # Summarize results after running the full suite
```

Claude fetches the live site before generating selectors — it produces real, working locators based on actual HTML, not placeholders.

To get help in a PR or issue, comment `@claude <your question>` and Claude will respond.
