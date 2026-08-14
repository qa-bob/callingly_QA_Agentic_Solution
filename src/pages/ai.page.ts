import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class AIPage extends BasePage {
  readonly mainHeading: Locator;
  readonly aiAgentsHeading: Locator;
  readonly aiDescription: Locator;
  readonly ctaButtons: Locator;
  readonly learnMoreLink: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    this.mainHeading = page.getByRole('heading', { level: 1 }).first();
    this.aiAgentsHeading = page
      .getByRole('heading', { name: /ai agents?/i })
      .first();
    this.aiDescription = page
      .getByText(/call.*leads|respond.*sms|warm transfer.*sales/i)
      .first();
    // "Start For Free" is the in-page CTA; "Start Free Trial" is the nav link (desktop-only)
    this.ctaButtons = page.getByRole('link', { name: /start.*free|start.*trial|get started|try.*free|book.*demo/i });
    this.learnMoreLink = page.getByRole('link', { name: /learn more/i }).first();
  }

  async navigateToAI(): Promise<void> {
    await this.page.goto(`${this.config.url}/ai`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getHeadingText(): Promise<string> {
    return (await this.mainHeading.textContent()) ?? '';
  }

  async hasAIContent(): Promise<boolean> {
    // mainHeading is confirmed visible on all viewports — check its text contains AI terms
    const text = await this.mainHeading.textContent().catch(() => '');
    return /ai|agent|call|close|voice/i.test(text);
  }

  async getCTACount(): Promise<number> {
    return this.ctaButtons.count();
  }
}
