import { test, expect } from '@fixtures/site.fixture';

test.describe('@functional Navigation dropdown menus', () => {
  // Nav dropdowns are a desktop-only pattern — mobile/tablet show a hamburger menu instead
  test.use({ viewport: { width: 1280, height: 720 }, isMobile: false });

  test.beforeEach(async ({ homePage }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop nav dropdowns only');
  });

  test('"Features" dropdown reveals Speed to Lead on click @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Features').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /speed to lead/i }).first()
    ).toBeVisible();
  });

  test('"Features" dropdown contains Call Recording @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Features').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /call recording/i }).first()
    ).toBeVisible();
  });

  test('"Features" dropdown contains Warm Transfer @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Features').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /warm transfer/i }).first()
    ).toBeVisible();
  });

  test('"Features" dropdown contains Inbound Calls and Texts @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Features').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /inbound calls/i }).first()
    ).toBeVisible();
  });

  test('"Features" dropdown contains Intelligent Lead Routing @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Features').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /intelligent lead routing/i }).first()
    ).toBeVisible();
  });

  test('"Industries" dropdown reveals Real Estate on click @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Industries').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /real estate/i }).first()
    ).toBeVisible();
  });

  test('"Industries" dropdown contains Insurance @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Industries').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /insurance/i }).first()
    ).toBeVisible();
  });

  test('"Industries" dropdown contains Mortgage & Loan @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Industries').first().click();
    await expect(
      homePage.page.getByRole('link', { name: /mortgage/i }).first()
    ).toBeVisible();
  });

  test('Speed to Lead link navigates to the feature page @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Features').first().click();
    await homePage.page.getByRole('link', { name: /speed to lead/i }).first().click();
    await expect(homePage.page).toHaveURL(/speed.*to.*lead|speed-to-lead|features/i);
  });

  test('Real Estate industry link navigates to the industry page @functional', async ({ homePage }) => {
    await homePage.page.locator('nav').getByText('Industries').first().click();
    await homePage.page.getByRole('link', { name: /real estate/i }).first().click();
    await expect(homePage.page).toHaveURL(/real.*estate|industries/i);
  });
});
