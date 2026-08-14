import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class FeaturesPage extends BasePage {
  readonly pageHeading: Locator;
  readonly speedToLeadFeature: Locator;
  readonly callRecordingFeature: Locator;
  readonly inboundCallsFeature: Locator;
  readonly leadRoutingFeature: Locator;
  readonly warmTransferFeature: Locator;
  readonly mcpServerFeature: Locator;
  readonly dispatchCallsFeature: Locator;
  readonly ctaButtons: Locator;
  readonly featureSectionHeadings: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    this.pageHeading = page.getByRole('heading', { name: /features/i }).first();
    this.speedToLeadFeature = page.getByText(/speed to lead/i).first();
    this.callRecordingFeature = page.getByText(/call recording/i).first();
    this.inboundCallsFeature = page.getByText(/inbound calls/i).first();
    this.leadRoutingFeature = page.getByText(/lead routing/i).first();
    this.warmTransferFeature = page.getByText(/warm transfer/i).first();
    this.mcpServerFeature = page.getByText(/mcp server/i).first();
    this.dispatchCallsFeature = page.getByText(/dispatch calls/i).first();
    this.ctaButtons = page.getByRole('link', { name: /start.*trial|get started|try.*free/i });
    this.featureSectionHeadings = page
      .getByRole('heading', { level: 2 })
      .or(page.getByRole('heading', { level: 3 }));
  }

  async navigateToFeatures(): Promise<void> {
    await this.page.goto(`${this.config.url}/features`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getFeatureNames(): Promise<string[]> {
    const els = await this.featureSectionHeadings.all();
    const texts = await Promise.all(els.map(el => el.textContent()));
    return texts.filter((t): t is string => !!t && t.trim().length > 0).map(t => t.trim());
  }

  async isFeatureVisible(featureText: string): Promise<boolean> {
    return this.page
      .getByText(featureText, { exact: false })
      .first()
      .isVisible()
      .catch(() => false);
  }

  async getFirstCTAHref(): Promise<string | null> {
    return this.ctaButtons.first().getAttribute('href');
  }
}
