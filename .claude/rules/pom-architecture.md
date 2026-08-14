---
paths:
  - "src/pages/**/*.ts"
---

# Page Object Model Architecture Rules

## Every page class must

1. Extend `BasePage` from `./base.page`
2. Define locators as `readonly Locator` properties in the constructor
3. Expose action methods that drive the browser (click, fill, navigate)
4. Expose query methods that return data (getText, isVisible, getCount)
5. Never call `expect()` internally — assertions belong in tests

## Locator strategy (preference order)

1. `page.getByRole()` — semantic, accessible, resistant to CSS changes
2. `page.getByLabel()` — for form fields
3. `page.getByText()` — for unique visible text
4. `page.getByAltText()` — for images
5. `page.locator('css')` — only as a last resort, avoid class names that look auto-generated

## Constructor pattern

```typescript
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import type { SiteConfig } from '@types/site-config.types';

export class ExamplePage extends BasePage {
  readonly mainHeading: Locator;
  readonly primaryCTA: Locator;
  readonly planCards: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    this.mainHeading = page.getByRole('heading', { level: 1 }).first();
    this.primaryCTA = page.getByRole('link', { name: /start free trial/i });
    this.planCards = page.locator('[class*="plan"], [class*="card"]');
  }
}
```

## Page-specific navigation

`BasePage.navigate()` always goes to `config.url` (the site root). For non-root pages, add a dedicated navigation method:

```typescript
async navigateToPricing(): Promise<void> {
  await this.page.goto(`${this.config.url}/pricing`);
  await this.page.waitForLoadState('domcontentloaded');
}
```

## Action methods

Action methods drive the browser and return `Promise<void>`:

```typescript
async clickPrimaryCTA(): Promise<void> {
  await this.primaryCTA.click();
}

async toggleAnnualPricing(): Promise<void> {
  await this.annualToggle.click();
}
```

## Query methods

Query methods return data and never assert:

```typescript
async getPlanNames(): Promise<string[]> {
  const headings = await this.planHeadings.all();
  return Promise.all(headings.map(h => h.textContent().then(t => t?.trim() ?? '')));
}

async isAnnualTogglePresent(): Promise<boolean> {
  return this.annualToggle.isVisible().catch(() => false);
}
```

## One file per page or major section

- Homepage → `home.page.ts`
- Pricing page → `pricing.page.ts`
- Features page → `features.page.ts`
- Integrations page → `integrations.page.ts`
- AI Agents page → `ai.page.ts`
- Contact form → `contact.page.ts`
- Primary navigation → `navigation.page.ts`

Do not put multiple unrelated pages in one file. Do not put page-specific locators in `base.page.ts`.
