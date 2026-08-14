---
paths:
  - "tests/**/*.spec.ts"
---

# Testing Rules

## Required: Tag every test

Every `test()` call must include at least one suite tag. Add the tag directly in the test title string:

```typescript
test('hero headline is visible @functional', async ({ homePage }) => { ... });
```

Valid tags: `@smoke`, `@navigation`, `@forms`, `@functional`, `@visual`, `@responsive`, `@regression`

## Required: Import from fixture

Always import `test` and `expect` from the custom fixture, not from `@playwright/test`:

```typescript
// Correct
import { test, expect } from '@fixtures/site.fixture';

// Wrong
import { test, expect } from '@playwright/test';
```

## Forbidden patterns

| Pattern | Use instead |
|---------|-------------|
| `page.waitForTimeout(n)` | Playwright auto-waiting or `waitForSelector` |
| `page.locator('...')` in test body | Page object locator property |
| Hardcoded `https://callingly.com` | `baseURL` from config or page object `navigate()` |
| `form.submit()` or clicking submit | Never submit forms |
| `expect()` called inside page object | Assertions in test files only |

## Test structure

Group related tests with `test.describe()`. Use `beforeEach` for shared navigation:

```typescript
test.describe('@functional Pricing page', () => {
  let pricingPage: PricingPage;

  test.beforeEach(async ({ page, siteConfig }) => {
    pricingPage = new PricingPage(page, siteConfig);
    await pricingPage.navigateToPricing();
  });

  test('Starter plan is visible @functional', async () => {
    await expect(pricingPage.starterPlanCard).toBeVisible();
  });
});
```

## Assertion guidance

- Use `toBeVisible()` for presence checks
- Use `toContainText()` / `toHaveText()` for content checks
- Use `toHaveURL()` for navigation checks
- Use `toHaveAttribute()` for href / src checks
- Prefer `getByRole()` locators over CSS class selectors
- Avoid index-based `.nth(0)` in tests — define named locators in the page object

## Soft assertions

Use `expect.soft()` only when a partial failure should not abort the test:

```typescript
// Useful for checking multiple optional elements
await expect.soft(page.getByText('Feature A')).toBeVisible();
await expect.soft(page.getByText('Feature B')).toBeVisible();
```
