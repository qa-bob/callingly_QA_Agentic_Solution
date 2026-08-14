import { test, expect } from '@fixtures/site.fixture';
import { PricingPage } from '@pages/pricing.page';

test.describe('@functional Pricing page', () => {
  let pricingPage: PricingPage;

  test.beforeEach(async ({ page, siteConfig }) => {
    pricingPage = new PricingPage(page, siteConfig);
    await pricingPage.navigateToPricing();
  });

  test('pricing page loads with a visible heading @functional', async () => {
    await expect(pricingPage.pageHeading).toBeVisible();
  });

  test('Starter plan is displayed @functional', async () => {
    await expect(pricingPage.starterPlanCard).toBeVisible();
  });

  test('Growth plan is displayed @functional', async () => {
    await expect(pricingPage.growthPlanCard).toBeVisible();
  });

  test('Business plan is displayed @functional', async () => {
    await expect(pricingPage.businessPlanCard).toBeVisible();
  });

  test('Enterprise section is displayed @functional', async () => {
    await expect(pricingPage.enterpriseSection).toBeVisible();
  });

  test('at least three plan names are present @functional', async () => {
    const names = await pricingPage.getPlanNames();
    expect(names.length).toBeGreaterThanOrEqual(3);
  });

  test('pricing page shows dollar amounts @functional', async () => {
    const prices = await pricingPage.getVisiblePrices();
    expect(prices.length).toBeGreaterThan(0);
    prices.forEach(p => expect(p).toMatch(/\$/));
  });

  test('annual pricing toggle is present @functional', async () => {
    const hasToggle = await pricingPage.isAnnualTogglePresent();
    expect(hasToggle).toBe(true);
  });

  test('trial CTA buttons are visible @functional', async () => {
    const count = await pricingPage.getTrialCTACount();
    expect(count).toBeGreaterThan(0);
    await expect(pricingPage.trialCTAButtons.first()).toBeVisible();
  });

  test('trial CTA links to /register @functional', async () => {
    const href = await pricingPage.trialCTAButtons.first().getAttribute('href');
    expect(href).toMatch(/\/register/);
  });

  test('page title includes "Callingly" @functional', async () => {
    const title = await pricingPage.getTitle();
    expect(title).toContain('Callingly');
  });
});
