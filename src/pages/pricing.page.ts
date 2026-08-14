import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class PricingPage extends BasePage {
  readonly pageHeading: Locator;
  readonly starterPlanCard: Locator;
  readonly growthPlanCard: Locator;
  readonly businessPlanCard: Locator;
  readonly enterpriseSection: Locator;
  readonly annualToggle: Locator;
  readonly trialCTAButtons: Locator;
  readonly planHeadings: Locator;
  readonly priceAmounts: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    // The pricing page H1 says "Try Callingly FREE for 14 days", not "Pricing"
    this.pageHeading = page.getByRole('heading', { level: 1 }).first();
    this.starterPlanCard = page.getByText('Starter', { exact: true }).first();
    this.growthPlanCard = page.getByText('Growth', { exact: true }).first();
    this.businessPlanCard = page.getByText('Business', { exact: true }).first();
    this.enterpriseSection = page.getByText('Enterprise', { exact: true }).first();
    this.annualToggle = page
      .getByRole('radio', { name: /annual/i })
      .or(page.getByLabel(/annual/i))
      .or(page.getByRole('button', { name: /annual/i })
      .or(page.getByText(/annual/i).first()));
    this.trialCTAButtons = page.getByRole('link', { name: /start.*trial|try.*free|get started/i });
    this.planHeadings = page.getByRole('heading', { name: /starter|growth|business|enterprise/i });
    this.priceAmounts = page.getByText(/\$\d+/);
  }

  async navigateToPricing(): Promise<void> {
    await this.page.goto(`${this.config.url}/pricing`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getPlanNames(): Promise<string[]> {
    const els = await this.planHeadings.all();
    const texts = await Promise.all(els.map(el => el.textContent()));
    return texts.filter((t): t is string => !!t && t.trim().length > 0).map(t => t.trim());
  }

  async getVisiblePrices(): Promise<string[]> {
    const els = await this.priceAmounts.all();
    const texts = await Promise.all(els.map(el => el.textContent()));
    return texts.filter((t): t is string => !!t && t.includes('$')).map(t => t.trim());
  }

  async isAnnualTogglePresent(): Promise<boolean> {
    return this.page.getByText(/annual|yearly/i).first().isVisible().catch(() => false);
  }

  async getTrialCTACount(): Promise<number> {
    return this.trialCTAButtons.count();
  }
}
