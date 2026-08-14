import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class IntegrationsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly hubspotLogo: Locator;
  readonly salesforceLogo: Locator;
  readonly zapierLogo: Locator;
  readonly hubspotBossLogo: Locator;
  readonly integrationImages: Locator;
  readonly viewAllLink: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    this.pageHeading = page.getByRole('heading', { name: /integrations/i }).first();
    // Each brand appears in both the featured section and the full directory — use .first()
    this.hubspotLogo = page.getByAltText('HubSpot', { exact: true }).first();
    this.salesforceLogo = page.getByAltText('Salesforce', { exact: true }).first();
    this.zapierLogo = page.getByAltText('Zapier', { exact: true }).first();
    this.hubspotBossLogo = page.getByAltText('Follow Up Boss', { exact: true }).first();
    this.integrationImages = page.locator('img[alt]');
    this.viewAllLink = page.getByRole('link', { name: /view all integrations/i });
  }

  async navigateToIntegrations(): Promise<void> {
    await this.page.goto(`${this.config.url}/integrations`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getIntegrationCount(): Promise<number> {
    return this.integrationImages.count();
  }

  async getIntegrationNames(): Promise<string[]> {
    const els = await this.integrationImages.all();
    const alts = await Promise.all(els.map(el => el.getAttribute('alt')));
    return alts.filter((a): a is string => !!a && a.trim().length > 0).map(a => a.trim());
  }

  async hasIntegrationCountClaim(): Promise<boolean> {
    return this.page
      .getByText(/1,000\+|1000\+|hundreds of integrations/i)
      .first()
      .isVisible()
      .catch(() => false);
  }
}
