/**
 * src/fixtures/site.fixture.ts
 *
 * Extends Playwright's base `test` with pre-constructed page objects and the
 * loaded site config.  All test files should import {test, expect} from here
 * instead of from '@playwright/test' directly.
 *
 * Usage in test files:
 *   import { test, expect } from '@fixtures/site.fixture';
 */

import { test as base, expect } from '@playwright/test';
import { loadSiteConfig, type SiteConfig } from '@site-types/site-config.types';
import { HomePage } from '@pages/home.page';
import { NavigationPage } from '@pages/navigation.page';
import { ContactFormPage } from '@pages/contact.page';
import { PricingPage } from '@pages/pricing.page';
import { FeaturesPage } from '@pages/features.page';
import { IntegrationsPage } from '@pages/integrations.page';
import { AIPage } from '@pages/ai.page';

// ── Fixture type definitions ─────────────────────────────────────────────────

export interface Fixtures {
  /** Fully resolved site configuration loaded from site.config.json */
  siteConfig: SiteConfig;
  /** Pre-navigated HomePage page object */
  homePage: HomePage;
  /** NavigationPage page object (does not auto-navigate) */
  navigationPage: NavigationPage;
  /** ContactFormPage page object (does not auto-navigate) */
  contactPage: ContactFormPage;
  /** PricingPage page object (does not auto-navigate; call navigateToPricing()) */
  pricingPage: PricingPage;
  /** FeaturesPage page object (does not auto-navigate; call navigateToFeatures()) */
  featuresPage: FeaturesPage;
  /** IntegrationsPage page object (does not auto-navigate; call navigateToIntegrations()) */
  integrationsPage: IntegrationsPage;
  /** AIPage page object (does not auto-navigate; call navigateToAI()) */
  aiPage: AIPage;
}

// ── Extended test object ─────────────────────────────────────────────────────

export const test = base.extend<Fixtures>({
  /**
   * siteConfig — loaded once per worker from site.config.json.
   * Shared across all fixtures in the same test.
   */
  siteConfig: async ({}, use) => {
    const config = loadSiteConfig();
    await use(config);
  },

  /**
   * homePage — constructs HomePage and navigates to the site root.
   * Waits for domcontentloaded before handing control to the test.
   */
  homePage: async ({ page, siteConfig }, use) => {
    const homePage = new HomePage(page, siteConfig);
    await homePage.navigate();
    await use(homePage);
  },

  /**
   * navigationPage — constructs NavigationPage without navigating.
   * Tests that need to be on a specific page should call navigate() themselves.
   */
  navigationPage: async ({ page, siteConfig }, use) => {
    const navigationPage = new NavigationPage(page, siteConfig);
    await use(navigationPage);
  },

  /**
   * contactPage — constructs ContactFormPage without navigating.
   * Tests should navigate to the appropriate page first.
   */
  contactPage: async ({ page, siteConfig }, use) => {
    const contactPage = new ContactFormPage(page, siteConfig);
    await use(contactPage);
  },

  /**
   * pricingPage — constructs PricingPage without navigating.
   * Call pricingPage.navigateToPricing() in beforeEach.
   */
  pricingPage: async ({ page, siteConfig }, use) => {
    const pricingPage = new PricingPage(page, siteConfig);
    await use(pricingPage);
  },

  /**
   * featuresPage — constructs FeaturesPage without navigating.
   * Call featuresPage.navigateToFeatures() in beforeEach.
   */
  featuresPage: async ({ page, siteConfig }, use) => {
    const featuresPage = new FeaturesPage(page, siteConfig);
    await use(featuresPage);
  },

  /**
   * integrationsPage — constructs IntegrationsPage without navigating.
   * Call integrationsPage.navigateToIntegrations() in beforeEach.
   */
  integrationsPage: async ({ page, siteConfig }, use) => {
    const integrationsPage = new IntegrationsPage(page, siteConfig);
    await use(integrationsPage);
  },

  /**
   * aiPage — constructs AIPage without navigating.
   * Call aiPage.navigateToAI() in beforeEach.
   */
  aiPage: async ({ page, siteConfig }, use) => {
    const aiPage = new AIPage(page, siteConfig);
    await use(aiPage);
  },
});

// Re-export expect so tests only need one import source
export { expect };
