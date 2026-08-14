---
paths:
  - "src/**/*.ts"
  - "tests/**/*.ts"
---

# Code Style Rules

## TypeScript

- Strict mode is on — no implicit `any`, no unsafe assignments
- All page object locator properties must be explicitly typed as `Locator`
- All method return types must be explicit
- Use `import type { ... }` for type-only imports
- Use path aliases — never relative `../../` chains:
  - `@pages/*` → `src/pages/*`
  - `@fixtures/*` → `src/fixtures/*`
  - `@utils/*` → `src/utils/*`
  - `@site-types/*` → `src/types/*` (note: NOT `@types/*` — that alias conflicts with TypeScript's reserved `@types/` namespace)

## Naming conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Classes | PascalCase | `PricingPage`, `FeaturesPage` |
| Method names | camelCase | `toggleAnnualPricing`, `getPlanNames` |
| Locator properties | camelCase | `starterPlanCard`, `trialCTAButtons` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_TIMEOUT`, `SNAPSHOT_OPTIONS` |
| Test files | kebab-case + `.spec.ts` | `pricing.spec.ts`, `nav-links.spec.ts` |
| Page object files | kebab-case + `.page.ts` | `pricing.page.ts`, `ai.page.ts` |
| Interfaces | PascalCase | `PricingPlan`, `NavLinkInfo` |

## Import order

```typescript
// 1. Playwright types
import { type Page, type Locator } from '@playwright/test';
// 2. Local base classes (relative)
import { BasePage } from './base.page';
// 3. Type-only imports via alias
import type { SiteConfig } from '@types/site-config.types';
```

## Comments

Write no comments by default. Only add one when the WHY is non-obvious:
- A hidden browser quirk or timing constraint
- A workaround for a known Callingly site behavior
- A subtle invariant that would surprise a reader

Never write comments that describe WHAT the code does — well-named methods and properties do that.

## No magic strings in tests

Define repeated selector text as a constant in the page object, not inline in tests:

```typescript
// Page object
readonly starterPlanCard: Locator;
constructor(...) {
  this.starterPlanCard = page.getByText('Starter').first();
}

// Test — uses the named locator, not inline text
await expect(pricingPage.starterPlanCard).toBeVisible();
```
