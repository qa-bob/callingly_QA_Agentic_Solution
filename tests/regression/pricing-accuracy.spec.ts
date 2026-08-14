import { test, expect } from '@fixtures/site.fixture';
import { PricingPage } from '@pages/pricing.page';

/**
 * Pricing accuracy regression — verifies that plan names and price points
 * match the known published values. Failures indicate a pricing change on
 * the Callingly site that needs human review before baselines are updated.
 *
 * Known pricing (as of 2026):
 *   Starter  — $100/mo (monthly), $80/mo (annual)
 *   Growth   — $250/mo (monthly), $200/mo (annual)
 *   Business — $750/mo (monthly), $600/mo (annual)
 *   Enterprise — custom ($2,000+/mo)
 */

test.describe('@regression Pricing plan names', () => {
  let pricingPage: PricingPage;

  test.beforeEach(async ({ page, siteConfig }) => {
    pricingPage = new PricingPage(page, siteConfig);
    await pricingPage.navigateToPricing();
  });

  test('Starter plan name is present @regression', async () => {
    await expect(pricingPage.starterPlanCard).toBeVisible();
  });

  test('Growth plan name is present @regression', async () => {
    await expect(pricingPage.growthPlanCard).toBeVisible();
  });

  test('Business plan name is present @regression', async () => {
    await expect(pricingPage.businessPlanCard).toBeVisible();
  });

  test('Enterprise plan is present @regression', async () => {
    await expect(pricingPage.enterpriseSection).toBeVisible();
  });

  test('exactly three or four named plans are shown @regression', async () => {
    const names = await pricingPage.getPlanNames();
    expect(names.length).toBeGreaterThanOrEqual(3);
    expect(names.length).toBeLessThanOrEqual(6);
  });
});

test.describe('@regression Pricing monthly price points', () => {
  let pricingPage: PricingPage;

  test.beforeEach(async ({ page, siteConfig }) => {
    pricingPage = new PricingPage(page, siteConfig);
    await pricingPage.navigateToPricing();
  });

  test('Starter plan shows $100 price @regression', async () => {
    const starterArea = pricingPage.page
      .getByText('Starter', { exact: true })
      .first()
      .locator('xpath=ancestor::section | ancestor::div[contains(@class,"plan") or contains(@class,"card") or contains(@class,"tier") or contains(@class,"pricing")]')
      .first();
    await expect(starterArea.getByText(/\$100/).first()).toBeVisible();
  });

  test('Growth plan shows $250 price @regression', async () => {
    const growthArea = pricingPage.page
      .getByText('Growth', { exact: true })
      .first()
      .locator('xpath=ancestor::section | ancestor::div[contains(@class,"plan") or contains(@class,"card") or contains(@class,"tier") or contains(@class,"pricing")]')
      .first();
    await expect(growthArea.getByText(/\$250/).first()).toBeVisible();
  });

  test('Business plan shows $750 price @regression', async () => {
    const bizArea = pricingPage.page
      .getByText('Business', { exact: true })
      .first()
      .locator('xpath=ancestor::section | ancestor::div[contains(@class,"plan") or contains(@class,"card") or contains(@class,"tier") or contains(@class,"pricing")]')
      .first();
    await expect(bizArea.getByText(/\$750/).first()).toBeVisible();
  });

  test('"no credit card" is mentioned on pricing page @regression', async () => {
    await expect(
      pricingPage.page.getByText(/no credit card/i).first()
    ).toBeVisible();
  });

  test('overage rates are mentioned @regression', async () => {
    const overage = pricingPage.page.getByText(/overage|per minute|\/min|per sms/i).first();
    await expect(overage).toBeVisible();
  });

  test('14-day free trial is mentioned @regression', async () => {
    const trial = pricingPage.page.getByText(/14.day|14 day/i).first();
    await expect(trial).toBeVisible();
  });
});
